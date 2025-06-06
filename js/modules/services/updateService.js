



/**
 * Purpose: App update management and version control for PWA updates
 * Key features: Update detection, service worker updates, user notifications, version management
 * Dependencies: Service worker API, cache management, notification system
 * Related helpers: Version comparison, update prompts, cache invalidation, reload management
 * Function names: checkForUpdates, promptUpdate, applyUpdate, manageVersions, notifyUser
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:25 | File: js/modules/services/updateService.js
 */

export class UpdateService {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.currentVersion = '1.0.0';
        this.updateCheckInterval = 30 * 60 * 1000; // 30 minutes
        this.updateCheckTimer = null;
        this.serviceWorkerRegistration = null;
        this.pendingUpdate = null;
        this.isUpdateAvailable = false;
        this.lastUpdateCheck = null;
        this.updatePromptShown = false;
        
        this.initializeUpdateDetection();
    }
    
    async init() {
        console.log('🔄 UpdateService initializing...');
        
        try {
            // Get current app version
            await this.getCurrentVersion();
            
            // Setup service worker update detection
            await this.setupServiceWorkerUpdates();
            
            // Start periodic update checks
            this.startPeriodicChecks();
            
            // Check for immediate updates
            setTimeout(() => this.checkForUpdates(), 5000);
            
            console.log('✅ UpdateService initialized');
            
        } catch (error) {
            console.error('❌ UpdateService initialization failed:', error);
        }
    }
    
    async getCurrentVersion() {
        try {
            // Try to get version from package info or manifest
            const response = await fetch('/manifest.json');
            if (response.ok) {
                const manifest = await response.json();
                this.currentVersion = manifest.version || this.currentVersion;
            }
            
            // Store current version
            this.storageManager.setItem('app_version', this.currentVersion);
            console.log(`📱 Current app version: ${this.currentVersion}`);
            
        } catch (error) {
            console.warn('⚠️ Could not determine current version:', error);
        }
    }
    
    async setupServiceWorkerUpdates() {
        if (!('serviceWorker' in navigator)) {
            console.log('ℹ️ Service Worker not supported');
            return;
        }
        
        try {
            // Get existing registration
            this.serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
            
            if (this.serviceWorkerRegistration) {
                // Listen for updates
                this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                    this.handleServiceWorkerUpdate();
                });
                
                // Check if there's already a waiting service worker
                if (this.serviceWorkerRegistration.waiting) {
                    this.handleNewServiceWorker(this.serviceWorkerRegistration.waiting);
                }
                
                console.log('🔄 Service Worker update detection setup');
            }
            
        } catch (error) {
            console.warn('⚠️ Service Worker update setup failed:', error);
        }
    }
    
    handleServiceWorkerUpdate() {
        console.log('🔄 New Service Worker detected');
        
        const newWorker = this.serviceWorkerRegistration.installing;
        if (newWorker) {
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    this.handleNewServiceWorker(newWorker);
                }
            });
        }
    }
    
    handleNewServiceWorker(worker) {
        console.log('✨ New Service Worker ready');
        
        this.pendingUpdate = worker;
        this.isUpdateAvailable = true;
        
        // Emit update available event
        this.eventManager.emit('update:available', {
            version: this.currentVersion,
            worker: worker
        });
        
        // Show update prompt if not already shown
        if (!this.updatePromptShown) {
            this.showUpdatePrompt();
        }
    }
    
    startPeriodicChecks() {
        // Clear existing timer
        if (this.updateCheckTimer) {
            clearInterval(this.updateCheckTimer);
        }
        
        // Start new timer
        this.updateCheckTimer = setInterval(() => {
            this.checkForUpdates();
        }, this.updateCheckInterval);
        
        console.log(`⏰ Update checks scheduled every ${this.updateCheckInterval / 60000} minutes`);
    }
    
    async checkForUpdates() {
        console.log('🔍 Checking for updates...');
        this.lastUpdateCheck = Date.now();
        
        try {
            // Method 1: Check service worker updates
            await this.checkServiceWorkerUpdate();
            
            // Method 2: Check version endpoint (if available)
            await this.checkVersionEndpoint();
            
            // Method 3: Check manifest changes
            await this.checkManifestChanges();
            
            console.log('✅ Update check completed');
            
        } catch (error) {
            console.warn('⚠️ Update check failed:', error);
        }
    }
    
    async checkServiceWorkerUpdate() {
        if (!this.serviceWorkerRegistration) return;
        
        try {
            // Force service worker update check
            await this.serviceWorkerRegistration.update();
            console.log('🔄 Service Worker update check completed');
            
        } catch (error) {
            console.warn('⚠️ Service Worker update check failed:', error);
        }
    }
    
    async checkVersionEndpoint() {
        try {
            // Check if there's a version endpoint
            const response = await fetch('/api/version', {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (response.ok) {
                const versionInfo = await response.json();
                const latestVersion = versionInfo.version;
                
                if (this.isNewerVersion(latestVersion, this.currentVersion)) {
                    console.log(`🆕 New version available: ${latestVersion}`);
                    this.handleVersionUpdate(latestVersion);
                }
            }
            
        } catch (error) {
            // Version endpoint not available - this is normal for static PWAs
            console.debug('ℹ️ Version endpoint not available');
        }
    }
    
    async checkManifestChanges() {
        try {
            const response = await fetch('/manifest.json?' + Date.now(), {
                cache: 'no-cache'
            });
            
            if (response.ok) {
                const manifest = await response.json();
                const manifestVersion = manifest.version;
                
                if (manifestVersion && this.isNewerVersion(manifestVersion, this.currentVersion)) {
                    console.log(`🆕 New manifest version: ${manifestVersion}`);
                    this.handleVersionUpdate(manifestVersion);
                }
            }
            
        } catch (error) {
            console.warn('⚠️ Manifest check failed:', error);
        }
    }
    
    isNewerVersion(newVersion, currentVersion) {
        // Simple semantic version comparison
        const parseVersion = (version) => version.split('.').map(Number);
        
        const newParts = parseVersion(newVersion);
        const currentParts = parseVersion(currentVersion);
        
        for (let i = 0; i < Math.max(newParts.length, currentParts.length); i++) {
            const newPart = newParts[i] || 0;
            const currentPart = currentParts[i] || 0;
            
            if (newPart > currentPart) return true;
            if (newPart < currentPart) return false;
        }
        
        return false;
    }
    
    handleVersionUpdate(newVersion) {
        console.log(`🔄 Handling version update: ${this.currentVersion} → ${newVersion}`);
        
        this.isUpdateAvailable = true;
        
        // Emit version update event
        this.eventManager.emit('update:versionAvailable', {
            currentVersion: this.currentVersion,
            newVersion: newVersion
        });
        
        // Show update prompt
        if (!this.updatePromptShown) {
            this.showUpdatePrompt(newVersion);
        }
    }
    
    showUpdatePrompt(newVersion = null) {
        console.log('💬 Showing update prompt');
        this.updatePromptShown = true;
        
        const updateData = {
            currentVersion: this.currentVersion,
            newVersion: newVersion,
            hasServiceWorkerUpdate: !!this.pendingUpdate,
            timestamp: Date.now()
        };
        
        // Emit event for UI to show prompt
        this.eventManager.emit('update:promptShow', updateData);
        
        // Create and show update notification
        this.createUpdateNotification(updateData);
    }
    
    createUpdateNotification(updateData) {
        // Create update notification element
        const notification = document.createElement('div');
        notification.id = 'update-notification';
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <div class="update-icon">🔄</div>
                <div class="update-text">
                    <h3>Update Available</h3>
                    <p>A new version of LingoQuest is ready to install.</p>
                    ${updateData.newVersion ? `<small>Version ${updateData.newVersion}</small>` : ''}
                </div>
                <div class="update-actions">
                    <button id="update-install" class="btn btn-primary">
                        Update Now
                    </button>
                    <button id="update-later" class="btn btn-secondary">
                        Later
                    </button>
                </div>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            padding: 16px;
            font-family: system-ui, sans-serif;
        `;
        
        // Add event listeners
        notification.querySelector('#update-install').addEventListener('click', () => {
            this.applyUpdate();
            notification.remove();
        });
        
        notification.querySelector('#update-later').addEventListener('click', () => {
            this.postponeUpdate();
            notification.remove();
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 30000);
    }
    
    async applyUpdate() {
        console.log('⬇️ Applying update...');
        
        try {
            // Show loading state
            this.eventManager.emit('update:installing');
            
            // If there's a pending service worker, activate it
            if (this.pendingUpdate) {
                this.pendingUpdate.postMessage({ action: 'skipWaiting' });
                
                // Wait for the new service worker to take control
                await new Promise((resolve) => {
                    navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
                });
            }
            
            // Clear caches
            await this.clearAppCaches();
            
            // Update stored version
            this.storageManager.setItem('app_version', this.currentVersion);
            
            // Emit update completed event
            this.eventManager.emit('update:completed');
            
            // Reload the page to apply updates
            this.reloadApp();
            
        } catch (error) {
            console.error('❌ Update application failed:', error);
            this.eventManager.emit('update:failed', error);
        }
    }
    
    async clearAppCaches() {
        try {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
                console.log('🗑️ App caches cleared');
            }
        } catch (error) {
            console.warn('⚠️ Cache clearing failed:', error);
        }
    }
    
    reloadApp() {
        console.log('🔄 Reloading application...');
        
        // Notify user before reload
        this.eventManager.emit('update:reloading');
        
        // Reload after short delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    postponeUpdate() {
        console.log('⏰ Update postponed');
        this.updatePromptShown = false;
        
        // Emit postponed event
        this.eventManager.emit('update:postponed');
        
        // Show reminder later (in 1 hour)
        setTimeout(() => {
            if (this.isUpdateAvailable) {
                this.showUpdatePrompt();
            }
        }, 60 * 60 * 1000);
    }
    
    // Public methods
    getUpdateStatus() {
        return {
            isUpdateAvailable: this.isUpdateAvailable,
            currentVersion: this.currentVersion,
            lastUpdateCheck: this.lastUpdateCheck,
            hasServiceWorkerUpdate: !!this.pendingUpdate,
            updatePromptShown: this.updatePromptShown
        };
    }
    
    async forceUpdateCheck() {
        console.log('🔍 Force checking for updates...');
        await this.checkForUpdates();
        return this.getUpdateStatus();
    }
    
    async skipWaiting() {
        if (this.pendingUpdate) {
            this.pendingUpdate.postMessage({ action: 'skipWaiting' });
            return true;
        }
        return false;
    }
    
    setUpdateCheckInterval(minutes) {
        this.updateCheckInterval = minutes * 60 * 1000;
        this.startPeriodicChecks();
        console.log(`⏰ Update check interval set to ${minutes} minutes`);
    }
    
    // Event handlers for external triggers
    onUpdateAvailable(callback) {
        this.eventManager.on('update:available', callback);
    }
    
    onUpdateCompleted(callback) {
        this.eventManager.on('update:completed', callback);
    }
    
    onUpdateFailed(callback) {
        this.eventManager.on('update:failed', callback);
    }
    
    // Utility methods
    getVersionHistory() {
        return this.storageManager.getItem('version_history') || [];
    }
    
    addToVersionHistory(version) {
        const history = this.getVersionHistory();
        history.unshift({
            version,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        });
        
        // Keep only last 10 versions
        if (history.length > 10) {
            history.splice(10);
        }
        
        this.storageManager.setItem('version_history', history);
    }
    
    async destroy() {
        console.log('🗑️ UpdateService destroying...');
        
        // Clear update check timer
        if (this.updateCheckTimer) {
            clearInterval(this.updateCheckTimer);
            this.updateCheckTimer = null;
        }
        
        // Remove update notification if present
        const notification = document.getElementById('update-notification');
        if (notification) {
            notification.remove();
        }
        
        // Reset state
        this.isUpdateAvailable = false;
        this.pendingUpdate = null;
        this.updatePromptShown = false;
        
        console.log('✅ UpdateService destroyed');
    }
}

// Utility functions for update management
export const updateUtils = {
    // Parse semantic version
    parseVersion(version) {
        const parts = version.split('.').map(Number);
        return {
            major: parts[0] || 0,
            minor: parts[1] || 0,
            patch: parts[2] || 0,
            raw: version
        };
    },
    
    // Compare two versions
    compareVersions(version1, version2) {
        const v1 = this.parseVersion(version1);
        const v2 = this.parseVersion(version2);
        
        if (v1.major !== v2.major) return v1.major - v2.major;
        if (v1.minor !== v2.minor) return v1.minor - v2.minor;
        return v1.patch - v2.patch;
    },
    
    // Format version for display
    formatVersion(version) {
        return `v${version}`;
    },
    
    // Get update severity
    getUpdateSeverity(currentVersion, newVersion) {
        const current = this.parseVersion(currentVersion);
        const newer = this.parseVersion(newVersion);
        
        if (newer.major > current.major) return 'major';
        if (newer.minor > current.minor) return 'minor';
        if (newer.patch > current.patch) return 'patch';
        return 'none';
    }
};

export default UpdateService;



