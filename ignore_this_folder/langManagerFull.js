




// LingoQuest - Language Manager (Updated)
// ES6 Module for language switching and internationalization
// Uses English as fallback and respects admin language settings

import { adminConfig, adminUtils } from '../../data/config/adminConfig.js';
import { enTranslations } from '../../data/translations/en.js';
import { STORAGE_KEYS, LANGUAGES } from '../../data/config/constants.js';

export class LanguageManager {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.currentLanguage = LANGUAGES.ENGLISH; // Default to English
        this.translations = new Map();
        this.fallbackTranslations = enTranslations; // Always use English as fallback
        this.isInitialized = false;
        
        // Load admin configuration
        adminUtils.loadAdminConfig();
    }
    
    async init() {
        console.log('🌐 LanguageManager initializing...');
        
        // Always load English first as fallback
        await this.loadEnglishTranslations();
        
        // Load saved language preference
        await this.loadSavedLanguage();
        
        // Apply current language to DOM
        await this.applyCurrentLanguage();
        
        this.isInitialized = true;
        console.log('✅ LanguageManager initialized with language:', this.currentLanguage);
        
        // Emit ready event
        this.eventManager.emit('language:ready', {
            currentLanguage: this.currentLanguage,
            availableLanguages: this.getAvailableLanguages()
        });
    }
    
    async loadEnglishTranslations() {
        try {
            // English is always available and loaded
            this.translations.set(LANGUAGES.ENGLISH, enTranslations);
            console.log('✅ English translations loaded as fallback');
        } catch (error) {
            console.error('❌ Failed to load English translations:', error);
            throw error; // English is required
        }
    }
    
    async loadSavedLanguage() {
        try {
            const savedLanguage = this.storageManager.getItem(STORAGE_KEYS.LANGUAGE_PREFERENCE);
            
            if (savedLanguage && this.isLanguageAvailable(savedLanguage)) {
                await this.setLanguage(savedLanguage, false); // Don't save again
            } else {
                // Use English as default
                this.currentLanguage = LANGUAGES.ENGLISH;
            }
        } catch (error) {
            console.warn('⚠️ Failed to load saved language, using English:', error);
            this.currentLanguage = LANGUAGES.ENGLISH;
        }
    }
    
    getAvailableLanguages() {
        const available = [
            {
                code: LANGUAGES.ENGLISH,
                name: 'English',
                enabled: true,
                isCore: true
            }
        ];
        
        // Add optional languages if enabled in admin config
        const enabledLanguages = adminUtils.getEnabledLanguages();
        
        enabledLanguages.forEach(lang => {
            if (lang.code !== LANGUAGES.ENGLISH) {
                available.push({
                    code: lang.code,
                    name: lang.name,
                    enabled: true,
                    isCore: false
                });
            }
        });
        
        return available;
    }
    
    isLanguageAvailable(languageCode) {
        // English is always available
        if (languageCode === LANGUAGES.ENGLISH) {
            return true;
        }
        
        // Check if language is enabled in admin config
        const enabledLanguages = adminUtils.getEnabledLanguages();
        return enabledLanguages.some(lang => lang.code === languageCode);
    }
    
    async setLanguage(languageCode, savePreference = true) {
        try {
            // Validate language availability
            if (!this.isLanguageAvailable(languageCode)) {
                console.warn(`⚠️ Language ${languageCode} not available, using English`);
                languageCode = LANGUAGES.ENGLISH;
            }
            
            // Load translations if not already loaded
            if (!this.translations.has(languageCode) && languageCode !== LANGUAGES.ENGLISH) {
                await this.loadTranslations(languageCode);
            }
            
            // Set current language
            const previousLanguage = this.currentLanguage;
            this.currentLanguage = languageCode;
            
            // Apply to DOM
            await this.applyCurrentLanguage();
            
            // Save preference if requested
            if (savePreference) {
                this.storageManager.setItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, languageCode);
            }
            
            // Emit language change event
            this.eventManager.emit('language:changed', {
                previousLanguage,
                currentLanguage: this.currentLanguage,
                translations: this.getCurrentTranslations()
            });
            
            console.log(`✅ Language changed to: ${languageCode}`);
            return true;
            
        } catch (error) {
            console.error(`❌ Failed to set language to ${languageCode}:`, error);
            
            // Fallback to English on error
            if (languageCode !== LANGUAGES.ENGLISH) {
                return await this.setLanguage(LANGUAGES.ENGLISH, savePreference);
            }
            
            return false;
        }
    }
    
    async loadTranslations(languageCode) {
        try {
            console.log(`🔄 Loading translations for: ${languageCode}`);
            
            // Dynamic import based on language code
            let translationModule;
            
            switch (languageCode) {
                case LANGUAGES.FRENCH:
                    translationModule = await import('../../data/translations/fr.js');
                    this.translations.set(languageCode, translationModule.frTranslations);
                    break;
                    
                case LANGUAGES.GERMAN:
                    translationModule = await import('../../data/translations/de.js');
                    this.translations.set(languageCode, translationModule.deTranslations);
                    break;
                    
                case LANGUAGES.SPANISH:
                    translationModule = await import('../../data/translations/es.js');
                    this.translations.set(languageCode, translationModule.esTranslations);
                    break;
                    
                case LANGUAGES.ITALIAN:
                    translationModule = await import('../../data/translations/it.js');
                    this.translations.set(languageCode, translationModule.itTranslations);
                    break;
                    
                case LANGUAGES.PORTUGUESE:
                    translationModule = await import('../../data/translations/pt.js');
                    this.translations.set(languageCode, translationModule.ptTranslations);
                    break;
                    
                default:
                    throw new Error(`Unknown language code: ${languageCode}`);
            }
            
            console.log(`✅ Translations loaded for: ${languageCode}`);
            
        } catch (error) {
            console.error(`❌ Failed to load translations for ${languageCode}:`, error);
            
            // If translation file doesn't exist, disable the language in admin config
            if (error.message.includes('Failed to resolve module')) {
                console.warn(`📁 Translation file missing for ${languageCode}, disabling language`);
                adminUtils.toggleLanguage(languageCode, false);
            }
            
            throw error;
        }
    }
    
    getCurrentTranslations() {
        return this.translations.get(this.currentLanguage) || this.fallbackTranslations;
    }
    
    translate(key, fallback = null) {
        try {
            const translations = this.getCurrentTranslations();
            const keys = key.split('.');
            let value = translations;
            
            // Navigate through nested object
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
            
            // If translation found, return it
            if (value !== undefined && typeof value === 'string') {
                return value;
            }
            
            // Try fallback to English if not already using English
            if (this.currentLanguage !== LANGUAGES.ENGLISH) {
                let fallbackValue = this.fallbackTranslations;
                for (const k of keys) {
                    fallbackValue = fallbackValue?.[k];
                    if (fallbackValue === undefined) break;
                }
                
                if (fallbackValue !== undefined && typeof fallbackValue === 'string') {
                    return fallbackValue;
                }
            }
            
            // Return provided fallback or the key itself
            return fallback || key;
            
        } catch (error) {
            console.warn(`⚠️ Translation error for key "${key}":`, error);
            return fallback || key;
        }
    }
    
    async applyCurrentLanguage() {
        try {
            // Update document language attribute
            document.documentElement.lang = this.currentLanguage;
            
            // Update all elements with data-i18n attributes
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translatedText = this.translate(key);
                
                // Update text content
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For input elements, update placeholder
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translatedText;
                    } else {
                        element.value = translatedText;
                    }
                } else {
                    element.textContent = translatedText;
                }
            });
            
            // Update aria-label attributes
            const ariaElements = document.querySelectorAll('[data-i18n-aria]');
            ariaElements.forEach(element => {
                const key = element.getAttribute('data-i18n-aria');
                element.setAttribute('aria-label', this.translate(key));
            });
            
            // Update title attributes
            const titleElements = document.querySelectorAll('[data-i18n-title]');
            titleElements.forEach(element => {
                const key = element.getAttribute('data-i18n-title');
                element.title = this.translate(key);
            });
            
            console.log(`✅ Language applied to DOM: ${this.currentLanguage}`);
            
        } catch (error) {
            console.error('❌ Failed to apply language to DOM:', error);
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getCurrentLanguageName() {
        const available = this.getAvailableLanguages();
        const current = available.find(lang => lang.code === this.currentLanguage);
        return current?.name || 'English';
    }
    
    // Utility method for components to get translations
    t(key, fallback = null) {
        return this.translate(key, fallback);
    }
    
    // Method to refresh language options when admin settings change
    refreshAvailableLanguages() {
        const event = new CustomEvent('languageOptionsChanged', {
            detail: {
                availableLanguages: this.getAvailableLanguages(),
                currentLanguage: this.currentLanguage
            }
        });
        
        document.dispatchEvent(event);
        this.eventManager.emit('language:optionsChanged', this.getAvailableLanguages());
    }
    
    // Admin methods
    enableLanguage(languageCode) {
        if (adminUtils.toggleLanguage(languageCode, true)) {
            this.refreshAvailableLanguages();
            return true;
        }
        return false;
    }
    
    disableLanguage(languageCode) {
        // Can't disable English (core language)
        if (languageCode === LANGUAGES.ENGLISH) {
            console.warn('⚠️ Cannot disable English language (core language)');
            return false;
        }
        
        if (adminUtils.toggleLanguage(languageCode, false)) {
            // If currently using this language, switch to English
            if (this.currentLanguage === languageCode) {
                this.setLanguage(LANGUAGES.ENGLISH);
            }
            
            this.refreshAvailableLanguages();
            return true;
        }
        return false;
    }
    
    async destroy() {
        console.log('🗑️ LanguageManager destroying...');
        
        // Clear translations cache
        this.translations.clear();
        
        // Remove event listeners if any
        this.eventManager = null;
        this.storageManager = null;
        
        this.isInitialized = false;
    }
}

export default LanguageManager;







