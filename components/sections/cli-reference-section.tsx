import { CodeBlock } from "@/components/code-block"
import { Terminal } from "lucide-react"

const commands = [
  {
    name: "generate",
    description: "Scan asset directories and emit assets.gen.ts + assets.manifest.json.",
    flags: [
      { flag: "--types <types>", description: "Comma-separated asset types", default: "image,svg,lottie" },
      { flag: "--inplace", description: "Rewrite source files after regen", default: "false" },
      { flag: "--root <path>", description: "Project root directory", default: "cwd" },
      { flag: "--config <path>", description: "Path to config file", default: "./rn-typed-assets.config.js" },
    ],
    examples: [
      "rn-typed-assets generate",
      "rn-typed-assets generate --inplace",
      "rn-typed-assets generate --types=image,lottie",
    ],
  },
  {
    name: "organize",
    description: "Move asset files into canonical subdirectories, then regenerate and rewrite sources.",
    flags: [
      { flag: "<assetsDir>", description: "Path to the asset root to organize", default: "(required)" },
      { flag: "--types <types>", description: "Asset types to move", default: "image,svg,lottie" },
    ],
    examples: [
      "rn-typed-assets organize src/assets",
    ],
    note: "Creates: images/, svgs/, lotties/ subdirectories",
  },
  {
    name: "audit",
    description: "Compare manifest against actual source-file usages.",
    flags: [
      { flag: "--types <types>", description: "Asset types to audit", default: "image,svg,lottie" },
      { flag: "--fix", description: "Delete unused files and regenerate", default: "false" },
    ],
    examples: [
      "rn-typed-assets audit",
      "rn-typed-assets audit --fix",
      "rn-typed-assets audit --types=image",
    ],
  },
]

export function CLIReferenceSection() {
  return (
    <section id="cli" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            CLI Reference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Three commands to generate, organize, and audit your assets.
          </p>
        </div>

        <div className="space-y-8">
          {commands.map((cmd) => (
            <div key={cmd.name} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-mono">{cmd.name}</h3>
                </div>
                <p className="text-muted-foreground">{cmd.description}</p>
                {cmd.note && (
                  <p className="text-sm text-accent mt-2">{cmd.note}</p>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Flags table */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Options</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Flag</th>
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Description</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmd.flags.map((flag) => (
                          <tr key={flag.flag} className="border-b border-border/50 last:border-0">
                            <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap">{flag.flag}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{flag.description}</td>
                            <td className="py-2 font-mono text-xs text-muted-foreground/70">{flag.default}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Examples</h4>
                  <CodeBlock code={cmd.examples.join("\n")} language="bash" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
