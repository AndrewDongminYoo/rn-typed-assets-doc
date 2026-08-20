import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Toolkit } from "@/lib/toolkits";

interface ProductHeroProps {
  children?: ReactNode;
  description?: string;
  intro: string;
  toolkit: Toolkit;
}

export function ProductHero({ children, description, intro, toolkit }: ProductHeroProps) {
  const accentStyle = { "--tool-accent": toolkit.accent } as CSSProperties;

  return (
    <section
      className="field-grid tool-accent-scope relative isolate overflow-hidden border-b border-border"
      style={accentStyle}
    >
      <div className="absolute inset-y-0 left-[7%] w-px bg-border/70" />
      <div className="absolute inset-y-0 right-[7%] w-px bg-border/70" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:px-12 lg:py-28">
        <div className="reveal relative">
          <div className="mb-8 flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.18em] uppercase">
            <span className="inline-flex size-2 bg-[var(--tool-accent)] shadow-[0_0_18px_var(--tool-accent)]" />
            <span className="text-[var(--tool-accent-ink)]">{toolkit.eyebrow}</span>
            <span className="text-muted-foreground">{toolkit.status}</span>
          </div>
          <h1 className="max-w-4xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance text-foreground sm:text-7xl lg:text-[5.4rem]">
            {toolkit.name}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 font-medium text-foreground/90 sm:text-2xl">
            {intro}
          </p>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {description}
            </p>
          )}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-none px-5" size="lg">
              <a href="#start">
                Start here
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild className="h-11 rounded-none px-5" size="lg" variant="outline">
              <a href={toolkit.githubUrl} rel="noopener noreferrer" target="_blank">
                <Github className="size-4" />
                GitHub
              </a>
            </Button>
            {toolkit.productUrl && (
              <Button asChild className="h-11 rounded-none px-5" size="lg" variant="ghost">
                <a href={toolkit.productUrl} rel="noopener noreferrer" target="_blank">
                  {toolkit.productLabel}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative lg:pb-1">
          <div className="lab-panel min-h-72 border border-border bg-background/82 p-5 shadow-[16px_16px_0_color-mix(in_oklch,var(--tool-accent)_14%,transparent)] sm:p-7">
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              <span className="text-muted-foreground">Live field notes</span>
              <span className="flex items-center gap-2 text-[var(--tool-accent-ink)]">
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--tool-accent)]" />
                Public surface
              </span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
