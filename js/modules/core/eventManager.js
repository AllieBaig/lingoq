
class EventManager {
    constructor() {
        this.app = null;
    }

    setupEventListeners(app) {
        this.app = app;

        this.setupHomeScreenEvents();
        this.setupGameScreenEvents();
        this.setupSettingsScreenEvents();
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
    }

    setupGlobalEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const currentScreen = this.app.getUIManager().currentScreen;
                if (currentScreen === 'settings-screen' || currentScreen === 'instructions-screen') {
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

