

/**
 * Purpose: Main application entry point for LingoQuest PWA initialization
 * Key features: Module orchestration, error handling, lifecycle management, PWA registration
 * Dependencies: All core modules, settings modules, game modules, service worker
 * Related helpers: Module coordination, event system, storage management, error handling
 * Function names: init, initializeCore, initializeSettings, initializeGame, registerServiceWorker
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:00 | File: js/main.js
 */

/*
import { ComponentLoader } from './modules/core/componentLoader.js';
import { EventManager } from './modules/core/eventManager.js';
import { UIManager } from './modules/core/uiManager.js';
import { StorageManager } from './modules/core/storageManager.js';
import { ThemeManager } from './modules/settings/themeManager.js';
import { LanguageManager } from './modules/settings/languageManager.js';
import { SettingsManager } from './modules/settings/settingsManager.js';
import { GameLogic } from './modules/game/gameLogic.js';
import { GameStateManager } from './modules/game/gameStateManager.js';
import { ScoreCalculator } from './modules/game/scoreCalculator.js';
*/

/* ✅ FIXED IMPORTS - Using default imports instead of named imports
*/


import ComponentLoader from './modules/core/componentLoader.js';
import EventManager from './modules/core/eventManager.js';
import UIManager from './modules/core/uiManager.js';
import StorageManager from './modules/core/storageManager.js';
import ThemeManager from './modules/settings/themeManager.js';
import LanguageManager from './modules/settings/languageManager.js';
import SettingsManager from './modules/settings/settingsManager.js';
import GameLogic from './modules/game/gameLogic.js';
import GameStateManager from './modules/game/gameStateManager.js';
import ScoreCalculator from './modules/game/scoreCalculator.js';
import MCQGenerator from './modules/game/mcqGenerator.js';




class LingoQuestApp {
    constructor() {
        this.isInitialized = false;
        this.modules = new Map();
        this.startTime = Date.now();
        this.initializationSteps = [];
        this.startScreen = 'home-screen';

        // Bind methods to preserve context
        this.handleError = this.handleError.bind(this);
        this.handleUnload = this.handleUnload.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    determineStartScreen() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('tools')) {
            this.startScreen = 'tools-screen';
        } else {
            this.startScreen = 'home-screen';
        }
    }
    
    async init() {
        try {
            console.log('🚀 LingoQuest initializing...');
            this.logStep('Application startup');

            // Determine which screen to show first based on URL params
            this.determineStartScreen();
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize modules in correct order
            await this.initializeCore();
            await this.initializeSettings();
            await this.initializeGame();
            await this.initializeUI();

            // Set up DOM event listeners now that UI is ready
            const eventManager = this.modules.get('eventManager');
            if (eventManager && eventManager.setupEventListeners) {
                eventManager.setupEventListeners(this);
            }
            
            // Setup global event listeners
            this.setupGlobalListeners();
            
            // Load saved user preferences
            await this.loadUserPreferences();
            
            // Register service worker
            await this.registerServiceWorker();
            
            // Hide loading screen and show app
            this.hideLoadingScreen();
            
            this.isInitialized = true;
            const initTime = Date.now() - this.startTime;
            console.log(`✅ LingoQuest initialized in ${initTime}ms`);
            this.logStep(`Initialization completed in ${initTime}ms`);
            
            // Trigger app ready event
            const eventManager = this.modules.get('eventManager');
            if (eventManager) {
                eventManager.emit('app:ready', { 
                    initTime,
                    steps: this.initializationSteps
                });
            }
            
        } catch (error) {
            this.handleError(error, 'Application initialization failed');
            this.showErrorScreen(error);
        }
    }
    
    async initializeCore() {
        console.log('🔧 Initializing core modules...');
        this.logStep('Starting core module initialization');
        
        try {
            // 1. Event Manager - must be first (communication system)
            console.log('📡 Initializing EventManager...');
            const eventManager = new EventManager();
            this.modules.set('eventManager', eventManager);
            this.logStep('EventManager initialized');
            
            // 2. Storage Manager - second (data persistence)
            console.log('💾 Initializing StorageManager...');
            const storageManager = new StorageManager();
            await storageManager.init();
            this.modules.set('storageManager', storageManager);
            this.logStep('StorageManager initialized');
            
            // 3. Component Loader - third (HTML component loading)
            console.log('📄 Initializing ComponentLoader...');
            const componentLoader = new ComponentLoader();
            await componentLoader.init();
            this.modules.set('componentLoader', componentLoader);
            this.logStep('ComponentLoader initialized');
            
            // 4. UI Manager - fourth (depends on eventManager and componentLoader)
            console.log('🎨 Initializing UIManager...');
            const uiManager = new UIManager(eventManager, componentLoader);
            await uiManager.init();
            this.modules.set('uiManager', uiManager);
            this.logStep('UIManager initialized');
            
            console.log('✅ Core modules initialized successfully');
            
        } catch (error) {
            console.error('❌ Core module initialization failed:', error);
            throw new Error(`Core initialization failed: ${error.message}`);
        }
    }
    
    async initializeSettings() {
        console.log('⚙️ Initializing settings modules...');
        this.logStep('Starting settings module initialization');
        
        try {
            const eventManager = this.modules.get('eventManager');
            const storageManager = this.modules.get('storageManager');
            
            // Validate required core modules
            if (!eventManager) {
                throw new Error('EventManager not found - core initialization failed');
            }
            if (!storageManager) {
                throw new Error('StorageManager not found - core initialization failed');
            }
            
            // 1. Theme Manager
            console.log('🎨 Initializing ThemeManager...');
            const themeManager = new ThemeManager(eventManager, storageManager);
            await themeManager.init();
            this.modules.set('themeManager', themeManager);
            this.logStep('ThemeManager initialized');
            
            // 2. Language Manager
            console.log('🌐 Initializing LanguageManager...');
            const languageManager = new LanguageManager(eventManager, storageManager);
            await languageManager.init();
            this.modules.set('languageManager', languageManager);
            this.logStep('LanguageManager initialized');
            
            // 3. Settings Manager - coordinates all settings
            console.log('⚙️ Initializing SettingsManager...');
            const settingsManager = new SettingsManager({
                eventManager,
                storageManager,
                themeManager,
                languageManager
            });
            await settingsManager.init();
            this.modules.set('settingsManager', settingsManager);
            this.logStep('SettingsManager initialized');
            
            console.log('✅ Settings modules initialized successfully');
            
        } catch (error) {
            console.error('❌ Settings module initialization failed:', error);
            throw new Error(`Settings initialization failed: ${error.message}`);
        }
    }
    
    async initializeGame() {
        console.log('🎮 Initializing game modules...');
        this.logStep('Starting game module initialization');
        
        try {
            const eventManager = this.modules.get('eventManager');
            const storageManager = this.modules.get('storageManager');
            
            // Validate required modules
            if (!eventManager || !storageManager) {
                throw new Error('Required core modules not found for game initialization');
            }
            
            // 1. Score Calculator
            console.log('📊 Initializing ScoreCalculator...');
            const scoreCalculator = new ScoreCalculator(eventManager, storageManager);
            await scoreCalculator.init();
            this.modules.set('scoreCalculator', scoreCalculator);
            this.logStep('ScoreCalculator initialized');
            
            // 2. Game State Manager
            console.log('🎯 Initializing GameStateManager...');
            const gameStateManager = new GameStateManager(eventManager, storageManager);
            await gameStateManager.init();
            this.modules.set('gameStateManager', gameStateManager);
            this.logStep('GameStateManager initialized');
            
            // 3. Game Logic - main game controller
            console.log('🎲 Initializing GameLogic...');
            const gameLogic = new GameLogic({
                eventManager,
                storageManager,
                gameStateManager,
                scoreCalculator
            });
            await gameLogic.init();
            this.modules.set('gameLogic', gameLogic);
            this.logStep('GameLogic initialized');

            // 4. MCQ Generator - question generation
            console.log('📝 Initializing MCQGenerator...');
            const mcqGenerator = new MCQGenerator();
            await mcqGenerator.init();
            this.modules.set('mcqGenerator', mcqGenerator);
            this.logStep('MCQGenerator initialized');
            
            console.log('✅ Game modules initialized successfully');
            
        } catch (error) {
            console.error('❌ Game module initialization failed:', error);
            throw new Error(`Game initialization failed: ${error.message}`);
        }
    }
    
    async initializeUI() {
        console.log('🖥️ Initializing UI...');
        this.logStep('Starting UI initialization');
        
        try {
            const uiManager = this.modules.get('uiManager');
            const themeManager = this.modules.get('themeManager');
            const languageManager = this.modules.get('languageManager');
            
            // Validate required modules
            if (!uiManager || !themeManager || !languageManager) {
                throw new Error('Required modules not found for UI initialization');
            }
            
            // Apply saved theme
            console.log('🎨 Applying current theme...');
            await themeManager.applyCurrentTheme();
            this.logStep('Theme applied');
            
            // Apply saved language
            console.log('🌐 Applying current language...');
            await languageManager.applyCurrentLanguage();
            this.logStep('Language applied');
            
            // Show initial screen based on URL parameters
            console.log(`🏠 Showing ${this.startScreen}...`);
            await uiManager.showScreen(this.startScreen);
            this.logStep(`${this.startScreen} displayed`);
            
            console.log('✅ UI initialized successfully');
            
        } catch (error) {
            console.error('❌ UI initialization failed:', error);
            throw new Error(`UI initialization failed: ${error.message}`);
        }
    }
    
    setupGlobalListeners() {
        console.log('👂 Setting up global event listeners...');
        
        try {
            // Error handling
            window.addEventListener('error', this.handleError);
            window.addEventListener('unhandledrejection', this.handleError);
            
            // App lifecycle
            window.addEventListener('beforeunload', this.handleUnload);
            document.addEventListener('visibilitychange', this.handleVisibilityChange);
            
            // Custom app events
            const eventManager = this.modules.get('eventManager');
            if (eventManager) {
                eventManager.on('app:error', this.handleError);
                eventManager.on('game:start', this.handleGameStart.bind(this));
                eventManager.on('settings:changed', this.handleSettingsChanged.bind(this));
                eventManager.on('theme:changed', this.handleThemeChanged.bind(this));
            }
            
            this.logStep('Global listeners configured');
            
        } catch (error) {
            console.warn('⚠️ Some global listeners could not be set up:', error);
        }
    }
    
    async loadUserPreferences() {
        console.log('👤 Loading user preferences...');
        
        try {
            const settingsManager = this.modules.get('settingsManager');
            if (settingsManager) {
                await settingsManager.loadAllSettings();
                this.logStep('User preferences loaded');
            }
        } catch (error) {
            console.warn('⚠️ Failed to load user preferences:', error);
        }
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                console.log('🔄 Registering service worker...');
                const basePath = window.location.pathname.replace(/[^/]+$/, '');
                const registration = await navigator.serviceWorker.register(`${basePath}sw.js`);
                console.log('✅ Service Worker registered:', registration.scope);
                
                const eventManager = this.modules.get('eventManager');
                if (eventManager) {
                    eventManager.emit('sw:registered', { registration });
                }
                
                this.logStep('Service Worker registered');
                
            } catch (error) {
                console.warn('❌ Service Worker registration failed:', error);
                this.logStep('Service Worker registration failed');
            }
        } else {
            console.log('ℹ️ Service Worker not supported');
            this.logStep('Service Worker not supported');
        }
    }
    
    showLoadingScreen() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
            loadingOverlay.setAttribute('aria-hidden', 'false');
        }
    }
    
    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
            loadingOverlay.setAttribute('aria-hidden', 'true');
        }
    }
    
    showErrorScreen(error) {
        console.error('💥 Showing error screen for:', error);
        
        // Create error screen if it doesn't exist
        let errorScreen = document.getElementById('error-screen');
        if (!errorScreen) {
            errorScreen = document.createElement('div');
            errorScreen.id = 'error-screen';
            errorScreen.innerHTML = `
                <div class="error-content">
                    <h1>⚠️ Application Error</h1>
                    <p>LingoQuest encountered an error during initialization.</p>
                    <details>
                        <summary>Error Details</summary>
                        <pre>${error.message}</pre>
                        <pre>${error.stack}</pre>
                    </details>
                    <button onclick="window.location.reload()">🔄 Reload App</button>
                </div>
            `;
            errorScreen.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                font-family: system-ui, sans-serif;
                text-align: center;
                padding: 20px;
            `;
            document.body.appendChild(errorScreen);
        }
        
        // Hide loading screen
        this.hideLoadingScreen();
    }
    
    handleError(error, context = 'Unknown') {
        console.error(`❌ LingoQuest Error [${context}]:`, error);
        
        // Log error for debugging
        this.logStep(`Error: ${context} - ${error.message}`);
        
        // Show user-friendly error message
        this.showErrorMessage(error, context);
    }
    
    showErrorMessage(error, context) {
        const message = error.message || 'An unexpected error occurred';
        
        // Try to show toast if UI is available
        const uiManager = this.modules.get('uiManager');
        if (uiManager && uiManager.showToast) {
            uiManager.showToast({
                type: 'error',
                title: 'Error',
                message: `${context}: ${message}`,
                duration: 5000
            });
        } else {
            // Fallback to alert
            alert(`Error in ${context}: ${message}`);
        }
    }
    
    handleUnload(event) {
        console.log('💾 App unloading, saving state...');
        
        try {
            // Save current game state
            const gameStateManager = this.modules.get('gameStateManager');
            if (gameStateManager) {
                gameStateManager.saveCurrentState();
            }
            
            // Save settings
            const settingsManager = this.modules.get('settingsManager');
            if (settingsManager) {
                settingsManager.saveAllSettings();
            }
            
        } catch (error) {
            console.warn('⚠️ Error during app unload:', error);
        }
    }
    
    handleVisibilityChange() {
        const eventManager = this.modules.get('eventManager');
        if (!eventManager) return;

        if (document.hidden) {
            console.log('⏸️ App hidden, pausing...');
            eventManager.emit('app:hidden');
        } else {
            console.log('▶️ App visible, resuming...');
            eventManager.emit('app:visible');
        }
    }

    async startGame(mode = 'easy', gameType = 'classic') {
        const uiManager = this.modules.get('uiManager');
        const gameStateManager = this.modules.get('gameStateManager');
        const mcqGenerator = this.modules.get('mcqGenerator');
        const gameLogic = this.modules.get('gameLogic');
        const scoreCalculator = this.modules.get('scoreCalculator');
        const eventManager = this.modules.get('eventManager');

        if (!uiManager || !gameStateManager || !mcqGenerator || !gameLogic || !scoreCalculator) {
            console.error('Missing modules for starting game');
            return;
        }

        try {
            uiManager.showLoading('Starting game...');
            await gameStateManager.initializeGame(mode, gameType);

            const questions = await mcqGenerator.generateQuestions(
                gameStateManager.getTotalQuestions(),
                mode,
                gameType
            );

            gameStateManager.setQuestions(questions);
            scoreCalculator.startGame(gameType, mode);

            uiManager.hideLoading();
            uiManager.showScreen('game-screen');

            gameLogic.setupGameScreen(gameStateManager.getGameState());
            gameLogic.loadNextQuestion(gameStateManager.getGameState());

            if (eventManager) {
                eventManager.emit('game:start', { mode, gameType });
            }
        } catch (error) {
            console.error('Failed to start game:', error);
            uiManager.hideLoading();
            uiManager.showToast('Failed to start game. Please try again.', 'error');
        }
    }
    
    handleGameStart(data) {
        console.log('🎮 Game starting:', data);

        const uiManager = this.modules.get('uiManager');
        if (uiManager) {
            uiManager.showScreen('game-screen');
        }
    }
    
    handleSettingsChanged(data) {
        console.log('⚙️ Settings changed:', data);
        
        const settingsManager = this.modules.get('settingsManager');
        if (settingsManager) {
            settingsManager.applySettings(data);
        }
    }
    
    handleThemeChanged(data) {
        console.log('🎨 Theme changed:', data);
        
        const themeManager = this.modules.get('themeManager');
        if (themeManager) {
            themeManager.applyTheme(data.theme);
        }
    }
    
    // Utility methods
    logStep(step) {
        const timestamp = Date.now() - this.startTime;
        this.initializationSteps.push({ step, timestamp });
        console.log(`📝 [${timestamp}ms] ${step}`);
    }
    
    getModule(name) {
        return this.modules.get(name);
    }

    // Convenience getters for modules used by EventManager and others
    getUIManager() {
        return this.modules.get('uiManager');
    }

    getGameLogic() {
        return this.modules.get('gameLogic');
    }

    getGameStateManager() {
        return this.modules.get('gameStateManager');
    }

    getSettingsManager() {
        return this.modules.get('settingsManager');
    }

    getThemeManager() {
        return this.modules.get('themeManager');
    }

    getLanguageManager() {
        return this.modules.get('languageManager');
    }
    
    getInitializationReport() {
        return {
            isInitialized: this.isInitialized,
            totalTime: Date.now() - this.startTime,
            steps: this.initializationSteps,
            modules: Array.from(this.modules.keys())
        };
    }
    
    async restart() {
        console.log('🔄 Restarting LingoQuest...');
        
        try {
            // Destroy current modules
            for (const [name, module] of this.modules) {
                if (module.destroy) {
                    await module.destroy();
                }
            }
            
            this.modules.clear();
            this.isInitialized = false;
            this.initializationSteps = [];
            this.startTime = Date.now();
            
            // Reinitialize
            await this.init();
            
        } catch (error) {
            console.error('❌ Failed to restart app:', error);
            this.handleError(error, 'Application restart failed');
        }
    }
    
    async destroy() {
        console.log('🛑 Destroying LingoQuest...');
        
        try {
            // Remove global listeners
            window.removeEventListener('error', this.handleError);
            window.removeEventListener('beforeunload', this.handleUnload);
            document.removeEventListener('visibilitychange', this.handleVisibilityChange);
            
            // Destroy all modules
            for (const [name, module] of this.modules) {
                if (module.destroy) {
                    await module.destroy();
                }
            }
            
            this.modules.clear();
            this.isInitialized = false;
            
        } catch (error) {
            console.error('❌ Error during app destruction:', error);
        }
    }
}

// Global app instance
let app = null;

// Handle direct links such as ?tools
function handleDirectLinks() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('tools')) {
        const uiManager = app?.getModule('uiManager');
        if (uiManager) {
            uiManager.showScreen('tools-screen');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        app = new LingoQuestApp();
        await app.init();
        
        // Make app globally accessible for debugging
        window.LingoQuest = app;
        
        // Add debug helpers
        window.LingoQuest.debug = {
            getModules: () => Array.from(app.modules.keys()),
            getModule: (name) => app.modules.get(name),
            getReport: () => app.getInitializationReport(),
            restart: () => app.restart()
        };

        // Show screen based on query parameters
        handleDirectLinks();

    } catch (error) {
        console.error('💥 Failed to initialize LingoQuest:', error);
        
        // Show basic error message
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
                <div style="text-align: center; max-width: 500px; padding: 20px;">
                    <h1>⚠️ LingoQuest Failed to Load</h1>
                    <p>There was an error initializing the application.</p>
                    <details style="margin: 20px 0; text-align: left;">
                        <summary>Error Details</summary>
                        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error.message}</pre>
                    </details>
                    <button onclick="window.location.reload()" style="padding: 12px 24px; font-size: 16px; cursor: pointer;">
                        🔄 Reload Page
                    </button>
                </div>
            </div>
        `;
    }
});

// Export for testing
export { LingoQuestApp };


