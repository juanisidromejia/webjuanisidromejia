import { atom } from 'nanostores';

// Define supported languages
export type Language = 'es' | 'en' | 'ru';

// Create an atom for the current language, defaulting to 'es'
// Note: localStorage access is handled in BaseLayout.astro to avoid SSR issues
export const languageStore = atom<Language>('es');

// Function to set language and persist to localStorage
export const setLanguage = (lang: Language) => {
    languageStore.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', lang);
    }
};

// Getter for current language
export const getCurrentLanguage = () => languageStore.get();
