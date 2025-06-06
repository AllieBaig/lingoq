

/**
 * File: js/data/translations/en.js
 * LingoQuest - English Translation Database
 * Complete English language strings for all UI elements and game content
 * Dependencies: None (pure data module)
 * Features: UI labels, game text, instructions, error messages, accessibility
 * Functions: None (data only), imported by languageManager.js
 * MIT License - https://github.com/AllieBaig/LingoQuest
 * Created: 2025-06-05 15:48:22 UTC
 */

const englishTranslations = {
  // ===== APP GENERAL =====
  app: {
    name: 'LingoQuest',
    tagline: 'Word Games for Everyone',
    version: '1.0.0',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try Again',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    reset: 'Reset',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    continue: 'Continue',
    finish: 'Finish',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    quit: 'Quit'
  },

  // ===== NAVIGATION =====
  nav: {
    home: 'Home',
    play: 'Play',
    settings: 'Settings',
    instructions: 'How to Play',
    about: 'About',
    menu: 'Menu',
    profile: 'Profile',
    logout: 'Logout'
  },

  // ===== HOME SCREEN =====
  home: {
    welcome: 'Welcome to LingoQuest',
    subtitle: 'Choose your word adventure',
    classicMode: 'Classic Mode',
    classicDescription: 'Traditional Name-Place-Animal-Thing game',
    hollybollyMode: 'HollyBolly Mode',
    hollybollyDescription: 'Hollywood movies with Bollywood-style clues',
    quickPlay: 'Quick Play',
    customGame: 'Custom Game',
    lastPlayed: 'Continue Last Game',
    newGame: 'New Game',
    playerStats: 'Your Stats',
    achievements: 'Achievements'
  },

  // ===== GAME MODES =====
  gameMode: {
    classic: 'Classic',
    hollybolly: 'HollyBolly',
    practice: 'Practice',
    challenge: 'Challenge',
    multiplayer: 'Multiplayer',
    solo: 'Solo Play'
  },

  // ===== GAME DIFFICULTY =====
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    expert: 'Expert',
    custom: 'Custom',
    adaptive: 'Adaptive'
  },

  // ===== GAME CATEGORIES =====
  categories: {
    names: 'Names',
    places: 'Places',
    animals: 'Animals',
    things: 'Things',
    movies: 'Movies',
    actors: 'Actors',
    directors: 'Directors',
    mixed: 'Mixed Categories'
  },

  // ===== GAME INTERFACE =====
  game: {
    score: 'Score',
    level: 'Level',
    streak: 'Streak',
    lives: 'Lives',
    time: 'Time',
    round: 'Round',
    question: 'Question',
    answer: 'Answer',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    tryAgain: 'Try Again',
    wellDone: 'Well Done!',
    excellent: 'Excellent!',
    perfect: 'Perfect!',
    goodJob: 'Good Job!',
    almostThere: 'Almost There!',
    keepGoing: 'Keep Going!',
    progress: 'Progress',
    completed: 'Completed',
    failed: 'Failed',
    skipped: 'Skipped',
    hint: 'Hint',
    showHint: 'Show Hint',
    hideHint: 'Hide Hint',
    noHintsLeft: 'No hints remaining',
    gameOver: 'Game Over',
    congratulations: 'Congratulations!',
    finalScore: 'Final Score',
    newRecord: 'New Record!',
    playAgain: 'Play Again',
    shareScore: 'Share Score'
  },

  // ===== MCQ INTERFACE =====
  mcq: {
    chooseAnswer: 'Choose the correct answer:',
    selectOption: 'Select an option',
    optionA: 'A',
    optionB: 'B',
    optionC: 'C',
    optionD: 'D',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    skipQuestion: 'Skip Question',
    confirmAnswer: 'Confirm Answer',
    changeAnswer: 'Change Answer',
    timeRemaining: 'Time Remaining',
    questionsRemaining: 'Questions Remaining',
    outOfTime: 'Time\'s Up!',
    correctAnswer: 'The correct answer is',
    yourAnswer: 'Your answer',
    explanation: 'Explanation'
  },

  // ===== CLASSIC MODE =====
  classic: {
    title: 'Classic Mode',
    instructions: 'Answer questions about Names, Places, Animals, and Things',
    nameQuestion: 'Which of these is a name?',
    placeQuestion: 'Which of these is a place?',
    animalQuestion: 'Which of these is an animal?',
    thingQuestion: 'Which of these is a thing?',
    mixedQuestion: 'Choose the correct category for:',
    nameCategory: 'Name',
    placeCategory: 'Place',
    animalCategory: 'Animal',
    thingCategory: 'Thing',
    startClassic: 'Start Classic Game',
    classicComplete: 'Classic Game Complete!'
  },

  // ===== HOLLYBOLLY MODE =====
  hollybolly: {
    title: 'HollyBolly Mode',
    instructions: 'Guess Hollywood movies from Bollywood-style clues',
    movieClue: 'Movie Clue',
    guessMovie: 'Guess the movie:',
    placeClue: 'Place',
    animalClue: 'Animal',
    thingClue: 'Thing',
    movieAnswer: 'Movie',
    hollywoodVsBollywood: 'Hollywood vs Bollywood',
    boxOfficeEarnings: 'Box Office Earnings',
    directorNetWorth: 'Director Net Worth',
    actorNetWorth: 'Lead Actor Net Worth',
    streakReward: 'Streak Reward',
    oneCorrect: '1 Correct Answer',
    twoCorrect: '2 in a Row',
    threeCorrect: '3 in a Row',
    comparison: 'Comparison',
    startHollybolly: 'Start HollyBolly Game',
    hollybollyComplete: 'HollyBolly Game Complete!'
  },

  // ===== REWARDS SYSTEM =====
  rewards: {
    earned: 'Reward Earned!',
    boxOffice: 'Box Office Comparison',
    director: 'Director Comparison',
    actor: 'Actor Comparison',
    hollywood: 'Hollywood',
    bollywood: 'Bollywood',
    earnings: 'Earnings',
    netWorth: 'Net Worth',
    million: 'Million',
    billion: 'Billion',
    dollars: 'USD',
    rupees: 'INR',
    higher: 'Higher',
    lower: 'Lower',
    winner: 'Winner',
    comparison: 'vs',
    details: 'Details'
  },

  // ===== SETTINGS =====
  settings: {
    title: 'Settings',
    gameSettings: 'Game Settings',
    displaySettings: 'Display Settings',
    audioSettings: 'Audio Settings',
    languageSettings: 'Language Settings',
    accessibilitySettings: 'Accessibility Settings',
    
    // Theme Settings
    theme: 'Theme',
    themes: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
      highContrast: 'High Contrast',
      sepia: 'Sepia',
      blueLight: 'Blue Light Filter',
      neonGlow: 'Neon Glow',
      retroArcade: 'Retro Arcade',
      natureForest: 'Nature Forest',
      spaceGalaxy: 'Space Galaxy',
      candyPop: 'Candy Pop',
      jetsons: 'Jetsons'
    },
    
    // Font Settings
    fontSize: 'Font Size',
    fontSizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large'
    },
    
    fontFamily: 'Font Family',
    fonts: {
      system: 'System Font',
      arial: 'Arial',
      helvetica: 'Helvetica',
      georgia: 'Georgia',
      times: 'Times New Roman',
      openDyslexic: 'OpenDyslexic'
    },
    
    // Button Settings
    buttonSize: 'Button Size',
    buttonSizes: {
      small: 'Small',
      normal: 'Normal',
      large: 'Large',
      extraLarge: 'Extra Large'
    },
    
    // Game Settings
    difficulty: 'Difficulty Level',
    questionCount: 'Questions per Game',
    timeLimit: 'Time Limit',
    hintsEnabled: 'Enable Hints',
    soundEffects: 'Sound Effects',
    backgroundMusic: 'Background Music',
    autoNext: 'Auto Next Question',
    confirmAnswers: 'Confirm Answers',
    showProgress: 'Show Progress',
    
    // Accessibility
    reducedMotion: 'Reduced Motion',
    highContrast: 'High Contrast Mode',
    screenReader: 'Screen Reader Support',
    keyboardNavigation: 'Keyboard Navigation',
    focusIndicators: 'Enhanced Focus',
    largeText: 'Large Text Mode',
    
    // Language
    language: 'Language',
    languages: {
      en: 'English',
      fr: 'Français',
      de: 'Deutsch',
      es: 'Español',
      it: 'Italiano',
      pt: 'Português'
    },
    
    // Actions
    resetSettings: 'Reset to Defaults',
    saveSettings: 'Save Settings',
    cancelChanges: 'Cancel Changes',
    settingsSaved: 'Settings Saved!',
    settingsReset: 'Settings Reset!'
  },

  // ===== INSTRUCTIONS =====
  instructions: {
    title: 'How to Play',
    overview: 'Game Overview',
    classicRules: 'Classic Mode Rules',
    hollybollyRules: 'HollyBolly Mode Rules',
    controls: 'Controls',
    scoring: 'Scoring System',
    tips: 'Tips & Strategies',
    
    classicText: 'In Classic Mode, you\'ll be asked to identify Names, Places, Animals, and Things. Choose the correct answer from the multiple choice options.',
    hollybollyText: 'In HollyBolly Mode, guess Hollywood movies from creative clues involving places, animals, and things. Earn special rewards for consecutive correct answers!',
    
    controlsText: 'Use mouse clicks or keyboard navigation. Press Tab to move between options, Enter to select, and Escape to return to menu.',
    
    scoringText: 'Earn points for correct answers. Bonus points for speed and consecutive correct answers. Lost points for incorrect answers.',
    
    tipsText: 'Take your time to read questions carefully. Use hints when available. Practice regularly to improve your knowledge!'
  },

  // ===== RESULTS & STATS =====
  results: {
    gameResults: 'Game Results',
    summary: 'Summary',
    breakdown: 'Breakdown',
    statistics: 'Statistics',
    correctAnswers: 'Correct Answers',
    incorrectAnswers: 'Incorrect Answers',
    skippedQuestions: 'Skipped Questions',
    totalQuestions: 'Total Questions',
    accuracy: 'Accuracy',
    averageTime: 'Average Time',
    bestStreak: 'Best Streak',
    totalScore: 'Total Score',
    rank: 'Rank',
    improvement: 'Improvement',
    achievements: 'Achievements Unlocked',
    shareResults: 'Share Results',
    viewDetails: 'View Details',
    playAgain: 'Play Again',
    backToMenu: 'Back to Menu'
  },

  // ===== ERROR MESSAGES =====
  errors: {
    general: 'An error occurred. Please try again.',
    network: 'Network connection error. Check your internet.',
    loading: 'Failed to load content. Please refresh.',
    save: 'Failed to save. Please try again.',
    invalid: 'Invalid input. Please check and try again.',
    notFound: 'Content not found.',
    timeout: 'Request timed out. Please try again.',
    permission: 'Permission denied.',
    storage: 'Storage not available.',
    audio: 'Audio not available.',
    unsupported: 'Feature not supported in your browser.'
  },

  // ===== ACCESSIBILITY =====
  accessibility: {
    skipToMain: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    previousPage: 'Go to previous page',
    nextPage: 'Go to next page',
    loading: 'Content is loading',
    selected: 'Selected',
    expanded: 'Expanded',
    collapsed: 'Collapsed',
    required: 'Required field',
    optional: 'Optional field',
    error: 'Error in field',
    success: 'Field completed successfully',
    instructions: 'Press Enter to activate, Space to select',
    newWindow: 'Opens in new window',
    currentPage: 'Current page',
    pageNumber: 'Page {number}',
    of: 'of',
    score: 'Current score: {score}',
    progress: 'Progress: {current} of {total}',
    timeRemaining: 'Time remaining: {time}',
    correctAnswer: 'Correct answer selected',
    incorrectAnswer: 'Incorrect answer selected',
    gameStarted: 'Game has started',
    gameEnded: 'Game has ended',
    levelCompleted: 'Level completed'
  }
};

// Export the translations object
export default englishTranslations;

// Also export as named export for compatibility
export { englishTranslations };

