import rss from '@astrojs/rss';
import { g as getCollection, s as siteConfig } from '../chunks/_astro_content_DbhLpY9b.mjs';
import { s as sortItemsByDateDesc } from '../chunks/data-utils_DBsUsUg0.mjs';
export { renderers } from '../renderers.mjs';

async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/blog/${item.id}/`,
            pubDate: item.data.publishDate.setUTCHours(0)
        }))
    });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
