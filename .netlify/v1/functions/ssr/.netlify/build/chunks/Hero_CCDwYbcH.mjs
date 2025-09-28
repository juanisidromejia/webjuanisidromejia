import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate, e as addAttribute, v as unescapeHTML, r as renderComponent } from './astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { marked } from 'marked';
import { $ as $$Button } from './Button_Bcatax1e.mjs';
import { s as siteConfig } from './_astro_content_DbhLpY9b.mjs';
import { g as getTranslations } from './BaseLayout_Duk68Qm4.mjs';

const $$Astro = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const currentLocale = Astro2.currentLocale || "es";
  const translations = await getTranslations(currentLocale);
  const hero = {
    title: translations.hero_title,
    text: translations.hero_text,
    image: siteConfig.hero?.image,
    actions: siteConfig.hero?.actions
  };
  return renderTemplate`${(hero?.title || hero?.image?.src) && renderTemplate`${maybeRenderHead()}<section class="w-full flex flex-col gap-8 mb-16 sm:mb-24">${hero.title && renderTemplate`<h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${hero.title}</h1>`}${hero.image?.src && renderTemplate`<figure><img class="w-full"${addAttribute(hero.image.src, "src")} loading="lazy" decoding="async"${addAttribute(hero.image.alt, "alt")}>${hero.image.caption && renderTemplate`<figcaption class="mt-1.5 text-xs sm:text-sm">${hero.image.caption}</figcaption>`}</figure>`}${hero.text && renderTemplate`<div class="max-w-none prose prose-dante sm:prose-lg">${unescapeHTML(marked.parse(hero.text))}</div>`}${hero.actions && hero.actions.length > 0 && renderTemplate`<div class="flex flex-wrap gap-4">${hero.actions.map((action) => renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": action.href }, { "default": async ($$result2) => renderTemplate`${action.text}` })}`)}</div>`}</section>`}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Hero.astro", void 0);

export { $$Hero as $ };
