



/**
 * Purpose: PWA configuration for LingoQuest application build and deployment
 * Key features: Service worker config, manifest generation, caching strategies, offline support
 * Dependencies: Workbox, build tools, manifest.json template
 * Related helpers: Cache management, update strategies, background sync
 * Function names: getPWAConfig, getCacheConfig, getManifestConfig, getWorkboxConfig
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:35 | File: config/pwa.config.js
 */

export const pwaConfig = {
    // Basic PWA configuration
    name: 'LingoQuest',
    shortName: 'LingoQuest',
    description: 'A senior-friendly word game with Classic and HollyBolly modes',
    version: '1.0.0',
    
    // Display and appearance
    display: 'standalone',
    orientation: 'portrait-primary',
    themeColor: '#007bff',
    backgroundColor: '#ffffff',
    startUrl: '/',
    scope: '/',
    
    // Manifest configuration
    manifest: {
        name: 'LingoQuest - Word Game',
        short_name: 'LingoQuest',
        description: 'A progressive web app word game for all ages',
        lang: 'en-US',
        dir: 'ltr',
        
        // Icons configuration
        icons: [
            {
                src: 'assets/icons/icon-72x72.png',
                sizes: '72x72',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-96x96.png',
                sizes: '96x96',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-128x128.png',
                sizes: '128x128',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-144x144.png',
                sizes: '144x144',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-152x152.png',
                sizes: '152x152',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable'
            },
            {
                src: 'assets/icons/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'assets/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            }
        ],
        
        // Shortcuts for app launcher
        shortcuts: [
            {
                name: 'Play Classic Easy',
                short_name: 'Classic Easy',
                description: 'Start a new Classic Easy game',
                url: '/?mode=classic&difficulty=easy',
                icons: [
                    {
                        src: 'assets/icons/shortcut-classic.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'Play HollyBolly',
                short_name: 'HollyBolly',
                description: 'Start a new HollyBolly game',
                url: '/?mode=hollybolly&difficulty=medium',
                icons: [
                    {
                        src: 'assets/icons/shortcut-hollybolly.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            }
        ],
        
        // Categories for app stores
        categories: ['games', 'education', 'entertainment', 'puzzle']
    },
    
    // Service Worker configuration
    serviceWorker: {
        source: 'sw.js',
        scope: '/',
        skipWaiting: false,
        clientsClaim: false,
        
        // Update strategies
        updateViaCache: 'imports',
        updateStrategy: 'prompt',
        
        // Cache configuration
        cacheConfig: {
            // Static assets cache
            static: {
                cacheName: 'lingoquest-static-v1.0.0',
                strategy: 'CacheFirst',
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                
                urlPatterns: [
                    /\.(?:js|css|html|png|jpg|jpeg|svg|gif|ico|woff2?)$/,
                    /^\/assets\//,
                    /^\/components\//
                ]
            },
            
            // API responses cache
            api: {
                cacheName: 'lingoquest-api-v1.0.0',
                strategy: 'NetworkFirst',
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
                
                urlPatterns: [
                    /^\/api\//,
                    /^https:\/\/api\.lingoquest\.app\//
                ]
            },
            
            // Game data cache
            gameData: {
                cacheName: 'lingoquest-gamedata-v1.0.0',
                strategy: 'StaleWhileRevalidate',
                maxEntries: 200,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
                
                urlPatterns: [
                    /^\/js\/data\//,
                    /questions\/.*\.js$/,
                    /translations\/.*\.js$/
                ]
            },
            
            // Images cache
            images: {
                cacheName: 'lingoquest-images-v1.0.0',
                strategy: 'CacheFirst',
                maxEntries: 60,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                
                urlPatterns: [
                    /\.(?:png|jpg|jpeg|svg|gif|webp)$/
                ]
            }
        }
    },
    
    // Workbox configuration
    workbox: {
        globDirectory: 'dist/',
        globPatterns: [
            '**/*.{html,js,css,png,jpg,jpeg,svg,gif,ico,woff2,json}'
        ],
        swDest: 'dist/sw.js',
        
        // Runtime caching
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
        ],
        
        // Skip waiting and clients claim
        skipWaiting: false,
        clientsClaim: false,
        
        // Background sync
        backgroundSync: {
            name: 'lingoquest-bg-sync',
            options: {
                maxRetentionTime: 24 * 60 // 24 hours
            }
        }
    },
    
    // Development configuration
    development: {
        serviceWorker: {
            enabled: true,
            mockResponses: true,
            logLevel: 'debug'
        },
        
        manifest: {
            theme_color: '#007bff',
            background_color: '#ffffff'
        }
    },
    
    // Production configuration
    production: {
        serviceWorker: {
            enabled: true,
            precache: true,
            logLevel: 'error'
        },
        
        optimization: {
            minify: true,
            compression: true,
            treeshaking: true
        }
    }
};

// Helper functions for PWA configuration
export const pwaUtils = {
    // Get environment-specific configuration
    getConfig(environment = 'production') {
        const baseConfig = { ...pwaConfig };
        const envConfig = pwaConfig[environment] || {};
        
        return {
            ...baseConfig,
            ...envConfig
        };
    },
    
    // Generate manifest.json
    generateManifest(config = pwaConfig) {
        return {
            name: config.name,
            short_name: config.shortName,
            description: config.description,
            start_url: config.startUrl,
            display: config.display,
            orientation: config.orientation,
            theme_color: config.themeColor,
            background_color: config.backgroundColor,
            scope: config.scope,
            icons: config.manifest.icons,
            shortcuts: config.manifest.shortcuts,
            categories: config.manifest.categories
        };
    },
    
    // Get cache strategies
    getCacheStrategies() {
        return Object.entries(pwaConfig.serviceWorker.cacheConfig).map(
            ([name, config]) => ({
                name,
                strategy: config.strategy,
                cacheName: config.cacheName,
                options: {
                    maxEntries: config.maxEntries,
                    maxAgeSeconds: config.maxAgeSeconds
                }
            })
        );
    },
    
    // Validate PWA configuration
    validateConfig(config = pwaConfig) {
        const errors = [];
        
        // Required fields
        const required = ['name', 'shortName', 'description', 'startUrl'];
        required.forEach(field => {
            if (!config[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        // Icon validation
        if (!config.manifest.icons || config.manifest.icons.length === 0) {
            errors.push('At least one icon is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
};

export default pwaConfig;




