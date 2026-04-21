import { CodeBlock } from "@/components/code-block"
import { GitBranch, Shield } from "lucide-react"

const githubActionsCode = `# .github/workflows/ci.yml
- name: Verify asset manifest is up to date
  run: |
    npm run assets:generate
    git diff --exit-code src/generated/`

const huskyCode = `# .husky/pre-commit
npm run assets:generate
git add src/generated/assets.gen.ts src/generated/assets.manifest.json`

export function CISection() {
  return (
    <section id="ci" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            CI Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Integrate with your CI pipeline to catch drift between the manifest and filesystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">GitHub Actions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add to your CI pipeline to verify the manifest is up to date. Fails if there are uncommitted changes.
              </p>
            </div>
            <div className="p-6">
              <CodeBlock code={githubActionsCode} language="yaml" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Husky Pre-commit</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically regenerate and stage assets before each commit using Husky git hooks.
              </p>
            </div>
            <div className="p-6">
              <CodeBlock code={huskyCode} language="bash" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
