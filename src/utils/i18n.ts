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
    | 'view_next'
    | 'read_post'
    | 'view_tag_archive'
    | 'all_tags_title'
    | 'all_tags_description'
    | 'posts_tagged'
    | 'tools_title'
    | 'tools_description'
    | 'metronome_title'
    | 'metronome_bpm'
    | 'metronome_play'
    | 'metronome_stop'
    | 'metronome_time_signature'
    | 'metronome_pattern'
    | 'metronome_volume'
    | 'metronome_ramp'
    | 'metronome_ramp_from'
    | 'metronome_ramp_to'
    | 'metronome_ramp_duration'
    | 'diagram_editor_title'
    | 'diagram_editor_new'
    | 'diagram_editor_save'
    | 'diagram_editor_clear'
    | 'diagram_editor_credits'
    | 'diagram_editor_fret'
    | 'diagram_editor_fret_number'
    | 'diagram_editor_tuning'
    | 'diagram_editor_chord_name'
    | 'ear_training_title'
    | 'ear_training_start'
    | 'ear_training_listen'
    | 'ear_training_check'
    | 'ear_training_correct'
    | 'ear_training_try_again'
    | 'tuner_title'
    | 'tuner_note'
    | 'tuner_frequency'
    | 'tuner_flat'
    | 'tuner_sharp'
    | 'tuner_in_tune'
    | 'tuner_permission_needed'
    | 'chord_dictionary_title'
    | 'chord_dictionary_search'
    | 'chord_dictionary_root'
    | 'chord_dictionary_type'
    | 'music_reader_title'
    | 'music_reader_start'
    | 'music_reader_next'
    | 'music_reader_show';

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
