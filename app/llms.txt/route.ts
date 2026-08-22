import { siteDescription, siteName, siteUrl } from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";
import { toolkits } from "@/lib/toolkits";

export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "## Toolkits",
    "",
    ...toolkits.map((toolkit: Toolkit) => {
      const product = toolkit.productUrl ? ` ${toolkit.productLabel}: ${toolkit.productUrl}.` : "";

      return `- [${toolkit.name}](${siteUrl}${toolkit.route}): ${toolkit.description} Status: ${toolkit.status}. Source: ${toolkit.githubUrl}.${product}`;
    }),
    "",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
