

/**
 * Purpose: Space galaxy theme configuration for cosmic deep space aesthetic
 * Key features: Cosmic colors, starfield effects, nebula gradients, space animations
 * Dependencies: CSS custom properties, theme system, student profile settings
 * Related helpers: themeManager, CSS transitions, cosmic color palettes, particle effects
 * Function names: getThemeConfig, applySpaceEffects, generateStarfield, setCosmicFont
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:20 | File: js/data/themes/space-galaxy.js
 */

export const spaceGalaxyTheme = {
    // Theme metadata
    id: 'space-galaxy',
    name: 'Space Galaxy',
    category: 'student',
    description: 'Cosmic deep space aesthetic with nebula effects',
    targetAudience: 'students',
    version: '1.0.0',
    
    // Color palette inspired by deep space and galaxies
    colors: {
        // Primary colors - Deep space blues and purples
        primary: '#3F51B5',        // Deep space blue
        primaryDark: '#1A237E',    // Darker space blue
        primaryLight: '#7986CB',   // Light cosmic blue
        
        // Secondary colors - Cosmic purples and magentas
        secondary: '#9C27B0',      // Cosmic purple
        secondaryDark: '#4A148C',  // Deep purple
        secondaryLight: '#CE93D8', // Light purple
        
        // Accent colors - Stellar highlights
        accent: '#E91E63',         // Pink nebula
        accentBlue: '#03DAC6',     // Cyan star
        accentGold: '#FFB300',     // Golden star
        
        // Background colors - Deep space blacks and dark blues
        background: '#0A0E27',     // Deep space black
        backgroundSecondary: '#1A1A2E', // Dark navy
        backgroundTertiary: '#16213E',  // Midnight blue
        
        // Surface colors for cards and components
        surface: '#1E1E2E',        // Dark surface
        surfaceVariant: '#2A2A3E', // Lighter surface
        surfaceHover: '#3A3A4E',   // Hover surface
        surfaceGlow: '#4A4A6E',    // Glowing surface
        
        // Text colors with cosmic contrast
        textPrimary: '#FFFFFF',    // Pure starlight white
        textSecondary: '#B0BEC5',  // Pale blue-gray
        textAccent: '#BB86FC',     // Purple accent text
        textMuted: '#78909C',      // Muted blue-gray
        
        // Game-specific colors
        gameSuccess: '#00E676',    // Green nebula
        gameError: '#FF5252',      // Red giant star
        gameWarning: '#FF9800',    // Orange dwarf
        gameInfo: '#2196F3',       // Blue supergiant
        
        // Button states
        buttonDefault: '#2A2A4A',  // Dark space button
        buttonHover: '#4A4A6A',    // Hover glow
        buttonActive: '#6A6A8A',   // Active state
        buttonDisabled: '#1A1A2A', // Disabled dark
        
        // Border and outline colors
        border: '#404060',         // Subtle cosmic border
        borderBright: '#7986CB',   // Bright cosmic border
        borderDanger: '#FF5252',   // Danger red
        
        // Special cosmic effect colors
        starColor: '#FFFFFF',      // Bright white stars
        nebulaBlue: '#1E88E5',     // Blue nebula
        nebulaPink: '#E91E63',     // Pink nebula
        nebulaPurple: '#9C27B0',   // Purple nebula
        galaxyCore: '#FFB300',     // Golden galaxy core
        blackHole: '#000000',      // Pure black
        comet: '#00E5FF'           // Bright cyan comet
    },
    
    // Typography with futuristic space fonts
    typography: {
        // Font families - sci-fi and modern fonts
        fontFamily: {
            primary: "'Exo 2', 'Roboto', sans-serif",
            secondary: "'Orbitron', 'Courier New', monospace",
            body: "'Roboto', 'Helvetica Neue', sans-serif",
            display: "'Audiowide', 'Impact', sans-serif"
        },
        
        // Font sizes optimized for space aesthetic
        fontSize: {
            xs: '11px',   // Small cosmic text
            sm: '13px',   // Small text
            base: '15px', // Base reading size
            lg: '17px',   // Large text
            xl: '20px',   // Extra large
            '2xl': '24px', // Display size
            '3xl': '32px', // Big display
            '4xl': '40px'  // Huge display
        },
        
        // Line heights for futuristic readability
        lineHeight: {
            tight: 1.2,   // Compact space text
            normal: 1.4,  // Standard spacing
            relaxed: 1.6  // Loose spacing
        },
        
        // Font weights
        fontWeight: {
            light: 300,   // Light weight
            normal: 400,  // Regular
            medium: 500,  // Medium
            semibold: 600, // Semi-bold
            bold: 700,    // Bold
            extrabold: 800 // Extra bold
        },
        
        // Letter spacing for cosmic effect
        letterSpacing: {
            tight: '-0.25px',
            normal: '0px',
            wide: '0.5px',
            wider: '1px',
            widest: '2px'
        }
    },
    
    // Component styles with cosmic aesthetics
    components: {
        // Card components with space-age design
        card: {
            background: 'linear-gradient(135deg, var(--surface), var(--surface-variant))',
            border: '1px solid var(--border-bright)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(63, 81, 181, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            
            // Hover effects with cosmic glow
            hover: {
                borderColor: 'var(--primary-light)',
                boxShadow: '0 12px 40px rgba(63, 81, 181, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)'
            }
        },
        
        // Button styles with space-age aesthetics
        button: {
            background: 'linear-gradient(135deg, var(--button-default), var(--button-hover))',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-base)',
            padding: '14px 28px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            
            // Button variants
            primary: {
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'var(--text-primary)',
                boxShadow: '0 6px 20px rgba(63, 81, 181, 0.4)',
                border: 'none'
            },
            
            secondary: {
                background: 'linear-gradient(135deg, var(--secondary), var(--secondary-dark))',
                color: 'var(--text-primary)',
                boxShadow: '0 6px 20px rgba(156, 39, 176, 0.4)',
                border: 'none'
            },
            
            // Hover and active states
            hover: {
                background: 'linear-gradient(135deg, var(--button-hover), var(--button-active))',
                boxShadow: '0 8px 25px rgba(63, 81, 181, 0.6)',
                transform: 'translateY(-1px)'
            },
            
            active: {
                background: 'var(--button-active)',
                transform: 'translateY(0px)'
            }
        },
        
        // Input fields with futuristic styling
        input: {
            background: 'rgba(30, 30, 46, 0.8)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-base)',
            padding: '14px 16px',
            backdropFilter: 'blur(10px)',
            
            focus: {
                borderColor: 'var(--primary)',
                boxShadow: '0 0 0 3px rgba(63, 81, 181, 0.3), 0 0 20px rgba(63, 81, 181, 0.2)',
                outline: 'none'
            }
        }
    },
    
    // Animation effects with cosmic movement
    animations: {
        // Transition durations
        duration: {
            fast: '200ms',
            normal: '400ms',
            slow: '600ms',
            cosmic: '1200ms'
        },
        
        // Easing functions for space-like motion
        easing: {
            cosmic: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Smooth cosmic
            orbit: 'cubic-bezier(0.4, 0, 0.6, 1)', // Orbital motion
            warp: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' // Warp effect
        },
        
        // Special space animations
        effects: {
            starTwinkle: {
                keyframes: {
                    '0%': { opacity: 0.3, transform: 'scale(1)' },
                    '50%': { opacity: 1, transform: 'scale(1.2)' },
                    '100%': { opacity: 0.3, transform: 'scale(1)' }
                },
                duration: '2s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            },
            
            nebulaPulse: {
                keyframes: {
                    '0%': { 
                        boxShadow: '0 0 20px rgba(233, 30, 99, 0.3)',
                        background: 'var(--surface)'
                    },
                    '50%': { 
                        boxShadow: '0 0 40px rgba(233, 30, 99, 0.8)',
                        background: 'var(--surface-glow)'
                    },
                    '100%': { 
                        boxShadow: '0 0 20px rgba(233, 30, 99, 0.3)',
                        background: 'var(--surface)'
                    }
                },
                duration: '3s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            },
            
            galaxyRotate: {
                keyframes: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                duration: '20s',
                iterationCount: 'infinite',
                timingFunction: 'linear'
            },
            
            cometTrail: {
                keyframes: {
                    '0%': { 
                        transform: 'translateX(-100vw) translateY(50px)',
                        opacity: 0 
                    },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 1 },
                    '100%': { 
                        transform: 'translateX(100vw) translateY(-50px)',
                        opacity: 0 
                    }
                },
                duration: '8s',
                iterationCount: 'infinite',
                timingFunction: 'ease-in-out'
            }
        }
    },
    
    // Game-specific styling
    gameElements: {
        // Score display with cosmic styling
        score: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-2xl)',
            fontWeight: '700',
            color: 'var(--accent-gold)',
            textShadow: '0 0 20px var(--accent-gold), 0 0 40px var(--accent-gold)',
            letterSpacing: '2px'
        },
        
        // Timer with cosmic urgency
        timer: {
            fontFamily: 'var(--font-secondary)',
            fontSize: 'var(--font-xl)',
            fontWeight: '600',
            color: 'var(--text-primary)',
            
            warning: {
                color: 'var(--game-warning)',
                animation: 'nebulaPulse 2s infinite'
            },
            
            critical: {
                color: 'var(--game-error)',
                animation: 'starTwinkle 0.5s infinite'
            }
        },
        
        // Question cards with space station styling
        questionCard: {
            background: 'linear-gradient(135deg, var(--surface), var(--surface-variant))',
            border: '2px solid var(--primary)',
            borderRadius: '16px',
            boxShadow: '0 12px 48px rgba(63, 81, 181, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
            padding: '32px',
            backdropFilter: 'blur(15px)',
            
            // Cosmic border animation
            borderImage: 'linear-gradient(45deg, var(--primary), var(--secondary), var(--accent)) 1',
            
            // Subtle hover animation
            hover: {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 64px rgba(63, 81, 181, 0.6)'
            }
        },
        
        // Answer buttons with spacecraft styling
        answerButton: {
            background: 'linear-gradient(135deg, var(--surface), var(--surface-variant))',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: 'var(--text-primary)',
            fontSize: 'var(--font-base)',
            padding: '18px 20px',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            
            hover: {
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                borderColor: 'var(--primary-light)',
                boxShadow: '0 6px 20px rgba(63, 81, 181, 0.4)',
                transform: 'translateX(4px)'
            },
            
            correct: {
                background: 'linear-gradient(135deg, var(--game-success), #00C853)',
                borderColor: 'var(--game-success)',
                boxShadow: '0 8px 25px rgba(0, 230, 118, 0.5)',
                color: 'var(--background)'
            },
            
            incorrect: {
                background: 'linear-gradient(135deg, var(--game-error), #D32F2F)',
                borderColor: 'var(--game-error)',
                boxShadow: '0 8px 25px rgba(255, 82, 82, 0.5)',
                color: 'var(--text-primary)'
            }
        }
    },
    
    // Special cosmic effects
    effects: {
        // Starfield background
        starfield: {
            enabled: true,
            starCount: 200,
            colors: ['#FFFFFF', '#B0BEC5', '#90CAF9', '#CE93D8'],
            sizes: ['1px', '2px', '3px'],
            twinkleSpeed: 'random'
        },
        
        // Nebula gradients
        nebula: {
            enabled: true,
            gradients: [
                'radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(63, 81, 181, 0.2) 0%, transparent 50%)'
            ],
            animation: 'nebulaPulse 8s infinite alternate'
        },
        
        // Particle effects (meteors/comets)
        particles: {
            enabled: true,
            meteors: {
                count: 3,
                speed: 'slow',
                trail: true,
                glow: true
            }
        },
        
        // Galaxy spiral effect
        galaxySpiral: {
            enabled: false, // Optional - performance intensive
            center: { x: '50%', y: '50%' },
            arms: 4,
            rotation: 'slow'
        },
        
        // Cosmic glow effects
        glow: {
            enabled: true,
            intensity: 'medium',
            colors: ['var(--primary)', 'var(--secondary)', 'var(--accent)']
        }
    },
    
    // CSS custom properties mapping
    cssVariables: {
        '--space-primary': 'var(--primary)',
        '--space-secondary': 'var(--secondary)',
        '--space-accent': 'var(--accent)',
        '--space-bg': 'var(--background)',
        '--space-surface': 'var(--surface)',
        '--space-text': 'var(--text-primary)',
        '--space-star': 'var(--star-color)',
        '--space-nebula-blue': 'var(--nebula-blue)',
        '--space-nebula-pink': 'var(--nebula-pink)',
        '--space-font-primary': 'var(--font-primary)',
        '--space-font-display': 'var(--font-display)'
    }
};

// Utility functions for space galaxy theme
export const spaceGalaxyUtils = {
    // Apply space galaxy theme to document
    applyTheme() {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        Object.entries(spaceGalaxyTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        
        // Apply typography
        Object.entries(spaceGalaxyTheme.cssVariables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Add theme class to body
        document.body.classList.add('theme-space-galaxy');
        
        console.log('🚀 Space Galaxy theme applied');
    },
    
    // Remove space galaxy theme
    removeTheme() {
        document.body.classList.remove('theme-space-galaxy');
        console.log('🚀 Space Galaxy theme removed');
    },
    
    // Create starfield effect
    createStarfield() {
        if (!spaceGalaxyTheme.effects.starfield.enabled) return;
        
        const starfieldDiv = document.createElement('div');
        starfieldDiv.className = 'space-starfield';
        starfieldDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Generate stars
        const { starCount, colors, sizes } = spaceGalaxyTheme.effects.starfield;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'space-star';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const twinkleDelay = Math.random() * 3;
            
            star.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size};
                height: ${size};
                background: ${color};
                border-radius: 50%;
                animation: starTwinkle 3s ${twinkleDelay}s infinite ease-in-out;
            `;
            
            starfieldDiv.appendChild(star);
        }
        
        document.body.appendChild(starfieldDiv);
        return starfieldDiv;
    },
    
    // Create nebula effect
    createNebulaEffect() {
        if (!spaceGalaxyTheme.effects.nebula.enabled) return;
        
        const nebulaDiv = document.createElement('div');
        nebulaDiv.className = 'space-nebula';
        nebulaDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${spaceGalaxyTheme.effects.nebula.gradients.join(', ')};
            pointer-events: none;
            z-index: -2;
            animation: ${spaceGalaxyTheme.effects.nebula.animation};
        `;
        
        document.body.appendChild(nebulaDiv);
        return nebulaDiv;
    },
    
    // Create cosmic particle effects
    createParticleEffects() {
        if (!spaceGalaxyTheme.effects.particles.enabled) return;
        
        const particlesDiv = document.createElement('div');
        particlesDiv.className = 'space-particles';
        particlesDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        // Create meteors
        const { meteors } = spaceGalaxyTheme.effects.particles;
        
        for (let i = 0; i < meteors.count; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'space-meteor';
            
            const delay = i * 3; // Stagger meteors
            
            meteor.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: linear-gradient(45deg, var(--comet), transparent);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--comet);
                animation: cometTrail 8s ${delay}s infinite ease-in-out;
            `;
            
            particlesDiv.appendChild(meteor);
        }
        
        document.body.appendChild(particlesDiv);
        return particlesDiv;
    }
};

export default spaceGalaxyTheme;

