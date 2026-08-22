import { CodeBlock } from "@/components/code-block";

const generatedOutputCode = `// src/generated/assets.gen.ts
import type { ImageRequireSource } from 'react-native';
import type { AnimationObject } from 'lottie-react-native';
export type SvgsAssetSource = unknown;

export const Assets = {
  coupang: {
    hariniCry: require('../assets/coupang/harini-cry.png') as ImageRequireSource,
  },
  toast: {
    info: require('../assets/toast/info.png') as ImageRequireSource,
    warning: require('../assets/toast/warning.png') as ImageRequireSource,
  },
} as const;

export const Lotties = {
  loading: require('../assets/lottie/loading.json') as AnimationObject,
} as const;

export const Svgs = {
  logo: require('../assets/svg/logo.svg') as SvgsAssetSource,
} as const;`;

const assetTreeCode = `src/assets/
  toast/
    info.png
    warning.png
  coupang/
    harini-cry.png
  lottie/
    loading.json
  svg/
    logo.svg`;

const stages = [
  {
    description:
      "For each enabled asset type, recursively list files under the configured rootDir.",
    number: "01",
    title: "Scan",
  },
  {
    description:
      "Convert each filename to a stable camelCase key, resolving numeric prefixes and collisions.",
    number: "02",
    title: "Normalize",
  },
  {
    description:
      "Assemble a nested object tree from path segments, detecting and resolving branch and leaf collisions.",
    number: "03",
    title: "Build the registry tree",
  },
  {
    description:
      "Write assets.gen.ts as a typed const object and assets.manifest.json as a stable index of every key to file mapping.",
    number: "04",
    title: "Emit",
  },
];

const normalizationTable = [
  ["harini-cry.png", "hariniCry"],
  ["camera_guide.png", "cameraGuide"],
  ["Info-Filled.png", "infoFilled"],
  ["1.png", "n1 (numeric prefix → n)"],
  ["point.png alongside point/ dir", "pointAsset (collision)"],
];

export function HowItWorksSection() {
  return (
    <section className="field-grid border-b border-border bg-card/35" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">Generation pipeline / 04</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            Scan, normalize, build, emit.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            The same asset directory produces the same registry on every run, which is what makes
            the output reviewable in a diff.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <ol className="border-t border-border">
            {stages.map((stage) => (
              <li
                className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3.5rem_1fr]"
                key={stage.number}
              >
                <span className="font-mono text-xs text-[var(--tool-accent-ink)]">
                  {stage.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.035em]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="min-w-0">
            <p className="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
              Example asset tree
            </p>
            <CodeBlock code={assetTreeCode} language="bash" />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-[-0.04em]">
              Key normalization rules
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Filenames become identifiers through fixed rules rather than per-project conventions,
              so two developers regenerating the same tree get the same keys.
            </p>
            <div className="mt-8 overflow-x-auto border-t border-border">
              <table className="w-full min-w-100 border-collapse text-left">
                <thead>
                  <tr className="font-mono text-[0.62rem] tracking-[0.13em] text-muted-foreground uppercase">
                    <th className="border-b border-border py-3 pr-5 font-normal">Filename</th>
                    <th className="border-b border-border py-3 font-normal">Generated key</th>
                  </tr>
                </thead>
                <tbody>
                  {normalizationTable.map(([filename, key]) => (
                    <tr className="text-sm" key={filename}>
                      <td className="border-b border-border py-3 pr-5 font-mono text-muted-foreground">
                        {filename}
                      </td>
                      <td className="border-b border-border py-3 font-mono text-[var(--tool-accent-ink)]">
                        {key}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-3xl font-semibold tracking-[-0.04em]">
              Generated output
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Keys are sorted, types are imported per asset type, and the whole object is const so
              TypeScript narrows every reference.
            </p>
            <div className="mt-8">
              <CodeBlock
                code={generatedOutputCode}
                filename="assets.gen.ts"
                language="typescript"
                showLineNumbers
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
