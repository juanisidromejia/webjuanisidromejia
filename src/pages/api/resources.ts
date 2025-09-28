import fs from 'fs';
import path from 'path';

export const prerender = false;

export async function GET() {
    try {
        const partiturasDir = path.resolve('./public/partituras');
        const categories = ['beginner', 'intermediate', 'advanced'] as const;
        const categorizedResources: Record<string, Record<string, Record<string, string>>> = {};

        // Inicializar categorías
        categories.forEach((category) => {
            categorizedResources[category] = {};
        });

        // Leer archivos de cada categoría
        categories.forEach((category) => {
            const categoryDir = path.join(partiturasDir, category);

            if (fs.existsSync(categoryDir)) {
                const files = fs.readdirSync(categoryDir).filter((file) => file.endsWith('.pdf') || file.endsWith('.mscz') || file.endsWith('.ogg'));

                files.forEach((file: string) => {
                    const baseName = file.replace(/\.(pdf|mscz|ogg)$/i, '');
                    const ext = file.split('.').pop()?.toLowerCase() || '';

                    if (!categorizedResources[category][baseName]) {
                        categorizedResources[category][baseName] = {} as Record<string, string>;
                    }

                    // Crear URL relativa para el archivo
                    categorizedResources[category][baseName][ext] = `/partituras/${category}/${file}`;
                });

                // Ordenar alfabéticamente dentro de cada categoría
                const sortedCategory: Record<string, Record<string, string>> = {};
                Object.keys(categorizedResources[category])
                    .sort()
                    .forEach((key) => {
                        sortedCategory[key] = categorizedResources[category][key];
                    });
                categorizedResources[category] = sortedCategory;
            }
        });

        return new Response(JSON.stringify(categorizedResources), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error reading resources:', error);
        return new Response(JSON.stringify({ error: 'Error al leer recursos' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
