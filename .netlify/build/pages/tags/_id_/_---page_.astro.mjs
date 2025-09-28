import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getCollection, s as siteConfig } from '../../../chunks/_astro_content_DbhLpY9b.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_Duk68Qm4.mjs';
import { $ as $$Pagination } from '../../../chunks/Pagination_BlQNRb5U.mjs';
import { a as $$PostPreview } from '../../../chunks/PostPreview_Dno3UO7T.mjs';
import { $ as $$Subscribe } from '../../../chunks/Subscribe_D9-1dT7Q.mjs';
import { g as getAllTags, s as sortItemsByDateDesc, b as getPostsByTag } from '../../../chunks/data-utils_DBsUsUg0.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths({ paginate }) {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const tags = getAllTags(posts);
  return tags.flatMap((tag) => {
    const filteredPosts = getPostsByTag(posts, tag.id);
    return paginate(filteredPosts, {
      params: { id: tag.id },
      pageSize: siteConfig.postsPerPage
    });
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const blog = page.data;
  const params = Astro2.params;
  const allPosts = await getCollection("blog");
  const allTags = getAllTags(allPosts);
  const currentTag = allTags.find((tag) => {
    return tag.id === params.id;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Posts Tagged ${currentTag?.name}`, "description": `Explore a curated collection of blog posts under ${currentTag?.name}`, "image": { src: "/dante-preview.jpg", alt: "The preview of the site" }, "showHeader": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl leading-tight font-serif italic sm:mb-16 sm:text-4xl">Posts Tagged "${currentTag?.name}"</h1> ${blog.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "class": "mb-10 sm:mb-12" })}`)}${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "class": "my-16 sm:my-24" })} ${renderComponent($$result2, "Subscribe", $$Subscribe, { "class": "my-16 sm:my-24" })} ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/tags/[id]/[...page].astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/tags/[id]/[...page].astro";
const $$url = "/tags/[id]/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
