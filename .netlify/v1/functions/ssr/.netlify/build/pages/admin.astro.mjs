import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderScript, e as addAttribute } from '../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import { g as getTranslations, $ as $$BaseLayout } from '../chunks/BaseLayout_Duk68Qm4.mjs';
import fs from 'fs';
import path from 'path';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const authCookie = Astro2.cookies.get("admin_auth");
  if (!authCookie || authCookie.value !== "true") {
    return Astro2.redirect("/admin/login");
  }
  const currentLocale = Astro2.currentLocale || "es";
  await getTranslations(currentLocale);
  let newsletterData = { newsletters: [], subscribers: [] };
  try {
    const filePath = path.resolve("./src/data/admin/newsletter.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    newsletterData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading newsletter data:", error);
  }
  const { newsletters, subscribers } = newsletterData;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Panel de Administraci\xF3n - Newsletter", "showHeader": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <div class="flex justify-between items-start"> <div> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">Panel de Administración</h1> <p class="mt-4 text-lg text-muted">Gestión del Newsletter Musical</p> </div> <form action="/api/logout" method="post" class="inline"> <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
Cerrar Sesión
</button> </form> </div> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"> <!-- Estadísticas --> <div class="bg-main/5 p-6 rounded-lg border border-main/20"> <h3 class="text-xl font-semibold mb-4">Estadísticas</h3> <div class="space-y-2"> <p><strong>Suscriptores activos:</strong> ${subscribers.filter((s) => s.active).length}</p> <p><strong>Newsletters enviados:</strong> ${newsletters.filter((n) => n.status === "sent").length}</p> <p><strong>Newsletters pendientes:</strong> ${newsletters.filter((n) => n.status === "draft").length}</p> </div> </div> <!-- Crear nuevo newsletter --> <div class="bg-main/5 p-6 rounded-lg border border-main/20"> <h3 class="text-xl font-semibold mb-4">Crear Nuevo Newsletter</h3> <div id="message" class="mb-4 hidden"></div> <form id="newsletterForm" class="space-y-4"> <div> <label for="title" class="block text-sm font-medium mb-1">Título</label> <input type="text" id="title" name="title" required class="w-full px-3 py-2 border border-main/30 rounded-md bg-transparent" placeholder="Título del newsletter"> </div> <div> <label for="content" class="block text-sm font-medium mb-1">Contenido</label> <textarea id="content" name="content" rows="6" required class="w-full px-3 py-2 border border-main/30 rounded-md bg-transparent" placeholder="Contenido del newsletter..."></textarea> </div> <button type="submit" id="submitBtn" class="w-full bg-main text-white px-4 py-2 rounded-md hover:bg-main/80 transition-colors">
Crear Newsletter
</button> </form> </div> <!-- Enviar newsletter --> <div class="bg-main/5 p-6 rounded-lg border border-main/20 mt-8"> <h3 class="text-xl font-semibold mb-4">Enviar Newsletter</h3> <div id="sendMessage" class="mb-4 hidden"></div> <div class="space-y-4"> <div> <label for="newsletterSelect" class="block text-sm font-medium mb-1">Seleccionar Newsletter</label> <select id="newsletterSelect" class="w-full px-3 py-2 border border-main/30 rounded-md bg-transparent"> <option value="">Seleccionar newsletter...</option> ${newsletters.filter((n) => n.status === "draft").map((newsletter) => renderTemplate`<option${addAttribute(newsletter.id, "value")}>${newsletter.title}</option>`)} </select> <p class="text-xs text-muted mt-1">
Solo se muestran los newsletters en borrador.
</p> </div> <button id="sendNewsletterBtn" class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50" disabled>
Enviar Newsletter
</button> </div> </div> </div> <!-- Subida de recursos --> <div class="bg-main/5 p-6 rounded-lg border border-main/20 mt-8"> <h3 class="text-xl font-semibold mb-4">Subir Recursos Musicales</h3> <form id="uploadForm" enctype="multipart/form-data" class="space-y-4"> <div> <label for="category" class="block text-sm font-medium mb-1">Categoría</label> <select id="category" name="category" required class="w-full px-3 py-2 border border-main/30 rounded-md bg-transparent"> <option value="intermediate">Intermedio (Predeterminado)</option> <option value="beginner">Principiante</option> <option value="advanced">Avanzado</option> </select> <p class="text-xs text-muted mt-1">
Selecciona la categoría de dificultad para las canciones.
</p> </div> <div> <label for="files" class="block text-sm font-medium mb-1">
Seleccionar archivos (PDF, MSCZ, OGG)
</label> <input type="file" id="files" name="files" multiple accept=".pdf,.mscz,.ogg" required class="w-full px-3 py-2 border border-main/30 rounded-md bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-main file:text-white hover:file:bg-main/80"> <p class="text-xs text-muted mt-1">
Puedes seleccionar múltiples archivos. Los archivos con el mismo nombre se agruparán automáticamente.
</p> </div> <button type="submit" id="uploadBtn" class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
Subir Recursos
</button> </form> <div id="uploadMessage" class="mt-4 hidden"></div> </div> <!-- Gestión de recursos --> <div class="bg-main/5 p-6 rounded-lg border border-main/20 mt-8"> <h3 class="text-xl font-semibold mb-4">Gestión de Recursos Musicales</h3> <div id="resourceMessage" class="mb-4 hidden"></div> <!-- Eliminar canción --> <div class="mb-6"> <h4 class="font-medium mb-3">Eliminar Canción</h4> <div class="flex gap-3"> <select id="songSelector" class="flex-1 px-3 py-2 border border-main/30 rounded-md bg-transparent"> <option value="">Seleccionar canción...</option> <!-- Opciones cargadas dinámicamente --> </select> <button id="deleteSongBtn" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">
Eliminar
</button> </div> <p class="text-xs text-muted mt-2">
Selecciona una canción para eliminar todos sus archivos asociados.
</p> </div> <!-- Estado de categorías --> <div class="grid grid-cols-3 gap-4 text-center"> <div class="p-3 bg-green-50 rounded"> <div class="font-medium text-green-800">Canciones para Principiantes</div> <div class="text-sm text-green-600" id="beginner-count">0 canciones</div> </div> <div class="p-3 bg-blue-50 rounded"> <div class="font-medium text-blue-800">Canciones Intermedias</div> <div class="text-sm text-blue-600" id="intermediate-count">0 canciones</div> </div> <div class="p-3 bg-purple-50 rounded"> <div class="font-medium text-purple-800">Canciones Avanzadas</div> <div class="text-sm text-purple-600" id="advanced-count">0 canciones</div> </div> </div> </div> <!-- Lista de newsletters --> <div class="bg-main/5 p-6 rounded-lg border border-main/20"> <h3 class="text-xl font-semibold mb-4">Newsletters Recientes</h3> <div class="space-y-4"> ${newsletters.slice(0, 5).map((newsletter) => renderTemplate`<div class="border-b border-main/10 pb-4 last:border-b-0"> <div class="flex justify-between items-start mb-2"> <h4 class="font-medium">${newsletter.title}</h4> <div class="flex items-center space-x-2"> <span${addAttribute(`px-2 py-1 text-xs rounded ${newsletter.status === "sent" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`, "class")}> ${newsletter.status === "sent" ? "Enviado" : "Borrador"} </span> ${newsletter.status === "draft" && renderTemplate`<button class="send-newsletter-btn px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"${addAttribute(newsletter.id, "data-newsletter-id")}>
Enviar
</button>`} </div> </div> <p class="text-sm text-muted mb-2">${newsletter.content.substring(0, 100)}...</p> <p class="text-xs text-muted">Fecha: ${newsletter.date}</p> </div>`)} </div> </div> <!-- Gestión de suscriptores --> <div class="bg-main/5 p-6 rounded-lg border border-main/20 mt-8"> <h3 class="text-xl font-semibold mb-4">Gestión de Suscriptores</h3> <div id="subscriberMessage" class="mb-4 hidden"></div> <!-- Desactivar suscriptor --> <div class="mb-6"> <h4 class="font-medium mb-3">Desactivar Suscriptor</h4> <div class="flex gap-3"> <select id="subscriberSelector" class="flex-1 px-3 py-2 border border-main/30 rounded-md bg-transparent"> <option value="">Seleccionar suscriptor...</option> ${subscribers.filter((s) => s.active).map((subscriber) => renderTemplate`<option${addAttribute(subscriber.id, "value")}>${subscriber.name} (${subscriber.email})</option>`)} </select> <button id="deactivateSubscriberBtn" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">
Desactivar
</button> </div> <p class="text-xs text-muted mt-2">
Selecciona un suscriptor activo para desactivarlo. No podrá recibir más newsletters.
</p> </div> <!-- Estadísticas de suscriptores --> <div class="grid grid-cols-2 gap-4 text-center"> <div class="p-3 bg-green-50 rounded"> <div class="font-medium text-green-800">Suscriptores Activos</div> <div class="text-sm text-green-600" id="active-subscribers-count">${subscribers.filter((s) => s.active).length}</div> </div> <div class="p-3 bg-red-50 rounded"> <div class="font-medium text-red-800">Suscriptores Inactivos</div> <div class="text-sm text-red-600" id="inactive-subscribers-count">${subscribers.filter((s) => !s.active).length}</div> </div> </div> </div> </div> </article> ${renderScript($$result2, "/home/jimp/develop/astro/juanisidromejia/src/pages/admin.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/jimp/develop/astro/juanisidromejia/src/pages/admin.astro", void 0);

const $$file = "/home/jimp/develop/astro/juanisidromejia/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
