import { atom } from 'nanostores';

// Define supported languages
export type Language = 'es' | 'en' | 'ru';

// Create an atom for the current language, defaulting to 'es' or from localStorage
export const languageStore = atom<Language>((typeof localStorage !== 'undefined' && (localStorage.getItem('language') as Language)) || 'es');

// Function to set language and persist to localStorage
export const setLanguage = (lang: Language) => {
    languageStore.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', lang);
    }
};

// Getter for current language
export const getCurrentLanguage = () => languageStore.get();
