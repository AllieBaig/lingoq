





/**
 * Purpose: Integration tests for complete game flow scenarios
 * Key features: End-to-end game testing, user journey validation, cross-module integration
 * Dependencies: Jest, DOM testing utilities, game modules, mock data
 * Related helpers: Test utilities, game state mocking, UI interaction simulation
 * Function names: testCompleteGameFlow, testGameModeTransitions, testScoreCalculation
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: test/integration/gameFlow.test.js
 */

import { jest } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { LingoQuestApp } from '../../js/main.js';

// Mock modules for testing
jest.mock('../../js/modules/core/componentLoader.js');
jest.mock('../../js/modules/settings/themeManager.js');
jest.mock('../../js/modules/game/mcqGenerator.js');

describe('Game Flow Integration Tests', () => {
    let app;
    let dom;
    let document;
    let window;

    beforeEach(async () => {
        // Setup DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>LingoQuest Test</title>
            </head>
            <body>
                <div id="app">
                    <div id="header-container"></div>
                    <main class="main-content">
                        <div id="home-screen-container"></div>
                        <div id="game-screen-container"></div>
                        <div id="results-screen-container"></div>
                        <div id="settings-screen-container"></div>
                        <div id="instructions-screen-container"></div>
                    </main>
                    <div id="loading-overlay-container"></div>
                    <div id="toast-container-element"></div>
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
        global.localStorage = dom.window.localStorage;

        // Mock fetch for component loading
        global.fetch = jest.fn().mockImplementation((url) => {
            const mockComponents = {
                '/components/header.html': '<header><h1>LingoQuest</h1></header>',
                '/components/home-screen.html': '<section id="home-screen"><div class="game-modes"></div></section>',
                '/components/game-screen.html': '<section id="game-screen"><div class="question-container"></div></section>',
                '/components/results-screen.html': '<section id="results-screen"><div class="final-score"></div></section>'
            };

            const content = mockComponents[url] || '<div>Mock Component</div>';
            return Promise.resolve({
                ok: true,
                text: () => Promise.resolve(content)
            });
        });

        // Initialize app
        app = new LingoQuestApp();
        document = global.document;
        window = global.window;
    });

    afterEach(() => {
        if (app && app.destroy) {
            app.destroy();
        }
        jest.clearAllMocks();
    });

    describe('Complete Game Flow', () => {
        test('should complete a full classic easy game session', async () => {
            // Initialize app
            await app.init();

            // Verify app is initialized
            expect(app.isInitialized).toBe(true);

            // Start game
            await app.startGame('easy', 'classic');

            // Get game state manager
            const gameStateManager = app.getModule('gameStateManager');
            expect(gameStateManager).toBeDefined();

            // Verify game state is initialized
            const gameState = gameStateManager.getGameState();
            expect(gameState).toMatchObject({
                mode: 'easy',
                gameType: 'classic',
                currentQuestion: 0,
                totalQuestions: 20,
                score: 0
            });

            // Simulate answering questions
            const mcqGenerator = app.getModule('mcqGenerator');
            const mockQuestions = generateMockQuestions(5);
            gameStateManager.setQuestions(mockQuestions);

            // Answer first question correctly
            const scoreCalculator = app.getModule('scoreCalculator');
            let scoreData = await scoreCalculator.calculateScore('correct', mockQuestions[0]);
            
            expect(scoreData.isCorrect).toBe(true);
            expect(scoreData.totalQuestionScore).toBeGreaterThan(0);

            // Answer second question incorrectly
            scoreData = await scoreCalculator.calculateScore('incorrect', mockQuestions[1]);
            
            expect(scoreData.isCorrect).toBe(false);
            expect(scoreData.totalQuestionScore).toBe(0);

            // Complete remaining questions
            for (let i = 2; i < mockQuestions.length; i++) {
                await scoreCalculator.calculateScore('correct', mockQuestions[i]);
            }

            // Get final score summary
            const summary = scoreCalculator.getGameSummary();
            expect(summary).toMatchObject({
                totalAnswered: mockQuestions.length,
                correctAnswers: 4,
                accuracy: 80
            });
        });

        test('should handle HollyBolly game mode with rewards', async () => {
            await app.init();

            // Start HollyBolly game
            await app.startGame('medium', 'hollybolly');

            const gameStateManager = app.getModule('gameStateManager');
            const gameState = gameStateManager.getGameState();

            expect(gameState).toMatchObject({
                mode: 'medium',
                gameType: 'hollybolly',
                totalQuestions: 15
            });

            // Mock movie questions
            const movieQuestions = generateMockMovieQuestions(3);
            gameStateManager.setQuestions(movieQuestions);

            // Simulate correct streak for rewards
            const scoreCalculator = app.getModule('scoreCalculator');
            
            // Answer 3 questions correctly to trigger rewards
            for (let i = 0; i < 3; i++) {
                const scoreData = await scoreCalculator.calculateScore('correct', movieQuestions[i]);
                expect(scoreData.isCorrect).toBe(true);
            }

            const summary = scoreCalculator.getGameSummary();
            expect(summary.maxStreak).toBe(3);
        });
    });

    describe('Screen Transitions', () => {
        test('should navigate between all screens correctly', async () => {
            await app.init();

            const uiManager = app.getModule('uiManager');
            expect(uiManager).toBeDefined();

            // Test home screen
            await uiManager.showScreen('home-screen');
            expect(uiManager.currentScreen).toBe('home-screen');

            // Test instructions screen
            await uiManager.showScreen('instructions-screen');
            expect(uiManager.currentScreen).toBe('instructions-screen');

            // Test settings screen
            await uiManager.showScreen('settings-screen');
            expect(uiManager.currentScreen).toBe('settings-screen');

            // Test game screen
            await uiManager.showScreen('game-screen');
            expect(uiManager.currentScreen).toBe('game-screen');

            // Test results screen
            await uiManager.showScreen('results-screen');
            expect(uiManager.currentScreen).toBe('results-screen');

            // Return to home
            await uiManager.showScreen('home-screen');
            expect(uiManager.currentScreen).toBe('home-screen');
        });

        test('should handle invalid screen transitions gracefully', async () => {
            await app.init();

            const uiManager = app.getModule('uiManager');
            
            // Try to navigate to non-existent screen
            await uiManager.showScreen('invalid-screen');
            
            // Should remain on current screen
            expect(uiManager.currentScreen).toBe('home-screen');
        });
    });

    describe('Settings Integration', () => {
        test('should apply theme changes across the application', async () => {
            await app.init();

            const themeManager = app.getModule('themeManager');
            const settingsManager = app.getModule('settingsManager');

            // Change theme
            await themeManager.setTheme('dark');
            expect(document.body.getAttribute('data-theme')).toBe('dark');

            // Verify settings are saved
            expect(settingsManager.getSetting('theme')).toBe('dark');

            // Change to student theme
            await themeManager.setTheme('neon-glow');
            expect(document.body.classList.contains('theme-neon-glow')).toBe(true);
        });

        test('should apply language changes throughout the app', async () => {
            await app.init();

            const languageManager = app.getModule('languageManager');
            
            // Change language
            await languageManager.setLanguage('fr');
            expect(languageManager.getCurrentLanguage()).toBe('fr');

            // Verify DOM updates
            expect(document.documentElement.lang).toBe('fr');
        });
    });

    describe('Error Handling', () => {
        test('should handle game initialization failures gracefully', async () => {
            // Mock a module to fail
            const mockGameLogic = app.getModule('gameLogic');
            if (mockGameLogic) {
                jest.spyOn(mockGameLogic, 'init').mockRejectedValue(new Error('Initialization failed'));
            }

            // App should handle the error without crashing
            await expect(app.init()).resolves.not.toThrow();
        });

        test('should handle question generation failures', async () => {
            await app.init();

            const mcqGenerator = app.getModule('mcqGenerator');
            jest.spyOn(mcqGenerator, 'generateQuestions').mockRejectedValue(new Error('Generation failed'));

            // Should handle gracefully
            await expect(app.startGame('easy', 'classic')).resolves.not.toThrow();
        });
    });

    describe('Performance Tests', () => {
        test('should initialize within acceptable time limits', async () => {
            const startTime = Date.now();
            await app.init();
            const initTime = Date.now() - startTime;

            // Should initialize within 2 seconds
            expect(initTime).toBeLessThan(2000);
        });

        test('should handle rapid screen transitions', async () => {
            await app.init();

            const uiManager = app.getModule('uiManager');
            const screens = ['home-screen', 'game-screen', 'results-screen', 'settings-screen'];

            // Rapidly switch between screens
            for (let i = 0; i < 10; i++) {
                const screen = screens[i % screens.length];
                await uiManager.showScreen(screen);
                expect(uiManager.currentScreen).toBe(screen);
            }
        });
    });

    describe('Data Persistence', () => {
        test('should save and restore game progress', async () => {
            await app.init();

            const gameStateManager = app.getModule('gameStateManager');
            const storageManager = app.getModule('storageManager');

            // Initialize a game
            await gameStateManager.initializeGame('medium', 'classic');
            
            // Simulate some progress
            const gameState = gameStateManager.getGameState();
            gameState.currentQuestion = 5;
            gameState.score = 150;

            // Save state
            gameStateManager.saveCurrentState();

            // Verify data was saved
            const savedState = storageManager.get('lingoquest_gameState');
            expect(savedState).toMatchObject({
                currentQuestion: 5,
                score: 150,
                mode: 'medium',
                gameType: 'classic'
            });
        });

        test('should save and restore user settings', async () => {
            await app.init();

            const settingsManager = app.getModule('settingsManager');
            
            // Change settings
            settingsManager.setSetting('theme', 'dark');
            settingsManager.setSetting('language', 'fr');
            settingsManager.setSetting('sound', false);

            // Save settings
            settingsManager.saveAllSettings();

            // Create new app instance to test persistence
            const newApp = new LingoQuestApp();
            await newApp.init();

            const newSettingsManager = newApp.getModule('settingsManager');
            
            // Verify settings were restored
            expect(newSettingsManager.getSetting('theme')).toBe('dark');
            expect(newSettingsManager.getSetting('language')).toBe('fr');
            expect(newSettingsManager.getSetting('sound')).toBe(false);

            await newApp.destroy();
        });
    });

    describe('Accessibility Integration', () => {
        test('should maintain accessibility during screen transitions', async () => {
            await app.init();

            const uiManager = app.getModule('uiManager');

            // Navigate to each screen and verify accessibility
            const screens = ['instructions-screen', 'game-screen', 'results-screen'];

            for (const screen of screens) {
                await uiManager.showScreen(screen);
                
                // Check that screen is properly announced
                const activeScreen = document.getElementById(screen);
                expect(activeScreen).toBeDefined();
                expect(activeScreen.classList.contains('active')).toBe(true);

                // Check for proper ARIA attributes
                expect(activeScreen.getAttribute('role') || activeScreen.tagName.toLowerCase()).toBeTruthy();
            }
        });
    });
});

// Helper functions for testing
function generateMockQuestions(count) {
    const questions = [];
    const categories = ['name', 'place', 'animal', 'thing'];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    for (let i = 0; i < count; i++) {
        const category = categories[i % categories.length];
        const letter = letters[i % letters.length];
        
        questions.push({
            id: `question_${i}`,
            type: 'classic',
            category,
            letter,
            text: `Choose a ${category} that starts with "${letter}"`,
            choices: [
                { text: `${letter}AnswerA`, correct: true, explanation: 'Correct!' },
                { text: `${letter}AnswerB`, correct: false, explanation: 'Try again!' },
                { text: `${letter}AnswerC`, correct: false, explanation: 'Try again!' }
            ]
        });
    }

    return questions;
}

function generateMockMovieQuestions(count) {
    const movies = [
        {
            title: 'Titanic',
            clues: { place: 'Ocean', animal: 'None', thing: 'Ship' }
        },
        {
            title: 'Avatar',
            clues: { place: 'Pandora', animal: 'Na\'vi', thing: 'Tree' }
        },
        {
            title: 'Frozen',
            clues: { place: 'Arendelle', animal: 'Reindeer', thing: 'Ice' }
        }
    ];

    return movies.slice(0, count).map((movie, i) => ({
        id: `movie_${i}`,
        type: 'hollybolly',
        text: 'Which movie matches these clues?',
        clues: movie.clues,
        choices: [
            { text: movie.title, correct: true, explanation: 'Correct!' },
            { text: 'Wrong Movie 1', correct: false, explanation: 'Try again!' },
            { text: 'Wrong Movie 2', correct: false, explanation: 'Try again!' }
        ]
    }));
}

// Mock implementations
const mockEventManager = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
};

const mockStorageManager = {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn()
};

const mockUIManager = {
    showScreen: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    showToast: jest.fn(),
    currentScreen: 'home-screen'
};

// Export for use in other test files
export {
    generateMockQuestions,
    generateMockMovieQuestions,
    mockEventManager,
    mockStorageManager,
    mockUIManager
};



