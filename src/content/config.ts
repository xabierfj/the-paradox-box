import { defineCollection, z } from "astro:content";

const gamesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    image_full: z.string(),
    image_thumbnail: z.string(),
    hook: z.string(),
    theme: z.array(z.string()),
    difficulty: z.string(),
  }),
});

export const collections = {
  games: gamesCollection,
};