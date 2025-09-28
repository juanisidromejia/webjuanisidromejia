import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getTranslations, $ as $$BaseLayout } from '../../chunks/BaseLayout_Duk68Qm4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const currentLocale = Astro2.currentLocale || "en";
  const translations = await getTranslations(currentLocale);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": translations.contact_title, "description": translations.contact_text, "showHeader": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${translations.contact_title}</h1> <p class="mt-4 text-lg text-muted">${translations.contact_subtitle}</p> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> <p>${translations.contact_text}</p> <h2>Email</h2> <p>Feel free to drop me an email at <a href="mailto:juanisidromejia@gmail.com">juanisidromejia@gmail.com</a>, and I'll do my best to respond as soon as possible.</p> <h2>Social Media</h2> <p>Connect with me on social media as well. Find me on <a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a> or <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>.</p> </div> </article> ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/en/contact.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/en/contact.astro";
const $$url = "/en/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
