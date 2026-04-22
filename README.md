# rn-typed-assets-doc

Documentation website for [rn-typed-assets](https://github.com/AndrewDongminYoo/rn-typed-assets) — a type-safe asset management library for React Native that generates typed TypeScript registries for images, SVGs, and Lottie animations.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript 5.7** (strict mode)
- **Tailwind CSS 4** with OKLch color tokens
- **shadcn/ui** (New York style) + **CVA** for component variants
- **Shiki 4** for VSCode-quality syntax highlighting
- **Vercel Analytics** for production telemetry

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `pnpm dev`      | Start development server |
| `pnpm build`    | Production build         |
| `pnpm start`    | Start production server  |
| `pnpm lint`     | Run ESLint               |
| `pnpm lint:fix` | Auto-fix lint issues     |
| `pnpm format`   | Format with Prettier     |

## Deployment

Every push to `main` deploys automatically via Vercel.
