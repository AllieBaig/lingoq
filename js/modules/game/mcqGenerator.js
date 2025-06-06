
import { arrayUtils } from '../utils/helpers.js';
import { animalsData } from '../../data/questions/classic/animals.js';
import { placesData } from '../../data/questions/classic/places.js';
import { thingsData } from '../../data/questions/classic/things.js';
import { NAMES_DATABASE } from '../../data/questions/classic/names.js';

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
        let questionText = `Choose a ${category.toUpperCase()} that starts with "${letter}"`;
        let answers = [];
        let correctAnswer = null;

        if (category === 'name') {
            const letterData = NAMES_DATABASE[letter] || { easy: [] };
            const correctPool = letterData.easy || [];
            const otherNames = [];
            for (const [ltr, data] of Object.entries(NAMES_DATABASE)) {
                if (ltr !== letter && data.easy) {
                    otherNames.push(...data.easy.map(n => n.name));
                }
            }

            if (correctPool.length > 0) {
                correctAnswer = arrayUtils.randomElement(correctPool).name;
            } else {
                correctAnswer = arrayUtils.randomElement(otherNames) || '';
            }

            const wrongChoices = arrayUtils.randomElements(otherNames, choiceCount - 1);
            answers = [correctAnswer, ...wrongChoices];
        } else {
            const dataMap = { place: placesData, animal: animalsData, thing: thingsData };
            const dataset = dataMap[category];
            if (dataset && dataset.questions) {
                const pool = dataset.questions.filter(q => q.letter === letter);
                const selected = pool.length > 0 ? arrayUtils.randomElement(pool) : arrayUtils.randomElement(dataset.questions);
                questionText = selected.question;
                correctAnswer = selected.correctAnswer;
                const incorrect = selected.options.filter(o => o !== correctAnswer);
                const wrongChoices = arrayUtils.randomElements(incorrect, choiceCount - 1);
                answers = [correctAnswer, ...wrongChoices];
            }
        }

        answers = arrayUtils.shuffle(answers).slice(0, choiceCount);

        const choices = answers.map(choice => ({
            text: choice,
            correct: choice === correctAnswer,
            explanation: choice === correctAnswer ? 'Correct!' : 'Try again!'
        }));

        return {
            type: 'classic',
            category,
            letter,
            text: questionText,
            choices
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

    // Deprecated mock choice generator retained for backward compatibility
    generateChoices() {
        return [];
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
