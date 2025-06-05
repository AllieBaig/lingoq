
**js/main.js**

```javascript
// Main application entry point
import ComponentLoader from './modules/componentLoader.js';
import ThemeManager from './modules/themeManager.js';
import LanguageManager from './modules/languageManager.js';
import SettingsManager from './modules/settingsManager.js';
import StorageManager from './modules/storageManager.js';
import GameLogic from './modules/gameLogic.js';
import MCQGenerator from './modules/mcqGenerator.js';

class LingoQuestApp {
    constructor() {
        this.componentLoader = new ComponentLoader();
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager();
        this.settingsManager = new SettingsManager();
        this.storageManager = new StorageManager();
        this.gameLogic = new GameLogic();
        this.mcqGenerator = new MCQGenerator();
        
        this.currentScreen = 'home-screen';
        this.gameState = {
            mode: null,
            gameType: null,
            currentQuestion: 0,
            totalQuestions: 20,
            score: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            streak: 0,
            bestStreak: 0,
            startTime: null,
            questions: [],
            answers: [],
            hollyBollyRewards: {
                boxOfficeCount: 0,
                directorCount: 0,
                heroCount: 0
            }
        };
        
        this.isInitialized = false;
    }

    async init() {
        try {
            this.showLoading('Initializing LingoQuest...');
            
            // Load all components
            await this.componentLoader.loadAllComponents();
            this.updateLoadingProgress(25, 'Components loaded...');

            // Initialize managers
            await this.initializeManagers();
            this.updateLoadingProgress(50, 'Settings loaded...');

            // Setup event listeners
            this.setupEventListeners();
            this.updateLoadingProgress(75, 'Setting up interface...');

            // Apply saved settings
            await this.applySettings();
            this.updateLoadingProgress(90, 'Applying preferences...');

            // Register service worker
            await this.registerServiceWorker();
            this.updateLoadingProgress(100, 'Ready to play!');

            // Hide loading and show app
            setTimeout(() => {
                this.hideLoading();
                this.showScreen('home-screen');
                this.isInitialized = true;
            }, 500);

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load LingoQuest. Please refresh the page.');
        }
    }

    async initializeManagers() {
        // Initialize storage first
        await this.storageManager.init();
        
        // Initialize other managers
        await this.themeManager.init();
        await this.languageManager.init();
        await this.settingsManager.init();
        await this.gameLogic.init();
        await this.mcqGenerator.init();
    }

    setupEventListeners() {
        // Component loaded events
        document.addEventListener('componentLoaded', this.handleComponentLoaded.bind(this));
        document.addEventListener('allComponentsLoaded', this.handleAllComponentsLoaded.bind(this));

        // Home screen events
        this.setupHomeScreenEvents();
        
        // Game screen events
        this.setupGameScreenEvents();
        
        // Results screen events
        this.setupResultsScreenEvents();
        
        // Settings screen events
        this.setupSettingsScreenEvents();
        
        // Instructions screen events
        this.setupInstructionsScreenEvents();

        // Global events
        this.setupGlobalEvents();
    }

    setupHomeScreenEvents() {
        // Game mode tabs
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-game-mode]')) {
                const tab = e.target.closest('[data-game-mode]');
                const gameMode = tab.dataset.gameMode;
                this.switchGameModeTab(gameMode);
            }
        });

        // Start game buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="start-game"]')) {
                const button = e.target.closest('[data-action="start-game"]');
                const mode = button.dataset.mode;
                const gameType = button.dataset.gameType;
                this.startGame(mode, gameType);
            }
        });

        // How to play button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#how-to-play-btn')) {
                this.showScreen('instructions-screen');
            }
        });
    }

    setupGameScreenEvents() {
        // Choice selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.choice-option')) {
                const choice = e.target.closest('.choice-option');
                this.selectChoice(choice);
            }
        });

        // Confirm answer
        document.addEventListener('click', (e) => {
            if (e.target.closest('#confirm-answer')) {
                this.confirmAnswer();
            }
        });

        // Game controls
        document.addEventListener('click', (e) => {
            if (e.target.closest('#pause-game')) {
                this.pauseGame();
            }
            if (e.target.closest('#quit-game')) {
                this.quitGame();
            }
        });

        // Reward modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('#close-reward')) {
                this.closeRewardModal();
            }
            if (e.target.closest('#continue-game')) {
                this.continueGame();
            }
        });
    }

    setupResultsScreenEvents() {
        // Results actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('#play-again')) {
                this.playAgain();
            }
            if (e.target.closest('#try-different-mode')) {
                this.showScreen('home-screen');
            }
            if (e.target.closest('#home-btn')) {
                this.showScreen('home-screen');
            }
            if (e.target.closest('#share-results')) {
                this.shareResults();
            }
        });

        // Toggle details
        document.addEventListener('click', (e) => {
            if (e.target.closest('#toggle-details')) {
                this.toggleResultsDetails();
            }
        });
    }

    setupSettingsScreenEvents() {
        // Settings button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#settings-btn')) {
                this.showScreen('settings-screen');
            }
        });

        // Close settings
        document.addEventListener('click', (e) => {
            if (e.target.closest('#close-settings')) {
                this.showScreen(this.currentScreen === 'settings-screen' ? 'home-screen' : this.currentScreen);
            }
        });

        // Settings changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('#theme-select')) {
                this.themeManager.setTheme(e.target.value);
            }
            if (e.target.matches('#language-select')) {
                this.languageManager.setLanguage(e.target.value);
            }
            if (e.target.matches('#font-size-select')) {
                this.settingsManager.setFontSize(e.target.value);
            }
            if (e.target.matches('#font-family-select')) {
                this.settingsManager.setFontFamily(e.target.value);
            }
            if (e.target.matches('#button-size-select')) {
                this.settingsManager.setButtonSize(e.target.value);
            }
        });

        // Toggle settings
        document.addEventListener('change', (e) => {
            if (e.target.matches('.toggle-input')) {
                const setting = e.target.id.replace('-toggle', '');
                this.settingsManager.setSetting(setting, e.target.checked);
            }
        });

        // Reset data
        document.addEventListener('click', (e) => {
            if (e.target.closest('#reset-data')) {
                this.resetAllData();
            }
        });
    }

    setupInstructionsScreenEvents() {
        // Close instructions
        document.addEventListener('click', (e) => {
            if (e.target.closest('#close-instructions')) {
                this.showScreen('home-screen');
            }
            if (e.target.closest('#got-it')) {
                this.showScreen('home-screen');
            }
        });

        // Instruction tabs
        document.addEventListener('click', (e) => {
            if (e.target.closest('.instruction-tab')) {
                const tab = e.target.closest('.instruction-tab');
                const tabName = tab.dataset.tab;
                this.switchInstructionTab(tabName);
            }
        });

        // Start tutorial
        document.addEventListener('click', (e) => {
            if (e.target.closest('#start-tutorial')) {
                this.startTutorial();
            }
        });
    }

    setupGlobalEvents() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC key to close modals/screens
            if (e.key === 'Escape') {
                if (this.currentScreen === 'settings-screen' || this.currentScreen === 'instructions-screen') {
                    this.showScreen('home-screen');
                }
            }
            
            // Number keys for choice selection (1-4)
            if (this.currentScreen === 'game-screen' && ['1', '2', '3', '4'].includes(e.key)) {
                const choiceIndex = parseInt(e.key) - 1;
                const choices = document.querySelectorAll('.choice-option');
                if (choices[choiceIndex]) {
                    this.selectChoice(choices[choiceIndex]);
                }
            }
            
            // Enter to confirm answer
            if (e.key === 'Enter' && this.currentScreen === 'game-screen') {
                const confirmBtn = document.getElementById('confirm-answer');
                if (confirmBtn && !confirmBtn.disabled) {
                    this.confirmAnswer();
                }
            }
        });

        // Visibility change (pause game when tab not visible)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.currentScreen === 'game-screen') {
                this.pauseGame();
            }
        });

        // Before unload (warn about losing progress)
        window.addEventListener('beforeunload', (e) => {
            if (this.currentScreen === 'game-screen' && this.gameState.currentQuestion > 0) {
                e.preventDefault();
                e.returnValue = 'You have a game in progress. Are you sure you want to leave?';
                return e.returnValue;
            }
        });

        // Resize handling
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Online/offline status
        window.addEventListener('online', () => {
            this.showToast('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showToast('You are offline. The game will continue to work!', 'info');
        });
    }

    handleComponentLoaded(event) {
        const { componentName } = event.detail;
        console.log(`Component loaded: ${componentName}`);
        
        // Apply language translations to newly loaded component
        if (this.languageManager && this.languageManager.isInitialized) {
            this.languageManager.applyTranslations();
        }
    }

    handleAllComponentsLoaded() {
        console.log('All components loaded successfully');
        
        // Initialize component-specific functionality
        this.initializeComponents();
    }

    initializeComponents() {
        // Initialize any component-specific JavaScript
        this.initializeHomeScreen();
        this.initializeGameScreen();
        this.initializeResultsScreen();
        this.initializeSettingsScreen();
    }

    initializeHomeScreen() {
        // Set default game mode tab
        this.switchGameModeTab('classic');
    }

    initializeGameScreen() {
        // Initialize game screen elements
        this.resetGameScreen();
    }

    initializeResultsScreen() {
        // Initialize results screen
        this.hideResultsDetails();
    }

    initializeSettingsScreen() {
        // Load current settings into form elements
        this.loadSettingsForm();
    }

    // Game Logic Methods
    async startGame(mode, gameType) {
        try {
            this.showLoading('Starting game...');
            
            // Initialize game state
            this.gameState = {
                mode,
                gameType,
                currentQuestion: 0,
                totalQuestions: gameType === 'hollybolly' ? 15 : 20,
                score: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
                streak: 0,
                bestStreak: 0,
                startTime: Date.now(),
                questions: [],
                answers: [],
                hollyBollyRewards: {
                    boxOfficeCount: 0,
                    directorCount: 0,
                    heroCount: 0
                }
            };

            // Generate questions
            this.gameState.questions = await this.mcqGenerator.generateQuestions(
                this.gameState.totalQuestions,
                mode,
                gameType
            );

            this.hideLoading();
            this.showScreen('game-screen');
            this.setupGameScreen();
            this.loadNextQuestion();

        } catch (error) {
            console.error('Failed to start game:', error);
            this.hideLoading();
            this.showToast('Failed to start game. Please try again.', 'error');
        }
    }

    setupGameScreen() {
        // Setup game mode specific elements
        if (this.gameState.gameType === 'hollybolly') {
            this.showElement('#streak-counter');
            this.showElement('#hollybolly-clue');
        } else {
            this.hideElement('#streak-counter');
            this.hideElement('#hollybolly-clue');
        }

        // Reset game screen
        this.resetGameScreen();
        this.updateGameProgress();
    }

    loadNextQuestion() {
        if (this.gameState.currentQuestion >= this.gameState.totalQuestions) {
            this.endGame();
            return;
        }

        const question = this.gameState.questions[this.gameState.currentQuestion];
        
        // Update question display
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('current-category').textContent = question.category;
        document.getElementById('current-letter').textContent = question.letter;

        // Update HollyBolly clues if applicable
        if (this.gameState.gameType === 'hollybolly' && question.clues) {
            document.getElementById('place-clue').textContent = question.clues.place;
            document.getElementById('animal-clue').textContent = question.clues.animal;
            document.getElementById('thing-clue').textContent = question.clues.thing;
        }

        // Render choices
        this.renderChoices(question.choices);

        // Update progress
        this.gameState.currentQuestion++;
        this.updateGameProgress();
        this.updateStreakDisplay();

        // Disable confirm button
        this.disableConfirmButton();
    }

    renderChoices(choices) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach((choice, index) => {
            const choiceElement = document.createElement('div');
            choiceElement.className = 'choice-option';
            choiceElement.dataset.choiceIndex = index;
            choiceElement.innerHTML = `
                <div class="choice-content">
                    <div class="choice-number">${index + 1}</div>
                    <div class="choice-text">${choice.text}</div>
                </div>
            `;
            container.appendChild(choiceElement);
        });
    }

    selectChoice(choiceElement) {
        // Remove previous selection
        document.querySelectorAll('.choice-option').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked choice
        choiceElement.classList.add('selected');

        // Enable confirm button
        this.enableConfirmButton();
    }

    async confirmAnswer() {
        const selectedChoice = document.querySelector('.choice-option.selected');
        if (!selectedChoice) return;

        const choiceIndex = parseInt(selectedChoice.dataset.choiceIndex);
        const question = this.gameState.questions[this.gameState.currentQuestion - 1];
        const choice = question.choices[choiceIndex];
        const isCorrect = choice.correct;

        // Record answer
        this.gameState.answers.push({
            question: question,
            selectedChoice: choice,
            isCorrect: isCorrect,
            timeSpent: Date.now() - this.gameState.startTime
        });

        // Update score and stats
        if (isCorrect) {
            this.gameState.correctAnswers++;
            this.gameState.streak++;
            this.gameState.bestStreak = Math.max(this.gameState.bestStreak, this.gameState.streak);
            
            // Show correct feedback
            this.showAnswerFeedback(true, choice.explanation);
            
            // Check for HollyBolly rewards
            if (this.gameState.gameType === 'hollybolly') {
                await this.checkHollyBollyRewards();
            }
        } else {
            this.gameState.incorrectAnswers++;
            this.gameState.streak = 0;
            
            // Show incorrect feedback
            this.showAnswerFeedback(false, choice.explanation, question.choices.find(c => c.correct));
        }

        // Calculate score
        this.calculateScore();

        // Disable choices and confirm button
        this.disableChoices();
        this.disableConfirmButton();

        // Auto-advance after delay
        setTimeout(() => {
            this.loadNextQuestion();
        }, this.settingsManager.getSetting('autoNext') ? 1500 : 3000);
    }

    async checkHollyBollyRewards() {
        const streak = this.gameState.streak;
        
        if (streak === 1) {
            // Box office reward
            this.gameState.hollyBollyRewards.boxOfficeCount++;
            await this.showReward('boxOffice');
        } else if (streak === 2) {
            // Director reward
            this.gameState.hollyBollyRewards.directorCount++;
            await this.showReward('director');
        } else if (streak === 3) {
            // Hero reward
            this.gameState.hollyBollyRewards.heroCount++;
            await this.showReward('hero');
        }
    }

    async showReward(rewardType) {
        const modal = document.getElementById('reward-modal');
        const question = this.gameState.questions[this.gameState.currentQuestion - 1];
        
        // Hide all reward sections first
        document.querySelectorAll('.reward-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show specific reward section
        document.getElementById(`${rewardType}-reward`).classList.remove('hidden');

        // Populate reward data
        if (rewardType === 'boxOffice') {
            document.getElementById('hollywood-title').textContent = question.movieData.hollywood.title;
            document.getElementById('bollywood-title').textContent = question.movieData.bollywood.title;
            document.getElementById('hollywood-earning').textContent = question.movieData.hollywood.boxOffice;
            document.getElementById('bollywood-earning').textContent = question.movieData.bollywood.boxOffice;
        } else if (rewardType === 'director') {
            document.getElementById('hollywood-director').textContent = question.movieData.hollywood.director;
            document.getElementById('bollywood-director').textContent = question.movieData.bollywood.director;
            document.getElementById('hollywood-director-worth').textContent = question.movieData.hollywood.directorWorth;
            document.getElementById('bollywood-director-worth').textContent = question.movieData.bollywood.directorWorth;
        } else if (rewardType === 'hero') {
            document.getElementById('hollywood-hero').textContent = question.movieData.hollywood.hero;
            document.getElementById('bollywood-hero').textContent = question.movieData.bollywood.hero;
            document.getElementById('hollywood-hero-worth').textContent = question.movieData.hollywood.heroWorth;
            document.getElementById('bollywood-hero-worth').textContent = question.movieData.bollywood.heroWorth;
        }

        // Show modal
        modal.classList.remove('hidden');
        
        // Add animation
        modal.classList.add('show');
    }

    closeRewardModal() {
        const modal = document.getElementById('reward-modal');
        modal.classList.add('hidden');
        modal.classList.remove('show');
    }

    continueGame() {
        this.closeRewardModal();
        // Game continues automatically
    }

    endGame() {
        this.calculateFinalScore();
        this.saveGameResults();
        this.showScreen('results-screen');
        this.displayResults();
    }

    calculateScore() {
        const accuracy = this.gameState.correctAnswers / Math.max(1, this.gameState.correctAnswers + this.gameState.incorrectAnswers);
        this.gameState.score = Math.round(accuracy * 100);
    }

    calculateFinalScore() {
        this.calculateScore();
        
        // Bonus points for streaks in HollyBolly mode
        if (this.gameState.gameType === 'hollybolly') {
            const bonusPoints = (this.gameState.hollyBollyRewards.boxOfficeCount * 5) +
                              (this.gameState.hollyBollyRewards.directorCount * 10) +
                              (this.gameState.hollyBollyRewards.heroCount * 15);
            this.gameState.score = Math.min(100, this.gameState.score + bonusPoints);
        }
    }

    // Utility Methods
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = document.getElementById('loading-text');
        if (overlay && text) {
            text.textContent = message;
            overlay.classList.add('active');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    updateLoadingProgress(percentage, message) {
        const progressFill = document.getElementById('loading-progress-fill');
        const progressText = document.getElementById('loading-percentage');
        const loadingText = document.getElementById('loading-text');

        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${percentage}%`;
        if (loadingText && message) loadingText.textContent = message;
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${this.getToastIcon(type)}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
        `;

        // Add close functionality
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    showElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.remove('hidden');
        }
    }

    hideElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('hidden');
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('SW registered: ', registration);
            } catch (registrationError) {
                console.log('SW registration failed: ', registrationError);
            }
        }
    }

    async applySettings() {
        // Apply saved settings
        const savedSettings = await this.settingsManager.getAllSettings();
        
        // Apply theme
        if (savedSettings.theme) {
            this.themeManager.setTheme(savedSettings.theme);
        }
        
        // Apply language
        if (savedSettings.language) {
            this.languageManager.setLanguage(savedSettings.language);
        }
        
        // Apply other settings
        Object.keys(savedSettings).forEach(key => {
            this.settingsManager.applySetting(key, savedSettings[key]);
        });
    }

    // Placeholder methods (to be implemented based on specific needs)
    switchGameModeTab(gameMode) {
        // Switch between classic and hollybolly tabs
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.gameMode === gameMode);
        });

        document.querySelectorAll('.game-modes').forEach(modes => {
            modes.classList.toggle('active', modes.id === `${gameMode}-modes`);
        });
    }

    resetGameScreen() {
        // Reset game screen to initial state
        document.getElementById('choices-container').innerHTML = '';
        this.disableConfirmButton();
    }

    updateGameProgress() {
        const current = this.gameState.currentQuestion;
        const total = this.gameState.totalQuestions;
        const percentage = (current / total) * 100;

        document.getElementById('current-question').textContent = current;
        document.getElementById('total-questions').textContent = total;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    updateStreakDisplay() {
        if (this.gameState.gameType === 'hollybolly') {
            document.getElementById('current-streak').textContent = this.gameState.streak;
            
            const nextRewardText = this.getNextRewardText();
            document.getElementById('next-reward-text').textContent = nextRewardText;
        }
    }

    getNextRewardText() {
        const streak = this.gameState.streak;
        if (streak === 0) return 'Next reward at 1 correct!';
        if (streak === 1) return 'Next reward at 2 in a row!';
        if (streak === 2) return 'Next reward at 3 in a row!';
        return 'Keep the streak going!';
    }

    enableConfirmButton() {
        const button = document.getElementById('confirm-answer');
        if (button) {
            button.disabled = false;
        }
    }

    disableConfirmButton() {
        const button = document.getElementById('confirm-answer');
        if (button) {
            button.disabled = true;
        }
    }

    disableChoices() {
        document.querySelectorAll('.choice-option').forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
    }

    showAnswerFeedback(isCorrect, explanation, correctChoice = null) {
        // Show feedback for the answer
        const selectedChoice = document.querySelector('.choice-option.selected');
        
        if (isCorrect) {
            selectedChoice.classList.add('correct');
            this.showToast('Correct! ' + explanation, 'success');
        } else {
            selectedChoice.classList.add('incorrect');
            if (correctChoice) {
                // Highlight correct answer
                const correctElement = document.querySelector(`[data-choice-index="${correctChoice.index}"]`);
                if (correctElement) {
                    correctElement.classList.add('correct');
                }
            }
            this.showToast('Incorrect. ' + explanation, 'error');
        }
    }

    pauseGame() {
        // Implement pause functionality
        this.showToast('Game paused', 'info');
    }

    quitGame() {
        if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
            this.showScreen('home-screen');
        }
    }

    playAgain() {
        this.startGame(this.gameState.mode, this.gameState.gameType);
    }

    shareResults() {
        if (navigator.share) {
            navigator.share({
                title: 'LingoQuest Results',
                text: `I scored ${this.gameState.score}% in LingoQuest ${this.gameState.gameType} mode!`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`I scored ${this.gameState.score}% in LingoQuest!`);
            this.showToast('Results copied to clipboard!', 'success');
        }
    }

    toggleResultsDetails() {
        const details = document.getElementById('results-details');
        const button = document.getElementById('toggle-details');
        const icon = button.querySelector('.toggle-icon');
        
        details.classList.toggle('hidden');
        icon.textContent = details.classList.contains('hidden') ? '▼' : '▲';
        
        const buttonText = button.querySelector('span');
        buttonText.textContent = details.classList.contains('hidden') ? 'View Detailed Results' : 'Hide Detailed Results';
    }

    hideResultsDetails() {
        const details = document.getElementById('results-details');
        if (details) {
            details.classList.add('hidden');
        }
    }

    loadSettingsForm() {
        // Load current settings into form elements
        // This will be implemented with actual settings values
    }

    switchInstructionTab(tabName) {
        // Switch instruction tabs
        document.querySelectorAll('.instruction-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        document.querySelectorAll('.instruction-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-instructions`);
        });
    }

    startTutorial() {
        // Start interactive tutorial
        this.startGame('easy', 'classic');
    }

    resetAllData() {
        if (confirm('This will delete all your game data, settings, and progress. Are you sure?')) {
            this.storageManager.clearAll();
            location.reload();
        }
    }

    displayResults() {
        // Display game results​​​​​​​​​​​​​​​​

