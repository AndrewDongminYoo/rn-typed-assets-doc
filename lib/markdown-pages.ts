import { faq } from "@/lib/faq";
import type { ProsePage } from "@/lib/prose-pages";
import { prosePages } from "@/lib/prose-pages";
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

/** The media type this site negotiates alongside HTML, per RFC 7763. */
export const markdownContentType = "text/markdown; charset=utf-8";

function absolute(route: string): string {
  return route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function frontMatter(route: string, title: string, description: string): string[] {
  return [
    `# ${title}`,
    "",
    `> ${description}`,
    "",
    `Canonical URL: ${absolute(route)}`,
    `HTML: ${absolute(route)} · Markdown: ${siteUrl}${markdownAlternatePath(route)}`,
    "",
  ];
}

function toolkitBlock(toolkit: Toolkit, headingLevel: "##" | "###"): string[] {
  const lines = [
    `${headingLevel} ${toolkit.name}`,
    "",
    toolkit.summary,
    "",
    `- Page: ${absolute(toolkit.route)}`,
    `- Category: ${toolkit.eyebrow}`,
    `- Status: ${toolkit.status}`,
    `- Source: ${toolkit.githubUrl}`,
  ];

  if (toolkit.productUrl) {
    lines.push(`- ${toolkit.productLabel}: ${toolkit.productUrl}`);
  }

  lines.push(
    `- Invocation: \`${toolkit.invocation}\``,
    "",
    "Use it when:",
    "",
    ...toolkit.useWhen.map((reason) => `- ${reason}`),
    ""
  );

  return lines;
}

function endpointList(): string[] {
  return agentEndpoints.map(
    (endpoint) => `- [${endpoint.path}](${siteUrl}${endpoint.path}): ${endpoint.description}`
  );
}

function homeMarkdown(): string {
  return [
    ...frontMatter("/", siteName, siteDescription),
    "A focused collection of developer tools for the React Native work that gets brittle: assets,",
    "architecture audits, design handoff, and agent-led maintenance. One agent layer orchestrates",
    "three deterministic tools, and each of the three also runs on its own from a public source.",
    "",
    "## Operating contract",
    "",
    "- Inspect first. The opening pass reads the project and reports only what it can prove.",
    "- Ask before writing. A skill that can mutate source waits for explicit consent.",
    "- Hand back a diff. Approved changes stay visible in `git diff` so the operator decides.",
    "- Keep weak evidence weak. Missing signals stay `unknown` or `needs-review`.",
    "",
    "## Toolkits",
    "",
    ...toolkits.flatMap((toolkit: Toolkit) => toolkitBlock(toolkit, "###")),
    "## Common questions",
    "",
    ...faq.flatMap((entry) => [`### ${entry.question}`, "", entry.answer, ""]),
    "## About the publisher",
    "",
    `Maintained by ${siteAuthor.name} (${siteAuthor.githubUrl}). Contact: ${siteAuthor.email}.`,
    "",
    ...prosePages.map(
      (page: ProsePage) => `- [${page.title}](${absolute(page.route)}): ${page.description}`
    ),
    "",
    "## Machine-readable endpoints",
    "",
    ...endpointList(),
    "",
  ].join("\n");
}

function productMarkdown(toolkit: Toolkit): string {
  return [
    ...frontMatter(toolkit.route, toolkit.name, toolkit.summary),
    toolkit.description,
    "",
    "## Facts",
    "",
    `- Status: ${toolkit.status}`,
    ...(toolkit.version === undefined ? [] : [`- Version: ${toolkit.version}`]),
    ...(toolkit.license === undefined ? [] : [`- License: ${toolkit.license}`]),
    `- Category: ${toolkit.eyebrow}`,
    `- Source: ${toolkit.githubUrl}`,
    ...(toolkit.productUrl ? [`- ${toolkit.productLabel}: ${toolkit.productUrl}`] : []),
    `- Maintainer: ${siteAuthor.name} (${siteAuthor.githubUrl})`,
    "",
    "## When to use it",
    "",
    ...toolkit.useWhen.map((reason) => `- ${reason}`),
    "",
    "## How to invoke it",
    "",
    "```",
    toolkit.invocation,
    "```",
    "",
    "## Related",
    "",
    ...toolkits
      .filter((candidate: Toolkit) => candidate.slug !== toolkit.slug)
      .map(
        (candidate: Toolkit) =>
          `- [${candidate.name}](${absolute(candidate.route)}): ${candidate.summary}`
      ),
    "",
    "## Machine-readable endpoints",
    "",
    ...endpointList(),
    "",
  ].join("\n");
}

function proseMarkdown(page: ProsePage): string {
  return [
    ...frontMatter(page.route, page.title, page.description),
    page.intro,
    "",
    ...page.sections.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
      ...(section.entries
        ? [
            ...section.entries.map((entry) =>
              entry.url
                ? `- [${entry.label}](${entry.url}): ${entry.detail}`
                : `- ${entry.label}: ${entry.detail}`
            ),
            "",
          ]
        : []),
    ]),
  ].join("\n");
}

/**
 * Every route with a Markdown representation, keyed by its canonical HTML path. Content
 * negotiation and the `.md` siblings both resolve through this map, so the two never diverge.
 */
export const markdownPages: ReadonlyMap<string, string> = new Map([
  ["/", homeMarkdown()],
  ...toolkits.map((toolkit: Toolkit): [string, string] => [
    toolkit.route,
    productMarkdown(toolkit),
  ]),
  ...prosePages.map((page: ProsePage): [string, string] => [page.route, proseMarkdown(page)]),
]);

/** Normalises a request path to its catalog key, tolerating a trailing slash. */
export function canonicalMarkdownPath(pathname: string): string {
  if (pathname === "" || pathname === "/") {
    return "/";
  }

  const trimmed = pathname.replace(/\/+$/, "");

  return trimmed === "" ? "/" : trimmed;
}

export function markdownFor(pathname: string): string | undefined {
  return markdownPages.get(canonicalMarkdownPath(pathname));
}

/**
 * The body of a 404. An agent that lands on a dead path should be able to recover from the
 * response alone, so it names the live routes and the machine-readable endpoints rather than
 * just stating the status.
 */
export function notFoundMarkdown(pathname: string): string {
  return [
    "# 404 — Page not found",
    "",
    `> \`${pathname}\` does not exist on ${siteName}.`,
    "",
    "This site is small and fully enumerated. Every live route is listed below; if you were",
    "following a link, one of these is almost certainly what it meant.",
    "",
    "## Start here",
    "",
    `- [${siteName}](${siteUrl}/): ${siteDescription}`,
    "",
    "## Products",
    "",
    ...toolkits.map(
      (toolkit: Toolkit) => `- [${toolkit.name}](${absolute(toolkit.route)}): ${toolkit.summary}`
    ),
    "",
    "## Site",
    "",
    ...prosePages.map(
      (page: ProsePage) => `- [${page.title}](${absolute(page.route)}): ${page.description}`
    ),
    "",
    "## Machine-readable endpoints",
    "",
    ...endpointList(),
    "",
  ].join("\n");
}
