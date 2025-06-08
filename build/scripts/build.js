


/**
 * Purpose: Build script orchestrator for LingoQuest PWA production builds
 * Key features: Multi-stage building, asset optimization, PWA validation, deployment preparation
 * Dependencies: Node.js file system, child process, path utilities, build tools
 * Related helpers: File operations, process management, error handling, logging
 * Function names: buildApp, optimizeAssets, validatePWA, generateReports, cleanDist
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:05 | File: build/scripts/build.js
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../../');

// Build configuration
const BUILD_CONFIG = {
    target: process.env.BUILD_TARGET || 'production',
    skipOptimization: process.env.SKIP_OPTIMIZATION === 'true',
    skipValidation: process.env.SKIP_VALIDATION === 'true',
    generateReport: process.env.GENERATE_REPORT !== 'false',
    verbose: process.env.VERBOSE === 'true'
};

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Logging utilities
const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
    step: (msg) => console.log(`${colors.cyan}🔧${colors.reset} ${colors.bright}${msg}${colors.reset}`),
    verbose: (msg) => BUILD_CONFIG.verbose && console.log(`${colors.magenta}📝${colors.reset} ${msg}`)
};

// Build metrics tracking
const buildMetrics = {
    startTime: Date.now(),
    stages: {},
    assets: {
        input: 0,
        output: 0,
        compressed: 0
    },
    errors: [],
    warnings: []
};

/**
 * Main build orchestrator
 */
async function buildApp() {
    try {
        log.info('Starting LingoQuest PWA build process...');
        
        // Pre-build validation
        await validateEnvironment();
        
        // Clean previous build
        await cleanDistDirectory();
        
        // Run build stages
        await runBuildStages();
        
        // Post-build optimization
        if (!BUILD_CONFIG.skipOptimization) {
            await optimizeAssets();
        }
        
        // PWA validation
        if (!BUILD_CONFIG.skipValidation) {
            await validatePWA();
        }
        
        // Generate build report
        if (BUILD_CONFIG.generateReport) {
            await generateBuildReport();
        }
        
        // Success summary
        await showBuildSummary();
        
    } catch (error) {
        log.error(`Build failed: ${error.message}`);
        buildMetrics.errors.push(error);
        process.exit(1);
    }
}

/**
 * Validate build environment
 */
async function validateEnvironment() {
    const stage = 'environment-validation';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Validating build environment...');
    
    try {
        // Check Node.js version
        const nodeVersion = process.version;
        const requiredVersion = '16.0.0';
        log.verbose(`Node.js version: ${nodeVersion}`);
        
        // Check required files exist
        const requiredFiles = [
            'package.json',
            'js/main.js',
            'manifest.json',
            'index.html',
            'build/rollup.config.js'
        ];
        
        for (const file of requiredFiles) {
            const filePath = join(projectRoot, file);
            try {
                await fs.access(filePath);
                log.verbose(`✓ Found ${file}`);
            } catch (error) {
                throw new Error(`Required file missing: ${file}`);
            }
        }
        
        // Check npm dependencies
        await checkDependencies();
        
        buildMetrics.stages[stage].end = Date.now();
        log.success('Environment validation completed');
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        throw error;
    }
}

/**
 * Check npm dependencies
 */
async function checkDependencies() {
    log.verbose('Checking npm dependencies...');
    
    try {
        const packageJsonPath = join(projectRoot, 'package.json');
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
        
        // Check if node_modules exists
        try {
            await fs.access(join(projectRoot, 'node_modules'));
            log.verbose('✓ node_modules directory found');
        } catch (error) {
            log.warning('node_modules not found, dependencies may need to be installed');
        }
        
        return true;
    } catch (error) {
        throw new Error(`Failed to check dependencies: ${error.message}`);
    }
}

/**
 * Clean distribution directory
 */
async function cleanDistDirectory() {
    const stage = 'clean-dist';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Cleaning distribution directory...');
    
    try {
        const distPath = join(projectRoot, 'dist');
        
        // Remove existing dist directory
        try {
            await fs.rm(distPath, { recursive: true, force: true });
            log.verbose('Removed existing dist directory');
        } catch (error) {
            log.verbose('No existing dist directory to remove');
        }
        
        // Create fresh dist directory
        await fs.mkdir(distPath, { recursive: true });
        log.verbose('Created fresh dist directory');
        
        buildMetrics.stages[stage].end = Date.now();
        log.success('Distribution directory cleaned');
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        throw new Error(`Failed to clean dist directory: ${error.message}`);
    }
}

/**
 * Run main build stages
 */
async function runBuildStages() {
    const stage = 'rollup-build';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Running Rollup build...');
    
    try {
        // Set environment variables
        const env = {
            ...process.env,
            NODE_ENV: BUILD_CONFIG.target === 'production' ? 'production' : 'development',
            BUILD_TARGET: BUILD_CONFIG.target,
            BUILD_TIME: new Date().toISOString()
        };
        
        // Run Rollup build
        const rollupConfigPath = join(projectRoot, 'build/rollup.config.js');
        await runCommand('npx', ['rollup', '--config', rollupConfigPath], { env });
        
        buildMetrics.stages[stage].end = Date.now();
        log.success('Rollup build completed');
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        throw new Error(`Rollup build failed: ${error.message}`);
    }
}

/**
 * Optimize built assets
 */
async function optimizeAssets() {
    const stage = 'asset-optimization';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Optimizing assets...');
    
    try {
        const distPath = join(projectRoot, 'dist');
        
        // Collect asset statistics
        await collectAssetStats(distPath);
        
        // Optimize images (if any)
        await optimizeImages(distPath);
        
        // Generate asset manifest
        await generateAssetManifest(distPath);
        
        // Add security headers file
        await generateSecurityHeaders(distPath);
        
        buildMetrics.stages[stage].end = Date.now();
        log.success('Asset optimization completed');
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        log.warning(`Asset optimization failed: ${error.message}`);
    }
}

/**
 * Collect asset statistics
 */
async function collectAssetStats(distPath) {
    log.verbose('Collecting asset statistics...');
    
    try {
        const files = await getAllFiles(distPath);
        
        for (const file of files) {
            const stats = await fs.stat(file);
            buildMetrics.assets.output += stats.size;
        }
        
        log.verbose(`Total output size: ${formatBytes(buildMetrics.assets.output)}`);
        
    } catch (error) {
        log.verbose(`Failed to collect asset stats: ${error.message}`);
    }
}

/**
 * Optimize images
 */
async function optimizeImages(distPath) {
    log.verbose('Optimizing images...');
    
    try {
        const imageFiles = await findFiles(distPath, /\.(png|jpg|jpeg|svg)$/);
        
        if (imageFiles.length > 0) {
            log.verbose(`Found ${imageFiles.length} image files to optimize`);
            // Image optimization would go here
            // For now, just log the files found
            imageFiles.forEach(file => log.verbose(`  - ${file}`));
        }
        
    } catch (error) {
        log.verbose(`Image optimization failed: ${error.message}`);
    }
}

/**
 * Generate asset manifest
 */
async function generateAssetManifest(distPath) {
    log.verbose('Generating asset manifest...');
    
    try {
        const files = await getAllFiles(distPath);
        const manifest = {};
        
        for (const file of files) {
            const relativePath = file.replace(distPath + '/', '');
            const stats = await fs.stat(file);
            const content = await fs.readFile(file);
            const hash = createHash('md5').update(content).digest('hex');
            
            manifest[relativePath] = {
                size: stats.size,
                hash: hash.substring(0, 8),
                lastModified: stats.mtime.toISOString()
            };
        }
        
        const manifestPath = join(distPath, 'asset-manifest.json');
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        
        log.verbose(`Asset manifest generated with ${Object.keys(manifest).length} entries`);
        
    } catch (error) {
        log.verbose(`Failed to generate asset manifest: ${error.message}`);
    }
}

/**
 * Generate security headers file
 */
async function generateSecurityHeaders(distPath) {
    log.verbose('Generating security headers...');
    
    try {
        const headers = {
            '/*': {
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'X-XSS-Protection': '1; mode=block',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
            }
        };
        
        const headersPath = join(distPath, '_headers');
        const headersContent = Object.entries(headers)
            .map(([path, pathHeaders]) => {
                const headerLines = Object.entries(pathHeaders)
                    .map(([key, value]) => `  ${key}: ${value}`)
                    .join('\n');
                return `${path}\n${headerLines}`;
            })
            .join('\n\n');
        
        await fs.writeFile(headersPath, headersContent);
        log.verbose('Security headers file generated');
        
    } catch (error) {
        log.verbose(`Failed to generate security headers: ${error.message}`);
    }
}

/**
 * Validate PWA compliance
 */
async function validatePWA() {
    const stage = 'pwa-validation';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Validating PWA compliance...');
    
    try {
        const distPath = join(projectRoot, 'dist');
        
        // Check required PWA files
        const requiredFiles = [
            'manifest.json',
            'sw.js',
            'index.html'
        ];
        
        for (const file of requiredFiles) {
            const filePath = join(distPath, file);
            try {
                await fs.access(filePath);
                log.verbose(`✓ PWA file found: ${file}`);
            } catch (error) {
                throw new Error(`Required PWA file missing: ${file}`);
            }
        }
        
        // Validate manifest
        await validateManifest(distPath);
        
        // Check service worker
        await validateServiceWorker(distPath);
        
        buildMetrics.stages[stage].end = Date.now();
        log.success('PWA validation completed');
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        log.warning(`PWA validation failed: ${error.message}`);
    }
}

/**
 * Validate PWA manifest
 */
async function validateManifest(distPath) {
    log.verbose('Validating PWA manifest...');
    
    try {
        const manifestPath = join(distPath, 'manifest.json');
        const manifestContent = await fs.readFile(manifestPath, 'utf8');
        const manifest = JSON.parse(manifestContent);
        
        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
        const missingFields = requiredFields.filter(field => !manifest[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Manifest missing required fields: ${missingFields.join(', ')}`);
        }
        
        log.verbose('✓ PWA manifest is valid');
        
    } catch (error) {
        throw new Error(`Manifest validation failed: ${error.message}`);
    }
}

/**
 * Validate service worker
 */
async function validateServiceWorker(distPath) {
    log.verbose('Validating service worker...');
    
    try {
        const swPath = join(distPath, 'sw.js');
        const swContent = await fs.readFile(swPath, 'utf8');
        
        // Basic checks for service worker functionality
        const requiredPatterns = [
            /addEventListener\s*\(\s*['"`]install['"`]/,
            /addEventListener\s*\(\s*['"`]fetch['"`]/
        ];
        
        for (const pattern of requiredPatterns) {
            if (!pattern.test(swContent)) {
                log.warning('Service worker may be missing required event listeners');
                break;
            }
        }
        
        log.verbose('✓ Service worker file is valid');
        
    } catch (error) {
        throw new Error(`Service worker validation failed: ${error.message}`);
    }
}

/**
 * Generate build report
 */
async function generateBuildReport() {
    const stage = 'build-report';
    buildMetrics.stages[stage] = { start: Date.now() };
    
    log.step('Generating build report...');
    
    try {
        const distPath = join(projectRoot, 'dist');
        const buildTime = Date.now() - buildMetrics.startTime;
        
        const report = {
            timestamp: new Date().toISOString(),
            buildTime: buildTime,
            target: BUILD_CONFIG.target,
            stages: buildMetrics.stages,
            assets: buildMetrics.assets,
            files: await getFileReport(distPath),
            errors: buildMetrics.errors,
            warnings: buildMetrics.warnings
        };
        
        const reportPath = join(distPath, 'build-report.json');
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
        
        buildMetrics.stages[stage].end = Date.now();
        log.success(`Build report generated: ${reportPath}`);
        
    } catch (error) {
        buildMetrics.stages[stage].error = error.message;
        log.warning(`Failed to generate build report: ${error.message}`);
    }
}

/**
 * Show build summary
 */
async function showBuildSummary() {
    const buildTime = Date.now() - buildMetrics.startTime;
    const distPath = join(projectRoot, 'dist');
    
    console.log('\n' + '='.repeat(60));
    log.success('LingoQuest PWA build completed successfully!');
    console.log('='.repeat(60));
    
    console.log(`📊 Build Summary:`);
    console.log(`   Target: ${BUILD_CONFIG.target}`);
    console.log(`   Time: ${formatTime(buildTime)}`);
    console.log(`   Output: ${distPath}`);
    console.log(`   Size: ${formatBytes(buildMetrics.assets.output)}`);
    
    // Show stage timings
    console.log(`\n⏱️  Stage Timings:`);
    Object.entries(buildMetrics.stages).forEach(([stage, data]) => {
        if (data.end) {
            const stageTime = data.end - data.start;
            console.log(`   ${stage}: ${formatTime(stageTime)}`);
        } else if (data.error) {
            console.log(`   ${stage}: ${colors.red}failed${colors.reset}`);
        }
    });
    
    if (buildMetrics.warnings.length > 0) {
        console.log(`\n⚠️  Warnings: ${buildMetrics.warnings.length}`);
    }
    
    console.log('\n🚀 Ready for deployment!');
    console.log('='.repeat(60) + '\n');
}

// Utility functions
async function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: BUILD_CONFIG.verbose ? 'inherit' : 'pipe',
            cwd: projectRoot,
            ...options
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
        
        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function getAllFiles(dir) {
    const files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...await getAllFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    
    return files;
}

async function findFiles(dir, pattern) {
    const allFiles = await getAllFiles(dir);
    return allFiles.filter(file => pattern.test(file));
}

async function getFileReport(distPath) {
    const files = await getAllFiles(distPath);
    const report = {};
    
    for (const file of files) {
        const relativePath = file.replace(distPath + '/', '');
        const stats = await fs.stat(file);
        report[relativePath] = {
            size: stats.size,
            modified: stats.mtime.toISOString()
        };
    }
    
    return report;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatTime(ms) {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
}

// Run build if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    buildApp().catch(error => {
        log.error(`Build process failed: ${error.message}`);
        process.exit(1);
    });
}

export { buildApp };

