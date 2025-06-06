



/**
 * Purpose: Score calculation engine for all game modes with streak tracking
 * Key features: Multi-mode scoring, streak bonuses, time penalties, achievement tracking
 * Dependencies: gameConfig, constants, achievement system, storage management
 * Related helpers: Bonus calculations, streak management, score persistence, leaderboards
 * Function names: calculateScore, updateStreak, applyTimeBonus, trackAchievements, saveScore
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:05 | File: js/modules/game/scoreCalculator.js
 */

import { gameConfig } from '../../data/config/gameConfig.js';
import { GAME_MODES, DIFFICULTY_LEVELS, ANSWER_STATES } from '../../data/config/constants.js';

export class ScoreCalculator {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.currentGameScore = 0;
        this.currentStreak = 0;
        this.maxStreak = 0;
        this.totalAnswered = 0;
        this.correctAnswers = 0;
        this.gameMode = GAME_MODES.CLASSIC;
        this.difficulty = DIFFICULTY_LEVELS.MEDIUM;
        this.gameStartTime = null;
        this.questionStartTime = null;
        this.bonusHistory = [];
        this.isInitialized = false;
    }
    
    async init() {
        console.log('🧮 ScoreCalculator initializing...');
        
        // Reset all scoring data
        this.resetGame();
        
        this.isInitialized = true;
        console.log('✅ ScoreCalculator initialized');
    }
    
    startGame(gameMode, difficulty) {
        this.gameMode = gameMode;
        this.difficulty = difficulty;
        this.gameStartTime = Date.now();
        this.resetGame();
        
        console.log(`🎮 Score tracking started for ${gameMode} (${difficulty})`);
        
        // Emit game started event
        this.eventManager.emit('score:gameStarted', {
            gameMode: this.gameMode,
            difficulty: this.difficulty,
            timestamp: this.gameStartTime
        });
    }
    
    startQuestion() {
        this.questionStartTime = Date.now();
    }
    
    calculateScore(answerState, questionData = {}) {
        try {
            const scoreData = {
                baseScore: 0,
                timeBonus: 0,
                streakBonus: 0,
                difficultyMultiplier: 0,
                totalQuestionScore: 0,
                previousScore: this.currentGameScore,
                answerState,
                questionData
            };
            
            // Calculate base score based on answer state
            scoreData.baseScore = this.getBaseScore(answerState);
            
            // Apply difficulty multiplier
            scoreData.difficultyMultiplier = this.getDifficultyMultiplier();
            scoreData.baseScore *= scoreData.difficultyMultiplier;
            
            // Calculate time bonus for correct answers
            if (answerState === ANSWER_STATES.CORRECT) {
                scoreData.timeBonus = this.calculateTimeBonus();
                scoreData.streakBonus = this.calculateStreakBonus();
                
                // Update streak
                this.updateStreak(true);
                this.correctAnswers++;
            } else {
                // Reset streak on incorrect answer
                this.updateStreak(false);
            }
            
            // Calculate total question score
            scoreData.totalQuestionScore = Math.max(0, 
                scoreData.baseScore + scoreData.timeBonus + scoreData.streakBonus
            );
            
            // Update game score
            this.currentGameScore += scoreData.totalQuestionScore;
            this.totalAnswered++;
            
            // Track bonuses
            this.trackBonus(scoreData);
            
            // Emit score updated event
            this.eventManager.emit('score:updated', {
                ...scoreData,
                currentGameScore: this.currentGameScore,
                currentStreak: this.currentStreak,
                accuracy: this.getAccuracy()
            });
            
            console.log(`💯 Score calculated: +${scoreData.totalQuestionScore} (Total: ${this.currentGameScore})`);
            
            return scoreData;
            
        } catch (error) {
            console.error('❌ Error calculating score:', error);
            return this.getErrorScoreData(answerState);
        }
    }
    
    getBaseScore(answerState) {
        const modeConfig = gameConfig.modes[this.gameMode];
        
        if (!modeConfig || !modeConfig.scoring) {
            return this.getDefaultScore(answerState);
        }
        
        switch (answerState) {
            case ANSWER_STATES.CORRECT:
                return modeConfig.scoring.correct || 10;
                
            case ANSWER_STATES.INCORRECT:
                return modeConfig.scoring.incorrect || 0;
                
            case ANSWER_STATES.SKIPPED:
                return gameConfig.scoring.penalties.skipQuestion || -5;
                
            case ANSWER_STATES.TIMEOUT:
                return gameConfig.scoring.penalties.timeOut || -3;
                
            default:
                return 0;
        }
    }
    
    getDefaultScore(answerState) {
        switch (answerState) {
            case ANSWER_STATES.CORRECT:
                return 10;
            case ANSWER_STATES.INCORRECT:
                return 0;
            default:
                return -2;
        }
    }
    
    getDifficultyMultiplier() {
        const difficultyConfig = gameConfig.difficulty[this.difficulty];
        
        if (!difficultyConfig) {
            return 1.0;
        }
        
        // Use timeMultiplier as difficulty multiplier for scoring
        return difficultyConfig.timeMultiplier || 1.0;
    }
    
    calculateTimeBonus() {
        if (!this.questionStartTime) {
            return 0;
        }
        
        const timeElapsed = Date.now() - this.questionStartTime;
        const timeInSeconds = timeElapsed / 1000;
        
        // Get time limit for current mode/difficulty
        const timeLimit = this.getTimeLimit();
        const remainingTime = Math.max(0, timeLimit - timeInSeconds);
        
        // Calculate bonus based on remaining time
        const modeConfig = gameConfig.modes[this.gameMode];
        const timeBonusRate = modeConfig?.scoring?.timeBonus || 5;
        
        // Give bonus for answering quickly (within first 25% of time limit)
        const quickAnswerThreshold = timeLimit * 0.25;
        
        if (timeInSeconds <= quickAnswerThreshold) {
            return Math.round(timeBonusRate * (quickAnswerThreshold - timeInSeconds));
        }
        
        return 0;
    }
    
    calculateStreakBonus() {
        if (this.currentStreak < 2) {
            return 0;
        }
        
        const modeConfig = gameConfig.modes[this.gameMode];
        const streakMultiplier = modeConfig?.scoring?.streakMultiplier || 1.2;
        const maxStreak = modeConfig?.scoring?.maxStreak || 5;
        
        // Calculate bonus based on streak length
        const effectiveStreak = Math.min(this.currentStreak, maxStreak);
        const baseScore = this.getBaseScore(ANSWER_STATES.CORRECT);
        
        return Math.round(baseScore * (streakMultiplier - 1) * effectiveStreak);
    }
    
    updateStreak(isCorrect) {
        if (isCorrect) {
            this.currentStreak++;
            this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
            
            // Emit streak events for achievements
            this.eventManager.emit('score:streakUpdated', {
                currentStreak: this.currentStreak,
                maxStreak: this.maxStreak,
                isNewRecord: this.currentStreak === this.maxStreak
            });
            
        } else {
            if (this.currentStreak > 0) {
                this.eventManager.emit('score:streakBroken', {
                    brokenStreak: this.currentStreak,
                    maxStreak: this.maxStreak
                });
            }
            
            this.currentStreak = 0;
        }
    }
    
    getTimeLimit() {
        const modeConfig = gameConfig.modes[this.gameMode];
        const difficultyConfig = gameConfig.difficulty[this.difficulty];
        
        let baseTimeLimit = modeConfig?.timeLimit || gameConfig.timer.defaultTime;
        
        if (difficultyConfig?.timeMultiplier) {
            baseTimeLimit *= difficultyConfig.timeMultiplier;
        }
        
        return baseTimeLimit;
    }
    
    trackBonus(scoreData) {
        if (scoreData.timeBonus > 0 || scoreData.streakBonus > 0) {
            this.bonusHistory.push({
                timestamp: Date.now(),
                timeBonus: scoreData.timeBonus,
                streakBonus: scoreData.streakBonus,
                streak: this.currentStreak,
                questionNumber: this.totalAnswered
            });
        }
    }
    
    applySpecialBonus(bonusType, amount, reason = '') {
        const bonus = {
            type: bonusType,
            amount,
            reason,
            timestamp: Date.now()
        };
        
        this.currentGameScore += amount;
        this.bonusHistory.push(bonus);
        
        this.eventManager.emit('score:specialBonus', {
            ...bonus,
            currentGameScore: this.currentGameScore
        });
        
        console.log(`⭐ Special bonus applied: ${bonusType} (+${amount}) - ${reason}`);
    }
    
    getGameSummary() {
        const gameEndTime = Date.now();
        const gameDuration = this.gameStartTime ? gameEndTime - this.gameStartTime : 0;
        
        return {
            // Basic stats
            finalScore: this.currentGameScore,
            totalAnswered: this.totalAnswered,
            correctAnswers: this.correctAnswers,
            accuracy: this.getAccuracy(),
            
            // Streak data
            maxStreak: this.maxStreak,
            currentStreak: this.currentStreak,
            
            // Time data
            gameDuration,
            averageTimePerQuestion: this.totalAnswered > 0 ? gameDuration / this.totalAnswered : 0,
            
            // Game settings
            gameMode: this.gameMode,
            difficulty: this.difficulty,
            
            // Bonus information
            totalBonuses: this.calculateTotalBonuses(),
            bonusBreakdown: this.getBonusBreakdown(),
            
            // Performance metrics
            scorePerMinute: gameDuration > 0 ? (this.currentGameScore / (gameDuration / 60000)) : 0,
            
            // Timestamps
            gameStartTime: this.gameStartTime,
            gameEndTime
        };
    }
    
    getAccuracy() {
        return this.totalAnswered > 0 ? 
            Math.round((this.correctAnswers / this.totalAnswered) * 100) : 0;
    }
    
    calculateTotalBonuses() {
        return this.bonusHistory.reduce((total, bonus) => {
            return total + (bonus.timeBonus || 0) + (bonus.streakBonus || 0) + (bonus.amount || 0);
        }, 0);
    }
    
    getBonusBreakdown() {
        const breakdown = {
            timeBonus: 0,
            streakBonus: 0,
            specialBonus: 0
        };
        
        this.bonusHistory.forEach(bonus => {
            breakdown.timeBonus += bonus.timeBonus || 0;
            breakdown.streakBonus += bonus.streakBonus || 0;
            breakdown.specialBonus += bonus.amount || 0;
        });
        
        return breakdown;
    }
    
    saveGameScore() {
        const summary = this.getGameSummary();
        
        try {
            // Save to local storage
            const scoreHistory = this.storageManager.getItem('game_scores') || [];
            scoreHistory.push(summary);
            
            // Keep only last 100 games
            if (scoreHistory.length > 100) {
                scoreHistory.splice(0, scoreHistory.length - 100);
            }
            
            this.storageManager.setItem('game_scores', scoreHistory);
            
            // Update high scores
            this.updateHighScores(summary);
            
            console.log('💾 Game score saved');
            
            return summary;
            
        } catch (error) {
            console.error('❌ Failed to save game score:', error);
            return summary;
        }
    }
    
    updateHighScores(gameSummary) {
        try {
            const highScores = this.storageManager.getItem('high_scores') || {};
            const key = `${gameSummary.gameMode}_${gameSummary.difficulty}`;
            
            if (!highScores[key] || gameSummary.finalScore > highScores[key].score) {
                highScores[key] = {
                    score: gameSummary.finalScore,
                    accuracy: gameSummary.accuracy,
                    maxStreak: gameSummary.maxStreak,
                    date: gameSummary.gameEndTime,
                    gameMode: gameSummary.gameMode,
                    difficulty: gameSummary.difficulty
                };
                
                this.storageManager.setItem('high_scores', highScores);
                
                // Emit high score event
                this.eventManager.emit('score:newHighScore', {
                    ...highScores[key],
                    category: key
                });
                
                console.log('🏆 New high score achieved!');
            }
            
        } catch (error) {
            console.error('❌ Failed to update high scores:', error);
        }
    }
    
    getCurrentScore() {
        return this.currentGameScore;
    }
    
    getCurrentStreak() {
        return this.currentStreak;
    }
    
    getMaxStreak() {
        return this.maxStreak;
    }
    
    resetGame() {
        this.currentGameScore = 0;
        this.currentStreak = 0;
        this.maxStreak = 0;
        this.totalAnswered = 0;
        this.correctAnswers = 0;
        this.gameStartTime = null;
        this.questionStartTime = null;
        this.bonusHistory = [];
        
        console.log('🔄 Score calculator reset for new game');
    }
    
    getErrorScoreData(answerState) {
        return {
            baseScore: 0,
            timeBonus: 0,
            streakBonus: 0,
            difficultyMultiplier: 1,
            totalQuestionScore: 0,
            previousScore: this.currentGameScore,
            answerState,
            error: true
        };
    }
    
    async destroy() {
        console.log('🗑️ ScoreCalculator destroying...');
        
        // Save final score if game is in progress
        if (this.gameStartTime && this.totalAnswered > 0) {
            this.saveGameScore();
        }
        
        // Reset all data
        this.resetGame();
        
        this.eventManager = null;
        this.storageManager = null;
        this.isInitialized = false;
    }
}

export default ScoreCalculator;


