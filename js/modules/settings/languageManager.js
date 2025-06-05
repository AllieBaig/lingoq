
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = ['en', 'fr', 'de', 'es', 'it', 'pt'];
        this.isInitialized = false;
    }

    async init() {
        // Load default English translations
        await this.loadTranslations('en');
        this.isInitialized = true;
    }

    async loadTranslations(language) {
        try {
            // For now, use basic translations
            this.translations[language] = {
                'app.title': 'LingoQuest',
                'home.welcome': 'Welcome to LingoQuest',
                'home.subtitle': 'Choose your adventure!',
                'gameModes.classic': 'Classic Mode',
                'gameModes.hollybolly': 'HollyBolly Mode',
                'buttons.start': 'Start Game',
                'buttons.howToPlay': 'How to Play',
                'loading.text': 'Loading...',
                'settings.title': 'Settings'
            };
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    async setLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
            if (!this.translations[language]) {
                await this.loadTranslations(language);
            }

            this.currentLanguage = language;
            this.applyTranslations();
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            element.textContent = translation;
        });
    }

    getTranslation(key) {
        const translations = this.translations[this.currentLanguage] || this.translations['en'] || {};
        return translations[key] || key;
    }
}

export default LanguageManager;

