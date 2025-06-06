



// LingoQuest - UI Configuration
// ES6 Module for user interface settings, layouts, and visual behavior
// Centralized configuration for all UI elements and interactions

export const uiConfig = {
    // Application layout settings
    layout: {
        maxWidth: 1200,          // maximum container width (px)
        minWidth: 320,           // minimum supported width (px)
        headerHeight: 60,        // header height (px)
        footerHeight: 40,        // footer height (px)
        sidebarWidth: 250,       // sidebar width when expanded (px)
        containerPadding: 20,    // main container padding (px)
        gridGap: 16,             // gap between grid items (px)
        borderRadius: 8,         // default border radius (px)
        
        // Responsive breakpoints
        breakpoints: {
            mobile: 576,         // mobile breakpoint (px)
            tablet: 768,         // tablet breakpoint (px)
            desktop: 992,        // desktop breakpoint (px)
            large: 1200          // large screen breakpoint (px)
        }
    },
    
    // Screen configurations
    screens: {
        home: {
            id: 'home-screen',
            title: 'Welcome to LingoQuest',
            showHeader: true,
            showFooter: false,
            animation: 'fadeIn',
            duration: 300,
            centerContent: true
        },
        
        game: {
            id: 'game-screen',
            title: 'Game In Progress',
            showHeader: false,
            showFooter: false,
            animation: 'slideLeft',
            duration: 400,
            fullscreen: true,
            preventBack: true
        },
        
        results: {
            id: 'results-screen',
            title: 'Game Results',
            showHeader: true,
            showFooter: true,
            animation: 'zoomIn',
            duration: 500,
            centerContent: true
        },
        
        settings: {
            id: 'settings-screen',
            title: 'Settings',
            showHeader: true,
            showFooter: false,
            animation: 'slideUp',
            duration: 350,
            scrollable: true
        },
        
        instructions: {
            id: 'instructions-screen',
            title: 'How to Play',
            showHeader: true,
            showFooter: false,
            animation: 'fadeIn',
            duration: 300,
            scrollable: true
        }
    },
    
    // Navigation configuration
    navigation: {
        showBackButton: true,
        backButtonText: 'Back',
        breadcrumbs: false,
        tabNavigation: false,
        swipeNavigation: true,
        keyboardNavigation: true,
        
        // Navigation animations
        transitions: {
            default: 'slide',
            duration: 300,
            easing: 'ease-in-out'
        },
        
        // Mobile navigation
        mobile: {
            hamburgerMenu: false,
            bottomNavigation: false,
            swipeThreshold: 50    // pixels to trigger swipe
        }
    },
    
    // Button configurations
    buttons: {
        sizes: {
            small: {
                height: 32,
                padding: '6px 12px',
                fontSize: 14
            },
            normal: {
                height: 40,
                padding: '8px 16px',
                fontSize: 16
            },
            large: {
                height: 48,
                padding: '12px 24px',
                fontSize: 18
            },
            extraLarge: {
                height: 56,
                padding: '16px 32px',
                fontSize: 20
            }
        },
        
        styles: {
            primary: {
                background: '#007bff',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6
            },
            secondary: {
                background: '#6c757d',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6
            },
            success: {
                background: '#28a745',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6
            },
            danger: {
                background: '#dc3545',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6
            },
            outline: {
                background: 'transparent',
                color: '#007bff',
                border: '2px solid #007bff',
                borderRadius: 6
            }
        },
        
        // Touch-friendly sizing for accessibility
        minTouchTarget: 44,      // minimum touch target size (px)
        spacing: 8               // spacing between buttons (px)
    },
    
    // Form elements
    forms: {
        inputHeight: 40,
        inputPadding: '8px 12px',
        inputBorderRadius: 4,
        labelSpacing: 8,
        fieldSpacing: 16,
        
        validation: {
            showInline: true,
            showSummary: false,
            highlightErrors: true,
            errorColor: '#dc3545',
            successColor: '#28a745'
        },
        
        // Select dropdowns
        select: {
            maxHeight: 200,      // dropdown max height (px)
            optionHeight: 36,    // individual option height (px)
            searchable: false    // enable search in dropdowns
        }
    },
    
    // Card components
    cards: {
        padding: 20,
        borderRadius: 8,
        shadow: '0 2px 8px rgba(0,0,0,0.1)',
        hoverShadow: '0 4px 16px rgba(0,0,0,0.15)',
        spacing: 16,
        
        // Card variants
        variants: {
            elevated: {
                shadow: '0 4px 12px rgba(0,0,0,0.15)'
            },
            flat: {
                shadow: 'none',
                border: '1px solid #e0e0e0'
            },
            outlined: {
                shadow: 'none',
                border: '2px solid #007bff'
            }
        }
    },
    
    // Modal and overlay settings
    modals: {
        backdropColor: 'rgba(0, 0, 0, 0.5)',
        maxWidth: 600,
        minWidth: 320,
        padding: 24,
        borderRadius: 12,
        animation: 'zoomIn',
        duration: 300,
        closeOnBackdrop: true,
        closeOnEscape: true,
        
        // Modal sizes
        sizes: {
            small: { width: 400, maxHeight: 300 },
            medium: { width: 600, maxHeight: 500 },
            large: { width: 800, maxHeight: 700 },
            fullscreen: { width: '100vw', height: '100vh' }
        }
    },
    
    // Toast notifications
    toasts: {
        position: 'top-right',   // top-left, top-right, bottom-left, bottom-right
        maxWidth: 400,
        minWidth: 300,
        padding: 16,
        borderRadius: 6,
        animation: 'slideInRight',
        duration: 300,
        
        // Auto-dismiss timings
        timeouts: {
            success: 3000,       // 3 seconds
            info: 4000,          // 4 seconds
            warning: 5000,       // 5 seconds
            error: 0             // manual dismiss only
        },
        
        // Toast types
        types: {
            success: {
                background: '#28a745',
                color: '#ffffff',
                icon: '✓'
            },
            error: {
                background: '#dc3545',
                color: '#ffffff',
                icon: '✗'
            },
            warning: {
                background: '#ffc107',
                color: '#212529',
                icon: '⚠'
            },
            info: {
                background: '#17a2b8',
                color: '#ffffff',
                icon: 'ℹ'
            }
        }
    },
    
    // Loading states
    loading: {
        spinnerSize: 40,
        spinnerColor: '#007bff',
        overlayColor: 'rgba(255, 255, 255, 0.8)',
        showProgress: true,
        showPercentage: false,
        minimumDuration: 500,    // minimum loading time (ms)
        
        // Loading animations
        animations: {
            spinner: 'spin',
            dots: 'pulse',
            bars: 'wave'
        }
    },
    
    // Typography settings
    typography: {
        fontFamilies: {
            primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            secondary: "'Georgia', 'Times New Roman', serif",
            monospace: "'Fira Code', 'Monaco', 'Consolas', monospace",
            dyslexic: "'OpenDyslexic', sans-serif"
        },
        
        fontSizes: {
            xs: 12,
            sm: 14,
            base: 16,
            lg: 18,
            xl: 20,
            '2xl': 24,
            '3xl': 30,
            '4xl': 36
        },
        
        lineHeights: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.75
        },
        
        fontWeights: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        }
    },
    
    // Animation settings
    animations: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500,
            slower: 800
        },
        
        easing: {
            linear: 'linear',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        
        // Predefined animations
        presets: {
            fadeIn: { opacity: [0, 1], duration: 300 },
            fadeOut: { opacity: [1, 0], duration: 300 },
            slideUp: { transform: ['translateY(20px)', 'translateY(0)'], duration: 400 },
            slideDown: { transform: ['translateY(-20px)', 'translateY(0)'], duration: 400 },
            zoomIn: { transform: ['scale(0.9)', 'scale(1)'], opacity: [0, 1], duration: 300 },
            bounce: { transform: ['scale(1)', 'scale(1.05)', 'scale(1)'], duration: 600 }
        },
        
        // Accessibility
        respectReducedMotion: true,
        fallbackToFade: true
    },
    
    // Color system
    colors: {
        // Semantic colors
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40',
        
        // Neutral grays
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827'
        }
    },
    
    // Accessibility settings
    accessibility: {
        focusRingWidth: 2,
        focusRingColor: '#007bff',
        focusRingOffset: 2,
        highContrastMode: false,
        reducedMotion: false,
        screenReaderOnly: true,
        
        // ARIA settings
        announcements: {
            politeness: 'polite',   // assertive, polite, off
            priority: 'medium'      // high, medium, low
        },
        
        // Keyboard navigation
        keyboard: {
            trapFocus: true,
            returnFocus: true,
            skipLinks: true
        }
    },
    
    // Game-specific UI
    game: {
        questionCard: {
            minHeight: 200,
            padding: 24,
            borderRadius: 12,
            animation: 'slideUp'
        },
        
        answerButtons: {
            minHeight: 48,
            spacing: 12,
            animation: 'fadeIn',
            staggerDelay: 100
        },
        
        timer: {
            size: 60,
            strokeWidth: 4,
            warningColor: '#ffc107',
            dangerColor: '#dc3545'
        },
        
        progress: {
            height: 8,
            borderRadius: 4,
            animation: true
        },
        
        score: {
            fontSize: 24,
            fontWeight: 'bold',
            animateChanges: true
        }
    },
    
    // Theme switching
    themes: {
        transitionDuration: 300,
        animateChange: true,
        persistSelection: true,
        systemPreference: true
    }
};

// Screen transition types
export const TRANSITION_TYPES = {
    FADE: 'fade',
    SLIDE_LEFT: 'slideLeft',
    SLIDE_RIGHT: 'slideRight',
    SLIDE_UP: 'slideUp',
    SLIDE_DOWN: 'slideDown',
    ZOOM: 'zoom',
    FLIP: 'flip'
};

// UI component states
export const UI_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    DISABLED: 'disabled',
    ACTIVE: 'active',
    FOCUSED: 'focused',
    HOVER: 'hover'
};

// Default export
export default uiConfig;



