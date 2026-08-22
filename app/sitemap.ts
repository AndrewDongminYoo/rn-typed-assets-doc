import type { MetadataRoute } from "next";

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
  ];
}
