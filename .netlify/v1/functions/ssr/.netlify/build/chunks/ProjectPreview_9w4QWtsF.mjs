import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, r as renderComponent, b as renderTemplate } from './astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { $ as $$ArrowRight } from './ArrowRight_DtUP7aId.mjs';

const $$Astro = createAstro();
const $$ProjectPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectPreview;
  const { project, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, description } = project.data;
  const TitleTag = headingLevel;
  const currentLocale = Astro2.currentLocale;
  const localePrefix = currentLocale && currentLocale !== "es" ? `/${currentLocale}` : "";
  const projectId = project.id.replace(/\..*$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`${localePrefix}/projects/${projectId}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} ${description && renderTemplate`<div class="mt-1 text-sm leading-normal">${description}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Project ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/ProjectPreview.astro", void 0);

export { $$ProjectPreview as $ };
