
class UIManager {
    constructor() {
        this.currentScreen = 'home-screen';
        this.loadingTips = [
            '💡 Tip: Think about the first letter when choosing your answer!',
            '🎯 Tip: Make sure the word fits the category perfectly!',
            '🔤 Tip: Check spelling carefully - every letter counts!',
            '🏆 Tip: Practice makes perfect in word games!',
            '⚡ Tip: Take your time to think before selecting!'
        ];
        this.currentTipIndex = 0;
    }

    async init() {
        this.setupLoadingTips();
        this.initializeScreens();
    }

    setupLoadingTips() {
        setInterval(() => {
            this.rotateLoadingTip();
        }, 2000);
    }

    rotateLoadingTip() {
        const tipElement = document.getElementById('loading-tip');
        if (tipElement) {
            this.currentTipIndex = (this.currentTipIndex + 1) % this.loadingTips.length;
            tipElement.textContent = this.loadingTips[this.currentTipIndex];
        }
    }

    initializeScreens() {
        // Hide all screens initially
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = document.getElementById('loading-text');
        if (overlay && text) {
            text.textContent = message;
            overlay.classList.add('active');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    updateLoadingProgress(percentage, message) {
        const progressFill = document.getElementById('loading-progress-fill');
        const progressText = document.getElementById('loading-percentage');
        const loadingText = document.getElementById('loading-text');

        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${percentage}%`;
        if (loadingText && message) loadingText.textContent = message;
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${this.getToastIcon(type)}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    showError(message) {
        this.showToast(message, 'error', 5000);
    }
}

export default UIManager;

