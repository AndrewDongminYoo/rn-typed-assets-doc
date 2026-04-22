import { CodeBlock } from "@/components/code-block";
import { WorkflowDiagram } from "@/components/workflow-diagram";

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

const normalizationTable = [
  { filename: "harini-cry.png", key: "hariniCry" },
  { filename: "camera_guide.png", key: "cameraGuide" },
  { filename: "Info-Filled.png", key: "infoFilled" },
  { filename: "1.png", key: "n1 (numeric prefix → n)" },
  { filename: "point.png alongside point/ dir", key: "pointAsset (collision)" },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            A deterministic pipeline that transforms your asset directory into type-safe TypeScript.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="mb-16 rounded-2xl border border-border bg-card p-6 lg:p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
            Generation Pipeline
          </h3>
          <WorkflowDiagram />
        </div>

        {/* Steps explanation */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-foreground">Scan</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  For each enabled asset type, recursively list files under the configured rootDir.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                2
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-foreground">Normalize</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Convert each filename to a stable camelCase key. Handle edge cases like numeric
                  prefixes and collisions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                3
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-foreground">Build Registry Tree</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Assemble a nested object tree from path segments. Detect and resolve branch/leaf
                  collisions automatically.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                4
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-foreground">Emit</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Write assets.gen.ts (typed as const object) and assets.manifest.json (stable index
                  of every key ↔ file mapping).
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Example Asset Tree</p>
            <CodeBlock code={assetTreeCode} language="bash" className="text-sm" />
          </div>
        </div>

        {/* Key normalization rules */}
        <div className="mb-16">
          <h3 className="mb-6 text-xl font-semibold text-foreground">Key Normalization Rules</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Filename
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Generated Key
                  </th>
                </tr>
              </thead>
              <tbody>
                {normalizationTable.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                      {row.filename}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-primary">{row.key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generated output */}
        <div>
          <h3 className="mb-6 text-xl font-semibold text-foreground">Generated Output</h3>
          <CodeBlock
            code={generatedOutputCode}
            language="typescript"
            filename="assets.gen.ts"
            showLineNumbers
          />
        </div>
      </div>
    </section>
  );
}
