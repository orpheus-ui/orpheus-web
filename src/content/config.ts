import { defineCollection, z } from "astro:content";

const worksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    projectDate: z.date(),
    client: z.string().optional(),
    tools: z.array(z.string()),
    category: z.array(z.string()),
    coverImage: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('Raef'),
    image: z.string().optional(),
    tags: z.array(z.string()),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  works: worksCollection,
  blog: blogCollection,
};
