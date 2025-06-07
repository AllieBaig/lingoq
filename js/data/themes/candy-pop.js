




/**
 * Purpose: Candy Pop theme configuration with vibrant colors and playful styling
 * Key features: Bright candy colors, rounded elements, gradient backgrounds, fun animations
 * Dependencies: Base theme system, CSS custom properties
 * Related helpers: Color palette management, animation definitions, responsive design
 * Function names: getCandyPopTheme, applyTheme, getColorPalette, getAnimations
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: js/data/themes/candy-pop.js
 */

export const candyPopTheme = {
    id: 'candy-pop',
    name: 'Candy Pop',
    displayName: '🍭 Candy Pop',
    category: 'student',
    description: 'Sweet and colorful theme with candy-inspired colors',
    version: '1.0.0',
    
    // Color palette inspired by various candies
    colors: {
        // Primary candy colors
        primary: '#FF69B4',        // Hot pink (bubblegum)
        primaryHover: '#FF1493',   // Deep pink
        primaryActive: '#DC143C',  // Crimson
        
        // Secondary colors
        secondary: '#32CD32',      // Lime green (sour apple)
        secondaryHover: '#228B22', // Forest green
        secondaryActive: '#006400', // Dark green
        
        // Accent colors
        accent: '#FFD700',         // Gold (butterscotch)
        accentHover: '#FFA500',    // Orange
        accentActive: '#FF8C00',   // Dark orange
        
        // Background colors
        background: '#FFF8DC',     // Cornsilk (vanilla)
        backgroundSecondary: '#F0F8FF', // Alice blue (cotton candy)
        backgroundTertiary: '#FFF0F5',  // Lavender blush
        
        // Surface colors
        surface: '#FFFFFF',        // Pure white
        surfaceHover: '#FDF5E6',   // Old lace
        surfaceActive: '#FAF0E6',  // Linen
        
        // Text colors
        textPrimary: '#2F4F4F',    // Dark slate gray
        textSecondary: '#696969',  // Dim gray
        textMuted: '#A9A9A9',      // Dark gray
        textOnPrimary: '#FFFFFF',  // White
        textOnSecondary: '#FFFFFF', // White
        
        // Border colors
        border: '#DDA0DD',         // Plum
        borderLight: '#E6E6FA',    // Lavender
        borderDark: '#9370DB',     // Medium purple
        
        // State colors
        success: '#32CD32',        // Lime green
        successLight: '#98FB98',   // Pale green
        successDark: '#228B22',    // Forest green
        
        warning: '#FFD700',        // Gold
        warningLight: '#FFFFE0',   // Light yellow
        warningDark: '#FFA500',    // Orange
        
        error: '#FF69B4',          // Hot pink (playful error)
        errorLight: '#FFB6C1',     // Light pink
        errorDark: '#FF1493',      // Deep pink
        
        info: '#87CEEB',           // Sky blue
        infoLight: '#E0F6FF',      // Alice blue
        infoDark: '#4682B4',       // Steel blue
        
        // Special candy colors
        strawberry: '#FF69B4',     // Strawberry pink
        blueberry: '#6495ED',      // Cornflower blue
        grape: '#9370DB',          // Medium purple
        orange: '#FFA500',         // Orange
        lemon: '#FFFF00',          // Yellow
        lime: '#32CD32',           // Lime green
        cherry: '#DC143C',         // Crimson
        watermelon: '#FF6347',     // Tomato
        
        // Game specific colors
        gameBackground: 'linear-gradient(135deg, #FFF8DC 0%, #F0F8FF 50%, #FFF0F5 100%)',
        cardBackground: 'linear-gradient(45deg, #FFFFFF 0%, #FDF5E6 100%)',
        buttonGradient: 'linear-gradient(45deg, #FF69B4 0%, #32CD32 50%, #FFD700 100%)',
        progressGradient: 'linear-gradient(90deg, #FF69B4 0%, #32CD32 50%, #FFD700 100%)'
    },
    
    // Typography with playful fonts
    typography: {
        fontFamily: {
            primary: '"Comic Sans MS", "Marker Felt", cursive, system-ui',
            secondary: '"Trebuchet MS", "Arial Rounded MT Bold", sans-serif',
            heading: '"Fredoka One", "Comic Sans MS", cursive',
            body: '"Nunito", "Comic Sans MS", sans-serif',
            button: '"Fredoka One", "Comic Sans MS", cursive',
            display: '"Fredoka One", "Bangers", cursive'
        },
        
        fontSize: {
            xs: '0.75rem',     // 12px
            sm: '0.875rem',    // 14px
            base: '1rem',      // 16px
            lg: '1.125rem',    // 18px
            xl: '1.25rem',     // 20px
            '2xl': '1.5rem',   // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem',  // 36px
            '5xl': '3rem',     // 48px
            '6xl': '3.75rem'   // 60px
        },
        
        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900'
        },
        
        lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
            loose: '2'
        },
        
        letterSpacing: {
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        }
    },
    
    // Spacing with generous padding for touch-friendly interface
    spacing: {
        xs: '0.25rem',    // 4px
        sm: '0.5rem',     // 8px
        md: '1rem',       // 16px
        lg: '1.5rem',     // 24px
        xl: '2rem',       // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
        '4xl': '6rem',    // 96px
        '5xl': '8rem'     // 128px
    },
    
    // Border radius for candy-like rounded elements
    borderRadius: {
        none: '0',
        sm: '0.375rem',   // 6px
        md: '0.5rem',     // 8px
        lg: '0.75rem',    // 12px
        xl: '1rem',       // 16px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
        full: '9999px',   // Perfect circle
        candy: '2.5rem'   // Extra rounded for candy effect
    },
    
    // Shadows with colorful glows
    shadows: {
        sm: '0 1px 2px 0 rgba(255, 105, 180, 0.1)',
        md: '0 4px 6px -1px rgba(255, 105, 180, 0.2), 0 2px 4px -1px rgba(50, 205, 50, 0.1)',
        lg: '0 10px 15px -3px rgba(255, 105, 180, 0.3), 0 4px 6px -2px rgba(255, 215, 0, 0.2)',
        xl: '0 20px 25px -5px rgba(255, 105, 180, 0.4), 0 10px 10px -5px rgba(50, 205, 50, 0.2)',
        '2xl': '0 25px 50px -12px rgba(255, 105, 180, 0.5)',
        
        // Candy glow effects
        candyGlow: '0 0 20px rgba(255, 105, 180, 0.6), 0 0 40px rgba(50, 205, 50, 0.3)',
        sweetGlow: '0 0 15px rgba(255, 215, 0, 0.7)',
        popGlow: '0 0 25px rgba(255, 105, 180, 0.8), 0 0 50px rgba(255, 105, 180, 0.4)'
    },
    
    // Animations with bouncy, playful effects
    animations: {
        // Durations
        duration: {
            fast: '200ms',
            normal: '300ms',
            slow: '500ms',
            slower: '800ms'
        },
        
        // Easing functions
        easing: {
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            sweet: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pop: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        
        // Keyframes
        keyframes: {
            bounce: {
                '0%, 20%, 53%, 80%, 100%': {
                    transform: 'translate3d(0,0,0)'
                },
                '40%, 43%': {
                    transform: 'translate3d(0, -30px, 0)'
                },
                '70%': {
                    transform: 'translate3d(0, -15px, 0)'
                },
                '90%': {
                    transform: 'translate3d(0, -4px, 0)'
                }
            },
            
            candyFloat: {
                '0%, 100%': {
                    transform: 'translateY(0px) rotate(0deg)'
                },
                '25%': {
                    transform: 'translateY(-10px) rotate(90deg)'
                },
                '50%': {
                    transform: 'translateY(-20px) rotate(180deg)'
                },
                '75%': {
                    transform: 'translateY(-10px) rotate(270deg)'
                }
            },
            
            pop: {
                '0%': {
                    transform: 'scale(1)'
                },
                '50%': {
                    transform: 'scale(1.2)'
                },
                '100%': {
                    transform: 'scale(1)'
                }
            },
            
            sparkle: {
                '0%, 100%': {
                    opacity: '0',
                    transform: 'scale(0.5)'
                },
                '50%': {
                    opacity: '1',
                    transform: 'scale(1.2)'
                }
            }
        }
    },
    
    // Component-specific styling
    components: {
        button: {
            padding: 'var(--spacing-md) var(--spacing-xl)',
            borderRadius: 'var(--border-radius-candy)',
            background: 'var(--button-gradient)',
            color: 'var(--text-on-primary)',
            fontFamily: 'var(--font-button)',
            fontWeight: 'var(--font-weight-bold)',
            textTransform: 'none',
            letterSpacing: 'var(--letter-spacing-wide)',
            boxShadow: 'var(--shadow-md)',
            transition: 'all var(--duration-normal) var(--easing-bounce)'
        },
        
        card: {
            background: 'var(--card-background)',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid var(--border-light)'
        },
        
        input: {
            background: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-md)',
            fontSize: 'var(--font-size-lg)',
            fontFamily: 'var(--font-body)'
        },
        
        modal: {
            background: 'var(--background)',
            borderRadius: 'var(--border-radius-2xl)',
            boxShadow: 'var(--shadow-2xl)',
            border: '3px solid var(--primary)'
        }
    },
    
    // Accessibility features
    accessibility: {
        highContrast: false,
        reducedMotion: false,
        largeText: true,
        colorBlindFriendly: true,
        focusVisible: {
            outline: '3px solid var(--accent)',
            outlineOffset: '2px'
        }
    },
    
    // Theme metadata
    metadata: {
        author: 'LingoQuest Team',
        version: '1.0.0',
        created: '2024-06-07',
        updated: '2024-06-07',
        description: 'A sweet and colorful theme inspired by candy and confections',
        tags: ['colorful', 'playful', 'candy', 'student-friendly', 'bright'],
        targetAudience: ['students', 'children', 'young-adults'],
        features: [
            'Bright candy colors',
            'Playful animations',
            'Rounded corners',
            'Gradient backgrounds',
            'Large touch targets',
            'High contrast text'
        ]
    }
};

// Export theme configuration
export default candyPopTheme;

// Utility function to apply candy pop theme
export function applyCandyPopTheme() {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(candyPopTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(candyPopTheme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
    });
    
    Object.entries(candyPopTheme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--border-radius-${key}`, value);
    });
    
    Object.entries(candyPopTheme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Add theme class to body
    document.body.classList.add('theme-candy-pop');
    
    // Set theme attribute
    document.documentElement.setAttribute('data-theme', 'candy-pop');
    
    console.log('🍭 Candy Pop theme applied successfully');
}

// Utility function to get color palette
export function getCandyPopColorPalette() {
    return {
        primary: candyPopTheme.colors.primary,
        secondary: candyPopTheme.colors.secondary,
        accent: candyPopTheme.colors.accent,
        background: candyPopTheme.colors.background,
        text: candyPopTheme.colors.textPrimary,
        success: candyPopTheme.colors.success,
        warning: candyPopTheme.colors.warning,
        error: candyPopTheme.colors.error,
        info: candyPopTheme.colors.info
    };
}

// Animation helpers
export function createCandyAnimation(element, type = 'bounce') {
    if (!element) return;
    
    const animations = {
        bounce: 'candyBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        float: 'candyFloat 3s ease-in-out infinite',
        pop: 'candyPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        sparkle: 'candySparkle 1s ease-in-out infinite'
    };
    
    element.style.animation = animations[type] || animations.bounce;
}

// Theme validation
export function validateCandyPopTheme() {
    const requiredProperties = ['colors', 'typography', 'spacing', 'borderRadius', 'shadows'];
    const isValid = requiredProperties.every(prop => candyPopTheme.hasOwnProperty(prop));
    
    if (!isValid) {
        console.error('❌ Candy Pop theme validation failed');
        return false;
    }
    
    console.log('✅ Candy Pop theme validation passed');
    return true;
}


