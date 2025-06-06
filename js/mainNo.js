


// Main application entry point
import ComponentLoader from './modules/core/componentLoader.js';
import ThemeManager from './modules/settings/themeManager.js';
import LanguageManager from './modules/settings/languageManager.js';
import SettingsManager from './modules/settings/settingsManager.js';
import StorageManager from './modules/core/storageManager.js';
import GameLogic from './modules/game/gameLogic.js';
import MCQGenerator from './modules/game/mcqGenerator.js';
import EventManager from './modules/core/eventManager.js';
import UIManager from './modules/core/uiManager.js';
import GameStateManager from './modules/game/gameStateManager.js';

class LingoQuestApp {
    constructor() {
        // Initialize all managers
        this.componentLoader = new ComponentLoader();
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager();
        this.settingsManager = new SettingsManager();
        this.storageManager = new StorageManager();
        this.gameLogic = new GameLogic();
        this.mcqGenerator = new MCQGenerator();
        this.eventManager = new EventManager();
        this.uiManager = new UIManager();
        this.gameStateManager = new GameStateManager();
        
        this.currentScreen = 'home-screen';
        this.isInitialized = false;
    }

    async init() {
        try {
            this.uiManager.showLoading('Initializing LingoQuest...');
            
            // Load all components
            await this.componentLoader.loadAllComponents();
            this.uiManager.updateLoadingProgress(25, 'Components loaded...');

            // Initialize managers
            await this.initializeManagers();
            this.uiManager.updateLoadingProgress(50, 'Settings loaded...');

            // Setup event listeners
            this.eventManager.setupEventListeners(this);
            this.uiManager.updateLoadingProgress(75, 'Setting up interface...');

            // Apply saved settings
            await this.applySettings();
            this.uiManager.updateLoadingProgress(90, 'Applying preferences...');

            // Register service worker
            await this.registerServiceWorker();
            this.uiManager.updateLoadingProgress(100, 'Ready to play!');

            // Hide loading and show app
            setTimeout(() => {
                this.uiManager.hideLoading();
                this.uiManager.showScreen('home-screen');
                this.currentScreen = 'home-screen';
                this.isInitialized = true;
            }, 500);

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.uiManager.showError('Failed to load LingoQuest. Please refresh the page.');
        }
    }

    async initializeManagers() {
        // Initialize storage first
        await this.storageManager.init();
        
        // Initialize other managers with dependencies
        await this.themeManager.init();
        await this.languageManager.init();
        await this.settingsManager.init();
        await this.gameLogic.init();
        await this.mcqGenerator.init();
        await this.gameStateManager.init();
        await this.uiManager.init();
    }

    // Game control methods
    async startGame(mode, gameType) {
        try {
            this.uiManager.showLoading('Starting game...');
            
            // Initialize game state
            await this.gameStateManager.initializeGame(mode, gameType);

            // Generate questions
            const questions = await this.mcqGenerator.generateQuestions(
                this.gameStateManager.getTotalQuestions(),
                mode,
                gameType
            );
            
            this.gameStateManager.setQuestions(questions);

            this.uiManager.hideLoading();
            this.uiManager.showScreen('game-screen');
            this.currentScreen = 'game-screen';
            
            this.gameLogic.setupGameScreen(this.gameStateManager.getGameState());
            this.gameLogic.loadNextQuestion(this.gameStateManager.getGameState());

        } catch (error) {
            console.error('Failed to start game:', error);
            this.uiManager.hideLoading();
            this.uiManager.showToast('Failed to start game. Please try again.', 'error');
        }
    }

    async applySettings() {
        const savedSettings = await this.settingsManager.getAllSettings();
        
        if (savedSettings.theme) {
            this.themeManager.setTheme(savedSettings.theme);
        }
        
        if (savedSettings.language) {
            this.languageManager.setLanguage(savedSettings.language);
        }
        
        Object.keys(savedSettings).forEach(key => {
            this.settingsManager.applySetting(key, savedSettings[key]);
        });
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./sw.js');
                console.log('SW registered: ', registration);
            } catch (registrationError) {
                console.log('SW registration failed: ', registrationError);
            }
        }
    }

    // Getter methods for managers
    getGameState() {
        return this.gameStateManager.getGameState();
    }

    getUIManager() {
        return this.uiManager;
    }

    getGameLogic() {
        return this.gameLogic;
    }

    getGameStateManager() {
        return this.gameStateManager;
    }

    getSettingsManager() {
        return this.settingsManager;
    }

    getThemeManager() {
        return this.themeManager;
    }

    getLanguageManager() {
        return this.languageManager;
    }
}

// Initialize and start the application
document.addEventListener('DOMContentLoaded', async () => {
    const app = new LingoQuestApp();
    
    // Make app globally available for debugging
    window.LingoQuest = app;
    
    try {
        await app.init();
    } catch (error) {
        console.error('Failed to start LingoQuest:', error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h1>LingoQuest</h1>
                <p>Failed to load the application. Please refresh the page.</p>
                <button onclick="location.reload()" style="padding: 10px 20px; font-size: 16px;">
                    Refresh Page
                </button>
            </div>
        `;
    }
});

export default LingoQuestApp;


