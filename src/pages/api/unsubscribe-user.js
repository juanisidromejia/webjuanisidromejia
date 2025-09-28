import fs from 'fs';
import path from 'path';

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

        const { userId, email } = await request.json();

        if (!userId && !email) {
            return new Response(JSON.stringify({ error: 'ID de usuario o email son requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Leer datos del newsletter
        const filePath = path.resolve('./src/data/admin/newsletter.json');
        let newsletterData = { newsletters: [], subscribers: [] };

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            newsletterData = JSON.parse(fileContent);
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Error al leer datos de suscriptores' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Buscar suscriptor
        let subscriberIndex = -1;
        if (userId) {
            subscriberIndex = newsletterData.subscribers.findIndex((s) => s.id === userId);
        } else if (email) {
            subscriberIndex = newsletterData.subscribers.findIndex((s) => s.email === email);
        }

        if (subscriberIndex === -1) {
            return new Response(JSON.stringify({ error: 'Suscriptor no encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const subscriber = newsletterData.subscribers[subscriberIndex];

        if (!subscriber.active) {
            return new Response(JSON.stringify({ error: 'El suscriptor ya está desactivado' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Desactivar suscriptor
        newsletterData.subscribers[subscriberIndex].active = false;

        // Guardar datos actualizados
        fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));

        return new Response(
            JSON.stringify({
                success: true,
                message: `Suscriptor "${subscriber.name}" (${subscriber.email}) ha sido desactivado`,
                subscriber: {
                    id: subscriber.id,
                    name: subscriber.name,
                    email: subscriber.email,
                    active: false
                }
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error unsubscribing user:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
