


// LingoQuest - ESLint Configuration
// Optimized for ES6 modules, PWA development, and GitHub Codex compatibility
// Supports modern JavaScript features and accessibility standards

module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true,
        jest: true,
        serviceworker: true
    },
    
    extends: [
        'eslint:recommended'
    ],
    
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    
    globals: {
        // PWA globals
        'workbox': 'readonly',
        'self': 'readonly',
        'caches': 'readonly',
        'skipWaiting': 'readonly',
        'clients': 'readonly',
        
        // Game globals
        'LingoQuest': 'writable',
        'gameEngine': 'writable',
        'themeManager': 'writable'
    },
    
    rules: {
        // Error Prevention
        'no-unused-vars': ['warn', { 
            'vars': 'all', 
            'args': 'after-used',
            'ignoreRestSiblings': true 
        }],
        'no-undef': 'error',
        'no-console': 'off', // Allow console for debugging
        'no-debugger': 'warn',
        'no-alert': 'warn',
        
        // Modern JavaScript
        'prefer-const': 'error',
        'no-var': 'error',
        'prefer-arrow-functions': 'off',
        'prefer-template': 'warn',
        'template-curly-spacing': ['error', 'never'],
        
        // Code Quality
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'never'],
        'semicolon': 'off',
        'quotes': ['warn', 'single', { 'avoidEscape': true }],
        
        // Function Rules
        'function-paren-newline': 'off',
        'max-params': ['warn', 5],
        'max-lines-per-function': ['warn', { 'max': 150 }],
        
        // ES6 Modules
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-duplicate-imports': 'error',
        
        // Accessibility (for PWA)
        'jsx-a11y/alt-text': 'off', // Not using JSX
        'no-invalid-this': 'off',
        
        // Performance
        'no-loop-func': 'warn',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        
        // Style (relaxed for readability)
        'indent': ['warn', 4, { 'SwitchCase': 1 }],
        'linebreak-style': 'off', // Cross-platform compatibility
        'max-len': ['warn', { 
            'code': 100, 
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true
        }],
        
        // Spacing
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        
        // Comments
        'spaced-comment': ['warn', 'always'],
        'multiline-comment-style': 'off',
        
        // Security
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error'
    },
    
    overrides: [
        // Service Worker specific rules
        {
            files: ['service-worker.js', '**/sw.js'],
            env: {
                serviceworker: true,
                browser: false
            },
            globals: {
                'importScripts': 'readonly'
            }
        },
        
        // Test files
        {
            files: ['**/*.test.js', '**/tests/**/*.js'],
            env: {
                jest: true
            },
            globals: {
                'expect': 'readonly',
                'describe': 'readonly',
                'it': 'readonly',
                'beforeEach': 'readonly',
                'afterEach': 'readonly'
            }
        },
        
        // Config files
        {
            files: ['*.config.js', 'webpack.*.js'],
            env: {
                node: true,
                browser: false
            }
        },
        
        // Data files (more relaxed)
        {
            files: ['js/data/**/*.js'],
            rules: {
                'max-lines-per-function': 'off',
                'max-len': 'off'
            }
        }
    ],
    
    settings: {
        // For future use with import/export validation
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.json']
            }
        }
    }
};


