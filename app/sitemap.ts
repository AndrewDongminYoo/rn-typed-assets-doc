import type { MetadataRoute } from "next";

import type { ProsePage } from "@/lib/prose-pages";
import { prosePages } from "@/lib/prose-pages";
import { siteUrl } from "@/lib/site";
import { toolkits } from "@/lib/toolkits";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { changeFrequency: "monthly", priority: 1, url: siteUrl },
    ...toolkits.map((toolkit) => ({
      changeFrequency: "monthly" as const,
      priority: 0.8,
      url: `${siteUrl}${toolkit.route}`,
    })),
    // Trust anchors. Lower priority than the products, but they must be crawlable: these are the
    // pages an agent checks before recommending anything the site publishes.
    ...prosePages.map((page: ProsePage) => ({
      changeFrequency: "yearly" as const,
      priority: 0.5,
      url: `${siteUrl}${page.route}`,
    })),
  ];
}
