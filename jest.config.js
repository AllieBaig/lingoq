

/**
 * Purpose: Jest testing configuration for LingoQuest PWA with ES modules support
 * Key features: ES6 modules, JSDOM environment, coverage reporting, test utilities
 * Dependencies: Jest, @testing-library, jsdom, canvas mock for game testing
 * Related helpers: Test setup, mocking utilities, coverage thresholds
 * Function names: N/A (configuration file)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: jest.config.js
 */

module.exports = {
  testEnvironment: 'jsdom',

  // Setup files and matchers
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/tests/setup.js',
    '<rootDir>/tests/matchers.js'
  ],

  // Test patterns
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

  // Coverage collection
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
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    },
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

  // Module mapping
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/js/$1',
    '^@core/(.*)$': '<rootDir>/js/modules/core/$1',
    '^@game/(.*)$': '<rootDir>/js/modules/game/$1',
    '^@settings/(.*)$': '<rootDir>/js/modules/settings/$1',
    '^@utils/(.*)$': '<rootDir>/js/modules/utils/$1',
    '^@data/(.*)$': '<rootDir>/js/data/$1',
    '^@themes/(.*)$': '<rootDir>/js/data/themes/$1'
  },

  // Globals
  globals: {
    __DEV__: true,
    __TEST__: true
  },

  // Runtime settings
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  errorOnDeprecated: true,

  // Watch/caching
  watchman: true,
  watchPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',

  // Notifications
  notify: true,
  notifyMode: 'failure-change',

  // Reporters
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

  // Performance tuning
  maxWorkers: '50%',
  runInBand: false,
  maxConcurrency: 5,
  slowTestThreshold: 5,

  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },

  // Cleanup and debugging
  forceExit: false,
  detectOpenHandles: true,
  detectLeaks: false,

  // Transform ignore
  transformIgnorePatterns: [
    '/node_modules/(?!(module-that-needs-to-be-transformed)/)'
  ],

  // Coverage ignore
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/coverage/',
    '/dist/',
    '.config.js$',
    '.min.js$'
  ]
};




