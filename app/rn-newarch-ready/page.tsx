import { ArrowRight, Box, Braces, Database, Github, ScanSearch, ShieldAlert } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { CodeBlock } from "@/components/code-block";
import { ProductHero } from "@/components/product-hero";
import { Button } from "@/components/ui/button";
import { productMetadata } from "@/lib/site";
import { getToolkit } from "@/lib/toolkits";

const installCode = `npm install --save-dev rn-newarch-ready`;

const usageCode = `npx rn-newarch-ready
npx rn-newarch-ready ./path/to/app
npx rn-newarch-ready --json
npx rn-newarch-ready --offline`;

const checks = [
  {
    description:
      "Reads the React Native version and platform configuration to establish the project's current architecture state.",
    icon: Braces,
    title: "Project state",
  },
  {
    description:
      "Inspects installed packages for native footprints and local codegenConfig evidence before consulting network data.",
    icon: Box,
    title: "Dependency signals",
  },
  {
    description:
      "Optionally enriches unknown native packages with attributed React Native Directory data and caches the result.",
    icon: Database,
    title: "Directory context",
  },
  {
    description:
      "Scans app-owned Android and iOS native source for legacy-only module patterns that still need human review.",
    icon: ScanSearch,
    title: "App-local modules",
  },
];

const signalRows = [
  ["supported", "Local codegenConfig signal", "Strong local evidence"],
  ["likely-supported", "Public directory marks the library ready", "Verify the pinned version"],
  ["unknown", "Native footprint without a positive signal", "Manual review required"],
  ["not-native", "No native footprint detected", "Outside migration risk"],
  ["not-installed", "Declared package is unresolved", "Install before classifying"],
];

const toolkit = getToolkit("rn-newarch-ready");

export const metadata = productMetadata(
  toolkit,
  "A read-only, local-first React Native New Architecture readiness audit for dependencies, settings, and app-local native modules."
);

export default function NewArchitectureReadyPage() {
  return (
    <main
      className="tool-accent-scope"
      style={{ "--tool-accent": toolkit.accent } as CSSProperties}
    >
      <ProductHero
        description="The CLI reads local configuration and installed packages first, enriches uncertain dependencies with public directory data when online, and states what still requires human verification."
        intro="Audit New Architecture readiness without pretending an absent signal is proof of incompatibility."
        toolkit={toolkit}
      >
        <div className="space-y-3 font-mono text-xs">
          {[
            ["supported", "local signal"],
            ["likely-supported", "directory hint"],
            ["unknown", "manual review"],
            ["verdict", "ready / needs-review"],
          ].map(([signal, value]) => (
            <div
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              key={signal}
            >
              <span>{signal}</span>
              <span className="text-[var(--tool-accent-ink)]">{value}</span>
            </div>
          ))}
        </div>
      </ProductHero>

      <section className="border-b border-border" id="start">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker">Install / npm</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
              Point it at the real project.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Run the human-readable audit in the current project, target another path, request JSON
              for automation, or stay fully local with offline mode.
            </p>
          </div>
          <div className="grid min-w-0 gap-5">
            <CodeBlock code={installCode} language="bash" />
            <CodeBlock code={usageCode} language="bash" />
          </div>
        </div>
      </section>

      <section className="field-grid border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-kicker">Audit surface / v1</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
              Four evidence channels, one conservative report.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
            {checks.map((check, index) => (
              <article className="min-h-64 bg-background p-6 sm:p-8" key={check.title}>
                <div className="flex items-start justify-between">
                  <check.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-12 font-display text-3xl font-semibold tracking-[-0.04em]">
                  {check.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                  {check.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker">Signal vocabulary</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-5xl">
              Unknown is an honest result.
            </h2>
            <div className="mt-7 flex items-start gap-3 border-l-2 border-[var(--tool-accent)] pl-4">
              <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[var(--tool-accent)]" />
              <p className="text-sm leading-6 text-muted-foreground">
                The v0.x report shape may change. Migration and project mutation remain outside this
                CLI&apos;s scope.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full min-w-160 border-collapse text-left">
              <thead>
                <tr className="font-mono text-[0.65rem] tracking-[0.13em] text-muted-foreground uppercase">
                  <th className="border-b border-border py-4 pr-5 font-normal">Status</th>
                  <th className="border-b border-border py-4 pr-5 font-normal">Evidence</th>
                  <th className="border-b border-border py-4 font-normal">Operator action</th>
                </tr>
              </thead>
              <tbody>
                {signalRows.map(([status, evidence, action]) => (
                  <tr className="text-sm" key={status}>
                    <td className="border-b border-border py-5 pr-5 font-mono text-[var(--tool-accent-ink)]">
                      {status}
                    </td>
                    <td className="border-b border-border py-5 pr-5 text-foreground">{evidence}</td>
                    <td className="border-b border-border py-5 text-muted-foreground">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-[var(--tool-accent-inverse-ink)] uppercase">
              Deterministic layer → judgment layer
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
              Need interpretation around the report?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-background/65">
              The public rn-newarch-audit skill wraps this CLI with an audit-first agent workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-12 rounded-none px-6">
              <Link href="/rn-agents-kit">
                Open RN Agents Kit
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-none border-background/30 bg-transparent px-6 text-background hover:bg-background hover:text-foreground"
              variant="outline"
            >
              <a href={toolkit.githubUrl} rel="noopener noreferrer" target="_blank">
                <Github className="size-4" />
                Review the CLI
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
