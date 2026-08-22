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

const integrations = [
  {
    code: githubActionsCode,
    description:
      "Regenerates the registry in CI and fails the job when the committed output differs from what the current asset tree produces.",
    icon: Shield,
    language: "yaml",
    title: "GitHub Actions",
  },
  {
    code: huskyCode,
    description:
      "Regenerates and stages the registry on every commit through a Husky git hook, so the manifest never lags the filesystem.",
    icon: GitBranch,
    language: "bash",
    title: "Husky pre-commit",
  },
];

export function CISection() {
  return (
    <section className="field-grid border-b border-border bg-card/35" id="ci">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="section-kicker">CI integration / 02</p>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">
            Fail the build when the manifest drifts.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Regenerate in CI and diff the output, or regenerate on commit and stage it. Both catch
            the same drift between the manifest and the filesystem.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {integrations.map((integration) => (
            <article className="min-w-0 bg-background p-6 sm:p-8" key={integration.title}>
              <integration.icon className="size-6 text-[var(--tool-accent)]" strokeWidth={1.5} />
              <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.04em]">
                {integration.title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                {integration.description}
              </p>
              <div className="mt-8">
                <CodeBlock code={integration.code} language={integration.language} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
