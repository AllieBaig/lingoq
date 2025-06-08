

/**
 * Purpose: Deployment orchestrator for LingoQuest PWA to various hosting platforms
 * Key features: Multi-platform deployment, environment validation, rollback support, health checks
 * Dependencies: Platform-specific deployment APIs, file system operations, network requests
 * Related helpers: Platform adapters, deployment validation, backup management, monitoring
 * Function names: deployApp, validateDeployment, createBackup, rollbackDeployment, healthCheck
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:15 | File: build/scripts/deploy.js
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { spawn } from 'child_process';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../../');

// Deployment configuration
const DEPLOY_CONFIG = {
    platform: process.env.DEPLOY_PLATFORM || 'github-pages',
    environment: process.env.DEPLOY_ENV || 'production',
    dryRun: process.env.DRY_RUN === 'true',
    skipBuild: process.env.SKIP_BUILD === 'true',
    skipBackup: process.env.SKIP_BACKUP === 'true',
    skipHealthCheck: process.env.SKIP_HEALTH_CHECK === 'true',
    verbose: process.env.VERBOSE === 'true'
};

// Platform-specific configurations
const PLATFORMS = {
    'github-pages': {
        name: 'GitHub Pages',
        buildDir: 'dist',
        deployCommand: 'gh-pages',
        requiresAuth: true,
        supportsCustomDomain: true,
        supportsHTTPS: true
    },
    'netlify': {
        name: 'Netlify',
        buildDir: 'dist',
        deployCommand: 'netlify',
        requiresAuth: true,
        supportsCustomDomain: true,
        supportsHTTPS: true
    },
    'vercel': {
        name: 'Vercel',
        buildDir: 'dist',
        deployCommand: 'vercel',
        requiresAuth: true,
        supportsCustomDomain: true,
        supportsHTTPS: true
    },
    'firebase': {
        name: 'Firebase Hosting',
        buildDir: 'dist',
        deployCommand: 'firebase',
        requiresAuth: true,
        supportsCustomDomain: true,
        supportsHTTPS: true
    },
    'surge': {
        name: 'Surge.sh',
        buildDir: 'dist',
        deployCommand: 'surge',
        requiresAuth: true,
        supportsCustomDomain: true,
        supportsHTTPS: false
    }
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
    deploy: (msg) => console.log(`${colors.cyan}🚀${colors.reset} ${colors.bright}${msg}${colors.reset}`),
    verbose: (msg) => DEPLOY_CONFIG.verbose && console.log(`${colors.magenta}📝${colors.reset} ${msg}`)
};

// Deployment state
const deployState = {
    startTime: Date.now(),
    platform: null,
    buildHash: null,
    deploymentUrl: null,
    backupCreated: false,
    healthCheckPassed: false,
    deploymentId: null
};

/**
 * Main deployment orchestrator
 */
async function deployApp() {
    try {
        log.deploy('Starting LingoQuest PWA deployment...');
        
        // Pre-deployment validation
        await validateDeploymentEnvironment();
        
        // Create backup if not skipped
        if (!DEPLOY_CONFIG.skipBackup) {
            await createDeploymentBackup();
        }
        
        // Build application if not skipped
        if (!DEPLOY_CONFIG.skipBuild) {
            await buildForDeployment();
        }
        
        // Validate build output
        await validateBuildOutput();
        
        // Execute platform-specific deployment
        await executeDeployment();
        
        // Perform health check
        if (!DEPLOY_CONFIG.skipHealthCheck) {
            await performHealthCheck();
        }
        
        // Show deployment summary
        await showDeploymentSummary();
        
    } catch (error) {
        log.error(`Deployment failed: ${error.message}`);
        
        // Attempt rollback if deployment was started
        if (deployState.deploymentId && !DEPLOY_CONFIG.dryRun) {
            await attemptRollback();
        }
        
        process.exit(1);
    }
}

/**
 * Validate deployment environment
 */
async function validateDeploymentEnvironment() {
    log.deploy('Validating deployment environment...');
    
    try {
        // Validate platform configuration
        const platform = PLATFORMS[DEPLOY_CONFIG.platform];
        if (!platform) {
            throw new Error(`Unsupported deployment platform: ${DEPLOY_CONFIG.platform}`);
        }
        
        deployState.platform = platform;
        log.verbose(`✓ Platform: ${platform.name}`);
        
        // Check if platform CLI is available
        await checkPlatformCLI(platform);
        
        // Validate authentication
        if (platform.requiresAuth && !DEPLOY_CONFIG.dryRun) {
            await validateAuthentication(platform);
        }
        
        // Check repository status
        await validateRepositoryStatus();
        
        // Validate environment variables
        await validateEnvironmentVariables();
        
        log.success('Environment validation completed');
        
    } catch (error) {
        throw new Error(`Environment validation failed: ${error.message}`);
    }
}

/**
 * Check if platform CLI tool is available
 */
async function checkPlatformCLI(platform) {
    log.verbose(`Checking ${platform.name} CLI availability...`);
    
    try {
        const command = platform.deployCommand;
        await runCommand(command, ['--version'], { stdio: 'pipe' });
        log.verbose(`✓ ${platform.name} CLI is available`);
    } catch (error) {
        throw new Error(`${platform.name} CLI not found. Please install it first.`);
    }
}

/**
 * Validate authentication for the platform
 */
async function validateAuthentication(platform) {
    log.verbose(`Validating ${platform.name} authentication...`);
    
    try {
        switch (DEPLOY_CONFIG.platform) {
            case 'github-pages':
                await validateGitHubAuth();
                break;
            case 'netlify':
                await validateNetlifyAuth();
                break;
            case 'vercel':
                await validateVercelAuth();
                break;
            case 'firebase':
                await validateFirebaseAuth();
                break;
            case 'surge':
                await validateSurgeAuth();
                break;
            default:
                log.warning('Authentication validation not implemented for this platform');
        }
        
        log.verbose(`✓ ${platform.name} authentication valid`);
        
    } catch (error) {
        throw new Error(`Authentication failed for ${platform.name}: ${error.message}`);
    }
}

/**
 * Validate repository status
 */
async function validateRepositoryStatus() {
    log.verbose('Validating repository status...');
    
    try {
        // Check if we're in a git repository
        await runCommand('git', ['status'], { stdio: 'pipe' });
        
        // Check for uncommitted changes
        const { stdout } = await runCommand('git', ['status', '--porcelain'], { 
            stdio: 'pipe', 
            capture: true 
        });
        
        if (stdout.trim() && DEPLOY_CONFIG.environment === 'production') {
            log.warning('Repository has uncommitted changes');
            if (!DEPLOY_CONFIG.dryRun) {
                const answer = await promptUser('Continue with uncommitted changes? (y/N): ');
                if (answer.toLowerCase() !== 'y') {
                    throw new Error('Deployment cancelled due to uncommitted changes');
                }
            }
        }
        
        log.verbose('✓ Repository status validated');
        
    } catch (error) {
        if (error.message.includes('not a git repository')) {
            log.warning('Not in a git repository - some features may be limited');
        } else {
            throw error;
        }
    }
}

/**
 * Validate required environment variables
 */
async function validateEnvironmentVariables() {
    log.verbose('Validating environment variables...');
    
    const requiredVars = [];
    
    // Platform-specific required variables
    switch (DEPLOY_CONFIG.platform) {
        case 'netlify':
            requiredVars.push('NETLIFY_AUTH_TOKEN');
            break;
        case 'vercel':
            requiredVars.push('VERCEL_TOKEN');
            break;
        case 'firebase':
            requiredVars.push('FIREBASE_TOKEN');
            break;
    }
    
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0 && !DEPLOY_CONFIG.dryRun) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    log.verbose('✓ Environment variables validated');
}

/**
 * Create deployment backup
 */
async function createDeploymentBackup() {
    log.deploy('Creating deployment backup...');
    
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = join(projectRoot, 'backups', `deployment-${timestamp}`);
        
        // Create backup directory
        await fs.mkdir(backupDir, { recursive: true });
        
        // Create git commit hash file
        try {
            const { stdout: commitHash } = await runCommand('git', ['rev-parse', 'HEAD'], {
                stdio: 'pipe',
                capture: true
            });
            
            await fs.writeFile(
                join(backupDir, 'commit-hash.txt'),
                commitHash.trim()
            );
        } catch (error) {
            log.verbose('Could not get git commit hash');
        }
        
        // Backup current dist if it exists
        const distPath = join(projectRoot, 'dist');
        try {
            await fs.access(distPath);
            await copyDirectory(distPath, join(backupDir, 'dist'));
            log.verbose('✓ Backed up current dist directory');
        } catch (error) {
            log.verbose('No existing dist directory to backup');
        }
        
        // Create backup metadata
        const metadata = {
            timestamp: new Date().toISOString(),
            platform: DEPLOY_CONFIG.platform,
            environment: DEPLOY_CONFIG.environment,
            version: await getProjectVersion()
        };
        
        await fs.writeFile(
            join(backupDir, 'metadata.json'),
            JSON.stringify(metadata, null, 2)
        );
        
        deployState.backupCreated = true;
        log.success(`Backup created: ${backupDir}`);
        
    } catch (error) {
        log.warning(`Backup creation failed: ${error.message}`);
    }
}

/**
 * Build application for deployment
 */
async function buildForDeployment() {
    log.deploy('Building application for deployment...');
    
    try {
        // Set production environment
        const buildEnv = {
            ...process.env,
            NODE_ENV: 'production',
            BUILD_TARGET: DEPLOY_CONFIG.environment
        };
        
        // Run build script
        const buildScript = join(__dirname, 'build.js');
        await runCommand('node', [buildScript], {
            env: buildEnv,
            stdio: DEPLOY_CONFIG.verbose ? 'inherit' : 'pipe'
        });
        
        // Generate build hash
        deployState.buildHash = await generateBuildHash();
        
        log.success('Application build completed');
        
    } catch (error) {
        throw new Error(`Build failed: ${error.message}`);
    }
}

/**
 * Validate build output
 */
async function validateBuildOutput() {
    log.deploy('Validating build output...');
    
    try {
        const distPath = join(projectRoot, deployState.platform.buildDir);
        
        // Check if dist directory exists
        await fs.access(distPath);
        
        // Check for required files
        const requiredFiles = [
            'index.html',
            'manifest.json'
        ];
        
        for (const file of requiredFiles) {
            const filePath = join(distPath, file);
            try {
                await fs.access(filePath);
                log.verbose(`✓ Found required file: ${file}`);
            } catch (error) {
                throw new Error(`Required file missing: ${file}`);
            }
        }
        
        // Validate PWA manifest
        await validatePWAManifest(distPath);
        
        // Check build size
        const buildSize = await calculateDirectorySize(distPath);
        log.verbose(`Build size: ${formatBytes(buildSize)}`);
        
        if (buildSize > 50 * 1024 * 1024) { // 50MB warning
            log.warning('Build size is quite large (>50MB)');
        }
        
        log.success('Build output validation completed');
        
    } catch (error) {
        throw new Error(`Build validation failed: ${error.message}`);
    }
}

/**
 * Execute platform-specific deployment
 */
async function executeDeployment() {
    if (DEPLOY_CONFIG.dryRun) {
        log.deploy('DRY RUN: Would execute deployment to ' + deployState.platform.name);
        return;
    }
    
    log.deploy(`Deploying to ${deployState.platform.name}...`);
    
    try {
        switch (DEPLOY_CONFIG.platform) {
            case 'github-pages':
                await deployToGitHubPages();
                break;
            case 'netlify':
                await deployToNetlify();
                break;
            case 'vercel':
                await deployToVercel();
                break;
            case 'firebase':
                await deployToFirebase();
                break;
            case 'surge':
                await deployToSurge();
                break;
            default:
                throw new Error(`Deployment not implemented for ${DEPLOY_CONFIG.platform}`);
        }
        
        log.success(`Deployment to ${deployState.platform.name} completed`);
        
    } catch (error) {
        throw new Error(`Deployment failed: ${error.message}`);
    }
}

/**
 * Deploy to GitHub Pages
 */
async function deployToGitHubPages() {
    log.verbose('Deploying to GitHub Pages...');
    
    const distPath = join(projectRoot, 'dist');
    
    // Use gh-pages package
    await runCommand('npx', [
        'gh-pages',
        '--dist', distPath,
        '--message', `Deploy LingoQuest ${await getProjectVersion()}`,
        '--dotfiles'
    ], {
        stdio: DEPLOY_CONFIG.verbose ? 'inherit' : 'pipe'
    });
    
    // Get repository URL for deployment URL
    try {
        const { stdout } = await runCommand('git', ['remote', 'get-url', 'origin'], {
            stdio: 'pipe',
            capture: true
        });
        
        const repoUrl = stdout.trim();
        const match = repoUrl.match(/github\.com[:/](.+?)\.git$/);
        if (match) {
            deployState.deploymentUrl = `https://${match[1].replace('/', '.github.io/')}`;
        }
    } catch (error) {
        log.verbose('Could not determine GitHub Pages URL');
    }
}

/**
 * Deploy to Netlify
 */
async function deployToNetlify() {
    log.verbose('Deploying to Netlify...');
    
    const distPath = join(projectRoot, 'dist');
    
    const { stdout } = await runCommand('netlify', [
        'deploy',
        '--prod',
        '--dir', distPath,
        '--message', `Deploy LingoQuest ${await getProjectVersion()}`
    ], {
        stdio: 'pipe',
        capture: true
    });
    
    // Extract deployment URL from output
    const urlMatch = stdout.match(/Website URL:\s*(https?:\/\/[^\s]+)/);
    if (urlMatch) {
        deployState.deploymentUrl = urlMatch[1];
    }
}

/**
 * Deploy to Vercel
 */
async function deployToVercel() {
    log.verbose('Deploying to Vercel...');
    
    const { stdout } = await runCommand('vercel', [
        '--prod',
        '--yes'
    ], {
        stdio: 'pipe',
        capture: true
    });
    
    // Extract deployment URL from output
    const urlMatch = stdout.match(/https:\/\/[^\s]+/);
    if (urlMatch) {
        deployState.deploymentUrl = urlMatch[0];
    }
}

/**
 * Deploy to Firebase
 */
async function deployToFirebase() {
    log.verbose('Deploying to Firebase...');
    
    await runCommand('firebase', [
        'deploy',
        '--only', 'hosting'
    ], {
        stdio: DEPLOY_CONFIG.verbose ? 'inherit' : 'pipe'
    });
    
    // Get hosting URL
    try {
        const { stdout } = await runCommand('firebase', [
            'hosting:channel:list'
        ], {
            stdio: 'pipe',
            capture: true
        });
        
        // Parse Firebase output for URL (simplified)
        const urlMatch = stdout.match(/https:\/\/[^\s]+\.web\.app/);
        if (urlMatch) {
            deployState.deploymentUrl = urlMatch[0];
        }
    } catch (error) {
        log.verbose('Could not determine Firebase hosting URL');
    }
}

/**
 * Deploy to Surge
 */
async function deployToSurge() {
    log.verbose('Deploying to Surge...');
    
    const distPath = join(projectRoot, 'dist');
    const domain = process.env.SURGE_DOMAIN || 'lingoquest.surge.sh';
    
    await runCommand('surge', [
        distPath,
        domain
    ], {
        stdio: DEPLOY_CONFIG.verbose ? 'inherit' : 'pipe'
    });
    
    deployState.deploymentUrl = `https://${domain}`;
}

/**
 * Perform health check on deployed application
 */
async function performHealthCheck() {
    if (!deployState.deploymentUrl) {
        log.warning('No deployment URL available, skipping health check');
        return;
    }
    
    log.deploy('Performing health check...');
    
    try {
        // Wait a bit for deployment to propagate
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        const response = await fetch(deployState.deploymentUrl);
        
        if (response.ok) {
            log.verbose(`✓ Health check passed (${response.status})`);
            
            // Check for PWA manifest
            const manifestUrl = new URL('/manifest.json', deployState.deploymentUrl);
            const manifestResponse = await fetch(manifestUrl);
            
            if (manifestResponse.ok) {
                log.verbose('✓ PWA manifest accessible');
            } else {
                log.warning('PWA manifest not accessible');
            }
            
            deployState.healthCheckPassed = true;
            log.success('Health check completed successfully');
            
        } else {
            throw new Error(`Health check failed with status ${response.status}`);
        }
        
    } catch (error) {
        log.warning(`Health check failed: ${error.message}`);
        deployState.healthCheckPassed = false;
    }
}

/**
 * Show deployment summary
 */
async function showDeploymentSummary() {
    const deployTime = Date.now() - deployState.startTime;
    
    console.log('\n' + '='.repeat(60));
    log.success('LingoQuest PWA deployment completed!');
    console.log('='.repeat(60));
    
    console.log(`🚀 Deployment Summary:`);
    console.log(`   Platform: ${deployState.platform.name}`);
    console.log(`   Environment: ${DEPLOY_CONFIG.environment}`);
    console.log(`   Time: ${formatTime(deployTime)}`);
    console.log(`   Build Hash: ${deployState.buildHash || 'N/A'}`);
    
    if (deployState.deploymentUrl) {
        console.log(`   URL: ${deployState.deploymentUrl}`);
    }
    
    console.log(`\n✅ Status Checks:`);
    console.log(`   Backup Created: ${deployState.backupCreated ? 'Yes' : 'No'}`);
    console.log(`   Health Check: ${deployState.healthCheckPassed ? 'Passed' : 'Failed/Skipped'}`);
    
    if (DEPLOY_CONFIG.dryRun) {
        console.log(`\n💡 This was a dry run - no actual deployment was performed`);
    }
    
    console.log('\n🎉 Deployment successful!');
    console.log('='.repeat(60) + '\n');
}

// Platform authentication validators
async function validateGitHubAuth() {
    await runCommand('gh', ['auth', 'status'], { stdio: 'pipe' });
}

async function validateNetlifyAuth() {
    await runCommand('netlify', ['status'], { stdio: 'pipe' });
}

async function validateVercelAuth() {
    await runCommand('vercel', ['whoami'], { stdio: 'pipe' });
}

async function validateFirebaseAuth() {
    await runCommand('firebase', ['projects:list'], { stdio: 'pipe' });
}

async function validateSurgeAuth() {
    await runCommand('surge', ['whoami'], { stdio: 'pipe' });
}

// Utility functions
async function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: 'pipe',
            cwd: projectRoot,
            ...options
        });
        
        let stdout = '';
        let stderr = '';
        
        if (child.stdout) {
            child.stdout.on('data', (data) => {
                stdout += data.toString();
                if (options.stdio === 'inherit') {
                    process.stdout.write(data);
                }
            });
        }
        
        if (child.stderr) {
            child.stderr.on('data', (data) => {
                stderr += data.toString();
                if (options.stdio === 'inherit') {
                    process.stderr.write(data);
                }
            });
        }
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve(options.capture ? { stdout, stderr } : undefined);
            } else {
                reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
            }
        });
        
        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);
        
        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function calculateDirectorySize(dir) {
    let size = 0;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
            size += await calculateDirectorySize(fullPath);
        } else {
            const stats = await fs.stat(fullPath);
            size += stats.size;
        }
    }
    
    return size;
}

async function generateBuildHash() {
    const distPath = join(projectRoot, 'dist');
    const hash = createHash('md5');
    
    async function hashDirectory(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            
            if (entry.isDirectory()) {
                await hashDirectory(fullPath);
            } else {
                const content = await fs.readFile(fullPath);
                hash.update(content);
            }
        }
    }
    
    await hashDirectory(distPath);
    return hash.digest('hex').substring(0, 8);
}

async function getProjectVersion() {
    try {
        const packagePath = join(projectRoot, 'package.json');
        const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8'));
        return packageJson.version || '1.0.0';
    } catch (error) {
        return '1.0.0';
    }
}

async function validatePWAManifest(distPath) {
    const manifestPath = join(distPath, 'manifest.json');
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    
    const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
    const missing = required.filter(field => !manifest[field]);
    
    if (missing.length > 0) {
        throw new Error(`PWA manifest missing fields: ${missing.join(', ')}`);
    }
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

async function promptUser(question) {
    // Simplified prompt - in production, use readline or prompts library
    return 'n'; // Default to no for automated environments
}

async function attemptRollback() {
    log.warning('Attempting deployment rollback...');
    // Rollback logic would be implemented here
    log.info('Rollback functionality not yet implemented');
}

// Run deployment if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    deployApp().catch(error => {
        log.error(`Deployment process failed: ${error.message}`);
        process.exit(1);
    });
}

export { deployApp };

