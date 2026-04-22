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

import { FeatureCard } from "@/components/feature-card";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Zero-Config Setup",
    description:
      "Works out of the box with the default src/assets layout. No configuration required for standard React Native projects.",
  },
  {
    icon: <FileType className="h-6 w-6" />,
    title: "Three Built-in Asset Types",
    description:
      "Native support for images (PNG/JPG/WebP), SVGs, and Lottie animations (JSON). Each type gets its own typed export.",
  },
  {
    icon: <GitCompare className="h-6 w-6" />,
    title: "Deterministic Output",
    description:
      "Generated files are stable across runs and friendly to code review. Keys are sorted alphabetically for consistent diffs.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Collision Detection",
    description:
      "Files that normalize to the same key (e.g., harini-cry.png and harini_cry.png) are caught at generation time with clear errors.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Manifest-Backed Audit",
    description:
      "Find and optionally delete unused assets that are no longer referenced anywhere in your source code.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Automatic Source Rewriting",
    description:
      "The generate --inplace command rewrites every require() call and stale dotted reference in your source files automatically.",
  },
  {
    icon: <Hash className="h-6 w-6" />,
    title: "Content-Hash Diffing",
    description:
      "Each manifest entry carries a SHA-1 hash, enabling the codemod to track files that move or are renamed without content changes.",
  },
  {
    icon: <FolderSync className="h-6 w-6" />,
    title: "Asset Organization",
    description:
      "The organize command migrates flat or legacy asset directories into canonical subdirectories (images/, svgs/, lotties/).",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Fully Configurable",
    description:
      "Override paths, export names, TypeScript type imports, or add entirely new asset types via rn-typed-assets.config.js.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Programmatic API",
    description:
      "Every function is exported for integration into your own scripts or build tools. Full control over the generation pipeline.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28" id="features">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Powerful Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Everything you need to manage React Native assets with confidence and type safety.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
