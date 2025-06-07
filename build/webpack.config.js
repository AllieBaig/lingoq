




/**
 * Purpose: Webpack configuration for LingoQuest PWA build optimization
 * Key features: ES6 modules, PWA optimization, code splitting, asset optimization
 * Dependencies: Webpack 5, various loaders and plugins for modern web development
 * Related helpers: Build optimization, bundle analysis, development server setup
 * Function names: N/A (configuration file)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:00 | File: build/webpack.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = !isDevelopment;

module.exports = {
    // Entry points for the application
    entry: {
        main: './js/main.js',
        'dark-mode-toggle': './js/modules/ui/darkModeToggle.js',
        'theme-manager': './js/modules/settings/themeManager.js'
    },

    // Output configuration
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDevelopment 
            ? 'js/[name].js' 
            : 'js/[name].[contenthash:8].js',
        chunkFilename: isDevelopment 
            ? 'js/[name].chunk.js' 
            : 'js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
        clean: true,
        publicPath: '/'
    },

    // Mode configuration
    mode: isDevelopment ? 'development' : 'production',

    // Development server configuration
    devServer: isDevelopment ? {
        static: {
            directory: path.resolve(__dirname, '../'),
            publicPath: '/'
        },
        port: 3000,
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        },
        headers: {
            'Service-Worker-Allowed': '/'
        }
    } : undefined,

    // Source maps for debugging
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',

    // Module resolution
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../js'),
            '@components': path.resolve(__dirname, '../components'),
            '@data': path.resolve(__dirname, '../js/data'),
            '@modules': path.resolve(__dirname, '../js/modules'),
            '@utils': path.resolve(__dirname, '../js/modules/utils'),
            '@themes': path.resolve(__dirname, '../css/themes'),
            '@assets': path.resolve(__dirname, '../assets')
        }
    },

    // Module loaders
    module: {
        rules: [
            // JavaScript/ES6+ processing
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions', 'not dead']
                                },
                                modules: false,
                                useBuiltIns: 'usage',
                                corejs: 3
                            }]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-dynamic-import',
                            '@babel/plugin-syntax-top-level-await'
                        ]
                    }
                }
            },

            // CSS processing
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                    isProduction && 'cssnano'
                                ].filter(Boolean)
                            }
                        }
                    }
                ]
            },

            // HTML processing for components
            {
                test: /\.html$/,
                exclude: /index\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: isProduction,
                            sources: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src'
                                    }
                                ]
                            }
                        }
                    }
                ]
            },

            // Image processing
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'assets/images/[name].[contenthash:8][ext]'
                }
            },

            // Font processing
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash:8][ext]'
                }
            },

            // JSON processing for data files
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: 'data/[name].[contenthash:8][ext]'
                }
            }
        ]
    },

    // Optimization configuration
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: isProduction,
                        drop_debugger: isProduction
                    },
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ],

        // Code splitting configuration
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // Vendor libraries
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10
                },
                
                // Common modules across the app
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true
                },
                
                // CSS files
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },

                // Game data modules
                gameData: {
                    test: /[\\/]js[\\/]data[\\/]/,
                    name: 'game-data',
                    chunks: 'all',
                    priority: 8
                },

                // Theme modules
                themes: {
                    test: /[\\/]themes[\\/]/,
                    name: 'themes',
                    chunks: 'all',
                    priority: 7
                }
            }
        },

        // Runtime chunk for better long-term caching
        runtimeChunk: {
            name: 'runtime'
        }
    },

    // Webpack plugins
    plugins: [
        // HTML processing
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
            minify: isProduction ? {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } : false
        }),

        // CSS extraction for production
        ...(isProduction ? [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].chunk.css'
            })
        ] : []),

        // Copy static assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'manifest.json',
                    to: 'manifest.json'
                },
                {
                    from: 'sw.js',
                    to: 'sw.js'
                },
                {
                    from: 'components',
                    to: 'components'
                },
                {
                    from: 'assets',
                    to: 'assets'
                },
                {
                    from: 'css',
                    to: 'css'
                }
            ]
        }),

        // Service Worker generation for PWA
        ...(isProduction ? [
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                swDest: 'sw-generated.js',
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-resources'
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'google-fonts'
                        }
                    }
                ]
            })
        ] : []),

        // Gzip compression for production
        ...(isProduction ? [
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 8192,
                minRatio: 0.8
            })
        ] : []),

        // Bundle analyzer (only when ANALYZE=true)
        ...(process.env.ANALYZE ? [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundle-report.html'
            })
        ] : [])
    ],

    // Performance hints
    performance: {
        hints: isProduction ? 'warning' : false,
        maxAssetSize: 512000, // 512kb
        maxEntrypointSize: 512000,
        assetFilter: (assetFilename) => {
            return !assetFilename.endsWith('.map');
        }
    },

    // Stats configuration for cleaner output
    stats: {
        colors: true,
        modules: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        assets: isDevelopment,
        timings: true,
        builtAt: true,
        version: false,
        hash: false
    }
};




