

import { HollyBollyGame } from './hollybolly.js';
import { LANGUAGES } from './data/config/constants.js';
import { englishTranslations } from './data/translations/en.js';

/**
 * GameUI - Handles all user interface interactions and game display
 */
export class GameUI {
    constructor() {
        this.game = new HollyBollyGame();
        this.currentQuestion = null;
        this.isAnswered = false;
        
        // DOM elements
        this.elements = {
            loading: document.getElementById('loading'),
            gameContent: document.getElementById('game-content'),
            questionText: document.getElementById('question-text'),
            answersGrid: document.getElementById('answers-grid'),
            resultContainer: document.getElementById('result-container'),
            resultText: document.getElementById('result-text'),
            rewardInfo: document.getElementById('reward-info'),
            explanation: document.getElementById('explanation'),
            startBtn: document.getElementById('start-btn'),
            nextBtn: document.getElementById('next-btn'),
            resetBtn: document.getElementById('reset-btn'),
            score: document.getElementById('score'),
            streak: document.getElementById('streak'),
            accuracy: document.getElementById('accuracy'),
            difficultyBtns: document.querySelectorAll('.difficulty-btn'),
            languageSelect: document.getElementById('answer-language-select')
        };

        this.populateLanguageOptions();
    }

    /**
     * Populate the answer language dropdown with available languages
     */
    populateLanguageOptions() {
        const select = this.elements.languageSelect;
        if (!select) return;

        // Clear existing options (if any)
        select.innerHTML = '';
        const names = englishTranslations.languages || {};

        Object.values(LANGUAGES).forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = names[code] || code;
            select.appendChild(option);
        });
    }

    /**
     * Initialize the game UI
     * @param {Array} gameData - Game data to load
     */
    async init(gameData) {
        try {
            // Load game data
            this.game.loadGameData(gameData);

            // Ensure language dropdown has options
            this.populateLanguageOptions();
            
            // Hide loading, show game
            this.elements.loading.classList.add('hidden');
            this.elements.gameContent.classList.remove('hidden');
            
            this.bindEvents();
            this.updateStats();
            
            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError('Failed to load game. Please refresh the page.');
        }
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Difficulty selector
        this.elements.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDifficultyChange(e));
        });

        // Control buttons
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());

        // Language selector
        if (this.elements.languageSelect) {
            this.elements.languageSelect.addEventListener('change', (e) => {
                this.game.setLanguage(e.target.value);
                if (this.currentQuestion) {
                    this.currentQuestion = this.game.formatQuestion();
                    this.displayQuestion();
                }
            });
        }
    }

    /**
     * Handle difficulty button click
     * @param {Event} e - Click event
     */
    handleDifficultyChange(e) {
        this.elements.difficultyBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.game.currentDifficulty = e.target.dataset.difficulty;
    }

    /**
     * Start a new game
     */
    startGame() {
        const difficulty = document.querySelector('.difficulty-btn.active').dataset.difficulty;
        this.currentQuestion = this.game.startGame(difficulty);
        
        if (!this.currentQuestion) {
            this.showError('No questions available. Please check the game data.');
            return;
        }
        
        this.displayQuestion();
        this.updateStats();
        
        this.elements.startBtn.classList.add('hidden');
        this.elements.resultContainer.classList.add('hidden');
    }

    /**
     * Display the current question
     */
    displayQuestion() {
        if (!this.currentQuestion) return;

        this.elements.questionText.textContent = this.currentQuestion.question;
        this.elements.answersGrid.innerHTML = '';
        
        this.currentQuestion.answers.forEach(answer => {
            const btn = this.createAnswerButton(answer);
            this.elements.answersGrid.appendChild(btn);
        });

        this.isAnswered = false;
    }

    /**
     * Create an answer button
     * @param {string} answer - Answer text
     * @returns {HTMLElement} - Button element
     */
    createAnswerButton(answer) {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.addEventListener('click', () => this.submitAnswer(answer));
        return btn;
    }

    /**
     * Submit an answer
     * @param {string} selectedAnswer - The selected answer
     */
    submitAnswer(selectedAnswer) {
        if (this.isAnswered) return;
        
        const result = this.game.submitAnswer(selectedAnswer);
        if (!result) return;
        
        this.isAnswered = true;
        
        // Update answer buttons appearance
        this.elements.answersGrid.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === result.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !result.correct) {
                btn.classList.add('incorrect');
            }
        });

        this.displayResult(result);
        this.updateStats();
        
        this.elements.nextBtn.classList.remove('hidden');
    }

    /**
     * Display the result of the answer
     * @param {Object} result - Result object from game
     */
    displayResult(result) {
        this.elements.resultText.innerHTML = result.correct 
            ? `<h3 style="color: #4ecdc4;">✅ Correct!</h3>`
            : `<h3 style="color: #ff6b6b;">❌ Wrong!</h3><p>Correct answer: ${result.correctAnswer}</p>`;

        if (result.reward) {
            this.elements.rewardInfo.classList.remove('hidden');
            this.elements.rewardInfo.innerHTML = `
                <h4>🏆 ${result.reward.title}</h4>
                <p>Hollywood: ${result.reward.hollywood}</p>
                <p>Bollywood: ${result.reward.bollywood}</p>
            `;
        } else {
            this.elements.rewardInfo.classList.add('hidden');
        }

        this.elements.explanation.innerHTML = `
            <p><strong>Connection:</strong> ${result.explanation.connection}</p>
            <p><strong>Elements:</strong> ${result.explanation.place}, ${result.explanation.animal}, ${result.explanation.thing}</p>
        `;

        this.elements.resultContainer.classList.remove('hidden');
    }

    /**
     * Load the next question
     */
    nextQuestion() {
        this.currentQuestion = this.game.getNewQuestion();
        if (this.currentQuestion) {
            this.displayQuestion();
            this.elements.resultContainer.classList.add('hidden');
            this.elements.nextBtn.classList.add('hidden');
        } else {
            this.showError('No more questions available.');
        }
    }

    /**
     * Reset the game to initial state
     */
    resetGame() {
        this.game.resetGame();
        this.updateStats();
        this.elements.questionText.textContent = 'Click "Start Game" to begin your HollyBolly adventure!';
        this.elements.answersGrid.innerHTML = '';
        this.elements.resultContainer.classList.add('hidden');
        this.elements.startBtn.classList.remove('hidden');
        this.elements.nextBtn.classList.add('hidden');
    }

    /**
     * Update the statistics display
     */
    updateStats() {
        const stats = this.game.getStats();
        this.elements.score.textContent = stats.score;
        this.elements.streak.textContent = stats.currentStreak;
        this.elements.accuracy.textContent = stats.accuracy + '%';
    }

    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.elements.questionText.textContent = message;
        this.elements.answersGrid.innerHTML = '';
        console.error(message);
    }
}

