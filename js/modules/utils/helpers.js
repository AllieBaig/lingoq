





/**
 * Purpose: Common utility functions and helper methods for LingoQuest application
 * Key features: String manipulation, array utilities, object helpers, validation, formatting
 * Dependencies: None (pure utility functions)
 * Related helpers: Data formatting, type checking, random generation, time utilities
 * Function names: formatTime, shuffleArray, debounce, deepClone, capitalizeFirst, generateId
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:10 | File: js/modules/utils/helpers.js
 */

// String utilities
export const stringUtils = {
    // Capitalize first letter of a string
    capitalizeFirst(str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    // Capitalize first letter of each word
    titleCase(str) {
        if (!str || typeof str !== 'string') return '';
        return str.split(' ')
            .map(word => this.capitalizeFirst(word))
            .join(' ');
    },
    
    // Convert string to kebab-case
    kebabCase(str) {
        if (!str || typeof str !== 'string') return '';
        return str.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    },
    
    // Convert string to camelCase
    camelCase(str) {
        if (!str || typeof str !== 'string') return '';
        return str.toLowerCase()
            .replace(/[^a-z0-9]/g, ' ')
            .split(' ')
            .filter(word => word.length > 0)
            .map((word, index) => index === 0 ? word : this.capitalizeFirst(word))
            .join('');
    },
    
    // Truncate string with ellipsis
    truncate(str, maxLength = 50, suffix = '...') {
        if (!str || typeof str !== 'string') return '';
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength - suffix.length) + suffix;
    },
    
    // Remove HTML tags from string
    stripHtml(html) {
        if (!html || typeof html !== 'string') return '';
        return html.replace(/<[^>]*>/g, '');
    },
    
    // Escape HTML special characters
    escapeHtml(str) {
        if (!str || typeof str !== 'string') return '';
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
    }
};

// Array utilities
export const arrayUtils = {
    // Shuffle array using Fisher-Yates algorithm
    shuffle(array) {
        if (!Array.isArray(array)) return [];
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Get random element from array
    randomElement(array) {
        if (!Array.isArray(array) || array.length === 0) return null;
        return array[Math.floor(Math.random() * array.length)];
    },
    
    // Get multiple random elements from array
    randomElements(array, count) {
        if (!Array.isArray(array)) return [];
        const shuffled = this.shuffle(array);
        return shuffled.slice(0, Math.min(count, array.length));
    },
    
    // Remove duplicates from array
    unique(array) {
        if (!Array.isArray(array)) return [];
        return [...new Set(array)];
    },
    
    // Chunk array into smaller arrays
    chunk(array, size) {
        if (!Array.isArray(array) || size <= 0) return [];
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    // Group array elements by a key function
    groupBy(array, keyFn) {
        if (!Array.isArray(array)) return {};
        return array.reduce((groups, item) => {
            const key = keyFn(item);
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
            return groups;
        }, {});
    }
};

// Object utilities
export const objectUtils = {
    // Deep clone an object
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const cloned = {};
            Object.keys(obj).forEach(key => {
                cloned[key] = this.deepClone(obj[key]);
            });
            return cloned;
        }
        return obj;
    },
    
    // Merge objects deeply
    deepMerge(target, source) {
        const result = { ...target };
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        });
        return result;
    },
    
    // Get nested property value safely
    getNestedValue(obj, path, defaultValue = undefined) {
        if (!obj || !path) return defaultValue;
        const keys = path.split('.');
        let current = obj;
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }
        return current;
    },
    
    // Set nested property value
    setNestedValue(obj, path, value) {
        if (!obj || !path) return obj;
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
        return obj;
    },
    
    // Check if object is empty
    isEmpty(obj) {
        if (!obj) return true;
        if (Array.isArray(obj)) return obj.length === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return false;
    }
};

// Time and date utilities
export const timeUtils = {
    // Format milliseconds to human readable time
    formatTime(milliseconds, format = 'mm:ss') {
        if (typeof milliseconds !== 'number' || milliseconds < 0) return '00:00';
        
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const pad = (num) => num.toString().padStart(2, '0');
        
        switch (format) {
            case 'hh:mm:ss':
                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            case 'mm:ss':
                return `${pad(minutes)}:${pad(seconds)}`;
            case 'seconds':
                return `${totalSeconds}s`;
            case 'human':
                if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
                if (minutes > 0) return `${minutes}m ${seconds}s`;
                return `${seconds}s`;
            default:
                return `${pad(minutes)}:${pad(seconds)}`;
        }
    },
    
    // Get relative time (e.g., "2 minutes ago")
    getRelativeTime(timestamp) {
        const now = Date.now();
        const diffMs = now - timestamp;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffSeconds < 60) return 'just now';
        if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return new Date(timestamp).toLocaleDateString();
    },
    
    // Sleep/delay function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Function utilities
export const functionUtils = {
    // Debounce function execution
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },
    
    // Throttle function execution
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Retry function with exponential backoff
    async retry(fn, maxAttempts = 3, baseDelay = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                const delay = baseDelay * Math.pow(2, attempt - 1);
                await timeUtils.sleep(delay);
            }
        }
    }
};

// Random generation utilities
export const randomUtils = {
    // Generate random ID
    generateId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Generate random number between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Generate random float between min and max
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Generate random boolean with optional probability
    randomBoolean(probability = 0.5) {
        return Math.random() < probability;
    },
    
    // Generate random color hex
    randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
};

// Validation utilities
export const validationUtils = {
    // Check if value is valid email
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Check if value is valid URL
    isUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    // Check if value is numeric
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    
    // Check if string contains only letters
    isAlpha(str) {
        return /^[A-Za-z]+$/.test(str);
    },
    
    // Check if string contains only letters and numbers
    isAlphaNumeric(str) {
        return /^[A-Za-z0-9]+$/.test(str);
    }
};

// DOM utilities
export const domUtils = {
    // Create element with attributes
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // Get element's computed style
    getComputedStyle(element, property) {
        const computed = window.getComputedStyle(element);
        return property ? computed.getPropertyValue(property) : computed;
    },
    
    // Check if element is visible
    isVisible(element) {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
};

// Export all utilities as default object
export default {
    string: stringUtils,
    array: arrayUtils,
    object: objectUtils,
    time: timeUtils,
    function: functionUtils,
    random: randomUtils,
    validation: validationUtils,
    dom: domUtils
};


