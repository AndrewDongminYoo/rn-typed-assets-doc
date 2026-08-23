import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { notFoundMarkdown } from "@/lib/markdown-pages";
import { prosePages } from "@/lib/prose-pages";
import { agentEndpoints, siteName } from "@/lib/site";
import { toolkits } from "@/lib/toolkits";

export const metadata = {
  description: `The requested path does not exist on ${siteName}. Every live route is listed on this page.`,
  robots: { follow: true, index: false },
  title: "404 — Page not found",
};

/**
 * The 404 body. Next.js already answers this route with a real HTTP 404; the content's job is
 * recovery, so it enumerates every live route rather than apologising. The Markdown block is the
 * same recovery map an agent gets from `Accept: text/markdown` on a dead path, shown verbatim so
 * the HTML and Markdown variants of a 404 say exactly the same thing.
 */
export default function NotFound() {
  const recoveryMarkdown = notFoundMarkdown("/the-path-you-requested");

  return (
    <main>
      <section className="field-grid relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-y-0 left-[7%] w-px bg-border/70" />
        <div className="absolute inset-y-0 right-[7%] w-px bg-border/70" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="section-kicker">Signal lost / HTTP 404</p>
          <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance text-foreground sm:text-6xl">
            That path is not on the map.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            This site is small and fully enumerated. Everything it serves is listed below, so
            whatever the link meant is almost certainly one of these.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Products</h2>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-2">
            {toolkits.map((toolkit) => (
              <Link
                className="group bg-card p-6 transition-colors hover:bg-muted sm:p-7"
                href={toolkit.route}
                key={toolkit.slug}
              >
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {toolkit.index} / {toolkit.eyebrow}
                </span>
                <span className="mt-3 flex items-center gap-2 font-display text-xl font-semibold group-hover:text-primary-ink">
                  {toolkit.name}
                  <ArrowUpRight className="size-4" />
                </span>
                <span className="mt-3 block text-sm leading-6 text-muted-foreground">
                  {toolkit.description}
                </span>
              </Link>
            ))}
          </div>

          <h2 className="mt-16 font-display text-3xl font-semibold tracking-[-0.04em]">Site</h2>
          <ul className="mt-8 grid gap-px bg-border md:grid-cols-3">
            <li className="bg-card p-6">
              <Link className="font-semibold hover:text-primary-ink" href="/">
                Home
              </Link>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The product hub and the index of every toolkit.
              </p>
            </li>
            {prosePages.map((page) => (
              <li className="bg-card p-6" key={page.route}>
                <Link className="font-semibold hover:text-primary-ink" href={page.route}>
                  {page.title}
                </Link>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{page.description}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-3xl font-semibold tracking-[-0.04em]">
            For agents
          </h2>
          <ul className="mt-8 border-t border-border">
            {agentEndpoints.map((endpoint) => (
              <li
                className="grid gap-1 border-b border-border py-4 sm:grid-cols-[12rem_1fr]"
                key={endpoint.path}
              >
                <a
                  className="font-mono text-[0.7rem] tracking-[0.12em] text-foreground uppercase hover:text-primary-ink"
                  href={endpoint.path}
                >
                  {endpoint.path}
                </a>
                <span className="text-sm leading-6 text-muted-foreground">
                  {endpoint.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="lab-panel mt-16 min-w-0 border border-border bg-card p-5 sm:p-7">
            <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
              The same 404 as Markdown
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Request any missing path with{" "}
              <code className="border border-border bg-background px-1.5 py-0.5 font-mono text-[0.82em] text-foreground">
                Accept: text/markdown
              </code>{" "}
              and the 404 arrives as this document instead.
            </p>
            <div className="mt-5 overflow-x-auto border border-border bg-background/70 p-4 sm:p-5">
              <pre className="font-mono text-xs leading-6 whitespace-pre text-foreground">
                {recoveryMarkdown}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
