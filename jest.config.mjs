
// File: jest.config.mjs

export default {
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/tests/setup.js'
  ],
  testMatch: ['**/tests/**/*.test.js', '**/__tests__/**/*.js'],
  collectCoverageFrom: ['js/**/*.js', '!js/data/**', '!js/main.js'],
  coverageDirectory: 'coverage',
  verbose: true
};


