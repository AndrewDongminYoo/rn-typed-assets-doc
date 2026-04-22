import { GitBranch, Shield } from "lucide-react";

import { CodeBlock } from "@/components/code-block";

const githubActionsCode = `# .github/workflows/ci.yml
- name: Verify asset manifest is up to date
  run: |
    npm run assets:generate
    git diff --exit-code src/generated/`;

const huskyCode = `# .husky/pre-commit
npm run assets:generate
git add src/generated/assets.gen.ts src/generated/assets.manifest.json`;

export function CISection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28" id="ci">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">CI Integration</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Integrate with your CI pipeline to catch drift between the manifest and filesystem.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">GitHub Actions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add to your CI pipeline to verify the manifest is up to date. Fails if there are
                uncommitted changes.
              </p>
            </div>
            <div className="p-6">
              <CodeBlock code={githubActionsCode} language="yaml" />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <GitBranch className="h-5 w-5 text-primary" />
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
  );
}
