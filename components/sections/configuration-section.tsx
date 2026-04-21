import { CodeBlock } from "@/components/code-block"

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
};`

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
};`

export function ConfigurationSection() {
  return (
    <section id="configuration" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Configuration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Zero config by default, fully customizable when you need it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Full Configuration</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Create <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">rn-typed-assets.config.js</code> in 
                your project root to override defaults. The file is optional — omitting it accepts all defaults.
              </p>
            </div>
            <CodeBlock code={configCode} language="javascript" filename="rn-typed-assets.config.js" showLineNumbers />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Adding Custom Types</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Any type not in the defaults can be added under <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">types</code>. 
                The audit command discovers it automatically via the exportName → type reverse map.
              </p>
            </div>
            <CodeBlock code={customTypeCode} language="javascript" />

            <div className="bg-muted/50 border border-border rounded-xl p-6 space-y-4">
              <h4 className="font-semibold text-foreground">Configuration Options</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="font-mono text-primary">outputDir</code>
                  <p className="text-muted-foreground mt-1">Directory for generated files</p>
                </div>
                <div>
                  <code className="font-mono text-primary">sourceRoots</code>
                  <p className="text-muted-foreground mt-1">Files/dirs scanned by audit command</p>
                </div>
                <div>
                  <code className="font-mono text-primary">rootDir</code>
                  <p className="text-muted-foreground mt-1">Asset scan root for each type</p>
                </div>
                <div>
                  <code className="font-mono text-primary">extensions</code>
                  <p className="text-muted-foreground mt-1">File extensions to include</p>
                </div>
                <div>
                  <code className="font-mono text-primary">exportName</code>
                  <p className="text-muted-foreground mt-1">Name of exported constant</p>
                </div>
                <div>
                  <code className="font-mono text-primary">typeImport / inlineType</code>
                  <p className="text-muted-foreground mt-1">TypeScript type configuration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
