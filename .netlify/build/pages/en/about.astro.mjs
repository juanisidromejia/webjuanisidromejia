import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getTranslations, $ as $$BaseLayout } from '../../chunks/BaseLayout_Duk68Qm4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const currentLocale = Astro2.currentLocale || "en";
  const translations = await getTranslations(currentLocale);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": translations.about_title, "description": translations.about_text, "showHeader": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${translations.about_title}</h1> <p class="mt-4 text-lg text-muted">${translations.about_subtitle}</p> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> <p>${translations.about_text}</p> <h2>Juan Isidro Mejía - Classical Guitarist and Conductor</h2> <p><strong>Hello!</strong> I am Juan Isidro Mejía, a passionate classical guitarist and music conductor dedicated to helping young musicians develop their skills. My approach combines traditional music education with modern technologies and artificial intelligence.</p> <h2>Skills and Expertise</h2> <p>I specialize in classical guitar performance and orchestral conducting, with extensive experience in music education. My expertise includes traditional teaching methods enhanced by modern technological tools and innovative approaches to musical learning.</p> <h2>Innovation in Music Education</h2> <p>I thrive on finding new ways to make music education more accessible and effective. Whether it's integrating technology into traditional teaching methods, developing new pedagogical approaches, or creating innovative learning experiences, I approach each challenge with enthusiasm and dedication.</p> <h2>Global Perspective, Local Impact</h2> <p>My experience spans different cultures and musical traditions, allowing me to bring a global perspective to music education while maintaining strong connections to local musical communities and traditions.</p> <h2>Continuous Learning</h2> <p>The evolving nature of music education and technology inspires me to stay current with the latest developments. I'm always eager to expand my knowledge and embrace new tools that enhance musical learning and performance.</p> <h2>Collaboration and Communication</h2> <p>I believe in the power of collaboration in music education. Whether working with students, fellow musicians, educators, or institutions, I value clear communication to ensure the success of every musical journey.</p> <h2>Get in Touch</h2> <p>Are you interested in music education, performance opportunities, or collaboration? I'd love to hear from you! Feel free to reach out for lessons, conducting opportunities, or just a friendly conversation about music.</p> <p><em>Let's create beautiful music together!</em></p> </div> </article> ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/en/about.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/en/about.astro";
const $$url = "/en/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
