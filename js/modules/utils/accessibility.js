







/**
 * Purpose: Accessibility utilities and helpers for inclusive design
 * Key features: Screen reader support, keyboard navigation, color contrast, ARIA management
 * Dependencies: DOM APIs, WCAG guidelines, accessibility standards
 * Related helpers: Focus management, color utilities, screen reader announcements
 * Function names: announceToScreenReader, manageFocus, checkContrast, setupKeyboardNav
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:25 | File: js/modules/utils/accessibility.js
 */

// Accessibility utilities for LingoQuest
// Provides comprehensive accessibility support for all users

export class AccessibilityManager {
    constructor() {
        this.announcer = null;
        this.focusStack = [];
        this.keyboardHandlers = new Map();
        this.prefersReducedMotion = false;
        this.highContrastMode = false;
        this.screenReaderActive = false;
        
        this.init();
    }
    
    init() {
        this.createScreenReaderAnnouncer();
        this.detectUserPreferences();
        this.setupGlobalKeyboardHandlers();
        this.monitorFocusChanges();
        
        console.log('♿ AccessibilityManager initialized');
    }
    
    // Screen reader support
    createScreenReaderAnnouncer() {
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.className = 'sr-only';
        this.announcer.style.cssText = `
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        `;
        
        document.body.appendChild(this.announcer);
    }
    
    announceToScreenReader(message, priority = 'polite') {
        if (!this.announcer) return;
        
        // Clear previous message
        this.announcer.textContent = '';
        
        // Set priority level
        this.announcer.setAttribute('aria-live', priority);
        
        // Announce new message after a brief delay
        setTimeout(() => {
            this.announcer.textContent = message;
        }, 100);
        
        console.log(`📢 Screen reader announcement: ${message}`);
    }
    
    announceUrgent(message) {
        this.announceToScreenReader(message, 'assertive');
    }
    
    // Focus management
    trapFocus(element) {
        const focusableElements = this.getFocusableElements(element);
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const trapHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };
        
        element.addEventListener('keydown', trapHandler);
        firstElement.focus();
        
        return () => element.removeEventListener('keydown', trapHandler);
    }
    
    getFocusableElements(container = document) {
        const selector = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]'
        ].join(', ');
        
        return Array.from(container.querySelectorAll(selector))
            .filter(element => this.isVisible(element));
    }
    
    isVisible(element) {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               element.offsetParent !== null;
    }
    
    saveFocus() {
        this.focusStack.push(document.activeElement);
    }
    
    restoreFocus() {
        if (this.focusStack.length > 0) {
            const element = this.focusStack.pop();
            if (element && this.isVisible(element)) {
                element.focus();
            }
        }
    }
    
    // Keyboard navigation
    setupGlobalKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            // Escape key handler
            if (e.key === 'Escape') {
                this.handleEscapeKey(e);
            }
            
            // Skip links activation
            if (e.key === 'Enter' && e.target.classList.contains('skip-link')) {
                this.activateSkipLink(e.target);
            }
        });
    }
    
    handleEscapeKey(event) {
        // Check for open modals or overlays
        const modal = document.querySelector('.modal[aria-hidden="false"]');
        if (modal) {
            this.closeModal(modal);
            return;
        }
        
        // Check for open dropdowns
        const dropdown = document.querySelector('.dropdown.open');
        if (dropdown) {
            this.closeDropdown(dropdown);
            return;
        }
        
        // Emit escape event for other components
        document.dispatchEvent(new CustomEvent('accessibility:escape', {
            detail: { originalEvent: event }
        }));
    }
    
    setupKeyboardNavigation(element, options = {}) {
        const {
            roving = false,
            wrap = true,
            orientation = 'horizontal'
        } = options;
        
        if (roving) {
            this.setupRovingTabindex(element, { wrap, orientation });
        }
    }
    
    setupRovingTabindex(container, options = {}) {
        const { wrap = true, orientation = 'horizontal' } = options;
        const items = this.getFocusableElements(container);
        
        if (items.length === 0) return;
        
        // Set initial tabindex values
        items.forEach((item, index) => {
            item.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });
        
        const handler = (e) => {
            const currentIndex = items.indexOf(e.target);
            let newIndex = currentIndex;
            
            if (orientation === 'horizontal') {
                if (e.key === 'ArrowRight') {
                    newIndex = currentIndex + 1;
                } else if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex - 1;
                }
            } else {
                if (e.key === 'ArrowDown') {
                    newIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp') {
                    newIndex = currentIndex - 1;
                }
            }
            
            // Handle wrapping
            if (wrap) {
                if (newIndex >= items.length) newIndex = 0;
                if (newIndex < 0) newIndex = items.length - 1;
            } else {
                newIndex = Math.max(0, Math.min(newIndex, items.length - 1));
            }
            
            if (newIndex !== currentIndex && items[newIndex]) {
                e.preventDefault();
                
                // Update tabindex
                items[currentIndex].setAttribute('tabindex', '-1');
                items[newIndex].setAttribute('tabindex', '0');
                
                // Move focus
                items[newIndex].focus();
            }
        };
        
        container.addEventListener('keydown', handler);
        return () => container.removeEventListener('keydown', handler);
    }
    
    // User preference detection
    detectUserPreferences() {
        // Reduced motion preference
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.prefersReducedMotion = reducedMotionQuery.matches;
        
        reducedMotionQuery.addEventListener('change', (e) => {
            this.prefersReducedMotion = e.matches;
            this.updateMotionPreferences();
        });
        
        // High contrast preference
        const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
        this.highContrastMode = highContrastQuery.matches;
        
        highContrastQuery.addEventListener('change', (e) => {
            this.highContrastMode = e.matches;
            this.updateContrastPreferences();
        });
        
        // Screen reader detection (heuristic)
        this.detectScreenReader();
    }
    
    detectScreenReader() {
        // Heuristic detection methods
        const indicators = [
            navigator.userAgent.includes('NVDA'),
            navigator.userAgent.includes('JAWS'),
            navigator.userAgent.includes('VoiceOver'),
            window.speechSynthesis && window.speechSynthesis.getVoices().length > 0,
            document.querySelector('[aria-live]') !== null
        ];
        
        this.screenReaderActive = indicators.some(indicator => indicator);
        
        if (this.screenReaderActive) {
            document.body.classList.add('screen-reader-active');
        }
    }
    
    updateMotionPreferences() {
        if (this.prefersReducedMotion) {
            document.body.classList.add('reduce-motion');
            
            // Disable CSS animations
            const style = document.createElement('style');
            style.textContent = `
                .reduce-motion *,
                .reduce-motion *::before,
                .reduce-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            document.body.classList.remove('reduce-motion');
        }
        
        // Emit event for components
        document.dispatchEvent(new CustomEvent('accessibility:motionPreferenceChanged', {
            detail: { prefersReducedMotion: this.prefersReducedMotion }
        }));
    }
    
    updateContrastPreferences() {
        if (this.highContrastMode) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        
        // Emit event for components
        document.dispatchEvent(new CustomEvent('accessibility:contrastPreferenceChanged', {
            detail: { highContrastMode: this.highContrastMode }
        }));
    }
    
    // Skip links
    createSkipLinks() {
        const skipContainer = document.createElement('div');
        skipContainer.className = 'skip-links';
        skipContainer.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
            <a href="#game-area" class="skip-link">Skip to game</a>
        `;
        
        // Style skip links
        const style = document.createElement('style');
        style.textContent = `
            .skip-links {
                position: absolute;
                top: -100px;
                left: 0;
                z-index: 10000;
            }
            
            .skip-link {
                position: absolute;
                top: -100px;
                left: 8px;
                background: #000;
                color: #fff;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                transition: top 0.3s;
            }
            
            .skip-link:focus {
                top: 8px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipContainer, document.body.firstChild);
    }
    
    activateSkipLink(link) {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.addEventListener('blur', () => {
                target.removeAttribute('tabindex');
            }, { once: true });
        }
    }
    
    // Modal and dialog support
    makeModalAccessible(modal) {
        // Set ARIA attributes
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        
        // Find title element
        const title = modal.querySelector('h1, h2, h3, .modal-title');
        if (title) {
            const titleId = title.id || `modal-title-${Date.now()}`;
            title.id = titleId;
            modal.setAttribute('aria-labelledby', titleId);
        }
        
        // Find description element
        const description = modal.querySelector('.modal-description, .modal-body p:first-child');
        if (description) {
            const descId = description.id || `modal-desc-${Date.now()}`;
            description.id = descId;
            modal.setAttribute('aria-describedby', descId);
        }
        
        // Setup focus management
        this.saveFocus();
        const cleanup = this.trapFocus(modal);
        
        // Return cleanup function
        return () => {
            cleanup();
            this.restoreFocus();
        };
    }
    
    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        this.restoreFocus();
        
        // Emit modal closed event
        modal.dispatchEvent(new CustomEvent('modal:closed'));
    }
    
    // Form accessibility
    enhanceFormAccessibility(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            this.enhanceInputAccessibility(input);
        });
    }
    
    enhanceInputAccessibility(input) {
        const label = this.findLabelForInput(input);
        const errorElement = this.findErrorForInput(input);
        const helpElement = this.findHelpForInput(input);
        
        // Ensure proper labeling
        if (label && !input.getAttribute('aria-labelledby')) {
            const labelId = label.id || `label-${Date.now()}`;
            label.id = labelId;
            input.setAttribute('aria-labelledby', labelId);
        }
        
        // Associate error messages
        if (errorElement) {
            const errorId = errorElement.id || `error-${Date.now()}`;
            errorElement.id = errorId;
            input.setAttribute('aria-describedby', errorId);
            input.setAttribute('aria-invalid', 'true');
        }
        
        // Associate help text
        if (helpElement) {
            const helpId = helpElement.id || `help-${Date.now()}`;
            helpElement.id = helpId;
            const describedBy = input.getAttribute('aria-describedby');
            input.setAttribute('aria-describedby', describedBy ? `${describedBy} ${helpId}` : helpId);
        }
    }
    
    findLabelForInput(input) {
        // Check for explicit label association
        if (input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) return label;
        }
        
        // Check for implicit label association
        return input.closest('label');
    }
    
    findErrorForInput(input) {
        const inputId = input.id || input.name;
        return document.querySelector(`[data-error-for="${inputId}"], .error[data-input="${inputId}"]`);
    }
    
    findHelpForInput(input) {
        const inputId = input.id || input.name;
        return document.querySelector(`[data-help-for="${inputId}"], .help-text[data-input="${inputId}"]`);
    }
    
    // Live regions
    createLiveRegion(type = 'polite') {
        const region = document.createElement('div');
        region.setAttribute('aria-live', type);
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only';
        region.style.cssText = `
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        `;
        
        document.body.appendChild(region);
        return region;
    }
    
    // Utility methods
    addARIALabel(element, label) {
        element.setAttribute('aria-label', label);
    }
    
    addARIADescription(element, description) {
        const descId = `desc-${Date.now()}`;
        const descElement = document.createElement('span');
        descElement.id = descId;
        descElement.textContent = description;
        descElement.className = 'sr-only';
        
        element.appendChild(descElement);
        element.setAttribute('aria-describedby', descId);
    }
    
    setARIAExpanded(element, expanded) {
        element.setAttribute('aria-expanded', expanded.toString());
    }
    
    setARIASelected(element, selected) {
        element.setAttribute('aria-selected', selected.toString());
    }
    
    setARIACurrent(element, current = 'page') {
        element.setAttribute('aria-current', current);
    }
    
    // Monitor focus changes for debugging
    monitorFocusChanges() {
        if (process.env.NODE_ENV === 'development') {
            document.addEventListener('focusin', (e) => {
                console.log('Focus moved to:', e.target);
            });
            
            document.addEventListener('focusout', (e) => {
                console.log('Focus left:', e.target);
            });
        }
    }
    
    // Cleanup
    destroy() {
        if (this.announcer) {
            this.announcer.remove();
        }
        
        this.keyboardHandlers.clear();
        this.focusStack = [];
        
        console.log('♿ AccessibilityManager destroyed');
    }
}

// Utility functions for accessibility
export const a11yUtils = {
    // Check if element is accessible
    isAccessible(element) {
        const checks = [
            element.hasAttribute('aria-label') || 
            element.hasAttribute('aria-labelledby') ||
            element.textContent.trim() !== '',
            
            !element.hasAttribute('tabindex') || 
            parseInt(element.getAttribute('tabindex')) >= -1,
            
            element.getAttribute('role') !== 'presentation' || 
            element.getAttribute('aria-hidden') !== 'true'
        ];
        
        return checks.every(check => check);
    },
    
    // Generate accessible ID
    generateId(prefix = 'a11y') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // Check color contrast (simplified)
    checkContrast(foreground, background) {
        // This is a simplified version
        // In production, use a proper color contrast library
        return {
            ratio: 4.5, // Placeholder
            passes: true,
            level: 'AA'
        };
    }
};

// Export singleton instance
export const accessibilityManager = new AccessibilityManager();

export default AccessibilityManager;





