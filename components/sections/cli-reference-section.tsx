import { CodeBlock } from "@/components/code-block";

const commands = [
  {
    description: "Scan asset directories and emit assets.gen.ts + assets.manifest.json.",
    examples: [
      "rn-typed-assets generate",
      "rn-typed-assets generate --inplace",
      "rn-typed-assets generate --types=image,lottie",
    ],
    flags: [
      {
        default: "image,svg,lottie",
        description: "Comma-separated asset types",
        flag: "--types <types>",
      },
      {
        default: "false",
        description: "Rewrite source files after regen",
        flag: "--inplace",
      },
      {
        default: "cwd",
        description: "Project root directory",
        flag: "--root <path>",
      },
      {
        default: "./rn-typed-assets.config.js",
        description: "Path to config file",
        flag: "--config <path>",
      },
    ],
    name: "generate",
  },
  {
    description:
      "Move asset files into canonical subdirectories, then regenerate and rewrite sources.",
    examples: ["rn-typed-assets organize src/assets"],
    flags: [
      {
        default: "(required)",
        description: "Path to the asset root to organize",
        flag: "<assetsDir>",
      },
      {
        default: "image,svg,lottie",
        description: "Asset types to move",
        flag: "--types <types>",
      },
    ],
    name: "organize",
    note: "Creates: images/, svgs/, lotties/ subdirectories",
  },
  {
    description: "Compare manifest against actual source-file usages.",
    examples: [
      "rn-typed-assets audit",
      "rn-typed-assets audit --fix",
      "rn-typed-assets audit --types=image",
    ],
    flags: [
      {
        default: "image,svg,lottie",
        description: "Asset types to audit",
        flag: "--types <types>",
      },
      {
        default: "false",
        description: "Delete unused files and regenerate",
        flag: "--fix",
      },
    ],
    name: "audit",
  },
];

export function CLIReferenceSection() {
  return (
    <section className="field-grid border-b border-border bg-card/35" id="cli">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">CLI reference / 03</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            Generate, organize, audit.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Three commands cover the whole surface. Each one lists its options and the default it
            falls back to when the flag is absent.
          </p>
        </div>

        <div className="mt-14 space-y-px bg-border">
          {commands.map((command) => (
            <article className="bg-background p-6 sm:p-8" key={command.name}>
              <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
                <div>
                  <h3 className="font-mono text-2xl font-semibold text-[var(--tool-accent-ink)]">
                    {command.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                    {command.description}
                  </p>
                  {command.note && (
                    <p className="mt-4 border-l-2 border-[var(--tool-accent)] pl-3 font-mono text-[0.7rem] leading-5 text-muted-foreground">
                      {command.note}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-120 border-collapse text-left">
                      <thead>
                        <tr className="font-mono text-[0.62rem] tracking-[0.13em] text-muted-foreground uppercase">
                          <th className="border-b border-border py-3 pr-5 font-normal">Flag</th>
                          <th className="border-b border-border py-3 pr-5 font-normal">
                            Description
                          </th>
                          <th className="border-b border-border py-3 font-normal">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {command.flags.map((flag) => (
                          <tr className="text-sm" key={flag.flag}>
                            <td className="border-b border-border py-3 pr-5 font-mono whitespace-nowrap text-foreground">
                              {flag.flag}
                            </td>
                            <td className="border-b border-border py-3 pr-5 text-muted-foreground">
                              {flag.description}
                            </td>
                            <td className="border-b border-border py-3 font-mono text-xs text-muted-foreground">
                              {flag.default}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-7">
                    <p className="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                      Examples
                    </p>
                    <CodeBlock code={command.examples.join("\n")} language="bash" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
