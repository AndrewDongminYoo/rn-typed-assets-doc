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
