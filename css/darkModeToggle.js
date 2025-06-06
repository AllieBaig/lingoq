

// LingoQuest - Dark Mode Toggle Component (Fixed)
// ES6 Module for sun/moon themed dark mode switcher
// Fixed version with proper initialization timing

export class DarkModeToggle {
    constructor() {
        this.isDarkMode = false;
        this.toggleButton = null;
        this.sunIcon = '☀️';
        this.moonIcon = '🌙';
        this.storageKey = 'lingoquest-dark-mode';
        this.initAttempts = 0;
        this.maxAttempts = 10;
        
        this.waitForContainer();
    }
    
    waitForContainer() {
        const container = document.getElementById('dark-mode-toggle-container');
        
        if (container || this.initAttempts >= this.maxAttempts) {
            this.init();
        } else {
            this.initAttempts++;
            setTimeout(() => this.waitForContainer(), 100);
        }
    }
    
    init() {
        this.loadSavedPreference();
        this.createToggleButton();
        this.attachEventListeners();
        this.applyInitialMode();
        
        // Force initial theme application
        setTimeout(() => {
            this.applyMode();
            this.updateToggleState();
        }, 50);
    }
    
    createToggleButton() {
        const container = document.getElementById('dark-mode-toggle-container');
        if (!container) {
            console.warn('Dark mode toggle container not found');
            return;
        }
        
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
        
        // Add to container
        container.appendChild(this.toggleButton);
        
        // Add screen reader text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = 'Toggle between light and dark mode';
        this.toggleButton.appendChild(srText);
    }
    
    attachEventListeners() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
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
        
        console.log('Dark mode toggled:', this.isDarkMode);
        
        // Trigger custom event for other components
        const event = new CustomEvent('darkModeToggled', {
            detail: { isDarkMode: this.isDarkMode }
        });
        document.dispatchEvent(event);
    }
    
    applyMode() {
        const body = document.body;
        const html = document.documentElement;
        
        // Remove existing theme classes
        body.classList.remove('dark-mode', 'light-mode');
        html.classList.remove('dark-mode', 'light-mode');
        
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
            html.classList.add('dark-mode');
            body.setAttribute('data-theme', 'dark');
            html.setAttribute('data-theme', 'dark');
        } else {
            body.classList.add('light-mode');
            html.classList.add('light-mode');
            body.setAttribute('data-theme', 'light');
            html.setAttribute('data-theme', 'light');
        }
        
        // Update CSS custom properties
        this.updateCSSVariables();
        
        // Force repaint
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
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
            root.style.setProperty('--card-bg', '#2d2d2d');
        } else {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f5f5f5');
            root.style.setProperty('--text-primary', '#333333');
            root.style.setProperty('--text-secondary', '#666666');
            root.style.setProperty('--border-color', '#e0e0e0');
            root.style.setProperty('--accent-color', '#007bff');
            root.style.setProperty('--card-bg', '#ffffff');
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
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved !== null) {
                this.isDarkMode = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load dark mode preference:', e);
        }
    }
    
    savePreference() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode));
        } catch (e) {
            console.warn('Could not save dark mode preference:', e);
        }
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
}

// Initialize when everything is loaded
let darkModeToggle = null;

function initDarkMode() {
    if (!darkModeToggle) {
        darkModeToggle = new DarkModeToggle();
    }
}

// Multiple initialization attempts
document.addEventListener('DOMContentLoaded', initDarkMode);
window.addEventListener('load', initDarkMode);

// Also try after a short delay
setTimeout(initDarkMode, 500);


