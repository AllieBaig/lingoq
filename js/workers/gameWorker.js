

/* eslint-env worker */


/**
 * Purpose: Background web worker for intensive game processing and calculations
 * Key features: Question generation, score calculations, data processing, MCQ creation
 * Dependencies: Game data, question databases, scoring algorithms
 * Related helpers: Array shuffling, random generation, data validation, performance optimization
 * Function names: generateQuestions, calculateScores, processGameData, shuffleOptions, validateAnswers
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:15 | File: js/workers/gameWorker.js
 */

// Web Worker for LingoQuest game processing
// Handles CPU-intensive tasks to keep main thread responsive

// Import game data (using importScripts for web worker compatibility)
let gameData = {};
let questionPools = {};
let isInitialized = false;

// Message handler for communication with main thread
self.addEventListener('message', async function(event) {
    const { type, payload, id } = event.data;
    
    try {
        let result;
        
        switch (type) {
            case 'INIT_WORKER':
                result = await initializeWorker(payload);
                break;
                
            case 'GENERATE_QUESTIONS':
                result = await generateQuestions(payload);
                break;
                
            case 'GENERATE_MCQ':
                result = await generateMCQ(payload);
                break;
                
            case 'CALCULATE_SCORE':
                result = await calculateScore(payload);
                break;
                
            case 'SHUFFLE_ARRAY':
                result = shuffleArray(payload.array);
                break;
                
            case 'VALIDATE_ANSWER':
                result = validateAnswer(payload);
                break;
                
            case 'PROCESS_GAME_DATA':
                result = await processGameData(payload);
                break;
                
            case 'GET_RANDOM_QUESTIONS':
                result = getRandomQuestions(payload);
                break;
                
            case 'FILTER_QUESTIONS':
                result = filterQuestions(payload);
                break;
                
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
        
        // Send success response
        self.postMessage({
            type: 'SUCCESS',
            id,
            result
        });
        
    } catch (error) {
        // Send error response
        self.postMessage({
            type: 'ERROR',
            id,
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
});

// Initialize worker with game data
async function initializeWorker(config) {
    try {
        console.log('🔧 Initializing GameWorker...');
        
        // Load game configuration
        gameData = config.gameData || {};
        questionPools = config.questionPools || {};
        
        // Initialize question pools if not provided
        if (Object.keys(questionPools).length === 0) {
            await loadQuestionPools();
        }
        
        isInitialized = true;
        console.log('✅ GameWorker initialized successfully');
        
        return {
            success: true,
            message: 'Worker initialized',
            questionPoolSizes: getQuestionPoolSizes()
        };
        
    } catch (error) {
        console.error('❌ Worker initialization failed:', error);
        throw error;
    }
}

// Load question pools (mock data for web worker)
async function loadQuestionPools() {
    // Mock question data - in production, this would be loaded from actual data files
    questionPools = {
        classic: {
            names: generateMockNames(),
            places: generateMockPlaces(),
            animals: generateMockAnimals(),
            things: generateMockThings()
        },
        hollybolly: {
            movies: generateMockMovies()
        }
    };
}

// Generate questions for a game session
async function generateQuestions(config) {
    if (!isInitialized) {
        throw new Error('Worker not initialized');
    }
    
    const {
        gameMode,
        difficulty,
        questionCount,
        categories,
        excludeIds = []
    } = config;
    
    console.log(`🎲 Generating ${questionCount} questions for ${gameMode} mode`);
    
    let questions = [];
    
    if (gameMode === 'classic') {
        questions = await generateClassicQuestions(categories, questionCount, difficulty, excludeIds);
    } else if (gameMode === 'hollybolly') {
        questions = await generateHollyBollyQuestions(questionCount, difficulty, excludeIds);
    } else {
        throw new Error(`Unknown game mode: ${gameMode}`);
    }
    
    // Shuffle questions
    questions = shuffleArray(questions);
    
    console.log(`✅ Generated ${questions.length} questions`);
    
    return {
        questions,
        gameMode,
        difficulty,
        totalGenerated: questions.length
    };
}

// Generate Classic mode questions
async function generateClassicQuestions(categories, questionCount, difficulty, excludeIds) {
    const questions = [];
    const questionsPerCategory = Math.floor(questionCount / categories.length);
    
    for (const category of categories) {
        const categoryQuestions = questionPools.classic[category] || [];
        const availableQuestions = categoryQuestions.filter(q => !excludeIds.includes(q.id));
        
        // Get random questions for this category
        const selectedQuestions = getRandomElements(availableQuestions, questionsPerCategory);
        
        // Convert to MCQ format
        for (const question of selectedQuestions) {
            const mcq = await generateMCQForQuestion(question, category, difficulty);
            questions.push(mcq);
        }
    }
    
    return questions;
}

// Generate HollyBolly mode questions
async function generateHollyBollyQuestions(questionCount, difficulty, excludeIds) {
    const questions = [];
    const moviePool = questionPools.hollybolly.movies || [];
    const availableMovies = moviePool.filter(m => !excludeIds.includes(m.id));
    
    const selectedMovies = getRandomElements(availableMovies, questionCount);
    
    for (const movie of selectedMovies) {
        const mcq = await generateMovieMCQ(movie, difficulty);
        questions.push(mcq);
    }
    
    return questions;
}

// Generate MCQ for a given question
async function generateMCQ(config) {
    const { question, category, difficulty, optionCount = 4 } = config;
    
    if (category === 'movie') {
        return await generateMovieMCQ(question, difficulty, optionCount);
    } else {
        return await generateMCQForQuestion(question, category, difficulty, optionCount);
    }
}

// Generate MCQ for classic mode question
async function generateMCQForQuestion(question, category, difficulty, optionCount = 4) {
    const correctAnswer = question.answer || question.name || question.title;
    const options = [correctAnswer];
    
    // Get wrong options from the same category
    const categoryPool = questionPools.classic[category] || [];
    const wrongOptions = categoryPool
        .filter(q => (q.answer || q.name || q.title) !== correctAnswer)
        .map(q => q.answer || q.name || q.title);
    
    // Add random wrong options
    while (options.length < optionCount && wrongOptions.length > 0) {
        const randomWrong = getRandomElement(wrongOptions);
        if (!options.includes(randomWrong)) {
            options.push(randomWrong);
            wrongOptions.splice(wrongOptions.indexOf(randomWrong), 1);
        }
    }
    
    // Shuffle options
    const shuffledOptions = shuffleArray(options);
    
    return {
        id: question.id || generateId(),
        category,
        difficulty,
        question: generateQuestionText(correctAnswer, category),
        correctAnswer,
        options: shuffledOptions,
        hint: question.hint || generateHint(correctAnswer, category),
        timeLimit: getTimeLimit(difficulty),
        points: getPoints(difficulty)
    };
}

// Generate MCQ for movie question
async function generateMovieMCQ(movie, difficulty, optionCount = 4) {
    const correctAnswer = movie.title || movie.movie;
    const options = [correctAnswer];
    
    // Get wrong movie options
    const moviePool = questionPools.hollybolly.movies || [];
    const wrongMovies = moviePool
        .filter(m => (m.title || m.movie) !== correctAnswer)
        .map(m => m.title || m.movie);
    
    // Add random wrong options
    while (options.length < optionCount && wrongMovies.length > 0) {
        const randomWrong = getRandomElement(wrongMovies);
        if (!options.includes(randomWrong)) {
            options.push(randomWrong);
            wrongMovies.splice(wrongMovies.indexOf(randomWrong), 1);
        }
    }
    
    // Shuffle options
    const shuffledOptions = shuffleArray(options);
    
    return {
        id: movie.id || generateId(),
        category: 'movie',
        difficulty,
        question: generateMovieQuestionText(movie),
        correctAnswer,
        options: shuffledOptions,
        clues: movie.clues || {},
        hint: movie.hint || `A movie with clues: ${JSON.stringify(movie.clues || {})}`,
        timeLimit: getTimeLimit(difficulty),
        points: getPoints(difficulty),
        movieData: movie
    };
}

// Calculate score for answers
async function calculateScore(config) {
    const {
        answers,
        questions,
        timeSpent,
        difficulty,
        gameMode
    } = config;
    
    let totalScore = 0;
    let correctCount = 0;
    let streak = 0;
    let maxStreak = 0;
    const scoreBreakdown = [];
    
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const question = questions[i];
        const isCorrect = answer === question.correctAnswer;
        
        let questionScore = 0;
        let bonuses = {};
        
        if (isCorrect) {
            correctCount++;
            streak++;
            maxStreak = Math.max(maxStreak, streak);
            
            // Base points
            questionScore += getPoints(difficulty);
            
            // Time bonus
            const timeLimit = question.timeLimit || 60;
            const questionTime = timeSpent[i] || timeLimit;
            if (questionTime < timeLimit * 0.5) {
                const timeBonus = Math.floor((timeLimit - questionTime) / timeLimit * 10);
                questionScore += timeBonus;
                bonuses.timeBonus = timeBonus;
            }
            
            // Streak bonus
            if (streak >= 3) {
                const streakBonus = Math.floor(streak * 2);
                questionScore += streakBonus;
                bonuses.streakBonus = streakBonus;
            }
            
        } else {
            streak = 0;
        }
        
        totalScore += questionScore;
        
        scoreBreakdown.push({
            questionIndex: i,
            isCorrect,
            basePoints: getPoints(difficulty),
            bonuses,
            totalPoints: questionScore,
            timeSpent: timeSpent[i] || 0
        });
    }
    
    const accuracy = answers.length > 0 ? (correctCount / answers.length) * 100 : 0;
    
    return {
        totalScore,
        correctCount,
        totalQuestions: answers.length,
        accuracy: Math.round(accuracy),
        maxStreak,
        scoreBreakdown,
        gameMode,
        difficulty
    };
}

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function generateQuestionText(answer, category) {
    const templates = {
        names: [`A name that starts with "${answer.charAt(0)}"?`, `Which name begins with "${answer.charAt(0)}"?`],
        places: [`A place that starts with "${answer.charAt(0)}"?`, `Which location begins with "${answer.charAt(0)}"?`],
        animals: [`An animal that starts with "${answer.charAt(0)}"?`, `Which creature begins with "${answer.charAt(0)}"?`],
        things: [`A thing that starts with "${answer.charAt(0)}"?`, `Which object begins with "${answer.charAt(0)}"?`]
    };
    
    const categoryTemplates = templates[category] || templates.things;
    return getRandomElement(categoryTemplates);
}

function generateMovieQuestionText(movie) {
    const clues = movie.clues || {};
    const clueText = Object.entries(clues)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    
    return `Guess the Hollywood movie from these Bollywood-style clues: ${clueText}`;
}

function generateHint(answer, category) {
    return `This ${category} has ${answer.length} letters and starts with "${answer.charAt(0)}"`;
}

function getTimeLimit(difficulty) {
    const timeLimits = {
        easy: 90,
        medium: 60,
        hard: 30
    };
    return timeLimits[difficulty] || 60;
}

function getPoints(difficulty) {
    const points = {
        easy: 10,
        medium: 15,
        hard: 25
    };
    return points[difficulty] || 15;
}

function validateAnswer(config) {
    const { userAnswer, correctAnswer, caseSensitive = false } = config;
    
    let normalizedUser = userAnswer;
    let normalizedCorrect = correctAnswer;
    
    if (!caseSensitive) {
        normalizedUser = userAnswer.toLowerCase().trim();
        normalizedCorrect = correctAnswer.toLowerCase().trim();
    }
    
    return {
        isCorrect: normalizedUser === normalizedCorrect,
        userAnswer,
        correctAnswer,
        caseSensitive
    };
}

function processGameData(config) {
    // Process large datasets or perform complex calculations
    const { data, operation } = config;
    
    switch (operation) {
        case 'SORT_BY_DIFFICULTY':
            return data.sort((a, b) => {
                const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            });
            
        case 'GROUP_BY_CATEGORY':
            return data.reduce((groups, item) => {
                const category = item.category || 'unknown';
                if (!groups[category]) groups[category] = [];
                groups[category].push(item);
                return groups;
            }, {});
            
        case 'CALCULATE_STATISTICS':
            return calculateStatistics(data);
            
        default:
            return data;
    }
}

function calculateStatistics(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return { count: 0, average: 0, min: 0, max: 0 };
    }
    
    const values = data.map(item => item.score || item.value || 0);
    const sum = values.reduce((a, b) => a + b, 0);
    
    return {
        count: data.length,
        sum,
        average: sum / data.length,
        min: Math.min(...values),
        max: Math.max(...values),
        median: calculateMedian(values)
    };
}

function calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    return sorted.length % 2 !== 0 
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

function getRandomQuestions(config) {
    const { category, count, difficulty, excludeIds = [] } = config;
    
    let pool = [];
    
    if (category === 'movie') {
        pool = questionPools.hollybolly.movies || [];
    } else {
        pool = questionPools.classic[category] || [];
    }
    
    const filtered = pool.filter(q => 
        !excludeIds.includes(q.id) &&
        (!difficulty || q.difficulty === difficulty)
    );
    
    return getRandomElements(filtered, count);
}

function filterQuestions(config) {
    const { questions, filters } = config;
    
    return questions.filter(question => {
        if (filters.difficulty && question.difficulty !== filters.difficulty) {
            return false;
        }
        
        if (filters.category && question.category !== filters.category) {
            return false;
        }
        
        if (filters.minPoints && (question.points || 0) < filters.minPoints) {
            return false;
        }
        
        if (filters.maxPoints && (question.points || 0) > filters.maxPoints) {
            return false;
        }
        
        return true;
    });
}

function getQuestionPoolSizes() {
    const sizes = {};
    
    if (questionPools.classic) {
        Object.keys(questionPools.classic).forEach(category => {
            sizes[`classic_${category}`] = questionPools.classic[category].length;
        });
    }
    
    if (questionPools.hollybolly) {
        Object.keys(questionPools.hollybolly).forEach(category => {
            sizes[`hollybolly_${category}`] = questionPools.hollybolly[category].length;
        });
    }
    
    return sizes;
}

// Mock data generators (replace with actual data in production)
function generateMockNames() {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen'];
    return names.map((name, index) => ({
        id: `name_${index}`,
        name,
        difficulty: index % 3 === 0 ? 'easy' : index % 2 === 0 ? 'medium' : 'hard'
    }));
}

function generateMockPlaces() {
    const places = ['America', 'Brazil', 'Canada', 'Denmark', 'Egypt', 'France', 'Germany', 'Holland'];
    return places.map((place, index) => ({
        id: `place_${index}`,
        name: place,
        difficulty: index % 3 === 0 ? 'easy' : index % 2 === 0 ? 'medium' : 'hard'
    }));
}

function generateMockAnimals() {
    const animals = ['Ant', 'Bear', 'Cat', 'Dog', 'Elephant', 'Fox', 'Giraffe', 'Horse'];
    return animals.map((animal, index) => ({
        id: `animal_${index}`,
        name: animal,
        difficulty: index % 3 === 0 ? 'easy' : index % 2 === 0 ? 'medium' : 'hard'
    }));
}

function generateMockThings() {
    const things = ['Apple', 'Book', 'Car', 'Door', 'Engine', 'Fan', 'Guitar', 'Hat'];
    return things.map((thing, index) => ({
        id: `thing_${index}`,
        name: thing,
        difficulty: index % 3 === 0 ? 'easy' : index % 2 === 0 ? 'medium' : 'hard'
    }));
}

function generateMockMovies() {
    const movies = [
        { id: 'movie_1', title: 'Titanic', clues: { place: 'Ocean', thing: 'Ship' } },
        { id: 'movie_2', title: 'Avatar', clues: { place: 'Pandora', thing: 'Tree' } },
        { id: 'movie_3', title: 'Frozen', clues: { place: 'Mountain', thing: 'Ice' } }
    ];
    
    return movies.map(movie => ({
        ...movie,
        difficulty: 'medium'
    }));
}

// Log that worker is ready
console.log('🚀 GameWorker loaded and ready');




