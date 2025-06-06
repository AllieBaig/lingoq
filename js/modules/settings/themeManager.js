




/**
 * File: js/modules/settings/themeManager.js
 * LingoQuest - Theme Management System
 * Handles theme switching, CSS loading, and user preferences
 * Dependencies: storageManager.js
 * Features: Senior and student themes, dynamic CSS loading, theme validation
 * Functions: setTheme, loadThemeCSS, getAvailableThemes, detectSystemTheme
 * MIT License - https://github.com/AllieBaig/LingoQuest
 * Created: 2025-06-05 14:45:18 UTC
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        
        // Senior-friendly themes (built into main CSS)
        this.seniorThemes = ['light', 'dark', 'auto', 'high-contrast', 'sepia', 'blue-light'];
        
        // Student themes (separate CSS files)
        this.studentThemes = ['neon-glow', 'retro-arcade', 'nature-forest', 'space-galaxy', 'candy-pop'];

        // Cartoon themes (separate CSS files)
        this.cartoonThemes = ['jetsons'];

        // All available themes
        this.themes = [...this.seniorThemes, ...this.studentThemes, ...this.cartoonThemes];
        
        // Theme categories for UI organization
        this.themeCategories = {
            senior: this.seniorThemes,
            student: this.studentThemes,
            cartoon: this.cartoonThemes
        };
        
        // CSS file mappings for student themes
        this.studentThemeFiles = {
            'neon-glow': 'css/themes/student-neon-glow.css',
            'retro-arcade': 'css/themes/student-retro-arcade.css',
            'nature-forest': 'css/themes/student-nature-forest.css',
            'space-galaxy': 'css/themes/student-space-galaxy.css',
            'candy-pop': 'css/themes/student-candy-pop.css',
            'jetsons': 'css/themes/cartoon-jetsons.css'
        };
        
        this.loadedThemeFiles = new Set();
        this.init();
    }
    
    init() {
        // Load saved theme or default
        const savedTheme = localStorage.getItem('lingo-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Listen for system theme changes if auto mode
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.currentTheme === 'auto') {
                    this.applyAutoTheme();
                }
            });
        }
    }
    
    async setTheme(themeName) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Theme "${themeName}" not found, using default`);
            themeName = 'light';
        }
        
        // Load CSS file for student or cartoon themes
        if (this.studentThemes.includes(themeName) || this.cartoonThemes.includes(themeName)) {
            await this.loadStudentThemeCSS(themeName);
        }
        
        // Remove previous theme classes
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        
        // Apply new theme
        if (themeName === 'auto') {
            this.applyAutoTheme();
        } else {
            document.body.setAttribute('data-theme', themeName);
            document.body.classList.add(`theme-${themeName}`);
        }
        
        this.currentTheme = themeName;
        localStorage.setItem('lingo-theme', themeName);
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName, category: this.getThemeCategory(themeName) }
        }));
    }
    
    async loadStudentThemeCSS(themeName) {
        if (this.loadedThemeFiles.has(themeName)) {
            return; // Already loaded
        }
        
        const cssFile = this.studentThemeFiles[themeName];
        if (!cssFile) return;
        
        try {
            // Create link element
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssFile;
            link.id = `theme-${themeName}`;
            
            // Add to head
            document.head.appendChild(link);
            
            // Wait for CSS to load
            await new Promise((resolve, reject) => {
                link.onload = resolve;
                link.onerror = reject;
                setTimeout(reject, 5000); // 5 second timeout
            });
            
            this.loadedThemeFiles.add(themeName);
            console.log(`Loaded theme CSS: ${cssFile}`);
            
        } catch (error) {
            console.error(`Failed to load theme CSS for ${themeName}:`, error);
        }
    }
    
    applyAutoTheme() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const autoTheme = prefersDark ? 'dark' : 'light';
        document.body.setAttribute('data-theme', autoTheme);
        document.body.classList.add(`theme-${autoTheme}`);
    }
    
    getThemeCategory(themeName) {
        if (this.seniorThemes.includes(themeName)) return 'senior';
        if (this.studentThemes.includes(themeName)) return 'student';
        if (this.cartoonThemes.includes(themeName)) return 'cartoon';
        return 'unknown';
    }
    
    getAvailableThemes() {
        return this.themes;
    }
    
    getThemesByCategory(category) {
        return this.themeCategories[category] || [];
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    isStudentTheme(themeName) {
        return this.studentThemes.includes(themeName);
    }
    
    isSeniorTheme(themeName) {
        return this.seniorThemes.includes(themeName);
    }
    
    // Get theme display name for UI
    getThemeDisplayName(themeName) {
        const displayNames = {
            'light': 'Light',
            'dark': 'Dark', 
            'auto': 'Auto',
            'high-contrast': 'High Contrast',
            'sepia': 'Sepia',
            'blue-light': 'Blue Light',
            'neon-glow': 'Neon Glow',
            'retro-arcade': 'Retro Arcade',
            'nature-forest': 'Nature Forest',
            'space-galaxy': 'Space Galaxy',
            'candy-pop': 'Candy Pop',
            'jetsons': 'Jetsons'
        };
        return displayNames[themeName] || themeName;
    }
    
    // Cycle through themes (for testing)
    nextTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    }
    
    // Reset to default theme
    resetTheme() {
        this.setTheme('light');
    }
}

// Export for ES modules
export default ThemeManager;

// Global instance for non-module usage
if (typeof window !== 'undefined') {
    window.ThemeManager = ThemeManager;
}




