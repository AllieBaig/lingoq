

/**
 * Purpose: Jest configuration for LingoQuest with ESM + canvas + Testing Library support
 * Key features: ESM-compatible, JSDOM, canvas mocks, coverage
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 10:30 | File: jest.config.cjs
 */

module.exports = {
    testEnvironment: 'jsdom',

    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '<rootDir>/tests/setup.js'
    ],

    extensionsToTreatAsEsm: ['.js'],
    transform: {},

    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js',
        '**/?(*.)(spec|test).js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/coverage/',
        '/docs/'
    ],

    collectCoverageFrom: [
        'js/**/*.js',
        '!js/data/**/*.js',
        '!js/workers/**/*.js',
        '!js/main.js',
        '!**/*.min.js',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/dist/**',
        '!**/coverage/**',
        '!**/tests/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },

    moduleFileExtensions: ['js', 'json'],

    globals: {
        __DEV__: true
    },

    testTimeout: 10000,
    clearMocks: true,
    restoreMocks: true,
    verbose: true
};

