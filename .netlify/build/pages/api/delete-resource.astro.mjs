import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ request, cookies }) {
    try {
        // Verificar autenticación de admin
        const authCookie = cookies.get('admin_auth');
        if (!authCookie || authCookie.value !== 'true') {
            return new Response(JSON.stringify({ error: 'No autorizado' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { songName, category } = await request.json();

        if (!songName || !category) {
            return new Response(JSON.stringify({ error: 'Nombre de canción y categoría son requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validar categoría
        const validCategories = ['beginner', 'intermediate', 'advanced'];
        if (!validCategories.includes(category)) {
            return new Response(JSON.stringify({ error: 'Categoría inválida' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const partiturasDir = path.resolve('./public/partituras');
        const categoryDir = path.join(partiturasDir, category);

        if (!fs.existsSync(categoryDir)) {
            return new Response(JSON.stringify({ error: 'Categoría no encontrada' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Buscar y eliminar archivos relacionados con la canción
        const files = fs.readdirSync(categoryDir);
        const songFiles = files.filter((file) => file.startsWith(songName + '.') && (file.endsWith('.pdf') || file.endsWith('.mscz') || file.endsWith('.ogg')));

        if (songFiles.length === 0) {
            return new Response(JSON.stringify({ error: 'Canción no encontrada en esta categoría' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Eliminar archivos
        let deletedCount = 0;
        const errors = [];

        for (const file of songFiles) {
            try {
                const filePath = path.join(categoryDir, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            } catch (error) {
                errors.push(`Error eliminando ${file}: ${error.message}`);
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: `Se eliminaron ${deletedCount} archivo(s) de la canción "${songName}"`,
                deletedFiles: songFiles,
                ...(errors.length > 0 && { warnings: errors })
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error deleting resource:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
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
