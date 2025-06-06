
// **File: js/modules/ui/darkModeToggle.js**


// LingoQuest - Dark Mode Toggle Component
// ES6 Module for sun/moon themed dark mode switcher
// Integrates with existing theme system

export class DarkModeToggle {
    constructor() {
        this.isDarkMode = false;
        this.toggleButton = null;
        this.sunIcon = '☀️';
        this.moonIcon = '🌙';
        this.storageKey = 'lingoquest-dark-mode';
        
        this.init();
    }
    
    init() {
        this.loadSavedPreference();
        this.createToggleButton();
        this.attachEventListeners();
        this.applyInitialMode();
    }
    
    createToggleButton() {
        // Create toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'dark-mode-toggle-container';
        toggleContainer.setAttribute('aria-label', 'Toggle dark mode');
        
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'dark-mode-toggle';
        this.toggleButton.type = 'button';
        this.toggleButton.setAttribute('aria-pressed', this.isDarkMode);
        this.toggleButton.setAttribute('title', 'Toggle dark/light mode');
        
        // Create sun icon
        const sunElement = document.createElement('span');
        sunElement.className = 'sun-icon';
        sunElement.textContent = this.sunIcon;
        sunElement.setAttribute('aria-hidden', 'true');
        
        // Create moon icon
        const moonElement = document.createElement('span');
        moonElement.className = 'moon-icon';
        moonElement.textContent = this.moonIcon;
        moonElement.setAttribute('aria-hidden', 'true');
        
        // Create toggle track
        const toggleTrack = document.createElement('div');
        toggleTrack.className = 'toggle-track';
        
        // Create toggle thumb
        const toggleThumb = document.createElement('div');
        toggleThumb.className = 'toggle-thumb';
        
        // Assemble toggle
        toggleTrack.appendChild(toggleThumb);
        this.toggleButton.appendChild(sunElement);
        this.toggleButton.appendChild(toggleTrack);
        this.toggleButton.appendChild(moonElement);
        toggleContainer.appendChild(this.toggleButton);
        
        // Add to page header
        this.addToHeader(toggleContainer);
        
        // Add screen reader text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = 'Toggle between light and dark mode';
        this.toggleButton.appendChild(srText);
    }
    
    addToHeader(toggleContainer) {
        // Try to add to existing header
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const gameHeader = document.querySelector('.game-header');
        
        if (header) {
            header.appendChild(toggleContainer);
        } else if (nav) {
            nav.appendChild(toggleContainer);
        } else if (gameHeader) {
            gameHeader.appendChild(toggleContainer);
        } else {
            // Create a header if none exists
            const newHeader = document.createElement('header');
            newHeader.className = 'page-header';
            newHeader.appendChild(toggleContainer);
            document.body.insertBefore(newHeader, document.body.firstChild);
        }
    }
    
    attachEventListeners() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggle();
            });
            
            // Keyboard support
            this.toggleButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!this.hasUserPreference()) {
                    this.isDarkMode = e.matches;
                    this.applyMode();
                    this.updateToggleState();
                }
            });
        }
    }
    
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyMode();
        this.updateToggleState();
        this.savePreference();
        
        // Trigger custom event for other components
        const event = new CustomEvent('darkModeToggled', {
            detail: { isDarkMode: this.isDarkMode }
        });
        document.dispatchEvent(event);
    }
    
    applyMode() {
        const body = document.body;
        const html = document.documentElement;
        
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
            html.classList.add('dark-mode');
            body.setAttribute('data-theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            html.classList.remove('dark-mode');
            body.setAttribute('data-theme', 'light');
        }
        
        // Update CSS custom properties
        this.updateCSSVariables();
    }
    
    updateCSSVariables() {
        const root = document.documentElement;
        
        if (this.isDarkMode) {
            root.style.setProperty('--bg-primary', '#1a1a1a');
            root.style.setProperty('--bg-secondary', '#2d2d2d');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#cccccc');
            root.style.setProperty('--border-color', '#404040');
            root.style.setProperty('--accent-color', '#4a9eff');
        } else {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f5f5f5');
            root.style.setProperty('--text-primary', '#333333');
            root.style.setProperty('--text-secondary', '#666666');
            root.style.setProperty('--border-color', '#e0e0e0');
            root.style.setProperty('--accent-color', '#007bff');
        }
    }
    
    updateToggleState() {
        if (!this.toggleButton) return;
        
        this.toggleButton.setAttribute('aria-pressed', this.isDarkMode);
        this.toggleButton.classList.toggle('active', this.isDarkMode);
        
        // Update title attribute
        const newTitle = this.isDarkMode ? 
            'Switch to light mode' : 'Switch to dark mode';
        this.toggleButton.setAttribute('title', newTitle);
    }
    
    applyInitialMode() {
        // Check for saved preference first
        if (this.hasUserPreference()) {
            this.isDarkMode = this.getSavedPreference();
        } else {
            // Fall back to system preference
            this.isDarkMode = this.getSystemPreference();
        }
        
        this.applyMode();
        this.updateToggleState();
    }
    
    loadSavedPreference() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved !== null) {
            this.isDarkMode = JSON.parse(saved);
        }
    }
    
    savePreference() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode));
    }
    
    hasUserPreference() {
        return localStorage.getItem(this.storageKey) !== null;
    }
    
    getSavedPreference() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : false;
    }
    
    getSystemPreference() {
        if (window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }
    
    // Public methods for external control
    setDarkMode(isDark) {
        this.isDarkMode = isDark;
        this.applyMode();
        this.updateToggleState();
        this.savePreference();
    }
    
    getCurrentMode() {
        return this.isDarkMode ? 'dark' : 'light';
    }
    
    destroy() {
        if (this.toggleButton) {
            this.toggleButton.removeEventListener('click', this.toggle);
            this.toggleButton.remove();
        }
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});

