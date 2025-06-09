








/**
 * Purpose: Dark theme configuration for reduced eye strain and low-light environments
 * Key features: Dark backgrounds, high contrast, eye comfort, accessibility optimized
 * Dependencies: CSS custom properties, theme system, accessibility standards
 * Related helpers: themeManager, CSS transitions, accessibility utilities
 * Function names: getThemeConfig, applyDarkMode, generateDarkStyles, setComfortableFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 19:55 | File: js/data/themes/dark.js
 */

export const darkTheme = {
    // Theme metadata
    id: 'dark',
    name: 'Dark',
    category: 'senior',
    description: 'Dark interface optimized for eye comfort and low-light use',
    targetAudience: 'all',
    version: '1.0.0',
    
    // Color palette - dark and comfortable
    colors: {
        // Primary colors - Softer blues for dark theme
        primary: '#90CAF9',        // Light blue (easier on eyes)
        primaryDark: '#1976D2',    // Standard blue for accents
        primaryLight: '#BBDEFB',   // Very light blue
        
        // Secondary colors - Muted grays
        secondary: '#B0BEC5',      // Light gray
        secondaryDark: '#607D8B',  // Medium gray
        secondaryLight: '#CFD8DC', // Very light gray
        
        // Accent colors - Comfortable for dark backgrounds
        accent: '#81C784',         // Soft green
        accentWarning: '#FFB74D',  // Soft orange
        accentDanger: '#E57373',   // Soft red
        
        // Background colors - Dark and comfortable
        background: '#121212',     // Material Design dark surface
        backgroundSecondary: '#1E1E1E', // Slightly lighter
        backgroundTertiary: '#252525',  // Card background
        
        // Surface colors for elevated elements
        surface: '#1E1E1E',        // Dark cards
        surfaceVariant: '#252525', // Slightly different surface
        surfaceHover: '#2C2C2C',   // Hover state
        surfaceActive: '#333333',  // Active state
        
        // Text colors optimized for dark backgrounds
        textPrimary: '#FFFFFF',    // Pure white for high contrast
        textSecondary: '#E0E0E0',  // Light gray for secondary text
        textMuted: '#BDBDBD',      // Muted text
        textInverse: '#121212',    // Dark text for light backgrounds
        
        // Interactive element colors
        linkColor: '#90CAF9',      // Light blue links
        linkHover: '#BBDEFB',      // Lighter blue on hover
        linkVisited: '#CE93D8',    // Light purple for visited
        
        // Status and feedback colors - softer for dark theme
        success: '#81C784',        // Soft green
        info: '#4FC3F7',          // Light blue
        warning: '#FFB74D',        // Soft orange
        danger: '#E57373',         // Soft red
        
        // Border and divider colors
        border: '#424242',         // Medium gray border
        borderSubtle: '#333333',   // Subtle border
        borderFocus: '#90CAF9',    // Focus indicator
        
        // Shadow colors for dark theme
        shadowLight: 'rgba(0, 0, 0, 0.4)',   // Darker shadows
        shadowMedium: 'rgba(0, 0, 0, 0.6)',  // Medium shadow
        shadowDark: 'rgba(0, 0, 0, 0.8)'     // Dark shadow
    },
    
    // Typography optimized for dark backgrounds
    typography: {
        // Font families - same as light theme for consistency
        fontFamily: {
            primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            secondary: "Georgia, 'Times New Roman', Times, serif",
            monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
            display: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        
        // Font sizes - slightly larger for better readability in dark
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '36px',
            '5xl': '48px'
        },
        
        // Line heights - more generous for eye comfort
        lineHeight: {
            tight: 1.3,    // Slightly more space
            normal: 1.6,   // More comfortable reading
            relaxed: 1.75, // Generous spacing
            loose: 2.1     // Very comfortable
        },
        
        // Font weights
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        },
        
        // Letter spacing for dark theme readability
        letterSpacing: {
            tighter: '-0.025em',
            tight: '0em',
            normal: '0.025em',  // Slightly more space
            wide: '0.05em',
            wider: '0.075em',
            widest: '0.1em'
        }
    },
    
    // Component styles optimized for dark theme
    components: {
        // Card components
        card: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px var(--shadow-medium)',
            padding: '24px',
            
            // Hover effects
            hover: {
                borderColor: 'var(--border-focus)',
                boxShadow: '0 6px 12px var(--shadow-dark)',
                transform: 'translateY(-1px)'
            },
            
            // Focus styles for accessibility
            focus: {
                outline: '2px solid var(--border-focus)',
                outlineOffset: '2px'
            }
        },
        
        // Button styles with dark theme considerations
        button: {
            borderRadius: '6px',
            padding: '12px 24px',
            fontSize: 'var(--font-base)',
            fontWeight: '500',
            lineHeight: '1.25',
            border: '1px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            
            // Button variants
            primary: {
                backgroundColor: 'var(--primary)',
                color: 'var(--text-inverse)',
                border: '1px solid var(--primary)'
            },
            
            secondary: {
                backgroundColor: 'var(--secondary)',
                color: 'var(--text-inverse)',
                border: '1px solid var(--secondary)'
            },
            
            outline: {
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                border: '1px solid var(--primary)'
            },
            
            ghost: {
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid transparent'
            },
            
            // Button states
            hover: {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px var(--shadow-medium)',
                filter: 'brightness(1.1)'
            },
            
            active: {
                transform: 'translateY(0)',
                boxShadow: '0 2px 4px var(--shadow-light)'
            },
            
            disabled: {
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none'
            },
            
            // Focus styles for accessibility
            focus: {
                outline: '2px solid var(--border-focus)',
                outlineOffset: '2px'
            }
        },
        
        // Input field styles for dark theme
        input: {
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '12px 16px',
            fontSize: 'var(--font-base)',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            
            // Input states
            focus: {
                borderColor: 'var(--border-focus)',
                boxShadow: '0 0 0 3px rgba(144, 202, 249, 0.2)',
                outline: 'none'
            },
            
            disabled: {
                backgroundColor: 'var(--background-tertiary)',
                color: 'var(--text-muted)',
                cursor: 'not-allowed'
            },
            
            error: {
                borderColor: 'var(--danger)',
                boxShadow: '0 0 0 3px rgba(229, 115, 115, 0.2)'
            }
        },
        
        // Navigation elements
        navigation: {
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 24px',
            
            link: {
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                
                hover: {
                    backgroundColor: 'var(--surface-hover)',
                    color: 'var(--primary)'
                },
                
                active: {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-inverse)'
                }
            }
        }
    },
    
    // Animation settings - same as light theme
    animations: {
        duration: {
            fast: '150ms',
            normal: '200ms',
            slow: '300ms',
            slower: '500ms'
        },
        
        easing: {
            linear: 'linear',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        
        reducedMotion: {
            enabled: true,
            fallbackDuration: '0ms'
        }
    },
    
    // Game-specific styling for dark theme
    gameElements: {
        // Score display
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-2xl)',
            fontWeight: '700',
            color: 'var(--primary)',
            textAlign: 'center',
            textShadow: '0 0 8px rgba(144, 202, 249, 0.3)'
        },
        
        // Timer component
        timer: {
            fontFamily: 'var(--font-monospace)',
            fontSize: 'var(--font-xl)',
            fontWeight: '600',
            color: 'var(--text-primary)',
            
            warning: {
                color: 'var(--warning)',
                textShadow: '0 0 6px rgba(255, 183, 77, 0.4)'
            },
            
            critical: {
                color: 'var(--danger)',
                fontWeight: '700',
                textShadow: '0 0 8px rgba(229, 115, 115, 0.5)'
            }
        },
        
        // Question card styling
        questionCard: {
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 6px 16px var(--shadow-medium)',
            
            question: {
                fontSize: 'var(--font-lg)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--text-primary)',
                marginBottom: '24px'
            }
        },
        
        // Answer button styling
        answerButton: {
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: '8px',
            padding: '16px 20px',
            fontSize: 'var(--font-base)',
            color: 'var(--text-primary)',
            textAlign: 'left',
            cursor: 'pointer',
            marginBottom: '12px',
            
            hover: {
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--surface-hover)',
                boxShadow: '0 0 12px rgba(144, 202, 249, 0.2)'
            },
            
            selected: {
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--primary)',
                color: 'var(--text-inverse)',
                boxShadow: '0 0 16px rgba(144, 202, 249, 0.4)'
            },
            
            correct: {
                borderColor: 'var(--success)',
                backgroundColor: 'var(--success)',
                color: 'var(--text-inverse)',
                boxShadow: '0 0 16px rgba(129, 199, 132, 0.4)'
            },
            
            incorrect: {
                borderColor: 'var(--danger)',
                backgroundColor: 'var(--danger)',
                color: 'var(--text-inverse)',
                boxShadow: '0 0 16px rgba(229, 115, 115, 0.4)'
            }
        }
    },
    
    // Dark theme specific accessibility features
    accessibility: {
        focusRing: {
            width: '2px',
            style: 'solid',
            color: 'var(--border-focus)',
            offset: '2px'
        },
        
        highContrast: {
            enabled: true,
            textRatio: 7,    // Higher contrast for dark theme
            largeTextRatio: 4.5
        },
        
        eyeComfort: {
            enabled: true,
            blueLight: 'reduced',
            brightness: 'comfortable'
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        '--primary': 'var(--primary)',
        '--secondary': 'var(--secondary)',
        '--background': 'var(--background)',
        '--surface': 'var(--surface)',
        '--text-primary': 'var(--text-primary)',
        '--text-secondary': 'var(--text-secondary)',
        '--border': 'var(--border)',
        '--shadow': 'var(--shadow-medium)',
        '--font-primary': 'var(--font-primary)',
        '--font-base': 'var(--font-base)',
        '--line-height-normal': 'var(--line-height-normal)'
    }
};

// Utility functions for dark theme
export const darkThemeUtils = {
    applyTheme() {
        const root = document.documentElement;
        
        Object.entries(darkTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        Object.entries(darkTheme.typography.fontSize).forEach(([key, value]) => {
            root.style.setProperty(`--font-${key}`, value);
        });
        
        Object.entries(darkTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light', 'theme-auto');
        
        root.style.setProperty('color-scheme', 'dark');
        
        console.log('🌙 Dark theme applied');
    },
    
    removeTheme() {
        document.body.classList.remove('theme-dark');
        console.log('🌙 Dark theme removed');
    },
    
    isActive() {
        return document.body.classList.contains('theme-dark');
    }
};

export default darkTheme;




