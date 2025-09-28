import type { APIContext } from 'astro';
import { getStore } from '@netlify/blobs';

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
    recipients?: number;
}

export const prerender = false;

export async function POST({ request }: APIContext) {
    try {
        const data = await request.formData();
        const title = data.get('title');
        const content = data.get('content');

        if (!title || !content) {
            return new Response(JSON.stringify({ error: 'Título y contenido son requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Leer datos existentes usando Netlify Blobs
        const store = getStore('newsletter');
        let newsletterData: { newsletters: Newsletter[]; subscribers: Subscriber[] } = { newsletters: [], subscribers: [] };

        try {
            const dataStr = await store.get('data');
            if (dataStr) {
                newsletterData = JSON.parse(dataStr);
            }
        } catch (error) {
            // Si no existe, usar datos por defecto
        }

        // Crear nuevo newsletter
        const newNewsletter: Newsletter = {
            id: Date.now().toString(),
            title: title as string,
            content: content as string,
            date: new Date().toISOString().split('T')[0],
            status: 'draft',
            recipients: 0
        };

        newsletterData.newsletters.unshift(newNewsletter);

        // Guardar datos actualizados usando Netlify Blobs
        await store.set('data', JSON.stringify(newsletterData, null, 2));

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Newsletter creado exitosamente',
                newsletter: newNewsletter
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error creating newsletter:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET() {
    try {
        const store = getStore('newsletter');
        let newsletterData: { newsletters: Newsletter[]; subscribers: Subscriber[] } = { newsletters: [], subscribers: [] };

        try {
            const data = await store.get('data');
            if (data) {
                newsletterData = JSON.parse(data);
            }
        } catch (error) {
            // usar default
        }

        return new Response(JSON.stringify(newsletterData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ newsletters: [], subscribers: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
