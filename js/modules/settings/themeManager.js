
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = ['light', 'dark', 'auto', 'high-contrast', 'sepia', 'blue-light'];
    }

    async init() {
        // Auto-detect system theme if set to auto
        this.detectSystemTheme();
        this.setupThemeListener();
    }

    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    setupThemeListener() {
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (this.currentTheme === 'auto') {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        if (this.themes.includes(theme)) {
            this.currentTheme = theme;

            if (theme === 'auto') {
                this.applyTheme(this.detectSystemTheme());
            } else {
                this.applyTheme(theme);
            }
        }
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);

        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const colors = {
                light: '#ffffff',
                dark: '#1a1a1a',
                'high-contrast': '#000000',
                sepia: '#f4f1ea',
                'blue-light': '#f8f9ff'
            };
            metaThemeColor.setAttribute('content', colors[theme] || colors.light);
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

export default ThemeManager;

