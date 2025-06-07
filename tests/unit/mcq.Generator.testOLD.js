







/**
 * Purpose: Unit tests for MCQGenerator module functionality
 * Key features: Question generation testing, MCQ creation, difficulty validation, data integrity
 * Dependencies: Jest testing framework, MCQGenerator module, mock question data
 * Related helpers: Test utilities, mock data generators, validation helpers
 * Function names: describe, test, beforeEach, afterEach, expect, mock
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: tests/unit/mcqGenerator.test.js
 */

import MCQGenerator from '../../js/modules/game/mcqGenerator.js';
import { jest } from '@jest/globals';

// Mock data imports
const mockNamesData = {
    A: { easy: [{ name: 'Alice' }, { name: 'Andrew' }] },
    B: { easy: [{ name: 'Bob' }, { name: 'Betty' }] },
    C: { easy: [{ name: 'Charlie' }, { name: 'Carol' }] }
};

const mockPlacesData = {
    questions: [
        {
            letter: 'A',
            question: 'Choose a PLACE that starts with "A"',
            correctAnswer: 'America',
            options: ['America', 'Brazil', 'Canada', 'Denmark']
        },
        {
            letter: 'B',
            question: 'Choose a PLACE that starts with "B"',
            correctAnswer: 'Brazil',
            options: ['America', 'Brazil', 'Canada', 'Denmark']
        }
    ]
};

const mockAnimalsData = {
    questions: [
        {
            letter: 'A',
            question: 'Choose an ANIMAL that starts with "A"',
            correctAnswer: 'Ant',
            options: ['Ant', 'Bear', 'Cat', 'Dog']
        }
    ]
};

const mockThingsData = {
    questions: [
        {
            letter: 'A',
            question: 'Choose a THING that starts with "A"',
            correctAnswer: 'Apple',
            options: ['Apple', 'Book', 'Car', 'Door']
        }
    ]
};

const mockHollyBollyData = [
    {
        id: 'movie1',
        title: 'Spider-Man',
        clues: {
            place: 'New York City',
            animal: 'Spider',
            thing: 'Web'
        },
        difficulty: 'medium'
    },
    {
        id: 'movie2',
        title: 'Batman',
        clues: {
            place: 'Gotham City',
            animal: 'Bat',
            thing: 'Cave'
        },
        difficulty: 'easy'
    }
];

// Mock modules
jest.mock('../../js/data/questions/classic/names.js', () => ({
    NAMES_DATABASE: mockNamesData
}));

jest.mock('../../js/data/questions/classic/places.js', () => ({
    placesData: mockPlacesData
}));

jest.mock('../../js/data/questions/classic/animals.js', () => ({
    animalsData: mockAnimalsData
}));

jest.mock('../../js/data/questions/classic/things.js', () => ({
    thingsData: mockThingsData
}));

jest.mock('../../js/data/questions/hollybolly/movies.js', () => ({
    hollyBollyMovies: mockHollyBollyData
}));

describe('MCQGenerator', () => {
    let mcqGenerator;

    beforeEach(async () => {
        mcqGenerator = new MCQGenerator();
        await mcqGenerator.init();
    });

    afterEach(() => {
        if (mcqGenerator && typeof mcqGenerator.destroy === 'function') {
            mcqGenerator.destroy();
        }
    });

    describe('Initialization', () => {
        test('should initialize successfully', async () => {
            const generator = new MCQGenerator();
            await expect(generator.init()).resolves.not.toThrow();
        });

        test('should set initialized flag to true', async () => {
            const generator = new MCQGenerator();
            await generator.init();
            expect(generator.initialized).toBe(true);
        });
    });

    describe('Question Generation', () => {
        test('should generate specified number of questions', async () => {
            const questions = await mcqGenerator.generateQuestions(5, 'easy', 'classic');
            
            expect(questions).toHaveLength(5);
            expect(Array.isArray(questions)).toBe(true);
        });

        test('should generate questions with correct structure', async () => {
            const questions = await mcqGenerator.generateQuestions(1, 'easy', 'classic');
            const question = questions[0];
            
            expect(question).toHaveProperty('type');
            expect(question).toHaveProperty('category');
            expect(question).toHaveProperty('letter');
            expect(question).toHaveProperty('text');
            expect(question).toHaveProperty('choices');
            expect(Array.isArray(question.choices)).toBe(true);
        });

        test('should generate questions for different difficulties', async () => {
            const easyQuestions = await mcqGenerator.generateQuestions(2, 'easy', 'classic');
            const mediumQuestions = await mcqGenerator.generateQuestions(2, 'medium', 'classic');
            const hardQuestions = await mcqGenerator.generateQuestions(2, 'hard', 'classic');
            
            expect(easyQuestions).toHaveLength(2);
            expect(mediumQuestions).toHaveLength(2);
            expect(hardQuestions).toHaveLength(2);
        });

        test('should generate questions for different game types', async () => {
            const classicQuestions = await mcqGenerator.generateQuestions(2, 'easy', 'classic');
            const hollyBollyQuestions = await mcqGenerator.generateQuestions(2, 'easy', 'hollybolly');
            
            expect(classicQuestions[0].type).toBe('classic');
            expect(hollyBollyQuestions[0].type).toBe('hollybolly');
        });
    });

    describe('Classic Question Generation', () => {
        test('should generate name questions correctly', async () => {
            const question = mcqGenerator.generateClassicQuestion(2, 'name', 'A');
            
            expect(question.category).toBe('name');
            expect(question.letter).toBe('A');
            expect(question.text).toContain('NAME');
            expect(question.text).toContain('"A"');
            expect(question.choices).toHaveLength(2);
        });

        test('should generate place questions correctly', async () => {
            const question = mcqGenerator.generateClassicQuestion(3, 'place', 'A');
            
            expect(question.category).toBe('place');
            expect(question.letter).toBe('A');
            expect(question.text).toContain('PLACE');
            expect(question.choices).toHaveLength(3);
        });

        test('should generate animal questions correctly', async () => {
            const question = mcqGenerator.generateClassicQuestion(2, 'animal', 'A');
            
            expect(question.category).toBe('animal');
            expect(question.letter).toBe('A');
            expect(question.text).toContain('ANIMAL');
            expect(question.choices).toHaveLength(2);
        });

        test('should generate thing questions correctly', async () => {
            const question = mcqGenerator.generateClassicQuestion(2, 'thing', 'A');
            
            expect(question.category).toBe('thing');
            expect(question.letter).toBe('A');
            expect(question.text).toContain('THING');
            expect(question.choices).toHaveLength(2);
        });

        test('should include correct answer in choices', async () => {
            const question = mcqGenerator.generateClassicQuestion(2, 'name', 'A');
            const correctChoice = question.choices.find(choice => choice.correct);
            
            expect(correctChoice).toBeDefined();
            expect(correctChoice.text).toBeDefined();
            expect(correctChoice.correct).toBe(true);
        });

        test('should include incorrect answers in choices', async () => {
            const question = mcqGenerator.generateClassicQuestion(3, 'name', 'A');
            const incorrectChoices = question.choices.filter(choice => !choice.correct);
            
            expect(incorrectChoices).toHaveLength(2);
            incorrectChoices.forEach(choice => {
                expect(choice.correct).toBe(false);
            });
        });

        test('should shuffle answer choices', async () => {
            const questions = [];
            for (let i = 0; i < 10; i++) {
                questions.push(mcqGenerator.generateClassicQuestion(3, 'name', 'A'));
            }
            
            // Check that correct answer is not always in the same position
            const correctPositions = questions.map(q => 
                q.choices.findIndex(choice => choice.correct)
            );
            
            const uniquePositions = [...new Set(correctPositions)];
            expect(uniquePositions.length).toBeGreaterThan(1);
        });
    });

    describe('HollyBolly Question Generation', () => {
        test('should generate hollybolly questions correctly', async () => {
            const question = mcqGenerator.generateHollyBollyQuestion(2, 'A');
            
            expect(question.type).toBe('hollybolly');
            expect(question.text).toContain('clues');
            expect(question.clues).toBeDefined();
            expect(question.clues).toHaveProperty('place');
            expect(question.clues).toHaveProperty('animal');
            expect(question.clues).toHaveProperty('thing');
        });

        test('should include movie choices', async () => {
            const question = mcqGenerator.generateHollyBollyQuestion(3, 'medium');
            
            expect(question.choices).toHaveLength(3);
            expect(question.choices.every(choice => 
                typeof choice.text === 'string'
            )).toBe(true);
        });

        test('should have correct movie as one of the choices', async () => {
            const question = mcqGenerator.generateHollyBollyQuestion(2, 'easy');
            const correctChoice = question.choices.find(choice => choice.correct);
            
            expect(correctChoice).toBeDefined();
            expect(correctChoice.correct).toBe(true);
        });
    });

    describe('Choice Count Handling', () => {
        test('should return correct choice count for easy mode', () => {
            const count = mcqGenerator.getChoiceCount('easy');
            expect(count).toBe(2);
        });

        test('should return correct choice count for medium mode', () => {
            const count = mcqGenerator.getChoiceCount('medium');
            expect(count).toBe(3);
        });

        test('should return correct choice count for hard mode', () => {
            const count = mcqGenerator.getChoiceCount('hard');
            expect(count).toBe(4);
        });

        test('should return default choice count for invalid mode', () => {
            const count = mcqGenerator.getChoiceCount('invalid');
            expect(count).toBe(2);
        });
    });

    describe('Random Generation Utilities', () => {
        test('should generate random categories', () => {
            const categories = [];
            for (let i = 0; i < 20; i++) {
                categories.push(mcqGenerator.getRandomCategory());
            }
            
            const uniqueCategories = [...new Set(categories)];
            expect(uniqueCategories.length).toBeGreaterThan(1);
            expect(uniqueCategories.every(cat => 
                ['name', 'place', 'animal', 'thing'].includes(cat)
            )).toBe(true);
        });

        test('should generate random letters', () => {
            const letters = [];
            for (let i = 0; i < 20; i++) {
                letters.push(mcqGenerator.getRandomLetter());
            }
            
            const uniqueLetters = [...new Set(letters)];
            expect(uniqueLetters.length).toBeGreaterThan(1);
            expect(uniqueLetters.every(letter => 
                /^[A-Z]$/.test(letter)
            )).toBe(true);
        });
    });

    describe('Data Validation', () => {
        test('should handle missing data gracefully', async () => {
            // Test with empty mock data
            const generator = new MCQGenerator();
            generator.categories = [];
            
            const questions = await generator.generateQuestions(1, 'easy', 'classic');
            expect(questions).toHaveLength(1);
        });

        test('should validate question structure', async () => {
            const questions = await mcqGenerator.generateQuestions(3, 'medium', 'classic');
            
            questions.forEach(question => {
                expect(question).toHaveProperty('type');
                expect(question).toHaveProperty('text');
                expect(question).toHaveProperty('choices');
                expect(Array.isArray(question.choices)).toBe(true);
                expect(question.choices.length).toBeGreaterThan(0);
                
                // Validate choices structure
                question.choices.forEach(choice => {
                    expect(choice).toHaveProperty('text');
                    expect(choice).toHaveProperty('correct');
                    expect(typeof choice.correct).toBe('boolean');
                });
                
                // Ensure exactly one correct answer
                const correctChoices = question.choices.filter(c => c.correct);
                expect(correctChoices).toHaveLength(1);
            });
        });

        test('should handle invalid parameters gracefully', async () => {
            const questions = await mcqGenerator.generateQuestions(0, 'invalid', 'unknown');
            expect(Array.isArray(questions)).toBe(true);
        });
    });

    describe('Performance', () => {
        test('should generate questions within reasonable time', async () => {
            const startTime = Date.now();
            
            await mcqGenerator.generateQuestions(10, 'medium', 'classic');
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(1000); // Should be under 1 second
        });

        test('should handle large question batches efficiently', async () => {
            const startTime = Date.now();
            
            await mcqGenerator.generateQuestions(50, 'hard', 'classic');
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000); // Should be under 5 seconds
        });
    });

    describe('Edge Cases', () => {
        test('should handle zero questions request', async () => {
            const questions = await mcqGenerator.generateQuestions(0, 'easy', 'classic');
            expect(questions).toHaveLength(0);
        });

        test('should handle negative question count', async () => {
            const questions = await mcqGenerator.generateQuestions(-5, 'easy', 'classic');
            expect(questions).toHaveLength(0);
        });

        test('should handle null/undefined parameters', async () => {
            const questions = await mcqGenerator.generateQuestions(null, undefined, null);
            expect(Array.isArray(questions)).toBe(true);
        });

        test('should handle very large question requests', async () => {
            const questions = await mcqGenerator.generateQuestions(1000, 'easy', 'classic');
            expect(questions).toHaveLength(1000);
        });
    });

    describe('Question Uniqueness', () => {
        test('should generate unique questions when possible', async () => {
            const questions = await mcqGenerator.generateQuestions(10, 'easy', 'classic');
            
            // Check for question text uniqueness
            const questionTexts = questions.map(q => q.text);
            const uniqueTexts = [...new Set(questionTexts)];
            
            // Allow some duplicates due to limited data, but should have variety
            expect(uniqueTexts.length).toBeGreaterThan(1);
        });

        test('should avoid immediate question repetition', async () => {
            const questions = await mcqGenerator.generateQuestions(5, 'easy', 'classic');
            
            // Check that consecutive questions are not identical
            for (let i = 1; i < questions.length; i++) {
                expect(questions[i].text).not.toBe(questions[i-1].text);
            }
        });
    });

    describe('Backward Compatibility', () => {
        test('should support deprecated generateChoices method', () => {
            const choices = mcqGenerator.generateChoices();
            expect(Array.isArray(choices)).toBe(true);
        });

        test('should maintain consistent API', async () => {
            // Test that the main API methods exist and return expected types
            expect(typeof mcqGenerator.generateQuestions).toBe('function');
            expect(typeof mcqGenerator.getChoiceCount).toBe('function');
            expect(typeof mcqGenerator.getRandomCategory).toBe('function');
            expect(typeof mcqGenerator.getRandomLetter).toBe('function');
        });
    });
});



