import fs from 'fs';
import path from 'path';

export const prerender = false;

export async function POST({ request }) {
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

        // Leer datos existentes
        const filePath = path.resolve('./src/data/admin/newsletter.json');
        let newsletterData = { newsletters: [], subscribers: [] };

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            newsletterData = JSON.parse(fileContent);
        } catch (error) {
            // Si no existe el archivo, usar datos por defecto
        }

        // Crear nuevo newsletter
        const newNewsletter = {
            id: Date.now().toString(),
            title,
            content,
            date: new Date().toISOString().split('T')[0],
            status: 'draft',
            recipients: 0
        };

        newsletterData.newsletters.unshift(newNewsletter);

        // Guardar datos actualizados
        fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));

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
        const filePath = path.resolve('./src/data/admin/newsletter.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const newsletterData = JSON.parse(fileContent);

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
