


/**
 * Purpose: Rollup configuration for LingoQuest PWA production bundling
 * Key features: ES modules bundling, PWA optimization, code splitting, service worker integration
 * Dependencies: Rollup core, various plugins for production optimization
 * Related helpers: Build optimization, tree shaking, compression, PWA manifest
 * Function names: createConfig, getBuildTargets, optimizeBundle, generateServiceWorker
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: build/rollup.config.js
 */

import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { generateSW } from 'rollup-plugin-workbox';
import copy from 'rollup-plugin-copy';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = pathResolve(__dirname, '..');

// Build environment configuration
const isDev = process.env.NODE_ENV !== 'production';
const isWatch = process.env.ROLLUP_WATCH === 'true';

// Build targets for different environments
const buildTargets = {
    development: {
        minify: false,
        sourcemap: true,
        treeshake: false,
        generateSW: false
    },
    production: {
        minify: true,
        sourcemap: false,
        treeshake: true,
        generateSW: true
    }
};

const currentTarget = isDev ? buildTargets.development : buildTargets.production;

// Main configuration
export default defineConfig({
    input: {
        main: 'js/main.js',
        sw: 'sw.js'
    },
    
    output: [
        // ES Modules build for modern browsers
        {
            dir: 'dist',
            format: 'es',
            entryFileNames: isDev ? '[name].js' : '[name].[hash].js',
            chunkFileNames: isDev ? 'chunks/[name].js' : 'chunks/[name].[hash].js',
            assetFileNames: isDev ? 'assets/[name][extname]' : 'assets/[name].[hash][extname]',
            sourcemap: currentTarget.sourcemap,
            manualChunks: {
                // Core application modules
                'core': [
                    './js/modules/core/componentLoader.js',
                    './js/modules/core/uiManager.js',
                    './js/modules/core/eventManager.js',
                    './js/modules/core/storageManager.js'
                ],
                
                // Settings and preferences
                'settings': [
                    './js/modules/settings/themeManager.js',
                    './js/modules/settings/languageManager.js',
                    './js/modules/settings/settingsManager.js'
                ],
                
                // Game logic modules
                'game': [
                    './js/modules/game/gameLogic.js',
                    './js/modules/game/gameStateManager.js',
                    './js/modules/game/mcqGenerator.js',
                    './js/modules/game/scoreCalculator.js'
                ],
                
                // Game data (lazy loaded)
                'data': [
                    './js/data/questions/classic/names.js',
                    './js/data/questions/classic/places.js',
                    './js/data/questions/classic/animals.js',
                    './js/data/questions/classic/things.js'
                ],
                
                // HollyBolly data (lazy loaded)
                'hollybolly': [
                    './js/data/questions/hollybolly/movies.js'
                ],
                
                // Translation files (lazy loaded)
                'translations': [
                    './js/data/translations/en.js',
                    './js/data/translations/fr.js',
                    './js/data/translations/de.js'
                ],
                
                // Utilities and helpers
                'utils': [
                    './js/modules/utils/helpers.js',
                    './js/modules/utils/validators.js',
                    './js/modules/utils/animations.js'
                ],
                
                // Web Workers
                'workers': [
                    './js/workers/gameWorker.js',
                    './js/workers/analysisWorker.js'
                ]
            }
        }
    ],
    
    external: [
        // Mark these as external if they're loaded via CDN
        // (none for LingoQuest as it's self-contained)
    ],
    
    plugins: [
        // Module resolution
        resolve({
            browser: true,
            preferBuiltins: false,
            exportConditions: ['import', 'module', 'browser', 'default']
        }),
        
        // CommonJS to ES modules conversion
        commonjs(),
        
        // JSON imports
        json(),
        
        // Path aliases for cleaner imports
        alias({
            entries: [
                { find: '@', replacement: pathResolve(projectRoot, 'js') },
                { find: '@core', replacement: pathResolve(projectRoot, 'js/modules/core') },
                { find: '@game', replacement: pathResolve(projectRoot, 'js/modules/game') },
                { find: '@settings', replacement: pathResolve(projectRoot, 'js/modules/settings') },
                { find: '@utils', replacement: pathResolve(projectRoot, 'js/modules/utils') },
                { find: '@data', replacement: pathResolve(projectRoot, 'js/data') },
                { find: '@components', replacement: pathResolve(projectRoot, 'components') }
            ]
        }),
        
        // Environment variable replacement
        replace({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.BUILD_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
                'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
                '__DEV__': JSON.stringify(isDev),
                '__VERSION__': JSON.stringify('1.0.0')
            }
        }),
        
        // CSS processing
        postcss({
            extract: true,
            minimize: currentTarget.minify,
            sourceMap: currentTarget.sourcemap,
            plugins: [
                require('autoprefixer'),
                ...(currentTarget.minify ? [require('cssnano')] : [])
            ]
        }),
        
        // Copy static assets
        copy({
            targets: [
                // HTML files
                { src: 'index.html', dest: 'dist' },
                
                // Component HTML templates
                { src: 'components/**/*.html', dest: 'dist/components' },
                
                // PWA manifest and icons
                { src: 'manifest.json', dest: 'dist' },
                { src: 'assets/icons/**/*', dest: 'dist/assets/icons' },
                
                // Other assets
                { src: 'assets/images/**/*', dest: 'dist/assets/images', flatten: false },
                { src: 'assets/fonts/**/*', dest: 'dist/assets/fonts', flatten: false },
                
                // Favicon and meta assets
                { src: 'assets/meta/**/*', dest: 'dist' },
                
                // CSS theme files (for dynamic loading)
                { src: 'css/themes/**/*.css', dest: 'dist/css/themes' }
            ],
            hook: 'writeBundle'
        }),
        
        // HTML template processing
        html({
            fileName: 'index.html',
            template: ({ attributes, files, meta, publicPath, title }) => {
                const scripts = (files.js || [])
                    .map(({ fileName }) => `<script type="module" src="${publicPath}${fileName}"></script>`)
                    .join('\n  ');
                
                const links = (files.css || [])
                    .map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}">`)
                    .join('\n  ');
                
                return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#ffffff">
    <title>LingoQuest - Word Game</title>
    
    <!-- PWA Meta Tags -->
    <link rel="manifest" href="manifest.json">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/icon-192x192.png">
    <link rel="apple-touch-icon" href="assets/icons/icon-192x192.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="LingoQuest">
    
    <!-- CSS Files -->
    ${links}
    
    <!-- Performance Hints -->
    <link rel="preload" href="js/main.js" as="script">
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body data-theme="light">
    <div id="app" class="app-container">
        <!-- Loading Screen -->
        <div id="initial-loading" class="initial-loading">
            <h1>LingoQuest</h1>
            <p>Loading...</p>
        </div>
        
        <!-- App will be loaded here -->
        <div id="header-container"></div>
        <main class="main-content">
            <div id="home-screen-container"></div>
            <div id="game-screen-container"></div>
            <div id="results-screen-container"></div>
            <div id="settings-screen-container"></div>
            <div id="instructions-screen-container"></div>
            <div id="tools-screen-container"></div>
        </main>
        <div id="loading-overlay-container"></div>
        <div id="toast-container-element"></div>
    </div>

    <!-- JavaScript Modules -->
    ${scripts}
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(error => console.log('SW registration failed'));
            });
        }
    </script>
</body>
</html>`.trim();
            }
        }),
        
        // Code minification for production
        ...(currentTarget.minify ? [
            terser({
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log', 'console.debug']
                },
                mangle: {
                    safari10: true
                },
                format: {
                    comments: false
                }
            })
        ] : []),
        
        // Service Worker generation for production
        ...(currentTarget.generateSW ? [
            generateSW({
                swDest: 'dist/sw.js',
                globDirectory: 'dist/',
                globPatterns: [
                    '**/*.{html,js,css,png,jpg,svg,json,woff,woff2}'
                ],
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'google-fonts-stylesheets'
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            }
                        }
                    }
                ]
            })
        ] : [])
    ],
    
    // Tree shaking configuration
    treeshake: currentTarget.treeshake ? {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
    } : false,
    
    // Watch mode options
    watch: isWatch ? {
        clearScreen: false,
        include: [
            'js/**',
            'css/**',
            'components/**',
            'index.html',
            'manifest.json'
        ],
        exclude: [
            'node_modules/**',
            'dist/**'
        ]
    } : false,
    
    // Performance optimizations
    preserveEntrySignatures: 'strict',
    
    // Error handling
    onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        
        // Use default for everything else
        warn(warning);
    }
});

