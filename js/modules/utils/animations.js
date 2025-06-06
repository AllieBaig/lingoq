



/**
 * Purpose: Animation utilities and helpers for smooth UI transitions and effects
 * Key features: CSS animations, transition management, performance optimization, accessibility support
 * Dependencies: CSS transition APIs, requestAnimationFrame, intersection observer
 * Related helpers: Easing functions, animation queuing, performance monitoring, reduced motion
 * Function names: animate, fadeIn, slideUp, createAnimation, manageTransitions, optimizePerformance
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:20 | File: js/modules/utils/animations.js
 */

// Animation utilities for LingoQuest
// Provides smooth, accessible animations with performance optimization

export class AnimationManager {
    constructor() {
        this.activeAnimations = new Map();
        this.animationQueue = [];
        this.isProcessing = false;
        this.reducedMotion = this.checkReducedMotionPreference();
        this.performanceMode = 'auto'; // auto, high, low
        
        this.setupReducedMotionListener();
    }
    
    // Check user's reduced motion preference
    checkReducedMotionPreference() {
        if (typeof window === 'undefined') return false;
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        return mediaQuery.matches;
    }
    
    // Listen for reduced motion preference changes
    setupReducedMotionListener() {
        if (typeof window === 'undefined') return;
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            console.log(`🎬 Reduced motion preference: ${this.reducedMotion ? 'enabled' : 'disabled'}`);
        });
    }
    
    // Set performance mode
    setPerformanceMode(mode) {
        this.performanceMode = mode;
        console.log(`🎬 Animation performance mode: ${mode}`);
    }
    
    // Generic animation function
    async animate(element, keyframes, options = {}) {
        if (!element || this.reducedMotion) {
            return this.handleReducedMotion(element, options);
        }
        
        const animationOptions = this.processAnimationOptions(options);
        
        try {
            const animation = element.animate(keyframes, animationOptions);
            const animationId = this.generateAnimationId();
            
            this.activeAnimations.set(animationId, {
                animation,
                element,
                startTime: Date.now()
            });
            
            // Wait for animation to complete
            await animation.finished;
            
            // Clean up
            this.activeAnimations.delete(animationId);
            
            return animation;
            
        } catch (error) {
            console.warn('🎬 Animation failed:', error);
            return null;
        }
    }
    
    // Process animation options based on performance mode
    processAnimationOptions(options) {
        const defaultOptions = {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards'
        };
        
        const processedOptions = { ...defaultOptions, ...options };
        
        // Adjust for performance mode
        if (this.performanceMode === 'low') {
            processedOptions.duration = Math.min(processedOptions.duration, 150);
        } else if (this.performanceMode === 'high') {
            // Use default or longer durations for smooth animations
        }
        
        return processedOptions;
    }
    
    // Handle reduced motion scenarios
    handleReducedMotion(element, options) {
        if (!element) return Promise.resolve();
        
        // Apply final state immediately
        if (options.finalState) {
            Object.assign(element.style, options.finalState);
        }
        
        // Trigger callback if provided
        if (options.onComplete) {
            setTimeout(options.onComplete, 0);
        }
        
        return Promise.resolve();
    }
    
    // Generate unique animation ID
    generateAnimationId() {
        return `anim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Global animation manager instance
const animationManager = new AnimationManager();

// Fade animations
export const fadeAnimations = {
    // Fade in animation
    async fadeIn(element, options = {}) {
        const keyframes = [
            { opacity: 0 },
            { opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 300,
            easing: 'ease-out',
            finalState: { opacity: '1' },
            ...options
        };
        
        // Set initial state
        if (element) {
            element.style.opacity = '0';
        }
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Fade out animation
    async fadeOut(element, options = {}) {
        const keyframes = [
            { opacity: 1 },
            { opacity: 0 }
        ];
        
        const animationOptions = {
            duration: 300,
            easing: 'ease-in',
            finalState: { opacity: '0' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Fade toggle
    async fadeToggle(element, options = {}) {
        if (!element) return;
        
        const currentOpacity = getComputedStyle(element).opacity;
        const isVisible = currentOpacity !== '0';
        
        if (isVisible) {
            return this.fadeOut(element, options);
        } else {
            return this.fadeIn(element, options);
        }
    }
};

// Slide animations
export const slideAnimations = {
    // Slide up animation
    async slideUp(element, options = {}) {
        if (!element) return;
        
        const height = element.offsetHeight;
        
        const keyframes = [
            { transform: 'translateY(100%)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 400,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            finalState: { transform: 'translateY(0)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Slide down animation
    async slideDown(element, options = {}) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateY(-100%)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 400,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            finalState: { transform: 'translateY(0)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Slide left animation
    async slideLeft(element, options = {}) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateX(100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 400,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            finalState: { transform: 'translateX(0)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Slide right animation
    async slideRight(element, options = {}) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateX(-100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 400,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            finalState: { transform: 'translateX(0)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    }
};

// Scale animations
export const scaleAnimations = {
    // Scale up (zoom in)
    async scaleUp(element, options = {}) {
        const keyframes = [
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 300,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            finalState: { transform: 'scale(1)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Scale down (zoom out)
    async scaleDown(element, options = {}) {
        const keyframes = [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0.8)', opacity: 0 }
        ];
        
        const animationOptions = {
            duration: 300,
            easing: 'ease-in',
            finalState: { transform: 'scale(0.8)', opacity: '0' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Bounce effect
    async bounce(element, options = {}) {
        const keyframes = [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
        ];
        
        const animationOptions = {
            duration: 600,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    }
};

// Rotation animations
export const rotationAnimations = {
    // Rotate in
    async rotateIn(element, options = {}) {
        const keyframes = [
            { transform: 'rotate(-180deg) scale(0.5)', opacity: 0 },
            { transform: 'rotate(0deg) scale(1)', opacity: 1 }
        ];
        
        const animationOptions = {
            duration: 500,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            finalState: { transform: 'rotate(0deg) scale(1)', opacity: '1' },
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Spin animation
    async spin(element, options = {}) {
        const keyframes = [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ];
        
        const animationOptions = {
            duration: 1000,
            easing: 'linear',
            iterations: options.infinite ? Infinity : 1,
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    }
};

// Complex animations
export const complexAnimations = {
    // Stagger animation for multiple elements
    async stagger(elements, animationFn, options = {}) {
        const { delay = 100, ...animationOptions } = options;
        const animations = [];
        
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            
            // Add delay based on index
            setTimeout(async () => {
                const animation = await animationFn(element, animationOptions);
                animations.push(animation);
            }, i * delay);
        }
        
        return Promise.all(animations);
    },
    
    // Sequence animation
    async sequence(animationSteps) {
        const results = [];
        
        for (const step of animationSteps) {
            const { element, animation, options } = step;
            const result = await animation(element, options);
            results.push(result);
        }
        
        return results;
    },
    
    // Parallel animation
    async parallel(animationSteps) {
        const promises = animationSteps.map(step => {
            const { element, animation, options } = step;
            return animation(element, options);
        });
        
        return Promise.all(promises);
    }
};

// Game-specific animations
export const gameAnimations = {
    // Question card entrance
    async questionCardEnter(element, options = {}) {
        return slideAnimations.slideUp(element, {
            duration: 500,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            ...options
        });
    },
    
    // Answer button highlight
    async highlightCorrectAnswer(element, options = {}) {
        const keyframes = [
            { backgroundColor: 'var(--success)', transform: 'scale(1)' },
            { backgroundColor: 'var(--success)', transform: 'scale(1.05)' },
            { backgroundColor: 'var(--success)', transform: 'scale(1)' }
        ];
        
        const animationOptions = {
            duration: 600,
            easing: 'ease-out',
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    },
    
    // Score counter animation
    async animateScore(element, fromValue, toValue, options = {}) {
        const duration = options.duration || 1000;
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            function updateScore() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth counting
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(fromValue + (toValue - fromValue) * easedProgress);
                
                if (element) {
                    element.textContent = currentValue.toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateScore);
                } else {
                    resolve();
                }
            }
            
            updateScore();
        });
    },
    
    // Timer warning animation
    async timerWarning(element, options = {}) {
        const keyframes = [
            { color: 'var(--warning)', transform: 'scale(1)' },
            { color: 'var(--danger)', transform: 'scale(1.1)' },
            { color: 'var(--warning)', transform: 'scale(1)' }
        ];
        
        const animationOptions = {
            duration: 500,
            iterations: 3,
            easing: 'ease-in-out',
            ...options
        };
        
        return animationManager.animate(element, keyframes, animationOptions);
    }
};

// Utility functions
export const animationUtils = {
    // Wait for animation to complete
    async waitForAnimation(element) {
        if (!element) return;
        
        const animations = element.getAnimations();
        if (animations.length === 0) return;
        
        await Promise.all(animations.map(anim => anim.finished));
    },
    
    // Cancel all animations on element
    cancelAnimations(element) {
        if (!element) return;
        
        const animations = element.getAnimations();
        animations.forEach(anim => anim.cancel());
    },
    
    // Pause all animations on element
    pauseAnimations(element) {
        if (!element) return;
        
        const animations = element.getAnimations();
        animations.forEach(anim => anim.pause());
    },
    
    // Resume all animations on element
    resumeAnimations(element) {
        if (!element) return;
        
        const animations = element.getAnimations();
        animations.forEach(anim => anim.play());
    },
    
    // Check if element is animating
    isAnimating(element) {
        if (!element) return false;
        
        const animations = element.getAnimations();
        return animations.some(anim => anim.playState === 'running');
    },
    
    // Get performance-friendly animation duration
    getOptimalDuration(baseMs) {
        if (animationManager.reducedMotion) return 0;
        
        switch (animationManager.performanceMode) {
            case 'low':
                return Math.min(baseMs, 150);
            case 'high':
                return baseMs;
            default:
                // Auto mode - detect device capability
                return navigator.hardwareConcurrency >= 4 ? baseMs : baseMs * 0.7;
        }
    }
};

// CSS class-based animations (for compatibility)
export const cssAnimations = {
    // Add CSS animation class
    addClass(element, className, options = {}) {
        if (!element) return Promise.resolve();
        
        const { duration = 300, onComplete } = options;
        
        return new Promise((resolve) => {
            element.classList.add(className);
            
            const handleAnimationEnd = () => {
                element.removeEventListener('animationend', handleAnimationEnd);
                if (onComplete) onComplete();
                resolve();
            };
            
            element.addEventListener('animationend', handleAnimationEnd);
            
            // Fallback timeout
            setTimeout(() => {
                handleAnimationEnd();
            }, duration + 100);
        });
    },
    
    // Remove CSS animation class
    removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },
    
    // Toggle CSS animation class
    toggleClass(element, className, options = {}) {
        if (!element) return Promise.resolve();
        
        if (element.classList.contains(className)) {
            this.removeClass(element, className);
            return Promise.resolve();
        } else {
            return this.addClass(element, className, options);
        }
    }
};

// Export the animation manager for advanced usage
export { animationManager };

// Export convenience functions
export const animate = (element, keyframes, options) => 
    animationManager.animate(element, keyframes, options);

export const fadeIn = fadeAnimations.fadeIn;
export const fadeOut = fadeAnimations.fadeOut;
export const slideUp = slideAnimations.slideUp;
export const slideDown = slideAnimations.slideDown;
export const scaleUp = scaleAnimations.scaleUp;
export const bounce = scaleAnimations.bounce;

// Default export with all animation categories
export default {
    manager: animationManager,
    fade: fadeAnimations,
    slide: slideAnimations,
    scale: scaleAnimations,
    rotation: rotationAnimations,
    complex: complexAnimations,
    game: gameAnimations,
    utils: animationUtils,
    css: cssAnimations
};


