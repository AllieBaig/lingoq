







/**
 * Purpose: Neon glow theme configuration for cyberpunk-inspired aesthetic
 * Key features: Neon colors, glow effects, dark backgrounds, futuristic styling
 * Dependencies: CSS custom properties, theme system, student profile settings
 * Related helpers: themeManager, CSS transitions, neon color palettes
 * Function names: getThemeConfig, applyNeonEffects, generateGlow, setCyberpunkFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:35 | File: js/data/themes/neon-glow.js
 */

export const neonGlowTheme = {
    // Theme metadata
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'student',
    description: 'Cyberpunk-inspired theme with electric neon effects',
    targetAudience: 'students',
    version: '1.0.0',
    
    // Color palette - electric and vibrant
    colors: {
        // Primary colors - Electric cyan
        primary: '#00FFFF',        // Bright cyan neon
        primaryDark: '#008B8B',    // Dark cyan
        primaryLight: '#E0FFFF',   // Light cyan glow
        
        // Secondary colors - Hot pink/magenta
        secondary: '#FF0080',      // Hot pink neon
        secondaryDark: '#8B0040',  // Dark pink
        secondaryLight: '#FFB6C1', // Light pink glow
        
        // Accent colors - Electric variations
        accent: '#00FF41',         // Matrix green
        accentPurple: '#8A2BE2',   // Blue violet
        accentYellow: '#FFFF00',   // Electric yellow
        
        // Background colors - Deep dark space
        background: '#0A0A0F',     // Almost black
        backgroundSecondary: '#1A1A2E', // Dark blue
        backgroundTertiary: '#16213E',  // Midnight blue
        
        // Surface colors for cards and components
        surface: '#1E1E2E',        // Dark surface
        surfaceVariant: '#2A2A3E', // Lighter surface
        surfaceHover: '#3A3A4E',   // Hover surface
        surfaceGlow: '#2E2E4E',    // Glowing surface
        
        // Text colors with neon effects
        textPrimary: '#FFFFFF',    // Pure white
        textSecondary: '#E0E0FF',  // Light blue-white
        textAccent: '#00FFFF',     // Cyan text
        textNeon: '#FF0080',       // Hot pink text
        textMuted: '#8888CC',      // Muted blue
        
        // Interactive element colors
        linkColor: '#00FFFF',      // Cyan links
        linkHover: '#FF0080',      // Pink hover
        linkActive: '#00FF41',     // Green active
        
        // Status colors with neon variants
        success: '#00FF41',        // Matrix green
        error: '#FF073A',          // Neon red
        warning: '#FFD700',        // Electric gold
        info: '#1E90FF',           // Dodger blue
        
        // Game-specific neon colors
        gameCorrect: '#00FF41',    // Success green
        gameIncorrect: '#FF073A',  // Error red
        gameWarning: '#FFD700',    // Warning gold
        gameInfo: '#00BFFF',       // Deep sky blue
        
        // Border and glow colors
        border: '#444466',         // Subtle border
        borderNeon: '#00FFFF',     // Neon border
        borderPink: '#FF0080',     // Pink border
        borderGreen: '#00FF41',    // Green border
        
        // Special effect colors
        glow: '#00FFFF',          // Primary glow
        glowPink: '#FF0080',      // Pink glow
        glowGreen: '#00FF41',     // Green glow
        shadow: '#000033',        // Deep shadow
        
        // Gradient colors
        gradientStart: '#0A0A0F',  // Dark start
        gradientMid: '#1A1A2E',    // Mid tone
        gradientEnd: '#2A2A3E'     // Light end
    },
    
    // Typography with futuristic fonts
    typography: {
        // Font families - sci-fi and tech fonts
        fontFamily: {
            primary: "'Orbitron', 'Helvetica Neue', sans-serif",
            secondary: "'Exo 2', 'Arial', sans-serif",
            body: "'Rajdhani', 'Roboto', sans-serif",
            display: "'Audiowide', 'Impact', sans-serif",
            monospace: "'Share Tech Mono', 'Courier New', monospace"
        },
        
        // Font sizes optimized for neon effects
        fontSize: {
            xs: '12px',   // Small neon text
            sm: '14px',   // Small text
            base: '16px', // Base neon text
            lg: '18px',   // Large text
            xl: '20px',   // Extra large
            '2xl': '24px', // Display size
            '3xl': '30px', // Big display
            '4xl': '36px', // Huge display
            '5xl': '48px'  // Hero text
        },
        
        // Line heights for tech aesthetics
        lineHeight: {
            tight: 1.2,   // Compact tech text
            normal: 1.4,  // Standard spacing
            relaxed: 1.6  // Loose spacing
        },
        
        // Font weights
        fontWeight: {
            light: 300,   // Light weight
            normal: 400,  // Regular
            medium: 500,  // Medium
            bold: 700,    // Bold neon
            black: 900    // Heavy weight
        },
        
        // Letter spacing for futuristic feel
        letterSpacing: {
            tight: '-0.5px',
            normal: '0px',
            wide: '1px',
            wider: '2px',
            widest: '3px'
        }
    },
    
    // Component styles with neon aesthetics
    components: {
        // Card components with glowing borders
        card: {
            background: 'var(--surface)',
            border: '2px solid var(--border-neon)',
            borderRadius: '8px',
            boxShadow: '0 0 20px var(--glow), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            padding: '20px',
            
            // Glow effects
            hover: {
                borderColor: 'var(--glow-pink)',
                boxShadow: '0 0 30px var(--glow-pink), inset 0 0 30px rgba(255, 0, 128, 0.1)',
                transform: 'translateY(-2px)'
            },
            
            // Active state
            active: {
                borderColor: 'var(--glow-green)',
                boxShadow: '0 0 25px var(--glow-green)'
            }
        },
        
        // Button styles with neon effects
        button: {
            background: 'var(--surface)',
            border: '2px solid var(--border-neon)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-base)',
            padding: '12px 24px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '500',
            
            // Button variants
            primary: {
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'var(--background)',
                textShadow: '0 0 10px var(--background)',
                boxShadow: '0 0 20px var(--primary)'
            },
            
            secondary: {
                background: 'linear-gradient(135deg, var(--secondary), var(--secondary-dark))',
                color: 'var(--text-primary)',
                textShadow: '0 0 10px var(--secondary)',
                boxShadow: '0 0 20px var(--secondary)'
            },
            
            // Interactive states
            hover: {
                background: 'var(--surface-hover)',
                boxShadow: '0 0 25px var(--glow), 0 0 50px var(--glow)',
                transform: 'scale(1.05)'
            },
            
            active: {
                transform: 'scale(0.98)',
                boxShadow: '0 0 15px var(--glow)'
            }
        },
        
        // Input fields with cyberpunk styling
        input: {
            background: 'var(--background-secondary)',
            border: '2px solid var(--border)',
            borderRadius: '4px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-base)',
            padding: '12px 16px',
            
            // Focus effects
            focus: {
                borderColor: 'var(--primary)',
                boxShadow: '0 0 15px var(--primary)',
                outline: 'none'
            },
            
            // Placeholder styling
            placeholder: {
                color: 'var(--text-muted)',
                opacity: 0.7
            }
        },
        
        // Navigation with neon highlights
        navigation: {
            background: 'var(--background-secondary)',
            borderBottom: '2px solid var(--border-neon)',
            padding: '16px 24px',
            
            // Nav links
            link: {
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                
                hover: {
                    color: 'var(--primary)',
                    textShadow: '0 0 10px var(--primary)',
                    background: 'rgba(0, 255, 255, 0.1)'
                },
                
                active: {
                    color: 'var(--secondary)',
                    textShadow: '0 0 15px var(--secondary)',
                    background: 'rgba(255, 0, 128, 0.2)'
                }
            }
        }
    },
    
    // Animation effects with cyberpunk flair
    animations: {
        // Transition durations
        duration: {
            fast: '200ms',
            normal: '300ms',
            slow: '500ms',
            glow: '1s'
        },
        
        // Easing functions for tech feel
        easing: {
            cyber: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        
        // Special neon animations
        effects: {
            neonGlow: {
                keyframes: {
                    '0%': { 
                        textShadow: '0 0 5px var(--glow)',
                        boxShadow: '0 0 5px var(--glow)'
                    },
                    '50%': { 
                        textShadow: '0 0 20px var(--glow), 0 0 30px var(--glow)',
                        boxShadow: '0 0 20px var(--glow), 0 0 30px var(--glow)'
                    },
                    '100%': { 
                        textShadow: '0 0 5px var(--glow)',
                        boxShadow: '0 0 5px var(--glow)'
                    }
                },
                duration: '2s',
                iterationCount: 'infinite'
            },
            
            pulse: {
                keyframes: {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                    '100%': { transform: 'scale(1)', opacity: 1 }
                },
                duration: '1.5s',
                iterationCount: 'infinite'
            },
            
            flicker: {
                keyframes: {
                    '0%': { opacity: 1 },
                    '97%': { opacity: 1 },
                    '98%': { opacity: 0.7 },
                    '99%': { opacity: 1 },
                    '100%': { opacity: 1 }
                },
                duration: '3s',
                iterationCount: 'infinite'
            }
        }
    },
    
    // Game-specific styling
    gameElements: {
        // Score display with neon styling
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-3xl)',
            color: 'var(--accent)',
            textShadow: '0 0 20px var(--accent)',
            letterSpacing: '2px',
            fontWeight: '700'
        },
        
        // Timer with urgency effects
        timer: {
            fontFamily: 'var(--font-monospace)',
            fontSize: 'var(--font-xl)',
            color: 'var(--text-primary)',
            fontWeight: '600',
            
            // Timer states
            warning: {
                color: 'var(--warning)',
                textShadow: '0 0 15px var(--warning)',
                animation: 'pulse 1s infinite'
            },
            
            critical: {
                color: 'var(--error)',
                textShadow: '0 0 20px var(--error)',
                animation: 'flicker 0.5s infinite'
            }
        },
        
        // Question cards with cyberpunk styling
        questionCard: {
            background: 'linear-gradient(135deg, var(--surface), var(--surface-variant))',
            border: '3px solid var(--primary)',
            borderRadius: '12px',
            boxShadow: '0 0 30px var(--primary), inset 0 0 30px rgba(0, 255, 255, 0.1)',
            padding: '28px',
            
            // Animated border effect
            animation: 'neonGlow 3s infinite'
        },
        
        // Answer buttons with neon feedback
        answerButton: {
            background: 'var(--surface)',
            border: '2px solid var(--border-neon)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: 'var(--font-base)',
            padding: '18px 20px',
            fontWeight: '500',
            
            // Interactive states
            hover: {
                background: 'var(--surface-hover)',
                borderColor: 'var(--primary)',
                boxShadow: '0 0 20px var(--primary)',
                transform: 'translateX(5px)'
            },
            
            selected: {
                background: 'var(--primary)',
                color: 'var(--background)',
                textShadow: '0 0 10px var(--background)',
                boxShadow: '0 0 25px var(--primary)'
            },
            
            correct: {
                background: 'var(--game-correct)',
                borderColor: 'var(--game-correct)',
                color: 'var(--background)',
                boxShadow: '0 0 30px var(--game-correct)'
            },
            
            incorrect: {
                background: 'var(--game-incorrect)',
                borderColor: 'var(--game-incorrect)',
                color: 'var(--text-primary)',
                boxShadow: '0 0 30px var(--game-incorrect)'
            }
        }
    },
    
    // Special cyberpunk effects
    effects: {
        // Scan line overlay
        scanLines: {
            enabled: true,
            opacity: 0.05,
            speed: '2s'
        },
        
        // Grid pattern overlay
        grid: {
            enabled: true,
            opacity: 0.03,
            size: '20px'
        },
        
        // Glow intensity levels
        glowIntensity: {
            low: '5px',
            medium: '15px',
            high: '25px',
            extreme: '40px'
        },
        
        // Particle effects
        particles: {
            enabled: false, // Can be performance intensive
            count: 20,
            color: 'var(--primary)',
            speed: 'slow'
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        '--neon-primary': 'var(--primary)',
        '--neon-secondary': 'var(--secondary)',
        '--neon-accent': 'var(--accent)',
        '--neon-bg': 'var(--background)',
        '--neon-surface': 'var(--surface)',
        '--neon-text': 'var(--text-primary)',
        '--neon-glow': 'var(--glow)',
        '--neon-font-primary': 'var(--font-primary)',
        '--neon-font-display': 'var(--font-display)'
    }
};

// Utility functions for neon glow theme
export const neonGlowUtils = {
    // Apply neon glow theme to document
    applyTheme() {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        Object.entries(neonGlowTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        // Apply neon-specific variables
        Object.entries(neonGlowTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Add theme class to body
        document.body.classList.add('theme-neon-glow');
        
        // Set color scheme for browser UI
        root.style.setProperty('color-scheme', 'dark');
        
        console.log('⚡ Neon Glow theme applied');
    },
    
    // Remove neon glow theme
    removeTheme() {
        document.body.classList.remove('theme-neon-glow');
        console.log('⚡ Neon Glow theme removed');
    },
    
    // Create scan line effect
    createScanLines() {
        if (!neonGlowTheme.effects.scanLines.enabled) return;
        
        const scanDiv = document.createElement('div');
        scanDiv.className = 'neon-scanlines';
        scanDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, ${neonGlowTheme.effects.scanLines.opacity}) 2px,
                rgba(0, 255, 255, ${neonGlowTheme.effects.scanLines.opacity}) 4px
            );
            pointer-events: none;
            z-index: 9999;
            animation: scanMove ${neonGlowTheme.effects.scanLines.speed} linear infinite;
        `;
        
        document.body.appendChild(scanDiv);
        return scanDiv;
    },
    
    // Create grid overlay
    createGrid() {
        if (!neonGlowTheme.effects.grid.enabled) return;
        
        const gridDiv = document.createElement('div');
        gridDiv.className = 'neon-grid';
        gridDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(0, 255, 255, ${neonGlowTheme.effects.grid.opacity}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, ${neonGlowTheme.effects.grid.opacity}) 1px, transparent 1px);
            background-size: ${neonGlowTheme.effects.grid.size} ${neonGlowTheme.effects.grid.size};
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(gridDiv);
        return gridDiv;
    }
};

export default neonGlowTheme;


