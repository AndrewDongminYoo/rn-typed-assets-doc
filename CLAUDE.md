# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```plaintext
pnpm dev        # Start dev server at localhost:3000
pnpm build      # Production build
pnpm lint       # ESLint check
pnpm lint:fix   # ESLint auto-fix
pnpm format     # Prettier auto-write
```

There is no test suite. `eslint-plugin-jest` is installed but only for config completeness.

## Architecture

This is a **Next.js 16 App Router** documentation site for the `rn-typed-assets` React Native library. It is a purely static, single-page site with no API routes or database.

### Page composition

`app/page.tsx` is a thin composition layer that assembles section components in order. Each section in `components/sections/` is a self-contained server component responsible for one documentation topic (hero, features, installation, CLI reference, configuration, CI, syntax demo).

### Client boundary

Only two components use `"use client"`:

- `components/header.tsx` — mobile menu toggle state
- `components/code-block.tsx` — copy-to-clipboard and async Shiki highlighting

Everything else is a server component. Do not add `"use client"` unless necessary.

### Syntax highlighting

`lib/syntax-highlighter.ts` holds a singleton Shiki highlighter (lazy-initialized, cached after first call). It resolves language aliases (e.g. `ts` → `typescript`) and falls back to plain HTML escaping on error. `CodeBlock` renders it client-side with a loading state.

### Styling

Tailwind CSS v4 using `@theme` syntax and OKLch color tokens defined in `app/globals.css`. Do not use Tailwind v3 `theme()` or `extend` patterns — they are incompatible with v4.

The `cn()` helper in `lib/utils.ts` (clsx + tailwind-merge) must be used whenever conditionally composing Tailwind classes.

## Conventions

- **Path alias**: all imports use `@/*` (maps to project root)
- **Type imports**: always `import type { ... }` for type-only imports (enforced by ESLint)
- **Import order**: managed by `eslint-plugin-simple-import-sort` — let `pnpm lint:fix` handle it
- **JSX prop order**: managed by `eslint-plugin-perfectionist` — let `pnpm lint:fix` handle it
- **Line width**: 100 characters (Prettier)
- **Markdown lint**: rules MD013, MD033, MD041 are disabled (conflict with Prettier)
