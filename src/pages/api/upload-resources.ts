import { getStore } from '@netlify/blobs';
import type { APIContext } from 'astro';

export const prerender = false;

export async function POST({ request }: APIContext) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files');
        const category = (formData.get('category') as string) || 'intermediate';

        // Validar categoría
        const validCategories = ['beginner', 'intermediate', 'advanced'];
        if (!validCategories.includes(category)) {
            return new Response(JSON.stringify({ error: 'Categoría inválida' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!files || files.length === 0) {
            return new Response(JSON.stringify({ error: 'No se seleccionaron archivos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Cargar datos existentes desde Netlify Blobs
        const store = getStore('resources');
        let resourcesData: Record<string, Record<string, Record<string, string>>> = {
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
            // Usar datos por defecto si no existe
        }

        let uploadedCount = 0;
        const allowedExtensions = ['.pdf', '.mscz', '.ogg'];
        const errors = [];

        for (const file of files) {
            if (!(file instanceof File)) {
                errors.push('Tipo de archivo inválido');
                continue;
            }

            const fileName = file.name;
            const fileExt = '.' + fileName.split('.').pop()?.toLowerCase();

            // Validar extensión
            if (!allowedExtensions.includes(fileExt)) {
                errors.push(`Extensión no permitida para ${fileName}. Solo se permiten PDF, MSCZ y OGG.`);
                continue;
            }

            // Validar tamaño (máximo 50MB)
            if (file.size > 50 * 1024 * 1024) {
                errors.push(`Archivo ${fileName} es demasiado grande. Máximo 50MB.`);
                continue;
            }

            // Sanitizar nombre de archivo
            const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
            const baseName = sanitizedName.replace(/\.(pdf|mscz|ogg)$/i, '');
            const ext = fileExt.slice(1); // sin punto

            // Leer el contenido del archivo
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');

            // Guardar en la estructura de datos
            if (!resourcesData[category][baseName]) {
                resourcesData[category][baseName] = {};
            }
            resourcesData[category][baseName][ext] = base64;

            uploadedCount++;
        }

        if (uploadedCount === 0) {
            return new Response(
                JSON.stringify({
                    error: 'No se pudo subir ningún archivo',
                    details: errors
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Guardar datos actualizados en Netlify Blobs
        await store.set('data', JSON.stringify(resourcesData));

        const response = {
            success: true,
            message: `Se subieron ${uploadedCount} archivo(s) exitosamente`,
            uploadedCount,
            ...(errors.length > 0 && { warnings: errors })
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error uploading resources:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
