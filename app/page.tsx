import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  CheckCircle2,
  Eye,
  Github,
  Layers3,
  Radio,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { ToolkitCard } from "@/components/toolkit-card";
import { Button } from "@/components/ui/button";
import { toolkits } from "@/lib/toolkits";

const workflow = [
  {
    detail: "Turn a selected Figma subtree into React Native and NativeWind component code.",
    icon: Layers3,
    label: "Shape the interface",
    tool: "Design to NativeWind",
  },
  {
    detail: "Snapshot project facts before choosing a deeper maintenance workflow.",
    icon: Eye,
    label: "Read the project",
    tool: "RN Agents Kit",
  },
  {
    detail: "Make assets addressable by typed names and audit what the app no longer uses.",
    icon: Braces,
    label: "Normalize the inputs",
    tool: "rn-typed-assets",
  },
  {
    detail: "Classify New Architecture signals conservatively without changing project files.",
    icon: ScanLine,
    label: "Expose migration risk",
    tool: "rn-newarch-ready",
  },
];

const trustPrinciples = [
  {
    description:
      "Generators and audits operate on explicit project inputs so their output can be reproduced and reviewed.",
    icon: Activity,
    title: "Deterministic core",
  },
  {
    description:
      "Missing evidence stays unknown or needs-review. The tools avoid turning weak signals into confident claims.",
    icon: ShieldCheck,
    title: "Conservative truth",
  },
  {
    description:
      "Agent skills inspect first. Any mutation requires consent and leaves the resulting diff visible for review.",
    icon: CheckCircle2,
    title: "Reviewable change",
  },
];

export default function HomePage() {
  return (
    <main>
      <LegacyHashRedirect />

      <section className="field-grid relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-y-0 left-[7%] w-px bg-border/70" />
        <div className="absolute inset-y-0 right-[7%] w-px bg-border/70" />
        <div className="mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-24">
          <div className="reveal relative z-10">
            <p className="section-kicker">React Native Toolkits / Field index</p>
            <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[0.86] font-semibold tracking-[-0.065em] text-balance text-foreground sm:text-7xl lg:text-[6.7rem]">
              Build less blind.
              <span className="mt-2 block text-primary">Ship more certain.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A focused collection of developer tools for the React Native work that gets brittle:
              assets, architecture audits, design handoff, and agent-led maintenance.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-none px-6" size="lg">
                <a href="#toolkits">
                  Browse the field kit
                  <ArrowDown className="size-4" />
                </a>
              </Button>
              <Button asChild className="h-12 rounded-none px-6" size="lg" variant="outline">
                <Link href="/rn-agents-kit">
                  Meet the agent kit
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 border-y border-border py-5">
              <div>
                <dt className="font-mono text-[0.64rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Public tools
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold">04</dd>
              </div>
              <div className="border-l border-border pl-5">
                <dt className="font-mono text-[0.64rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Agent skills
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold">06</dd>
              </div>
              <div className="border-l border-border pl-5">
                <dt className="font-mono text-[0.64rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Runtime deps
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold">00*</dd>
              </div>
            </dl>
            <p className="mt-2 font-mono text-[0.6rem] text-muted-foreground">
              * rn-typed-assets package runtime dependencies
            </p>
          </div>

          <div className="reveal reveal-delay-2 relative lg:pl-8">
            <div className="absolute -top-8 -right-5 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase sm:right-0">
              Coordinate / RN-37.7749
            </div>
            <div className="lab-panel border border-border bg-card/92 p-5 shadow-[20px_20px_0_color-mix(in_oklch,var(--primary)_11%,transparent)] sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Radio className="size-4 text-primary" />
                  <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase">
                    RN field console
                  </span>
                </div>
                <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] text-accent-ink uppercase">
                  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                  Signals live
                </span>
              </div>

              <div className="mt-7 space-y-3 font-mono text-xs">
                {[
                  ["assets.registry", "typed / generated", "01"],
                  ["newarch.signal", "needs-review", "02"],
                  ["agent.audit", "read-only first", "03"],
                  ["figma.output", "rn + nativewind", "04"],
                ].map(([signal, state, index]) => (
                  <div
                    className="signal-track grid grid-cols-[2rem_1fr_auto] items-center gap-3 border border-border bg-background/80 px-3 py-3.5"
                    key={signal}
                  >
                    <span className="text-muted-foreground">{index}</span>
                    <span className="text-foreground">{signal}</span>
                    <span className="text-primary-ink">{state}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-[1fr_auto] gap-5 border-t border-border pt-5">
                <div>
                  <p className="font-mono text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase">
                    Operating posture
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    Inspect the real project. Keep weak evidence weak. Make every change reviewable.
                  </p>
                </div>
                <Bot className="mt-1 size-8 text-primary" strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border" id="toolkits">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <p className="section-kicker">Module directory</p>
            <div>
              <h2 className="font-display text-4xl leading-[0.95] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
                Four focused tools. One maintenance mindset.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                Use one product or combine them around your workflow. Each module has a narrow job,
                a public source, and a direct path to the underlying tool.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
            {toolkits.map((toolkit) => (
              <ToolkitCard key={toolkit.slug} toolkit={toolkit} />
            ))}
          </div>
        </div>
      </section>

      <section className="field-grid border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-kicker">Workflow rail</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
              Enter the loop where the uncertainty is.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              This is a map, not a mandatory suite. Start with the problem in front of you and use
              the smallest module that can expose or remove it.
            </p>
          </div>

          <ol className="mt-14 grid gap-px bg-border lg:grid-cols-4">
            {workflow.map((step, index) => (
              <li className="relative min-h-72 bg-background p-6 sm:p-7" key={step.label}>
                <div className="flex items-start justify-between">
                  <step.icon className="size-6 text-primary" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {step.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                <p className="absolute right-7 bottom-7 left-7 border-t border-border pt-3 font-mono text-[0.64rem] tracking-[0.11em] text-primary-ink uppercase">
                  {step.tool}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="section-kicker">Trust contract</p>
              <h2 className="mt-6 font-display text-4xl leading-[0.98] font-semibold tracking-[-0.05em] sm:text-5xl">
                Evidence before confidence.
              </h2>
            </div>
            <div className="grid gap-px bg-border md:grid-cols-3">
              {trustPrinciples.map((principle) => (
                <article className="bg-card p-6 sm:p-7" key={principle.title}>
                  <principle.icon className="size-6 text-primary" strokeWidth={1.5} />
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.035em]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-primary-inverse-ink uppercase">
              First recommended module / 01
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
              Put an audit-first agent on the React Native maintenance loop.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-12 rounded-none px-6">
              <Link href="/rn-agents-kit">
                Explore RN Agents Kit
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-none border-background/30 bg-transparent px-6 text-background hover:bg-background hover:text-foreground"
              variant="outline"
            >
              <a
                href="https://github.com/AndrewDongminYoo"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="size-4" />
                View all public work
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
