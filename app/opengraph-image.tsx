import { ogContentType, ogSize, renderCard } from "@/lib/og-card";
import { siteName } from "@/lib/site";
import { toolkits } from "@/lib/toolkits";

export const alt = `${siteName} — the field index of React Native developer tools`;
export const contentType = ogContentType;
export const size = ogSize;

/** sRGB twin of the dark `--accent` token in `app/globals.css`, `oklch(0.83 0.2 132)`. */
const hubAccent = "#95e144";

export default function Image() {
  return renderCard({
    accentHex: hubAccent,
    description:
      "A focused collection of developer tools for the React Native work that gets brittle: assets, architecture audits, design handoff, and agent-led maintenance.",
    eyebrow: "Field index",
    // The footer row has no wrap fallback, so a longer string overlaps the site name beside
    // it instead of wrapping. Keep this static rather than deriving it from a list.
    footnote: "Inspect · Automate · Verify",
    index: String(toolkits.length).padStart(2, "0"),
    title: "Build less blind. Ship more certain.",
  });
}
