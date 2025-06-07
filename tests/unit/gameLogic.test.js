




/**
 * Purpose: Unit tests for GameLogic module functionality
 * Key features: Game flow testing, state management, question handling, scoring validation
 * Dependencies: Jest testing framework, GameLogic module, mock data
 * Related helpers: Test utilities, mock generators, assertion helpers
 * Function names: describe, test, beforeEach, afterEach, expect, mock
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: tests/unit/gameLogic.test.js
 */

import GameLogic from '../../js/modules/game/gameLogic.js';
import { jest } from '@jest/globals';

// Mock dependencies
const mockEventManager = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
};

const mockStorageManager = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
};

const mockGameStateManager = {
    getGameState: jest.fn(),
    updateGameState: jest.fn(),
    setCurrentQuestion: jest.fn(),
    getCurrentQuestion: jest.fn(),
    isGameComplete: jest.fn(),
    getTotalQuestions: jest.fn(),
    getScore: jest.fn()
};

const mockScoreCalculator = {
    calculateScore: jest.fn(),
    getCurrentScore: jest.fn(),
    getScoreHistory: jest.fn(),
    resetScore: jest.fn()
};

// Mock game state data
const mockGameState = {
    gameMode: 'classic',
    difficulty: 'easy',
    currentQuestion: 0,
    totalQuestions: 10,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeRemaining: 60,
    isActive: true,
    questions: []
};

const mockQuestion = {
    id: 'q1',
    category: 'name',
    letter: 'A',
    text: 'Choose a NAME that starts with "A"',
    choices: [
        { text: 'Alice', correct: true },
        { text: 'Bob', correct: false }
    ],
    correctAnswer: 'Alice',
    timeLimit: 60,
    points: 10
};

describe('GameLogic', () => {
    let gameLogic;
    let dependencies;

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Setup dependencies
        dependencies = {
            eventManager: mockEventManager,
            storageManager: mockStorageManager,
            gameStateManager: mockGameStateManager,
            scoreCalculator: mockScoreCalculator
        };

        // Setup default mock returns
        mockGameStateManager.getGameState.mockReturnValue(mockGameState);
        mockGameStateManager.getCurrentQuestion.mockReturnValue(mockQuestion);
        mockGameStateManager.getTotalQuestions.mockReturnValue(10);
        mockScoreCalculator.getCurrentScore.mockReturnValue(0);

        // Create GameLogic instance
        gameLogic = new GameLogic(dependencies);
    });

    afterEach(() => {
        if (gameLogic && typeof gameLogic.destroy === 'function') {
            gameLogic.destroy();
        }
    });

    describe('Initialization', () => {
        test('should initialize successfully with valid dependencies', async () => {
            await expect(gameLogic.init()).resolves.not.toThrow();
            expect(gameLogic.initialized).toBe(true);
        });

        test('should throw error when missing required dependencies', async () => {
            const invalidGameLogic = new GameLogic({});
            await expect(invalidGameLogic.init()).rejects.toThrow();
        });

        test('should setup event listeners during initialization', async () => {
            await gameLogic.init();
            expect(mockEventManager.on).toHaveBeenCalled();
        });
    });

    describe('Game Setup', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should setup game screen correctly', () => {
            const result = gameLogic.setupGameScreen(mockGameState);
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'game:screenSetup',
                expect.objectContaining({
                    gameMode: 'classic'
                })
            );
        });

        test('should show hollybolly elements for hollybolly mode', () => {
            const hollybollyState = { ...mockGameState, gameMode: 'hollybolly' };
            gameLogic.setupGameScreen(hollybollyState);
            
            // Should emit event to show hollybolly UI elements
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'ui:showElement',
                '#hollybolly-clue'
            );
        });

        test('should hide hollybolly elements for classic mode', () => {
            gameLogic.setupGameScreen(mockGameState);
            
            // Should emit event to hide hollybolly UI elements
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'ui:hideElement',
                '#hollybolly-clue'
            );
        });
    });

    describe('Question Loading', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should load next question successfully', () => {
            const result = gameLogic.loadNextQuestion(mockGameState);
            
            expect(result).toBe(true);
            expect(mockGameStateManager.getCurrentQuestion).toHaveBeenCalled();
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'game:questionLoaded',
                expect.objectContaining({
                    question: mockQuestion
                })
            );
        });

        test('should handle end of game when no more questions', () => {
            mockGameStateManager.getCurrentQuestion.mockReturnValue(null);
            mockGameStateManager.isGameComplete.mockReturnValue(true);
            
            const result = gameLogic.loadNextQuestion(mockGameState);
            
            expect(result).toBe(false);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:complete');
        });

        test('should update progress indicator', () => {
            gameLogic.loadNextQuestion(mockGameState);
            
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'ui:updateProgress',
                expect.objectContaining({
                    current: mockGameState.currentQuestion + 1,
                    total: mockGameState.totalQuestions
                })
            );
        });
    });

    describe('Answer Processing', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should process correct answer successfully', async () => {
            const answer = 'Alice';
            const timeSpent = 30;
            
            mockScoreCalculator.calculateScore.mockReturnValue({
                points: 15,
                isCorrect: true,
                timeBonus: 5
            });

            const result = await gameLogic.processAnswer(answer, timeSpent);
            
            expect(result.isCorrect).toBe(true);
            expect(mockScoreCalculator.calculateScore).toHaveBeenCalledWith(
                expect.objectContaining({
                    answer,
                    correctAnswer: mockQuestion.correctAnswer,
                    timeSpent
                })
            );
        });

        test('should process incorrect answer successfully', async () => {
            const answer = 'Bob';
            const timeSpent = 45;
            
            mockScoreCalculator.calculateScore.mockReturnValue({
                points: 0,
                isCorrect: false,
                timeBonus: 0
            });

            const result = await gameLogic.processAnswer(answer, timeSpent);
            
            expect(result.isCorrect).toBe(false);
            expect(result.points).toBe(0);
        });

        test('should emit answer processed event', async () => {
            const answer = 'Alice';
            
            await gameLogic.processAnswer(answer, 30);
            
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'game:answerProcessed',
                expect.objectContaining({
                    answer,
                    isCorrect: expect.any(Boolean)
                })
            );
        });

        test('should handle timeout scenario', async () => {
            const result = await gameLogic.processTimeout();
            
            expect(result.isTimeout).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:timeout');
        });
    });

    describe('Game Flow Control', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should start game successfully', async () => {
            const gameConfig = {
                mode: 'classic',
                difficulty: 'easy',
                questionCount: 10
            };

            const result = await gameLogic.startGame(gameConfig);
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'game:started',
                expect.objectContaining(gameConfig)
            );
        });

        test('should pause game successfully', () => {
            const result = gameLogic.pauseGame();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:paused');
        });

        test('should resume game successfully', () => {
            gameLogic.pauseGame();
            const result = gameLogic.resumeGame();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:resumed');
        });

        test('should end game successfully', async () => {
            const result = await gameLogic.endGame();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:ended');
        });

        test('should restart game successfully', async () => {
            const result = await gameLogic.restartGame();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('game:restarted');
        });
    });

    describe('Game State Management', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should get current game status', () => {
            const status = gameLogic.getGameStatus();
            
            expect(status).toEqual(
                expect.objectContaining({
                    isActive: expect.any(Boolean),
                    currentQuestion: expect.any(Number),
                    totalQuestions: expect.any(Number),
                    score: expect.any(Number)
                })
            );
        });

        test('should check if game is active', () => {
            const isActive = gameLogic.isGameActive();
            expect(typeof isActive).toBe('boolean');
        });

        test('should get game progress', () => {
            const progress = gameLogic.getGameProgress();
            
            expect(progress).toEqual(
                expect.objectContaining({
                    percentage: expect.any(Number),
                    current: expect.any(Number),
                    total: expect.any(Number)
                })
            );
        });
    });

    describe('Timer Management', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should start question timer', () => {
            const result = gameLogic.startQuestionTimer(60);
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'timer:started',
                { duration: 60 }
            );
        });

        test('should stop question timer', () => {
            gameLogic.startQuestionTimer(60);
            const result = gameLogic.stopQuestionTimer();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('timer:stopped');
        });

        test('should handle timer expiry', () => {
            const result = gameLogic.handleTimerExpiry();
            
            expect(result).toBe(true);
            expect(mockEventManager.emit).toHaveBeenCalledWith('timer:expired');
        });
    });

    describe('Error Handling', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should handle invalid answer gracefully', async () => {
            const result = await gameLogic.processAnswer(null, 30);
            
            expect(result.error).toBe(true);
            expect(result.message).toContain('Invalid answer');
        });

        test('should handle missing game state', () => {
            mockGameStateManager.getGameState.mockReturnValue(null);
            
            const result = gameLogic.loadNextQuestion(null);
            
            expect(result).toBe(false);
        });

        test('should handle score calculation errors', async () => {
            mockScoreCalculator.calculateScore.mockImplementation(() => {
                throw new Error('Score calculation failed');
            });

            const result = await gameLogic.processAnswer('Alice', 30);
            
            expect(result.error).toBe(true);
        });
    });

    describe('Cleanup and Destruction', () => {
        test('should cleanup resources on destroy', async () => {
            await gameLogic.init();
            
            await gameLogic.destroy();
            
            expect(mockEventManager.off).toHaveBeenCalled();
            expect(gameLogic.initialized).toBe(false);
        });

        test('should handle destroy when not initialized', async () => {
            await expect(gameLogic.destroy()).resolves.not.toThrow();
        });
    });

    describe('Integration with Other Modules', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should interact correctly with EventManager', () => {
            gameLogic.setupGameScreen(mockGameState);
            
            expect(mockEventManager.emit).toHaveBeenCalledWith(
                'game:screenSetup',
                expect.any(Object)
            );
        });

        test('should interact correctly with GameStateManager', () => {
            gameLogic.loadNextQuestion(mockGameState);
            
            expect(mockGameStateManager.getCurrentQuestion).toHaveBeenCalled();
        });

        test('should interact correctly with ScoreCalculator', async () => {
            await gameLogic.processAnswer('Alice', 30);
            
            expect(mockScoreCalculator.calculateScore).toHaveBeenCalled();
        });
    });

    describe('Performance', () => {
        beforeEach(async () => {
            await gameLogic.init();
        });

        test('should process answers within reasonable time', async () => {
            const startTime = Date.now();
            
            await gameLogic.processAnswer('Alice', 30);
            
            const endTime = Date.now();
            const processingTime = endTime - startTime;
            
            expect(processingTime).toBeLessThan(100); // Should be under 100ms
        });

        test('should handle multiple rapid answer submissions', async () => {
            const promises = [];
            
            for (let i = 0; i < 10; i++) {
                promises.push(gameLogic.processAnswer('Alice', 30));
            }
            
            await expect(Promise.all(promises)).resolves.not.toThrow();
        });
    });
});



