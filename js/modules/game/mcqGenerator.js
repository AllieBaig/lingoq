
class MCQGenerator {
    constructor() {
        this.categories = ['name', 'place', 'animal', 'thing'];
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    }

    async init() {
        console.log('MCQ Generator initialized');
    }

    async generateQuestions(totalQuestions, mode, gameType) {
        const questions = [];
        const choiceCount = this.getChoiceCount(mode);

        for (let i = 0; i < totalQuestions; i++) {
            const question = await this.generateSingleQuestion(choiceCount, gameType);
            questions.push(question);
        }

        return questions;
    }

    async generateSingleQuestion(choiceCount, gameType) {
        const category = this.getRandomCategory();
        const letter = this.getRandomLetter();

        if (gameType === 'hollybolly') {
            return this.generateHollyBollyQuestion(choiceCount, letter);
        } else {
            return this.generateClassicQuestion(choiceCount, category, letter);
        }
    }

    generateClassicQuestion(choiceCount, category, letter) {
        const choices = this.generateChoices(choiceCount, category, letter);

        return {
            type: 'classic',
            category: category,
            letter: letter,
            text: `Choose a ${category.toUpperCase()} that starts with "${letter}"`,
            choices: choices
        };
    }

    generateHollyBollyQuestion(choiceCount, letter) {
        // Mock HollyBolly question
        const movies = ['Spider-Man', 'Batman', 'Superman', 'Iron Man'];
        const choices = movies.slice(0, choiceCount).map((movie, index) => ({
            text: movie,
            correct: index === 0,
            explanation: index === 0 ? 'Correct!' : 'Try again!'
        }));

        return {
            type: 'hollybolly',
            text: 'Which movie matches these clues?',
            clues: {
                place: 'New York City',
                animal: 'Spider',
                thing: 'Web'
            },
            choices: choices
        };
    }

    generateChoices(choiceCount, category, letter) {
        // Mock choices for demo
        const mockChoices = {
            name: ['Alice', 'Bob', 'Charlie', 'David'],
            place: ['Australia', 'Brazil', 'Canada', 'Denmark'],
            animal: ['Ant', 'Bear', 'Cat', 'Dog'],
            thing: ['Apple', 'Book', 'Car', 'Door']
        };

        const categoryChoices = mockChoices[category] || mockChoices.name;
        return categoryChoices.slice(0, choiceCount).map((choice, index) => ({
            text: choice,
            correct: index === 0,
            explanation: index === 0 ? 'Correct!' : 'Try again!'
        }));
    }

    getChoiceCount(mode) {
        const counts = { easy: 2, medium: 3, hard: 4 };
        return counts[mode] || 2;
    }

    getRandomCategory() {
        return this.categories[Math.floor(Math.random() * this.categories.length)];
    }

    getRandomLetter() {
        return this.letters[Math.floor(Math.random() * this.letters.length)];
    }
}

export default MCQGenerator;
