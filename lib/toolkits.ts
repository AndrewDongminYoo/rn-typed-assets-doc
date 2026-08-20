export type ToolkitSlug =
  // These literals are the public product routes.
  "rn-agents-kit" | "rn-typed-assets" | "rn-newarch-ready" | "design-to-nativewind";

export interface Toolkit {
  accent: string;
  description: string;
  eyebrow: string;
  githubUrl: string;
  index: string;
  name: string;
  productLabel?: string;
  productUrl?: string;
  route: `/${ToolkitSlug}`;
  shortName: string;
  slug: ToolkitSlug;
  status: string;
}

export const toolkits = [
  {
    accent: "oklch(0.83 0.2 130)",
    description:
      "Six audit-first agent skills for inspecting, maintaining, and verifying React Native projects.",
    eyebrow: "Agent workflow",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-agents-kit",
    index: "01",
    name: "RN Agents Kit",
    route: "/rn-agents-kit",
    shortName: "Agents",
    slug: "rn-agents-kit",
    status: "v0.1.0 · Public",
  },
  {
    accent: "oklch(0.78 0.15 210)",
    description:
      "Generate typed registries for images, SVGs, and Lottie files, then audit and reorganize assets safely.",
    eyebrow: "Asset pipeline",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-typed-assets",
    index: "02",
    name: "rn-typed-assets",
    productLabel: "npm package",
    productUrl: "https://www.npmjs.com/package/rn-typed-assets",
    route: "/rn-typed-assets",
    shortName: "Assets",
    slug: "rn-typed-assets",
    status: "v1.6.0 · MIT",
  },
  {
    accent: "oklch(0.8 0.17 80)",
    description:
      "Read a project's local native signals and report what still needs review before a New Architecture migration.",
    eyebrow: "Migration audit",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-newarch-ready",
    index: "03",
    name: "rn-newarch-ready",
    productLabel: "npm package",
    productUrl: "https://www.npmjs.com/package/rn-newarch-ready",
    route: "/rn-newarch-ready",
    shortName: "New Arch",
    slug: "rn-newarch-ready",
    status: "v0.1.1 · MIT",
  },
  {
    accent: "oklch(0.73 0.2 25)",
    description:
      "Convert a Figma selection into React Native and NativeWind component code through a deterministic pipeline.",
    eyebrow: "Design codegen",
    githubUrl: "https://github.com/AndrewDongminYoo/design-to-nativewind",
    index: "04",
    name: "Design to NativeWind",
    productLabel: "Figma Community",
    productUrl: "https://www.figma.com/community/plugin/1653684573206075427/design-to-nativewind",
    route: "/design-to-nativewind",
    shortName: "Design",
    slug: "design-to-nativewind",
    status: "Public · MIT",
  },
] as const satisfies readonly Toolkit[];

export function getToolkit(slug: ToolkitSlug): Toolkit {
  const toolkit = toolkits.find((candidate) => candidate.slug === slug);

  if (!toolkit) {
    throw new Error(`Unknown toolkit: ${slug}`);
  }

  return toolkit;
}
