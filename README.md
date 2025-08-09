<div align="center">
	<h1>The Paradox Box</h1>
	<p><strong>Landing experience & content showcase for immersive escape rooms.</strong></p>
	<p>Built with Astro&nbsp;5, Tailwind CSS&nbsp;v4, and Astro Content Collections.</p>
</div>

## ✨ Overview

The Paradox Box site is a fast static+islands marketing surface for a set of themed escape rooms. Content (rooms, metadata, media) lives in structured JSON files validated at build time. Pages statically render for SEO and speed; dynamic enhancement is kept minimal.

Key goals:

* Simple authoring: add a JSON + images, the room appears automatically.
* Strong theming: gradient text, dark neon aesthetic, reusable layout & hero slot.
* Zero back-end: fully deployable to any static host / edge platform.
* Performance-first: Astro partial hydration + optimized images.

## 🧩 Tech Stack

* Astro 5
* Tailwind CSS v4 via `@tailwindcss/vite` (no separate tailwind.config.js)
* TypeScript (path aliases: `@/*`, `@components/*`)
* Content Collections (`src/content/rooms`) with Zod schema + `image()` type
* `astro:assets` for responsive, optimized images
* Bun (primary) / npm compatible

## 📁 Structure

```
src/
	components/       Reusable UI (Hero, Showcase, RoomCard, GameDetails, Header, Footer ...)
	pages/            Route files (index, dynamic room `[slug]`, faq, contact, booking)
	layouts/          Global shell (Layout.astro with hero slot + footer)
	content/
		config.ts       Content collection schema
		rooms/*.json    Room definitions (id, title, slug, images, meta)
		rooms/_images/  Source images referenced by JSON
	styles/global.css Tailwind import + design tokens (CSS variables)
```

## 🗂 Content Model (rooms)

`src/content/config.ts` defines a `rooms` data collection. Each `rooms/*.json` file must supply:

| Field | Type | Notes |
|-------|------|-------|
| id | string | Unique identifier |
| title | string | Display title |
| slug | string | Used for dynamic route `/[slug]` |
| image | image | Main image (astro `image()` type) |
| image_thumbnail | image | Card thumbnail |
| hook | string | Short uppercase tagline |
| theme | string[] | Thematic tags |
| difficulty | string | e.g. `3/5` (parsed for challenge meter) |
| players | string | Human-readable (e.g. `2–6`) |
| time | string | Duration (e.g. `60 min`) |
| description | string | Markdown/plain description |
| color | string? | Optional gradient tailwind utility string |

Adding a new room:

1. Place images under `src/content/rooms/_images/`.
2. Create `src/content/rooms/<id>.json` following the schema.
3. Run `bun astro -- check` to validate.
4. The room appears on the homepage showcase & gets a detail page at `/<slug>`.

## 🧱 Key Components

* `Layout.astro` – Header, optional hero slot, footer.
* `Header.astro` – Fixed top nav, data‑driven links, booking CTA.
* `Hero.astro` – Landing hero (only on index) with background & marketing copy.
* `Showcase.astro` – Fetches collection & renders `RoomCard` grid.
* `RoomCard.astro` – Optimized thumbnail, title, hook.
* `GameDetails.astro` – Reusable sidebar: players, time, challenge meter, themes, booking CTA.
* `Footer.astro` – Fictional single-location + contact block & socials.

## 🔄 Dynamic Room Pages

`src/pages/[slug].astro` uses `getStaticPaths()` to map each room's `slug` to a generated page. The page includes:

* Hero section (gradient title / hook)
* Description content
* `GameDetails` sidebar
* Related rooms section (simple exclusion of current room)

Challenge meter derives the numeric prefix of `difficulty` (e.g. `3/5`) and renders a 5‑segment bar.

## 🎨 Styling & Theming

* Tailwind utilities + design tokens via CSS variables in `global.css`.
* Optional `color` field in room JSON injects gradient utility classes.
* Backdrop blurs & subtle borders (`border-white/10`) build a glass-dark UI.

## 🛠 Development

Install dependencies:

```sh
bun install
```

Run dev server:

```sh
bun run dev
```

Type/content check:

```sh
bun astro -- check
```

Production build & preview:

```sh
bun run build
bun run preview
```

Use npm instead of bun if preferred (`npm install`, `npm run dev`, etc.).

## 🧪 Quality & Validation

`astro check` validates:
* Content collection schema compliance
* TypeScript types

Add new content or refactors incrementally; run checks early to catch schema mismatches (e.g. wrong image fields).

## 🚀 Deployment

Output is static HTML + assets (with responsive image variants). Deploy to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No server process required.

## 🗺 Roadmap Ideas

* Booking integration (real availability widget)
* Filter/sort rooms by theme or difficulty
* Image gallery per room
* Internationalization (i18n)
* Light mode / system theme toggle

## 📄 License

Proprietary (example fiction). Adjust as needed.

---
Built with ❤️ using Astro.
