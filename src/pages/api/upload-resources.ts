import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import type { APIContext } from 'astro';

const writeFileAsync = promisify(fs.writeFile);

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

        const partiturasDir = path.resolve('./public/partituras');
        const categoryDir = path.join(partiturasDir, category);

        // Asegurar que el directorio de categoría existe
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
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
            const fileExt = path.extname(fileName).toLowerCase();

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
            const filePath = path.join(categoryDir, sanitizedName);

            // Leer el contenido del archivo
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Guardar archivo
            await writeFileAsync(filePath, buffer as any);
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
