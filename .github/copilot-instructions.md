# Copilot instructions for this repo

Repo purpose: Astro 5 site for “The Paradox Box” landing content with a rooms showcase driven by Astro Content Collections and Tailwind CSS v4.

## Quick facts
- Frameworks: Astro ^5, Tailwind CSS ^4 via `@tailwindcss/vite` (see `astro.config.mjs`).
- Package manager: Bun is present (`bun.lock`), but npm works. Scripts live in `package.json`.
- TS paths: `@/*` → `src/*`, `@components/*` → `src/components/*` (`tsconfig.json`).
- Styling: Tailwind classes + CSS variables in `src/styles/global.css` (no tailwind.config.js).

## How it’s structured
- Pages: `src/pages/` (entry is `pages/index.astro`).
- Layout: `src/layouts/Layout.astro` wraps pages, injects global `<Header />` and `<Hero />`, and renders `<slot />` for page content.
- Components: `src/components/**` (e.g., `Showcase.astro`, `AboutUs.astro`, `RoomCard.astro`).
- Content: `src/content/` with a data collection `rooms` defined in `src/content/config.ts`.

## Content model: rooms
- Schema: `defineCollection({ type: 'data', schema: ({ image }) => z.object({...}) })` in `src/content/config.ts`.
- Required fields: `id, title, slug, image, image_thumbnail, hook, theme[], difficulty, players, time, description` (+ optional `color`).
- Source files: JSON items under `src/content/rooms/*.json`. Example: `circus.json`, `manor.json`, `tesla.json`.
- Image fields use the `image()` type. Follow the existing pattern and reference images from `src/content/rooms/_images/...` as used in current JSON.

## Data → UI flow
- `src/components/Showcase.astro` calls `getCollection('rooms')` and maps items to `<RoomCard room={room} />`.
- `src/components/RoomCard.astro` uses `astro:assets` `<Image>` with `room.data.image_thumbnail` and responsive `widths`/`sizes`.
- Links: `href={room.data.slug}`. Today slugs are simple paths (e.g., `despicable-circus`), not nested under `/rooms/`. If you add detail pages later, align slugs/routes accordingly.

## Styling + assets
- Global theme tokens are in `src/styles/global.css` (CSS variables: `--color-background`, `--color-text`, `--color-glow`, etc.).
- Tailwind v4 is enabled via `@import "tailwindcss";` in `global.css` and the Vite plugin in `astro.config.mjs`.
- Images: Prefer `astro:assets` `<Image>` for responsive outputs. Provide `widths` and `sizes` like existing components (`Hero.astro`, `RoomCard.astro`).

## Dev workflows
- Install: `bun install` (or `npm i`). Dev: `bun run dev` (`npm run dev`) → http://localhost:4321.
- Build/preview: `bun run build` → `dist/`; `bun run preview` (or npm equivalents).
- Check types/content: `bun run astro -- check` (or `npm run astro -- check`).

## Common tasks (follow current patterns)
- Add a room: create `src/content/rooms/<id>.json` (all schema fields), put images in `src/content/rooms/_images/`, reference in JSON; it will auto-appear in `Showcase`.
- New section on homepage: add a component in `src/components/`, include it from `src/pages/index.astro` inside `<Layout>`.
- New page: create `src/pages/<route>.astro` and wrap with `<Layout title="...">...</Layout>`.

## Pitfalls and gotchas
- Keep JSON in sync with `src/content/config.ts`; mismatches fail `astro check`/build.
- Use `astro:assets` `<Image>` with collection fields (see `RoomCard.astro`) for optimized output.
- Prefer TS path aliases (`@/...`) over long relative imports.

Key references: config (`astro.config.mjs`, `tsconfig.json`); layout/shell (`src/layouts/Layout.astro`, `src/components/Header.astro`, `src/components/Hero.astro`); content/showcase (`src/content/config.ts`, `src/components/Showcase.astro`, `src/components/RoomCard.astro`, `src/content/rooms/**`); theme (`src/styles/global.css`).
