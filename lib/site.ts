import type { Metadata } from "next";

import type { Toolkit } from "@/lib/toolkits";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

/**
 * Canonical origin, without a trailing slash. Override with NEXT_PUBLIC_SITE_URL when serving the
 * site from somewhere else; a blank value falls back rather than reaching `new URL("")`.
 */
export const siteUrl = configuredUrl || "https://rn-toolkits.donminzzi.kr";

export const siteName = "React Native Toolkits";

export const siteLocale = "en";

export const siteDescription =
  "A focused collection of React Native developer tools for agent workflows, typed assets, New Architecture audits, and NativeWind code generation.";

/**
 * Maintainer identity, mirroring what the published npm package manifests already expose in their
 * `author` field. Nothing here is private: the same name, email, and profile ship with every
 * release of `rn-typed-assets` and `rn-newarch-ready`.
 */
export const siteAuthor = {
  email: "ydm2790@gmail.com",
  githubUrl: "https://github.com/AndrewDongminYoo",
  name: "Dongmin Yoo",
} as const;

/**
 * Publisher address for `Organization` structured data. Deliberately coarse — the project is a
 * personal open-source effort, so it declares a locality and a country and nothing narrower.
 */
export const siteAddress = {
  addressCountry: "KR",
  addressLocality: "Seoul",
} as const;

/** Machine-readable documents an agent can fetch instead of scraping the rendered pages. */
export const agentEndpoints = [
  {
    description: "Site index for language models, including when to use each toolkit.",
    path: "/llms.txt",
  },
  {
    description: "Agent instruction file: task routing, invocation, and refusal boundaries.",
    path: "/agents.md",
  },
  { description: "Every indexable route with its last-modified metadata.", path: "/sitemap.xml" },
  { description: "Crawl policy and the sitemap pointer.", path: "/robots.txt" },
] as const;

/**
 * The `.md` sibling of a page. `Link: rel="alternate"` and the `<link rel="alternate">` tag both
 * point here, and a crawler that follows one may send no `Accept` header at all, so the extension
 * has to work on its own.
 */
export function markdownAlternatePath(route: string): string {
  return route === "/" ? "/index.md" : `${route}.md`;
}

/** Canonical URL plus the discoverable Markdown representation of the same page. */
export function markdownAlternates(route: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: route,
    types: { "text/markdown": [{ title: "Markdown", url: markdownAlternatePath(route) }] },
  };
}

/**
 * Page metadata for a product route. Without an own `openGraph` block a page inherits the root
 * one wholesale, so shared product links preview as the site root. The canonical URL is per-page
 * for the same reason: a root-level `alternates` block would point every route at `/`.
 */
export function productMetadata(toolkit: Toolkit): Metadata {
  const description = toolkit.summary;

  return {
    alternates: markdownAlternates(toolkit.route),
    description,
    openGraph: {
      description,
      siteName,
      title: toolkit.name,
      type: "website",
      url: toolkit.route,
    },
    title: toolkit.name,
  };
}

/** Metadata for a non-product prose page, so each one carries its own canonical and OG block. */
export function pageMetadata(route: string, title: string, description: string): Metadata {
  return {
    alternates: markdownAlternates(route),
    description,
    openGraph: {
      description,
      siteName,
      title,
      type: "website",
      url: route,
    },
    title,
  };
}
