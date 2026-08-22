import {
  ArrowRight,
  Braces,
  Component,
  Figma,
  Github,
  Layers3,
  Palette,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";

import { ProductHero } from "@/components/product-hero";
import { Button } from "@/components/ui/button";
import { productMetadata } from "@/lib/site";
import { getToolkit } from "@/lib/toolkits";

const pipeline = [
  {
    description: "Read the selected Figma subtree, Auto Layout, spacing, color, and text data.",
    icon: Figma,
    label: "Extract selection",
  },
  {
    description:
      "Normalize the selection into an intermediate representation outside the renderer.",
    icon: Layers3,
    label: "Build the IR",
  },
  {
    description: "Map layout and style properties to NativeWind utilities through explicit rules.",
    icon: Palette,
    label: "Map styles",
  },
  {
    description: "Emit React Native components ready for preview, copy, and project integration.",
    icon: Braces,
    label: "Generate code",
  },
];

const capabilities = [
  {
    description:
      "Auto Layout, spacing, color, and text properties feed the deterministic NativeWind mapping pipeline.",
    icon: Layers3,
    title: "Layout to utilities",
  },
  {
    description:
      "Vector nodes export through Figma and become react-native-svg JSX in the generated component.",
    icon: Component,
    title: "Vector to JSX",
  },
  {
    description:
      "Repeated subtrees can be hoisted into sub-components instead of duplicating the same generated structure.",
    icon: Braces,
    title: "Component extraction",
  },
  {
    description:
      "An imported Tailwind or CSS theme can map design colors back to named project tokens.",
    icon: Palette,
    title: "Theme token mapping",
  },
  {
    description:
      "The rule-based result stands on its own; an optional assisted pass can refine naming and structure.",
    icon: Sparkles,
    title: "Optional cleanup pass",
  },
  {
    description:
      "Use the Dev Mode code generator or run the plugin with its preview-and-copy interface.",
    icon: Figma,
    title: "Two Figma surfaces",
  },
];

const toolkit = getToolkit("design-to-nativewind");

export const metadata = productMetadata(
  toolkit,
  "A Figma plugin that deterministically converts selected designs into React Native and NativeWind component code."
);

export default function DesignToNativeWindPage() {
  return (
    <main
      className="tool-accent-scope"
      style={{ "--tool-accent": toolkit.accent } as CSSProperties}
    >
      <ProductHero
        description="The conversion core operates on a plain intermediate representation. React Native and NativeWind are the first-class output; naming and structural cleanup can optionally use an assisted pass."
        intro="Turn the selected Figma subtree into React Native code without turning the design handoff into guesswork."
        toolkit={toolkit}
      >
        <div className="space-y-3 font-mono text-xs">
          {[
            ["figma.selection", "extract"],
            ["design.ir", "normalize"],
            ["nativewind.map", "deterministic"],
            ["component.tsx", "preview + copy"],
          ].map(([signal, value], index) => (
            <div
              className="grid grid-cols-[2rem_1fr_auto] gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              key={signal}
            >
              <span className="text-muted-foreground">0{index + 1}</span>
              <span>{signal}</span>
              <span className="text-[var(--tool-accent-ink)]">{value}</span>
            </div>
          ))}
        </div>
      </ProductHero>

      <section className="border-b border-border" id="start">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <p className="section-kicker">Conversion pipeline</p>
            <div>
              <h2 className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
                Selection in. Reviewable component out.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                The Figma-dependent extraction stays at the edge. Mapping and generation remain
                isolated from the host runtime so the core behavior can be tested against plain IR.
              </p>
            </div>
          </div>

          <ol className="mt-14 grid gap-px bg-border lg:grid-cols-4">
            {pipeline.map((step, index) => (
              <li className="relative min-h-72 bg-card p-6 sm:p-7" key={step.label}>
                <div className="flex items-start justify-between">
                  <step.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {step.label}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{step.description}</p>
                {index < pipeline.length - 1 && (
                  <ArrowRight className="absolute right-5 bottom-5 size-4 text-border lg:top-8 lg:-right-2.5 lg:bottom-auto lg:z-10" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="field-grid border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-kicker">Current capability</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
              Deterministic where it matters. Assisted only when invited.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability, index) => (
              <article className="min-h-68 bg-background p-6 sm:p-7" key={capability.title}>
                <div className="flex items-start justify-between">
                  <capability.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {capability.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker">Output boundary</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-5xl">
              React Native first.
            </h2>
          </div>
          <div>
            <article className="bg-card p-7">
              <p className="font-mono text-[0.65rem] tracking-[0.13em] text-[var(--tool-accent-ink)] uppercase">
                Current target
              </p>
              <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em]">
                React Native + NativeWind
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Expo-compatible component output with NativeWind utility classes is the shipped,
                first-class renderer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-[var(--tool-accent-inverse-ink)] uppercase">
              Figma Community / public plugin
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
              Take the conversion loop into Figma.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-12 rounded-none px-6">
              <a href={toolkit.productUrl} rel="noopener noreferrer" target="_blank">
                <Figma className="size-4" />
                Open the plugin
              </a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-none border-background/30 bg-transparent px-6 text-background hover:bg-background hover:text-foreground"
              variant="outline"
            >
              <a href={toolkit.githubUrl} rel="noopener noreferrer" target="_blank">
                <Github className="size-4" />
                Review the source
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
