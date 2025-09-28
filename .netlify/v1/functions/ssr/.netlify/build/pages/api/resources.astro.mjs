import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET() {
  try {
    const partiturasDir = path.resolve("./public/partituras");
    const categories = ["beginner", "intermediate", "advanced"];
    const categorizedResources = {};
    categories.forEach((category) => {
      categorizedResources[category] = {};
    });
    categories.forEach((category) => {
      const categoryDir = path.join(partiturasDir, category);
      if (fs.existsSync(categoryDir)) {
        const files = fs.readdirSync(categoryDir).filter((file) => file.endsWith(".pdf") || file.endsWith(".mscz") || file.endsWith(".ogg"));
        files.forEach((file) => {
          const baseName = file.replace(/\.(pdf|mscz|ogg)$/i, "");
          const ext = file.split(".").pop()?.toLowerCase() || "";
          if (!categorizedResources[category][baseName]) {
            categorizedResources[category][baseName] = {};
          }
          categorizedResources[category][baseName][ext] = `/partituras/${category}/${file}`;
        });
        const sortedCategory = {};
        Object.keys(categorizedResources[category]).sort().forEach((key) => {
          sortedCategory[key] = categorizedResources[category][key];
        });
        categorizedResources[category] = sortedCategory;
      }
    });
    return new Response(JSON.stringify(categorizedResources), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error reading resources:", error);
    return new Response(JSON.stringify({ error: "Error al leer recursos" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
