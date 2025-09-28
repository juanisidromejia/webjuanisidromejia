import { getStore } from '@netlify/blobs';

export const prerender = false;

export async function POST({ request, cookies }) {
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

        // Cargar datos desde Netlify Blobs
        const store = getStore('resources');
        let resourcesData = {
            beginner: {},
            intermediate: {},
            advanced: {}
        };

        try {
            const data = await store.get('data');
            if (data) {
                resourcesData = JSON.parse(data);
            }
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Error al leer datos de recursos' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!resourcesData[category] || !resourcesData[category][songName]) {
            return new Response(JSON.stringify({ error: 'Canción no encontrada en esta categoría' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Eliminar la canción
        delete resourcesData[category][songName];

        // Guardar datos actualizados
        await store.set('data', JSON.stringify(resourcesData));

        return new Response(
            JSON.stringify({
                success: true,
                message: `Canción "${songName}" eliminada exitosamente de la categoría ${category}`
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
