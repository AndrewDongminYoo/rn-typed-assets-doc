import { CodeBlock } from "@/components/code-block"
import { CheckCircle2 } from "lucide-react"

const installCommand = `npm install --save-dev rn-typed-assets`

const packageJsonScripts = `{
  "scripts": {
    "assets:generate": "rn-typed-assets generate",
    "assets:generate:inplace": "rn-typed-assets generate --inplace",
    "assets:organize": "rn-typed-assets organize src/assets",
    "assets:audit": "rn-typed-assets audit",
    "assets:audit:fix": "rn-typed-assets audit --fix"
  }
}`

const generateCommand = `npm run assets:generate`

const usageCode = `import { Assets, Lotties, Svgs } from './generated/assets.gen';

// Images
<Image source={Assets.toast.info} />
<Image source={Assets.coupang.hariniCry} />

// Lottie animations
<LottieView source={Lotties.loading} autoPlay loop />

// SVGs (with react-native-svg)
<SvgUri source={Svgs.logo} />`

const auditCommands = `npm run assets:audit          # report unused entries
npm run assets:audit -- --fix # delete unused files and regenerate`

const steps = [
  {
    number: "01",
    title: "Install the package",
    description: "Add rn-typed-assets as a dev dependency. TypeScript must be available in your project (most RN projects already have it).",
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
    description: "Execute the generate command to create assets.gen.ts and assets.manifest.json in src/generated/.",
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
    description: "Run the audit command to find and optionally remove unused assets from your codebase.",
    code: auditCommands,
    language: "bash",
  },
]

const benefits = [
  "Compile-time safety: Missing assets fail at generation, not runtime",
  "Autocomplete: IDE support for all your assets",
  "Refactoring: Rename files and let the tool update references",
  "Clean codebase: Find and remove unused assets automatically",
]

export function InstallationSection() {
  return (
    <section id="installation" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Quick Start
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get up and running in minutes. Works with your existing React Native project structure.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">Why use typed assets?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="grid lg:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="lg:sticky lg:top-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              <CodeBlock
                code={step.code}
                language={step.language}
                filename={step.filename}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
