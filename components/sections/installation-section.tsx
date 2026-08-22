import { CheckCircle2 } from "lucide-react";

import { CodeBlock } from "@/components/code-block";

const installCommand = `npm install --save-dev rn-typed-assets`;

const packageJsonScripts = `{
  "scripts": {
    "assets:generate": "rn-typed-assets generate",
    "assets:generate:inplace": "rn-typed-assets generate --inplace",
    "assets:organize": "rn-typed-assets organize src/assets",
    "assets:audit": "rn-typed-assets audit",
    "assets:audit:fix": "rn-typed-assets audit --fix"
  }
}`;

const generateCommand = `npm run assets:generate`;

const usageCode = `import { Assets, Lotties, Svgs } from './generated/assets.gen';

// Images
<Image source={Assets.toast.info} />
<Image source={Assets.coupang.hariniCry} />

// Lottie animations
<LottieView source={Lotties.loading} autoPlay loop />

// SVGs (with react-native-svg)
<SvgUri source={Svgs.logo} />`;

const auditCommands = `npm run assets:audit          # report unused entries
npm run assets:audit -- --fix # delete unused files and regenerate`;

const steps = [
  {
    code: installCommand,
    description:
      "Add rn-typed-assets as a dev dependency. The project needs TypeScript available; most React Native projects already have it.",
    language: "bash",
    number: "01",
    title: "Install the package",
  },
  {
    code: packageJsonScripts,
    description: "Declare the generation, organization, and audit commands once as npm scripts.",
    filename: "package.json",
    language: "json",
    number: "02",
    title: "Add scripts to package.json",
  },
  {
    code: generateCommand,
    description:
      "Execute the generate command to create assets.gen.ts and assets.manifest.json in src/generated/.",
    language: "bash",
    number: "03",
    title: "Run the generator",
  },
  {
    code: usageCode,
    description: "Import the typed registry and use named constants instead of require() paths.",
    language: "tsx",
    number: "04",
    title: "Import and use",
  },
  {
    code: auditCommands,
    description: "Run the audit to list unreferenced assets, then delete them in the same command.",
    language: "bash",
    number: "05",
    title: "Audit for unused assets",
  },
];

const outcomes = [
  "Missing assets fail at generation, not at runtime.",
  "Every asset key is an autocompletable TypeScript constant.",
  "Renamed files are re-keyed and their references rewritten.",
  "Unused assets surface in the audit and are removable from it.",
];

export function InstallationSection() {
  return (
    <section className="border-b border-border" id="installation">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">Quick start / 05</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            Five steps to a typed registry.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Install as a dev dependency, run the generator, then replace require() paths with named
            constants.
          </p>
        </div>

        <div className="mt-12 border border-[var(--tool-accent)]/45 bg-[color-mix(in_oklch,var(--tool-accent)_7%,var(--card))] p-6 sm:p-8">
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-[var(--tool-accent-ink)] uppercase">
            What the registry changes
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div className="flex items-start gap-3" key={outcome}>
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--tool-accent)]" />
                <span className="text-sm leading-6 text-muted-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        <ol className="mt-14 border-t border-border">
          {steps.map((step) => (
            <li
              className="grid items-start gap-6 border-b border-border py-10 lg:grid-cols-[16rem_1fr]"
              key={step.number}
            >
              <div className="lg:sticky lg:top-24">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--tool-accent-ink)]">
                  STEP / {step.number}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
              <div className="min-w-0">
                <CodeBlock code={step.code} filename={step.filename} language={step.language} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
