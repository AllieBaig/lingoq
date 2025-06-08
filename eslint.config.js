// File: eslint.config.js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.worker.js', '**/workers/*.js'],
    languageOptions: {
      globals: {
        self: 'readonly',
        postMessage: 'readonly',
        onmessage: 'readonly',
        onconnect: 'readonly',
        importScripts: 'readonly',
        // add other globals if needed
      },
    },
    rules: {
      'no-undef': 'off' // avoid false positives on `self`, etc.
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];

