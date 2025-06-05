
class GameStateManager {
    constructor() {
        this.gameState = null;
    }

    async init() {
        console.log('Game state manager initialized');
    }

    async initializeGame(mode, gameType) {
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
            answers: []
        };
    }

    getGameState() {
        return this.gameState;
    }

    getTotalQuestions() {
        return this.gameState ? this.gameState.totalQuestions : 20;
    }

    setQuestions(questions) {
        if (this.gameState) {
            this.gameState.questions = questions;
        }
    }
}

export default GameStateManager;
