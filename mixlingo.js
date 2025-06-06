import { mixlingoData } from './mixlingoData.js';

export class MixLingoGame {
    constructor(gameData = mixlingoData) {
        this.currentQuestion = null;
        this.currentDifficulty = 'easy';
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.gameData = gameData;
        this.usedQuestions = new Set();
    }

    loadGameData(gameData) {
        this.gameData = gameData;
        this.usedQuestions.clear();
        return this.gameData.length > 0;
    }

    startGame(difficulty = 'easy') {
        this.currentDifficulty = difficulty;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.usedQuestions.clear();
        return this.getNewQuestion();
    }

    getNewQuestion() {
        if (this.gameData.length === 0) return null;
        const available = this.gameData.filter(q => !this.usedQuestions.has(q.id));
        if (available.length === 0) {
            this.usedQuestions.clear();
            return this.getNewQuestion();
        }
        const randomIndex = Math.floor(Math.random() * available.length);
        this.currentQuestion = available[randomIndex];
        this.usedQuestions.add(this.currentQuestion.id);
        return this.formatQuestion();
    }

    formatQuestion() {
        if (!this.currentQuestion) return null;
        const q = this.currentQuestion;
        let answers = [...q.answers];
        const correct = q.correctAnswer;
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        const maxChoices = this.getDifficultyChoices();
        answers = answers.slice(0, maxChoices);
        if (!answers.includes(correct)) {
            answers[Math.floor(Math.random() * answers.length)] = correct;
        }
        return {
            id: q.id,
            question: q.question,
            answers,
            correctAnswer: correct,
            language: q.language,
            difficulty: this.currentDifficulty
        };
    }

    getDifficultyChoices() {
        switch (this.currentDifficulty) {
            case 'easy': return 2;
            case 'medium': return 3;
            case 'hard': return 4;
            default: return 2;
        }
    }

    submitAnswer(selected) {
        if (!this.currentQuestion) return null;
        const question = this.formatQuestion();
        const correct = selected === question.correctAnswer;
        this.questionsAnswered++;
        if (correct) {
            this.correctAnswers++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            this.score += this.getDifficultyPoints();
        } else {
            this.streak = 0;
        }
        return {
            correct,
            correctAnswer: question.correctAnswer,
            selectedAnswer: selected,
            streak: this.streak,
            score: this.score,
            reward: null,
            explanation: null
        };
    }

    getDifficultyPoints() {
        switch (this.currentDifficulty) {
            case 'easy': return 10;
            case 'medium': return 15;
            case 'hard': return 25;
            default: return 10;
        }
    }

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

// default export for compatibility
export default MixLingoGame;
