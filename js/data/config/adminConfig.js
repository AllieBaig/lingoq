





// LingoQuest - Admin Configuration
// ES6 Module for administrative settings and feature toggles
// Controls which features are enabled/disabled for the application

export const adminConfig = {
    // Admin panel configuration
    admin: {
        enabled: true,
        accessKey: 'lingoquest_admin_2024',
        sessionTimeout: 3600000, // 1 hour in milliseconds
        requirePassword: false,
        defaultPassword: 'admin123',
        allowGuestAccess: true
    },
    
    // Language management
    languages: {
        // Core language (always enabled)
        core: {
            code: 'en',
            name: 'English',
            enabled: true,
            required: true,
            fallback: true
        },
        
        // Optional languages (can be enabled/disabled)
        optional: {
            french: {
                code: 'fr',
                name: 'Français',
                enabled: false,
                available: true,
                fileExists: true
            },
            german: {
                code: 'de', 
                name: 'Deutsch',
                enabled: false,
                available: true,
                fileExists: true
            },
            spanish: {
                code: 'es',
                name: 'Español', 
                enabled: false,
                available: true,
                fileExists: false
            },
            italian: {
                code: 'it',
                name: 'Italiano',
                enabled: false,
                available: true,
                fileExists: false
            },
            portuguese: {
                code: 'pt',
                name: 'Português',
                enabled: false,
                available: true,
                fileExists: false
            }
        },
        
        // Language loading settings
        loading: {
            fallbackToEnglish: true,
            showMissingKeys: false, // for debugging
            loadOnDemand: true,
            cacheTranslations: true
        }
    },
    
    // Feature toggles
    features: {
        // Game modes
        gameModes: {
            classic: {
                enabled: true,
                visible: true,
                beta: false
            },
            hollybolly: {
                enabled: true,
                visible: true,
                beta: false
            }
        },
        
        // Themes
        themes: {
            seniorThemes: {
                enabled: true,
                themes: ['light', 'dark', 'auto', 'high-contrast', 'sepia', 'blue-light']
            },
            studentThemes: {
                enabled: true,
                themes: ['neon-glow', 'retro-arcade', 'nature-forest', 'space-galaxy', 'candy-pop']
            }
        },
        
        // UI Features
        ui: {
            darkModeToggle: {
                enabled: true,
                visible: true,
                defaultMode: 'light'
            },
            animations: {
                enabled: true,
                reducedMotion: true
            },
            soundEffects: {
                enabled: true,
                defaultVolume: 0.7
            },
            notifications: {
                enabled: true,
                desktop: false,
                mobile: true
            }
        },
        
        // Advanced features
        advanced: {
            analytics: {
                enabled: false,
                anonymous: true
            },
            sharing: {
                enabled: true,
                platforms: ['native', 'clipboard', 'twitter', 'facebook']
            },
            offline: {
                enabled: true,
                cacheSize: '50MB'
            },
            pwa: {
                enabled: true,
                installPrompt: true
            }
        }
    },
    
    // Debug and development
    debug: {
        enabled: false,
        console: {
            enabled: false,
            level: 'warn' // 'debug', 'info', 'warn', 'error'
        },
        performance: {
            enabled: false,
            showTimings: false,
            memoryMonitoring: false
        },
        testing: {
            mockData: false,
            skipAnimations: false,
            fastMode: false
        }
    },
    
    // Content management
    content: {
        questions: {
            classic: {
                names: { enabled: true, count: 50 },
                places: { enabled: true, count: 50 },
                animals: { enabled: true, count: 50 },
                things: { enabled: true, count: 50 }
            },
            hollybolly: {
                movies: { enabled: true, count: 150 },
                rewards: { enabled: true }
            }
        },
        
        // Content updates
        updates: {
            autoUpdate: false,
            checkInterval: 86400000, // 24 hours
            beta: false
        }
    },
    
    // User management
    users: {
        profiles: {
            senior: { enabled: true, default: false },
            student: { enabled: true, default: false },
            adult: { enabled: true, default: true },
            educator: { enabled: true, default: false }
        },
        
        data: {
            allowLocalStorage: true,
            allowSessionStorage: true,
            dataRetention: 30, // days
            anonymousMode: false
        }
    },
    
    // Performance settings
    performance: {
        optimization: {
            lazyLoading: true,
            preloading: true,
            caching: true,
            compression: false
        },
        
        limits: {
            maxCacheSize: 52428800, // 50MB
            maxQuestions: 1000,
            maxGameHistory: 100,
            sessionTimeout: 1800000 // 30 minutes
        }
    }
};

// Admin utility functions
export const adminUtils = {
    // Check if admin mode is enabled
    isAdminEnabled() {
        return adminConfig.admin.enabled;
    },
    
    // Get enabled languages
    getEnabledLanguages() {
        const enabled = [adminConfig.languages.core];
        
        Object.values(adminConfig.languages.optional).forEach(lang => {
            if (lang.enabled) {
                enabled.push(lang);
            }
        });
        
        return enabled;
    },
    
    // Toggle language
    toggleLanguage(languageCode, enable = null) {
        const lang = adminConfig.languages.optional[languageCode];
        if (lang) {
            lang.enabled = enable !== null ? enable : !lang.enabled;
            this.saveAdminConfig();
            return lang.enabled;
        }
        return false;
    },
    
    // Toggle feature
    toggleFeature(featurePath, enable = null) {
        const keys = featurePath.split('.');
        let current = adminConfig.features;
        
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
            if (!current) return false;
        }
        
        const finalKey = keys[keys.length - 1];
        if (current[finalKey] && typeof current[finalKey] === 'object' && 'enabled' in current[finalKey]) {
            current[finalKey].enabled = enable !== null ? enable : !current[finalKey].enabled;
            this.saveAdminConfig();
            return current[finalKey].enabled;
        }
        
        return false;
    },
    
    // Save admin configuration
    saveAdminConfig() {
        try {
            localStorage.setItem('lingoquest_admin_config', JSON.stringify(adminConfig));
            return true;
        } catch (error) {
            console.error('Failed to save admin config:', error);
            return false;
        }
    },
    
    // Load admin configuration
    loadAdminConfig() {
        try {
            const saved = localStorage.getItem('lingoquest_admin_config');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(adminConfig, parsed);
            }
            return true;
        } catch (error) {
            console.error('Failed to load admin config:', error);
            return false;
        }
    },
    
    // Reset to defaults
    resetToDefaults() {
        // Reset language settings
        adminConfig.languages.optional.french.enabled = false;
        adminConfig.languages.optional.german.enabled = false;
        adminConfig.languages.optional.spanish.enabled = false;
        adminConfig.languages.optional.italian.enabled = false;
        adminConfig.languages.optional.portuguese.enabled = false;
        
        // Reset debug settings
        adminConfig.debug.enabled = false;
        adminConfig.debug.console.enabled = false;
        
        this.saveAdminConfig();
    },
    
    // Get feature status
    isFeatureEnabled(featurePath) {
        const keys = featurePath.split('.');
        let current = adminConfig.features;
        
        for (const key of keys) {
            current = current[key];
            if (!current) return false;
        }
        
        return current.enabled || false;
    }
};

// Admin panel configuration for settings UI
export const adminPanel = {
    sections: [
        {
            id: 'languages',
            title: 'Language Management',
            icon: '🌐',
            settings: [
                {
                    key: 'languages.optional.french.enabled',
                    type: 'toggle',
                    label: 'Enable French',
                    description: 'Allow users to switch to French language'
                },
                {
                    key: 'languages.optional.german.enabled',
                    type: 'toggle', 
                    label: 'Enable German',
                    description: 'Allow users to switch to German language'
                },
                {
                    key: 'languages.optional.spanish.enabled',
                    type: 'toggle',
                    label: 'Enable Spanish',
                    description: 'Allow users to switch to Spanish language'
                },
                {
                    key: 'languages.optional.italian.enabled',
                    type: 'toggle',
                    label: 'Enable Italian', 
                    description: 'Allow users to switch to Italian language'
                },
                {
                    key: 'languages.optional.portuguese.enabled',
                    type: 'toggle',
                    label: 'Enable Portuguese',
                    description: 'Allow users to switch to Portuguese language'
                }
            ]
        },
        
        {
            id: 'features',
            title: 'Feature Toggles',
            icon: '🔧',
            settings: [
                {
                    key: 'features.ui.darkModeToggle.enabled',
                    type: 'toggle',
                    label: 'Dark Mode Toggle',
                    description: 'Show dark mode toggle button'
                },
                {
                    key: 'features.themes.studentThemes.enabled',
                    type: 'toggle',
                    label: 'Student Themes',
                    description: 'Enable colorful themes for students'
                },
                {
                    key: 'features.advanced.sharing.enabled',
                    type: 'toggle',
                    label: 'Social Sharing',
                    description: 'Allow users to share scores'
                },
                {
                    key: 'features.advanced.analytics.enabled',
                    type: 'toggle',
                    label: 'Analytics',
                    description: 'Collect anonymous usage data'
                }
            ]
        },
        
        {
            id: 'debug',
            title: 'Debug & Development',
            icon: '🐛',
            settings: [
                {
                    key: 'debug.enabled',
                    type: 'toggle',
                    label: 'Debug Mode',
                    description: 'Enable debugging features'
                },
                {
                    key: 'debug.console.enabled',
                    type: 'toggle',
                    label: 'Console Logging',
                    description: 'Show detailed console logs'
                },
                {
                    key: 'debug.testing.mockData',
                    type: 'toggle',
                    label: 'Mock Data',
                    description: 'Use test data instead of real data'
                }
            ]
        }
    ]
};

export default adminConfig;




