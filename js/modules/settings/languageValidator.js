




/**
 * Purpose: Language availability validation and admin settings integration
 * Key features: Language availability checks, admin config validation, language enabling/disabling
 * Dependencies: adminConfig, adminUtils, constants, language mappings
 * Related helpers: Language availability checks, admin settings management, validation utilities
 * Function names: isLanguageAvailable, getAvailableLanguages, enableLanguage, disableLanguage, validateLanguageCode
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:55 | File: js/modules/settings/languageValidator.js
 */

import { adminConfig, adminUtils } from '../../data/config/adminConfig.js';
import { LANGUAGES } from '../../data/config/constants.js';

export class LanguageValidator {
    constructor() {
        this.supportedLanguages = new Map();
        this.languageMetadata = new Map();
        this.validationCache = new Map();
        this.isInitialized = false;
        
        this.initializeSupportedLanguages();
    }
    
    initializeSupportedLanguages() {
        // Define all supported languages with metadata
        this.supportedLanguages.set(LANGUAGES.ENGLISH, {
            code: LANGUAGES.ENGLISH,
            name: 'English',
            nativeName: 'English',
            adminKey: 'core',
            isCore: true,
            canDisable: false,
            fileExists: true,
            completeness: 100
        });
        
        this.supportedLanguages.set(LANGUAGES.FRENCH, {
            code: LANGUAGES.FRENCH,
            name: 'French',
            nativeName: 'Français',
            adminKey: 'french',
            isCore: false,
            canDisable: true,
            fileExists: true,
            completeness: 95
        });
        
        this.supportedLanguages.set(LANGUAGES.GERMAN, {
            code: LANGUAGES.GERMAN,
            name: 'German',
            nativeName: 'Deutsch',
            adminKey: 'german',
            isCore: false,
            canDisable: true,
            fileExists: true,
            completeness: 90
        });
        
        this.supportedLanguages.set(LANGUAGES.SPANISH, {
            code: LANGUAGES.SPANISH,
            name: 'Spanish',
            nativeName: 'Español',
            adminKey: 'spanish',
            isCore: false,
            canDisable: true,
            fileExists: false,
            completeness: 0
        });
        
        this.supportedLanguages.set(LANGUAGES.ITALIAN, {
            code: LANGUAGES.ITALIAN,
            name: 'Italian',
            nativeName: 'Italiano',
            adminKey: 'italian',
            isCore: false,
            canDisable: true,
            fileExists: false,
            completeness: 0
        });
        
        this.supportedLanguages.set(LANGUAGES.PORTUGUESE, {
            code: LANGUAGES.PORTUGUESE,
            name: 'Portuguese',
            nativeName: 'Português',
            adminKey: 'portuguese',
            isCore: false,
            canDisable: true,
            fileExists: false,
            completeness: 0
        });
        
        console.log('📋 Language validator initialized with supported languages');
    }
    
    isLanguageAvailable(languageCode) {
        try {
            // Check validation cache first
            const cacheKey = `available_${languageCode}`;
            if (this.validationCache.has(cacheKey)) {
                return this.validationCache.get(cacheKey);
            }
            
            // Validate language code format
            if (!this.isValidLanguageCode(languageCode)) {
                this.validationCache.set(cacheKey, false);
                return false;
            }
            
            // English is always available
            if (languageCode === LANGUAGES.ENGLISH) {
                this.validationCache.set(cacheKey, true);
                return true;
            }
            
            // Check if language is supported
            const languageInfo = this.supportedLanguages.get(languageCode);
            if (!languageInfo) {
                this.validationCache.set(cacheKey, false);
                return false;
            }
            
            // Check if language is enabled in admin config
            const isEnabled = this.isLanguageEnabledInAdmin(languageCode);
            
            // Check if translation file exists
            const hasFile = languageInfo.fileExists;
            
            const isAvailable = isEnabled && hasFile;
            this.validationCache.set(cacheKey, isAvailable);
            
            return isAvailable;
            
        } catch (error) {
            console.warn(`⚠️ Error checking language availability for ${languageCode}:`, error);
            return false;
        }
    }
    
    isValidLanguageCode(languageCode) {
        // Check if it's a valid ISO 639-1 language code format
        if (!languageCode || typeof languageCode !== 'string') {
            return false;
        }
        
        // Must be 2 characters, lowercase letters
        const languageCodeRegex = /^[a-z]{2}$/;
        return languageCodeRegex.test(languageCode);
    }
    
    isLanguageEnabledInAdmin(languageCode) {
        try {
            // English (core language) is always enabled
            if (languageCode === LANGUAGES.ENGLISH) {
                return true;
            }
            
            const languageInfo = this.supportedLanguages.get(languageCode);
            if (!languageInfo || !languageInfo.adminKey) {
                return false;
            }
            
            // Check admin configuration
            const adminLanguageConfig = adminConfig.languages.optional[languageInfo.adminKey];
            return adminLanguageConfig ? adminLanguageConfig.enabled : false;
            
        } catch (error) {
            console.warn(`⚠️ Error checking admin config for ${languageCode}:`, error);
            return false;
        }
    }
    
    getAvailableLanguages() {
        const available = [];
        
        // Always include English first
        const englishInfo = this.supportedLanguages.get(LANGUAGES.ENGLISH);
        if (englishInfo) {
            available.push({
                code: englishInfo.code,
                name: englishInfo.name,
                nativeName: englishInfo.nativeName,
                enabled: true,
                isCore: true,
                completeness: englishInfo.completeness
            });
        }
        
        // Add other enabled languages
        for (const [code, info] of this.supportedLanguages) {
            if (code !== LANGUAGES.ENGLISH && this.isLanguageAvailable(code)) {
                available.push({
                    code: info.code,
                    name: info.name,
                    nativeName: info.nativeName,
                    enabled: true,
                    isCore: false,
                    completeness: info.completeness
                });
            }
        }
        
        return available;
    }
    
    getAllSupportedLanguages() {
        const all = [];
        
        for (const [code, info] of this.supportedLanguages) {
            all.push({
                code: info.code,
                name: info.name,
                nativeName: info.nativeName,
                enabled: this.isLanguageAvailable(code),
                isCore: info.isCore,
                canDisable: info.canDisable,
                fileExists: info.fileExists,
                completeness: info.completeness,
                adminKey: info.adminKey
            });
        }
        
        return all;
    }
    
    getLanguageName(languageCode) {
        const languageInfo = this.supportedLanguages.get(languageCode);
        return languageInfo ? languageInfo.name : 'Unknown';
    }
    
    getLanguageNativeName(languageCode) {
        const languageInfo = this.supportedLanguages.get(languageCode);
        return languageInfo ? languageInfo.nativeName : 'Unknown';
    }
    
    enableLanguage(languageCode) {
        try {
            // Cannot enable English (always enabled)
            if (languageCode === LANGUAGES.ENGLISH) {
                console.warn('⚠️ Cannot enable English language (always enabled)');
                return true; // Already enabled
            }
            
            // Validate language code
            if (!this.isValidLanguageCode(languageCode)) {
                console.warn(`⚠️ Invalid language code: ${languageCode}`);
                return false;
            }
            
            // Check if language is supported
            const languageInfo = this.supportedLanguages.get(languageCode);
            if (!languageInfo) {
                console.warn(`⚠️ Unsupported language: ${languageCode}`);
                return false;
            }
            
            // Check if translation file exists
            if (!languageInfo.fileExists) {
                console.warn(`⚠️ Translation file missing for: ${languageCode}`);
                return false;
            }
            
            // Enable in admin config
            const success = adminUtils.toggleLanguage(languageInfo.adminKey, true);
            
            if (success) {
                // Clear validation cache
                this.clearValidationCache(languageCode);
                console.log(`✅ Language enabled: ${languageCode}`);
            }
            
            return success;
            
        } catch (error) {
            console.error(`❌ Failed to enable language ${languageCode}:`, error);
            return false;
        }
    }
    
    disableLanguage(languageCode) {
        try {
            // Cannot disable English (core language)
            if (languageCode === LANGUAGES.ENGLISH) {
                console.warn('⚠️ Cannot disable English language (core language)');
                return false;
            }
            
            // Validate language code
            if (!this.isValidLanguageCode(languageCode)) {
                console.warn(`⚠️ Invalid language code: ${languageCode}`);
                return false;
            }
            
            // Check if language exists and can be disabled
            const languageInfo = this.supportedLanguages.get(languageCode);
            if (!languageInfo || !languageInfo.canDisable) {
                console.warn(`⚠️ Language cannot be disabled: ${languageCode}`);
                return false;
            }
            
            // Disable in admin config
            const success = adminUtils.toggleLanguage(languageInfo.adminKey, false);
            
            if (success) {
                // Clear validation cache
                this.clearValidationCache(languageCode);
                console.log(`✅ Language disabled: ${languageCode}`);
            }
            
            return success;
            
        } catch (error) {
            console.error(`❌ Failed to disable language ${languageCode}:`, error);
            return false;
        }
    }
    
    validateLanguageFile(languageCode, translationData) {
        try {
            const validation = {
                isValid: true,
                errors: [],
                warnings: [],
                completeness: 0,
                missingKeys: []
            };
            
            // Check if translation data exists
            if (!translationData || typeof translationData !== 'object') {
                validation.isValid = false;
                validation.errors.push('Translation data is missing or invalid');
                return validation;
            }
            
            // Validate structure (basic check)
            const requiredSections = ['app', 'navigation', 'actions', 'game', 'buttons'];
            
            for (const section of requiredSections) {
                if (!translationData[section]) {
                    validation.warnings.push(`Missing section: ${section}`);
                    validation.missingKeys.push(section);
                }
            }
            
            // Calculate completeness (simplified)
            const totalSections = requiredSections.length;
            const presentSections = requiredSections.filter(section => 
                translationData[section]
            ).length;
            
            validation.completeness = Math.round((presentSections / totalSections) * 100);
            
            // Update language metadata
            const languageInfo = this.supportedLanguages.get(languageCode);
            if (languageInfo) {
                languageInfo.completeness = validation.completeness;
            }
            
            return validation;
            
        } catch (error) {
            return {
                isValid: false,
                errors: [`Validation error: ${error.message}`],
                warnings: [],
                completeness: 0,
                missingKeys: []
            };
        }
    }
    
    refreshAvailableLanguages() {
        // Clear validation cache to force re-evaluation
        this.clearValidationCache();
        
        console.log('🔄 Language availability refreshed');
    }
    
    clearValidationCache(languageCode = null) {
        if (languageCode) {
            // Clear specific language cache
            const cacheKey = `available_${languageCode}`;
            this.validationCache.delete(cacheKey);
        } else {
            // Clear all validation cache
            this.validationCache.clear();
        }
    }
    
    getValidationStats() {
        return {
            supportedLanguagesCount: this.supportedLanguages.size,
            availableLanguagesCount: this.getAvailableLanguages().length,
            cacheSize: this.validationCache.size,
            languages: this.getAllSupportedLanguages()
        };
    }
    
    // Debug methods
    debugLanguage(languageCode) {
        const languageInfo = this.supportedLanguages.get(languageCode);
        const isAvailable = this.isLanguageAvailable(languageCode);
        const isEnabledInAdmin = this.isLanguageEnabledInAdmin(languageCode);
        
        return {
            code: languageCode,
            info: languageInfo,
            isAvailable,
            isEnabledInAdmin,
            isValid: this.isValidLanguageCode(languageCode),
            cacheEntry: this.validationCache.get(`available_${languageCode}`)
        };
    }
    
    exportLanguageReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalSupported: this.supportedLanguages.size,
            totalAvailable: this.getAvailableLanguages().length,
            languages: {}
        };
        
        for (const [code] of this.supportedLanguages) {
            report.languages[code] = this.debugLanguage(code);
        }
        
        return report;
    }
    
    destroy() {
        console.log('🗑️ LanguageValidator destroying...');
        
        // Clear all caches and data
        this.clearValidationCache();
        this.supportedLanguages.clear();
        this.languageMetadata.clear();
        
        this.isInitialized = false;
    }
}

export default LanguageValidator;



