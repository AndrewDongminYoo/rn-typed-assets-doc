# CLAUDE.md

This file provides repository guidance for agents working on the React Native Toolkits product website.

## Commands

```plaintext
pnpm dev           # Start the local Next.js server
pnpm build         # Create the production build (type-checked)
pnpm lint          # Run ESLint
pnpm lint:fix      # Apply ESLint fixes
pnpm typecheck     # Run tsc --noEmit
pnpm format        # Apply Prettier formatting
pnpm format:check  # Verify Prettier formatting
pnpm test          # Run the dependency-free route tests
```

`pnpm test` needs a server already running, and reads `SITE_BASE_URL` (default `http://127.0.0.1:3000`).
Point it at a production build rather than `pnpm dev`, because route handlers that declare `force-static` behave differently under the dev server.

```bash
pnpm build && pnpm start &
pnpm test
```

`.github/workflows/ci.yml` runs `format:check`, `lint`, `typecheck`, `build`, and `test` on every pull request.
Keep that workflow and this list in step.

## Architecture

This is a purely static Next.js 16 App Router website with no API routes or database.
The root route is a product hub, and each public product has a first-class root-level route: `/rn-agents-kit`, `/rn-typed-assets`, `/rn-newarch-ready`, and `/design-to-nativewind`.

`lib/toolkits.ts` is the shared catalog for product names, internal routes, public destinations, status labels, visual accents, and the agent-facing facts (`summary`, `useWhen`, `invocation`, `version`, `license`).
Keep detailed product copy in the individual route file because each tool has a materially different workflow.

The existing `rn-typed-assets` documentation sections remain isolated under `components/sections/` and are composed by `app/rn-typed-assets/page.tsx`.
Preserve their public section identifiers when editing them because legacy root fragments redirect to this route.

## Machine-readable surface

`proxy.ts` content-negotiates `text/html` against `text/markdown` on every page route, following
the acceptmarkdown.com recipe: RFC 9110 §12.5.1 ranking, `Vary: Accept`, and a `406` only when the
client can accept nothing the site produces. Static files and metadata images are excluded — a
negotiated `/opengraph-image` would `406` an Open Graph crawler asking for `image/*`.

`lib/markdown-pages.ts` generates every Markdown representation from the same catalog and prose
sources the pages render, so the two cannot drift. Add a page and it needs an entry there too.

Next 16's app-page template overwrites `Vary` during the render, so an HTML page cannot keep
`Accept` in that header from `proxy.ts` or `next.config.mjs`. `vercel.json` restores the full value
at the edge; keep the RSC tokens in it when editing.

`lib/structured-data.ts` owns the JSON-LD graphs, and `lib/prose-pages.ts` owns the `/about`,
`/contact`, and `/privacy` copy. Product facts an agent reads — `summary`, `useWhen`, `invocation`,
`version`, `license` — live in `lib/toolkits.ts` and drive the page metadata, `llms.txt`,
`agents.md`, and the Markdown representations at once.

## Client boundary

Server components are the default.
Client rendering is limited to browser-state behavior:

- `components/header.tsx` owns the mobile menu and theme controls.
- `components/code-block.tsx` owns copy-to-clipboard and asynchronous Shiki highlighting.
- `components/legacy-hash-redirect.tsx` preserves old typed-assets root fragments.
- `contexts/theme-context.tsx` owns persisted site and code themes.

Do not add `"use client"` to product pages or content components unless browser state is required.

## Styling

Tailwind CSS 4 uses `@theme` syntax and OKLch tokens in `app/globals.css`.
Do not use Tailwind v3 `theme()` or `extend` configuration patterns.
The visual direction is an industrial React Native field lab with blueprint grids, square instrument panels, high-visibility accent colors, and Bricolage Grotesque display typography.

Use the `cn()` helper in `lib/utils.ts` when conditionally composing classes.
Keep motion CSS-first and preserve the `prefers-reduced-motion` override.

## Product copy boundary

Use only claims present in the products' public repositories, public package listings, or published release metadata.
Do not expose private development plans, legal notes, source history, paid-tier ideas, repository identifiers, or unpublished installation paths.

## Conventions

- Use `@/*` path aliases for project imports.
- Use `import type` for type-only imports.
- Let the configured import and JSX prop-order rules determine ordering.
- Keep code blocks and human-facing product documentation in English.
