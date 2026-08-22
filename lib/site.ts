import type { Metadata } from "next";

import type { Toolkit } from "@/lib/toolkits";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

/**
 * Canonical origin, without a trailing slash. Override with NEXT_PUBLIC_SITE_URL when serving the
 * site from somewhere else; a blank value falls back rather than reaching `new URL("")`.
 */
export const siteUrl = configuredUrl || "https://rn-toolkits.donminzzi.kr";

export const siteName = "React Native Toolkits";

export const siteDescription =
  "A focused collection of React Native developer tools for agent workflows, typed assets, New Architecture audits, and NativeWind code generation.";

/**
 * Page metadata for a product route. Without an own `openGraph` block a page inherits the root
 * one wholesale, so shared product links preview as the site root.
 */
export function productMetadata(toolkit: Toolkit, description: string): Metadata {
  return {
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
