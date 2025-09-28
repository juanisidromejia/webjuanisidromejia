import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CWI5nMPn.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/delete-resource.astro.mjs');
const _page4 = () => import('./pages/api/login.astro.mjs');
const _page5 = () => import('./pages/api/logout.astro.mjs');
const _page6 = () => import('./pages/api/newsletter.astro.mjs');
const _page7 = () => import('./pages/api/resources.astro.mjs');
const _page8 = () => import('./pages/api/send-newsletter.astro.mjs');
const _page9 = () => import('./pages/api/subscribe.astro.mjs');
const _page10 = () => import('./pages/api/unsubscribe-user.astro.mjs');
const _page11 = () => import('./pages/api/upload-resources.astro.mjs');
const _page12 = () => import('./pages/blog/_id_.astro.mjs');
const _page13 = () => import('./pages/blog/_---page_.astro.mjs');
const _page14 = () => import('./pages/en/about.astro.mjs');
const _page15 = () => import('./pages/en/blog/_id_.astro.mjs');
const _page16 = () => import('./pages/en/blog/_---page_.astro.mjs');
const _page17 = () => import('./pages/en/contact.astro.mjs');
const _page18 = () => import('./pages/en/projects/_id_.astro.mjs');
const _page19 = () => import('./pages/en/projects/_---page_.astro.mjs');
const _page20 = () => import('./pages/en/terms.astro.mjs');
const _page21 = () => import('./pages/en.astro.mjs');
const _page22 = () => import('./pages/projects/_id_.astro.mjs');
const _page23 = () => import('./pages/projects/_---page_.astro.mjs');
const _page24 = () => import('./pages/rss.xml.astro.mjs');
const _page25 = () => import('./pages/ru/about.astro.mjs');
const _page26 = () => import('./pages/ru/blog/_id_.astro.mjs');
const _page27 = () => import('./pages/ru/blog/_---page_.astro.mjs');
const _page28 = () => import('./pages/ru/contact.astro.mjs');
const _page29 = () => import('./pages/ru/projects/_id_.astro.mjs');
const _page30 = () => import('./pages/ru/projects/_---page_.astro.mjs');
const _page31 = () => import('./pages/ru/terms.astro.mjs');
const _page32 = () => import('./pages/ru.astro.mjs');
const _page33 = () => import('./pages/scores/list.astro.mjs');
const _page34 = () => import('./pages/scores.astro.mjs');
const _page35 = () => import('./pages/tags/_id_/_---page_.astro.mjs');
const _page36 = () => import('./pages/tags.astro.mjs');
const _page37 = () => import('./pages/index.astro.mjs');
const _page38 = () => import('./pages/_---id_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/delete-resource.js", _page3],
    ["src/pages/api/login.ts", _page4],
    ["src/pages/api/logout.ts", _page5],
    ["src/pages/api/newsletter.ts", _page6],
    ["src/pages/api/resources.ts", _page7],
    ["src/pages/api/send-newsletter.ts", _page8],
    ["src/pages/api/subscribe.ts", _page9],
    ["src/pages/api/unsubscribe-user.js", _page10],
    ["src/pages/api/upload-resources.ts", _page11],
    ["src/pages/blog/[id].astro", _page12],
    ["src/pages/blog/[...page].astro", _page13],
    ["src/pages/en/about.astro", _page14],
    ["src/pages/en/blog/[id].astro", _page15],
    ["src/pages/en/blog/[...page].astro", _page16],
    ["src/pages/en/contact.astro", _page17],
    ["src/pages/en/projects/[id].astro", _page18],
    ["src/pages/en/projects/[...page].astro", _page19],
    ["src/pages/en/terms.astro", _page20],
    ["src/pages/en/index.astro", _page21],
    ["src/pages/projects/[id].astro", _page22],
    ["src/pages/projects/[...page].astro", _page23],
    ["src/pages/rss.xml.js", _page24],
    ["src/pages/ru/about.astro", _page25],
    ["src/pages/ru/blog/[id].astro", _page26],
    ["src/pages/ru/blog/[...page].astro", _page27],
    ["src/pages/ru/contact.astro", _page28],
    ["src/pages/ru/projects/[id].astro", _page29],
    ["src/pages/ru/projects/[...page].astro", _page30],
    ["src/pages/ru/terms.astro", _page31],
    ["src/pages/ru/index.astro", _page32],
    ["src/pages/scores/list.md", _page33],
    ["src/pages/scores.astro", _page34],
    ["src/pages/tags/[id]/[...page].astro", _page35],
    ["src/pages/tags/index.astro", _page36],
    ["src/pages/index.astro", _page37],
    ["src/pages/[...id].astro", _page38]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: undefined
});
const _args = {
    "middlewareSecret": "38532584-1425-4213-8355-a58710716871"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
