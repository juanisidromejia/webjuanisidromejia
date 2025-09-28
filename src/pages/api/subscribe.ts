import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const prerender = false;

export async function POST({ request }) {
    try {
        let email;
        try {
            const data = await request.formData();
            email = data.get('email');
        } catch (e) {
            const text = await request.text();
            const params = new URLSearchParams(text);
            email = params.get('email');
        }

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email es requerido' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Leer datos existentes
        const filePath = path.resolve('./src/data/admin/newsletter.json');
        let newsletterData = { newsletters: [], subscribers: [] };

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            newsletterData = JSON.parse(fileContent);
        } catch (error) {
            // Si no existe el archivo, usar datos por defecto
        }

        // Verificar si el email ya está suscrito
        const existingSubscriber = newsletterData.subscribers.find((s) => s.email === email);
        if (existingSubscriber) {
            return new Response(JSON.stringify({ error: 'Este email ya está suscrito' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Crear nuevo suscriptor
        const newSubscriber = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0], // Usar parte antes de @ como nombre temporal
            subscribedAt: new Date().toISOString(),
            active: true
        };

        newsletterData.subscribers.push(newSubscriber);

        // Guardar datos actualizados
        fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Suscripción exitosa',
                subscriber: newSubscriber
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error subscribing:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
