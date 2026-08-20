# React Native Toolkits Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-product `rn-typed-assets` site into a distinctive React Native Toolkits hub with four first-class product routes.

**Architecture:** A typed catalog supplies shared product metadata to the global shell and home page, while each route owns its detailed public copy.
The existing typed-assets sections are recomposed under `/rn-typed-assets`, and a minimal client redirect preserves legacy root fragments.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.7 strict mode, Tailwind CSS 4, Lucide React, Shiki, Node test runner, Playwright browser verification.

**Spec:** `docs/specs/2026-08-20-react-native-toolkits-site-design.md`

## Global Constraints

- Use only public repository and package facts for product copy.
- Do not expose private development repository identifiers, internal plans, legal notes, or unpublished install paths.
- Use root-level product routes without a `/tools` prefix.
- Preserve server components unless browser state is required.
- Add no dependency.
- Do not commit, push, or publish without a separate explicit request.

---

### Task 1: Protect the public route contract

**Files:**

- Create: `tests/site-routes.test.mjs`

**Interfaces:**

- Consumes: `SITE_BASE_URL`, defaulting to `http://127.0.0.1:3000`.
- Produces: a Node test suite that requests each public route and asserts its product identity and primary destination.

- [x] **Step 1: Write the integration test before routes exist.**

  Create table-driven tests for `/`, `/rn-agents-kit`, `/rn-typed-assets`, `/rn-newarch-ready`, and `/design-to-nativewind`.
  Derive every expected product label and GitHub destination as a literal in the test fixture.

- [x] **Step 2: Run the test against the current Next.js server and verify RED.**

  Run the webapp-testing server helper with `pnpm dev` and `node --test tests/site-routes.test.mjs`.
  Expect the four new product routes to fail with HTTP 404 while the root route succeeds.

### Task 2: Build the shared product system and field-lab shell

**Files:**

- Create: `lib/toolkits.ts`
- Create: `components/site-footer.tsx`
- Create: `components/toolkit-card.tsx`
- Create: `components/product-hero.tsx`
- Create: `components/legacy-hash-redirect.tsx`
- Modify: `components/header.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `Toolkit`, `ToolkitSlug`, `toolkits`, and `getToolkit(slug)` from `lib/toolkits.ts`.
- Produces: shared `Header`, `SiteFooter`, `ToolkitCard`, and `ProductHero` components.
- Consumes: the four root-level routes and public external URLs defined by the spec.

- [x] **Step 1: Implement the literal typed catalog.**

  Define one entry for each product with a route, label, eyebrow, short description, repository URL, optional product URL, visual accent, and status.

- [x] **Step 2: Rebuild the header and footer around the catalog.**

  Keep the existing theme provider and mobile menu boundary.
  Use `next/link` for internal destinations, render a concise product navigation on desktop, and provide accessible mobile menu and theme labels.

- [x] **Step 3: Add focused shared product components.**

  `ToolkitCard` renders a catalog entry without owning page layout.
  `ProductHero` renders shared product identity, status, public destination buttons, and an optional code or signal panel supplied as children.
  `LegacyHashRedirect` maps only the documented typed-assets fragments to the matching `/rn-typed-assets` fragment.

- [x] **Step 4: Establish the field-lab tokens and atmosphere.**

  Replace Inter with distinctive local `next/font/google` choices, update OKLch tokens, add blueprint-grid and noise-like CSS layers, implement reveal and signal animations, and provide a reduced-motion override.

### Task 3: Replace the root page with the toolkit hub

**Files:**

- Modify: `app/page.tsx`

**Interfaces:**

- Consumes: `toolkits`, `ToolkitCard`, and `LegacyHashRedirect`.
- Produces: the public product hub at `/`.

- [x] **Step 1: Implement the asymmetric home hero.**

  Present the React Native Toolkits identity, direct links to the product grid and `rn-agents-kit`, and a CSS signal board that names real public capabilities.

- [x] **Step 2: Add the product map and workflow rail.**

  Render all four catalog entries and explain their independent jobs without claiming a required suite dependency.

- [x] **Step 3: Add trust and final CTA sections.**

  Explain deterministic output, conservative reporting, and reviewable changes with claims grounded in public product documentation.

### Task 4: Move the typed-assets documentation to its product route

**Files:**

- Create: `app/rn-typed-assets/page.tsx`
- Create: `components/sections/typed-assets-cta-section.tsx`
- Delete: `components/sections/footer-section.tsx`
- Modify: `components/sections/hero-section.tsx`

**Interfaces:**

- Consumes: the existing typed-assets section components and shared `ProductHero` style language.
- Produces: the complete detailed documentation at `/rn-typed-assets` with original section IDs.

- [x] **Step 1: Recompose the existing sections under the new route.**

  Preserve the current feature, workflow, installation, CLI, configuration, and CI components in their original order.

- [x] **Step 2: Make the typed-assets hero and CTA route-aware.**

  Remove assumptions that the product owns the global header and footer.
  Keep the npm install and GitHub actions prominent.

- [x] **Step 3: Remove the obsolete product-specific footer.**

  Replace it with a focused typed-assets CTA before the global site footer and remove the now-unused component.

### Task 5: Add the three new product detail pages

**Files:**

- Create: `app/rn-agents-kit/page.tsx`
- Create: `app/rn-newarch-ready/page.tsx`
- Create: `app/design-to-nativewind/page.tsx`

**Interfaces:**

- Consumes: `getToolkit`, `ProductHero`, `CodeBlock`, and public product facts.
- Produces: three static server-rendered product pages with install or destination CTAs.

- [x] **Step 1: Implement `rn-agents-kit`.**

  Render the six public skills, audit-first contract, public two-command Claude Code install, example-run link, GitHub link, and Apache-2.0 label.

- [x] **Step 2: Implement `rn-newarch-ready`.**

  Render install and usage commands, local-first signals, conservative verdict vocabulary, current `0.x` status, and the relationship to the public `rn-newarch-audit` skill.

- [x] **Step 3: Implement `design-to-nativewind`.**

  Render the Figma selection pipeline, deterministic rule-based output, optional assisted cleanup, current React Native and NativeWind target, and GitHub/Figma Community CTAs.

### Task 6: Verify behavior and visual quality

**Files:**

- Modify only files identified by failing verification.

**Interfaces:**

- Consumes: all five routes and shared interactions.
- Produces: fresh lint, build, integration, and browser evidence.

- [x] **Step 1: Run the route test and verify GREEN.**

  Run the real Next.js server through the webapp-testing helper and execute `node --test tests/site-routes.test.mjs`.
  Require five passing route cases with no 404 response.

- [x] **Step 2: Run static gates.**

  Run `pnpm lint` and `pnpm build` and inspect the complete exit status of both commands.

- [x] **Step 3: Run browser QA.**

  Inspect desktop and mobile screenshots, mobile navigation, theme toggle, legacy hash redirect, external destinations, console output, and horizontal overflow with Playwright.

- [x] **Step 4: Review the final path-scoped diff.**

  Confirm that only the website, its test, and its approved spec and plan changed.
