import { ArrowUpRight } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import type { ProsePage, ProseSection } from "@/lib/prose-pages";
import { pageGraph } from "@/lib/structured-data";

/** Stable anchor for a section heading, so the in-page nav and the headings agree. */
function sectionId(section: ProseSection): string {
  return section.heading
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

/**
 * A paragraph with `` `code` `` spans resolved. The prose source is shared with the Markdown
 * representation, so it is authored in Markdown's inline-code syntax rather than as JSX.
 */
function Paragraph({ text }: { text: string }) {
  return (
    <p className="mt-5 text-base leading-7 text-muted-foreground first:mt-0">
      {text.split(/(`[^`]+`)/).map((part, index) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
          <code
            className="border border-border bg-card px-1.5 py-0.5 font-mono text-[0.82em] text-foreground"
            key={index}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </p>
  );
}

function Entries({ entries }: { entries: NonNullable<ProseSection["entries"]> }) {
  return (
    <dl className="mt-8 border-t border-border">
      {entries.map((entry) => (
        <div
          className="grid gap-1 border-b border-border py-4 sm:grid-cols-[15rem_1fr]"
          key={entry.label}
        >
          <dt className="font-mono text-[0.68rem] tracking-[0.12em] text-foreground uppercase">
            {entry.url ? (
              <a
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-ink"
                href={entry.url}
                rel={entry.url.startsWith("http") ? "noopener noreferrer" : undefined}
                target={entry.url.startsWith("http") ? "_blank" : undefined}
              >
                {entry.label}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              entry.label
            )}
          </dt>
          <dd className="text-sm leading-6 text-muted-foreground">{entry.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProsePageView({ page }: { page: ProsePage }) {
  return (
    <main>
      <JsonLd graph={pageGraph(page.route, page.title, page.description)} />

      <section className="field-grid relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-y-0 left-[7%] w-px bg-border/70" />
        <div className="absolute inset-y-0 right-[7%] w-px bg-border/70" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="section-kicker">{page.kicker}</p>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance text-foreground sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 font-medium text-foreground/90">
            {page.intro}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                On this page
              </p>
              <ol className="mt-4 grid gap-2">
                {page.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      className="font-mono text-[0.7rem] tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-primary-ink"
                      href={`#${sectionId(section)}`}
                    >
                      {String(index + 1).padStart(2, "0")} / {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div>
              {page.sections.map((section) => (
                <article
                  aria-labelledby={sectionId(section)}
                  className="border-t border-border pt-8 pb-12 first:border-t-0 first:pt-0 last:pb-0"
                  key={section.heading}
                >
                  <h2
                    className="mb-6 font-display text-3xl leading-tight font-semibold tracking-[-0.04em]"
                    id={sectionId(section)}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <Paragraph key={paragraph.slice(0, 48)} text={paragraph} />
                  ))}
                  {section.entries && <Entries entries={section.entries} />}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
