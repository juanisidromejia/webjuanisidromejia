import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    site: 'https://juanisidromejia.netlify.app',
    i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en', 'ru'],
        routing: {
            prefixDefaultLocale: false
        }
    },
    integrations: [
        mdx(),
        sitemap(),
        tailwind({
            applyBaseStyles: false
        })
    ],
    adapter: netlify({
        edgeMiddleware: true
    }),
    output: 'server'
});
