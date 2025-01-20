import { defineCollection, z, reference } from 'astro:content';

import { glob, file } from 'astro/loaders';

const post = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/blog/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }),
    excerpt: z.string().optional(),
    tags: z.array(z.string()),
    relatedPosts: z.array(reference('post')).optional(),
    category: z.string(),
    readingTime: z.string().optional(),
    rating: z.number().optional(),
    isFeatured: z.boolean().optional()
  })
});

export const collections = { post };
