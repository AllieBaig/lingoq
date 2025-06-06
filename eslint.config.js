



/**
 * Purpose: ESLint configuration for LingoQuest PWA with ES6 modules
 * Key features: ES6 modules, PWA globals, accessibility rules, performance checks
 * Dependencies: ESLint core, browser environment, service worker globals
 * Related helpers: Code quality enforcement, error prevention, style consistency
 * Function names: N/A (configuration file)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 19:40 | File: .eslintrc.js
 */

module.exports = {
    // Environment configuration
    env: {
        browser: true,
        es2022: true,
        node: true,
        jest: true,
        serviceworker: true
    },
    
    // Parser options for modern JavaScript
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            globalReturn: false
        }
    },
    
    // Extend recommended configurations
    extends: [
        'eslint:recommended'
    ],
    
    // Global variables for PWA and game
    globals: {
        // PWA globals
        'workbox': 'readonly',
        'self': 'readonly',
        'caches': 'readonly',
        'skipWaiting': 'readonly',
        'clients': 'readonly',
        'importScripts': 'readonly',
        
        // Browser APIs
        'navigator': 'readonly',
        'location': 'readonly',
        'history': 'readonly',
        'localStorage': 'readonly',
        'sessionStorage': 'readonly',
        'indexedDB': 'readonly',
        'fetch': 'readonly',
        
        // Game globals (if any)
        'LingoQuest': 'writable',
        'gameEngine': 'writable',
        'themeManager': 'writable'
    },
    
    // ESLint rules configuration
    rules: {
        // Error Prevention Rules
        'no-unused-vars': ['warn', { 
            'vars': 'all', 
            'args': 'after-used',
            'ignoreRestSiblings': true,
            'argsIgnorePattern': '^_'
        }],
        'no-undef': 'error',
        'no-console': 'off', // Allow console for debugging in development
        'no-debugger': 'warn',
        'no-alert': 'warn',
        'no-unreachable': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'warn',
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-irregular-whitespace': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        
        // Modern JavaScript Best Practices
        'prefer-const': 'error',
        'no-var': 'error',
        'prefer-arrow-callback': 'warn',
        'prefer-template': 'warn',
        'template-curly-spacing': ['error', 'never'],
        'prefer-destructuring': ['warn', {
            'array': false,
            'object': true
        }],
        'prefer-spread': 'warn',
        'prefer-rest-params': 'warn',
        
        // Code Quality Rules
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        'curly': ['error', 'all'],
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'comma-dangle': ['error', 'never'],
        'quotes': ['warn', 'single', { 
            'avoidEscape': true,
            'allowTemplateLiterals': true 
        }],
        'semi': ['error', 'always'],
        'no-trailing-spaces': 'warn',
        'no-multi-spaces': 'warn',
        'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }],
        
        // Function Rules
        'func-style': ['warn', 'declaration', { 'allowArrowFunctions': true }],
        'max-params': ['warn', 6],
        'max-lines-per-function': ['warn', { 
            'max': 150,
            'skipBlankLines': true,
            'skipComments': true 
        }],
        'max-depth': ['warn', 4],
        'max-nested-callbacks': ['warn', 3],
        'complexity': ['warn', 10],
        
        // ES6 Module Rules
        'no-duplicate-imports': 'error',
        'import/no-unresolved': 'off', // We don't use import resolver
        'import/extensions': 'off',
        
        // Object and Array Rules
        'dot-notation': 'warn',
        'object-shorthand': 'warn',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'computed-property-spacing': ['error', 'never'],
        
        // Performance Rules
        'no-loop-func': 'warn',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-implied-eval': 'error',
        'no-eval': 'error',
        'no-new-func': 'error',
        
        // Style Rules (relaxed for readability)
        'indent': ['warn', 4, { 
            'SwitchCase': 1,
            'VariableDeclarator': 1,
            'outerIIFEBody': 1
        }],
        'linebreak-style': 'off', // Cross-platform compatibility
        'max-len': ['warn', { 
            'code': 120, 
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreComments': true
        }],
        
        // Spacing Rules
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'space-in-parens': ['error', 'never'],
        'space-before-blocks': 'error',
        'keyword-spacing': 'error',
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        
        // Comment Rules
        'spaced-comment': ['warn', 'always'],
        'multiline-comment-style': 'off',
        'lines-around-comment': ['warn', {
            'beforeBlockComment': true,
            'allowBlockStart': true,
            'allowObjectStart': true,
            'allowArrayStart': true
        }],
        
        // Variable Declaration Rules
        'one-var': ['error', 'never'],
        'init-declarations': 'off',
        'no-shadow': 'warn',
        'no-use-before-define': ['error', { 
            'functions': false,
            'classes': true,
            'variables': true 
        }],
        
        // Security Rules
        'no-script-url': 'error',
        'no-new-wrappers': 'error',
        'no-caller': 'error',
        'no-extend-native': 'error',
        
        // PWA Specific Rules
        'no-restricted-globals': ['error', 'event', 'fdescribe'],
        'no-restricted-syntax': ['error',
            {
                'selector': 'CallExpression[callee.name="setTimeout"][arguments.length!=2]',
                'message': 'setTimeout must have exactly 2 arguments'
            }
        ]
    },
    
    // File-specific overrides
    overrides: [
        // Service Worker files
        {
            files: ['**/sw.js', '**/service-worker.js', '**/serviceworker.js'],
            env: {
                serviceworker: true,
                browser: false
            },
            globals: {
                'importScripts': 'readonly',
                'workbox': 'readonly'
            },
            rules: {
                'no-restricted-globals': 'off'
            }
        },
        
        // Test files
        {
            files: ['**/*.test.js', '**/tests/**/*.js', '**/__tests__/**/*.js'],
            env: {
                jest: true,
                mocha: true
            },
            globals: {
                'expect': 'readonly',
                'describe': 'readonly',
                'it': 'readonly',
                'test': 'readonly',
                'beforeEach': 'readonly',
                'afterEach': 'readonly',
                'beforeAll': 'readonly',
                'afterAll': 'readonly',
                'jest': 'readonly'
            },
            rules: {
                'max-lines-per-function': 'off',
                'max-nested-callbacks': 'off'
            }
        },
        
        // Configuration files
        {
            files: ['*.config.js', '**/*.config.js', 'webpack.*.js'],
            env: {
                node: true,
                browser: false
            },
            rules: {
                'no-console': 'off'
            }
        },
        
        // Data files (more relaxed rules)
        {
            files: ['**/data/**/*.js', '**/questions/**/*.js'],
            rules: {
                'max-lines-per-function': 'off',
                'max-len': 'off',
                'object-curly-spacing': 'off'
            }
        },
        
        // Translation files
        {
            files: ['**/translations/**/*.js'],
            rules: {
                'max-len': 'off',
                'quotes': 'off',
                'key-spacing': 'off'
            }
        },
        
        // Theme files
        {
            files: ['**/themes/**/*.js'],
            rules: {
                'max-len': 'off',
                'object-curly-spacing': 'off'
            }
        }
    ],
    
    // Settings for import/export validation
    settings: {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.json']
            }
        }
    },
    
    // Report unused eslint-disable comments
    reportUnusedDisableDirectives: true
};






