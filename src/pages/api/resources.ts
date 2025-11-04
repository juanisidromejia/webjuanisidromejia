import { getStore } from '@netlify/blobs';

export const prerender = false;

export async function GET() {
    console.log('API /api/resources called');
    try {
        const store = getStore('resources');
        console.log('Blobs store initialized');
        let categorizedResources: Record<string, Record<string, Record<string, Record<string, string>>>> = {
            ensamble: {
                principiante: {},
                intermedio: {},
                avanzado: {}
            },
            solista: {
                principiante: {},
                intermedio: {},
                avanzado: {}
            }
        };

        try {
            console.log('Fetching data from blobs');
            const data = await store.get('data');
            if (data) {
                console.log('Data retrieved from blobs, parsing JSON');
                const resourcesData = JSON.parse(data);
                console.log('Resources data parsed, categories:', Object.keys(resourcesData));
                // Convertir base64 a data URLs
                for (const mainCategory in resourcesData) {
                    for (const subCategory in resourcesData[mainCategory]) {
                        for (const songName in resourcesData[mainCategory][subCategory]) {
                            for (const ext in resourcesData[mainCategory][subCategory][songName]) {
                                const base64 = resourcesData[mainCategory][subCategory][songName][ext];
                                const mimeType =
                                    ext === 'pdf'
                                        ? 'application/pdf'
                                        : ext === 'mscz'
                                          ? 'application/octet-stream'
                                          : ext === 'ogg'
                                            ? 'audio/ogg'
                                            : 'audio/mpeg';
                                if (!categorizedResources[mainCategory][subCategory][songName]) {
                                    categorizedResources[mainCategory][subCategory][songName] = {};
                                }
                                categorizedResources[mainCategory][subCategory][songName][ext] = `data:${mimeType};base64,${base64}`;
                            }
                        }
                        // Ordenar alfabéticamente subcategoría
                        const sortedSub: Record<string, Record<string, string>> = {};
                        Object.keys(categorizedResources[mainCategory][subCategory])
                            .sort()
                            .forEach((key) => {
                                sortedSub[key] = categorizedResources[mainCategory][subCategory][key];
                            });
                        categorizedResources[mainCategory][subCategory] = sortedSub;
                    }
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
