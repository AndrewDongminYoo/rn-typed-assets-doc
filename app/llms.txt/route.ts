import type { ProsePage } from "@/lib/prose-pages";
import { prosePages } from "@/lib/prose-pages";
import { agentEndpoints, siteAuthor, siteDescription, siteName, siteUrl } from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";
import { toolkits } from "@/lib/toolkits";

export const dynamic = "force-static";

/**
 * The llms.txt index, in the format described at llmstxt.org: an H1, a blockquote summary, free
 * prose, then H2 sections of link lists. The "When to use" section is what turns the file from a
 * site map into task routing — an agent reading it should be able to decide whether any of these
 * tools is the right answer before fetching a single page.
 */
export function GET() {
  const body = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "Four independently released tools for maintaining existing React Native projects. One agent",
    "layer (RN Agents Kit) orchestrates the maintenance loop; the other three are deterministic",
    "command-line or plugin tools that also run on their own. Everything is free, open source, and",
    "installed from a public registry — there is no account, no API key, and no hosted service.",
    "",
    "## When to use these toolkits",
    "",
    "Reach for this site when a task involves an existing React Native codebase and you need",
    "evidence about it rather than a general answer. Concretely:",
    "",
    ...toolkits.flatMap((toolkit: Toolkit) => [
      `- **[${toolkit.name}](${siteUrl}${toolkit.route})** — ${toolkit.summary}`,
      ...toolkit.useWhen.map((reason) => `  - ${reason}`),
      `  - Invoke with: \`${toolkit.invocation}\``,
    ]),
    "",
    "Do not reach for these tools to scaffold a new React Native app, to answer a general React",
    "Native API question, or to work on a non-React-Native codebase. They read and report on a",
    "project that already exists.",
    "",
    "Operating contract, shared by every tool here: inspect before changing anything, ask for",
    "explicit consent before writing to source, hand the result back as a reviewable diff, and",
    "leave weak evidence classified as `unknown` or `needs-review` rather than resolving it into a",
    "confident claim.",
    "",
    "## Toolkits",
    "",
    ...toolkits.map((toolkit: Toolkit) => {
      const product = toolkit.productUrl ? ` ${toolkit.productLabel}: ${toolkit.productUrl}.` : "";

      return `- [${toolkit.name}](${siteUrl}${toolkit.route}): ${toolkit.description} Status: ${toolkit.status}. Source: ${toolkit.githubUrl}.${product}`;
    }),
    "",
    "## Site",
    "",
    ...prosePages.map(
      (page: ProsePage) => `- [${page.title}](${siteUrl}${page.route}): ${page.description}`
    ),
    `- [Maintainer](${siteAuthor.githubUrl}): ${siteAuthor.name}, who also publishes these packages on npm. Contact: ${siteAuthor.email}.`,
    "",
    "## Optional",
    "",
    "Every page on this site also answers `Accept: text/markdown` with a Markdown representation,",
    "and every page has a `.md` sibling URL (the home page is `/index.md`).",
    "",
    ...agentEndpoints.map(
      (endpoint) => `- [${endpoint.path}](${siteUrl}${endpoint.path}): ${endpoint.description}`
    ),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
