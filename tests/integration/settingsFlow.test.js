







/**
 * Purpose: Integration tests for settings management and user preferences flow
 * Key features: Settings persistence, theme switching, language changes, accessibility options
 * Dependencies: Jest, DOM testing utilities, settings modules, theme system
 * Related helpers: Settings mocking, UI state validation, preference synchronization
 * Function names: testSettingsFlow, testThemeApplication, testLanguageSwitch, testAccessibilitySettings
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:05 | File: test/integration/settingsFlow.test.js
 */

import { jest } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { LingoQuestApp } from '../../js/main.js';

// Mock modules for settings testing
jest.mock('../../js/modules/settings/themeManager.js');
jest.mock('../../js/modules/settings/languageManager.js');
jest.mock('../../js/modules/core/storageManager.js');

describe('Settings Flow Integration Tests', () => {
    let app;
    let dom;
    let document;
    let window;
    let localStorage;

    beforeEach(async () => {
        // Setup DOM environment with settings elements
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>LingoQuest Settings Test</title>
            </head>
            <body data-theme="light">
                <div id="app">
                    <div id="settings-screen" class="screen">
                        <div class="settings-content">
                            <!-- Theme Settings -->
                            <div class="setting-group">
                                <label for="theme-select">Theme:</label>
                                <select id="theme-select" class="select-input" data-custom-dropdown>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="high-contrast">High Contrast</option>
                                    <option value="neon-glow">Neon Glow</option>
                                    <option value="retro-arcade">Retro Arcade</option>
                                </select>
                            </div>

                            <!-- Language Settings -->
                            <div class="setting-group">
                                <label for="language-select">Language:</label>
                                <select id="language-select" class="select-input" data-custom-dropdown>
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>

                            <!-- Font Settings -->
                            <div class="setting-group">
                                <label for="font-size-select">Font Size:</label>
                                <select id="font-size-select" class="select-input" data-custom-dropdown>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="extra-large">Extra Large</option>
                                </select>
                            </div>

                            <!-- User Profile -->
                            <div class="setting-group">
                                <label for="user-profile-select">User Profile:</label>
                                <select id="user-profile-select" class="select-input" data-custom-dropdown>
                                    <option value="senior">Senior (60+)</option>
                                    <option value="student">Student (6-18)</option>
                                    <option value="adult">Adult (19-59)</option>
                                    <option value="educator">Educator</option>
                                </select>
                            </div>

                            <!-- Accessibility Settings -->
                            <div class="setting-group">
                                <label for="high-contrast-toggle" class="toggle-label">
                                    <input type="checkbox" id="high-contrast-toggle" class="toggle-input">
                                    <span class="toggle-slider"></span>
                                    <span>High Contrast Mode</span>
                                </label>
                            </div>

                            <div class="setting-group">
                                <label for="reduced-motion-toggle" class="toggle-label">
                                    <input type="checkbox" id="reduced-motion-toggle" class="toggle-input">
                                    <span class="toggle-slider"></span>
                                    <span>Reduce Motion</span>
                                </label>
                            </div>

                            <!-- Game Settings -->
                            <div class="setting-group">
                                <label for="sound-toggle" class="toggle-label">
                                    <input type="checkbox" id="sound-toggle" class="toggle-input" checked>
                                    <span class="toggle-slider"></span>
                                    <span>Sound Effects</span>
                                </label>
                            </div>

                            <div class="setting-group">
                                <label for="animations-toggle" class="toggle-label">
                                    <input type="checkbox" id="animations-toggle" class="toggle-input" checked>
                                    <span class="toggle-slider"></span>
                                    <span>Animations</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `, {
            url: 'http://localhost:3000',
            pretendToBeVisual: true,
            resources: 'usable'
        });

        global.window = dom.window;
        global.document = dom.window.document;
        global.navigator = dom.window.navigator;
        global.localStorage = createMockLocalStorage();

        document = global.document;
        window = global.window;
        localStorage = global.localStorage;

        // Mock CSS properties for theme testing
        mockCSSProperties();

        // Initialize app
        app = new LingoQuestApp();
    });

    afterEach(() => {
        if (app && app.destroy) {
            app.destroy();
        }
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('Theme Settings Flow', () => {
        test('should apply light theme correctly', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');
            const settingsManager = app.getModule('settingsManager');

            // Change to light theme
            await themeManager.setTheme('light');

            // Verify theme is applied
            expect(document.body.getAttribute('data-theme')).toBe('light');
            expect(document.body.classList.contains('theme-light')).toBe(true);

            // Verify setting is saved
            expect(settingsManager.getSetting('theme')).toBe('light');
            expect(localStorage.getItem('lingo-theme')).toBe('light');
        });

        test('should apply dark theme correctly', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');

            // Change to dark theme
            await themeManager.setTheme('dark');

            // Verify theme is applied
            expect(document.body.getAttribute('data-theme')).toBe('dark');
            expect(document.body.classList.contains('theme-dark')).toBe(true);

            // Verify CSS variables are set
            const computedStyle = window.getComputedStyle(document.documentElement);
            expect(computedStyle.getPropertyValue('--background-color')).toBe('#121212');
        });

        test('should handle student theme application', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');

            // Apply student theme
            await themeManager.setTheme('neon-glow');

            expect(document.body.classList.contains('theme-neon-glow')).toBe(true);
            
            // Should load external CSS file for student themes
            const linkElement = document.querySelector('link[href*="neon-glow"]');
            expect(linkElement).toBeTruthy();
        });

        test('should handle theme switching sequence', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');

            // Switch through multiple themes
            const themes = ['light', 'dark', 'high-contrast', 'neon-glow', 'retro-arcade'];

            for (const theme of themes) {
                await themeManager.setTheme(theme);
                expect(document.body.getAttribute('data-theme')).toBe(theme);
                expect(localStorage.getItem('lingo-theme')).toBe(theme);
            }
        });

        test('should handle invalid theme gracefully', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');

            // Try to set invalid theme
            await themeManager.setTheme('invalid-theme');

            // Should fallback to default
            expect(document.body.getAttribute('data-theme')).toBe('light');
        });
    });

    describe('Language Settings Flow', () => {
        test('should change language and update DOM', async () => {
            await app.init();
            
            const languageManager = app.getModule('languageManager');

            // Change to French
            await languageManager.setLanguage('fr');

            // Verify language is set
            expect(languageManager.getCurrentLanguage()).toBe('fr');
            expect(document.documentElement.lang).toBe('fr');

            // Verify elements with data-i18n are updated
            const translatedElements = document.querySelectorAll('[data-i18n]');
            expect(translatedElements.length).toBeGreaterThan(0);
        });

        test('should handle language switching sequence', async () => {
            await app.init();
            
            const languageManager = app.getModule('languageManager');

            const languages = ['en', 'fr', 'de', 'es'];

            for (const lang of languages) {
                await languageManager.setLanguage(lang);
                expect(languageManager.getCurrentLanguage()).toBe(lang);
                expect(document.documentElement.lang).toBe(lang);
            }
        });

        test('should fallback to English for unsupported languages', async () => {
            await app.init();
            
            const languageManager = app.getModule('languageManager');

            // Try unsupported language
            await languageManager.setLanguage('xyz');

            // Should fallback to English
            expect(languageManager.getCurrentLanguage()).toBe('en');
        });
    });

    describe('User Profile Settings', () => {
        test('should apply senior profile settings', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Set senior profile
            settingsManager.setSetting('userProfile', 'senior');
            await settingsManager.applyProfileSettings('senior');

            // Verify senior-friendly settings
            expect(settingsManager.getSetting('fontSize')).toBe('large');
            expect(settingsManager.getSetting('buttonSize')).toBe('extra-large');
            expect(settingsManager.getSetting('reducedMotion')).toBe(true);
        });

        test('should apply student profile settings', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Set student profile
            settingsManager.setSetting('userProfile', 'student');
            await settingsManager.applyProfileSettings('student');

            // Verify student-friendly settings
            expect(settingsManager.getSetting('animations')).toBe(true);
            expect(settingsManager.getSetting('theme')).toMatch(/neon-glow|retro-arcade|nature-forest/);
        });

        test('should handle profile switching', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Switch from senior to student
            await settingsManager.applyProfileSettings('senior');
            expect(settingsManager.getSetting('fontSize')).toBe('large');

            await settingsManager.applyProfileSettings('student');
            expect(settingsManager.getSetting('animations')).toBe(true);
        });
    });

    describe('Accessibility Settings', () => {
        test('should toggle high contrast mode', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');
            const checkbox = document.getElementById('high-contrast-toggle');

            // Enable high contrast
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('highContrast')).toBe(true);
            expect(document.body.classList.contains('high-contrast')).toBe(true);

            // Disable high contrast
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('highContrast')).toBe(false);
            expect(document.body.classList.contains('high-contrast')).toBe(false);
        });

        test('should toggle reduced motion', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');
            const checkbox = document.getElementById('reduced-motion-toggle');

            // Enable reduced motion
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('reducedMotion')).toBe(true);
            expect(document.body.classList.contains('reduce-motion')).toBe(true);
        });

        test('should respect system preferences', async () => {
            // Mock system preferences
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: query.includes('prefers-reduced-motion: reduce'),
                    media: query,
                    onchange: null,
                    addListener: jest.fn(),
                    removeListener: jest.fn(),
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn(),
                })),
            });

            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Should detect system preference
            expect(settingsManager.getSetting('reducedMotion')).toBe(true);
        });
    });

    describe('Game Settings', () => {
        test('should toggle sound effects', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');
            const checkbox = document.getElementById('sound-toggle');

            // Disable sound
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('sound')).toBe(false);

            // Enable sound
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('sound')).toBe(true);
        });

        test('should toggle animations', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');
            const checkbox = document.getElementById('animations-toggle');

            // Disable animations
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));

            expect(settingsManager.getSetting('animations')).toBe(false);
            expect(document.body.classList.contains('no-animations')).toBe(true);
        });
    });

    describe('Settings Persistence', () => {
        test('should save settings to localStorage', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Change multiple settings
            settingsManager.setSetting('theme', 'dark');
            settingsManager.setSetting('language', 'fr');
            settingsManager.setSetting('fontSize', 'large');
            settingsManager.setSetting('sound', false);

            // Save settings
            settingsManager.saveAllSettings();

            // Verify in localStorage
            expect(localStorage.getItem('lingoquest_theme')).toBe('dark');
            expect(localStorage.getItem('lingoquest_language')).toBe('fr');
            expect(localStorage.getItem('lingoquest_fontSize')).toBe('large');
            expect(localStorage.getItem('lingoquest_sound')).toBe('false');
        });

        test('should restore settings from localStorage', async () => {
            // Pre-populate localStorage
            localStorage.setItem('lingoquest_theme', 'neon-glow');
            localStorage.setItem('lingoquest_language', 'de');
            localStorage.setItem('lingoquest_fontSize', 'extra-large');

            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Settings should be restored
            expect(settingsManager.getSetting('theme')).toBe('neon-glow');
            expect(settingsManager.getSetting('language')).toBe('de');
            expect(settingsManager.getSetting('fontSize')).toBe('extra-large');
        });

        test('should handle corrupted settings gracefully', async () => {
            // Add corrupted data
            localStorage.setItem('lingoquest_theme', 'invalid-json{');
            localStorage.setItem('lingoquest_settings', 'corrupted-data');

            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Should use defaults
            expect(settingsManager.getSetting('theme')).toBe('light');
        });
    });

    describe('Settings UI Interaction', () => {
        test('should update UI when theme select changes', async () => {
            await app.init();
            
            const themeSelect = document.getElementById('theme-select');

            // Change theme via UI
            themeSelect.value = 'dark';
            themeSelect.dispatchEvent(new Event('change'));

            // Verify theme is applied
            expect(document.body.getAttribute('data-theme')).toBe('dark');
        });

        test('should update UI when language select changes', async () => {
            await app.init();
            
            const languageSelect = document.getElementById('language-select');

            // Change language via UI
            languageSelect.value = 'fr';
            languageSelect.dispatchEvent(new Event('change'));

            // Verify language is applied
            expect(document.documentElement.lang).toBe('fr');
        });

        test('should sync UI with programmatic changes', async () => {
            await app.init();
            
            const themeManager = app.getModule('themeManager');
            const themeSelect = document.getElementById('theme-select');

            // Change theme programmatically
            await themeManager.setTheme('retro-arcade');

            // UI should update
            expect(themeSelect.value).toBe('retro-arcade');
        });
    });

    describe('Settings Validation', () => {
        test('should validate theme values', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Valid theme
            const validResult = settingsManager.validateSetting('theme', 'dark');
            expect(validResult.isValid).toBe(true);

            // Invalid theme
            const invalidResult = settingsManager.validateSetting('theme', 'invalid');
            expect(invalidResult.isValid).toBe(false);
        });

        test('should validate language values', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Valid language
            const validResult = settingsManager.validateSetting('language', 'fr');
            expect(validResult.isValid).toBe(true);

            // Invalid language
            const invalidResult = settingsManager.validateSetting('language', 'xyz');
            expect(invalidResult.isValid).toBe(false);
        });
    });

    describe('Settings Export/Import', () => {
        test('should export settings correctly', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            // Set some settings
            settingsManager.setSetting('theme', 'dark');
            settingsManager.setSetting('language', 'fr');
            settingsManager.setSetting('sound', false);

            // Export settings
            const exportedSettings = settingsManager.exportSettings();

            expect(exportedSettings).toMatchObject({
                theme: 'dark',
                language: 'fr',
                sound: false,
                version: expect.any(String),
                exportDate: expect.any(String)
            });
        });

        test('should import settings correctly', async () => {
            await app.init();
            
            const settingsManager = app.getModule('settingsManager');

            const importData = {
                theme: 'neon-glow',
                language: 'de',
                fontSize: 'large',
                sound: false,
                version: '1.0.0'
            };

            // Import settings
            const result = await settingsManager.importSettings(importData);

            expect(result.success).toBe(true);
            expect(settingsManager.getSetting('theme')).toBe('neon-glow');
            expect(settingsManager.getSetting('language')).toBe('de');
            expect(settingsManager.getSetting('fontSize')).toBe('large');
        });
    });
});

// Helper functions for settings testing
function createMockLocalStorage() {
    const store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = String(value);
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            Object.keys(store).forEach(key => delete store[key]);
        }),
        length: 0,
        key: jest.fn()
    };
}

function mockCSSProperties() {
    // Mock CSS custom property support
    Object.defineProperty(document.documentElement.style, 'setProperty', {
        value: jest.fn(),
        writable: true
    });

    Object.defineProperty(window, 'getComputedStyle', {
        value: jest.fn(() => ({
            getPropertyValue: jest.fn((prop) => {
                const mockValues = {
                    '--background-color': '#121212',
                    '--text-color': '#ffffff',
                    '--primary-color': '#007bff'
                };
                return mockValues[prop] || '';
            })
        })),
        writable: true
    });
}

// Mock event system for testing
const createMockEvent = (type, data = {}) => {
    const event = new Event(type);
    Object.assign(event, data);
    return event;
};

// Export test utilities
export {
    createMockLocalStorage,
    mockCSSProperties,
    createMockEvent
};





