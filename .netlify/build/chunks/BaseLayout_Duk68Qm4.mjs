import { c as createComponent, a as createAstro, e as addAttribute, d as renderScript, b as renderTemplate, m as maybeRenderHead, s as spreadAttributes, w as renderSlot, r as renderComponent, x as renderHead } from './astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                        */
import { s as siteConfig, g as getCollection } from './_astro_content_DbhLpY9b.mjs';

const $$Astro$6 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/jimp/develop/astro/juanisidromejia/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$5 = createAstro();
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { description = "", image = siteConfig.image, pageType = "website" } = Astro2.props;
  const title = [Astro2.props.title, siteConfig.title].filter(Boolean).join(" | ");
  const resolvedImage = image?.src ? {
    src: new URL(image.src, Astro2.site).toString(),
    alt: image.alt
  } : void 0;
  const canonicalURL = new URL(Astro2.request.url, Astro2.site);
  function formatCanonicalURL(url) {
    const path = url.toString();
    const hasQueryParams = path.includes("?");
    if (hasQueryParams) {
      path.replace(/\/?$/, "");
    }
    return path.replace(/\/?$/, hasQueryParams ? "" : "/");
  }
  return renderTemplate`<!-- High Priority Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Low Priority Global Metadata --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS"><!-- Page Metadata --><link rel="canonical"${addAttribute(formatCanonicalURL(canonicalURL), "href")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(pageType, "content")}><meta property="og:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="og:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta property="og:image:alt"${addAttribute(resolvedImage.alt, "content")}>`}<!-- X/Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="twitter:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta name="twitter:image:alt"${addAttribute(resolvedImage?.alt, "content")}>`}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/BaseHead.astro", void 0);

async function getTranslations(locale) {
  const translations = await getCollection("translations");
  const translationFile = translations.find((t2) => t2.id === locale);
  if (!translationFile) {
    throw new Error(`Translation file for ${locale} not found`);
  }
  const rawContent = translationFile.body || "";
  const content = rawContent.replace(/^---[\s\S]*?---\n/, "");
  const lines = content.split("\n");
  const translationsObj = {};
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.includes(":")) {
      const [key, ...valueParts] = trimmedLine.split(":");
      const value = valueParts.join(":").trim();
      if (value) {
        const cleanKey = key.trim();
        const finalKey = cleanKey;
        const cleanValue = value.replace(/^["']|["']$/g, "");
        translationsObj[finalKey] = cleanValue;
      }
    }
  }
  return translationsObj;
}
function t(key, translations) {
  return translations[key] || key;
}

const $$Astro$4 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentLocale = Astro2.currentLocale || "es";
  const translations = await getTranslations(currentLocale);
  const socialLinks = siteConfig.socialLinks || [];
  const navLinks = [
    { text: translations.about, href: "/about" },
    { text: translations.contact, href: "/contact" },
    { text: translations.terms, href: "/terms" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="w-full max-w-3xl mx-auto pt-12 pb-10 sm:pt-24 sm:pb-14"> ${navLinks.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-x-6 gap-y-1"> ${navLinks.map((link) => renderTemplate`<a class="font-serif hover:underline hover:underline-offset-2"${addAttribute(link.href, "href")}> ${link.text} </a>`)} </div>`} <div${addAttribute([
    "pt-6 flex flex-col gap-4 border-t border-dashed border-main",
    { "sm:flex-row-reverse sm:justify-between sm:items-center": socialLinks.length > 0 }
  ], "class:list")}> ${socialLinks.length > 0 && renderTemplate`<div class="flex flex-wrap gap-x-4 gap-y-1"> ${socialLinks.map((link) => renderTemplate`<a class="inline-flex items-center justify-center text-sm hover:underline hover:underline-offset-2"${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferer"> ${link.text} </a>`)} </div>`} <p class="text-sm">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()}&nbsp;<a class="hover:underline hover:underline-offset-2" href="/">${siteConfig.title}</a>. All rights reserved.
</p> </div> </footer>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Footer.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="w-full max-w-3xl mx-auto mb-12 sm:mb-16"> ${siteConfig.logo && siteConfig.logo?.src ? renderTemplate`<a href="/"> <img${addAttribute(siteConfig.logo.src, "src")}${addAttribute(siteConfig.logo.alt || "", "alt")} class="max-h-12"> </a>` : renderTemplate`<a class="font-serif text-2xl leading-tight font-medium text-theme-foreground sm:text-4xl" href="/"> ${siteConfig.title} </a>`} ${renderTemplate`<p class="text-sm leading-tight mt-1">${siteConfig.subtitle}</p>`} </header>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro();
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([className, { "underline underline-offset-2 decoration-1": isActive }], "class:list")}${addAttribute(href, "href")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/NavLink.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="w-8 h-8 -mr-2 flex items-center justify-center" aria-label="Change color scheme"> <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="8"></circle> </svg> </button> ${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/src/components/ThemeToggle.astro?astro&type=script&index=1&lang.ts")}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/ThemeToggle.astro", void 0);

const $$Astro$2 = createAstro();
const $$LanguageSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const currentLocale = Astro2.currentLocale || "es";
  const locales = [
    { code: "es", name: "ES" },
    { code: "en", name: "EN" },
    { code: "ru", name: "RU" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<div class="language-selector flex gap-2"> ${locales.map((locale) => {
    const isActive = currentLocale === locale.code;
    const href = locale.code === "es" ? currentPath.replace(/^\/(es|en|ru)/, "") || "/" : `/${locale.code}${currentPath.replace(/^\/(es|en|ru)/, "")}`;
    return renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
      "px-2 py-1 text-sm font-medium rounded transition-colors",
      isActive ? "bg-main text-white" : "text-main hover:bg-main hover:text-white"
    ], "class:list")}> ${locale.name} </a>`;
  })} </div>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/LanguageSelector.astro", void 0);

const $$Astro$1 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const currentLocale = Astro2.currentLocale || "es";
  const translations = await getTranslations(currentLocale);
  const navLinks = [
    { text: translations.home, href: "/" },
    { text: translations.resources, href: "/projects" },
    { text: translations.blog, href: "/blog" },
    { text: translations.tags, href: "/tags" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="min-h-10 pt-4 pb-12 relative sm:min-h-14 sm:pb-24 md:pt-8" data-astro-cid-dmqpwcec> ${navLinks.length > 0 && renderTemplate`<div class="w-full max-w-3xl mx-auto relative" data-astro-cid-dmqpwcec> <button class="menu-toggle w-8 h-8 -ml-1 flex items-center justify-center relative z-30 md:hidden" aria-label="Open Menu" aria-expanded="false" aria-controls="menu-items" data-astro-cid-dmqpwcec> <span class="menu-toggle-icon w-6 h-px relative bg-current" data-astro-cid-dmqpwcec></span> </button> <ul id="menu-items" class="menu flex gap-6" data-astro-cid-dmqpwcec> ${navLinks.map((link) => renderTemplate`<li class="py-1" data-astro-cid-dmqpwcec> ${renderComponent($$result, "NavLink", $$NavLink, { "class": "text-xl font-serif text-main hover:underline hover:underline-offset-2 hover:decoration-1 md:text-base", "href": link.href, "data-astro-cid-dmqpwcec": true }, { "default": async ($$result2) => renderTemplate`${link.text}` })} </li>`)} </ul> </div>`} <div class="absolute right-0 top-4 z-10 md:top-8 flex items-center gap-4" data-astro-cid-dmqpwcec> ${renderComponent($$result, "LanguageSelector", $$LanguageSelector, { "data-astro-cid-dmqpwcec": true })} ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-dmqpwcec": true })} </div> </nav>  ${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/src/components/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Nav.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { showHeader = true, ...head } = Astro2.props;
  const currentLocale = Astro2.currentLocale || "es";
  return renderTemplate`<html${addAttribute(currentLocale, "lang")} class="antialiased break-words"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { ...head })}${renderScript($$result, "/home/jimp/develop/astro/juanisidromejia/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="bg-main text-main"> <div class="flex flex-col min-h-screen px-4 md:px-8"> ${renderComponent($$result, "Nav", $$Nav, {})} ${showHeader && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} <main class="grow w-full max-w-3xl mx-auto"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, getTranslations as g, t };
