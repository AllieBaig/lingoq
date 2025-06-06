





/**
 * Purpose: Retro arcade theme configuration for nostalgic 80s/90s gaming aesthetic
 * Key features: Neon colors, pixel fonts, scanline effects, arcade-style animations
 * Dependencies: CSS custom properties, theme system, student profile settings
 * Related helpers: themeManager, CSS transitions, retro color palettes
 * Function names: getThemeConfig, applyRetroEffects, generateScanlines, setPixelFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:40 | File: js/data/themes/retro-arcade.js
 */

export const retroArcadeTheme = {
    // Theme metadata
    id: 'retro-arcade',
    name: 'Retro Arcade',
    category: 'student',
    description: 'Nostalgic 80s/90s arcade gaming aesthetic',
    targetAudience: 'students',
    version: '1.0.0',
    
    // Color palette inspired by classic arcade games
    colors: {
        // Primary colors - Electric blues and magentas
        primary: '#00FFFF',        // Cyan neon
        primaryDark: '#0099CC',    // Darker cyan
        primaryLight: '#66FFFF',   // Light cyan
        
        // Secondary colors - Hot pink and purple
        secondary: '#FF00FF',      // Magenta neon
        secondaryDark: '#CC0099',  // Darker magenta
        secondaryLight: '#FF66FF', // Light magenta
        
        // Accent colors - Electric yellow and green
        accent: '#FFFF00',         // Electric yellow
        accentGreen: '#00FF00',    // Neon green
        accentOrange: '#FF6600',   // Electric orange
        
        // Background colors - Dark with neon highlights
        background: '#0A0A0F',     // Deep space black
        backgroundSecondary: '#1A1A2E', // Dark purple-blue
        backgroundTertiary: '#16213E',  // Midnight blue
        
        // Surface colors for cards and components
        surface: '#1E1E2E',        // Dark card background
        surfaceVariant: '#2A2A3E', // Lighter card background
        surfaceHover: '#3A3A4E',   // Hover state
        
        // Text colors with high contrast
        textPrimary: '#FFFFFF',    // Pure white
        textSecondary: '#CCCCFF',  // Light blue-white
        textAccent: '#00FFFF',     // Cyan text
        textMuted: '#8888AA',      // Muted blue-gray
        
        // Game-specific colors
        gameSuccess: '#00FF41',    // Matrix green
        gameError: '#FF0040',      // Hot pink error
        gameWarning: '#FFAA00',    // Electric amber
        gameInfo: '#0080FF',       // Bright blue
        
        // Button states
        buttonDefault: '#2A2A4A',  // Dark button
        buttonHover: '#FF00FF',    // Magenta hover
        buttonActive: '#00FFFF',   // Cyan active
        buttonDisabled: '#4A4A6A', // Muted disabled
        
        // Border and outline colors
        border: '#444466',         // Subtle border
        borderBright: '#00FFFF',   // Neon border
        borderDanger: '#FF0040',   // Error border
        
        // Special effect colors
        glow: '#00FFFF',          // Neon glow
        shadow: '#FF00FF80',      // Magenta shadow (with alpha)
        scanline: '#FFFFFF10',    // Scanline overlay
        noise: '#888888'          // Static noise
    },
    
    // Typography with retro gaming fonts
    typography: {
        // Font families - pixel and monospace fonts
        fontFamily: {
            primary: "'Press Start 2P', 'Courier New', monospace",
            secondary: "'Orbitron', 'Monaco', monospace",
            body: "'Share Tech Mono', 'Consolas', monospace",
            display: "'Black Ops One', 'Impact', sans-serif"
        },
        
        // Font sizes optimized for pixel fonts
        fontSize: {
            xs: '8px',    // Tiny pixel text
            sm: '10px',   // Small pixel text
            base: '12px', // Base pixel text
            lg: '14px',   // Large pixel text
            xl: '16px',   // Extra large
            '2xl': '20px', // Display size
            '3xl': '24px', // Big display
            '4xl': '32px'  // Huge display
        },
        
        // Line heights for pixel fonts
        lineHeight: {
            tight: 1.0,   // Compressed pixel text
            normal: 1.2,  // Standard pixel spacing
            relaxed: 1.4  // Loose pixel spacing
        },
        
        // Font weights
        fontWeight: {
            normal: 400,  // Regular pixel
            bold: 700     // Bold pixel
        },
        
        // Letter spacing for retro effect
        letterSpacing: {
            tight: '-0.5px',
            normal: '0px',
            wide: '1px',
            wider: '2px'
        }
    },
    
    // Component styles with retro arcade aesthetics
    components: {
        // Card components with neon borders
        card: {
            background: 'var(--surface)',
            border: '2px solid var(--border-bright)',
            borderRadius: '4px', // Sharp corners for retro look
            boxShadow: '0 0 20px var(--glow), inset 0 0 20px var(--shadow)',
            padding: '16px',
            
            // Hover effects
            hover: {
                borderColor: 'var(--primary)',
                boxShadow: '0 0 30px var(--primary), inset 0 0 30px var(--shadow)',
                transform: 'translateY(-2px)'
            }
        },
        
        // Button styles with arcade aesthetics
        button: {
            background: 'var(--button-default)',
            border: '2px solid var(--border-bright)',
            borderRadius: '4px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            padding: '12px 24px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            
            // Button variants
            primary: {
                background: 'var(--primary)',
                color: 'var(--background)',
                textShadow: '0 0 10px var(--background)'
            },
            
            secondary: {
                background: 'var(--secondary)',
                color: 'var(--background)',
                textShadow: '0 0 10px var(--background)'
            },
            
            // Hover and active states
            hover: {
                background: 'var(--button-hover)',
                boxShadow: '0 0 20px var(--button-hover)',
                transform: 'scale(1.05)'
            },
            
            active: {
                background: 'var(--button-active)',
                transform: 'scale(0.98)'
            }
        },
        
        // Input fields with retro styling
        input: {
            background: 'var(--background-secondary)',
            border: '2px solid var(--border)',
            borderRadius: '4px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-base)',
            padding: '12px',
            
            focus: {
                borderColor: 'var(--primary)',
                boxShadow: '0 0 15px var(--primary)',
                outline: 'none'
            }
        }
    },
    
    // Animation effects with retro gaming feel
    animations: {
        // Transition durations
        duration: {
            fast: '150ms',
            normal: '250ms',
            slow: '400ms'
        },
        
        // Easing functions for retro feel
        easing: {
            arcade: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth arcade
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)' // Sharp transition
        },
        
        // Special retro animations
        effects: {
            glow: {
                keyframes: {
                    '0%': { textShadow: '0 0 5px var(--glow)' },
                    '50%': { textShadow: '0 0 20px var(--glow), 0 0 30px var(--glow)' },
                    '100%': { textShadow: '0 0 5px var(--glow)' }
                },
                duration: '2s',
                iterationCount: 'infinite'
            },
            
            flicker: {
                keyframes: {
                    '0%': { opacity: 1 },
                    '98%': { opacity: 1 },
                    '99%': { opacity: 0.8 },
                    '100%': { opacity: 1 }
                },
                duration: '4s',
                iterationCount: 'infinite'
            },
            
            scanlines: {
                keyframes: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                duration: '0.5s',
                iterationCount: 'infinite',
                timingFunction: 'linear'
            }
        }
    },
    
    // Game-specific styling
    gameElements: {
        // Score display with retro styling
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-2xl)',
            color: 'var(--accent)',
            textShadow: '0 0 15px var(--accent)',
            letterSpacing: '2px'
        },
        
        // Timer with urgent feeling
        timer: {
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-xl)',
            color: 'var(--text-primary)',
            
            warning: {
                color: 'var(--game-warning)',
                animation: 'glow 1s infinite'
            },
            
            critical: {
                color: 'var(--game-error)',
                animation: 'flicker 0.5s infinite'
            }
        },
        
        // Question cards with arcade styling
        questionCard: {
            background: 'var(--surface)',
            border: '3px solid var(--primary)',
            borderRadius: '8px',
            boxShadow: '0 0 25px var(--primary)',
            padding: '24px',
            
            // Animated border effect
            borderImage: 'linear-gradient(45deg, var(--primary), var(--secondary)) 1',
            animation: 'glow 3s infinite'
        },
        
        // Answer buttons with game-like styling
        answerButton: {
            background: 'var(--background-tertiary)',
            border: '2px solid var(--border-bright)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            fontSize: 'var(--font-base)',
            padding: '16px',
            
            hover: {
                background: 'var(--primary)',
                color: 'var(--background)',
                boxShadow: '0 0 20px var(--primary)',
                transform: 'translateX(5px)'
            },
            
            correct: {
                background: 'var(--game-success)',
                borderColor: 'var(--game-success)',
                boxShadow: '0 0 25px var(--game-success)'
            },
            
            incorrect: {
                background: 'var(--game-error)',
                borderColor: 'var(--game-error)',
                boxShadow: '0 0 25px var(--game-error)'
            }
        }
    },
    
    // Special retro effects
    effects: {
        // Scanline overlay effect
        scanlines: {
            enabled: true,
            opacity: 0.1,
            spacing: '4px',
            color: 'var(--scanline)'
        },
        
        // CRT screen curve effect
        screenCurve: {
            enabled: false, // Optional - can be performance intensive
            borderRadius: '20px',
            filter: 'brightness(1.1) contrast(1.2)'
        },
        
        // Noise/static effect
        noise: {
            enabled: true,
            opacity: 0.03,
            animation: 'noise 0.2s infinite'
        },
        
        // Bloom/glow effects
        bloom: {
            enabled: true,
            intensity: 'medium',
            radius: '10px'
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        '--retro-primary': 'var(--primary)',
        '--retro-secondary': 'var(--secondary)',
        '--retro-accent': 'var(--accent)',
        '--retro-bg': 'var(--background)',
        '--retro-surface': 'var(--surface)',
        '--retro-text': 'var(--text-primary)',
        '--retro-glow': 'var(--glow)',
        '--retro-font-primary': 'var(--font-primary)',
        '--retro-font-body': 'var(--font-body)'
    }
};

// Utility functions for retro arcade theme
export const retroArcadeUtils = {
    // Apply retro arcade theme to document
    applyTheme() {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        Object.entries(retroArcadeTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        // Apply typography
        Object.entries(retroArcadeTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Add theme class to body
        document.body.classList.add('theme-retro-arcade');
        
        console.log('🕹️ Retro Arcade theme applied');
    },
    
    // Remove retro arcade theme
    removeTheme() {
        document.body.classList.remove('theme-retro-arcade');
        console.log('🕹️ Retro Arcade theme removed');
    },
    
    // Create scanline effect
    createScanlines() {
        if (!retroArcadeTheme.effects.scanlines.enabled) return;
        
        const scanlineDiv = document.createElement('div');
        scanlineDiv.className = 'retro-scanlines';
        scanlineDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${retroArcadeTheme.effects.scanlines.color} 2px,
                ${retroArcadeTheme.effects.scanlines.color} 4px
            );
            opacity: ${retroArcadeTheme.effects.scanlines.opacity};
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(scanlineDiv);
        return scanlineDiv;
    }
};

export default retroArcadeTheme;





