import { CodeBlock } from "@/components/code-block";

const configCode = `// rn-typed-assets.config.js
module.exports = {
  // Where to write assets.gen.ts and assets.manifest.json
  // Default: 'src/generated'
  outputDir: 'src/generated',

  // Directories and entry files scanned by the audit command
  // Default: ['src', 'App.tsx', 'index.js']
  sourceRoots: ['src', 'App.tsx', 'index.js'],

  // Per-type configuration (all fields are optional overrides)
  types: {
    image: {
      rootDir: 'src/assets',              // scan root
      extensions: ['.png', '.jpg', '.jpeg', '.webp'],
      exportName: 'Assets',               // export const Assets = ...
      typeImport: {
        typeName: 'ImageRequireSource',   // TypeScript type name
        from: 'react-native',             // import source
      },
    },
    svg: {
      rootDir: 'src/assets/svg',
      extensions: ['.svg'],
      exportName: 'Svgs',
      inlineType: 'unknown',  // emits: export type SvgsAssetSource = unknown
    },
    lottie: {
      rootDir: 'src/assets/lottie',
      extensions: ['.json'],
      exportName: 'Lotties',
      typeImport: {
        typeName: 'AnimationObject',
        from: 'lottie-react-native',
      },
    },
  },
};`;

const customTypeCode = `// Adding a custom font asset type
module.exports = {
  types: {
    font: {
      rootDir: 'src/assets/fonts',
      extensions: ['.ttf', '.otf'],
      exportName: 'Fonts',
      inlineType: 'string',  // emits: export type FontsAssetSource = string
    },
  },
};`;

export function ConfigurationSection() {
  return (
    <section className="py-20 lg:py-28" id="configuration">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Configuration</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Zero config by default, fully customizable when you need it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Full Configuration</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Create{" "}
                <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary">
                  rn-typed-assets.config.js
                </code>{" "}
                in your project root to override defaults. The file is optional — omitting it
                accepts all defaults.
              </p>
            </div>
            <CodeBlock
              code={configCode}
              filename="rn-typed-assets.config.js"
              language="javascript"
              showLineNumbers
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Adding Custom Types</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Any type not in the defaults can be added under{" "}
                <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary">
                  types
                </code>
                . The audit command discovers it automatically via the exportName → type reverse
                map.
              </p>
            </div>
            <CodeBlock code={customTypeCode} language="javascript" />

            <div className="space-y-4 rounded-xl border border-border bg-muted/50 p-6">
              <h4 className="font-semibold text-foreground">Configuration Options</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="font-mono text-primary">outputDir</code>
                  <p className="mt-1 text-muted-foreground">Directory for generated files</p>
                </div>
                <div>
                  <code className="font-mono text-primary">sourceRoots</code>
                  <p className="mt-1 text-muted-foreground">Files/dirs scanned by audit command</p>
                </div>
                <div>
                  <code className="font-mono text-primary">rootDir</code>
                  <p className="mt-1 text-muted-foreground">Asset scan root for each type</p>
                </div>
                <div>
                  <code className="font-mono text-primary">extensions</code>
                  <p className="mt-1 text-muted-foreground">File extensions to include</p>
                </div>
                <div>
                  <code className="font-mono text-primary">exportName</code>
                  <p className="mt-1 text-muted-foreground">Name of exported constant</p>
                </div>
                <div>
                  <code className="font-mono text-primary">typeImport / inlineType</code>
                  <p className="mt-1 text-muted-foreground">TypeScript type configuration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
