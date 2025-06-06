
class EventManager {
    constructor() {
        this.app = null;
    }

    setupEventListeners(app) {
        this.app = app;

        this.setupHomeScreenEvents();
        this.setupGameScreenEvents();
        this.setupSettingsScreenEvents();
        this.setupToolsScreenEvents();
        this.setupGlobalEvents();
    }

    setupHomeScreenEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-game-mode]')) {
                const tab = e.target.closest('[data-game-mode]');
                const gameMode = tab.dataset.gameMode;
                this.switchGameModeTab(gameMode);
            }

            if (e.target.closest('[data-action="start-game"]')) {
                const button = e.target.closest('[data-action="start-game"]');
                const mode = button.dataset.mode;
                const gameType = button.dataset.gameType;
                this.app.startGame(mode, gameType);
            }

            if (e.target.closest('#how-to-play-btn')) {
                this.app.getUIManager().showScreen('instructions-screen');
            }
        });
    }

    setupGameScreenEvents() {
        // Basic game events - will be expanded later
        document.addEventListener('click', (e) => {
            if (e.target.closest('#quit-game')) {
                if (confirm('Are you sure you want to quit?')) {
                    this.app.getUIManager().showScreen('home-screen');
                }
            }
        });
    }

    setupSettingsScreenEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#settings-btn')) {
                this.app.getUIManager().showScreen('settings-screen');
            }

            if (e.target.closest('#close-settings')) {
                this.app.getUIManager().showScreen('home-screen');
            }
        });

        // Handle changes in settings form elements
        document.addEventListener('change', (e) => {
            if (e.target.matches('#theme-select')) {
                const theme = e.target.value;
                this.app.getThemeManager().setTheme(theme);
                this.app.getSettingsManager().setSetting('theme', theme);
            }
        });
    }

    setupToolsScreenEvents() {
        document.addEventListener('click', async (e) => {
            if (e.target.closest('#open-tools')) {
                this.app.getUIManager().showScreen('tools-screen');
            }

            if (e.target.closest('#close-tools')) {
                this.app.getUIManager().showScreen('settings-screen');
            }

            if (e.target.closest('#reset-service-worker')) {
                await this.resetServiceWorker();
            }

            if (e.target.closest('#reset-cache')) {
                await this.resetCache();
            }
        });
    }

    setupGlobalEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const currentScreen = this.app.getUIManager().currentScreen;
                if (currentScreen === 'settings-screen' || currentScreen === 'instructions-screen' || currentScreen === 'tools-screen') {
                    this.app.getUIManager().showScreen('home-screen');
                }
            }
        });

        window.addEventListener('online', () => {
            this.app.getUIManager().showToast('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.app.getUIManager().showToast('You are offline. The game will continue to work!', 'info');
        });

        // Notify user when theme changes
        window.addEventListener('themeChanged', (e) => {
            const theme = e.detail.theme;
            const name = this.app.getThemeManager().getThemeDisplayName(theme);
            this.app.getUIManager().showToast(`Theme changed to ${name}`, 'success');
        });
    }

    async resetServiceWorker() {
        const delay = this.getResetDelay();
        const performReset = async () => {
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const reg of registrations) {
                    await reg.unregister();
                }
                this.app.getUIManager().showToast('Service worker reset', 'success');
                setTimeout(() => location.reload(true), 500);
            }
        };

        if (delay > 0) {
            this.app.getUIManager().showToast(`Service worker will reset in ${delay / 60000} min`, 'info');
            setTimeout(performReset, delay);
        } else {
            await performReset();
        }
    }

    async resetCache() {
        const delay = this.getResetDelay();
        const performReset = async () => {
            if ('caches' in window) {
                const names = await caches.keys();
                await Promise.all(names.map(name => name.startsWith('lingoquest-') ? caches.delete(name) : null));
                this.app.getUIManager().showToast('Cache cleared', 'success');
                setTimeout(() => location.reload(true), 500);
            }
        };

        if (delay > 0) {
            this.app.getUIManager().showToast(`Cache will reset in ${delay / 60000} min`, 'info');
            setTimeout(performReset, delay);
        } else {
            await performReset();
        }
    }

    getResetDelay() {
        const select = document.getElementById('reset-delay-select');
        return select ? parseInt(select.value, 10) || 0 : 0;
    }

    switchGameModeTab(gameMode) {
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.gameMode === gameMode);
        });

        document.querySelectorAll('.game-modes').forEach(modes => {
            modes.classList.toggle('active', modes.id === `${gameMode}-modes`);
        });
    }
}

export default EventManager;

