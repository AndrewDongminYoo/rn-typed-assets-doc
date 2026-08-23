import { ogContentType, ogSize, renderProseCard } from "@/lib/og-card";
import { privacyPage } from "@/lib/prose-pages";

export const alt = `${privacyPage.title} — ${privacyPage.description}`;
export const contentType = ogContentType;
export const size = ogSize;

export default function Image() {
  return renderProseCard(privacyPage, "07");
}
