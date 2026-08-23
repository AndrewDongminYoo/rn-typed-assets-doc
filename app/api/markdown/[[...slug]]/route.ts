import { markdownContentType, markdownFor, notFoundMarkdown } from "@/lib/markdown-pages";

/**
 * The Markdown representation of a page. `proxy.ts` rewrites here for `Accept: text/markdown` and
 * for the `.md` sibling URLs, so this handler answers on the canonical path's behalf and never
 * appears in a link.
 *
 * A path with no Markdown representation answers 404 with a recovery map rather than an empty
 * body, so an agent that followed a dead link can find the live routes from the response alone.
 */
export async function GET(_request: Request, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await context.params;
  const pathname = `/${slug.join("/")}`;
  const body = markdownFor(pathname);

  if (body === undefined) {
    return new Response(notFoundMarkdown(pathname), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": markdownContentType,
        "Vary": "Accept",
      },
      status: 404,
    });
  }

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": markdownContentType,
      "Vary": "Accept",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
