import dotenv from 'dotenv';
export { renderers } from '../../renderers.mjs';

dotenv.config({ path: ".env.local" });
const prerender = false;
async function POST({ request, cookies }) {
  try {
    const data = await request.formData();
    const password = data.get("password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/admin/login?error=1"
        }
      });
    }
    cookies.set("admin_auth", "true", {
      path: "/",
      httpOnly: true,
      secure: false,
      // Set to true in production with HTTPS
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin/login?error=1"
      }
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
