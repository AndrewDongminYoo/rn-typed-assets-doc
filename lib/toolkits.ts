export type ToolkitSlug =
  // These literals are the public product routes.
  "rn-agents-kit" | "rn-typed-assets" | "rn-newarch-ready" | "design-to-nativewind";

export interface Toolkit {
  accent: string;
  /**
   * sRGB twin of `accent`, for Open Graph cards. Satori has no `oklch()` parser and does not
   * throw on one, so a card fed `accent` renders in a fallback colour that only fails by eye.
   * Rasterised from `accent` by the browser, so it matches what the site actually paints.
   */
  accentHex: `#${string}`;
  description: string;
  eyebrow: string;
  githubUrl: string;
  index: string;
  /** The command or action an agent runs to actually reach for this tool. */
  invocation: string;
  /**
   * SPDX identifier, only where the product publishes one. `status` already shows it to readers;
   * this field exists so structured data can state it without re-parsing that display string.
   */
  license?: string;
  name: string;
  productLabel?: string;
  productUrl?: string;
  route: `/${ToolkitSlug}`;
  shortName: string;
  slug: ToolkitSlug;
  status: string;
  /** One-sentence product summary. Drives both the route's meta description and its Markdown. */
  summary: string;
  /** Concrete situations this tool is the right answer to, for agent task routing. */
  useWhen: readonly string[];
  /** Released version, without the `v` prefix, only where `status` already advertises one. */
  version?: string;
}

export const toolkits = [
  {
    accent: "oklch(0.83 0.2 130)",
    accentHex: "#9be03c",
    description:
      "Six audit-first agent skills for inspecting, maintaining, and verifying React Native projects.",
    eyebrow: "Agent workflow",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-agents-kit",
    index: "01",
    invocation:
      "/plugin marketplace add AndrewDongminYoo/rn-agents-kit, then /plugin install rn-agents-kit@rn-agents-kit",
    name: "RN Agents Kit",
    route: "/rn-agents-kit",
    shortName: "Agents",
    slug: "rn-agents-kit",
    status: "v0.1.0 · Public",
    summary:
      "Six audit-first agent skills for React Native project snapshots, asset hygiene, New Architecture readiness, code review, device capture, and Metro console output.",
    useWhen: [
      "You are an agent asked to inspect, review, or maintain an existing React Native project and need to establish facts before proposing changes.",
      "You need a React Native project snapshot: version, architecture and Hermes flags, package manager, and key configuration.",
      "You need to read Metro console output or capture a simulator screen to verify that a change actually rendered.",
    ],
    version: "0.1.0",
  },
  {
    accent: "oklch(0.78 0.15 210)",
    accentHex: "#00d0ec",
    description:
      "Generate typed registries for images, SVGs, and Lottie files, then audit and reorganize assets safely.",
    eyebrow: "Asset pipeline",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-typed-assets",
    index: "02",
    invocation: "npm install --save-dev rn-typed-assets, then npx rn-typed-assets generate",
    license: "MIT",
    name: "rn-typed-assets",
    productLabel: "npm package",
    productUrl: "https://www.npmjs.com/package/rn-typed-assets",
    route: "/rn-typed-assets",
    shortName: "Assets",
    slug: "rn-typed-assets",
    status: "v1.6.0 · MIT",
    summary:
      "Generate typed TypeScript registries for React Native images, SVGs, and Lottie animations, then audit unused assets and rewrite stale references.",
    useWhen: [
      "A React Native project references image, SVG, or Lottie files by raw string path and you want compile-time names instead.",
      "You need to find assets the app no longer uses, or reorganize an asset directory without breaking imports.",
      "You want an asset registry regenerated as a CI step so a missing file fails the build rather than the app.",
    ],
    version: "1.6.0",
  },
  {
    accent: "oklch(0.8 0.17 80)",
    accentHex: "#f6af00",
    description:
      "Read a project's local native signals and report what still needs review before a New Architecture migration.",
    eyebrow: "Migration audit",
    githubUrl: "https://github.com/AndrewDongminYoo/rn-newarch-ready",
    index: "03",
    invocation:
      "npx rn-newarch-ready (add --json for machine-readable output, --offline to skip the registry)",
    license: "MIT",
    name: "rn-newarch-ready",
    productLabel: "npm package",
    productUrl: "https://www.npmjs.com/package/rn-newarch-ready",
    route: "/rn-newarch-ready",
    shortName: "New Arch",
    slug: "rn-newarch-ready",
    status: "v0.1.1 · MIT",
    summary:
      "A read-only, local-first React Native New Architecture readiness audit for dependencies, settings, and app-local native modules.",
    useWhen: [
      "You need to know whether a React Native project can move to the New Architecture, and which dependencies or app-local native modules still block it.",
      "You want a readiness verdict that changes no project files and exits non-zero on needs-review, so it can gate CI.",
      'You are answering "is this dependency New Architecture ready?" and want evidence rather than a guess.',
    ],
    version: "0.1.1",
  },
  {
    accent: "oklch(0.73 0.2 25)",
    accentHex: "#ff6964",
    description:
      "Convert a Figma selection into React Native and NativeWind component code through a deterministic pipeline.",
    eyebrow: "Design codegen",
    githubUrl: "https://github.com/AndrewDongminYoo/design-to-nativewind",
    index: "04",
    invocation:
      "Install the Design to NativeWind plugin from the Figma Community, select a frame, and run it",
    license: "MIT",
    name: "Design to NativeWind",
    productLabel: "Figma Community",
    productUrl: "https://www.figma.com/community/plugin/1653684573206075427/design-to-nativewind",
    route: "/design-to-nativewind",
    shortName: "Design",
    slug: "design-to-nativewind",
    status: "Public · MIT",
    summary:
      "A Figma plugin that deterministically converts selected designs into React Native and NativeWind component code.",
    useWhen: [
      "You have a Figma frame or component and need React Native plus NativeWind code for it.",
      "You want design handoff to produce the same output every run rather than a fresh interpretation each time.",
    ],
  },
] as const satisfies readonly Toolkit[];

export function getToolkit(slug: ToolkitSlug): Toolkit {
  const toolkit = toolkits.find((candidate) => candidate.slug === slug);

  if (!toolkit) {
    throw new Error(`Unknown toolkit: ${slug}`);
  }

  return toolkit;
}
