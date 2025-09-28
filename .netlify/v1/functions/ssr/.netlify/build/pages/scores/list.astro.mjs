import { c as createComponent, m as maybeRenderHead, v as unescapeHTML, b as renderTemplate } from '../../chunks/astro/server_C4Ew1Baj.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const html = () => "<ul>\n<li>\n<p><strong>Título</strong>: Andarele</p>\n<ul>\n<li><strong>Descripción</strong>: Canción afroecuatoriana.</li>\n<li><strong>Enlaces</strong>:\n<ul>\n<li><a href=\"ruta-del-archivo-1.pdf\">Descargar PDF</a></li>\n<li><a href=\"Andarele.mscz\">Descargar MuseScore</a></li>\n</ul>\n</li>\n<li><strong>MuseScore Embed</strong>:\n<code>&#x3C;iframe src=\"https://musescore.com/iframe-url-1\" width=\"100%\" height=\"200\">&#x3C;/iframe></code></li>\n</ul>\n</li>\n<li>\n<p><strong>Título</strong>: Canción 2</p>\n<ul>\n<li><strong>Descripción</strong>: Una breve descripción de la canción 2.</li>\n<li><strong>Enlaces</strong>:\n<ul>\n<li><a href=\"ruta-del-archivo-2.pdf\">Descargar PDF</a></li>\n<li><a href=\"ruta-del-archivo-2.mscz\">Descargar MuseScore</a></li>\n</ul>\n</li>\n<li><strong>MuseScore Embed</strong>:\n`<iframe src=\"https://musescore.com/iframe-url-2\" width=\"100%\" height=\"200\"></iframe></li>\n</ul>\n</li>\n</ul>";

				const frontmatter = {};
				const file = "/home/jimp/develop/astro/juanisidromejia/src/pages/scores/list.md";
				const url = "/scores/list";
				function rawContent() {
					return "   \n   \n\n- **Título**: Andarele\n\n  - **Descripción**: Canción afroecuatoriana.\n  - **Enlaces**:\n    - [Descargar PDF](ruta-del-archivo-1.pdf)\n    - [Descargar MuseScore](Andarele.mscz)\n  - **MuseScore Embed**:\n    `<iframe src=\"https://musescore.com/iframe-url-1\" width=\"100%\" height=\"200\"></iframe>`\n\n- **Título**: Canción 2\n  - **Descripción**: Una breve descripción de la canción 2.\n  - **Enlaces**:\n    - [Descargar PDF](ruta-del-archivo-2.pdf)\n    - [Descargar MuseScore](ruta-del-archivo-2.mscz)\n  - **MuseScore Embed**:\n    `<iframe src=\"https://musescore.com/iframe-url-2\" width=\"100%\" height=\"200\"></iframe>\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
