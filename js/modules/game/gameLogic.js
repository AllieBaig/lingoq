
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
        if (gameState.currentQuestion >= gameState.totalQuestions) {
            // End game if we've reached the final question
            return;
        }

        const question = gameState.questions[gameState.currentQuestion];

        // Update question display
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('current-category').textContent = question.category;
        document.getElementById('current-letter').textContent = question.letter;

        // Update HollyBolly clues if applicable
        if (gameState.gameType === 'hollybolly' && question.clues) {
            document.getElementById('place-clue').textContent = question.clues.place;
            document.getElementById('animal-clue').textContent = question.clues.animal;
            document.getElementById('thing-clue').textContent = question.clues.thing;
        }

        // Render choices
        this.renderChoices(question.choices);

        // Update progress
        gameState.currentQuestion++;
        this.updateGameProgress(gameState);
        this.updateStreakDisplay(gameState);

        // Disable confirm button until a choice is selected
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

    confirmAnswer(gameState) {
        const selected = document.querySelector('.choice-option.selected');
        if (!selected) return;

        const choiceIndex = parseInt(selected.dataset.choiceIndex, 10);
        const question = gameState.questions[gameState.currentQuestion - 1];
        const choice = question.choices[choiceIndex];
        const isCorrect = choice.correct;

        if (isCorrect) {
            selected.classList.add('correct');
            gameState.correctAnswers++;
            gameState.streak++;
            gameState.bestStreak = Math.max(gameState.bestStreak, gameState.streak);
        } else {
            selected.classList.add('incorrect');
            gameState.incorrectAnswers++;
            gameState.streak = 0;
        }

        this.disableChoices();
        this.updateStreakDisplay(gameState);

        setTimeout(() => {
            this.loadNextQuestion(gameState);
        }, 800);
    }

    selectChoice(choiceElement) {
        document.querySelectorAll('.choice-option').forEach(el => {
            el.classList.remove('selected');
        });

        choiceElement.classList.add('selected');
        this.enableConfirmButton();
    }

    updateGameProgress(gameState) {
        const current = gameState.currentQuestion;
        const total = gameState.totalQuestions;
        const percentage = (current / total) * 100;

        document.getElementById('current-question').textContent = current;
        document.getElementById('total-questions').textContent = total;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    updateStreakDisplay(gameState) {
        if (gameState.gameType === 'hollybolly') {
            document.getElementById('current-streak').textContent = gameState.streak;

            const nextRewardText = this.getNextRewardText(gameState.streak);
            document.getElementById('next-reward-text').textContent = nextRewardText;
        }
    }

    getNextRewardText(streak) {
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
