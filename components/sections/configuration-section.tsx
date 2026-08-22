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

const options = [
  ["outputDir", "Directory for generated files"],
  ["sourceRoots", "Files and directories scanned by the audit command"],
  ["rootDir", "Asset scan root for each type"],
  ["extensions", "File extensions to include"],
  ["exportName", "Name of the exported constant"],
  ["typeImport / inlineType", "TypeScript type configuration"],
];

export function ConfigurationSection() {
  return (
    <section className="border-b border-border" id="configuration">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">Configuration / optional</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            Zero config by default, explicit when overridden.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            The defaults cover the standard layout. A config file at the project root replaces only
            the fields it names, so omitting it accepts every default.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.035em]">
              Full configuration
            </h3>
            <p className="mt-3 mb-6 max-w-lg text-sm leading-6 text-muted-foreground">
              Every field below is an override. The commented value is what the CLI uses when the
              field is absent.
            </p>
            <CodeBlock
              code={configCode}
              filename="rn-typed-assets.config.js"
              language="javascript"
              showLineNumbers
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.035em]">
              Adding custom types
            </h3>
            <p className="mt-3 mb-6 max-w-lg text-sm leading-6 text-muted-foreground">
              Any type outside the three defaults can be declared under types. The audit command
              discovers it automatically through the exportName to type reverse map.
            </p>
            <CodeBlock code={customTypeCode} language="javascript" />

            <div className="mt-8 border border-border bg-card p-6 sm:p-7">
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                Configuration options
              </p>
              <dl className="mt-5 border-t border-border">
                {options.map(([name, meaning]) => (
                  <div className="border-b border-border py-3" key={name}>
                    <dt className="font-mono text-sm text-[var(--tool-accent-ink)]">{name}</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground">{meaning}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
