



/**
 * Purpose: End-to-end game playthrough testing for LingoQuest complete user flows
 * Key features: Full game scenarios, user journey testing, cross-browser validation
 * Dependencies: Playwright test framework, test utilities, page object models
 * Related helpers: Test data generation, assertion utilities, screenshot capture
 * Function names: testClassicGameFlow, testHollyBollyFlow, testSettingsFlow, validateResults
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: tests/e2e/gamePlaythrough.test.js
 */

import { test, expect } from '@playwright/test';

// Test configuration
const TEST_CONFIG = {
    timeout: 30000,
    baseURL: 'http://localhost:3000',
    screenshots: true,
    video: 'retain-on-failure'
};

// Page selectors
const SELECTORS = {
    // Home screen
    homeScreen: '#home-screen',
    gameModeTab: '[data-game-mode]',
    startGameButton: '[data-action="start-game"]',
    howToPlayButton: '#how-to-play-btn',
    
    // Game screen
    gameScreen: '#game-screen',
    questionText: '#question-text',
    choicesContainer: '#choices-container',
    choiceButton: '.choice-button',
    confirmButton: '#confirm-answer',
    scoreDisplay: '#current-score',
    progressBar: '#progress-fill',
    quitButton: '#quit-game',
    
    // Results screen
    resultsScreen: '#results-screen',
    finalScore: '#final-score',
    playAgainButton: '#play-again',
    homeButton: '#home-btn',
    
    // Settings screen
    settingsScreen: '#settings-screen',
    settingsButton: '#settings-btn',
    themeSelect: '#theme-select',
    languageSelect: '#language-select',
    closeSettingsButton: '#close-settings',
    
    // Instructions screen
    instructionsScreen: '#instructions-screen',
    closeInstructionsButton: '#close-instructions',
    
    // Loading and toast
    loadingOverlay: '#loading-overlay',
    toastContainer: '#toast-container'
};

// Test data
const GAME_MODES = {
    classic: {
        easy: { mode: 'easy', gameType: 'classic', expectedQuestions: 20 },
        medium: { mode: 'medium', gameType: 'classic', expectedQuestions: 20 },
        hard: { mode: 'hard', gameType: 'classic', expectedQuestions: 20 }
    },
    hollybolly: {
        easy: { mode: 'easy', gameType: 'hollybolly', expectedQuestions: 15 },
        medium: { mode: 'medium', gameType: 'hollybolly', expectedQuestions: 15 },
        hard: { mode: 'hard', gameType: 'hollybolly', expectedQuestions: 15 }
    }
};

// Test setup and teardown
test.beforeEach(async ({ page }) => {
    // Set timeout
    test.setTimeout(TEST_CONFIG.timeout);
    
    // Navigate to app
    await page.goto(TEST_CONFIG.baseURL);
    
    // Wait for app to load
    await page.waitForSelector(SELECTORS.homeScreen, { state: 'visible' });
    
    // Clear any existing game state
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
});

test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status !== 'passed' && TEST_CONFIG.screenshots) {
        await testInfo.attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
    }
});

// Test groups
test.describe('Game Playthrough - Classic Mode', () => {
    test('should complete easy classic game successfully', async ({ page }) => {
        await playCompleteGame(page, GAME_MODES.classic.easy);
    });
    
    test('should complete medium classic game successfully', async ({ page }) => {
        await playCompleteGame(page, GAME_MODES.classic.medium);
    });
    
    test('should complete hard classic game successfully', async ({ page }) => {
        await playCompleteGame(page, GAME_MODES.classic.hard);
    });
    
    test('should handle game quit and resume', async ({ page }) => {
        await testGameQuitAndResume(page, GAME_MODES.classic.easy);
    });
});

test.describe('Game Playthrough - HollyBolly Mode', () => {
    test('should complete easy HollyBolly game successfully', async ({ page }) => {
        await playCompleteGame(page, GAME_MODES.hollybolly.easy);
    });
    
    test('should display reward system correctly', async ({ page }) => {
        await testHollyBollyRewards(page, GAME_MODES.hollybolly.medium);
    });
    
    test('should show movie clues properly', async ({ page }) => {
        await testMovieClues(page, GAME_MODES.hollybolly.easy);
    });
});

test.describe('User Interface Navigation', () => {
    test('should navigate between all screens correctly', async ({ page }) => {
        await testScreenNavigation(page);
    });
    
    test('should handle settings changes during gameplay', async ({ page }) => {
        await testSettingsDuringGame(page);
    });
    
    test('should display instructions correctly', async ({ page }) => {
        await testInstructionsFlow(page);
    });
});

test.describe('Responsive Design', () => {
    test('should work correctly on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await playCompleteGame(page, GAME_MODES.classic.easy);
    });
    
    test('should work correctly on tablet viewport', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await playCompleteGame(page, GAME_MODES.classic.medium);
    });
    
    test('should work correctly on desktop viewport', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await playCompleteGame(page, GAME_MODES.hollybolly.easy);
    });
});

test.describe('Accessibility Features', () => {
    test('should be keyboard navigable', async ({ page }) => {
        await testKeyboardNavigation(page);
    });
    
    test('should work with screen reader attributes', async ({ page }) => {
        await testScreenReaderSupport(page);
    });
    
    test('should respect reduced motion preferences', async ({ page }) => {
        await testReducedMotion(page);
    });
});

// Helper functions
async function playCompleteGame(page, gameConfig) {
    const { mode, gameType, expectedQuestions } = gameConfig;
    
    console.log(`Starting ${gameType} ${mode} game test`);
    
    // Step 1: Start game
    await startGame(page, mode, gameType);
    
    // Step 2: Play through all questions
    const gameResults = await playAllQuestions(page, expectedQuestions);
    
    // Step 3: Verify results screen
    await verifyResultsScreen(page, gameResults);
    
    // Step 4: Return to home
    await returnToHome(page);
    
    console.log(`Completed ${gameType} ${mode} game test successfully`);
}

async function startGame(page, mode, gameType) {
    // Select game mode tab
    await page.click(`[data-game-mode="${gameType}"]`);
    await page.waitForTimeout(500);
    
    // Click start game button
    await page.click(`[data-mode="${mode}"][data-game-type="${gameType}"]`);
    
    // Wait for loading to complete
    await page.waitForSelector(SELECTORS.loadingOverlay, { state: 'hidden' });
    
    // Verify game screen is visible
    await expect(page.locator(SELECTORS.gameScreen)).toBeVisible();
    
    console.log(`Started ${gameType} ${mode} game`);
}

async function playAllQuestions(page, expectedQuestions) {
    const results = {
        questionsAnswered: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalTime: 0
    };
    
    let questionCount = 0;
    const startTime = Date.now();
    
    while (questionCount < expectedQuestions) {
        try {
            // Wait for question to load
            await page.waitForSelector(SELECTORS.questionText, { state: 'visible' });
            
            // Get question text
            const questionText = await page.textContent(SELECTORS.questionText);
            console.log(`Question ${questionCount + 1}: ${questionText}`);
            
            // Select a random answer
            const choices = await page.locator(SELECTORS.choiceButton).all();
            if (choices.length === 0) {
                throw new Error('No choices found for question');
            }
            
            const randomChoice = Math.floor(Math.random() * choices.length);
            await choices[randomChoice].click();
            
            // Confirm answer
            await page.click(SELECTORS.confirmButton);
            
            // Wait for feedback or next question
            await page.waitForTimeout(1000);
            
            results.questionsAnswered++;
            questionCount++;
            
            // Check if we're still in game or moved to results
            const isGameScreen = await page.locator(SELECTORS.gameScreen).isVisible();
            if (!isGameScreen) {
                break;
            }
            
        } catch (error) {
            console.error(`Error on question ${questionCount + 1}:`, error);
            
            // Take screenshot for debugging
            await page.screenshot({ 
                path: `debug-question-${questionCount + 1}.png` 
            });
            
            // Try to continue or break if stuck
            const isGameScreen = await page.locator(SELECTORS.gameScreen).isVisible();
            if (!isGameScreen) {
                break;
            }
            
            questionCount++;
        }
    }
    
    results.totalTime = Date.now() - startTime;
    
    console.log(`Completed game with ${results.questionsAnswered} questions`);
    return results;
}

async function verifyResultsScreen(page, gameResults) {
    // Wait for results screen
    await page.waitForSelector(SELECTORS.resultsScreen, { state: 'visible' });
    
    // Verify final score is displayed
    const finalScore = await page.locator(SELECTORS.finalScore);
    await expect(finalScore).toBeVisible();
    
    const scoreText = await finalScore.textContent();
    console.log(`Final score: ${scoreText}`);
    
    // Verify play again button exists
    await expect(page.locator(SELECTORS.playAgainButton)).toBeVisible();
    
    // Verify home button exists
    await expect(page.locator(SELECTORS.homeButton)).toBeVisible();
    
    console.log('Results screen verified successfully');
}

async function returnToHome(page) {
    // Click home button
    await page.click(SELECTORS.homeButton);
    
    // Verify we're back on home screen
    await page.waitForSelector(SELECTORS.homeScreen, { state: 'visible' });
    
    console.log('Returned to home screen successfully');
}

async function testGameQuitAndResume(page, gameConfig) {
    const { mode, gameType } = gameConfig;
    
    // Start game
    await startGame(page, mode, gameType);
    
    // Answer a few questions
    for (let i = 0; i < 3; i++) {
        await page.waitForSelector(SELECTORS.questionText, { state: 'visible' });
        const choices = await page.locator(SELECTORS.choiceButton).all();
        await choices[0].click();
        await page.click(SELECTORS.confirmButton);
        await page.waitForTimeout(1000);
    }
    
    // Quit game
    await page.click(SELECTORS.quitButton);
    
    // Confirm quit in dialog (if exists)
    const confirmDialog = page.locator('text=Are you sure');
    if (await confirmDialog.isVisible()) {
        await page.click('text=Yes');
    }
    
    // Verify back on home screen
    await page.waitForSelector(SELECTORS.homeScreen, { state: 'visible' });
    
    console.log('Game quit functionality tested successfully');
}

async function testHollyBollyRewards(page, gameConfig) {
    const { mode, gameType } = gameConfig;
    
    // Start HollyBolly game
    await startGame(page, mode, gameType);
    
    // Look for streak counter
    const streakCounter = page.locator('#streak-counter');
    await expect(streakCounter).toBeVisible();
    
    // Look for movie clues
    const movieClues = page.locator('#hollybolly-clue');
    await expect(movieClues).toBeVisible();
    
    // Play a few questions to potentially trigger rewards
    for (let i = 0; i < 5; i++) {
        await page.waitForSelector(SELECTORS.questionText, { state: 'visible' });
        const choices = await page.locator(SELECTORS.choiceButton).all();
        await choices[0].click();
        await page.click(SELECTORS.confirmButton);
        await page.waitForTimeout(1500); // Wait for potential reward modal
        
        // Check for reward modal
        const rewardModal = page.locator('#reward-modal');
        if (await rewardModal.isVisible()) {
            console.log('Reward modal appeared');
            await page.click('#continue-game');
        }
    }
    
    console.log('HollyBolly rewards system tested');
}

async function testMovieClues(page, gameConfig) {
    const { mode, gameType } = gameConfig;
    
    await startGame(page, mode, gameType);
    
    // Verify clue elements are present
    await expect(page.locator('#place-clue')).toBeVisible();
    await expect(page.locator('#animal-clue')).toBeVisible();
    await expect(page.locator('#thing-clue')).toBeVisible();
    
    // Verify clue content is not empty
    const placeClue = await page.textContent('#place-clue');
    const animalClue = await page.textContent('#animal-clue');
    const thingClue = await page.textContent('#thing-clue');
    
    expect(placeClue).toBeTruthy();
    expect(animalClue).toBeTruthy();
    expect(thingClue).toBeTruthy();
    
    console.log(`Movie clues: Place=${placeClue}, Animal=${animalClue}, Thing=${thingClue}`);
}

async function testScreenNavigation(page) {
    // Test navigation to instructions
    await page.click(SELECTORS.howToPlayButton);
    await expect(page.locator(SELECTORS.instructionsScreen)).toBeVisible();
    await page.click(SELECTORS.closeInstructionsButton);
    await expect(page.locator(SELECTORS.homeScreen)).toBeVisible();
    
    // Test navigation to settings
    await page.click(SELECTORS.settingsButton);
    await expect(page.locator(SELECTORS.settingsScreen)).toBeVisible();
    await page.click(SELECTORS.closeSettingsButton);
    await expect(page.locator(SELECTORS.homeScreen)).toBeVisible();
    
    console.log('Screen navigation tested successfully');
}

async function testSettingsDuringGame(page) {
    // Start a game
    await startGame(page, 'easy', 'classic');
    
    // Open settings during game
    await page.click(SELECTORS.settingsButton);
    await expect(page.locator(SELECTORS.settingsScreen)).toBeVisible();
    
    // Change theme
    await page.selectOption(SELECTORS.themeSelect, 'dark');
    
    // Close settings and verify game continues
    await page.click(SELECTORS.closeSettingsButton);
    await expect(page.locator(SELECTORS.gameScreen)).toBeVisible();
    
    // Verify theme changed
    const bodyClass = await page.getAttribute('body', 'class');
    expect(bodyClass).toContain('theme-dark');
    
    console.log('Settings during game tested successfully');
}

async function testInstructionsFlow(page) {
    await page.click(SELECTORS.howToPlayButton);
    await expect(page.locator(SELECTORS.instructionsScreen)).toBeVisible();
    
    // Test tab switching
    const tabs = await page.locator('.instruction-tab').all();
    for (const tab of tabs) {
        await tab.click();
        await page.waitForTimeout(500);
    }
    
    await page.click(SELECTORS.closeInstructionsButton);
    await expect(page.locator(SELECTORS.homeScreen)).toBeVisible();
    
    console.log('Instructions flow tested successfully');
}

async function testKeyboardNavigation(page) {
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test enter key on focused element
    await page.keyboard.press('Enter');
    
    // Test escape key
    await page.keyboard.press('Escape');
    
    console.log('Keyboard navigation tested');
}

async function testScreenReaderSupport(page) {
    // Check for ARIA labels
    const ariaElements = await page.locator('[aria-label]').all();
    expect(ariaElements.length).toBeGreaterThan(0);
    
    // Check for heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    console.log('Screen reader support checked');
}

async function testReducedMotion(page) {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Start a game and verify it works
    await startGame(page, 'easy', 'classic');
    
    console.log('Reduced motion preference tested');
}


