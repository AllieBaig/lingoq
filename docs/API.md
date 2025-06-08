




# LingoQuest API Documentation

## Overview

LingoQuest is a Progressive Web Application (PWA) built with ES6 modules, providing a comprehensive word game experience with multiple game modes, themes, and accessibility features.

## Table of Contents

- [Core Architecture](#core-architecture)
- [Module System](#module-system)
- [Event System](#event-system)
- [Storage API](#storage-api)
- [Theme System](#theme-system)
- [Game Engine](#game-engine)
- [Settings Management](#settings-management)
- [Accessibility API](#accessibility-api)
- [Utility Functions](#utility-functions)

---

## Core Architecture

### LingoQuestApp

Main application class that orchestrates all modules.

```javascript
class LingoQuestApp {
    constructor()
    async init()
    async startGame(mode, gameType)
    getModule(name)
    async restart()
    async destroy()
}
```

#### Methods

**`init()`**
```javascript
await app.init();
```
Initializes the application and all modules.

**`startGame(mode, gameType)`**
```javascript
await app.startGame('easy', 'classic');
await app.startGame('medium', 'hollybolly');
```
- `mode`: `'easy'` | `'medium'` | `'hard'`
- `gameType`: `'classic'` | `'hollybolly'` | `'mixlingo'`

**`getModule(name)`**
```javascript
const uiManager = app.getModule('uiManager');
const gameLogic = app.getModule('gameLogic');
```

---

## Module System

### Core Modules

#### ComponentLoader
Handles dynamic loading of HTML components.

```javascript
class ComponentLoader {
    async loadComponent(componentName, containerId)
    async loadAllComponents()
}
```

#### EventManager
Centralized event system for module communication.

```javascript
class EventManager {
    emit(eventName, data)
    on(eventName, callback)
    off(eventName, callback)
}
```

#### UIManager
Manages screen transitions and UI state.

```javascript
class UIManager {
    showScreen(screenId)
    showLoading(message)
    hideLoading()
    showToast(message, type, duration)
}
```

#### StorageManager
Handles data persistence with localStorage fallback.

```javascript
class StorageManager {
    set(key, value)
    get(key, defaultValue)
    remove(key)
    clearAll()
    // Backwards compatibility alias methods
    setItem(key, value)
    getItem(key, defaultValue)
    removeItem(key)
    clear()
}
```

---

## Event System

### Core Events

#### Application Events
```javascript
// Application lifecycle
'app:ready' - Application fully initialized
'app:error' - Application error occurred
'app:hidden' - Application lost focus
'app:visible' - Application gained focus

// Usage
eventManager.on('app:ready', (data) => {
    console.log('App ready:', data.initTime);
});
```

#### Game Events
```javascript
// Game lifecycle
'game:start' - Game session started
'game:question' - New question loaded
'game:answer' - Answer submitted
'game:complete' - Game finished

// Usage
eventManager.on('game:start', ({ mode, gameType }) => {
    console.log(`Starting ${gameType} game in ${mode} mode`);
});
```

#### Settings Events
```javascript
// Settings changes
'settings:changed' - Setting value changed
'theme:changed' - Theme switched
'language:changed' - Language changed

// Usage
eventManager.on('theme:changed', ({ theme }) => {
    console.log(`Theme changed to: ${theme}`);
});
```

---

## Storage API

### Basic Operations

```javascript
// Store data
storageManager.set('user_preferences', {
    theme: 'dark',
    language: 'en',
    sound: true
});

// Retrieve data
const preferences = storageManager.get('user_preferences', {});

// Remove data
storageManager.remove('user_preferences');

// Clear all data
storageManager.clearAll();
```

### Storage Keys

```javascript
// Game data
'lingoquest_gameState' - Current game state
'lingoquest_gameHistory' - Game history
'lingoquest_highScores' - High scores

// Settings
'lingoquest_theme' - Current theme
'lingoquest_language' - Current language
'lingoquest_userProfile' - User profile settings

// Preferences
'lingoquest_accessibility' - Accessibility settings
'lingoquest_sound' - Sound preferences
```

---

## Theme System

### ThemeManager

```javascript
class ThemeManager {
    async setTheme(themeName)
    getCurrentTheme()
    getAvailableThemes()
    isStudentTheme(themeName)
    isSeniorTheme(themeName)
}
```

### Available Themes

#### Senior-Friendly Themes
```javascript
// Built into main CSS
'light'         // Clean, bright interface
'dark'          // Dark mode for eye comfort
'high-contrast' // Maximum contrast for accessibility
'sepia'         // Warm, paper-like appearance
'blue-light'    // Blue light filter
```

#### Student Themes
```javascript
// Separate CSS files with animations
'neon-glow'     // Cyberpunk aesthetic
'retro-arcade'  // 80s/90s arcade style
'nature-forest' // Calming earth tones
'space-galaxy'  // Cosmic theme
'candy-pop'     // Sweet, colorful design
```

#### College Themes
```javascript
'campus-classic' // University-inspired look
'minimal-focus'  // Distraction-free design
'night-owl'      // Low-light study mode
```

#### Cartoon Themes
```javascript
'jetsons'       // Retro-futuristic cartoon style
```

### Theme Usage

```javascript
// Apply theme
await themeManager.setTheme('neon-glow');

// Check theme category
if (themeManager.isStudentTheme('neon-glow')) {
    // Enable student-specific features
}

// Get theme list
const themes = themeManager.getAvailableThemes();
```

---

## Game Engine

### GameStateManager

```javascript
class GameStateManager {
    async initializeGame(mode, gameType)
    getGameState()
    setQuestions(questions)
    saveCurrentState()
}
```

### Game State Structure

```javascript
{
    mode: 'easy' | 'medium' | 'hard',
    gameType: 'classic' | 'hollybolly' | 'mixlingo',
    currentQuestion: 0,
    totalQuestions: 20,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    streak: 0,
    bestStreak: 0,
    startTime: 1640995200000,
    questions: [],
    answers: []
}
```

### MCQGenerator

```javascript
class MCQGenerator {
    async generateQuestions(totalQuestions, mode, gameType)
    async generateSingleQuestion(choiceCount, gameType)
}
```

### Question Structure

```javascript
// Classic Mode Question
{
    id: 'question_1',
    type: 'classic',
    category: 'name' | 'place' | 'animal' | 'thing',
    letter: 'A',
    text: 'Choose a NAME that starts with "A"',
    choices: [
        { text: 'Alice', correct: true, explanation: 'Correct!' },
        { text: 'Bob', correct: false, explanation: 'Try again!' }
    ]
}

// HollyBolly Mode Question
{
    id: 'movie_1',
    type: 'hollybolly',
    text: 'Which movie matches these clues?',
    clues: {
        place: 'New York City',
        animal: 'Spider',
        thing: 'Web'
    },
    choices: [
        { text: 'Spider-Man', correct: true, explanation: 'Correct!' },
        { text: 'Batman', correct: false, explanation: 'Try again!' }
    ]
}
```

### ScoreCalculator

```javascript
class ScoreCalculator {
    startGame(gameType, difficulty)
    calculateScore(answerState, questionData)
    getGameSummary()
    getCurrentScore()
}
```

---

## Settings Management

### SettingsManager

```javascript
class SettingsManager {
    getSetting(key)
    setSetting(key, value)
    getAllSettings()
    saveAllSettings()
    loadAllSettings()
    applyProfileSettings(profile)
    validateSetting(key, value)
    exportSettings()
    importSettings(data)
}
```

### Settings Structure

```javascript
{
    // Appearance
    theme: 'light',
    fontSize: 'medium',
    fontFamily: 'system',
    buttonSize: 'large',
    
    // Language & Region
    language: 'en',
    region: 'us',
    
    // Game Settings
    sound: true,
    music: false,
    vibration: true,
    animations: true,
    autoNext: false,
    
    // Accessibility
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    largeTouchTargets: false,
    
    // User Profile
    userProfile: 'adult', // 'senior' | 'student' | 'adult' | 'educator'
    
    // Privacy
    saveProgress: true,
    analytics: false
}
```

### Profile Presets

```javascript
// Senior Profile
{
    fontSize: 'large',
    buttonSize: 'extra-large',
    reducedMotion: true,
    highContrast: false,
    theme: 'light',
    animations: false
}

// Student Profile
{
    fontSize: 'medium',
    buttonSize: 'normal',
    animations: true,
    theme: 'neon-glow', // or other student theme
    sound: true
}
```

---

## Accessibility API

### AccessibilityManager

```javascript
class AccessibilityManager {
    announceToScreenReader(message, priority)
    trapFocus(element)
    getFocusableElements(container)
    saveFocus()
    restoreFocus()
    setupKeyboardNavigation(element, options)
    makeModalAccessible(modal)
}
```

### Usage Examples

```javascript
// Screen reader announcements
accessibilityManager.announceToScreenReader('Game started');
accessibilityManager.announceUrgent('Time running out!');

// Focus management
accessibilityManager.saveFocus();
const cleanup = accessibilityManager.trapFocus(modalElement);
// Later...
cleanup();
accessibilityManager.restoreFocus();

// Keyboard navigation
accessibilityManager.setupKeyboardNavigation(menuElement, {
    roving: true,
    orientation: 'horizontal'
});
```

### ARIA Utilities

```javascript
// Add ARIA labels
a11yUtils.addARIALabel(button, 'Close dialog');
a11yUtils.addARIADescription(input, 'Enter your name');

// Set ARIA states
a11yUtils.setARIAExpanded(dropdown, true);
a11yUtils.setARIASelected(option, false);
a11yUtils.setARIACurrent(navItem, 'page');
```

---

## Utility Functions

### String Utilities

```javascript
import { stringUtils } from './js/modules/utils/helpers.js';

stringUtils.capitalizeFirst('hello') // 'Hello'
stringUtils.titleCase('hello world') // 'Hello World'
stringUtils.kebabCase('Hello World') // 'hello-world'
stringUtils.truncate('Long text...', 10) // 'Long te...'
```

### Array Utilities

```javascript
import { arrayUtils } from './js/modules/utils/helpers.js';

arrayUtils.shuffle([1, 2, 3, 4]) // [3, 1, 4, 2]
arrayUtils.randomElement([1, 2, 3]) // 2
arrayUtils.randomElements([1, 2, 3, 4], 2) // [3, 1]
arrayUtils.unique([1, 2, 2, 3]) // [1, 2, 3]
```

### Time Utilities

```javascript
import { timeUtils } from './js/modules/utils/helpers.js';

timeUtils.formatTime(125000) // '2:05'
timeUtils.formatTime(125000, 'human') // '2m 5s'
timeUtils.getRelativeTime(Date.now() - 60000) // '1 minute ago'
```

### Validation Utilities

```javascript
import { validators } from './js/modules/utils/validators.js';

// Game validation
const answerValidation = validators.game.validateAnswer('Alice', {
    gameMode: 'classic'
});

// Form validation
const formValidation = validators.form.validateForm(formElement, {
    name: { required: true, minLength: 2 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
});
```

### Animation Utilities

```javascript
import animations from './js/modules/utils/animations.js';

// Fade animations
await animations.fade.fadeIn(element);
await animations.fade.fadeOut(element);

// Slide animations
await animations.slide.slideUp(element);
await animations.slide.slideDown(element);

// Game-specific animations
await animations.game.questionCardEnter(questionCard);
await animations.game.highlightCorrectAnswer(button);
```

---

## Web Workers

### GameWorker

```javascript
// Send message to worker
gameWorker.postMessage({
    type: 'GENERATE_QUESTIONS',
    payload: {
        gameMode: 'classic',
        difficulty: 'medium',
        questionCount: 20
    }
});

// Listen for responses
gameWorker.addEventListener('message', (event) => {
    const { type, result } = event.data;
    if (type === 'SUCCESS') {
        console.log('Questions generated:', result.questions);
    }
});
```

### AnalysisWorker

```javascript
// Analyze performance data
analysisWorker.postMessage({
    type: 'ANALYZE_PERFORMANCE',
    payload: {
        metrics: performanceData,
        timeRange: '1h',
        analysisType: 'comprehensive'
    }
});
```

---

## Error Handling

### Error Types

```javascript
// Application errors
class AppInitializationError extends Error {}
class ModuleLoadError extends Error {}
class ComponentLoadError extends Error {}

// Game errors
class GameStateError extends Error {}
class QuestionGenerationError extends Error {}
class ScoreCalculationError extends Error {}

// Settings errors
class SettingsValidationError extends Error {}
class ThemeLoadError extends Error {}
class LanguageLoadError extends Error {}
```

### Error Handling Patterns

```javascript
try {
    await app.init();
} catch (error) {
    if (error instanceof AppInitializationError) {
        // Handle app initialization failure
        app.showErrorScreen(error);
    } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
    }
}
```

---

## Service Worker API

### Registration

```javascript
if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('SW registered:', registration.scope);
}
```

### Cache Management

```javascript
// Message service worker
navigator.serviceWorker.controller.postMessage({
    type: 'CACHE_GAME_DATA',
    payload: gameData
});

// Clear cache
navigator.serviceWorker.controller.postMessage({
    type: 'CLEAR_CACHE'
});

// Get cache status
const channel = new MessageChannel();
navigator.serviceWorker.controller.postMessage({
    type: 'GET_CACHE_STATUS'
}, [channel.port2]);

channel.port1.onmessage = (event) => {
    console.log('Cache status:', event.data);
};
```

---

## Progressive Web App Features

### Installation

```javascript
// Listen for install prompt
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    // Show custom install button
    showInstallButton(() => {
        event.prompt();
    });
});
```

### Offline Support

```javascript
// Check online status
if (navigator.onLine) {
    // Online functionality
} else {
    // Offline mode
    uiManager.showToast('You are offline. Some features may be limited.', 'info');
}

// Listen for connectivity changes
window.addEventListener('online', () => {
    uiManager.showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    uiManager.showToast('You are offline', 'warning');
});
```

---

## Browser Compatibility

### Minimum Requirements

- ES6+ support (ES2020 recommended)
- CSS Grid and Flexbox
- localStorage
- Fetch API
- Service Workers (optional)

### Feature Detection

```javascript
// Check for required features
const hasRequiredFeatures = [
    'localStorage' in window,
    'fetch' in window,
    'Promise' in window,
    'Map' in window,
    'Set' in window
].every(feature => feature);

if (!hasRequiredFeatures) {
    // Show compatibility warning
    showCompatibilityWarning();
}
```

---

## Development Guidelines

### Module Structure

```javascript
// Module template
export class ModuleName {
    constructor(dependencies) {
        this.isInitialized = false;
    }
    
    async init() {
        // Initialization logic
        this.isInitialized = true;
    }
    
    // Public methods
    
    async destroy() {
        // Cleanup logic
        this.isInitialized = false;
    }
}

export default ModuleName;
```

### Event Naming Convention

```javascript
// Pattern: namespace:action
'app:ready'
'game:start'
'settings:changed'
'theme:applied'
'language:switched'
'score:updated'
```

### CSS Custom Properties

```javascript
// Theme variables
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #ffffff;
    --text-color: #212529;
    
    --font-family-primary: system-ui, sans-serif;
    --font-size-base: 16px;
    --line-height-normal: 1.5;
    
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}
```

---

## Testing API

### Test Utilities

```javascript
import { generateMockQuestions, mockEventManager } from './test/integration/gameFlow.test.js';

// Generate test data
const questions = generateMockQuestions(5);

// Mock modules
const mockUI = {
    showScreen: jest.fn(),
    showToast: jest.fn()
};
```

### Integration Testing

```javascript
// Test complete flow
describe('Game Flow', () => {
    test('should complete classic game', async () => {
        await app.init();
        await app.startGame('easy', 'classic');
        
        // Simulate gameplay
        const gameState = app.getModule('gameStateManager').getGameState();
        expect(gameState.mode).toBe('easy');
    });
});
```

---

## Performance Considerations

### Lazy Loading

```javascript
// Dynamic imports for large modules
const heavyModule = await import('./modules/heavy-module.js');
```

### Memory Management

```javascript
// Cleanup when modules are destroyed
async destroy() {
    this.eventListeners.forEach(cleanup => cleanup());
    this.eventListeners = [];
    this.cache.clear();
}
```

### Bundle Optimization

```javascript
// Tree-shakeable exports
export { specificFunction } from './utils.js';

// Avoid default exports for utilities
export const utils = { /* ... */ };
```








