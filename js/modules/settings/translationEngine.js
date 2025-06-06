




/**
 * Purpose: Core translation engine for text rendering and key resolution
 * Key features: Nested key navigation, fallback handling, pluralization, interpolation
 * Dependencies: English fallback translations, language cache system
 * Related helpers: String interpolation, nested object traversal, cache management
 * Function names: translate, interpolate, handlePluralization, navigateKeys, setCurrentLanguage
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:50 | File: js/modules/settings/translationEngine.js
 */

import { enTranslations } from '../../data/translations/en.js';
import { LANGUAGES } from '../../data/config/constants.js';

export class TranslationEngine {
    constructor() {
        this.currentLanguage = LANGUAGES.ENGLISH;
        this.translations = new Map();
        this.fallbackTranslations = enTranslations;
        this.cache = new Map();
        this.missingKeys = new Set();
        this.isInitialized = false;
    }
    
    async init() {
        console.log('🔤 TranslationEngine initializing...');
        
        // Always set English as fallback
        this.translations.set(LANGUAGES.ENGLISH, enTranslations);
        
        // Clear caches
        this.clearCache();
        
        this.isInitialized = true;
        console.log('✅ TranslationEngine initialized');
    }
    
    setCurrentLanguage(languageCode) {
        if (this.currentLanguage !== languageCode) {
            this.currentLanguage = languageCode;
            this.clearCache(); // Clear cache when language changes
            console.log(`🔤 Translation engine language set to: ${languageCode}`);
        }
    }
    
    setTranslations(languageCode, translations) {
        this.translations.set(languageCode, translations);
        console.log(`📥 Translations set for: ${languageCode}`);
    }
    
    getCurrentTranslations() {
        return this.translations.get(this.currentLanguage) || this.fallbackTranslations;
    }
    
    translate(key, options = {}) {
        try {
            // Handle empty or invalid keys
            if (!key || typeof key !== 'string') {
                return options.fallback || key || '';
            }
            
            // Check cache first for performance
            const cacheKey = this.generateCacheKey(key, options);
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }
            
            // Get translation value
            let translatedValue = this.getTranslationValue(key);
            
            // Handle pluralization if count is provided
            if (options.count !== undefined && typeof translatedValue === 'object') {
                translatedValue = this.handlePluralization(translatedValue, options.count);
            }
            
            // Handle string interpolation
            if (typeof translatedValue === 'string' && options.interpolation) {
                translatedValue = this.interpolateString(translatedValue, options.interpolation);
            }
            
            // Cache the result
            this.cache.set(cacheKey, translatedValue);
            
            return translatedValue;
            
        } catch (error) {
            console.warn(`⚠️ Translation error for key "${key}":`, error);
            return this.handleTranslationError(key, options);
        }
    }
    
    getTranslationValue(key) {
        // Try current language first
        let value = this.navigateTranslationKeys(
            this.getCurrentTranslations(),
            key
        );
        
        // If not found and not using English, try English fallback
        if (value === undefined && this.currentLanguage !== LANGUAGES.ENGLISH) {
            value = this.navigateTranslationKeys(
                this.fallbackTranslations,
                key
            );
            
            if (value !== undefined) {
                console.debug(`🔄 Used English fallback for key: ${key}`);
            }
        }
        
        // Track missing keys for debugging
        if (value === undefined) {
            this.missingKeys.add(key);
            console.debug(`❓ Missing translation key: ${key}`);
        }
        
        return value;
    }
    
    navigateTranslationKeys(translations, key) {
        const keys = key.split('.');
        let current = translations;
        
        for (const k of keys) {
            if (current && typeof current === 'object' && k in current) {
                current = current[k];
            } else {
                return undefined;
            }
        }
        
        return current;
    }
    
    handlePluralization(translationObject, count) {
        // Simple pluralization rules
        if (typeof translationObject !== 'object') {
            return translationObject;
        }
        
        // Check for explicit count keys first
        if (translationObject[count] !== undefined) {
            return translationObject[count];
        }
        
        // Handle common pluralization patterns
        if (count === 0 && translationObject.zero !== undefined) {
            return translationObject.zero;
        } else if (count === 1 && translationObject.one !== undefined) {
            return translationObject.one;
        } else if (count > 1 && translationObject.other !== undefined) {
            return translationObject.other;
        } else if (translationObject.many !== undefined) {
            return translationObject.many;
        }
        
        // Fallback to 'other' or first available value
        return translationObject.other || 
               translationObject.many || 
               Object.values(translationObject)[0] || 
               '';
    }
    
    interpolateString(template, values) {
        if (!values || typeof values !== 'object') {
            return template;
        }
        
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const value = values[key];
            return value !== undefined ? String(value) : match;
        });
    }
    
    generateCacheKey(key, options) {
        const optionsStr = JSON.stringify({
            count: options.count,
            interpolation: options.interpolation,
            language: this.currentLanguage
        });
        return `${key}:${optionsStr}`;
    }
    
    handleTranslationError(key, options) {
        // Return fallback if provided
        if (options.fallback !== undefined) {
            return options.fallback;
        }
        
        // Return the key itself as last resort
        return key;
    }
    
    // Utility methods
    hasTranslation(key) {
        const value = this.getTranslationValue(key);
        return value !== undefined && value !== '';
    }
    
    getLanguageProgress() {
        const currentTranslations = this.getCurrentTranslations();
        const fallbackTranslations = this.fallbackTranslations;
        
        const currentCount = this.countTranslationKeys(currentTranslations);
        const fallbackCount = this.countTranslationKeys(fallbackTranslations);
        
        return {
            current: currentCount,
            total: fallbackCount,
            percentage: Math.round((currentCount / fallbackCount) * 100),
            missing: fallbackCount - currentCount
        };
    }
    
    countTranslationKeys(obj, prefix = '') {
        let count = 0;
        
        for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof obj[key] === 'string') {
                count++;
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                count += this.countTranslationKeys(obj[key], fullKey);
            }
        }
        
        return count;
    }
    
    getMissingKeys() {
        return Array.from(this.missingKeys);
    }
    
    clearMissingKeys() {
        this.missingKeys.clear();
    }
    
    clearCache() {
        this.cache.clear();
        console.debug('🗑️ Translation cache cleared');
    }
    
    getCacheStats() {
        return {
            size: this.cache.size,
            memoryUsage: this.estimateCacheMemoryUsage()
        };
    }
    
    estimateCacheMemoryUsage() {
        let totalSize = 0;
        
        for (const [key, value] of this.cache) {
            totalSize += (key.length + String(value).length) * 2; // UTF-16 estimate
        }
        
        return {
            bytes: totalSize,
            kb: Math.round(totalSize / 1024)
        };
    }
    
    // Advanced translation methods
    translateWithContext(key, context = {}) {
        const options = {
            interpolation: context.variables || {},
            count: context.count,
            fallback: context.fallback
        };
        
        return this.translate(key, options);
    }
    
    translateArray(keys, options = {}) {
        return keys.map(key => this.translate(key, options));
    }
    
    translateObject(translationMap, options = {}) {
        const result = {};
        
        for (const [resultKey, translationKey] of Object.entries(translationMap)) {
            result[resultKey] = this.translate(translationKey, options);
        }
        
        return result;
    }
    
    // Validation methods
    validateTranslations(translations) {
        const errors = [];
        
        try {
            this.validateTranslationStructure(translations, '', errors);
        } catch (error) {
            errors.push(`Validation error: ${error.message}`);
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    validateTranslationStructure(obj, prefix, errors) {
        for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            
            if (typeof value === 'string') {
                // Validate string content
                if (value.trim() === '') {
                    errors.push(`Empty translation for key: ${fullKey}`);
                }
            } else if (typeof value === 'object' && value !== null) {
                // Recursive validation for nested objects
                this.validateTranslationStructure(value, fullKey, errors);
            } else {
                errors.push(`Invalid value type for key: ${fullKey}`);
            }
        }
    }
    
    // Debug methods
    debugTranslation(key) {
        const currentValue = this.navigateTranslationKeys(
            this.getCurrentTranslations(),
            key
        );
        const fallbackValue = this.navigateTranslationKeys(
            this.fallbackTranslations,
            key
        );
        
        return {
            key,
            currentLanguage: this.currentLanguage,
            currentValue,
            fallbackValue,
            isMissing: currentValue === undefined,
            usedFallback: currentValue === undefined && fallbackValue !== undefined
        };
    }
    
    exportMissingTranslations() {
        const missing = {};
        
        for (const key of this.missingKeys) {
            const fallbackValue = this.navigateTranslationKeys(
                this.fallbackTranslations,
                key
            );
            
            if (fallbackValue !== undefined) {
                this.setNestedValue(missing, key, fallbackValue);
            }
        }
        
        return missing;
    }
    
    setNestedValue(obj, key, value) {
        const keys = key.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!(k in current) || typeof current[k] !== 'object') {
                current[k] = {};
            }
            current = current[k];
        }
        
        current[keys[keys.length - 1]] = value;
    }
    
    async destroy() {
        console.log('🗑️ TranslationEngine destroying...');
        
        // Clear all caches and data
        this.clearCache();
        this.clearMissingKeys();
        this.translations.clear();
        
        this.isInitialized = false;
    }
}

export default TranslationEngine;


