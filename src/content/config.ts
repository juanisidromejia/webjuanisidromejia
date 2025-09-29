import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
        title_es: z.string(),
        title_en: z.string().optional(),
        title_ru: z.string().optional(),
        description: z.string().optional(),
        description_es: z.string(),
        description_en: z.string().optional(),
        description_ru: z.string().optional(),
        publishDate: z.date(),
        isFeatured: z.boolean().default(false)
    })
});

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
        title_es: z.string(),
        title_en: z.string().optional(),
        title_ru: z.string().optional(),
        description: z.string().optional(),
        description_es: z.string(),
        description_en: z.string().optional(),
        description_ru: z.string().optional(),
        publishDate: z.date(),
        isFeatured: z.boolean().default(false),
        tags: z.array(z.string()).optional(),
        seo: z
            .object({
                image: z.object({
                    src: z.string(),
                    alt: z.string()
                })
            })
            .optional()
    })
});

const pagesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
        title_es: z.string(),
        title_en: z.string().optional(),
        title_ru: z.string().optional()
    })
});

export const collections = {
    projects: projectsCollection,
    blog: blogCollection,
    pages: pagesCollection
};
