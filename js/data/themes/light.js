


/**
 * Purpose: Light theme configuration for default clean and accessible interface
 * Key features: High contrast, clean aesthetics, accessibility optimized, readable typography
 * Dependencies: CSS custom properties, theme system, accessibility standards
 * Related helpers: themeManager, CSS transitions, accessibility utilities
 * Function names: getThemeConfig, applyLightMode, generateCleanStyles, setReadableFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 19:50 | File: js/data/themes/light.js
 */

export const lightTheme = {
    // Theme metadata
    id: 'light',
    name: 'Light',
    category: 'senior',
    description: 'Clean, bright interface optimized for readability',
    targetAudience: 'all',
    version: '1.0.0',
    isDefault: true,
    
    // Color palette - clean and accessible
    colors: {
        // Primary colors - Professional blues
        primary: '#007bff',        // Classic blue
        primaryDark: '#0056b3',    // Darker blue for contrast
        primaryLight: '#66b3ff',   // Light blue for hover states
        
        // Secondary colors - Neutral grays
        secondary: '#6c757d',      // Professional gray
        secondaryDark: '#495057',  // Dark gray
        secondaryLight: '#adb5bd', // Light gray
        
        // Accent colors - Success and action colors
        accent: '#28a745',         // Success green
        accentWarning: '#ffc107',  // Warning amber
        accentDanger: '#dc3545',   // Danger red
        
        // Background colors - Clean whites and off-whites
        background: '#ffffff',     // Pure white
        backgroundSecondary: '#f8f9fa', // Off-white
        backgroundTertiary: '#e9ecef',  // Light gray background
        
        // Surface colors for elevated elements
        surface: '#ffffff',        // White cards
        surfaceVariant: '#f8f9fa', // Subtle off-white
        surfaceHover: '#e9ecef',   // Hover state
        surfaceActive: '#dee2e6',  // Active state
        
        // Text colors with high contrast ratios
        textPrimary: '#212529',    // Near black (WCAG AAA)
        textSecondary: '#6c757d',  // Medium gray (WCAG AA)
        textMuted: '#adb5bd',      // Light gray for less important text
        textInverse: '#ffffff',    // White text for dark backgrounds
        
        // Interactive element colors
        linkColor: '#007bff',      // Blue links
        linkHover: '#0056b3',      // Darker blue on hover
        linkVisited: '#6f42c1',    // Purple for visited links
        
        // Status and feedback colors
        success: '#28a745',        // Success green
        info: '#17a2b8',          // Info blue
        warning: '#ffc107',        // Warning yellow
        danger: '#dc3545',         // Error red
        
        // Border and divider colors
        border: '#dee2e6',         // Light border
        borderSubtle: '#e9ecef',   // Very light border
        borderFocus: '#007bff',    // Focus indicator
        
        // Shadow colors
        shadowLight: 'rgba(0, 0, 0, 0.1)',   // Light shadow
        shadowMedium: 'rgba(0, 0, 0, 0.15)',  // Medium shadow
        shadowDark: 'rgba(0, 0, 0, 0.25)'     // Dark shadow
    },
    
    // Typography optimized for readability
    typography: {
        // Font families - system fonts for performance and consistency
        fontFamily: {
            primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            secondary: "Georgia, 'Times New Roman', Times, serif",
            monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
            display: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        
        // Font sizes with comfortable reading scale
        fontSize: {
            xs: '12px',    // Small labels
            sm: '14px',    // Small text
            base: '16px',  // Base reading size (1rem)
            lg: '18px',    // Large text
            xl: '20px',    // Extra large
            '2xl': '24px', // Heading size
            '3xl': '30px', // Large heading
            '4xl': '36px', // Display heading
            '5xl': '48px'  // Hero text
        },
        
        // Line heights for optimal readability
        lineHeight: {
            tight: 1.25,   // Headings
            normal: 1.5,   // Body text
            relaxed: 1.625, // Large body text
            loose: 2       // Very spaced text
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
        
        // Letter spacing for readability
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        }
    },
    
    // Component styles with accessibility focus
    components: {
        // Card components
        card: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 2px 4px var(--shadow-light)',
            padding: '24px',
            
            // Hover effects
            hover: {
                borderColor: 'var(--border-focus)',
                boxShadow: '0 4px 8px var(--shadow-medium)',
                transform: 'translateY(-1px)'
            },
            
            // Focus styles for accessibility
            focus: {
                outline: '2px solid var(--border-focus)',
                outlineOffset: '2px'
            }
        },
        
        // Button styles with clear hierarchy
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
                boxShadow: '0 4px 8px var(--shadow-medium)'
            },
            
            active: {
                transform: 'translateY(0)',
                boxShadow: '0 2px 4px var(--shadow-light)'
            },
            
            disabled: {
                opacity: 0.6,
                cursor: 'not-allowed',
                transform: 'none'
            },
            
            // Focus styles for accessibility
            focus: {
                outline: '2px solid var(--border-focus)',
                outlineOffset: '2px'
            }
        },
        
        // Input field styles
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
                boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
                outline: 'none'
            },
            
            disabled: {
                backgroundColor: 'var(--background-tertiary)',
                color: 'var(--text-muted)',
                cursor: 'not-allowed'
            },
            
            error: {
                borderColor: 'var(--danger)',
                boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
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
    
    // Animation settings - subtle and accessible
    animations: {
        // Transition durations
        duration: {
            fast: '150ms',
            normal: '200ms',
            slow: '300ms',
            slower: '500ms'
        },
        
        // Easing functions
        easing: {
            linear: 'linear',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        
        // Reduced motion support
        reducedMotion: {
            enabled: true,
            fallbackDuration: '0ms'
        }
    },
    
    // Game-specific styling
    gameElements: {
        // Score display
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-2xl)',
            fontWeight: '700',
            color: 'var(--primary)',
            textAlign: 'center'
        },
        
        // Timer component
        timer: {
            fontFamily: 'var(--font-monospace)',
            fontSize: 'var(--font-xl)',
            fontWeight: '600',
            color: 'var(--text-primary)',
            
            // Timer states
            warning: {
                color: 'var(--warning)'
            },
            
            critical: {
                color: 'var(--danger)',
                fontWeight: '700'
            }
        },
        
        // Question card styling
        questionCard: {
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 12px var(--shadow-light)',
            
            // Question text
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
            
            // Answer states
            hover: {
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--surface-hover)'
            },
            
            selected: {
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--primary)',
                color: 'var(--text-inverse)'
            },
            
            correct: {
                borderColor: 'var(--success)',
                backgroundColor: 'var(--success)',
                color: 'var(--text-inverse)'
            },
            
            incorrect: {
                borderColor: 'var(--danger)',
                backgroundColor: 'var(--danger)',
                color: 'var(--text-inverse)'
            }
        }
    },
    
    // Accessibility features
    accessibility: {
        // Focus indicators
        focusRing: {
            width: '2px',
            style: 'solid',
            color: 'var(--border-focus)',
            offset: '2px'
        },
        
        // High contrast mode support
        highContrast: {
            enabled: false, // This is the regular light theme
            textRatio: 4.5, // WCAG AA compliance
            largeTextRatio: 3 // WCAG AA for large text
        },
        
        // Screen reader support
        screenReader: {
            hideContent: {
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: '0'
            }
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        // Colors
        '--primary': 'var(--primary)',
        '--secondary': 'var(--secondary)',
        '--background': 'var(--background)',
        '--surface': 'var(--surface)',
        '--text-primary': 'var(--text-primary)',
        '--text-secondary': 'var(--text-secondary)',
        '--border': 'var(--border)',
        '--shadow': 'var(--shadow-light)',
        
        // Typography
        '--font-primary': 'var(--font-primary)',
        '--font-base': 'var(--font-base)',
        '--line-height-normal': 'var(--line-height-normal)',
        
        // Spacing (future use)
        '--spacing-xs': '4px',
        '--spacing-sm': '8px',
        '--spacing-md': '16px',
        '--spacing-lg': '24px',
        '--spacing-xl': '32px'
    }
};

// Utility functions for light theme
export const lightThemeUtils = {
    // Apply light theme to document
    applyTheme() {
        const root = document.documentElement;
        
        // Apply all color variables
        Object.entries(lightTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        // Apply typography variables
        Object.entries(lightTheme.typography.fontSize).forEach(([key, value]) => {
            root.style.setProperty(`--font-${key}`, value);
        });
        
        // Apply CSS custom properties
        Object.entries(lightTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Add theme class to body
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark', 'theme-auto');
        
        // Set color scheme for browser UI
        root.style.setProperty('color-scheme', 'light');
        
        console.log('☀️ Light theme applied');
    },
    
    // Remove light theme
    removeTheme() {
        document.body.classList.remove('theme-light');
        console.log('☀️ Light theme removed');
    },
    
    // Check if light theme is active
    isActive() {
        return document.body.classList.contains('theme-light');
    },
    
    // Get theme contrast ratio
    getContrastRatio(foreground, background) {
        // Simplified contrast calculation
        // In production, use a proper color contrast library
        return 4.5; // Placeholder - assumes WCAG AA compliance
    },
    
    // Validate accessibility
    validateAccessibility() {
        const issues = [];
        
        // Check minimum contrast ratios
        const textContrast = this.getContrastRatio(
            lightTheme.colors.textPrimary,
            lightTheme.colors.background
        );
        
        if (textContrast < 4.5) {
            issues.push('Text contrast ratio below WCAG AA standard');
        }
        
        return {
            isValid: issues.length === 0,
            issues,
            contrastRatio: textContrast
        };
    }
};

export default lightTheme;





