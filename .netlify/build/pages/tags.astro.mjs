import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_DbhLpY9b.mjs';
import { $ as $$ArrowRight } from '../chunks/ArrowRight_DtUP7aId.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Duk68Qm4.mjs';
import { $ as $$Subscribe } from '../chunks/Subscribe_D9-1dT7Q.mjs';
import { s as sortItemsByDateDesc, g as getAllTags, b as getPostsByTag } from '../chunks/data-utils_DBsUsUg0.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const tags = getAllTags(posts).sort((tagA, tagB) => {
    const postCountTagA = getPostsByTag(posts, tagA.id).length;
    const postCountTagB = getPostsByTag(posts, tagB.id).length;
    return postCountTagB - postCountTagA;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Tags", "description": "Explore tag directory for easy navigation and discovery. Find a wide range of topics, articles, and insights organized by tags, making it effortless to locate the content that interests you most.", "showHeader": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl font-serif italic sm:mb-16 sm:text-4xl">All Tags</h1> ${tags.map((tag) => {
    const postCount = getPostsByTag(posts, tag.id).length;
    return renderTemplate`<a class="mb-10 flex justify-between items-start gap-8 group sm:mb-12"${addAttribute(`/tags/${tag.id}`, "href")}> <div class="grow"> <h2 class="text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl"> ${tag.name} </h2> <div class="mt-1 text-sm leading-normal"> ${postCount} ${postCount === 1 ? "post" : "posts"} </div> </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Tag Archive ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
  })}${renderComponent($$result2, "Subscribe", $$Subscribe, { "class": "my-16 sm:my-24" })} ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/tags/index.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
