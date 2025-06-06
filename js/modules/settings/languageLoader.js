


/**
 * Purpose: Dynamic loading and caching of translation files
 * Key features: Async translation loading, file caching, error handling
 * Dependencies: adminConfig, constants, English fallback translations
 * Related helpers: adminUtils, dynamic imports, cache management
 * Function names: init, loadLanguage, loadTranslations, cacheTranslations, destroy
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:35 | File: js/modules/settings/languageLoader.js
 */

import { adminConfig, adminUtils } from '../../data/config/adminConfig.js';
import { englishTranslations } from '../../data/translations/en.js';
import { LANGUAGES } from '../../data/config/constants.js';

export class LanguageLoader {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.translationCache = new Map();
        this.loadingPromises = new Map();
        this.fallbackTranslations = englishTranslations;
        this.isInitialized = false;
    }
    
    async init() {
        console.log('📁 LanguageLoader initializing...');
        
        // Always load English first as fallback
        await this.loadEnglishTranslations();
        
        // Load admin configuration
        adminUtils.loadAdminConfig();
        
        this.isInitialized = true;
        console.log('✅ LanguageLoader initialized');
    }
    
    async loadEnglishTranslations() {
        try {
            // English is always available and loaded
            this.translationCache.set(LANGUAGES.ENGLISH, englishTranslations);
            console.log('✅ English translations loaded as fallback');
        } catch (error) {
            console.error('❌ Failed to load English translations:', error);
            throw error; // English is required
        }
    }
    
    async loadLanguage(languageCode) {
        try {
            // Check if already loading
            if (this.loadingPromises.has(languageCode)) {
                return await this.loadingPromises.get(languageCode);
            }
            
            // Check cache first
            if (this.translationCache.has(languageCode)) {
                return this.translationCache.get(languageCode);
            }
            
            // English is already loaded
            if (languageCode === LANGUAGES.ENGLISH) {
                return this.fallbackTranslations;
            }
            
            // Create loading promise
            const loadPromise = this.loadTranslations(languageCode);
            this.loadingPromises.set(languageCode, loadPromise);
            
            try {
                const translations = await loadPromise;
                this.cacheTranslations(languageCode, translations);
                this.loadingPromises.delete(languageCode);
                
                // Emit loaded event
                this.eventManager.emit('language:loaded', {
                    languageCode,
                    translationsCount: this.getTranslationCount(translations)
                });
                
                return translations;
                
            } catch (error) {
                this.loadingPromises.delete(languageCode);
                throw error;
            }
            
        } catch (error) {
            console.error(`❌ Failed to load language ${languageCode}:`, error);
            
            // Return English fallback on error
            return this.fallbackTranslations;
        }
    }
    
    async loadTranslations(languageCode) {
        try {
            console.log(`📥 Loading translations for: ${languageCode}`);
            
            let translationModule;
            
            switch (languageCode) {
                case LANGUAGES.FRENCH:
                    translationModule = await import('../../data/translations/fr.js');
                    return translationModule.frTranslations;
                    
                case LANGUAGES.GERMAN:
                    translationModule = await import('../../data/translations/de.js');
                    return translationModule.deTranslations;
                    
                case LANGUAGES.SPANISH:
                    translationModule = await import('../../data/translations/es.js');
                    return translationModule.esTranslations;
                    
                case LANGUAGES.ITALIAN:
                    translationModule = await import('../../data/translations/it.js');
                    return translationModule.itTranslations;
                    
                case LANGUAGES.PORTUGUESE:
                    translationModule = await import('../../data/translations/pt.js');
                    return translationModule.ptTranslations;
                    
                default:
                    throw new Error(`Unknown language code: ${languageCode}`);
            }
            
        } catch (error) {
            console.error(`❌ Failed to load translation file for ${languageCode}:`, error);
            
            // If translation file doesn't exist, disable the language in admin config
            if (error.message.includes('Failed to resolve module')) {
                console.warn(`📁 Translation file missing for ${languageCode}, disabling language`);
                adminUtils.toggleLanguage(this.getLanguageKey(languageCode), false);
            }
            
            throw error;
        }
    }
    
    cacheTranslations(languageCode, translations) {
        try {
            // Store in memory cache
            this.translationCache.set(languageCode, translations);
            
            // Optionally store in localStorage for persistence
            if (adminConfig.languages.loading.cacheTranslations) {
                const cacheKey = `lingoquest_translations_${languageCode}`;
                const cacheData = {
                    languageCode,
                    translations,
                    timestamp: Date.now(),
                    version: '1.0.0'
                };
                
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                } catch (storageError) {
                    console.warn('⚠️ Failed to cache translations in localStorage:', storageError);
                }
            }
            
            console.log(`💾 Translations cached for: ${languageCode}`);
            
        } catch (error) {
            console.error(`❌ Failed to cache translations for ${languageCode}:`, error);
        }
    }
    
    getTranslations(languageCode) {
        return this.translationCache.get(languageCode) || this.fallbackTranslations;
    }
    
    hasTranslations(languageCode) {
        return this.translationCache.has(languageCode);
    }
    
    clearCache(languageCode = null) {
        if (languageCode) {
            // Clear specific language
            this.translationCache.delete(languageCode);
            
            // Clear from localStorage
            const cacheKey = `lingoquest_translations_${languageCode}`;
            localStorage.removeItem(cacheKey);
            
            console.log(`🗑️ Cleared cache for: ${languageCode}`);
        } else {
            // Clear all except English
            for (const [lang] of this.translationCache) {
                if (lang !== LANGUAGES.ENGLISH) {
                    this.clearCache(lang);
                }
            }
            
            console.log('🗑️ Cleared all translation caches except English');
        }
    }
    
    preloadLanguages(languageCodes) {
        const loadPromises = languageCodes.map(async (languageCode) => {
            try {
                await this.loadLanguage(languageCode);
                console.log(`📥 Preloaded: ${languageCode}`);
            } catch (error) {
                console.warn(`⚠️ Failed to preload ${languageCode}:`, error);
            }
        });
        
        return Promise.allSettled(loadPromises);
    }
    
    getCacheInfo() {
        const info = {
            totalCached: this.translationCache.size,
            languages: Array.from(this.translationCache.keys()),
            memoryUsage: this.estimateMemoryUsage()
        };
        
        return info;
    }
    
    estimateMemoryUsage() {
        let totalSize = 0;
        
        for (const [lang, translations] of this.translationCache) {
            const jsonString = JSON.stringify(translations);
            totalSize += jsonString.length * 2; // Rough estimate (UTF-16)
        }
        
        return {
            bytes: totalSize,
            kb: Math.round(totalSize / 1024),
            mb: Math.round(totalSize / (1024 * 1024))
        };
    }
    
    getTranslationCount(translations) {
        let count = 0;
        
        const countKeys = (obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    count++;
                } else if (typeof obj[key] === 'object') {
                    countKeys(obj[key]);
                }
            }
        };
        
        countKeys(translations);
        return count;
    }
    
    getLanguageKey(languageCode) {
        const mapping = {
            [LANGUAGES.FRENCH]: 'french',
            [LANGUAGES.GERMAN]: 'german',
            [LANGUAGES.SPANISH]: 'spanish',
            [LANGUAGES.ITALIAN]: 'italian',
            [LANGUAGES.PORTUGUESE]: 'portuguese'
        };
        
        return mapping[languageCode] || languageCode;
    }
    
    async destroy() {
        console.log('🗑️ LanguageLoader destroying...');
        
        // Cancel any pending loads
        for (const [lang, promise] of this.loadingPromises) {
            try {
                await promise;
            } catch (error) {
                console.warn(`⚠️ Cancelled loading for ${lang}:`, error);
            }
        }
        
        this.loadingPromises.clear();
        
        // Clear caches except English
        this.clearCache();
        
        this.eventManager = null;
        this.isInitialized = false;
    }
}

export default LanguageLoader;


