



/**
 * Purpose: Social sharing service for LingoQuest results and achievements
 * Key features: Multi-platform sharing, score sharing, achievement sharing, custom share formats
 * Dependencies: Web Share API, clipboard API, social media APIs, image generation
 * Related helpers: Share text generation, image creation, URL encoding, platform detection
 * Function names: shareScore, shareAchievement, generateShareText, createShareImage, copyToClipboard
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:40 | File: js/modules/services/shareService.js
 */

export class ShareService {
    constructor(eventManager, storageManager) {
        this.eventManager = eventManager;
        this.storageManager = storageManager;
        this.isInitialized = false;
        this.shareCount = 0;
        this.shareHistory = [];
        this.shareTemplates = {};
        this.socialPlatforms = {};
        this.isWebShareSupported = false;
        this.shareBaseUrl = 'https://lingoquest.app';
        this.shareHashtags = ['#LingoQuest', '#WordGame', '#BrainTraining'];
        
        // Share content cache
        this.shareCache = new Map();
        this.imageBlobCache = new Map();
    }
    
    async init() {
        console.log('📤 ShareService initializing...');
        
        try {
            // Check Web Share API support
            this.isWebShareSupported = 'share' in navigator;
            
            // Initialize share templates
            this.initializeShareTemplates();
            
            // Initialize social platform configurations
            this.initializeSocialPlatforms();
            
            // Load share history
            this.loadShareHistory();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ ShareService initialized');
            
        } catch (error) {
            console.error('❌ ShareService initialization failed:', error);
        }
    }
    
    initializeShareTemplates() {
        this.shareTemplates = {
            gameScore: {
                title: 'LingoQuest Score',
                text: 'I just scored {score}% in LingoQuest {gameMode} mode! 🎯\n\nAccuracy: {accuracy}%\nStreak: {streak}\nTime: {time}\n\nCan you beat my score? 🏆',
                hashtags: this.shareHashtags
            },
            
            achievement: {
                title: 'LingoQuest Achievement',
                text: 'Achievement unlocked in LingoQuest! 🏆\n\n{achievementName}\n{achievementDescription}\n\nJoin me in this amazing word game! 🎮',
                hashtags: [...this.shareHashtags, '#Achievement']
            },
            
            streak: {
                title: 'LingoQuest Streak',
                text: 'New personal best in LingoQuest! 🔥\n\n{streak} correct answers in a row!\nGame Mode: {gameMode}\n\nThink you can do better? Challenge accepted! 💪',
                hashtags: [...this.shareHashtags, '#Streak']
            },
            
            milestone: {
                title: 'LingoQuest Milestone',
                text: 'Just reached {milestone} in LingoQuest! 🎉\n\nTotal games played: {gamesPlayed}\nAverage score: {averageScore}%\n\nThis word game is addictive! Try it yourself! 🎯',
                hashtags: [...this.shareHashtags, '#Milestone']
            },
            
            invite: {
                title: 'Try LingoQuest!',
                text: 'I\'m playing LingoQuest - an amazing word game! 🎮\n\nFeatures:\n🎯 Multiple game modes\n🧠 Brain training\n🌍 Multilingual support\n👴 Senior-friendly\n\nJoin me now!',
                hashtags: this.shareHashtags
            }
        };
    }
    
    initializeSocialPlatforms() {
        this.socialPlatforms = {
            twitter: {
                name: 'Twitter',
                icon: '🐦',
                url: 'https://twitter.com/intent/tweet',
                params: {
                    text: 'text',
                    url: 'url',
                    hashtags: 'hashtags'
                },
                characterLimit: 280
            },
            
            facebook: {
                name: 'Facebook',
                icon: '📘',
                url: 'https://www.facebook.com/sharer/sharer.php',
                params: {
                    u: 'url',
                    quote: 'text'
                },
                characterLimit: 63206
            },
            
            linkedin: {
                name: 'LinkedIn',
                icon: '💼',
                url: 'https://www.linkedin.com/sharing/share-offsite/',
                params: {
                    url: 'url',
                    title: 'title',
                    summary: 'text'
                },
                characterLimit: 1300
            },
            
            reddit: {
                name: 'Reddit',
                icon: '🔴',
                url: 'https://www.reddit.com/submit',
                params: {
                    url: 'url',
                    title: 'title'
                },
                characterLimit: 300
            },
            
            whatsapp: {
                name: 'WhatsApp',
                icon: '💬',
                url: 'https://wa.me/',
                params: {
                    text: 'text'
                },
                characterLimit: 65536
            },
            
            telegram: {
                name: 'Telegram',
                icon: '✈️',
                url: 'https://t.me/share/url',
                params: {
                    url: 'url',
                    text: 'text'
                },
                characterLimit: 4096
            }
        };
    }
    
    setupEventListeners() {
        // Game completion events
        this.eventManager.on('game:completed', (data) => {
            this.handleGameCompleted(data);
        });
        
        // Achievement events
        this.eventManager.on('achievement:unlocked', (data) => {
            this.handleAchievementUnlocked(data);
        });
        
        // Streak events
        this.eventManager.on('streak:record', (data) => {
            this.handleStreakRecord(data);
        });
        
        // Share button clicks
        this.eventManager.on('share:requested', (data) => {
            this.handleShareRequested(data);
        });
    }
    
    // Main sharing methods
    async shareGameScore(gameData, options = {}) {
        try {
            const shareContent = this.generateScoreShareContent(gameData);
            const shareData = await this.prepareShareData('gameScore', shareContent, options);
            
            return await this.executeShare(shareData, options);
            
        } catch (error) {
            console.error('❌ Failed to share game score:', error);
            throw error;
        }
    }
    
    async shareAchievement(achievementData, options = {}) {
        try {
            const shareContent = this.generateAchievementShareContent(achievementData);
            const shareData = await this.prepareShareData('achievement', shareContent, options);
            
            return await this.executeShare(shareData, options);
            
        } catch (error) {
            console.error('❌ Failed to share achievement:', error);
            throw error;
        }
    }
    
    async shareStreak(streakData, options = {}) {
        try {
            const shareContent = this.generateStreakShareContent(streakData);
            const shareData = await this.prepareShareData('streak', shareContent, options);
            
            return await this.executeShare(shareData, options);
            
        } catch (error) {
            console.error('❌ Failed to share streak:', error);
            throw error;
        }
    }
    
    async shareInvite(options = {}) {
        try {
            const shareContent = { gameUrl: this.shareBaseUrl };
            const shareData = await this.prepareShareData('invite', shareContent, options);
            
            return await this.executeShare(shareData, options);
            
        } catch (error) {
            console.error('❌ Failed to share invite:', error);
            throw error;
        }
    }
    
    // Share content generation
    generateScoreShareContent(gameData) {
        const { score, accuracy, streak, gameMode, timeTaken } = gameData;
        
        return {
            score: Math.round(score),
            accuracy: Math.round(accuracy),
            streak: streak || 0,
            gameMode: this.formatGameMode(gameMode),
            time: this.formatTime(timeTaken),
            gameUrl: `${this.shareBaseUrl}?utm_source=share&utm_medium=score`
        };
    }
    
    generateAchievementShareContent(achievementData) {
        const { name, description, icon, category } = achievementData;
        
        return {
            achievementName: `${icon} ${name}`,
            achievementDescription: description,
            category: category,
            gameUrl: `${this.shareBaseUrl}?utm_source=share&utm_medium=achievement`
        };
    }
    
    generateStreakShareContent(streakData) {
        const { streak, gameMode, difficulty } = streakData;
        
        return {
            streak: streak,
            gameMode: this.formatGameMode(gameMode),
            difficulty: difficulty,
            gameUrl: `${this.shareBaseUrl}?utm_source=share&utm_medium=streak`
        };
    }
    
    // Share data preparation
    async prepareShareData(templateType, content, options = {}) {
        const template = this.shareTemplates[templateType];
        if (!template) {
            throw new Error(`Unknown share template: ${templateType}`);
        }
        
        // Generate share text
        const shareText = this.interpolateTemplate(template.text, content);
        const shareTitle = this.interpolateTemplate(template.title, content);
        
        // Prepare base share data
        const shareData = {
            title: shareTitle,
            text: shareText,
            url: content.gameUrl || this.shareBaseUrl,
            hashtags: template.hashtags.join(' ')
        };
        
        // Generate share image if requested
        if (options.includeImage) {
            shareData.image = await this.generateShareImage(templateType, content);
        }
        
        // Cache the share content
        const cacheKey = `${templateType}_${Date.now()}`;
        this.shareCache.set(cacheKey, shareData);
        
        return shareData;
    }
    
    interpolateTemplate(template, data) {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });
    }
    
    // Share execution
    async executeShare(shareData, options = {}) {
        const shareMethod = options.method || 'auto';
        let shareResult = null;
        
        try {
            switch (shareMethod) {
                case 'native':
                    shareResult = await this.shareNative(shareData);
                    break;
                    
                case 'social':
                    shareResult = await this.shareToSocial(shareData, options.platform);
                    break;
                    
                case 'clipboard':
                    shareResult = await this.shareToClipboard(shareData);
                    break;
                    
                case 'auto':
                default:
                    shareResult = await this.shareAuto(shareData, options);
                    break;
            }
            
            // Track successful share
            this.trackShare(shareData, shareMethod, shareResult);
            
            return shareResult;
            
        } catch (error) {
            console.error('❌ Share execution failed:', error);
            throw error;
        }
    }
    
    async shareNative(shareData) {
        if (!this.isWebShareSupported) {
            throw new Error('Native sharing not supported');
        }
        
        const nativeShareData = {
            title: shareData.title,
            text: shareData.text,
            url: shareData.url
        };
        
        // Add image if available (for supported browsers)
        if (shareData.image && shareData.image instanceof File) {
            nativeShareData.files = [shareData.image];
        }
        
        await navigator.share(nativeShareData);
        return { method: 'native', success: true };
    }
    
    async shareToSocial(shareData, platform) {
        if (!platform || !this.socialPlatforms[platform]) {
            throw new Error(`Unsupported social platform: ${platform}`);
        }
        
        const platformConfig = this.socialPlatforms[platform];
        const shareUrl = this.buildSocialShareUrl(shareData, platformConfig);
        
        // Open share URL in new window
        const shareWindow = window.open(
            shareUrl,
            'share',
            'width=600,height=400,scrollbars=yes,resizable=yes'
        );
        
        return {
            method: 'social',
            platform: platform,
            url: shareUrl,
            success: !!shareWindow
        };
    }
    
    async shareToClipboard(shareData) {
        const shareText = this.formatShareText(shareData);
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(shareText);
            } else {
                // Fallback for older browsers
                await this.fallbackCopyToClipboard(shareText);
            }
            
            return {
                method: 'clipboard',
                text: shareText,
                success: true
            };
            
        } catch (error) {
            throw new Error('Failed to copy to clipboard');
        }
    }
    
    async shareAuto(shareData, options = {}) {
        // Try native sharing first if supported
        if (this.isWebShareSupported && !options.forceMethod) {
            try {
                return await this.shareNative(shareData);
            } catch (error) {
                console.warn('Native sharing failed, falling back to clipboard');
            }
        }
        
        // Fallback to clipboard
        return await this.shareToClipboard(shareData);
    }
    
    // URL building and formatting
    buildSocialShareUrl(shareData, platformConfig) {
        const baseUrl = platformConfig.url;
        const params = new URLSearchParams();
        
        // Map share data to platform parameters
        Object.entries(platformConfig.params).forEach(([paramKey, dataKey]) => {
            let value = '';
            
            switch (dataKey) {
                case 'text':
                    value = this.formatShareTextForPlatform(shareData, platformConfig);
                    break;
                case 'url':
                    value = shareData.url;
                    break;
                case 'title':
                    value = shareData.title;
                    break;
                case 'hashtags':
                    value = shareData.hashtags.replace(/#/g, '').replace(/\s+/g, ',');
                    break;
                default:
                    value = shareData[dataKey] || '';
            }
            
            if (value) {
                params.append(paramKey, value);
            }
        });
        
        return `${baseUrl}?${params.toString()}`;
    }
    
    formatShareTextForPlatform(shareData, platformConfig) {
        let text = shareData.text;
        
        // Add URL if not handled separately
        if (!platformConfig.params.url && !platformConfig.params.u) {
            text += `\n\n${shareData.url}`;
        }
        
        // Add hashtags if not handled separately
        if (!platformConfig.params.hashtags && shareData.hashtags) {
            text += `\n\n${shareData.hashtags}`;
        }
        
        // Trim to character limit
        if (platformConfig.characterLimit && text.length > platformConfig.characterLimit) {
            text = text.substring(0, platformConfig.characterLimit - 3) + '...';
        }
        
        return text;
    }
    
    formatShareText(shareData) {
        let text = shareData.text;
        
        if (shareData.url) {
            text += `\n\n${shareData.url}`;
        }
        
        if (shareData.hashtags) {
            text += `\n\n${shareData.hashtags}`;
        }
        
        return text;
    }
    
    // Image generation
    async generateShareImage(templateType, content) {
        const cacheKey = `${templateType}_${JSON.stringify(content)}`;
        
        if (this.imageBlobCache.has(cacheKey)) {
            return this.imageBlobCache.get(cacheKey);
        }
        
        try {
            const canvas = await this.createShareImageCanvas(templateType, content);
            const blob = await this.canvasToBlob(canvas);
            const file = new File([blob], 'lingoquest-share.png', { type: 'image/png' });
            
            this.imageBlobCache.set(cacheKey, file);
            return file;
            
        } catch (error) {
            console.error('❌ Failed to generate share image:', error);
            return null;
        }
    }
    
    async createShareImageCanvas(templateType, content) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        
        const ctx = canvas.getContext('2d');
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Logo/Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('LingoQuest', canvas.width / 2, 80);
        
        // Content based on template type
        switch (templateType) {
            case 'gameScore':
                await this.drawScoreImage(ctx, canvas, content);
                break;
            case 'achievement':
                await this.drawAchievementImage(ctx, canvas, content);
                break;
            case 'streak':
                await this.drawStreakImage(ctx, canvas, content);
                break;
            default:
                await this.drawGenericImage(ctx, canvas, content);
        }
        
        return canvas;
    }
    
    async drawScoreImage(ctx, canvas, content) {
        // Score
        ctx.fillStyle = '#ffed4e';
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${content.score}%`, canvas.width / 2, 200);
        
        // Game mode
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText(content.gameMode, canvas.width / 2, 240);
        
        // Stats
        ctx.font = '18px Arial';
        ctx.fillText(`Accuracy: ${content.accuracy}% | Streak: ${content.streak} | Time: ${content.time}`, 
                    canvas.width / 2, 280);
        
        // Call to action
        ctx.font = '20px Arial';
        ctx.fillText('Can you beat my score?', canvas.width / 2, 340);
    }
    
    async drawAchievementImage(ctx, canvas, content) {
        // Achievement icon/name
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(content.achievementName, canvas.width / 2, 180);
        
        // Description
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText(content.achievementDescription, canvas.width / 2, 220);
        
        // Call to action
        ctx.font = '18px Arial';
        ctx.fillText('Unlock your achievements too!', canvas.width / 2, 320);
    }
    
    async drawStreakImage(ctx, canvas, content) {
        // Streak number
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 84px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${content.streak}`, canvas.width / 2, 200);
        
        // Streak label
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('Correct Answers in a Row!', canvas.width / 2, 240);
        
        // Game mode
        ctx.font = '18px Arial';
        ctx.fillText(`${content.gameMode} Mode`, canvas.width / 2, 280);
        
        // Challenge
        ctx.font = '20px Arial';
        ctx.fillText('Think you can do better?', canvas.width / 2, 340);
    }
    
    async drawGenericImage(ctx, canvas, content) {
        // Generic LingoQuest promotion
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Amazing Word Game!', canvas.width / 2, 180);
        
        ctx.font = '18px Arial';
        ctx.fillText('🎯 Multiple Game Modes', canvas.width / 2, 220);
        ctx.fillText('🧠 Brain Training', canvas.width / 2, 250);
        ctx.fillText('🌍 Multilingual Support', canvas.width / 2, 280);
        
        ctx.font = '22px Arial';
        ctx.fillText('Play Now!', canvas.width / 2, 340);
    }
    
    canvasToBlob(canvas) {
        return new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/png');
        });
    }
    
    // Utility methods
    formatGameMode(gameMode) {
        const modes = {
            classic: 'Classic',
            hollybolly: 'HollyBolly',
            mixlingo: 'MixLingo'
        };
        return modes[gameMode] || gameMode;
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `${seconds}s`;
        }
    }
    
    async fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(textArea);
        }
    }
    
    // Event handlers
    handleGameCompleted(gameData) {
        // Auto-suggest sharing for high scores
        if (gameData.score >= 80 || gameData.streak >= 5) {
            this.eventManager.emit('share:suggestion', {
                type: 'gameScore',
                data: gameData,
                reason: 'high_score'
            });
        }
    }
    
    handleAchievementUnlocked(achievementData) {
        // Auto-suggest sharing for new achievements
        this.eventManager.emit('share:suggestion', {
            type: 'achievement',
            data: achievementData,
            reason: 'new_achievement'
        });
    }
    
    handleStreakRecord(streakData) {
        // Auto-suggest sharing for streak records
        if (streakData.streak >= 10) {
            this.eventManager.emit('share:suggestion', {
                type: 'streak',
                data: streakData,
                reason: 'streak_record'
            });
        }
    }
    
    handleShareRequested(shareData) {
        // Handle explicit share requests from UI
        this.executeShare(shareData.shareData, shareData.options);
    }
    
    // Analytics and tracking
    trackShare(shareData, method, result) {
        this.shareCount++;
        
        const shareRecord = {
            id: `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            method: method,
            platform: result.platform || 'unknown',
            success: result.success,
            type: shareData.title,
            content: shareData.text.substring(0, 100) // First 100 chars for reference
        };
        
        this.shareHistory.push(shareRecord);
        this.saveShareHistory();
        
        // Emit share event for analytics
        this.eventManager.emit('analytics:share', shareRecord);
        
        console.log('📤 Share tracked:', shareRecord);
    }
    
    loadShareHistory() {
        this.shareHistory = this.storageManager.getItem('share_history') || [];
        this.shareCount = this.shareHistory.length;
    }
    
    saveShareHistory() {
        // Keep only last 100 shares
        if (this.shareHistory.length > 100) {
            this.shareHistory = this.shareHistory.slice(-100);
        }
        
        this.storageManager.setItem('share_history', this.shareHistory);
    }
    
    // Configuration and management
    getShareStats() {
        return {
            totalShares: this.shareCount,
            recentShares: this.shareHistory.slice(-10),
            platformBreakdown: this.getPlatformBreakdown(),
            successRate: this.getSuccessRate()
        };
    }
    
    getPlatformBreakdown() {
        const breakdown = {};
        this.shareHistory.forEach(share => {
            breakdown[share.platform] = (breakdown[share.platform] || 0) + 1;
        });
        return breakdown;
    }
    
    getSuccessRate() {
        if (this.shareHistory.length === 0) return 0;
        
        const successfulShares = this.shareHistory.filter(share => share.success).length;
        return Math.round((successfulShares / this.shareHistory.length) * 100);
    }
    
    clearShareHistory() {
        this.shareHistory = [];
        this.shareCount = 0;
        this.storageManager.removeItem('share_history');
        console.log('🗑️ Share history cleared');
    }
    
    async destroy() {
        console.log('🗑️ ShareService destroying...');
        
        // Save current state
        this.saveShareHistory();
        
        // Clear caches
        this.shareCache.clear();
        this.imageBlobCache.clear();
        
        // Reset state
        this.isInitialized = false;
        
        console.log('✅ ShareService destroyed');
    }
}

export default ShareService;

