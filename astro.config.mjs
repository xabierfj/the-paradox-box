// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Detect GitHub Pages context via env vars during CI
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isCI = !!process.env.GITHUB_ACTIONS;
const base = isCI && repo ? `/${repo}` : undefined;

export default defineConfig({
  site: 'https://xabierfj.github.io',
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});

