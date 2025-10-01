import { getStore } from '@netlify/blobs';

export const prerender = false;

export async function GET() {
    console.log('API /api/resources called');
    try {
        const store = getStore('resources');
        console.log('Blobs store initialized');
        let categorizedResources: Record<string, Record<string, Record<string, string>>> = {
            beginner: {},
            intermediate: {},
            advanced: {}
        };

        try {
            console.log('Fetching data from blobs');
            const data = await store.get('data');
            if (data) {
                console.log('Data retrieved from blobs, parsing JSON');
                const resourcesData = JSON.parse(data);
                console.log('Resources data parsed, categories:', Object.keys(resourcesData));
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
            } else {
                console.log('No data in blobs, returning empty resources');
            }
        } catch (error) {
            console.error('Error reading from blobs:', error);
        }

        console.log('Returning categorized resources');
        return new Response(JSON.stringify(categorizedResources), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response(JSON.stringify({ error: 'Error al leer recursos' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
