import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const prerender = false;

export async function POST({ request }) {
    try {
        const { newsletterId } = await request.json();

        // Leer datos del newsletter
        const filePath = path.resolve('./src/data/admin/newsletter.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const newsletterData = JSON.parse(fileContent);

        const newsletter = newsletterData.newsletters.find((n) => n.id === newsletterId);
        if (!newsletter) {
            return new Response(JSON.stringify({ error: 'Newsletter not found' }), { status: 404 });
        }

        if (newsletter.status === 'sent') {
            return new Response(JSON.stringify({ error: 'Newsletter already sent' }), { status: 400 });
        }

        // Configurar transporter con app password
        console.log(
            'GMAIL_APP_USER:',
            process.env.GMAIL_APP_USER,
            'GMAIL_APP_PASSWORD:',
            process.env.GMAIL_APP_PASSWORD ? 'set (length: ' + process.env.GMAIL_APP_PASSWORD.length + ')' : 'not set'
        );

        // Obtener suscriptores activos
        const activeSubscribers = newsletterData.subscribers.filter((s) => s.active);

        // Simular envío de emails (para desarrollo)
        console.log(`Simulating email send to ${activeSubscribers.length} subscribers:`);
        activeSubscribers.forEach((subscriber) => {
            console.log(`- To: ${subscriber.email}, Subject: ${newsletter.title}`);
        });

        // En desarrollo, simulamos el envío exitoso
        // En producción, descomentar el código real de envío
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_APP_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Enviar emails
        const sendPromises = activeSubscribers.map((subscriber) => {
            return transporter.sendMail({
                from: `"Juan Isidro Mejía" <${process.env.GMAIL_APP_USER}>`,
                to: subscriber.email,
                subject: newsletter.title,
                html: newsletter.content
            });
        });

        await Promise.all(sendPromises);
        */

        // Actualizar status del newsletter
        newsletter.status = 'sent';
        newsletter.sentAt = new Date().toISOString();

        // Guardar cambios
        fs.writeFileSync(filePath, JSON.stringify(newsletterData, null, 2));

        return new Response(JSON.stringify({ success: true, sentCount: activeSubscribers.length }), { status: 200 });
    } catch (error) {
        console.error('Error sending newsletter:', error);
        return new Response(JSON.stringify({ error: 'Failed to send newsletter' }), { status: 500 });
    }
}
