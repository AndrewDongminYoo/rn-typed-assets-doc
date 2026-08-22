import { ogContentType, ogSize, renderToolkitCard } from "@/lib/og-card";
import { getToolkit } from "@/lib/toolkits";

const toolkit = getToolkit("rn-newarch-ready");

export const alt = `${toolkit.name} — ${toolkit.description}`;
export const contentType = ogContentType;
export const size = ogSize;

export default function Image() {
  return renderToolkitCard(toolkit);
}
