
// HollyBolly Game Module
// Hollywood-Bollywood movie guessing game

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
        
        // Game data will be loaded externally
        this.gameData = gameData;
        this.usedQuestions = new Set();
    }
    
    // Load game data from external source
    loadGameData(gameData) {
        this.gameData = gameData;
        this.usedQuestions.clear();
        return this.gameData.length > 0;
    }
    
    // Initialize game with difficulty level
    startGame(difficulty = 'easy') {
        this.currentDifficulty = difficulty;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.usedQuestions.clear();
        
        console.log(`Starting HollyBolly game on ${difficulty} difficulty`);
        return this.getNewQuestion();
    }
    
    // Get a new random question
    getNewQuestion() {
        if (this.gameData.length === 0) {
            console.error('No game data loaded');
            return null;
        }
        
        // Filter out used questions
        const availableQuestions = this.gameData.filter(q => !this.usedQuestions.has(q.id));
        
        if (availableQuestions.length === 0) {
            // All questions used, reset the pool
            this.usedQuestions.clear();
            return this.getNewQuestion();
        }
        
        // Select random question
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        this.currentQuestion = availableQuestions[randomIndex];
        this.usedQuestions.add(this.currentQuestion.id);
        
        return this.formatQuestion();
    }
    
    // Format question based on difficulty and language
    formatQuestion() {
        if (!this.currentQuestion) return null;
        
        const question = this.currentQuestion;
        let answers = [];
        let correctAnswer = '';
        
        // Handle both old format (with language objects) and new format (direct arrays)
        if (question.answers && Array.isArray(question.answers)) {
            // New format - direct array
            answers = [...question.answers];
            correctAnswer = question.correctAnswer || answers[0];
        } else if (question.answers && question.answers[this.gameLanguage]) {
            // Old format - language objects
            answers = [...question.answers[this.gameLanguage]];
            correctAnswer = answers[0];
        } else if (question.answers && question.answers.en) {
            // Fallback to English
            answers = [...question.answers.en];
            correctAnswer = answers[0];
        } else {
            console.error('Invalid question format');
            return null;
        }
        
        // Shuffle and limit answers based on difficulty
        let questionAnswers = [...answers];
        const maxChoices = this.getDifficultyChoices();
        
        // Shuffle answers
        for (let i = questionAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionAnswers[i], questionAnswers[j]] = [questionAnswers[j], questionAnswers[i]];
        }
        
        // Limit to difficulty level
        questionAnswers = questionAnswers.slice(0, maxChoices);
        
        // Ensure correct answer is included
        if (!questionAnswers.includes(correctAnswer)) {
            questionAnswers[Math.floor(Math.random() * questionAnswers.length)] = correctAnswer;
        }
        
        return {
            id: question.id,
            question: question.question,
            answers: questionAnswers,
            correctAnswer: correctAnswer,
            place: question.place,
            animal: question.animal,
            thing: question.thing,
            hollywood: question.hollywood,
            bollywood: question.bollywood,
            difficulty: this.currentDifficulty
        };
    }
    
    // Get number of choices based on difficulty
    getDifficultyChoices() {
        switch (this.currentDifficulty) {
            case 'easy': return 2;
            case 'medium': return 3;
            case 'hard': return 4;
            default: return 2;
        }
    }
    
    // Submit answer and get result
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
        
        const result = {
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
        
        return result;
    }
    
    // Get points based on difficulty
    getDifficultyPoints() {
        switch (this.currentDifficulty) {
            case 'easy': return 10;
            case 'medium': return 15;
            case 'hard': return 25;
            default: return 10;
        }
    }
    
    // Get reward based on streak
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
                hollywood: 'N/A', // Hollywood heroes data not included in this dataset
                bollywood: this.currentQuestion.bollywood.heroNetWorth
            };
        }
        return null;
    }
    
    // Get explanation about the movie connection
    getExplanation() {
        const q = this.currentQuestion;
        return {
            place: q.place,
            animal: q.animal,
            thing: q.thing,
            connection: `${q.bollywood.title} draws inspiration from ${q.hollywood.title}, featuring key elements: ${q.place}, ${q.animal !== 'None' ? q.animal : 'symbolic elements'}, and ${q.thing}.`
        };
    }
    
    // Set game language
    setLanguage(language) {
        if (['en', 'fr', 'de'].includes(language)) {
            this.gameLanguage = language;
            return true;
        }
        return false;
    }
    
    // Get game statistics
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
    
    // Reset game
    resetGame() {
        this.currentQuestion = null;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.usedQuestions.clear();
    }
    
    // Check if game data is loaded
    isDataLoaded() {
        return this.gameData && this.gameData.length > 0;
    }
    
    // Get total number of questions available
    getTotalQuestions() {
        return this.gameData ? this.gameData.length : 0;
    }
}
