




/**
 * Purpose: Nature forest theme configuration for calming earth-tone aesthetic
 * Key features: Earth colors, organic gradients, nature sounds, forest animations
 * Dependencies: CSS custom properties, theme system, student profile settings
 * Related helpers: themeManager, CSS transitions, nature color palettes
 * Function names: getThemeConfig, applyNatureEffects, generateLeafPattern, setOrganicFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 15:45 | File: js/data/themes/nature-forest.js
 */

export const natureForestTheme = {
    // Theme metadata
    id: 'nature-forest',
    name: 'Nature Forest',
    category: 'student',
    description: 'Calming earth-tone aesthetic inspired by forests',
    targetAudience: 'students',
    version: '1.0.0',
    
    // Color palette inspired by forest and nature
    colors: {
        // Primary colors - Forest greens
        primary: '#2E7D32',        // Deep forest green
        primaryDark: '#1B5E20',    // Dark forest green
        primaryLight: '#4CAF50',   // Bright green
        
        // Secondary colors - Earth browns
        secondary: '#5D4037',      // Rich brown
        secondaryDark: '#3E2723',  // Dark brown
        secondaryLight: '#8D6E63', // Light brown
        
        // Accent colors - Nature highlights
        accent: '#FF8F00',         // Autumn orange
        accentGreen: '#8BC34A',    // Fresh green
        accentBlue: '#03A9F4',     // Sky blue
        
        // Background colors - Natural tones
        background: '#F1F8E9',     // Light mint cream
        backgroundSecondary: '#E8F5E8', // Pale green
        backgroundTertiary: '#DCEDC8',  // Soft sage
        
        // Surface colors for cards and components
        surface: '#FFFFFF',        // Pure white
        surfaceVariant: '#F9FBE7', // Cream white
        surfaceHover: '#F0F4C3',   // Light yellow-green
        
        // Text colors with natural contrast
        textPrimary: '#1B5E20',    // Dark forest text
        textSecondary: '#2E7D32',  // Medium green text
        textAccent: '#FF8F00',     // Orange accent text
        textMuted: '#689F38',      // Muted green
        
        // Game-specific colors
        gameSuccess: '#4CAF50',    // Success green
        gameError: '#E53935',      // Natural red
        gameWarning: '#FB8C00',    // Autumn orange
        gameInfo: '#29B6F6',       // Sky blue
        
        // Button states
        buttonDefault: '#E8F5E8',  // Light green button
        buttonHover: '#C8E6C9',    // Hover green
        buttonActive: '#A5D6A7',   // Active green
        buttonDisabled: '#F5F5F5', // Disabled gray
        
        // Border and outline colors
        border: '#C5E1A5',         // Soft green border
        borderBright: '#8BC34A',   // Bright green border
        borderDanger: '#EF5350',   // Error border
        
        // Special effect colors
        leafGreen: '#689F38',      // Leaf color
        barkBrown: '#5D4037',      // Tree bark
        skyBlue: '#87CEEB',        // Sky color
        sunYellow: '#FDD835'       // Sunlight
    },
    
    // Typography with organic, nature-inspired fonts
    typography: {
        // Font families - organic and readable fonts
        fontFamily: {
            primary: "'Nunito', 'Helvetica Neue', sans-serif",
            secondary: "'Merriweather', 'Georgia', serif",
            body: "'Open Sans', 'Arial', sans-serif",
            display: "'Comfortaa', 'Trebuchet MS', sans-serif"
        },
        
        // Font sizes with comfortable readability
        fontSize: {
            xs: '12px',   // Small text
            sm: '14px',   // Small text
            base: '16px', // Base reading size
            lg: '18px',   // Large text
            xl: '20px',   // Extra large
            '2xl': '24px', // Display size
            '3xl': '30px', // Big display
            '4xl': '36px'  // Huge display
        },
        
        // Line heights for comfortable reading
        lineHeight: {
            tight: 1.25,  // Compact text
            normal: 1.5,  // Standard reading
            relaxed: 1.75 // Loose, airy text
        },
        
        // Font weights
        fontWeight: {
            light: 300,   // Light weight
            normal: 400,  // Regular
            medium: 500,  // Medium
            semibold: 600, // Semi-bold
            bold: 700     // Bold
        },
        
        // Letter spacing for organic feel
        letterSpacing: {
            tight: '-0.25px',
            normal: '0px',
            wide: '0.25px',
            wider: '0.5px'
        }
    },
    
    // Component styles with natural aesthetics
    components: {
        // Card components with organic borders
        card: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px', // Rounded corners like river stones
            boxShadow: '0 4px 16px rgba(76, 175, 80, 0.15)',
            padding: '20px',
            
            // Hover effects
            hover: {
                borderColor: 'var(--primary)',
                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.25)',
                transform: 'translateY(-2px)'
            }
        },
        
        // Button styles with natural aesthetics
        button: {
            background: 'var(--button-default)',
            border: '2px solid var(--border)',
            borderRadius: '25px', // Pill-shaped like seeds
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-base)',
            padding: '12px 24px',
            fontWeight: '500',
            
            // Button variants
            primary: {
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            },
            
            secondary: {
                background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 12px rgba(93, 64, 55, 0.3)'
            },
            
            // Hover and active states
            hover: {
                background: 'var(--button-hover)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 16px rgba(76, 175, 80, 0.2)'
            },
            
            active: {
                background: 'var(--button-active)',
                transform: 'translateY(0px)'
            }
        },
        
        // Input fields with natural styling
        input: {
            background: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-base)',
            padding: '14px 16px',
            
            focus: {
                borderColor: 'var(--primary)',
                boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)',
                outline: 'none'
            }
        }
    },
    
    // Animation effects with natural, organic movement
    animations: {
        // Transition durations
        duration: {
            fast: '200ms',
            normal: '350ms',
            slow: '500ms'
        },
        
        // Easing functions for natural feel
        easing: {
            natural: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Smooth natural
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)' // Gentle ease
        },
        
        // Special nature animations
        effects: {
            leafSway: {
                keyframes: {
                    '0%': { transform: 'rotate(-2deg) translateX(0px)' },
                    '50%': { transform: 'rotate(2deg) translateX(2px)' },
                    '100%': { transform: 'rotate(-2deg) translateX(0px)' }
                },
                duration: '3s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            },
            
            growth: {
                keyframes: {
                    '0%': { transform: 'scale(0.9)', opacity: 0.7 },
                    '50%': { transform: 'scale(1.02)', opacity: 0.9 },
                    '100%': { transform: 'scale(1)', opacity: 1 }
                },
                duration: '1.5s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            },
            
            sunbeam: {
                keyframes: {
                    '0%': { opacity: 0.3, transform: 'translateX(-10px)' },
                    '50%': { opacity: 0.8, transform: 'translateX(0px)' },
                    '100%': { opacity: 0.3, transform: 'translateX(10px)' }
                },
                duration: '4s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            }
        }
    },
    
    // Game-specific styling
    gameElements: {
        // Score display with natural styling
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-2xl)',
            color: 'var(--accent)',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(255, 143, 0, 0.3)'
        },
        
        // Timer with nature-inspired urgency
        timer: {
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-xl)',
            color: 'var(--text-primary)',
            fontWeight: '600',
            
            warning: {
                color: 'var(--game-warning)',
                animation: 'growth 2s infinite'
            },
            
            critical: {
                color: 'var(--game-error)',
                animation: 'growth 1s infinite'
            }
        },
        
        // Question cards with organic styling
        questionCard: {
            background: 'linear-gradient(135deg, var(--surface), var(--surface-variant))',
            border: '2px solid var(--border-bright)',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.15)',
            padding: '28px',
            
            // Subtle pattern overlay
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(139, 195, 74, 0.1) 0%, transparent 50%)',
            
            // Gentle hover animation
            hover: {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 32px rgba(76, 175, 80, 0.2)'
            }
        },
        
        // Answer buttons with nature-like styling
        answerButton: {
            background: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: 'var(--font-base)',
            padding: '18px 20px',
            fontWeight: '500',
            
            hover: {
                background: 'var(--surface-hover)',
                borderColor: 'var(--primary)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
            },
            
            correct: {
                background: 'linear-gradient(135deg, var(--game-success), #66BB6A)',
                borderColor: 'var(--game-success)',
                color: 'white',
                boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)'
            },
            
            incorrect: {
                background: 'linear-gradient(135deg, var(--game-error), #EF5350)',
                borderColor: 'var(--game-error)',
                color: 'white',
                boxShadow: '0 6px 16px rgba(229, 57, 53, 0.4)'
            }
        }
    },
    
    // Special nature effects
    effects: {
        // Subtle leaf pattern overlay
        leafPattern: {
            enabled: true,
            opacity: 0.05,
            backgroundImage: 'url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Cpath d=\'M10 2c-2 0-4 2-4 6 0 2 1 3 2 4l2 2 2-2c1-1 2-2 2-4 0-4-2-6-4-6z\' fill=\'%23689F38\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")'
        },
        
        // Organic gradients
        gradients: {
            enabled: true,
            primary: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
            secondary: 'linear-gradient(135deg, #DCEDC8 0%, #F0F4C3 100%)',
            accent: 'radial-gradient(circle, #FFF9C4 0%, #F0F4C3 100%)'
        },
        
        // Gentle breathing animation for backgrounds
        breathing: {
            enabled: true,
            duration: '6s',
            keyframes: {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.02)' },
                '100%': { transform: 'scale(1)' }
            }
        },
        
        // Particle effects (leaves falling)
        particles: {
            enabled: false, // Optional - can be performance intensive
            type: 'leaves',
            count: 10,
            speed: 'slow'
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        '--nature-primary': 'var(--primary)',
        '--nature-secondary': 'var(--secondary)',
        '--nature-accent': 'var(--accent)',
        '--nature-bg': 'var(--background)',
        '--nature-surface': 'var(--surface)',
        '--nature-text': 'var(--text-primary)',
        '--nature-leaf': 'var(--leaf-green)',
        '--nature-bark': 'var(--bark-brown)',
        '--nature-font-primary': 'var(--font-primary)',
        '--nature-font-body': 'var(--font-body)'
    }
};

// Utility functions for nature forest theme
export const natureForestUtils = {
    // Apply nature forest theme to document
    applyTheme() {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        Object.entries(natureForestTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        // Apply typography
        Object.entries(natureForestTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Add theme class to body
        document.body.classList.add('theme-nature-forest');
        
        console.log('🌲 Nature Forest theme applied');
    },
    
    // Remove nature forest theme
    removeTheme() {
        document.body.classList.remove('theme-nature-forest');
        console.log('🌲 Nature Forest theme removed');
    },
    
    // Create leaf pattern overlay
    createLeafPattern() {
        if (!natureForestTheme.effects.leafPattern.enabled) return;
        
        const patternDiv = document.createElement('div');
        patternDiv.className = 'nature-leaf-pattern';
        patternDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: ${natureForestTheme.effects.leafPattern.backgroundImage};
            opacity: ${natureForestTheme.effects.leafPattern.opacity};
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(patternDiv);
        return patternDiv;
    },
    
    // Create gentle breathing animation
    createBreathingEffect() {
        if (!natureForestTheme.effects.breathing.enabled) return;
        
        const style = document.createElement('style');
        style.textContent = `
            .nature-breathing {
                animation: nature-breathe ${natureForestTheme.effects.breathing.duration} infinite ease-in-out;
            }
            
            @keyframes nature-breathe {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
        `;
        
        document.head.appendChild(style);
        return style;
    }
};

export default natureForestTheme;


