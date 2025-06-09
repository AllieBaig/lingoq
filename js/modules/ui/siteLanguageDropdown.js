import { LANGUAGES } from '../../data/config/constants.js';
import { englishTranslations } from '../../data/translations/en.js';

export class SiteLanguageDropdown {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.containerId = 'site-language-container';
        this.select = null;
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        this.createSelect(container);
        this.attachEvents();
    }

    createSelect(container) {
        this.select = document.createElement('select');
        this.select.id = 'site-language-select';
        this.select.className = 'select-input';
        const names = englishTranslations.languages || {};

        Object.values(LANGUAGES).forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = names[code] || code;
            this.select.appendChild(option);
        });

        const current = this.languageManager?.getCurrentLanguage?.() || LANGUAGES.ENGLISH;
        this.select.value = current;
        container.appendChild(this.select);
    }

    attachEvents() {
        if (!this.select) return;
        this.select.addEventListener('change', async (e) => {
            const lang = e.target.value;
            if (this.languageManager && typeof this.languageManager.setLanguage === 'function') {
                await this.languageManager.setLanguage(lang);
            }
        });

        document.addEventListener('language:changed', (e) => {
            if (this.select && e.detail?.currentLanguage) {
                this.select.value = e.detail.currentLanguage;
            }
        });
    }
}

// Auto-init when DOM is ready if global app instance is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = window.LingoQuest;
        const manager = app?.getModule?.('languageManager');
        if (manager) {
            new SiteLanguageDropdown(manager);
        }
    });
} else {
    const app = window.LingoQuest;
    const manager = app?.getModule?.('languageManager');
    if (manager) {
        new SiteLanguageDropdown(manager);
    }
}

export default SiteLanguageDropdown;
