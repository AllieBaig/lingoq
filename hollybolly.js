/**
 * HollyBollyGame - Core game logic for Hollywood vs Bollywood quiz
 */
export class HollyBollyGame {
    constructor(gameData = []) {
        this.currentQuestion = null;
        this.currentDifficulty = 'easy';
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.gameLanguage = 'en';
        this.gameData = gameData;
        this.usedQuestions = new Set();
    }

    /**
     * Load game data into the game instance
     * @param {Array} gameData - Array of question objects
     * @returns {boolean} - True if data loaded successfully
     */
    loadGameData(gameData) {
        this.gameData = gameData;
        this.usedQuestions.clear();
        return this.gameData.length > 0;
    }

    /**
     * Start a new game session
     * @param {string} difficulty - Game difficulty: 'easy', 'medium', 'hard'
     * @returns {Object|null} - First question object or null if no data
     */
    startGame(difficulty = 'easy') {
        this.currentDifficulty = difficulty;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.usedQuestions.clear();
        return this.getNewQuestion();
    }

    /**
     * Get a new random question that hasn't been used yet
     * @returns {Object|null} - Formatted question object or null
     */
    getNewQuestion() {
        if (this.gameData.length === 0) return null;
        
        const availableQuestions = this.gameData.filter(q => !this.usedQuestions.has(q.id));
        
        // Reset used questions if all have been used
        if (availableQuestions.length === 0) {
            this.usedQuestions.clear();
            return this.getNewQuestion();
        }
        
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        this.currentQuestion = availableQuestions[randomIndex];
        this.usedQuestions.add(this.currentQuestion.id);
        
        return this.formatQuestion();
    }

    /**
     * Format the current question for display based on difficulty
     * @returns {Object|null} - Formatted question with shuffled answers
     */
    formatQuestion() {
        if (!this.currentQuestion) return null;
        
        const question = this.currentQuestion;
        let answers = [...question.answers];
        const correctAnswer = question.correctAnswer || answers[0];
        
        // Shuffle answers
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        
        // Limit answers based on difficulty
        const maxChoices = this.getDifficultyChoices();
        answers = answers.slice(0, maxChoices);
        
        // Ensure correct answer is included
        if (!answers.includes(correctAnswer)) {
            answers[Math.floor(Math.random() * answers.length)] = correctAnswer;
        }
        
        return {
            id: question.id,
            question: question.question,
            answers: answers,
            correctAnswer: correctAnswer,
            place: question.place,
            animal: question.animal,
            thing: question.thing,
            hollywood: question.hollywood,
            bollywood: question.bollywood,
            difficulty: this.currentDifficulty
        };
    }

    /**
     * Get number of answer choices based on difficulty
     * @returns {number} - Number of choices to show
     */
    getDifficultyChoices() {
        switch (this.currentDifficulty) {
            case 'easy': return 2;
            case 'medium': return 3;
            case 'hard': return 4;
            default: return 2;
        }
    }

    /**
     * Submit an answer and calculate results
     * @param {string} selectedAnswer - The answer selected by the player
     * @returns {Object|null} - Result object with scoring and feedback
     */
    submitAnswer(selectedAnswer) {
        if (!this.currentQuestion) return null;
        
        const question = this.formatQuestion();
        const isCorrect = selectedAnswer === question.correctAnswer;
        
        this.questionsAnswered++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            this.score += this.getDifficultyPoints();
        } else {
            this.streak = 0;
        }
        
        return {
            correct: isCorrect,
            correctAnswer: question.correctAnswer,
            selectedAnswer: selectedAnswer,
            streak: this.streak,
            score: this.score,
            reward: this.getReward(),
            explanation: this.getExplanation(),
            hollywood: question.hollywood,
            bollywood: question.bollywood
        };
    }

    /**
     * Get points awarded based on difficulty
     * @returns {number} - Points for correct answer
     */
    getDifficultyPoints() {
        switch (this.currentDifficulty) {
            case 'easy': return 10;
            case 'medium': return 15;
            case 'hard': return 25;
            default: return 10;
        }
    }

    /**
     * Get reward information based on current streak
     * @returns {Object|null} - Reward object or null if no reward
     */
    getReward() {
        if (this.streak === 1) {
            return {
                type: 'boxoffice',
                title: 'Box Office Earnings',
                hollywood: this.currentQuestion.hollywood.boxOffice,
                bollywood: this.currentQuestion.bollywood.boxOffice
            };
        } else if (this.streak === 2) {
            return {
                type: 'directors',
                title: 'Directors Net Worth',
                hollywood: this.currentQuestion.hollywood.directorNetWorth,
                bollywood: this.currentQuestion.bollywood.directorNetWorth
            };
        } else if (this.streak >= 3) {
            return {
                type: 'heroes',
                title: 'Heroes Net Worth',
                hollywood: 'N/A',
                bollywood: this.currentQuestion.bollywood.heroNetWorth
            };
        }
        return null;
    }

    /**
     * Get explanation about the movie connection
     * @returns {Object} - Explanation object with connection details
     */
    getExplanation() {
        const q = this.currentQuestion;
        return {
            place: q.place,
            animal: q.animal,
            thing: q.thing,
            connection: `${q.bollywood.title} draws inspiration from ${q.hollywood.title}, featuring key elements: ${q.place}, ${q.animal !== 'None' ? q.animal : 'symbolic elements'}, and ${q.thing}.`
        };
    }

    /**
     * Get current game statistics
     * @returns {Object} - Stats object with all game metrics
     */
    getStats() {
        return {
            score: this.score,
            questionsAnswered: this.questionsAnswered,
            correctAnswers: this.correctAnswers,
            accuracy: this.questionsAnswered > 0 ? Math.round((this.correctAnswers / this.questionsAnswered) * 100) : 0,
            currentStreak: this.streak,
            maxStreak: this.maxStreak,
            difficulty: this.currentDifficulty
        };
    }

    /**
     * Reset all game state to initial values
     */
    resetGame() {
        this.currentQuestion = null;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.usedQuestions.clear();
    }
}
