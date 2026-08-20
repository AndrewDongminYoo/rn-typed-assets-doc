import { ArrowUpRight, Bot, Boxes, ScanSearch, WandSparkles } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import type { Toolkit } from "@/lib/toolkits";

const icons = {
  "design-to-nativewind": WandSparkles,
  "rn-agents-kit": Bot,
  "rn-newarch-ready": ScanSearch,
  "rn-typed-assets": Boxes,
};

export function ToolkitCard({ toolkit }: { toolkit: Toolkit }) {
  const Icon = icons[toolkit.slug];
  const accentStyle = { "--tool-accent": toolkit.accent } as CSSProperties;

  return (
    <Link
      className="toolkit-card tool-accent-scope group relative flex min-h-80 flex-col overflow-hidden border border-border bg-card/80 p-6 transition-colors duration-300 hover:border-[var(--tool-accent)] sm:p-8"
      href={toolkit.route}
      style={accentStyle}
    >
      <div className="absolute top-0 right-0 h-24 w-24 border-b border-l border-border/70 bg-[linear-gradient(135deg,transparent_49%,var(--border)_50%,transparent_51%)] opacity-70 transition-colors group-hover:border-[var(--tool-accent)]" />
      <div className="mb-12 flex items-start justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          MODULE / {toolkit.index}
        </span>
        <Icon className="size-5 text-[var(--tool-accent)]" strokeWidth={1.5} />
      </div>

      <div className="mt-auto">
        <p className="mb-3 font-mono text-xs tracking-[0.16em] text-[var(--tool-accent-ink)] uppercase">
          {toolkit.eyebrow}
        </p>
        <h3 className="font-display text-3xl leading-none font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
          {toolkit.name}
        </h3>
        <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
          {toolkit.description}
        </p>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
            {toolkit.status}
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            Open module
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
