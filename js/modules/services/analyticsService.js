






/**
 * Purpose: Analytics and user behavior tracking service for LingoQuest
 * Key features: Event tracking, performance monitoring, user journey analysis, privacy-compliant data collection
 * Dependencies: EventManager, StorageManager, privacy settings, analytics endpoints
 * Related helpers: Data aggregation, metrics calculation, privacy controls, data export
 * Function names: trackEvent, trackPageView, trackGameSession, analyzeUserBehavior, generateReport
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:35 | File: js/modules/services/analyticsService.js
 */

export class AnalyticsService {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.isEnabled = false;
        this.isInitialized = false;
        this.sessionId = null;
        this.userId = null;
        this.events = [];
        this.batchSize = 50;
        this.flushInterval = 30000; // 30 seconds
        this.flushTimer = null;
        this.privacySettings = {};
        this.analyticsEndpoint = null;
        
        // Performance tracking
        this.performanceMetrics = {
            pageLoadTime: 0,
            gameLoadTime: 0,
            averageResponseTime: 0,
            errorCount: 0,
            sessionDuration: 0
        };
        
        // User behavior tracking
        this.userBehavior = {
            gamesSessions: 0,
            totalPlayTime: 0,
            averageScore: 0,
            preferredGameMode: null,
            streakRecord: 0
        };
    }
    
    async init() {
        console.log('📊 AnalyticsService initializing...');
        
        try {
            // Load privacy settings
            await this.loadPrivacySettings();
            
            // Check if analytics is enabled
            if (!this.privacySettings.analyticsEnabled) {
                console.log('📊 Analytics disabled by user preference');
                return;
            }
            
            // Generate session ID
            this.sessionId = this.generateSessionId();
            
            // Load or generate user ID (anonymous)
            this.userId = this.getOrCreateUserId();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Start flush timer
            this.startFlushTimer();
            
            // Track session start
            this.trackEvent('session_start', {
                sessionId: this.sessionId,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            
            this.isEnabled = true;
            this.isInitialized = true;
            
            console.log('✅ AnalyticsService initialized');
            
        } catch (error) {
            console.error('❌ AnalyticsService initialization failed:', error);
        }
    }
    
    async loadPrivacySettings() {
        this.privacySettings = this.storageManager.getItem('privacy_settings') || {
            analyticsEnabled: false,
            shareAnonymousData: false,
            sharePerformanceData: false,
            shareErrorData: true // Errors help improve the app
        };
    }
    
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    getOrCreateUserId() {
        let userId = this.storageManager.getItem('analytics_user_id');
        
        if (!userId) {
            // Generate anonymous user ID
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            this.storageManager.setItem('analytics_user_id', userId);
        }
        
        return userId;
    }
    
    setupEventListeners() {
        // Game events
        this.eventManager.on('game:start', (data) => {
            this.trackGameStart(data);
        });
        
        this.eventManager.on('game:end', (data) => {
            this.trackGameEnd(data);
        });
        
        this.eventManager.on('game:answer', (data) => {
            this.trackGameAnswer(data);
        });
        
        // UI events
        this.eventManager.on('screen:change', (data) => {
            this.trackPageView(data.screenId);
        });
        
        this.eventManager.on('button:click', (data) => {
            this.trackUserInteraction('button_click', data);
        });
        
        // Performance events
        this.eventManager.on('performance:metric', (data) => {
            this.trackPerformanceMetric(data);
        });
        
        // Error events
        this.eventManager.on('error:occurred', (data) => {
            this.trackError(data);
        });
        
        // Settings events
        this.eventManager.on('settings:changed', (data) => {
            this.trackSettingsChange(data);
        });
    }
    
    // Core tracking methods
    trackEvent(eventName, eventData = {}) {
        if (!this.isEnabled) return;
        
        const event = {
            id: this.generateEventId(),
            name: eventName,
            sessionId: this.sessionId,
            userId: this.userId,
            timestamp: Date.now(),
            url: window.location.href,
            data: this.sanitizeEventData(eventData)
        };
        
        this.events.push(event);
        
        // Flush if batch is full
        if (this.events.length >= this.batchSize) {
            this.flushEvents();
        }
        
        console.debug('📊 Event tracked:', eventName, eventData);
    }
    
    trackPageView(pageId) {
        this.trackEvent('page_view', {
            pageId,
            referrer: document.referrer,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }
    
    trackGameStart(gameData) {
        this.trackEvent('game_start', {
            gameMode: gameData.gameMode,
            difficulty: gameData.difficulty,
            questionCount: gameData.questionCount || 20
        });
        
        // Update user behavior
        this.userBehavior.gamesSessions++;
        this.saveUserBehavior();
    }
    
    trackGameEnd(gameData) {
        const gameEndData = {
            gameMode: gameData.gameMode,
            difficulty: gameData.difficulty,
            score: gameData.score,
            accuracy: gameData.accuracy,
            timeTaken: gameData.timeTaken,
            questionsAnswered: gameData.questionsAnswered
        };
        
        this.trackEvent('game_end', gameEndData);
        
        // Update user behavior metrics
        this.updateUserBehaviorMetrics(gameData);
    }
    
    trackGameAnswer(answerData) {
        this.trackEvent('game_answer', {
            questionId: answerData.questionId,
            isCorrect: answerData.isCorrect,
            timeToAnswer: answerData.timeToAnswer,
            selectedAnswer: answerData.selectedAnswer,
            correctAnswer: answerData.correctAnswer
        });
    }
    
    trackUserInteraction(interactionType, interactionData) {
        this.trackEvent('user_interaction', {
            type: interactionType,
            element: interactionData.element,
            location: interactionData.location,
            value: interactionData.value
        });
    }
    
    trackPerformanceMetric(metricData) {
        if (!this.privacySettings.sharePerformanceData) return;
        
        this.trackEvent('performance_metric', {
            metric: metricData.metric,
            value: metricData.value,
            context: metricData.context
        });
        
        // Update internal performance metrics
        this.updatePerformanceMetrics(metricData);
    }
    
    trackError(errorData) {
        if (!this.privacySettings.shareErrorData) return;
        
        this.trackEvent('error_occurred', {
            errorType: errorData.type,
            errorMessage: errorData.message,
            stackTrace: errorData.stack,
            context: errorData.context,
            userAgent: navigator.userAgent
        });
        
        this.performanceMetrics.errorCount++;
    }
    
    trackSettingsChange(settingsData) {
        this.trackEvent('settings_change', {
            setting: settingsData.setting,
            oldValue: settingsData.oldValue,
            newValue: settingsData.newValue,
            context: settingsData.context
        });
    }
    
    // Data processing and analysis
    updateUserBehaviorMetrics(gameData) {
        // Update average score
        const currentAverage = this.userBehavior.averageScore;
        const sessionCount = this.userBehavior.gamesSessions;
        this.userBehavior.averageScore = ((currentAverage * (sessionCount - 1)) + gameData.score) / sessionCount;
        
        // Update preferred game mode
        this.updatePreferredGameMode(gameData.gameMode);
        
        // Update streak record
        if (gameData.maxStreak > this.userBehavior.streakRecord) {
            this.userBehavior.streakRecord = gameData.maxStreak;
        }
        
        // Update total play time
        this.userBehavior.totalPlayTime += gameData.timeTaken;
        
        this.saveUserBehavior();
    }
    
    updatePreferredGameMode(gameMode) {
        const gameModeStats = this.storageManager.getItem('game_mode_stats') || {};
        gameModeStats[gameMode] = (gameModeStats[gameMode] || 0) + 1;
        
        // Find most played mode
        let maxCount = 0;
        let preferredMode = null;
        
        Object.entries(gameModeStats).forEach(([mode, count]) => {
            if (count > maxCount) {
                maxCount = count;
                preferredMode = mode;
            }
        });
        
        this.userBehavior.preferredGameMode = preferredMode;
        this.storageManager.setItem('game_mode_stats', gameModeStats);
    }
    
    updatePerformanceMetrics(metricData) {
        switch (metricData.metric) {
            case 'page_load_time':
                this.performanceMetrics.pageLoadTime = metricData.value;
                break;
            case 'game_load_time':
                this.performanceMetrics.gameLoadTime = metricData.value;
                break;
            case 'response_time':
                // Calculate rolling average
                const currentAvg = this.performanceMetrics.averageResponseTime;
                this.performanceMetrics.averageResponseTime = currentAvg === 0 ? 
                    metricData.value : (currentAvg + metricData.value) / 2;
                break;
        }
    }
    
    // Data management
    sanitizeEventData(data) {
        // Remove or hash sensitive data
        const sanitized = { ...data };
        
        // Remove personal information
        delete sanitized.email;
        delete sanitized.username;
        delete sanitized.ipAddress;
        
        // Hash any remaining sensitive fields
        if (sanitized.userId) {
            sanitized.userId = this.hashValue(sanitized.userId);
        }
        
        return sanitized;
    }
    
    hashValue(value) {
        // Simple hash function - in production use crypto API
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            const char = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }
    
    generateEventId() {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Data persistence and transmission
    startFlushTimer() {
        this.flushTimer = setInterval(() => {
            this.flushEvents();
        }, this.flushInterval);
    }
    
    async flushEvents() {
        if (this.events.length === 0) return;
        
        const eventsToFlush = [...this.events];
        this.events = [];
        
        try {
            // Save to local storage as backup
            this.saveEventsToLocal(eventsToFlush);
            
            // Send to analytics endpoint if configured
            if (this.analyticsEndpoint) {
                await this.sendEventsToEndpoint(eventsToFlush);
            }
            
            console.debug(`📊 Flushed ${eventsToFlush.length} events`);
            
        } catch (error) {
            console.error('❌ Failed to flush events:', error);
            // Put events back in queue for retry
            this.events.unshift(...eventsToFlush);
        }
    }
    
    saveEventsToLocal(events) {
        const existingEvents = this.storageManager.getItem('analytics_events') || [];
        const updatedEvents = [...existingEvents, ...events];
        
        // Keep only last 1000 events to prevent storage overflow
        if (updatedEvents.length > 1000) {
            updatedEvents.splice(0, updatedEvents.length - 1000);
        }
        
        this.storageManager.setItem('analytics_events', updatedEvents);
    }
    
    async sendEventsToEndpoint(events) {
        if (!this.analyticsEndpoint) return;
        
        const payload = {
            events,
            sessionId: this.sessionId,
            userId: this.userId,
            timestamp: Date.now()
        };
        
        const response = await fetch(this.analyticsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Analytics endpoint responded with ${response.status}`);
        }
    }
    
    saveUserBehavior() {
        this.storageManager.setItem('user_behavior', this.userBehavior);
    }
    
    // Analytics reporting
    generateUserReport() {
        return {
            userId: this.userId,
            sessionCount: this.userBehavior.gamesSessions,
            totalPlayTime: this.userBehavior.totalPlayTime,
            averageScore: Math.round(this.userBehavior.averageScore),
            preferredGameMode: this.userBehavior.preferredGameMode,
            streakRecord: this.userBehavior.streakRecord,
            performanceMetrics: { ...this.performanceMetrics },
            generatedAt: Date.now()
        };
    }
    
    generateSessionReport() {
        const sessionEvents = this.events.filter(event => 
            event.sessionId === this.sessionId
        );
        
        return {
            sessionId: this.sessionId,
            startTime: sessionEvents.length > 0 ? sessionEvents[0].timestamp : Date.now(),
            endTime: Date.now(),
            eventCount: sessionEvents.length,
            events: sessionEvents,
            duration: this.getSessionDuration()
        };
    }
    
    getSessionDuration() {
        const sessionEvents = this.events.filter(event => 
            event.sessionId === this.sessionId
        );
        
        if (sessionEvents.length === 0) return 0;
        
        const startTime = sessionEvents[0].timestamp;
        const endTime = Date.now();
        return endTime - startTime;
    }
    
    // Privacy controls
    updatePrivacySettings(newSettings) {
        this.privacySettings = { ...this.privacySettings, ...newSettings };
        this.storageManager.setItem('privacy_settings', this.privacySettings);
        
        // Disable/enable analytics based on new settings
        this.isEnabled = this.privacySettings.analyticsEnabled;
        
        this.trackEvent('privacy_settings_updated', {
            settings: Object.keys(newSettings),
            analyticsEnabled: this.privacySettings.analyticsEnabled
        });
    }
    
    exportUserData() {
        return {
            userData: this.generateUserReport(),
            events: this.storageManager.getItem('analytics_events') || [],
            settings: this.privacySettings,
            exportedAt: new Date().toISOString()
        };
    }
    
    deleteUserData() {
        // Clear all stored analytics data
        this.storageManager.removeItem('analytics_events');
        this.storageManager.removeItem('user_behavior');
        this.storageManager.removeItem('analytics_user_id');
        this.storageManager.removeItem('game_mode_stats');
        
        // Clear current session data
        this.events = [];
        this.userBehavior = {
            gamesSessions: 0,
            totalPlayTime: 0,
            averageScore: 0,
            preferredGameMode: null,
            streakRecord: 0
        };
        
        // Generate new user ID
        this.userId = this.getOrCreateUserId();
        
        this.trackEvent('user_data_deleted', {
            reason: 'user_request',
            newUserId: this.userId
        });
        
        console.log('🗑️ User analytics data deleted');
    }
    
    // Configuration
    setAnalyticsEndpoint(endpoint) {
        this.analyticsEndpoint = endpoint;
        console.log('📊 Analytics endpoint configured:', endpoint);
    }
    
    setBatchSize(size) {
        this.batchSize = Math.max(1, Math.min(size, 100)); // Between 1 and 100
    }
    
    setFlushInterval(interval) {
        this.flushInterval = Math.max(5000, interval); // Minimum 5 seconds
        
        // Restart timer with new interval
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.startFlushTimer();
        }
    }
    
    // Utility methods
    isAnalyticsEnabled() {
        return this.isEnabled && this.privacySettings.analyticsEnabled;
    }
    
    getAnalyticsStats() {
        return {
            isEnabled: this.isEnabled,
            sessionId: this.sessionId,
            eventCount: this.events.length,
            userBehavior: { ...this.userBehavior },
            performanceMetrics: { ...this.performanceMetrics },
            privacySettings: { ...this.privacySettings }
        };
    }
    
    async destroy() {
        console.log('🗑️ AnalyticsService destroying...');
        
        // Flush remaining events
        await this.flushEvents();
        
        // Clear timer
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
        
        // Track session end
        this.trackEvent('session_end', {
            sessionDuration: this.getSessionDuration(),
            eventCount: this.events.length
        });
        
        // Final flush
        await this.flushEvents();
        
        // Reset state
        this.isEnabled = false;
        this.isInitialized = false;
        this.events = [];
        
        console.log('✅ AnalyticsService destroyed');
    }
}

export default AnalyticsService;




