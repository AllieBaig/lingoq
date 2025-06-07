
// File: .eslintrc.cjs
module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        jest: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'prefer-const': 'error',
        'no-var': 'error',
    },
};

