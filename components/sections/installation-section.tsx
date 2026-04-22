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
    number: "01",
    title: "Install the package",
    description:
      "Add rn-typed-assets as a dev dependency. TypeScript must be available in your project (most RN projects already have it).",
    code: installCommand,
    language: "bash",
  },
  {
    number: "02",
    title: "Add scripts to package.json",
    description: "Configure convenient npm scripts for generation, organization, and auditing.",
    code: packageJsonScripts,
    language: "json",
    filename: "package.json",
  },
  {
    number: "03",
    title: "Run the generator",
    description:
      "Execute the generate command to create assets.gen.ts and assets.manifest.json in src/generated/.",
    code: generateCommand,
    language: "bash",
  },
  {
    number: "04",
    title: "Import and use",
    description: "Import the typed registry and use named constants instead of require() paths.",
    code: usageCode,
    language: "tsx",
  },
  {
    number: "05",
    title: "Audit for unused assets",
    description:
      "Run the audit command to find and optionally remove unused assets from your codebase.",
    code: auditCommands,
    language: "bash",
  },
];

const benefits = [
  "Compile-time safety: Missing assets fail at generation, not runtime",
  "Autocomplete: IDE support for all your assets",
  "Refactoring: Rename files and let the tool update references",
  "Clean codebase: Find and remove unused assets automatically",
];

export function InstallationSection() {
  return (
    <section className="py-20 lg:py-28" id="installation">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Quick Start</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Get up and running in minutes. Works with your existing React Native project structure.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-12 rounded-xl border border-accent/20 bg-accent/10 p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Why use typed assets?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div className="flex items-start gap-3" key={benefit}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step) => (
            <div className="grid items-start gap-6 lg:grid-cols-[200px_1fr]" key={step.number}>
              <div className="lg:sticky lg:top-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              <CodeBlock code={step.code} filename={step.filename} language={step.language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
