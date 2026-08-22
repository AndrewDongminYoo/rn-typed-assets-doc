import {
  AlertTriangle,
  Code,
  FileType,
  FolderSync,
  GitCompare,
  Hash,
  RefreshCw,
  Search,
  Settings,
  Zap,
} from "lucide-react";

const features = [
  {
    description:
      "Works out of the box with the default src/assets layout. No configuration required for standard React Native projects.",
    icon: Zap,
    title: "Zero-config setup",
  },
  {
    description:
      "Native support for images (PNG/JPG/WebP), SVGs, and Lottie animations (JSON). Each type gets its own typed export.",
    icon: FileType,
    title: "Three built-in asset types",
  },
  {
    description:
      "Generated files are stable across runs and friendly to code review. Keys are sorted alphabetically for consistent diffs.",
    icon: GitCompare,
    title: "Deterministic output",
  },
  {
    description:
      "Files that normalize to the same key (harini-cry.png and harini_cry.png, for example) are caught at generation time with clear errors.",
    icon: AlertTriangle,
    title: "Collision detection",
  },
  {
    description:
      "The audit command compares the manifest against the scanned source roots, reports every unreferenced asset, and deletes them on request.",
    icon: Search,
    title: "Manifest-backed audit",
  },
  {
    description:
      "The generate --inplace command rewrites every require() call and stale dotted reference in the project's source files.",
    icon: RefreshCw,
    title: "Automatic source rewriting",
  },
  {
    description:
      "Each manifest entry carries a SHA-1 hash, enabling the codemod to track files that move or are renamed without content changes.",
    icon: Hash,
    title: "Content-hash diffing",
  },
  {
    description:
      "The organize command migrates flat or legacy asset directories into canonical subdirectories (images/, svgs/, lotties/).",
    icon: FolderSync,
    title: "Asset organization",
  },
  {
    description:
      "Override paths, export names, TypeScript type imports, or add entirely new asset types through rn-typed-assets.config.js.",
    icon: Settings,
    title: "Fully configurable",
  },
  {
    description:
      "Every function is exported, so the generation pipeline can run from a build script instead of the CLI.",
    icon: Code,
    title: "Programmatic API",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-border" id="features">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">Feature surface / 10</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            What the generator actually ships.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Each entry below maps to a command, a flag, or a file the CLI writes.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {features.map((feature, index) => (
            <article className="min-h-64 bg-background p-6 sm:p-8" key={feature.title}>
              <div className="flex items-start justify-between">
                <feature.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-12 font-display text-3xl font-semibold tracking-[-0.04em]">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
