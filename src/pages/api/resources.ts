import { getStore } from '@netlify/blobs';

export const prerender = false;

export async function GET() {
    try {
        const store = getStore('resources');
        let categorizedResources: Record<string, Record<string, Record<string, string>>> = {
            beginner: {},
            intermediate: {},
            advanced: {}
        };

        try {
            const data = await store.get('data');
            if (data) {
                const resourcesData = JSON.parse(data);
                // Convertir base64 a data URLs
                for (const category in resourcesData) {
                    for (const songName in resourcesData[category]) {
                        for (const ext in resourcesData[category][songName]) {
                            const base64 = resourcesData[category][songName][ext];
                            const mimeType = ext === 'pdf' ? 'application/pdf' : ext === 'mscz' ? 'application/octet-stream' : 'audio/ogg';
                            categorizedResources[category][songName] = categorizedResources[category][songName] || {};
                            categorizedResources[category][songName][ext] = `data:${mimeType};base64,${base64}`;
                        }
                    }
                    // Ordenar alfabéticamente
                    const sortedCategory: Record<string, Record<string, string>> = {};
                    Object.keys(categorizedResources[category])
                        .sort()
                        .forEach((key) => {
                            sortedCategory[key] = categorizedResources[category][key];
                        });
                    categorizedResources[category] = sortedCategory;
                }
            }
        } catch (error) {
            console.error('Error reading from blobs:', error);
        }

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
