import type { APIContext } from 'astro';
import { getStore } from '@netlify/blobs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface Subscriber {
    id: string;
    email: string;
    name: string;
    subscribedAt: string;
    active: boolean;
}

interface Newsletter {
    id: string;
    title: string;
    content: string;
    date: string;
    status: 'draft' | 'sent';
    sentAt?: string;
}

export const prerender = false;

export async function POST({ request }: APIContext) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email es requerido' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Leer datos existentes usando Netlify Blobs
        const store = getStore('newsletter');
        let newsletterData: { newsletters: Newsletter[]; subscribers: Subscriber[] } = { newsletters: [], subscribers: [] };

        try {
            const data = await store.get('data');
            if (data) {
                newsletterData = JSON.parse(data);
            }
        } catch (error) {
            // Si no existe, usar datos por defecto
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

        // Guardar datos actualizados usando Netlify Blobs
        await store.set('data', JSON.stringify(newsletterData, null, 2));

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
