import dotenv from 'dotenv';
export { renderers } from '../../renderers.mjs';

dotenv.config({ path: ".env.local" });
const prerender = false;
async function POST({ cookies }) {
  cookies.set("admin_auth", "", {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 0
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/admin/login"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
