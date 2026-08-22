import {
  ArrowRight,
  Bot,
  Camera,
  CheckCircle2,
  Github,
  ImageMinus,
  Radio,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import type { CSSProperties } from "react";

import { CodeBlock } from "@/components/code-block";
import { ProductHero } from "@/components/product-hero";
import { Button } from "@/components/ui/button";
import { productMetadata } from "@/lib/site";
import { getToolkit } from "@/lib/toolkits";

const installCode = `/plugin marketplace add AndrewDongminYoo/rn-agents-kit
/plugin install rn-agents-kit@rn-agents-kit`;

const skills = [
  {
    description:
      "Capture the project's React Native version, architecture and Hermes flags, package manager, and key configuration before choosing a deeper audit.",
    icon: ScanSearch,
    name: "rn-project-snapshot",
    posture: "Read-only",
  },
  {
    description:
      "Find unused images, SVGs, and Lottie files, then guide an explicitly approved migration to a typed registry.",
    icon: ImageMinus,
    name: "rn-asset-hygiene",
    posture: "Audit → consent",
  },
  {
    description:
      "Classify dependency and app-local native signals that matter when evaluating New Architecture readiness.",
    icon: ShieldCheck,
    name: "rn-newarch-audit",
    posture: "Read-only audit",
  },
  {
    description:
      "Run a focused React Native code-quality audit and adversarially verify findings before they reach the report.",
    icon: Bot,
    name: "rn-audit",
    posture: "Verified findings",
  },
  {
    description:
      "Capture an Android or iOS simulator screen to a stable path so the agent can inspect the rendered app.",
    icon: Camera,
    name: "rn-device-capture",
    posture: "Source read-only",
  },
  {
    description:
      "Read bounded console output from Metro's CDP endpoint to close the runtime verification loop.",
    icon: Radio,
    name: "rn-metro-console",
    posture: "Bounded reader",
  },
];

const contract = [
  ["01", "Inspect", "The first pass reads the project and reports what it can prove."],
  ["02", "Ask", "A skill that can mutate waits for explicit consent before changing source."],
  ["03", "Gate", "Approved changes run the target project's own type, lint, and test commands."],
  ["04", "Review", "The resulting git diff stays visible so the operator owns the final decision."],
];

const toolkit = getToolkit("rn-agents-kit");

export const metadata = productMetadata(
  toolkit,
  "Six audit-first agent skills for React Native project snapshots, asset hygiene, New Architecture readiness, code review, device capture, and Metro console output."
);

export default function AgentsKitPage() {
  return (
    <main
      className="tool-accent-scope"
      style={{ "--tool-accent": toolkit.accent } as CSSProperties}
    >
      <ProductHero
        description="The public v0.1.0 snapshot packages six narrow skills. Each one owns a specific maintenance job and keeps evidence, consent, and review boundaries explicit."
        intro="Give your coding agent a React Native maintenance kit that reads first and earns every change."
        toolkit={toolkit}
      >
        <div className="space-y-3 font-mono text-xs">
          {[
            ["first_pass", "read-only"],
            ["mutation", "explicit consent"],
            ["verification", "project gates"],
            ["handoff", "reviewable diff"],
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker">Install / Claude Code</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
              Two commands. Six focused skills.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Add the public marketplace, then install the v0.1.0 plugin from that source. The
              public README currently documents this Claude Code installation path.
            </p>
          </div>
          <div className="lab-panel min-w-0 border border-border bg-card p-5 sm:p-7">
            <CodeBlock code={installCode} language="text" />
            <div className="mt-5 flex items-start gap-3 border-t border-border pt-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--tool-accent)]" />
              <p className="text-sm leading-6 text-muted-foreground">
                The public distribution is licensed under Apache-2.0 and contains the shipped
                skills, plugin manifests, changelog, contribution guide, and example artifacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="field-grid border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-kicker">Skill inventory / 06</p>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-6xl">
              One skill, one maintenance job.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => (
              <article className="min-h-72 bg-background p-6 sm:p-7" key={skill.name}>
                <div className="flex items-start justify-between">
                  <skill.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {skill.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{skill.description}</p>
                <p className="mt-7 border-t border-border pt-3 font-mono text-[0.64rem] tracking-[0.12em] text-[var(--tool-accent-ink)] uppercase">
                  {skill.posture}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="section-kicker">Operating contract</p>
              <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] sm:text-5xl">
                Audit-first is a sequence, not a badge.
              </h2>
            </div>
            <ol className="border-t border-border">
              {contract.map(([index, title, description]) => (
                <li
                  className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline"
                  key={index}
                >
                  <span className="font-mono text-xs text-[var(--tool-accent-ink)]">{index}</span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-[var(--tool-accent-inverse-ink)] uppercase">
              Reproducible evidence / public example
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
              See the New Architecture audit run against a public app.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-12 rounded-none px-6">
              <a
                href="https://github.com/AndrewDongminYoo/rn-agents-kit/blob/main/docs/examples/newarch-audit.md"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open the example
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-none border-background/30 bg-transparent px-6 text-background hover:bg-background hover:text-foreground"
              variant="outline"
            >
              <a href={toolkit.githubUrl} rel="noopener noreferrer" target="_blank">
                <Github className="size-4" />
                Review the repository
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
