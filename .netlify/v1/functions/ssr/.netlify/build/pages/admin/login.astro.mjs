import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Duk68Qm4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login - Panel de Administraci\xF3n" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">Acceso al Panel de Administración</h1> <p class="mt-4 text-lg text-muted">Ingresa tu contraseña para acceder al panel.</p> </header> <div class="max-w-md mx-auto"> ${error && renderTemplate`<div class="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
Contraseña incorrecta. Inténtalo de nuevo.
</div>`} <form action="/api/login" method="post" class="space-y-4"> <div> <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
Contraseña
</label> <input type="password" id="password" name="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingresa tu contraseña"> </div> <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
Iniciar Sesión
</button> </form> </div> </article> ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/admin/login.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
