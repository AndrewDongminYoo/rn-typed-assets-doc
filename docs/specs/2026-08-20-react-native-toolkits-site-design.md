# React Native Toolkits Site Design

## Purpose

Expand the existing `rn-typed-assets` documentation site into a public product hub for four React Native developer tools owned by AndrewDongminYoo.
The site must help React Native developers understand which tool fits their current problem, reach a useful install or product link quickly, and inspect enough detail to trust the tool before leaving the site.

## Public scope

The site promotes only facts and artifacts already present in the public repositories or public package listings.
The product set is `rn-agents-kit`, `rn-typed-assets`, `rn-newarch-ready`, and `design-to-nativewind`.
Internal strategy, legal notes, private development history, paid-tier ideas, and unpublished runtime support are out of scope.

`rn-agents-kit` is described from its public v0.1.0 distribution: six audit-first skills, the public Claude Code installation commands, the published example run, Apache-2.0 licensing, and links to its public GitHub repository.
The website must not expose private development repository identifiers or non-public files.

## Information architecture

The root route becomes the React Native Toolkits product hub.
Each product receives a first-class root-level route without a redundant `/tools` taxonomy.

```plaintext
/
/rn-agents-kit
/rn-typed-assets
/rn-newarch-ready
/design-to-nativewind
```

The existing `rn-typed-assets` sections move intact to `/rn-typed-assets` and retain their current section identifiers such as `#installation`, `#cli`, and `#configuration`.
When the root page loads with a legacy typed-assets fragment, a small client-side compatibility component redirects to the matching fragment under `/rn-typed-assets`.

## Content model

A single typed catalog in `lib/toolkits.ts` owns navigation labels, short descriptions, accent tokens, routes, repository URLs, external product links, and status labels.
Shared navigation, the home product grid, and the shared footer consume this catalog so product names and links cannot drift independently.
Detailed product copy remains in the individual route files because the four products have materially different workflows and forcing them into one generic schema would hide useful distinctions.

The root page presents the product family in this order:

1. A high-contrast field-lab hero that states the shared promise: inspect, automate, and verify React Native work with deterministic tools and audit-first agent workflows.
2. A four-product map that makes each tool's job and destination obvious.
3. A workflow rail that connects design generation, project inspection, maintenance audits, and runtime verification without claiming the tools form a mandatory suite.
4. A trust section explaining deterministic output, conservative reporting, and reviewable changes.
5. A final CTA that routes to `rn-agents-kit` and the public GitHub profile.

Each product page starts with a shared product hero pattern and then uses product-specific sections:

- `rn-agents-kit`: six public skills, audit-first contract, two-command Claude Code installation, example-run and repository links.
- `rn-typed-assets`: current hero, features, workflow, installation, CLI, configuration, and CI content.
- `rn-newarch-ready`: local-first audit flow, conservative status vocabulary, install and usage commands, and the relationship to `rn-newarch-audit`.
- `design-to-nativewind`: Figma-to-React-Native pipeline, deterministic and optional assisted passes, supported output, and GitHub/Figma Community CTAs.

## Visual system

The aesthetic is an industrial React Native field lab rather than a generic SaaS landing page.
Light mode uses warm paper with graphite text, while dark mode inverts to graphite with warm off-white text.
React cyan acts as the system signal and high-visibility lime as the action accent.
Each product receives a distinct accent that still sits inside the shared dark technical palette.

Display typography uses a characterful geometric face and body copy uses a highly readable grotesk; monospace labels and code retain a technical voice.
The site uses a blueprint grid, coordinate labels, thin instrument rails, numbered modules, offset borders, and restrained glow instead of rounded-card repetition or purple gradients.

The root hero uses an asymmetric composition: editorial headline and actions on the left, a live-looking toolkit signal board on the right.
Product pages reuse the grid and label language without duplicating the home composition.
Motion is CSS-first, concentrated in the initial reveal and hover/focus states, and disabled through `prefers-reduced-motion` when requested.

## Interaction and accessibility

The shared header provides desktop navigation, a keyboard-operable mobile menu, the existing light/dark theme control, and a GitHub destination.
Navigation uses native links and visible focus states.
External links identify themselves visually and use safe `target` and `rel` attributes.
Text and controls must retain readable contrast in both themes.

The implementation keeps server components as the default.
Only the theme-aware header, legacy hash redirect, and existing interactive code blocks use client rendering.

## Verification

The repository has no component-test framework, so route behavior is protected with a dependency-free Node integration smoke test against the real Next.js server.
The test must fail before the new routes exist and then verify that all five routes return successful HTML with their expected public destinations.

Completion requires `pnpm lint`, `pnpm build`, the route smoke test, and Playwright inspection at desktop and mobile viewport sizes.
The browser pass verifies the five routes, mobile navigation, theme control, legacy hash redirect, internal navigation, external links, console errors, horizontal overflow, and representative screenshots.
