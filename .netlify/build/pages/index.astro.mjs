import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getCollection, s as siteConfig } from '../chunks/_astro_content_DbhLpY9b.mjs';
import { g as getTranslations, $ as $$BaseLayout } from '../chunks/BaseLayout_Duk68Qm4.mjs';
import { $ as $$Button } from '../chunks/Button_Bcatax1e.mjs';
import { $ as $$Hero } from '../chunks/Hero_CCDwYbcH.mjs';
import { a as $$PostPreview } from '../chunks/PostPreview_Dno3UO7T.mjs';
import { $ as $$ProjectPreview } from '../chunks/ProjectPreview_9w4QWtsF.mjs';
import { s as sortItemsByDateDesc } from '../chunks/data-utils_DBsUsUg0.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const currentLocale = Astro2.currentLocale || "es";
  const translations = await getTranslations(currentLocale);
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const featuredPosts = posts.filter(({ data }) => data.isFeatured);
  const localeSuffix = currentLocale === "es" ? "es" : currentLocale === "en" ? "en" : "ru";
  const allProjects = await getCollection("projects");
  const projects = allProjects.filter((p) => p.id.endsWith(localeSuffix)).sort(sortItemsByDateDesc);
  const featuredProjects = projects.filter(({ data }) => data.isFeatured);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "description": siteConfig.description, "image": siteConfig.image }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${featuredProjects?.length > 0 && renderTemplate`${maybeRenderHead()}<div class="mb-16 sm:mb-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">${translations.projects_title}</h2> ${featuredProjects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": project, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`)} <div class="mt-12 sm:mt-16"> ${renderComponent($$result2, "Button", $$Button, { "href": "/projects" }, { "default": async ($$result3) => renderTemplate`${translations.view_all_projects}` })} </div> </div>`}${featuredPosts?.length > 0 && renderTemplate`<div class="mb-16 sm:mb-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">${translations.blog_title}</h2> ${featuredPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`)} <div class="mt-12 sm:mt-16"> ${renderComponent($$result2, "Button", $$Button, { "href": "/blog" }, { "default": async ($$result3) => renderTemplate`${translations.read_more}` })} </div> </div>`}` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/index.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
