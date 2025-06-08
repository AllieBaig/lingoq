

/**
 * Purpose: Development server and build orchestrator for LingoQuest PWA
 * Key features: Live reload, hot module replacement, file watching, development optimizations
 * Dependencies: Node.js HTTP server, file system watchers, WebSocket for live reload
 * Related helpers: File serving, change detection, browser sync, development middleware
 * Function names: startDevServer, watchFiles, handleHMR, serveFiles, reloadBrowser
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:10 | File: build/scripts/dev.js
 */

import { createServer } from 'http';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, extname } from 'path';
import { spawn } from 'child_process';
import { WebSocketServer } from 'ws';
import { watch } from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../../');

// Development server configuration
const DEV_CONFIG = {
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    open: process.env.OPEN_BROWSER !== 'false',
    livereload: process.env.LIVERELOAD !== 'false',
    hmr: process.env.HMR !== 'false',
    verbose: process.env.VERBOSE === 'true',
    https: process.env.HTTPS === 'true'
};

// MIME types for file serving
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
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
    dev: (msg) => console.log(`${colors.cyan}🔧${colors.reset} ${colors.bright}${msg}${colors.reset}`),
    verbose: (msg) => DEV_CONFIG.verbose && console.log(`${colors.magenta}📝${colors.reset} ${msg}`)
};

// Development server state
const devState = {
    server: null,
    wsServer: null,
    watchers: [],
    clients: new Set(),
    buildProcess: null,
    isBuilding: false,
    lastBuildTime: 0
};

/**
 * Start development server
 */
async function startDevServer() {
    try {
        log.dev('Starting LingoQuest development server...');
        
        // Setup development environment
        await setupDevEnvironment();
        
        // Start HTTP server
        await createHTTPServer();
        
        // Setup WebSocket for live reload
        if (DEV_CONFIG.livereload) {
            setupLiveReload();
        }
        
        // Setup file watchers
        setupFileWatchers();
        
        // Initial build
        await runInitialBuild();
        
        // Open browser
        if (DEV_CONFIG.open) {
            openBrowser();
        }
        
        log.success(`Development server running at http://${DEV_CONFIG.host}:${DEV_CONFIG.port}`);
        
        // Handle graceful shutdown
        setupGracefulShutdown();
        
    } catch (error) {
        log.error(`Failed to start development server: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Setup development environment
 */
async function setupDevEnvironment() {
    log.verbose('Setting up development environment...');
    
    // Set environment variables
    process.env.NODE_ENV = 'development';
    process.env.BUILD_TARGET = 'development';
    process.env.ROLLUP_WATCH = 'true';
    
    // Ensure required directories exist
    const dirs = ['dist', 'logs'];
    for (const dir of dirs) {
        const dirPath = join(projectRoot, dir);
        try {
            await fs.mkdir(dirPath, { recursive: true });
            log.verbose(`✓ Directory ensured: ${dir}`);
        } catch (error) {
            log.verbose(`Failed to create directory ${dir}: ${error.message}`);
        }
    }
}

/**
 * Create HTTP server
 */
async function createHTTPServer() {
    log.verbose('Creating HTTP server...');
    
    devState.server = createServer(async (req, res) => {
        try {
            await handleRequest(req, res);
        } catch (error) {
            log.error(`Request handling error: ${error.message}`);
            sendErrorResponse(res, 500, 'Internal Server Error');
        }
    });
    
    return new Promise((resolve, reject) => {
        devState.server.listen(DEV_CONFIG.port, DEV_CONFIG.host, (error) => {
            if (error) {
                reject(error);
            } else {
                log.verbose(`✓ HTTP server listening on ${DEV_CONFIG.host}:${DEV_CONFIG.port}`);
                resolve();
            }
        });
    });
}

/**
 * Handle HTTP requests
 */
async function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;
    
    log.verbose(`${req.method} ${pathname}`);
    
    // Handle special routes
    if (pathname === '/dev-status') {
        return sendDevStatus(res);
    }
    
    if (pathname === '/dev-reload') {
        return handleDevReload(res);
    }
    
    // Serve files
    await serveFile(pathname, res);
}

/**
 * Serve static files
 */
async function serveFile(pathname, res) {
    try {
        // Default to index.html for SPA routing
        if (pathname === '/' || pathname === '/index.html') {
            pathname = '/index.html';
        }
        
        // Try to serve from project root first, then dist
        let filePath = join(projectRoot, pathname.slice(1));
        let fileExists = false;
        
        try {
            await fs.access(filePath);
            fileExists = true;
        } catch (error) {
            // Try from dist directory
            filePath = join(projectRoot, 'dist', pathname.slice(1));
            try {
                await fs.access(filePath);
                fileExists = true;
            } catch (error) {
                // File not found
                fileExists = false;
            }
        }
        
        if (!fileExists) {
            // For SPA routing, serve index.html for non-API routes
            if (!pathname.startsWith('/api/') && !pathname.includes('.')) {
                filePath = join(projectRoot, 'index.html');
                try {
                    await fs.access(filePath);
                    fileExists = true;
                } catch (error) {
                    return sendErrorResponse(res, 404, 'File not found');
                }
            } else {
                return sendErrorResponse(res, 404, 'File not found');
            }
        }
        
        // Read and serve file
        const content = await fs.readFile(filePath);
        const ext = extname(filePath);
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
        
        // Add development headers
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        // Inject live reload script for HTML files
        if (ext === '.html' && DEV_CONFIG.livereload) {
            const htmlContent = content.toString();
            const injectedContent = injectLiveReloadScript(htmlContent);
            res.end(injectedContent);
        } else {
            res.end(content);
        }
        
    } catch (error) {
        log.error(`Error serving file ${pathname}: ${error.message}`);
        sendErrorResponse(res, 500, 'Internal Server Error');
    }
}

/**
 * Inject live reload script into HTML
 */
function injectLiveReloadScript(html) {
    const script = `
    <script>
        (function() {
            const ws = new WebSocket('ws://${DEV_CONFIG.host}:${DEV_CONFIG.port + 1}');
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'reload') {
                    console.log('🔄 Reloading page due to file changes...');
                    window.location.reload();
                } else if (data.type === 'hmr') {
                    console.log('🔥 Hot module replacement triggered');
                    // HMR logic would go here
                }
            };
            ws.onopen = function() {
                console.log('🔌 Connected to development server');
            };
            ws.onclose = function() {
                console.log('🔌 Disconnected from development server');
                setTimeout(() => window.location.reload(), 1000);
            };
        })();
    </script>
    `;
    
    return html.replace('</body>', `${script}\n</body>`);
}

/**
 * Setup WebSocket server for live reload
 */
function setupLiveReload() {
    log.verbose('Setting up live reload WebSocket server...');
    
    devState.wsServer = new WebSocketServer({ 
        port: DEV_CONFIG.port + 1,
        host: DEV_CONFIG.host
    });
    
    devState.wsServer.on('connection', (ws) => {
        devState.clients.add(ws);
        log.verbose('✓ Live reload client connected');
        
        ws.on('close', () => {
            devState.clients.delete(ws);
            log.verbose('Live reload client disconnected');
        });
        
        ws.on('error', (error) => {
            log.verbose(`WebSocket error: ${error.message}`);
            devState.clients.delete(ws);
        });
    });
    
    devState.wsServer.on('error', (error) => {
        log.warning(`WebSocket server error: ${error.message}`);
    });
}

/**
 * Setup file watchers
 */
function setupFileWatchers() {
    log.verbose('Setting up file watchers...');
    
    const watchPaths = [
        'js/**/*.js',
        'css/**/*.css',
        'components/**/*.html',
        'index.html',
        'manifest.json'
    ];
    
    const watcher = watch(watchPaths, {
        cwd: projectRoot,
        ignored: [
            'node_modules/**',
            'dist/**',
            '.git/**',
            '**/*.log'
        ],
        persistent: true,
        ignoreInitial: true
    });
    
    // File change handlers
    watcher.on('change', (path) => {
        log.dev(`File changed: ${path}`);
        handleFileChange(path, 'change');
    });
    
    watcher.on('add', (path) => {
        log.dev(`File added: ${path}`);
        handleFileChange(path, 'add');
    });
    
    watcher.on('unlink', (path) => {
        log.dev(`File removed: ${path}`);
        handleFileChange(path, 'unlink');
    });
    
    watcher.on('error', (error) => {
        log.error(`File watcher error: ${error.message}`);
    });
    
    devState.watchers.push(watcher);
    log.verbose('✓ File watchers configured');
}

/**
 * Handle file changes
 */
async function handleFileChange(filePath, changeType) {
    // Debounce rapid changes
    const now = Date.now();
    if (now - devState.lastBuildTime < 100) {
        return;
    }
    devState.lastBuildTime = now;
    
    // Skip if already building
    if (devState.isBuilding) {
        log.verbose('Build in progress, skipping change');
        return;
    }
    
    try {
        devState.isBuilding = true;
        
        // Determine rebuild strategy based on file type
        const ext = extname(filePath);
        let shouldFullRebuild = true;
        
        if (ext === '.css') {
            // CSS changes can be hot-reloaded
            shouldFullRebuild = false;
            await handleCSSChange(filePath);
        } else if (ext === '.html' && filePath.startsWith('components/')) {
            // Component changes need rebuild
            await triggerRebuild('Component change');
        } else if (ext === '.js') {
            // JavaScript changes need rebuild
            await triggerRebuild('JavaScript change');
        } else {
            // Other files trigger full rebuild
            await triggerRebuild('File change');
        }
        
    } catch (error) {
        log.error(`Error handling file change: ${error.message}`);
    } finally {
        devState.isBuilding = false;
    }
}

/**
 * Handle CSS changes with hot reload
 */
async function handleCSSChange(filePath) {
    log.verbose(`Hot-reloading CSS: ${filePath}`);
    
    // For now, trigger full reload
    // In a more advanced setup, we could inject only the changed CSS
    broadcastToClients({ type: 'reload', reason: 'CSS change' });
}

/**
 * Trigger full rebuild
 */
async function triggerRebuild(reason) {
    log.dev(`Rebuilding: ${reason}`);
    
    try {
        // Kill existing build process
        if (devState.buildProcess) {
            devState.buildProcess.kill();
        }
        
        // Start new build
        await runBuild();
        
        // Notify clients
        broadcastToClients({ type: 'reload', reason });
        
        log.success('Rebuild completed');
        
    } catch (error) {
        log.error(`Rebuild failed: ${error.message}`);
        broadcastToClients({ type: 'error', message: error.message });
    }
}

/**
 * Run initial build
 */
async function runInitialBuild() {
    log.dev('Running initial build...');
    
    try {
        await runBuild();
        log.success('Initial build completed');
    } catch (error) {
        log.warning(`Initial build failed: ${error.message}`);
    }
}

/**
 * Run Rollup build in watch mode
 */
async function runBuild() {
    return new Promise((resolve, reject) => {
        const configPath = join(projectRoot, 'build/rollup.config.js');
        
        devState.buildProcess = spawn('npx', ['rollup', '--config', configPath, '--watch'], {
            cwd: projectRoot,
            env: {
                ...process.env,
                NODE_ENV: 'development',
                ROLLUP_WATCH: 'true'
            },
            stdio: DEV_CONFIG.verbose ? 'inherit' : 'pipe'
        });
        
        let buildOutput = '';
        
        if (!DEV_CONFIG.verbose) {
            devState.buildProcess.stdout?.on('data', (data) => {
                buildOutput += data.toString();
            });
            
            devState.buildProcess.stderr?.on('data', (data) => {
                buildOutput += data.toString();
            });
        }
        
        devState.buildProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Build failed with exit code ${code}\n${buildOutput}`));
            }
        });
        
        devState.buildProcess.on('error', (error) => {
            reject(error);
        });
        
        // Resolve after a short delay to allow build to start
        setTimeout(resolve, 1000);
    });
}

/**
 * Broadcast message to all connected clients
 */
function broadcastToClients(message) {
    const messageStr = JSON.stringify(message);
    
    devState.clients.forEach((client) => {
        try {
            if (client.readyState === 1) { // WebSocket.OPEN
                client.send(messageStr);
            }
        } catch (error) {
            log.verbose(`Failed to send message to client: ${error.message}`);
            devState.clients.delete(client);
        }
    });
    
    log.verbose(`Broadcasted to ${devState.clients.size} clients: ${message.type}`);
}

/**
 * Send development status
 */
function sendDevStatus(res) {
    const status = {
        server: 'running',
        build: devState.isBuilding ? 'building' : 'ready',
        clients: devState.clients.size,
        lastBuild: devState.lastBuildTime,
        config: DEV_CONFIG
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(status, null, 2));
}

/**
 * Handle manual reload request
 */
function handleDevReload(res) {
    log.dev('Manual reload requested');
    broadcastToClients({ type: 'reload', reason: 'Manual reload' });
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Reload triggered' }));
}

/**
 * Send error response
 */
function sendErrorResponse(res, statusCode, message) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/plain');
    res.end(message);
}

/**
 * Open browser
 */
function openBrowser() {
    const url = `http://${DEV_CONFIG.host}:${DEV_CONFIG.port}`;
    
    setTimeout(() => {
        const commands = {
            darwin: 'open',
            win32: 'start',
            linux: 'xdg-open'
        };
        
        const command = commands[process.platform];
        if (command) {
            spawn(command, [url], { stdio: 'ignore' }).unref();
            log.info(`Opening browser: ${url}`);
        }
    }, 1000);
}

/**
 * Setup graceful shutdown
 */
function setupGracefulShutdown() {
    const shutdown = async (signal) => {
        log.dev(`Received ${signal}, shutting down gracefully...`);
        
        // Close WebSocket server
        if (devState.wsServer) {
            devState.wsServer.close();
        }
        
        // Close HTTP server
        if (devState.server) {
            devState.server.close();
        }
        
        // Stop file watchers
        devState.watchers.forEach(watcher => watcher.close());
        
        // Kill build process
        if (devState.buildProcess) {
            devState.buildProcess.kill();
        }
        
        log.success('Development server stopped');
        process.exit(0);
    };
    
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// Start development server if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    startDevServer().catch(error => {
        log.error(`Development server failed to start: ${error.message}`);
        process.exit(1);
    });
}

export { startDevServer };

