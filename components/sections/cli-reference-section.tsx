import { Terminal } from "lucide-react";

import { CodeBlock } from "@/components/code-block";

const commands = [
  {
    name: "generate",
    description: "Scan asset directories and emit assets.gen.ts + assets.manifest.json.",
    flags: [
      {
        flag: "--types <types>",
        description: "Comma-separated asset types",
        default: "image,svg,lottie",
      },
      {
        flag: "--inplace",
        description: "Rewrite source files after regen",
        default: "false",
      },
      {
        flag: "--root <path>",
        description: "Project root directory",
        default: "cwd",
      },
      {
        flag: "--config <path>",
        description: "Path to config file",
        default: "./rn-typed-assets.config.js",
      },
    ],
    examples: [
      "rn-typed-assets generate",
      "rn-typed-assets generate --inplace",
      "rn-typed-assets generate --types=image,lottie",
    ],
  },
  {
    name: "organize",
    description:
      "Move asset files into canonical subdirectories, then regenerate and rewrite sources.",
    flags: [
      {
        flag: "<assetsDir>",
        description: "Path to the asset root to organize",
        default: "(required)",
      },
      {
        flag: "--types <types>",
        description: "Asset types to move",
        default: "image,svg,lottie",
      },
    ],
    examples: ["rn-typed-assets organize src/assets"],
    note: "Creates: images/, svgs/, lotties/ subdirectories",
  },
  {
    name: "audit",
    description: "Compare manifest against actual source-file usages.",
    flags: [
      {
        flag: "--types <types>",
        description: "Asset types to audit",
        default: "image,svg,lottie",
      },
      {
        flag: "--fix",
        description: "Delete unused files and regenerate",
        default: "false",
      },
    ],
    examples: [
      "rn-typed-assets audit",
      "rn-typed-assets audit --fix",
      "rn-typed-assets audit --types=image",
    ],
  },
];

export function CLIReferenceSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28" id="cli">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">CLI Reference</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Three commands to generate, organize, and audit your assets.
          </p>
        </div>

        <div className="space-y-8">
          {commands.map((cmd) => (
            <div className="overflow-hidden rounded-xl border border-border bg-card" key={cmd.name}>
              <div className="border-b border-border p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-mono text-xl font-semibold text-foreground">{cmd.name}</h3>
                </div>
                <p className="text-muted-foreground">{cmd.description}</p>
                {cmd.note && <p className="mt-2 text-sm text-accent">{cmd.note}</p>}
              </div>

              <div className="space-y-6 p-6">
                {/* Flags table */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Options</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2 pr-4 text-left font-medium text-muted-foreground">
                            Flag
                          </th>
                          <th className="py-2 pr-4 text-left font-medium text-muted-foreground">
                            Description
                          </th>
                          <th className="py-2 text-left font-medium text-muted-foreground">
                            Default
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmd.flags.map((flag) => (
                          <tr className="border-b border-border/50 last:border-0" key={flag.flag}>
                            <td className="py-2 pr-4 font-mono whitespace-nowrap text-primary">
                              {flag.flag}
                            </td>
                            <td className="py-2 pr-4 text-muted-foreground">{flag.description}</td>
                            <td className="py-2 font-mono text-xs text-muted-foreground/70">
                              {flag.default}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Examples</h4>
                  <CodeBlock code={cmd.examples.join("\n")} language="bash" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
