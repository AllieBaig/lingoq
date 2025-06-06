



// LingoQuest - Game Configuration
// ES6 Module for game settings, rules, and behavior configuration
// Centralized configuration for all game modes and mechanics

export const gameConfig = {
    // Game version and metadata
    version: '1.0.0',
    buildDate: '2024-06-06',
    
    // Game modes configuration
    modes: {
        classic: {
            id: 'classic',
            name: 'Classic Mode',
            description: 'Traditional Name Place Animal Thing',
            enabled: true,
            categories: ['name', 'place', 'animal', 'thing'],
            timeLimit: 60, // seconds per question
            questionsPerRound: 10,
            maxRounds: 5,
            difficulty: {
                easy: { timeLimit: 90, questionsPerRound: 5 },
                medium: { timeLimit: 60, questionsPerRound: 10 },
                hard: { timeLimit: 30, questionsPerRound: 15 }
            },
            scoring: {
                correct: 10,
                incorrect: 0,
                timeBonus: 5, // bonus per remaining second
                streakMultiplier: 1.2, // multiplier for consecutive correct
                maxStreak: 5
            }
        },
        
        hollybolly: {
            id: 'hollybolly',
            name: 'HollyBolly Mode',
            description: 'Guess Hollywood movies from Bollywood clues',
            enabled: true,
            timeLimit: 45, // seconds per question
            questionsPerRound: 8,
            maxRounds: 3,
            rewardThresholds: {
                boxOffice: 1,    // 1 correct answer
                director: 2,     // 2 consecutive correct
                hero: 3          // 3 consecutive correct
            },
            scoring: {
                correct: 15,
                incorrect: 0,
                rewardBonus: 25, // bonus for unlocking rewards
                streakMultiplier: 1.5,
                maxStreak: 3
            },
            clueTypes: ['place', 'animal', 'thing']
        },

        mixlingo: {
            id: 'mixlingo',
            name: 'MixLingo Mode',
            description: 'Complete sentences with the correct foreign word',
            enabled: true,
            timeLimit: 40,
            questionsPerRound: 10,
            maxRounds: 3,
            scoring: {
                correct: 10,
                incorrect: 0,
                rewardBonus: 0,
                streakMultiplier: 1.2,
                maxStreak: 5
            }
        }
    },
    
    // Difficulty settings
    difficulty: {
        easy: {
            id: 'easy',
            name: 'Easy',
            timeMultiplier: 1.5,
            hintDelay: 10, // seconds before hint available
            skipPenalty: 0,
            targetAudience: 'seniors'
        },
        
        medium: {
            id: 'medium',
            name: 'Medium',
            timeMultiplier: 1.0,
            hintDelay: 20,
            skipPenalty: 2,
            targetAudience: 'general'
        },
        
        hard: {
            id: 'hard',
            name: 'Hard',
            timeMultiplier: 0.7,
            hintDelay: 30,
            skipPenalty: 5,
            targetAudience: 'students'
        }
    },
    
    // Scoring system
    scoring: {
        basePoints: {
            easy: 5,
            medium: 10,
            hard: 20
        },
        
        bonusPoints: {
            perfectRound: 50,    // all questions correct in round
            speedBonus: 25,      // answer within 5 seconds
            noHints: 15,         // answer without using hints
            firstTry: 10         // correct on first attempt
        },
        
        penalties: {
            wrongAnswer: -2,
            skipQuestion: -5,
            timeOut: -3
        },
        
        streaks: {
            minStreak: 2,        // minimum for streak bonus
            maxStreak: 10,       // maximum streak multiplier
            bonusPerStreak: 5    // additional points per streak level
        }
    },
    
    // Timer configuration
    timer: {
        defaultTime: 60,         // default seconds per question
        warningTime: 10,         // show warning when X seconds left
        criticalTime: 5,         // show critical warning
        gracePeriod: 2,          // extra seconds to submit after time up
        pauseOnBackground: true, // pause when app goes to background
        showMilliseconds: false  // show precise timing
    },
    
    // Question generation settings
    questions: {
        maxOptions: 4,           // MCQ options count
        minDifficulty: 'easy',
        maxDifficulty: 'hard',
        randomizeOrder: true,
        preventRepeats: true,
        categoryRotation: true,  // rotate through categories
        
        // Question pool sizes
        poolSizes: {
            easy: 50,
            medium: 100,
            hard: 150
        },
        
        // Question types
        types: {
            multipleChoice: {
                enabled: true,
                weight: 0.8
            },
            fillInBlank: {
                enabled: false,  // future feature
                weight: 0.2
            }
        }
    },
    
    // Hint system
    hints: {
        enabled: true,
        maxHints: 2,             // max hints per question
        hintDelay: 15,           // seconds before first hint
        hintTypes: {
            category: true,       // reveal category
            firstLetter: true,    // show first letter
            length: true,         // show word length
            definition: false     // show definition (future)
        },
        cost: 5                  // points deducted for using hint
    },
    
    // Achievement system
    achievements: {
        enabled: true,
        categories: {
            score: {
                rookie: 100,      // first 100 points
                player: 500,      // 500 total points
                expert: 1000,     // 1000 total points
                master: 2500      // 2500 total points
            },
            
            streaks: {
                hotStreak: 5,     // 5 in a row
                onFire: 10,       // 10 in a row
                unstoppable: 15   // 15 in a row
            },
            
            games: {
                firstGame: 1,     // complete first game
                dedicated: 10,    // play 10 games
                committed: 50,    // play 50 games
                addicted: 100     // play 100 games
            },
            
            special: {
                perfectGame: 'perfect',      // 100% accuracy in game
                speedDemon: 'speed',         // average < 10 seconds
                hintless: 'no_hints',        // complete game without hints
                explorer: 'all_categories'   // play all categories
            }
        }
    },
    
    // Accessibility settings
    accessibility: {
        fontSize: {
            min: 12,
            max: 24,
            default: 16,
            step: 2
        },
        
        contrast: {
            levels: ['normal', 'high', 'maximum'],
            default: 'normal'
        },
        
        animations: {
            enabled: true,
            reducedMotion: false,
            duration: 300 // milliseconds
        },
        
        audio: {
            enabled: true,
            volume: 0.7,
            soundEffects: true,
            backgroundMusic: false
        },
        
        navigation: {
            keyboardOnly: false,
            focusIndicators: true,
            skipLinks: true
        }
    },
    
    // Data management
    storage: {
        saveProgress: true,
        autoSave: true,
        saveInterval: 30000,     // 30 seconds
        maxSavedGames: 10,
        compressionEnabled: true,
        encryptionEnabled: false
    },
    
    // Performance settings
    performance: {
        preloadAssets: true,
        lazyLoadComponents: true,
        cacheQuestions: true,
        maxCacheSize: 1000,      // max cached questions
        backgroundProcessing: true,
        webWorkers: true
    },
    
    // Debug and development
    debug: {
        enabled: false,          // set to true for development
        logLevel: 'warn',        // 'debug', 'info', 'warn', 'error'
        showTimings: false,
        mockData: false,
        skipAnimations: false
    },
    
    // Feature flags
    features: {
        darkMode: true,
        multiLanguage: true,
        offline: true,
        sharing: true,
        analytics: true,
        tutorials: true,
        customThemes: true,
        cloudSync: false         // future feature
    },
    
    // API and external services
    api: {
        baseUrl: '',             // no external API currently
        timeout: 5000,           // 5 seconds
        retries: 3,
        caching: true
    },
    
    // User profile defaults
    userDefaults: {
        theme: 'light',
        language: 'en',
        difficulty: 'medium',
        sound: true,
        notifications: true,
        profile: 'general'       // senior, student, general, educator
    }
};

// Game state constants
export const GAME_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    PLAYING: 'playing',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    ERROR: 'error'
};

// Question types
export const QUESTION_TYPES = {
    MULTIPLE_CHOICE: 'mcq',
    FILL_BLANK: 'fill',
    TRUE_FALSE: 'boolean'
};

// Answer states
export const ANSWER_STATES = {
    UNANSWERED: 'unanswered',
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    SKIPPED: 'skipped',
    TIMEOUT: 'timeout'
};

// Default export for easy access
export default gameConfig;



