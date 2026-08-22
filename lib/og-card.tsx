import { ImageResponse } from "next/og";

import { siteName } from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";

/** Facebook's and X's shared-link card ratio. */
export const ogSize = { height: 630, width: 1200 };

export const ogContentType = "image/png";

/**
 * Colours are sRGB literals rather than the OKLch tokens in `app/globals.css`, because Satori has
 * no `oklch()` parser. A card is not theme-aware, so it commits to the site's dark palette.
 */
const palette = {
  background: "#04090e",
  foreground: "#eeebe3",
  muted: "#8798a3",
  rule: "#252f38",
};

interface CardProps {
  accentHex: string;
  description: string;
  eyebrow: string;
  footnote: string;
  index: string;
  title: string;
}

/**
 * Only `Geist-Regular.ttf` ships with the bundled Satori and it does not synthesise weights, so
 * this card builds hierarchy from size, colour, and letter spacing rather than from `fontWeight`.
 */
function Card({ accentHex, description, eyebrow, footnote, index, title }: CardProps) {
  return (
    <div
      style={{
        background: palette.background,
        color: palette.foreground,
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ background: accentHex, width: 14 }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <div style={{ alignItems: "center", display: "flex" }}>
            <div style={{ background: accentHex, height: 16, width: 16 }} />
            <div style={{ color: accentHex, fontSize: 25, letterSpacing: 5, marginLeft: 18 }}>
              {eyebrow.toUpperCase()}
            </div>
          </div>
          <div style={{ color: palette.muted, fontSize: 25, letterSpacing: 5 }}>{index}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
          <div
            style={{
              color: palette.muted,
              fontSize: 31,
              lineHeight: 1.45,
              marginTop: 30,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ background: palette.rule, height: 1 }} />
          <div
            style={{
              color: palette.muted,
              display: "flex",
              fontSize: 23,
              justifyContent: "space-between",
              letterSpacing: 4,
              marginTop: 26,
            }}
          >
            <div>{siteName.toUpperCase()}</div>
            <div style={{ color: accentHex }}>{footnote.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function renderCard(props: CardProps) {
  return new ImageResponse(<Card {...props} />, ogSize);
}

/** Every field comes from the catalog, so a new product needs no separate card registration. */
export function renderToolkitCard(toolkit: Toolkit) {
  return renderCard({
    accentHex: toolkit.accentHex,
    description: toolkit.description,
    eyebrow: toolkit.eyebrow,
    footnote: toolkit.status,
    index: toolkit.index,
    title: toolkit.name,
  });
}
