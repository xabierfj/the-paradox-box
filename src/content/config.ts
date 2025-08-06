import { defineCollection, z } from "astro:content";

const rooms = defineCollection({
  type: "data",
  schema: ({ image }) => z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    image: image(),
    image_thumbnail: image(),
    hook: z.string(),
    theme: z.array(z.string()),
    difficulty: z.string(),
    players: z.string(),
    time: z.string(),
    description: z.string(),
    color: z.string().optional(),
  }),
});

export const collections = {
  rooms,
};