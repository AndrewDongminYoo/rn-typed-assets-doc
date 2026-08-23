import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { canonicalMarkdownPath, markdownPages } from "@/lib/markdown-pages";
import { markdownAlternatePath } from "@/lib/site";

/**
 * Representations this site can produce, best-default first. HTML leads so that a client with no
 * preference — or no `Accept` header at all — still gets the browsable page.
 */
const PRODUCES = ["text/html", "text/markdown"] as const;

/** Static files and metadata images: byte-for-byte responses that must never be renegotiated. */
const ASSET_EXTENSION =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|txt|webmanifest|webp|woff2?|xml)$/i;
const METADATA_IMAGE = /(?:^|\/)(?:apple-icon|favicon|icon|opengraph-image|twitter-image)$/i;

interface AcceptEntry {
  q: number;
  specificity: number;
  type: string;
}

function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((part) => part.trim());
    const type = parts[0].toLowerCase();
    let q = 1;

    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((piece) => piece.trim());

      if (name === "q") {
        const parsed = Number(value);

        if (!Number.isNaN(parsed)) {
          q = Math.max(0, Math.min(1, parsed));
        }
      }
    }

    return { q, specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2, type };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") {
    return true;
  }

  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }

  return entry.type === candidate;
}

/**
 * RFC 9110 §12.5.1 ranking: for each representation take the *most specific* matching range, drop
 * anything the client rejected with `q=0`, then pick the highest q and break ties on client order.
 * Returns null only when the client can accept nothing this site produces.
 */
function preferredType(header: null | string): null | string {
  if (!header) {
    return PRODUCES[0];
  }

  const entries = parseAccept(header);

  if (entries.length === 0) {
    return PRODUCES[0];
  }

  let bestType: null | string = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;

    for (const [index, entry] of entries.entries()) {
      if (!matches(entry, candidate)) {
        continue;
      }

      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && index < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = index;
      }
    }

    if (matched === null || matched.q <= 0) {
      continue;
    }

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/**
 * Without `Accept` in `Vary`, a CDN can hand the cached HTML to an agent asking for Markdown, or
 * the reverse, depending only on which variant landed in the cache first.
 *
 * This holds on everything the proxy answers or rewrites — the Markdown representations and the
 * 406 — but not on an App Router HTML page: Next 16's app-page template calls
 * `res.setHeader("Vary", …)` during the render, which replaces whatever the proxy or
 * `next.config` put there. `vercel.json` re-applies the full value at the edge for those.
 */
function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");

  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }

  const tokens = existing.split(",").map((token) => token.trim().toLowerCase());

  if (!tokens.includes("accept") && !tokens.includes("*")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}

function markdownUrl(request: NextRequest, pathname: string): URL {
  const url = request.nextUrl.clone();

  url.pathname = pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;

  return url;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Metadata images and static files are single-representation resources. Negotiating them would
  // 406 an Open Graph crawler that correctly asked for `image/*`.
  if (
    METADATA_IMAGE.test(pathname) ||
    (ASSET_EXTENSION.test(pathname) && !pathname.endsWith(".md"))
  ) {
    return NextResponse.next();
  }

  // React Server Component navigations and prefetches ask for `text/x-component`. They are an
  // internal transport, not a representation choice, so they bypass negotiation entirely.
  if (request.headers.has("rsc") || request.headers.has("next-router-prefetch")) {
    return NextResponse.next();
  }

  // An explicit `.md` URL is Markdown regardless of `Accept`: it is what `Link: rel="alternate"`
  // advertises, and a crawler following that link may send no `Accept` header at all. Paths
  // outside the catalog fall through so that standalone documents keep their own routes.
  if (pathname.endsWith(".md")) {
    const stripped = pathname === "/index.md" ? "/" : pathname.slice(0, -3);

    if (markdownPages.has(canonicalMarkdownPath(stripped))) {
      const rewritten = NextResponse.rewrite(markdownUrl(request, canonicalMarkdownPath(stripped)));

      appendVaryAccept(rewritten.headers);

      return rewritten;
    }

    return NextResponse.next();
  }

  const accept = request.headers.get("accept");
  const chosen = preferredType(accept);

  if (chosen === "text/markdown") {
    const rewritten = NextResponse.rewrite(markdownUrl(request, canonicalMarkdownPath(pathname)));

    appendVaryAccept(rewritten.headers);

    return rewritten;
  }

  if (chosen === null) {
    // RFC 9110 §15.5.7: list what is available so the client can retry with a usable Accept.
    return new NextResponse(
      `Not Acceptable\n\nThis resource is available in:\n- text/html\n- text/markdown\n\nYou requested: ${accept ?? "(no Accept header)"}\n`,
      {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "Vary": "Accept",
        },
        status: 406,
      }
    );
  }

  const response = NextResponse.next();

  appendVaryAccept(response.headers);

  if (markdownPages.has(canonicalMarkdownPath(pathname))) {
    const alternate = markdownAlternatePath(canonicalMarkdownPath(pathname));

    response.headers.set("Link", `<${alternate}>; rel="alternate"; type="text/markdown"`);
  }

  return response;
}

export const config = {
  // Everything except Next internals and the Markdown route handler this proxy rewrites into.
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
