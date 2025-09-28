import { getCollection } from 'astro:content';

export type TranslationKey =
    | 'home'
    | 'resources'
    | 'blog'
    | 'tags'
    | 'about'
    | 'contact'
    | 'terms'
    | 'hero_title'
    | 'hero_subtitle'
    | 'hero_text'
    | 'projects_title'
    | 'projects_description'
    | 'view_all_projects'
    | 'blog_title'
    | 'read_more'
    | 'subscribe_title'
    | 'subscribe_text'
    | 'subscribe_button'
    | 'scores_title'
    | 'scores_description'
    | 'contact_title'
    | 'contact_subtitle'
    | 'contact_text'
    | 'about_title'
    | 'about_subtitle'
    | 'about_text'
    | 'view_next';

export type Translations = Record<TranslationKey, string>;

export async function getTranslations(locale: string): Promise<Translations> {
    const translations = await getCollection('translations');
    const translationFile = translations.find((t) => t.id === locale);

    if (!translationFile) {
        throw new Error(`Translation file for ${locale} not found`);
    }

    // Get the raw content and remove frontmatter
    const rawContent = translationFile.body || '';
    const content = rawContent.replace(/^---[\s\S]*?---\n/, ''); // Remove frontmatter

    const lines = content.split('\n');
    const translationsObj: Partial<Translations> = {};

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.includes(':')) {
            const [key, ...valueParts] = trimmedLine.split(':');
            const value = valueParts.join(':').trim();
            if (value) {
                const cleanKey = key.trim();
                // Use the clean key without section prefix for simplicity
                const finalKey = cleanKey;
                // Remove quotes if present
                const cleanValue = value.replace(/^["']|["']$/g, '');
                translationsObj[finalKey as TranslationKey] = cleanValue;
            }
        }
    }

    return translationsObj as Translations;
}

export function t(key: TranslationKey, translations: Translations): string {
    return translations[key] || key;
}
