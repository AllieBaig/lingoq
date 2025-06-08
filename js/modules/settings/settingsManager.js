


/**
 * Purpose: Settings management for user preferences and app configuration
 * Key features: Theme settings, language preferences, accessibility options, data persistence
 * Dependencies: EventManager, StorageManager, ThemeManager, LanguageManager
 * Related helpers: Setting validation, preference synchronization, default configurations
 * Function names: init, getSetting, setSetting, loadAllSettings, saveAllSettings, applySettings
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:30 | File: js/modules/settings/settingsManager.js
 */

class SettingsManager {
    constructor(dependencies = {}) {
        // Store dependency references
        this.eventManager = dependencies.eventManager;
        this.storageManager = dependencies.storageManager;
        this.themeManager = dependencies.themeManager;
        this.languageManager = dependencies.languageManager;
        
        // Default settings configuration
        this.defaultSettings = {
            // Appearance settings
            theme: 'light',
            fontSize: 'medium',
            fontFamily: 'system',
            buttonSize: 'large',
            
            // Language and region
            language: 'en',
            region: 'us',
            
            // Accessibility settings
            highContrast: false,
            reducedMotion: false,
            screenReader: false,
            largeTouchTargets: false,
            
            // Audio and feedback
            sound: true,
            music: false,
            vibration: true,
            animations: true,
            autoNext: false,
            themeAnimations: true,
            
            // User profile
            userProfile: 'adult',
            
            // Privacy and data
            saveProgress: true,
            analytics: false
        };
        
        // Current settings (start with defaults)
        this.settings = { ...this.defaultSettings };
        
        // Initialization state
        this.isInitialized = false;
        this.settingsLoaded = false;
    }

    emitEvent(event, data = {}) {
        if (this.eventManager && typeof this.eventManager.emit === 'function') {
            this.eventManager.emit(event, data);
        } else {
            console.warn('EventManager not available to emit event:', event);
        }
    }

    async init() {
        console.log('⚙️ SettingsManager initializing...');
        
        try {
            // Validate required dependencies
            this.validateDependencies();
            
            // Load saved settings from storage
            await this.loadAllSettings();
            
            // Setup event listeners for cross-module communication
            this.setupEventListeners();
            
            // Apply current settings to the app
            await this.applyAllSettings();
            
            this.isInitialized = true;
            this.settingsLoaded = true;
            
            console.log('✅ SettingsManager initialized successfully');
            
            // Emit initialization complete event
            this.emitEvent('settings:initialized', {
                settings: this.getAllSettings(),
                isFirstRun: !this.settingsLoaded
            });
            
        } catch (error) {
            console.error('❌ SettingsManager initialization failed:', error);
            throw new Error(`Settings initialization failed: ${error.message}`);
        }
    }

    validateDependencies() {
        if (!this.eventManager) {
            throw new Error('EventManager is required for SettingsManager');
        }
        if (!this.storageManager) {
            throw new Error('StorageManager is required for SettingsManager');
        }
        if (!this.eventManager.emit || typeof this.eventManager.emit !== 'function') {
            throw new Error('EventManager must have emit method');
        }
        if (!this.eventManager.on || typeof this.eventManager.on !== 'function') {
            throw new Error('EventManager must have on method');
        }
    }

    setupEventListeners() {
        try {
            // Listen for theme changes from ThemeManager
            this.eventManager.on('theme:changed', (data) => {
                if (data && data.theme) {
                    this.updateSetting('theme', data.theme, false); // Don't re-apply
                }
            });

            // Listen for language changes from LanguageManager
            this.eventManager.on('language:changed', (data) => {
                if (data && data.currentLanguage) {
                    this.updateSetting('language', data.currentLanguage, false); // Don't re-apply
                }
            });

            // Listen for user profile changes
            this.eventManager.on('userProfile:changed', (data) => {
                if (data && data.profile) {
                    this.handleProfileChange(data.profile);
                }
            });

            console.log('👂 Settings event listeners configured');

        } catch (error) {
            console.warn('⚠️ Failed to setup some event listeners:', error);
        }
    }

    async loadAllSettings() {
        try {
            console.log('📥 Loading user settings...');
            
            const savedSettings = this.storageManager.get('user_settings');
            
            if (savedSettings && typeof savedSettings === 'object') {
                // Merge saved settings with defaults (ensures new settings get default values)
                this.settings = {
                    ...this.defaultSettings,
                    ...savedSettings
                };
                
                this.settingsLoaded = true;
                console.log('✅ Settings loaded from storage');
                
            } else {
                // No saved settings, use defaults
                this.settings = { ...this.defaultSettings };
                console.log('ℹ️ Using default settings (no saved settings found)');
            }
            
            // Validate and clean settings
            this.validateSettings();
            
        } catch (error) {
            console.warn('⚠️ Failed to load settings, using defaults:', error);
            this.settings = { ...this.defaultSettings };
        }
    }

    validateSettings() {
        // Ensure all required settings exist
        Object.keys(this.defaultSettings).forEach(key => {
            if (this.settings[key] === undefined) {
                this.settings[key] = this.defaultSettings[key];
                console.log(`🔧 Added missing setting: ${key}`);
            }
        });

        // Validate setting values
        const validations = {
            theme: ['light', 'dark', 'auto', 'high-contrast', 'sepia', 'blue-light',
                   'neon-glow', 'retro-arcade', 'nature-forest', 'space-galaxy', 'candy-pop',
                   'campus-classic', 'minimal-focus', 'night-owl', 'jetsons'],
            fontSize: ['small', 'medium', 'large', 'extra-large', 'huge'],
            fontFamily: ['system', 'serif', 'sans-serif', 'monospace', 'dyslexic'],
            buttonSize: ['normal', 'large', 'extra-large'],
            language: ['en', 'fr', 'de', 'es', 'it', 'pt'],
            region: ['us', 'uk', 'ca', 'au', 'in', 'de', 'fr'],
            userProfile: ['senior', 'student', 'adult', 'educator', 'custom']
        };

        Object.entries(validations).forEach(([key, validValues]) => {
            if (!validValues.includes(this.settings[key])) {
                console.warn(`⚠️ Invalid value for ${key}: ${this.settings[key]}, using default`);
                this.settings[key] = this.defaultSettings[key];
            }
        });
    }

    async saveAllSettings() {
        try {
            this.storageManager.set('user_settings', this.settings);
            console.log('💾 All settings saved to storage');
            
            // Emit save event
            this.emitEvent('settings:saved', {
                settings: this.getAllSettings(),
                timestamp: Date.now()
            });
            
        } catch (error) {
            console.error('❌ Failed to save settings:', error);
            throw error;
        }
    }

    getSetting(key) {
        if (!key) {
            console.warn('⚠️ Setting key is required');
            return undefined;
        }
        
        return this.settings[key];
    }

    setSetting(key, value) {
        if (!key) {
            console.warn('⚠️ Setting key is required');
            return;
        }

        const oldValue = this.settings[key];
        
        // Update the setting
        this.settings[key] = value;
        
        // Apply the setting to the app
        this.applySetting(key, value);
        
        // Save to storage
        this.saveAllSettings().catch(error => {
            console.warn('⚠️ Failed to save setting:', error);
        });
        
        // Emit change event
        this.emitEvent('settings:changed', {
            key,
            value,
            oldValue,
            allSettings: this.getAllSettings()
        });
        
        console.log(`⚙️ Setting updated: ${key} = ${value}`);
    }

    updateSetting(key, value, shouldApply = true) {
        // Internal method for updating settings without triggering events
        // Used when changes come from other managers to prevent loops
        
        const oldValue = this.settings[key];
        this.settings[key] = value;
        
        if (shouldApply) {
            this.applySetting(key, value);
        }
        
        // Save to storage
        this.saveAllSettings().catch(error => {
            console.warn('⚠️ Failed to save setting:', error);
        });
        
        console.log(`🔄 Setting synchronized: ${key} = ${value}`);
    }

    async applyAllSettings() {
        console.log('🔧 Applying all current settings...');
        
        try {
            // Apply settings in order of dependency
            const settingsOrder = [
                'theme',
                'language',
                'fontSize',
                'fontFamily',
                'buttonSize',
                'highContrast',
                'reducedMotion',
                'animations'
            ];
            
            for (const key of settingsOrder) {
                if (this.settings[key] !== undefined) {
                    await this.applySetting(key, this.settings[key]);
                }
            }
            
            console.log('✅ All settings applied successfully');
            
        } catch (error) {
            console.error('❌ Failed to apply some settings:', error);
        }
    }

    async applySetting(key, value) {
        try {
            switch (key) {
                case 'theme':
                    if (this.themeManager && this.themeManager.setTheme) {
                        await this.themeManager.setTheme(value);
                    }
                    break;
                    
                case 'language':
                    if (this.languageManager && this.languageManager.setLanguage) {
                        await this.languageManager.setLanguage(value);
                    }
                    break;
                    
                case 'fontSize':
                    this.applyFontSize(value);
                    break;
                    
                case 'fontFamily':
                    this.applyFontFamily(value);
                    break;
                    
                case 'buttonSize':
                    this.applyButtonSize(value);
                    break;
                    
                case 'highContrast':
                    this.applyHighContrast(value);
                    break;
                    
                case 'reducedMotion':
                    this.applyReducedMotion(value);
                    break;
                    
                case 'animations':
                    this.applyAnimations(value);
                    break;
                    
                case 'userProfile':
                    this.applyUserProfile(value);
                    break;
                    
                default:
                    // For simple settings that don't need special handling
                    this.applyGenericSetting(key, value);
            }
            
        } catch (error) {
            console.warn(`⚠️ Failed to apply setting ${key}:`, error);
        }
    }

    applyFontSize(size) {
        const root = document.documentElement;
        const sizeMap = {
            small: '14px',
            medium: '16px',
            large: '18px',
            'extra-large': '20px',
            huge: '24px'
        };
        
        const fontSize = sizeMap[size] || sizeMap.medium;
        root.style.setProperty('--font-size-base', fontSize);
        
        // Also update related sizes
        const scale = parseFloat(fontSize) / 16; // Base scale from 16px
        root.style.setProperty('--font-size-sm', `${14 * scale}px`);
        root.style.setProperty('--font-size-lg', `${18 * scale}px`);
        root.style.setProperty('--font-size-xl', `${20 * scale}px`);
    }

    applyFontFamily(family) {
        const root = document.documentElement;
        const familyMap = {
            system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            serif: 'Georgia, "Times New Roman", Times, serif',
            'sans-serif': 'Arial, Helvetica, "Lucida Grande", sans-serif',
            monospace: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
            dyslexic: '"OpenDyslexic", "Comic Sans MS", cursive, sans-serif'
        };

        const fontFamily = familyMap[family] || familyMap.system;
        root.style.setProperty('--font-family-base', fontFamily);

        window.dispatchEvent(new CustomEvent('fontFamilyChanged', {
            detail: { fontFamily: family }
        }));
    }

    applyButtonSize(size) {
        const root = document.documentElement;
        const sizeMap = {
            normal: { padding: '8px 16px', fontSize: '14px', minHeight: '36px' },
            large: { padding: '12px 24px', fontSize: '16px', minHeight: '44px' },
            'extra-large': { padding: '16px 32px', fontSize: '18px', minHeight: '52px' }
        };
        
        const buttonSize = sizeMap[size] || sizeMap.large;
        root.style.setProperty('--button-padding', buttonSize.padding);
        root.style.setProperty('--button-font-size', buttonSize.fontSize);
        root.style.setProperty('--button-min-height', buttonSize.minHeight);
    }

    applyHighContrast(enabled) {
        const root = document.documentElement;
        
        if (enabled) {
            root.classList.add('high-contrast');
            root.style.setProperty('--contrast-mode', 'high');
        } else {
            root.classList.remove('high-contrast');
            root.style.setProperty('--contrast-mode', 'normal');
        }
    }

    applyReducedMotion(enabled) {
        const root = document.documentElement;
        
        if (enabled) {
            root.classList.add('reduced-motion');
            root.style.setProperty('--animation-duration', '0ms');
            root.style.setProperty('--transition-duration', '0ms');
        } else {
            root.classList.remove('reduced-motion');
            root.style.setProperty('--animation-duration', '');
            root.style.setProperty('--transition-duration', '');
        }
    }

    applyAnimations(enabled) {
        const root = document.documentElement;
        
        if (enabled) {
            root.classList.add('animations-enabled');
        } else {
            root.classList.remove('animations-enabled');
        }
        
        root.style.setProperty('--animations-enabled', enabled ? '1' : '0');
    }

    applyUserProfile(profile) {
        const root = document.documentElement;
        
        // Remove existing profile classes
        root.classList.remove('profile-senior', 'profile-student', 'profile-adult', 'profile-educator');
        
        // Add new profile class
        root.classList.add(`profile-${profile}`);
        
        // Apply profile-specific settings
        this.applyProfileSettings(profile);
    }

    applyProfileSettings(profile) {
        const profileSettings = {
            senior: {
                fontSize: 'large',
                buttonSize: 'extra-large',
                highContrast: false,
                reducedMotion: true,
                animations: false
            },
            student: {
                fontSize: 'medium',
                buttonSize: 'normal',
                animations: true,
                themeAnimations: true
            },
            adult: {
                fontSize: 'medium',
                buttonSize: 'large',
                animations: true
            },
            educator: {
                fontSize: 'medium',
                buttonSize: 'large',
                animations: true
            }
        };
        
        const settings = profileSettings[profile];
        if (settings) {
            Object.entries(settings).forEach(([key, value]) => {
                if (this.settings[key] !== value) {
                    this.updateSetting(key, value, true);
                }
            });
        }
    }

    applyGenericSetting(key, value) {
        // For settings that just need to be stored but don't affect UI immediately
        const root = document.documentElement;
        root.style.setProperty(`--setting-${key}`, value);
    }

    handleProfileChange(newProfile) {
        this.setSetting('userProfile', newProfile);
        
        // Show profile-specific UI elements
        this.toggleProfileElements(newProfile);
    }

    toggleProfileElements(profile) {
        // Show/hide profile-specific elements
        const seniorElements = document.querySelectorAll('.senior-only');
        const studentElements = document.querySelectorAll('.student-only');
        
        seniorElements.forEach(el => {
            el.style.display = profile === 'senior' ? 'block' : 'none';
        });
        
        studentElements.forEach(el => {
            el.style.display = profile === 'student' ? 'block' : 'none';
        });
    }

    applySettings(settingsData) {
        if (!settingsData || typeof settingsData !== 'object') {
            console.warn('⚠️ Invalid settings data provided');
            return;
        }
        
        console.log('🔧 Applying multiple settings...');
        
        Object.entries(settingsData).forEach(([key, value]) => {
            this.setSetting(key, value);
        });
        
        console.log('✅ Multiple settings applied');
    }

    getAllSettings() {
        return { ...this.settings };
    }

    resetToDefaults() {
        console.log('🔄 Resetting settings to defaults...');
        
        const oldSettings = { ...this.settings };
        this.settings = { ...this.defaultSettings };
        
        // Apply all default settings
        this.applyAllSettings();
        
        // Save to storage
        this.saveAllSettings();
        
        // Emit reset event
        this.emitEvent('settings:reset', {
            oldSettings,
            newSettings: this.getAllSettings()
        });
        
        console.log('✅ Settings reset to defaults');
    }

    exportSettings() {
        return {
            settings: this.getAllSettings(),
            metadata: {
                timestamp: Date.now(),
                version: '1.0.0',
                userAgent: navigator.userAgent,
                language: navigator.language
            }
        };
    }

    importSettings(settingsData) {
        if (!settingsData || !settingsData.settings) {
            throw new Error('Invalid settings data format');
        }
        
        console.log('📥 Importing settings...');
        
        // Validate imported settings
        const validatedSettings = this.validateImportedSettings(settingsData.settings);
        
        // Apply imported settings
        this.applySettings(validatedSettings);
        
        // Emit import event
        this.emitEvent('settings:imported', {
            importedSettings: validatedSettings,
            metadata: settingsData.metadata
        });
        
        console.log('✅ Settings imported successfully');
    }

    validateImportedSettings(importedSettings) {
        const validatedSettings = {};
        
        Object.entries(importedSettings).forEach(([key, value]) => {
            if (this.defaultSettings.hasOwnProperty(key)) {
                validatedSettings[key] = value;
            } else {
                console.warn(`⚠️ Ignoring unknown setting: ${key}`);
            }
        });
        
        return validatedSettings;
    }


}

export default SettingsManager;

