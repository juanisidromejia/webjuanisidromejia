import 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
export { renderers } from '../../renderers.mjs';

dotenv.config({ path: ".env.local" });
const prerender = false;
async function POST({ request }) {
  try {
    const { newsletterId } = await request.json();
    const filePath = path.resolve("./src/data/admin/newsletter.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const newsletterData = JSON.parse(fileContent);
    const newsletter = newsletterData.newsletters.find((n) => n.id === newsletterId);
    if (!newsletter) {
      return new Response(JSON.stringify({ error: "Newsletter not found" }), { status: 404 });
    }
    if (newsletter.status === "sent") {
      return new Response(JSON.stringify({ error: "Newsletter already sent" }), { status: 400 });
    }
    console.log(
      "GMAIL_APP_USER:",
      process.env.GMAIL_APP_USER,
      "GMAIL_APP_PASSWORD:",
      process.env.GMAIL_APP_PASSWORD ? "set (length: " + process.env.GMAIL_APP_PASSWORD.length + ")" : "not set"
    );
    const activeSubscribers = newsletterData.subscribers.filter((s) => s.active);
    console.log(`Simulating email send to ${activeSubscribers.length} subscribers:`);
    activeSubscribers.forEach((subscriber) => {
      console.log(`- To: ${subscriber.email}, Subject: ${newsletter.title}`);
    });
    newsletter.status = "sent";
    newsletter.sentAt = (/* @__PURE__ */ new Date()).toISOString();
    fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));
    return new Response(JSON.stringify({ success: true, sentCount: activeSubscribers.length }), { status: 200 });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return new Response(JSON.stringify({ error: "Failed to send newsletter" }), { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
