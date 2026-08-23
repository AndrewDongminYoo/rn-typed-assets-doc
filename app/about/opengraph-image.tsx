import { ogContentType, ogSize, renderProseCard } from "@/lib/og-card";
import { aboutPage } from "@/lib/prose-pages";

export const alt = `${aboutPage.title} — ${aboutPage.description}`;
export const contentType = ogContentType;
export const size = ogSize;

export default function Image() {
  return renderProseCard(aboutPage, "05");
}
