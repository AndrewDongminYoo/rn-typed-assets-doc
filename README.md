# React Native Toolkits

Public product website for a focused collection of React Native developer tools by [AndrewDongminYoo](https://github.com/AndrewDongminYoo).
The site promotes audit-first agent workflows, typed asset generation, New Architecture readiness audits, and Figma-to-NativeWind code generation.

## Products

| Route                   | Product              | Public destination                                                                                 |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `/rn-agents-kit`        | RN Agents Kit        | [GitHub](https://github.com/AndrewDongminYoo/rn-agents-kit)                                        |
| `/rn-typed-assets`      | rn-typed-assets      | [npm](https://www.npmjs.com/package/rn-typed-assets)                                               |
| `/rn-newarch-ready`     | rn-newarch-ready     | [npm](https://www.npmjs.com/package/rn-newarch-ready)                                              |
| `/design-to-nativewind` | Design to NativeWind | [Figma Community](https://www.figma.com/community/plugin/1653684573206075427/design-to-nativewind) |

## Machine-readable surface

Every page also answers `Accept: text/markdown` with a Markdown representation of itself, per
[acceptmarkdown.com](https://acceptmarkdown.com), and every page has a `.md` sibling URL
(`/index.md` for the home page).

| Endpoint       | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `/llms.txt`    | Site index for language models, including when to use each toolkit |
| `/agents.md`   | Agent instruction file: task routing, invocation, boundaries       |
| `/sitemap.xml` | Every indexable route                                              |
| `/robots.txt`  | Crawl policy and the sitemap pointer                               |

```bash
curl -sI -H "Accept: text/markdown" https://rn-toolkits.donminzzi.kr/   # text/markdown, Vary: Accept
curl -s  -H "Accept: application/pdf" https://rn-toolkits.donminzzi.kr/ # 406, lists what is available
curl -s -o /dev/null -w "%{http_code}" https://rn-toolkits.donminzzi.kr/nope # 404
```

`proxy.ts` does the negotiation; `app/api/markdown/[[...slug]]/route.ts` serves the Markdown, which
is generated from the same catalog as the pages.

`vercel.json` re-applies `Vary` at the edge. It has to: Next 16's app-page template calls
`res.setHeader("Vary", …)` during the render, so neither `proxy.ts` nor `next.config.mjs` can keep
`Accept` in that header on an HTML page. The Markdown and `406` responses do not go through that
template, so they carry it from `proxy.ts` directly.

## Tech stack

- Next.js 16 App Router and React 19.
- TypeScript 5.7 in strict mode.
- Tailwind CSS 4 with OKLch design tokens.
- Shiki 4 for syntax highlighting.
- Vercel Analytics in production.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

The dependency-free route integration test expects a running server.

```bash
SITE_BASE_URL=http://127.0.0.1:3000 node --test tests/site-routes.test.mjs
```

## Deployment

Every push to `main` deploys automatically through the configured Vercel project.
