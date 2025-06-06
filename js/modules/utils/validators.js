




/**
 * Purpose: Input validation and data verification utilities for LingoQuest
 * Key features: Form validation, game data validation, user input sanitization, type checking
 * Dependencies: Regular expressions, validation rules, error handling utilities
 * Related helpers: Error message generation, validation rules, sanitization functions
 * Function names: validateAnswer, validateGameSettings, sanitizeInput, validateForm, checkRequired
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:15 | File: js/modules/utils/validators.js
 */

import { GAME_MODES, DIFFICULTY_LEVELS, LANGUAGES } from '../../data/config/constants.js';

// Validation rules and patterns
export const VALIDATION_RULES = {
    // String length rules
    minLength: (min) => (value) => value && value.length >= min,
    maxLength: (max) => (value) => !value || value.length <= max,
    
    // Pattern matching rules
    alphaOnly: /^[A-Za-z\s]+$/,
    alphaNumeric: /^[A-Za-z0-9\s]+$/,
    noSpecialChars: /^[A-Za-z0-9\s\-_]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Number rules
    minValue: (min) => (value) => !isNaN(value) && Number(value) >= min,
    maxValue: (max) => (value) => !isNaN(value) && Number(value) <= max,
    isInteger: (value) => Number.isInteger(Number(value)),
    isPositive: (value) => !isNaN(value) && Number(value) > 0
};

// Game-specific validators
export class GameValidators {
    static validateAnswer(answer, questionData = {}) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            sanitizedValue: null
        };
        
        try {
            // Basic null/undefined check
            if (answer === null || answer === undefined) {
                validation.isValid = false;
                validation.errors.push('Answer cannot be empty');
                return validation;
            }
            
            // Convert to string for validation
            const answerStr = String(answer).trim();
            
            // Check if answer is empty
            if (answerStr.length === 0) {
                validation.isValid = false;
                validation.errors.push('Answer cannot be empty');
                return validation;
            }
            
            // Sanitize the answer
            validation.sanitizedValue = this.sanitizeAnswer(answerStr);
            
            // Length validation
            if (answerStr.length > 100) {
                validation.isValid = false;
                validation.errors.push('Answer is too long (maximum 100 characters)');
            }
            
            // Character validation based on game mode
            if (questionData.gameMode === GAME_MODES.CLASSIC) {
                if (!VALIDATION_RULES.alphaOnly.test(answerStr)) {
                    validation.warnings.push('Answer should contain only letters and spaces');
                }
            }
            
            // Profanity check (basic)
            if (this.containsProfanity(answerStr)) {
                validation.isValid = false;
                validation.errors.push('Answer contains inappropriate content');
            }
            
            return validation;
            
        } catch (error) {
            validation.isValid = false;
            validation.errors.push('Error validating answer');
            return validation;
        }
    }
    
    static sanitizeAnswer(answer) {
        if (typeof answer !== 'string') return '';
        
        return answer
            .trim()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/[^\w\s\-']/g, '') // Remove special characters except hyphens and apostrophes
            .toLowerCase();
    }
    
    static containsProfanity(text) {
        // Basic profanity filter - in production, use a more comprehensive solution
        const profanityList = ['badword1', 'badword2']; // Placeholder
        const lowerText = text.toLowerCase();
        return profanityList.some(word => lowerText.includes(word));
    }
    
    static validateGameSettings(settings) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };
        
        // Validate game mode
        if (!settings.gameMode || !Object.values(GAME_MODES).includes(settings.gameMode)) {
            validation.isValid = false;
            validation.errors.push('Invalid game mode');
        }
        
        // Validate difficulty
        if (!settings.difficulty || !Object.values(DIFFICULTY_LEVELS).includes(settings.difficulty)) {
            validation.isValid = false;
            validation.errors.push('Invalid difficulty level');
        }
        
        // Validate time limit
        if (settings.timeLimit !== undefined) {
            if (!VALIDATION_RULES.isPositive(settings.timeLimit)) {
                validation.isValid = false;
                validation.errors.push('Time limit must be a positive number');
            }
            
            if (settings.timeLimit > 300) {
                validation.warnings.push('Time limit is unusually high (over 5 minutes)');
            }
        }
        
        // Validate question count
        if (settings.questionCount !== undefined) {
            if (!VALIDATION_RULES.isInteger(settings.questionCount) || 
                !VALIDATION_RULES.isPositive(settings.questionCount)) {
                validation.isValid = false;
                validation.errors.push('Question count must be a positive integer');
            }
            
            if (settings.questionCount > 50) {
                validation.warnings.push('Question count is unusually high');
            }
        }
        
        return validation;
    }
    
    static validateQuestionData(questionData) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };
        
        // Required fields
        const requiredFields = ['id', 'question', 'correctAnswer', 'options'];
        
        for (const field of requiredFields) {
            if (!questionData[field]) {
                validation.isValid = false;
                validation.errors.push(`Missing required field: ${field}`);
            }
        }
        
        // Validate options array
        if (questionData.options) {
            if (!Array.isArray(questionData.options)) {
                validation.isValid = false;
                validation.errors.push('Options must be an array');
            } else if (questionData.options.length < 2) {
                validation.isValid = false;
                validation.errors.push('Must have at least 2 options');
            } else if (questionData.options.length > 6) {
                validation.warnings.push('More than 6 options may be confusing');
            }
            
            // Check if correct answer is in options
            if (questionData.correctAnswer && 
                !questionData.options.includes(questionData.correctAnswer)) {
                validation.isValid = false;
                validation.errors.push('Correct answer must be one of the options');
            }
        }
        
        return validation;
    }
}

// Form validators
export class FormValidators {
    static validateForm(formElement, rules = {}) {
        const validation = {
            isValid: true,
            errors: {},
            warnings: {},
            values: {}
        };
        
        if (!formElement) {
            validation.isValid = false;
            return validation;
        }
        
        const formData = new FormData(formElement);
        
        // Validate each field according to rules
        for (const [fieldName, fieldRules] of Object.entries(rules)) {
            const fieldValue = formData.get(fieldName);
            const fieldValidation = this.validateField(fieldValue, fieldRules);
            
            validation.values[fieldName] = fieldValidation.sanitizedValue || fieldValue;
            
            if (!fieldValidation.isValid) {
                validation.isValid = false;
                validation.errors[fieldName] = fieldValidation.errors;
            }
            
            if (fieldValidation.warnings.length > 0) {
                validation.warnings[fieldName] = fieldValidation.warnings;
            }
        }
        
        return validation;
    }
    
    static validateField(value, rules) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            sanitizedValue: null
        };
        
        // Handle empty values
        if (value === null || value === undefined || value === '') {
            if (rules.required) {
                validation.isValid = false;
                validation.errors.push('This field is required');
            }
            return validation;
        }
        
        // Sanitize value
        validation.sanitizedValue = this.sanitizeValue(value, rules.type);
        
        // Apply validation rules
        if (rules.minLength && !VALIDATION_RULES.minLength(rules.minLength)(value)) {
            validation.isValid = false;
            validation.errors.push(`Minimum length is ${rules.minLength} characters`);
        }
        
        if (rules.maxLength && !VALIDATION_RULES.maxLength(rules.maxLength)(value)) {
            validation.isValid = false;
            validation.errors.push(`Maximum length is ${rules.maxLength} characters`);
        }
        
        if (rules.pattern && !rules.pattern.test(value)) {
            validation.isValid = false;
            validation.errors.push(rules.patternMessage || 'Invalid format');
        }
        
        if (rules.custom && typeof rules.custom === 'function') {
            const customResult = rules.custom(value);
            if (customResult !== true) {
                validation.isValid = false;
                validation.errors.push(customResult || 'Invalid value');
            }
        }
        
        return validation;
    }
    
    static sanitizeValue(value, type = 'text') {
        if (typeof value !== 'string') return value;
        
        switch (type) {
            case 'text':
                return value.trim().replace(/\s+/g, ' ');
            case 'name':
                return value.trim().replace(/[^A-Za-z\s\-']/g, '');
            case 'alphanumeric':
                return value.trim().replace(/[^A-Za-z0-9]/g, '');
            case 'number':
                return value.replace(/[^0-9.-]/g, '');
            case 'email':
                return value.trim().toLowerCase();
            default:
                return value.trim();
        }
    }
}

// User input validators
export class UserInputValidators {
    static validateUserProfile(profile) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };
        
        // Validate profile type
        const validProfiles = ['senior', 'student', 'adult', 'educator'];
        if (!profile.type || !validProfiles.includes(profile.type)) {
            validation.isValid = false;
            validation.errors.push('Invalid profile type');
        }
        
        // Validate language preference
        if (profile.language && !Object.values(LANGUAGES).includes(profile.language)) {
            validation.isValid = false;
            validation.errors.push('Invalid language preference');
        }
        
        // Validate theme preference
        if (profile.theme && typeof profile.theme !== 'string') {
            validation.isValid = false;
            validation.errors.push('Invalid theme preference');
        }
        
        return validation;
    }
    
    static validateSettings(settings) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };
        
        // Validate font size
        if (settings.fontSize !== undefined) {
            if (!VALIDATION_RULES.isPositive(settings.fontSize) || 
                settings.fontSize < 8 || settings.fontSize > 32) {
                validation.isValid = false;
                validation.errors.push('Font size must be between 8 and 32 pixels');
            }
        }
        
        // Validate volume settings
        if (settings.volume !== undefined) {
            if (!VALIDATION_RULES.minValue(0)(settings.volume) || 
                !VALIDATION_RULES.maxValue(1)(settings.volume)) {
                validation.isValid = false;
                validation.errors.push('Volume must be between 0 and 1');
            }
        }
        
        // Validate boolean settings
        const booleanSettings = ['soundEnabled', 'animationsEnabled', 'notificationsEnabled'];
        for (const setting of booleanSettings) {
            if (settings[setting] !== undefined && typeof settings[setting] !== 'boolean') {
                validation.isValid = false;
                validation.errors.push(`${setting} must be true or false`);
            }
        }
        
        return validation;
    }
}

// Data type validators
export class DataValidators {
    static isValidEmail(email) {
        return typeof email === 'string' && VALIDATION_RULES.email.test(email);
    }
    
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    static isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }
    
    static isValidPhoneNumber(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return typeof phone === 'string' && phoneRegex.test(phone);
    }
    
    static isValidColor(color) {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
        const namedColors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
        
        return hexRegex.test(color) || 
               rgbRegex.test(color) || 
               namedColors.includes(color.toLowerCase());
    }
    
    static isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }
}

// Security validators
export class SecurityValidators {
    static sanitizeHtml(html) {
        if (typeof html !== 'string') return '';
        
        // Basic HTML sanitization - remove script tags and dangerous attributes
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/vbscript:/gi, '');
    }
    
    static validateCsrfToken(token, expectedToken) {
        return typeof token === 'string' && 
               typeof expectedToken === 'string' && 
               token === expectedToken;
    }
    
    static isValidFileType(file, allowedTypes) {
        if (!file || !file.type) return false;
        return allowedTypes.includes(file.type);
    }
    
    static isValidFileSize(file, maxSizeBytes) {
        if (!file || !file.size) return false;
        return file.size <= maxSizeBytes;
    }
}

// Export validation utilities
export const validators = {
    game: GameValidators,
    form: FormValidators,
    user: UserInputValidators,
    data: DataValidators,
    security: SecurityValidators,
    rules: VALIDATION_RULES
};

export default validators;


