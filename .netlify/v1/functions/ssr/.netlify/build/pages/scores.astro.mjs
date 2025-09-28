import { c as createComponent, x as renderHead, b as renderTemplate } from '../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import 'clsx';
import path from 'path';
export { renderers } from '../renderers.mjs';

const $$Scores = createComponent(($$result, $$props, $$slots) => {
  path.resolve("./public/scores/list.md");
  return renderTemplate`<html lang="es"> <head><title>Scores</title>${renderHead()}</head> <body class="bg-gray-100 text-gray-900"> <div class="container mx-auto py-10"> <h1 class="text-3xl font-bold mb-8">Scores</h1> <a href="scores/list/">descarga</a> </div> </body></html>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/scores.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/scores.astro";
const $$url = "/scores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Scores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
