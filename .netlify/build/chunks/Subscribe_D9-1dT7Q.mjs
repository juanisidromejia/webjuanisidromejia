import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, r as renderComponent, d as renderScript, b as renderTemplate } from './astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { $ as $$Button } from './Button_Bcatax1e.mjs';
import { g as getTranslations } from './BaseLayout_Duk68Qm4.mjs';

const $$Astro = createAstro();
const $$Subscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Subscribe;
  const currentLocale = Astro2.currentLocale || "es";
  const translations = await getTranslations(currentLocale);
  const subscribe = {
    title: translations.subscribe_title,
    text: translations.subscribe_text};
  const { class: className } = Astro2.props;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<section${addAttribute(["px-8 py-12 flex flex-col items-center border border-dashed border-main text-center sm:px-12 sm:py-16", className], "class:list")}>${subscribe.title && renderTemplate`<h2${addAttribute(["w-full max-w-xl text-2xl leading-tight font-serif font-medium sm:text-4xl", subscribe.text ? "mb-4" : "mb-8"], "class:list")}>${subscribe.title}</h2>`}${subscribe.text && renderTemplate`<p class="w-full max-w-xl mb-8 text-sm leading-normal">${subscribe.text}</p>`}<form id="subscribe-form" name="subscribe-form" class="w-full max-w-xl flex flex-col gap-3.5 sm:flex-row"><label for="email" class="sr-only">
Email Address
</label><input type="email" name="email" id="email" class="w-full h-9 px-5 py-2 text-sm text-main bg-transparent border border-main rounded-full placeholder:text-main/60 focus:outline-none" required="" value="" placeholder="Your email">${renderComponent($$result, "Button", $$Button, { "type": "submit", "name": "subscribe", "class": "w-full h-9 sm:w-auto" }, { "default": async ($$result2) => renderTemplate`${translations.subscribe_button}` })}</form><div id="subscribe-message" class="hidden mt-4 p-3 bg-green-100 text-green-800 rounded-md"></div>${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/src/components/Subscribe.astro?astro&type=script&index=0&lang.ts")}</section>`}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Subscribe.astro", void 0);

export { $$Subscribe as $ };
