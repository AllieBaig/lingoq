






/**
 * Purpose: Jest testing configuration for LingoQuest PWA with ES modules support
 * Key features: ES6 modules, JSDOM environment, coverage reporting, test utilities
 * Dependencies: Jest, @testing-library, jsdom, canvas mock for game testing
 * Related helpers: Test setup, mocking utilities, coverage thresholds
 * Function names: N/A (configuration file)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: jest.config.js
 */

export default {
    // Test environment
    testEnvironment: 'jsdom',
    
    // Setup files
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '<rootDir>/tests/setup.js'
    ],
    
    setupFiles: [
        'jest-canvas-mock'
    ],
    
    // Test file patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js',
        '**/?(*.)(spec|test).js'
    ],
    
    // Files to ignore
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/coverage/',
        '/docs/'
    ],
    
    // Coverage configuration
    collectCoverageFrom: [
        'js/**/*.js',
        '!js/data/**/*.js',
        '!js/workers/**/*.js',
        '!js/main.js',
        '!js/**/*.config.js',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    
    coverageDirectory: 'coverage',
    
    coverageReporters: [
        'text',
        'text-summary',
        'lcov',
        'html',
        'json'
    ],
    
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        },
        // Specific thresholds for core modules
        'js/modules/core/': {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        },
        'js/modules/game/': {
            branches: 75,
            functions: 75,
            lines: 75,
            statements: 75
        }
    },
    
    // Module configuration for ES modules
    preset: null,
    extensionsToTreatAsEsm: ['.js'],
    
    // Transform configuration
    transform: {},
    
    // Module file extensions
    moduleFileExtensions: [
        'js',
        'json'
    ],
    
    // Module name mapping for mocks
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/js/$1',
        '^@core/(.*)$': '<rootDir>/js/modules/core/$1',
        '^@game/(.*)$': '<rootDir>/js/modules/game/$1',
        '^@settings/(.*)$': '<rootDir>/js/modules/settings/$1',
        '^@utils/(.*)$': '<rootDir>/js/modules/utils/$1',
        '^@data/(.*)$': '<rootDir>/js/data/$1',
        '^@themes/(.*)$': '<rootDir>/js/data/themes/$1'
    },
    
    // Global variables
    globals: {
        '__DEV__': true,
        '__TEST__': true
    },
    
    // Test timeout
    testTimeout: 10000,
    
    // Clear mocks between tests
    clearMocks: true,
    restoreMocks: true,
    
    // Verbose output
    verbose: true,
    
    // Error handling
    errorOnDeprecated: true,
    
    // Watch mode configuration
    watchman: true,
    watchPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/'
    ],
    
    // Cache configuration
    cache: true,
    cacheDirectory: '<rootDir>/.jest-cache',
    
    // Notification configuration
    notify: true,
    notifyMode: 'failure-change',
    
    // Reporter configuration
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './coverage/html-report',
                filename: 'report.html',
                expand: true
            }
        ]
    ],
    
    // Test result processor
    testResultsProcessor: undefined,
    
    // Custom resolver for ES modules
    resolver: undefined,
    
    // Mock configuration
    clearMocks: true,
    resetMocks: false,
    restoreMocks: true,
    
    // Snapshot configuration
    updateSnapshot: false,
    
    // Performance configuration
    maxWorkers: '50%',
    
    // Test environment options
    testEnvironmentOptions: {
        url: 'http://localhost:3000',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    
    // Custom matchers
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '<rootDir>/tests/setup.js',
        '<rootDir>/tests/matchers.js'
    ],
    
    // Collect coverage from
    collectCoverageFrom: [
        'js/**/*.js',
        '!js/data/**/*.js',
        '!js/workers/**/*.js',
        '!js/main.js',
        '!js/**/*.config.js',
        '!**/*.min.js',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/dist/**',
        '!**/coverage/**',
        '!**/tests/**'
    ],
    
    // Force exit after tests complete
    forceExit: false,
    
    // Detect open handles
    detectOpenHandles: true,
    
    // Detect leaked timers
    detectLeaks: false,
    
    // Run tests in band (sequentially) for debugging
    runInBand: false,
    
    // Maximum number of concurrent test suites
    maxConcurrency: 5,
    
    // Threshold for slow tests warning
    slowTestThreshold: 5,
    
    // Project configuration for multi-project setup
    projects: undefined,
    
    // Custom test sequencer
    testSequencer: undefined,
    
    // Transform ignore patterns
    transformIgnorePatterns: [
        '/node_modules/(?!(module-that-needs-to-be-transformed)/)',
    ],
    
    // Unmocked module path patterns
    unmockedModulePathPatterns: undefined,
    
    // Coverage path ignore patterns
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/',
        '/coverage/',
        '/dist/',
        '.config.js$',
        '.min.js$'
    ]
};






