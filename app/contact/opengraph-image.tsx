import { ogContentType, ogSize, renderProseCard } from "@/lib/og-card";
import { contactPage } from "@/lib/prose-pages";

export const alt = `${contactPage.title} — ${contactPage.description}`;
export const contentType = ogContentType;
export const size = ogSize;

export default function Image() {
  return renderProseCard(contactPage, "06");
}
