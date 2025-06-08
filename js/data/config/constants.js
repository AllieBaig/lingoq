


// LingoQuest - Application Constants
// ES6 Module for all constant values, enums, and static configurations
// Centralized location for unchanging values used throughout the app

// Application metadata
export const APP_INFO = {
    NAME: 'LingoQuest',
    VERSION: '1.0.0',
    BUILD_DATE: '2024-06-06',
    AUTHOR: 'LingoQuest Team',
    DESCRIPTION: 'Progressive Web App for word games',
    HOMEPAGE: 'https://alliebaig.github.io/lingoq/',
    REPOSITORY: 'https://github.com/alliebaig/lingoq'
};

// Storage keys for localStorage and sessionStorage
export const STORAGE_KEYS = {
    USER_SETTINGS: 'lingoquest_user_settings',
    GAME_STATE: 'lingoquest_game_state',
    HIGH_SCORES: 'lingoquest_high_scores',
    THEME_PREFERENCE: 'lingoquest_theme',
    LANGUAGE_PREFERENCE: 'lingoquest_language',
    AUDIO_SETTINGS: 'lingoquest_audio',
    ACCESSIBILITY_SETTINGS: 'lingoquest_accessibility',
    USER_PROFILE: 'lingoquest_user_profile',
    GAME_HISTORY: 'lingoquest_game_history',
    ACHIEVEMENTS: 'lingoquest_achievements',
    TUTORIAL_COMPLETED: 'lingoquest_tutorial_completed',
    LAST_PLAYED: 'lingoquest_last_played'
};

// Game modes and their identifiers
export const GAME_MODES = {
    CLASSIC: 'classic',
    HOLLYBOLLY: 'hollybolly',
    MIXLINGO: 'mixlingo'
};

// Game difficulties
export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Game states
export const GAME_STATES = {
    IDLE: 'idle',
    INITIALIZING: 'initializing',
    LOADING: 'loading',
    READY: 'ready',
    PLAYING: 'playing',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    ABORTED: 'aborted',
    ERROR: 'error'
};

// Question states
export const QUESTION_STATES = {
    PENDING: 'pending',
    ACTIVE: 'active',
    ANSWERED: 'answered',
    SKIPPED: 'skipped',
    TIMEOUT: 'timeout',
    COMPLETED: 'completed'
};

// Answer validation states
export const ANSWER_STATES = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    PARTIAL: 'partial',
    UNANSWERED: 'unanswered'
};

// UI screen identifiers
export const SCREENS = {
    HOME: 'home',
    GAME: 'game',
    RESULTS: 'results',
    SETTINGS: 'settings',
    INSTRUCTIONS: 'instructions',
    ABOUT: 'about',
    LOADING: 'loading'
};

// Theme identifiers
export const THEMES = {
    // Senior themes
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
    HIGH_CONTRAST: 'high-contrast',
    SEPIA: 'sepia',
    BLUE_LIGHT: 'blue-light',
    
    // Student themes
    NEON_GLOW: 'neon-glow',
    RETRO_ARCADE: 'retro-arcade',
    NATURE_FOREST: 'nature-forest',
    SPACE_GALAXY: 'space-galaxy',
    CANDY_POP: 'candy-pop',
    CAMPUS_CLASSIC: 'campus-classic',
    MINIMAL_FOCUS: 'minimal-focus',
    NIGHT_OWL: 'night-owl',
    JETSONS: 'jetsons'
};

// Language codes (ISO 639-1)
export const LANGUAGES = {
    ENGLISH: 'en',
    FRENCH: 'fr',
    GERMAN: 'de',
    SPANISH: 'es',
    ITALIAN: 'it',
    PORTUGUESE: 'pt'
};

// User profile types
export const USER_PROFILES = {
    SENIOR: 'senior',
    STUDENT: 'student',
    ADULT: 'adult',
    EDUCATOR: 'educator'
};

// Audio settings
export const AUDIO_TYPES = {
    SOUND_EFFECTS: 'soundEffects',
    BACKGROUND_MUSIC: 'backgroundMusic',
    VOICE_FEEDBACK: 'voiceFeedback',
    NOTIFICATION_SOUNDS: 'notificationSounds'
};

// Event types for the event system
export const EVENT_TYPES = {
    // App lifecycle
    APP_INITIALIZED: 'app:initialized',
    APP_READY: 'app:ready',
    APP_ERROR: 'app:error',
    
    // Game events
    GAME_STARTED: 'game:started',
    GAME_PAUSED: 'game:paused',
    GAME_RESUMED: 'game:resumed',
    GAME_COMPLETED: 'game:completed',
    GAME_ABORTED: 'game:aborted',
    
    // Question events
    QUESTION_LOADED: 'question:loaded',
    QUESTION_ANSWERED: 'question:answered',
    QUESTION_SKIPPED: 'question:skipped',
    QUESTION_TIMEOUT: 'question:timeout',
    
    // UI events
    SCREEN_CHANGED: 'screen:changed',
    THEME_CHANGED: 'theme:changed',
    LANGUAGE_CHANGED: 'language:changed',
    SETTINGS_UPDATED: 'settings:updated',
    
    // Score events
    SCORE_UPDATED: 'score:updated',
    HIGH_SCORE_ACHIEVED: 'score:highScore',
    ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
    
    // Network events
    ONLINE: 'network:online',
    OFFLINE: 'network:offline'
};

// Error codes and types
export const ERROR_CODES = {
    GENERIC: 'GENERIC_ERROR',
    NETWORK: 'NETWORK_ERROR',
    STORAGE: 'STORAGE_ERROR',
    COMPONENT_LOAD: 'COMPONENT_LOAD_ERROR',
    GAME_LOGIC: 'GAME_LOGIC_ERROR',
    INVALID_STATE: 'INVALID_STATE_ERROR',
    PERMISSION_DENIED: 'PERMISSION_DENIED_ERROR',
    TIMEOUT: 'TIMEOUT_ERROR',
    VALIDATION: 'VALIDATION_ERROR'
};

// HTTP status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

// Time constants (in milliseconds)
export const TIME_CONSTANTS = {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    INSTANT: 0,
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    SLOWER: 800,
    SLOWEST: 1200
};

// CSS class names for styling
export const CSS_CLASSES = {
    // State classes
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
    DISABLED: 'disabled',
    ACTIVE: 'active',
    SELECTED: 'selected',
    HIDDEN: 'hidden',
    VISIBLE: 'visible',
    
    // Theme classes
    DARK_MODE: 'dark-mode',
    LIGHT_MODE: 'light-mode',
    HIGH_CONTRAST: 'high-contrast',
    
    // Animation classes
    FADE_IN: 'fade-in',
    FADE_OUT: 'fade-out',
    SLIDE_IN: 'slide-in',
    SLIDE_OUT: 'slide-out',
    ZOOM_IN: 'zoom-in',
    ZOOM_OUT: 'zoom-out',
    
    // Accessibility classes
    SR_ONLY: 'sr-only',
    FOCUS_VISIBLE: 'focus-visible',
    REDUCED_MOTION: 'reduced-motion'
};

// Regular expressions for validation
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s\-\(\)]+$/,
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
};

// File size limits (in bytes)
export const FILE_LIMITS = {
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,     // 5MB
    MAX_AUDIO_SIZE: 10 * 1024 * 1024,    // 10MB
    MAX_JSON_SIZE: 1 * 1024 * 1024,      // 1MB
    MAX_CACHE_SIZE: 50 * 1024 * 1024     // 50MB
};

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
    LOAD_TIME_WARNING: 3000,             // 3 seconds
    LOAD_TIME_ERROR: 10000,              // 10 seconds
    ANIMATION_FRAME_BUDGET: 16.67,       // 60fps = 16.67ms per frame
    MEMORY_WARNING: 100 * 1024 * 1024,   // 100MB
    CACHE_CLEANUP_THRESHOLD: 80          // cleanup when 80% full
};

// Browser support detection
export const BROWSER_FEATURES = {
    LOCAL_STORAGE: 'localStorage',
    SESSION_STORAGE: 'sessionStorage',
    INDEXED_DB: 'indexedDB',
    SERVICE_WORKER: 'serviceWorker',
    WEB_WORKERS: 'Worker',
    GEOLOCATION: 'geolocation',
    NOTIFICATIONS: 'Notification',
    VIBRATION: 'vibrate',
    FULLSCREEN: 'requestFullscreen',
    DEVICE_ORIENTATION: 'DeviceOrientationEvent'
};

// Default configuration values
export const DEFAULTS = {
    THEME: THEMES.LIGHT,
    LANGUAGE: LANGUAGES.ENGLISH,
    DIFFICULTY: DIFFICULTY_LEVELS.MEDIUM,
    GAME_MODE: GAME_MODES.CLASSIC,
    USER_PROFILE: USER_PROFILES.ADULT,
    FONT_SIZE: 16,
    ANIMATION_ENABLED: true,
    SOUND_ENABLED: true,
    NOTIFICATIONS_ENABLED: true,
    AUTO_SAVE_ENABLED: true,
    TUTORIAL_ENABLED: true
};

// Achievement types and categories
export const ACHIEVEMENT_TYPES = {
    SCORE_BASED: 'score',
    STREAK_BASED: 'streak',
    GAMES_PLAYED: 'games',
    TIME_BASED: 'time',
    ACCURACY_BASED: 'accuracy',
    SPECIAL: 'special'
};

// Social sharing platforms
export const SHARE_PLATFORMS = {
    TWITTER: 'twitter',
    FACEBOOK: 'facebook',
    WHATSAPP: 'whatsapp',
    EMAIL: 'email',
    CLIPBOARD: 'clipboard',
    NATIVE: 'native'
};

// PWA installation states
export const PWA_INSTALL_STATES = {
    NOT_SUPPORTED: 'not_supported',
    SUPPORTED: 'supported',
    PROMPTED: 'prompted',
    INSTALLED: 'installed',
    DISMISSED: 'dismissed'
};

// Notification types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    ACHIEVEMENT: 'achievement',
    REMINDER: 'reminder'
};

// Game categories for Classic mode
export const GAME_CATEGORIES = {
    NAME: 'name',
    PLACE: 'place',
    ANIMAL: 'animal',
    THING: 'thing'
};

// HollyBolly reward types
export const HOLLYBOLLY_REWARDS = {
    BOX_OFFICE: 'boxOffice',
    DIRECTOR: 'director',
    HERO: 'hero'
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
    QUESTIONS: '/api/questions',
    SCORES: '/api/scores',
    ACHIEVEMENTS: '/api/achievements',
    USER_PROFILE: '/api/profile',
    ANALYTICS: '/api/analytics'
};

// Feature flags
export const FEATURE_FLAGS = {
    DARK_MODE: true,
    MULTI_LANGUAGE: true,
    OFFLINE_MODE: true,
    SOCIAL_SHARING: true,
    ANALYTICS: true,
    PUSH_NOTIFICATIONS: false,
    CLOUD_SYNC: false,
    MULTIPLAYER: false
};

// Environment detection
export const ENVIRONMENT = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production'
};

// Current environment (can be set during build)
export const CURRENT_ENV = 'production';

// Debug flags
export const DEBUG_FLAGS = {
    CONSOLE_LOGS: CURRENT_ENV === 'development',
    PERFORMANCE_MONITORING: true,
    ERROR_REPORTING: true,
    USER_ANALYTICS: CURRENT_ENV === 'production'
};

// Export all constants as default object
export default {
    APP_INFO,
    STORAGE_KEYS,
    GAME_MODES,
    DIFFICULTY_LEVELS,
    GAME_STATES,
    QUESTION_STATES,
    ANSWER_STATES,
    SCREENS,
    THEMES,
    LANGUAGES,
    USER_PROFILES,
    AUDIO_TYPES,
    EVENT_TYPES,
    ERROR_CODES,
    HTTP_STATUS,
    TIME_CONSTANTS,
    ANIMATION_DURATION,
    CSS_CLASSES,
    REGEX_PATTERNS,
    FILE_LIMITS,
    PERFORMANCE_THRESHOLDS,
    BROWSER_FEATURES,
    DEFAULTS,
    ACHIEVEMENT_TYPES,
    SHARE_PLATFORMS,
    PWA_INSTALL_STATES,
    NOTIFICATION_TYPES,
    GAME_CATEGORIES,
    HOLLYBOLLY_REWARDS,
    API_ENDPOINTS,
    FEATURE_FLAGS,
    ENVIRONMENT,
    CURRENT_ENV,
    DEBUG_FLAGS
};


