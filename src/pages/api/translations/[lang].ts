import { getTranslations } from '../../../utils/i18n';

export async function GET({ params }: { params: { lang: string } }) {
    const { lang } = params;

    try {
        const translations = await getTranslations(lang);
        return new Response(JSON.stringify(translations), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Translation not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
