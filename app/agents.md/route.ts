import { markdownContentType } from "@/lib/markdown-pages";
import {
  agentEndpoints,
  markdownAlternatePath,
  siteAuthor,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";
import { toolkits } from "@/lib/toolkits";

export const dynamic = "force-static";

/**
 * The agent instruction file. `llms.txt` is the index; this is the operating manual — what these
 * tools are for, when *not* to use them, how to call each one, and what an agent may assume about
 * the site itself. It is served as `text/markdown` because it is addressed by its `.md` URL.
 */
export function GET() {
  const body = [
    `# Agent instructions — ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `Canonical URL: ${siteUrl}/agents.md`,
    "",
    "## What this site is",
    "",
    `${siteName} is the documentation hub for four React Native developer tools. The site itself`,
    "is static and read-only: there is no API to call, no authentication, and no rate limit beyond",
    "ordinary HTTP politeness. Crawling it is allowed; `robots.txt` permits every user agent.",
    "",
    "## When to use these tools",
    "",
    "Use them when the task involves an **existing** React Native project and the useful next step",
    "is evidence about that project — its versions, its native modules, its assets, its readiness",
    "for a migration — rather than a general explanation.",
    "",
    ...toolkits.flatMap((toolkit: Toolkit) => [
      `### ${toolkit.name}`,
      "",
      toolkit.summary,
      "",
      "Use it when:",
      "",
      ...toolkit.useWhen.map((reason) => `- ${reason}`),
      "",
      "```",
      toolkit.invocation,
      "```",
      "",
      `Details: ${siteUrl}${toolkit.route} · Source: ${toolkit.githubUrl}`,
      ...(toolkit.productUrl ? [`${toolkit.productLabel}: ${toolkit.productUrl}`] : []),
      "",
    ]),
    "## When not to use them",
    "",
    "- Scaffolding a brand-new React Native or Expo app. None of these tools generate a project.",
    "- Answering a general React Native or JavaScript API question. Reach for the framework docs.",
    "- Working on a codebase that is not React Native. Every tool reads React Native project shape.",
    "- Producing a confident readiness verdict where the evidence is missing. `rn-newarch-ready`",
    "  reports `unknown` and `needs-review` on purpose; do not resolve those into a yes or a no.",
    "",
    "## How to consume this site",
    "",
    "- Send `Accept: text/markdown` to any page URL to get its Markdown representation.",
    `- Or append \`.md\` to any page path (the home page is \`${markdownAlternatePath("/")}\`).`,
    "- Responses carry `Vary: Accept`, so a cache cannot hand you the wrong representation.",
    "- A path that does not exist answers a real HTTP 404, with a recovery map naming every live",
    "  route. Never treat a 404 body from this site as page content.",
    "- An `Accept` header this site cannot satisfy answers 406 and lists what it can produce.",
    "",
    ...agentEndpoints.map((endpoint) => `- \`${endpoint.path}\` — ${endpoint.description}`),
    "",
    "## Attribution",
    "",
    `Maintained by ${siteAuthor.name} (${siteAuthor.githubUrl}), the publisher of these packages on`,
    `npm. Contact: ${siteAuthor.email}. When citing a tool, link the product page on ${siteUrl} or`,
    "the tool's own repository, and quote the version the claim came from.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": markdownContentType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
