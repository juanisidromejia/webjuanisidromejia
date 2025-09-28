import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, b as renderTemplate } from './astro/server_C4Ew1Baj.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${addAttribute(className, "class")}${spreadAttributes(props)}> <path d="M4.286 12c0-0.533 0.432-0.964 0.964-0.964v0h11.172l-4.14-4.138c-0.175-0.175-0.283-0.416-0.283-0.683 0-0.533 0.432-0.965 0.965-0.965 0.267 0 0.508 0.108 0.683 0.283v0l5.785 5.785c0.175 0.175 0.283 0.416 0.283 0.683s-0.108 0.508-0.283 0.683l-5.785 5.785c-0.175 0.175-0.416 0.283-0.683 0.283-0.533 0-0.965-0.432-0.965-0.965 0-0.267 0.108-0.508 0.283-0.683v0l4.14-4.138h-11.172c-0.533 0-0.964-0.432-0.964-0.964v0z"></path> </svg>`;
}, "/home/jimp/develop/astro/juanisidromejia/src/icons/ArrowRight.astro", void 0);

export { $$ArrowRight as $ };
