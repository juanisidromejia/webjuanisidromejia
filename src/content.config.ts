import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoSchema = z.object({
    title: z.string().min(5).max(120).optional(),
    description: z.string().min(15).max(160).optional(),
    image: z
        .object({
            src: z.string(),
            alt: z.string().optional()
        })
        .optional(),
    pageType: z.enum(['website', 'article']).default('website')
});

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string().optional(),
        title_es: z.string(),
        title_en: z.string().optional(),
        title_ru: z.string().optional(),
        description: z.string().optional(),
        description_es: z.string(),
        description_en: z.string().optional(),
        description_ru: z.string().optional(),
        excerpt: z.string().optional(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        isFeatured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        locale: z.string().optional(),
        seo: seoSchema.optional()
    })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: z.object({
        title: z.string(),
        seo: seoSchema.optional()
    })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: z.object({
        title: z.string().optional(),
        title_es: z.string(),
        title_en: z.string().optional(),
        title_ru: z.string().optional(),
        description: z.string().optional(),
        description_es: z.string(),
        description_en: z.string().optional(),
        description_ru: z.string().optional(),
        publishDate: z.coerce.date(),
        isFeatured: z.boolean().default(false),
        locale: z.string().optional(),
        seo: seoSchema.optional()
    })
});

const translations = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/translations' }),
    schema: z.object({
        title: z.string()
    })
});

export const collections = { blog, pages, projects, translations };
