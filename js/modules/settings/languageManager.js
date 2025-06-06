




// LingoQuest - Language Manager (Main Module)
// ES6 Module for language switching and internationalization
// Orchestrates language loading and translation management

import { LanguageLoader } from './languageLoader.js';
import { TranslationEngine } from './translationEngine.js';
import { LanguageValidator } from './languageValidator.js';
import { DOMTranslator } from './domTranslator.js';
import { STORAGE_KEYS, LANGUAGES } from '../../data/config/constants.js';

export class LanguageManager {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.currentLanguage = LANGUAGES.ENGLISH;
        this.isInitialized = false;
        
        // Initialize sub-modules
        this.loader = new LanguageLoader(eventManager);
        this.translator = new TranslationEngine();
        this.validator = new LanguageValidator();
        this.domTranslator = new DOMTranslator(this.translator);
    }
    
    async init() {
        console.log('🌐 LanguageManager initializing...');
        
        // Initialize all sub-modules
        await this.loader.init();
        await this.translator.init();
        
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
    
    async loadSavedLanguage() {
        try {
            const savedLanguage = this.storageManager.getItem(STORAGE_KEYS.LANGUAGE_PREFERENCE);
            
            if (savedLanguage && this.validator.isLanguageAvailable(savedLanguage)) {
                await this.setLanguage(savedLanguage, false);
            } else {
                this.currentLanguage = LANGUAGES.ENGLISH;
            }
        } catch (error) {
            console.warn('⚠️ Failed to load saved language, using English:', error);
            this.currentLanguage = LANGUAGES.ENGLISH;
        }
    }
    
    getAvailableLanguages() {
        return this.validator.getAvailableLanguages();
    }
    
    async setLanguage(languageCode, savePreference = true) {
        try {
            // Validate language availability
            if (!this.validator.isLanguageAvailable(languageCode)) {
                console.warn(`⚠️ Language ${languageCode} not available, using English`);
                languageCode = LANGUAGES.ENGLISH;
            }
            
            // Load translations if needed
            await this.loader.loadLanguage(languageCode);
            
            // Set current language
            const previousLanguage = this.currentLanguage;
            this.currentLanguage = languageCode;
            
            // Update translator
            this.translator.setCurrentLanguage(languageCode);
            
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
                translations: this.translator.getCurrentTranslations()
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
    
    async applyCurrentLanguage() {
        try {
            await this.domTranslator.applyLanguage(this.currentLanguage);
            console.log(`✅ Language applied to DOM: ${this.currentLanguage}`);
        } catch (error) {
            console.error('❌ Failed to apply language to DOM:', error);
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getCurrentLanguageName() {
        return this.validator.getLanguageName(this.currentLanguage);
    }
    
    translate(key, fallback = null) {
        return this.translator.translate(key, fallback);
    }
    
    // Utility method for components
    t(key, fallback = null) {
        return this.translate(key, fallback);
    }
    
    // Refresh language options when admin settings change
    refreshAvailableLanguages() {
        this.validator.refreshAvailableLanguages();
        
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
        if (this.validator.enableLanguage(languageCode)) {
            this.refreshAvailableLanguages();
            return true;
        }
        return false;
    }
    
    disableLanguage(languageCode) {
        if (this.validator.disableLanguage(languageCode)) {
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
        
        await this.loader.destroy();
        await this.translator.destroy();
        this.validator.destroy();
        this.domTranslator.destroy();
        
        this.eventManager = null;
        this.storageManager = null;
        this.isInitialized = false;
    }
}

export default LanguageManager;




