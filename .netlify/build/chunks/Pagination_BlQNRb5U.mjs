import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, b as renderTemplate, w as renderSlot, r as renderComponent } from './astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$ArrowRight } from './ArrowRight_DtUP7aId.mjs';

const $$Astro$2 = createAstro();
const $$ArrowLeft = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${addAttribute(className, "class")}${spreadAttributes(props)}> <path d="M19.714 12c0 0.533-0.432 0.964-0.964 0.964v0h-11.172l4.14 4.138c0.175 0.175 0.283 0.416 0.283 0.683 0 0.533-0.432 0.965-0.965 0.965-0.267 0-0.508-0.108-0.683-0.283v0l-5.785-5.785c-0.175-0.175-0.283-0.416-0.283-0.683s0.108-0.508 0.283-0.683l5.785-5.785c0.175-0.175 0.416-0.283 0.683-0.283 0.533 0 0.965 0.432 0.965 0.965 0 0.267-0.108 0.508-0.283 0.683v0l-4.14 4.138h11.172c0.533 0 0.964 0.432 0.964 0.964v0z"></path> </svg>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/icons/ArrowLeft.astro", void 0);

const $$Astro$1 = createAstro();
const $$IconButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$IconButton;
  const { href, class: className, ...rest } = Astro2.props;
  const buttonClasses = "inline-flex items-center justify-center p-2 text-main bg-main border border-main rounded-full transition hover:bg-muted";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/IconButton.astro", void 0);

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Pagination"${addAttribute(["px-12 py-2 relative text-center", className], "class:list")}> ${page.url.prev && renderTemplate`${renderComponent($$result, "IconButton", $$IconButton, { "class": "absolute left-0 top-1/2 -translate-y-1/2", "href": page.url.prev, "aria-label": `Go to page ${page.currentPage - 1} of ${page.lastPage}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { "class": "w-5 h-5 fill-current" })} ` })}`} <span class="text-sm" aria-current="page">Page ${page.currentPage} of ${page.lastPage}</span> ${page.url.next && renderTemplate`${renderComponent($$result, "IconButton", $$IconButton, { "class": "absolute right-0 top-1/2 -translate-y-1/2", "href": page.url.next, "aria-label": `Go to page ${page.currentPage + 1} of ${page.lastPage}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "w-5 h-5 fill-current" })} ` })}`} </nav>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
