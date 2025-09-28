import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
export { renderers } from '../../renderers.mjs';

dotenv.config({ path: ".env.local" });
const prerender = false;
async function POST({ request }) {
  try {
    let email;
    try {
      const data = await request.formData();
      email = data.get("email");
    } catch (e) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      email = params.get("email");
    }
    if (!email) {
      return new Response(JSON.stringify({ error: "Email es requerido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const filePath = path.resolve("./src/data/admin/newsletter.json");
    let newsletterData = { newsletters: [], subscribers: [] };
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      newsletterData = JSON.parse(fileContent);
    } catch (error) {
    }
    const existingSubscriber = newsletterData.subscribers.find((s) => s.email === email);
    if (existingSubscriber) {
      return new Response(JSON.stringify({ error: "Este email ya está suscrito" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
      // Usar parte antes de @ como nombre temporal
      subscribedAt: (/* @__PURE__ */ new Date()).toISOString(),
      active: true
    };
    newsletterData.subscribers.push(newSubscriber);
    fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));
    return new Response(
      JSON.stringify({
        success: true,
        message: "Suscripción exitosa",
        subscriber: newSubscriber
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error subscribing:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
