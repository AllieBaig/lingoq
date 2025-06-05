
class GameLogic {
    constructor() {
        this.initialized = false;
    }

    async init() {
        this.initialized = true;
    }

    setupGameScreen(gameState) {
        console.log('Setting up game screen for:', gameState.gameType);

        if (gameState.gameType === 'hollybolly') {
            this.showElement('#streak-counter');
            this.showElement('#hollybolly-clue');
        } else {
            this.hideElement('#streak-counter');
            this.hideElement('#hollybolly-clue');
        }
    }

    loadNextQuestion(gameState) {
        console.log('Loading next question:', gameState.currentQuestion);
        // Question loading logic will be implemented later
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
}

export default GameLogic;
