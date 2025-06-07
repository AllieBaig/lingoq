






/**
 * Purpose: Unit tests for helpers utility module functionality
 * Key features: String utilities, array helpers, object manipulation, validation functions
 * Dependencies: Jest testing framework, helpers module, test data generators
 * Related helpers: Test utilities, mock data, assertion helpers, edge case testing
 * Function names: describe, test, beforeEach, afterEach, expect, mock
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: tests/unit/helpers.test.js
 */

import helpers, { 
    stringUtils, 
    arrayUtils, 
    objectUtils, 
    timeUtils, 
    functionUtils, 
    randomUtils, 
    validationUtils, 
    domUtils 
} from '../../js/modules/utils/helpers.js';
import { jest } from '@jest/globals';

describe('Helpers Module', () => {
    describe('String Utilities', () => {
        describe('capitalizeFirst', () => {
            test('should capitalize first letter of string', () => {
                expect(stringUtils.capitalizeFirst('hello')).toBe('Hello');
                expect(stringUtils.capitalizeFirst('WORLD')).toBe('World');
                expect(stringUtils.capitalizeFirst('tEST')).toBe('Test');
            });

            test('should handle single character strings', () => {
                expect(stringUtils.capitalizeFirst('a')).toBe('A');
                expect(stringUtils.capitalizeFirst('Z')).toBe('Z');
            });

            test('should handle empty or invalid inputs', () => {
                expect(stringUtils.capitalizeFirst('')).toBe('');
                expect(stringUtils.capitalizeFirst(null)).toBe('');
                expect(stringUtils.capitalizeFirst(undefined)).toBe('');
                expect(stringUtils.capitalizeFirst(123)).toBe('');
            });
        });

        describe('titleCase', () => {
            test('should capitalize first letter of each word', () => {
                expect(stringUtils.titleCase('hello world')).toBe('Hello World');
                expect(stringUtils.titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
                expect(stringUtils.titleCase('UPPERCASE TEXT')).toBe('Uppercase Text');
            });

            test('should handle single words', () => {
                expect(stringUtils.titleCase('hello')).toBe('Hello');
                expect(stringUtils.titleCase('WORLD')).toBe('World');
            });

            test('should handle multiple spaces', () => {
                expect(stringUtils.titleCase('hello   world')).toBe('Hello   World');
            });
        });

        describe('kebabCase', () => {
            test('should convert to kebab-case', () => {
                expect(stringUtils.kebabCase('Hello World')).toBe('hello-world');
                expect(stringUtils.kebabCase('camelCaseString')).toBe('camelcasestring');
                expect(stringUtils.kebabCase('UPPERCASE TEXT')).toBe('uppercase-text');
            });

            test('should handle special characters', () => {
                expect(stringUtils.kebabCase('Hello, World!')).toBe('hello--world-');
                expect(stringUtils.kebabCase('test@email.com')).toBe('test-email-com');
            });

            test('should remove leading and trailing dashes', () => {
                expect(stringUtils.kebabCase('!@#hello world#@!')).toBe('hello-world');
            });
        });

        describe('camelCase', () => {
            test('should convert to camelCase', () => {
                expect(stringUtils.camelCase('hello world')).toBe('helloWorld');
                expect(stringUtils.camelCase('the quick brown fox')).toBe('theQuickBrownFox');
                expect(stringUtils.camelCase('UPPERCASE TEXT')).toBe('uppercaseText');
            });

            test('should handle special characters', () => {
                expect(stringUtils.camelCase('hello-world')).toBe('helloWorld');
                expect(stringUtils.camelCase('test_case')).toBe('testCase');
            });
        });

        describe('truncate', () => {
            test('should truncate long strings', () => {
                const longString = 'This is a very long string that should be truncated';
                expect(stringUtils.truncate(longString, 20)).toBe('This is a very lo...');
            });

            test('should not truncate short strings', () => {
                expect(stringUtils.truncate('Short string', 20)).toBe('Short string');
            });

            test('should use custom suffix', () => {
                expect(stringUtils.truncate('Long string', 8, '---')).toBe('Long ---');
            });

            test('should handle edge cases', () => {
                expect(stringUtils.truncate('', 10)).toBe('');
                expect(stringUtils.truncate('test', 0)).toBe('...');
            });
        });

        describe('stripHtml', () => {
            test('should remove HTML tags', () => {
                expect(stringUtils.stripHtml('<p>Hello <strong>world</strong>!</p>')).toBe('Hello world!');
                expect(stringUtils.stripHtml('<div><span>Nested</span> tags</div>')).toBe('Nested tags');
            });

            test('should handle self-closing tags', () => {
                expect(stringUtils.stripHtml('Line 1<br/>Line 2<hr/>')).toBe('Line 1Line 2');
            });

            test('should handle invalid inputs', () => {
                expect(stringUtils.stripHtml('')).toBe('');
                expect(stringUtils.stripHtml(null)).toBe('');
            });
        });

        describe('escapeHtml', () => {
            test('should escape HTML special characters', () => {
                expect(stringUtils.escapeHtml('<script>alert("test")</script>'))
                    .toBe('&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;');
                expect(stringUtils.escapeHtml('A & B')).toBe('A &amp; B');
                expect(stringUtils.escapeHtml("It's 'quoted'")).toBe('It&#x27;s &#x27;quoted&#x27;');
            });
        });
    });

    describe('Array Utilities', () => {
        describe('shuffle', () => {
            test('should shuffle array elements', () => {
                const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                const shuffled = arrayUtils.shuffle(original);
                
                expect(shuffled).toHaveLength(original.length);
                expect(shuffled).toEqual(expect.arrayContaining(original));
                // Statistical test - shuffled array should be different (with high probability)
                expect(shuffled).not.toEqual(original);
            });

            test('should handle empty arrays', () => {
                expect(arrayUtils.shuffle([])).toEqual([]);
            });

            test('should handle single element arrays', () => {
                expect(arrayUtils.shuffle([1])).toEqual([1]);
            });

            test('should not modify original array', () => {
                const original = [1, 2, 3];
                const shuffled = arrayUtils.shuffle(original);
                expect(original).toEqual([1, 2, 3]);
            });
        });

        describe('randomElement', () => {
            test('should return random element from array', () => {
                const array = ['a', 'b', 'c', 'd', 'e'];
                const element = arrayUtils.randomElement(array);
                expect(array).toContain(element);
            });

            test('should handle single element arrays', () => {
                expect(arrayUtils.randomElement(['only'])).toBe('only');
            });

            test('should return null for empty arrays', () => {
                expect(arrayUtils.randomElement([])).toBeNull();
            });

            test('should handle non-array inputs', () => {
                expect(arrayUtils.randomElement(null)).toBeNull();
                expect(arrayUtils.randomElement('not an array')).toBeNull();
            });
        });

        describe('randomElements', () => {
            test('should return specified number of random elements', () => {
                const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                const elements = arrayUtils.randomElements(array, 3);
                
                expect(elements).toHaveLength(3);
                elements.forEach(element => {
                    expect(array).toContain(element);
                });
            });

            test('should not return more elements than available', () => {
                const array = [1, 2, 3];
                const elements = arrayUtils.randomElements(array, 5);
                expect(elements).toHaveLength(3);
            });

            test('should return unique elements', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = arrayUtils.randomElements(array, 3);
                const unique = [...new Set(elements)];
                expect(unique).toHaveLength(elements.length);
            });
        });

        describe('unique', () => {
            test('should remove duplicate values', () => {
                expect(arrayUtils.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
                expect(arrayUtils.unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
            });

            test('should handle arrays without duplicates', () => {
                expect(arrayUtils.unique([1, 2, 3])).toEqual([1, 2, 3]);
            });

            test('should handle empty arrays', () => {
                expect(arrayUtils.unique([])).toEqual([]);
            });
        });

        describe('chunk', () => {
            test('should split array into chunks', () => {
                const result = arrayUtils.chunk([1, 2, 3, 4, 5, 6], 2);
                expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
            });

            test('should handle remainder elements', () => {
                const result = arrayUtils.chunk([1, 2, 3, 4, 5], 2);
                expect(result).toEqual([[1, 2], [3, 4], [5]]);
            });

            test('should handle invalid inputs', () => {
                expect(arrayUtils.chunk([], 2)).toEqual([]);
                expect(arrayUtils.chunk([1, 2, 3], 0)).toEqual([]);
                expect(arrayUtils.chunk([1, 2, 3], -1)).toEqual([]);
            });
        });

        describe('groupBy', () => {
            test('should group array elements by key function', () => {
                const users = [
                    { name: 'John', age: 25 },
                    { name: 'Jane', age: 30 },
                    { name: 'Bob', age: 25 }
                ];
                
                const grouped = arrayUtils.groupBy(users, user => user.age);
                expect(grouped).toEqual({
                    25: [{ name: 'John', age: 25 }, { name: 'Bob', age: 25 }],
                    30: [{ name: 'Jane', age: 30 }]
                });
            });

            test('should handle empty arrays', () => {
                expect(arrayUtils.groupBy([], x => x)).toEqual({});
            });
        });
    });

    describe('Object Utilities', () => {
        describe('deepClone', () => {
            test('should create deep copy of objects', () => {
                const original = {
                    name: 'John',
                    nested: { age: 30, hobbies: ['reading', 'gaming'] }
                };
                
                const cloned = objectUtils.deepClone(original);
                
                expect(cloned).toEqual(original);
                expect(cloned).not.toBe(original);
                expect(cloned.nested).not.toBe(original.nested);
                expect(cloned.nested.hobbies).not.toBe(original.nested.hobbies);
            });

            test('should handle primitive values', () => {
                expect(objectUtils.deepClone(42)).toBe(42);
                expect(objectUtils.deepClone('string')).toBe('string');
                expect(objectUtils.deepClone(true)).toBe(true);
                expect(objectUtils.deepClone(null)).toBeNull();
            });

            test('should handle arrays', () => {
                const original = [1, { a: 2 }, [3, 4]];
                const cloned = objectUtils.deepClone(original);
                
                expect(cloned).toEqual(original);
                expect(cloned).not.toBe(original);
                expect(cloned[1]).not.toBe(original[1]);
            });

            test('should handle Date objects', () => {
                const date = new Date('2024-06-07');
                const cloned = objectUtils.deepClone(date);
                
                expect(cloned).toEqual(date);
                expect(cloned).not.toBe(date);
            });
        });

        describe('deepMerge', () => {
            test('should merge objects deeply', () => {
                const target = { a: 1, b: { c: 2, d: 3 } };
                const source = { b: { d: 4, e: 5 }, f: 6 };
                
                const result = objectUtils.deepMerge(target, source);
                
                expect(result).toEqual({
                    a: 1,
                    b: { c: 2, d: 4, e: 5 },
                    f: 6
                });
            });

            test('should not modify original objects', () => {
                const target = { a: 1 };
                const source = { b: 2 };
                
                objectUtils.deepMerge(target, source);
                
                expect(target).toEqual({ a: 1 });
                expect(source).toEqual({ b: 2 });
            });
        });

        describe('getNestedValue', () => {
            test('should get nested property values', () => {
                const obj = {
                    user: {
                        profile: {
                            name: 'John',
                            settings: { theme: 'dark' }
                        }
                    }
                };
                
                expect(objectUtils.getNestedValue(obj, 'user.profile.name')).toBe('John');
                expect(objectUtils.getNestedValue(obj, 'user.profile.settings.theme')).toBe('dark');
            });

            test('should return default value for missing paths', () => {
                const obj = { a: { b: 1 } };
                expect(objectUtils.getNestedValue(obj, 'a.c.d', 'default')).toBe('default');
                expect(objectUtils.getNestedValue(obj, 'missing.path', null)).toBeNull();
            });

            test('should handle edge cases', () => {
                expect(objectUtils.getNestedValue(null, 'path')).toBeUndefined();
                expect(objectUtils.getNestedValue({}, '')).toBeUndefined();
            });
        });

        describe('setNestedValue', () => {
            test('should set nested property values', () => {
                const obj = {};
                objectUtils.setNestedValue(obj, 'user.profile.name', 'John');
                
                expect(obj.user.profile.name).toBe('John');
            });

            test('should overwrite existing values', () => {
                const obj = { user: { name: 'Jane' } };
                objectUtils.setNestedValue(obj, 'user.name', 'John');
                
                expect(obj.user.name).toBe('John');
            });
        });

        describe('isEmpty', () => {
            test('should detect empty objects', () => {
                expect(objectUtils.isEmpty({})).toBe(true);
                expect(objectUtils.isEmpty({ a: 1 })).toBe(false);
            });

            test('should detect empty arrays', () => {
                expect(objectUtils.isEmpty([])).toBe(true);
                expect(objectUtils.isEmpty([1])).toBe(false);
            });

            test('should handle null and undefined', () => {
                expect(objectUtils.isEmpty(null)).toBe(true);
                expect(objectUtils.isEmpty(undefined)).toBe(true);
            });
        });
    });

    describe('Time Utilities', () => {
        describe('formatTime', () => {
            test('should format milliseconds to mm:ss', () => {
                expect(timeUtils.formatTime(65000)).toBe('01:05');
                expect(timeUtils.formatTime(125000)).toBe('02:05');
                expect(timeUtils.formatTime(3665000)).toBe('61:05');
            });

            test('should format to different patterns', () => {
                expect(timeUtils.formatTime(3665000, 'hh:mm:ss')).toBe('01:01:05');
                expect(timeUtils.formatTime(5000, 'seconds')).toBe('5s');
                expect(timeUtils.formatTime(3665000, 'human')).toBe('1h 1m 5s');
            });

            test('should handle edge cases', () => {
                expect(timeUtils.formatTime(0)).toBe('00:00');
                expect(timeUtils.formatTime(-1000)).toBe('00:00');
                expect(timeUtils.formatTime('invalid')).toBe('00:00');
            });
        });

        describe('getRelativeTime', () => {
            test('should return relative time strings', () => {
                const now = Date.now();
                
                expect(timeUtils.getRelativeTime(now - 30000)).toBe('just now');
                expect(timeUtils.getRelativeTime(now - 120000)).toBe('2 minutes ago');
                expect(timeUtils.getRelativeTime(now - 7200000)).toBe('2 hours ago');
            });
        });

        describe('sleep', () => {
            test('should delay execution', async () => {
                const start = Date.now();
                await timeUtils.sleep(100);
                const end = Date.now();
                
                expect(end - start).toBeGreaterThanOrEqual(90); // Allow some variance
            });
        });
    });

    describe('Function Utilities', () => {
        describe('debounce', () => {
            jest.useFakeTimers();
            
            test('should debounce function calls', () => {
                const mockFn = jest.fn();
                const debouncedFn = functionUtils.debounce(mockFn, 100);
                
                debouncedFn();
                debouncedFn();
                debouncedFn();
                
                expect(mockFn).not.toHaveBeenCalled();
                
                jest.advanceTimersByTime(100);
                
                expect(mockFn).toHaveBeenCalledTimes(1);
            });

            test('should support immediate execution', () => {
                const mockFn = jest.fn();
                const debouncedFn = functionUtils.debounce(mockFn, 100, true);
                
                debouncedFn();
                
                expect(mockFn).toHaveBeenCalledTimes(1);
                
                debouncedFn();
                jest.advanceTimersByTime(100);
                
                expect(mockFn).toHaveBeenCalledTimes(1);
            });

            afterEach(() => {
                jest.clearAllTimers();
            });
        });

        describe('throttle', () => {
            jest.useFakeTimers();
            
            test('should throttle function calls', () => {
                const mockFn = jest.fn();
                const throttledFn = functionUtils.throttle(mockFn, 100);
                
                throttledFn();
                expect(mockFn).toHaveBeenCalledTimes(1);
                
                throttledFn();
                throttledFn();
                expect(mockFn).toHaveBeenCalledTimes(1);
                
                jest.advanceTimersByTime(100);
                throttledFn();
                expect(mockFn).toHaveBeenCalledTimes(2);
            });
        });

        describe('retry', () => {
            test('should retry failed operations', async () => {
                let attempts = 0;
                const mockFn = jest.fn(() => {
                    attempts++;
                    if (attempts < 3) {
                        throw new Error('Failed');
                    }
                    return 'success';
                });
                
                const result = await functionUtils.retry(mockFn, 3, 10);
                
                expect(result).toBe('success');
                expect(mockFn).toHaveBeenCalledTimes(3);
            });

            test('should throw after max attempts', async () => {
                const mockFn = jest.fn(() => {
                    throw new Error('Always fails');
                });
                
                await expect(functionUtils.retry(mockFn, 2, 10))
                    .rejects.toThrow('Always fails');
                
                expect(mockFn).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('Random Utilities', () => {
        describe('generateId', () => {
            test('should generate IDs of specified length', () => {
                const id = randomUtils.generateId(10);
                expect(id).toHaveLength(10);
                expect(typeof id).toBe('string');
            });

            test('should generate unique IDs', () => {
                const ids = new Set();
                for (let i = 0; i < 100; i++) {
                    ids.add(randomUtils.generateId());
                }
                expect(ids.size).toBe(100);
            });
        });

        describe('randomInt', () => {
            test('should generate random integers in range', () => {
                const results = [];
                for (let i = 0; i < 100; i++) {
                    const num = randomUtils.randomInt(1, 10);
                    expect(num).toBeGreaterThanOrEqual(1);
                    expect(num).toBeLessThanOrEqual(10);
                    expect(Number.isInteger(num)).toBe(true);
                    results.push(num);
                }
                
                // Should have some variation
                const unique = [...new Set(results)];
                expect(unique.length).toBeGreaterThan(1);
            });
        });

        describe('randomFloat', () => {
            test('should generate random floats in range', () => {
                for (let i = 0; i < 100; i++) {
                    const num = randomUtils.randomFloat(1.0, 2.0);
                    expect(num).toBeGreaterThanOrEqual(1.0);
                    expect(num).toBeLessThan(2.0);
                }
            });
        });

        describe('randomBoolean', () => {
            test('should generate random booleans', () => {
                const results = [];
                for (let i = 0; i < 100; i++) {
                    results.push(randomUtils.randomBoolean());
                }
                
                const trueCount = results.filter(r => r === true).length;
                const falseCount = results.filter(r => r === false).length;
                
                expect(trueCount).toBeGreaterThan(0);
                expect(falseCount).toBeGreaterThan(0);
            });

            test('should respect probability parameter', () => {
                const results = [];
                for (let i = 0; i < 1000; i++) {
                    results.push(randomUtils.randomBoolean(0.8));
                }
                
                const trueCount = results.filter(r => r === true).length;
                const probability = trueCount / 1000;
                
                // Should be close to 0.8 (within 10% tolerance)
                expect(probability).toBeGreaterThan(0.7);
                expect(probability).toBeLessThan(0.9);
            });
        });

        describe('randomColor', () => {
            test('should generate valid hex colors', () => {
                const color = randomUtils.randomColor();
                expect(color).toMatch(/^#[0-9a-f]{6}$/i);
            });

            test('should generate different colors', () => {
                const colors = new Set();
                for (let i = 0; i < 10; i++) {
                    colors.add(randomUtils.randomColor());
                }
                expect(colors.size).toBeGreaterThan(1);
            });
        });
    });

    describe('Validation Utilities', () => {
        describe('isEmail', () => {
            test('should validate email addresses', () => {
                expect(validationUtils.isEmail('test@example.com')).toBe(true);
                expect(validationUtils.isEmail('user.name@domain.co.uk')).toBe(true);
                expect(validationUtils.isEmail('invalid.email')).toBe(false);
                expect(validationUtils.isEmail('not@email')).toBe(false);
                expect(validationUtils.isEmail('@domain.com')).toBe(false);
            });
        });

        describe('isUrl', () => {
            test('should validate URLs', () => {
                expect(validationUtils.isUrl('https://example.com')).toBe(true);
                expect(validationUtils.isUrl('http://localhost:3000')).toBe(true);
                expect(validationUtils.isUrl('ftp://files.example.com')).toBe(true);
                expect(validationUtils.isUrl('not-a-url')).toBe(false);
                expect(validationUtils.isUrl('javascript:alert(1)')).toBe(false);
            });
        });

        describe('isNumeric', () => {
            test('should validate numeric values', () => {
                expect(validationUtils.isNumeric('123')).toBe(true);
                expect(validationUtils.isNumeric('123.45')).toBe(true);
                expect(validationUtils.isNumeric('-67.89')).toBe(true);
                expect(validationUtils.isNumeric('abc')).toBe(false);
                expect(validationUtils.isNumeric('12abc')).toBe(false);
            });
        });

        describe('isAlpha', () => {
            test('should validate alphabetic strings', () => {
                expect(validationUtils.isAlpha('Hello')).toBe(true);
                expect(validationUtils.isAlpha('ABC')).toBe(true);
                expect(validationUtils.isAlpha('Hello123')).toBe(false);
                expect(validationUtils.isAlpha('Hello World')).toBe(false);
            });
        });

        describe('isAlphaNumeric', () => {
            test('should validate alphanumeric strings', () => {
                expect(validationUtils.isAlphaNumeric('Hello123')).toBe(true);
                expect(validationUtils.isAlphaNumeric('ABC')).toBe(true);
                expect(validationUtils.isAlphaNumeric('123')).toBe(true);
                expect(validationUtils.isAlphaNumeric('Hello World')).toBe(false);
                expect(validationUtils.isAlphaNumeric('test@123')).toBe(false);
            });
        });
    });

    describe('DOM Utilities', () => {
        // Mock DOM environment
        beforeEach(() => {
            document.body.innerHTML = '';
        });

        describe('createElement', () => {
            test('should create elements with attributes', () => {
                const element = domUtils.createElement('div', {
                    className: 'test-class',
                    id: 'test-id',
                    'data-value': '123'
                });
                
                expect(element.tagName).toBe('DIV');
                expect(element.className).toBe('test-class');
                expect(element.id).toBe('test-id');
                expect(element.getAttribute('data-value')).toBe('123');
            });

            test('should add text content', () => {
                const element = domUtils.createElement('p', {
                    textContent: 'Hello World'
                });
                
                expect(element.textContent).toBe('Hello World');
            });

            test('should add innerHTML', () => {
                const element = domUtils.createElement('div', {
                    innerHTML: '<span>Inner HTML</span>'
                });
                
                expect(element.innerHTML).toBe('<span>Inner HTML</span>');
            });

            test('should append children', () => {
                const child1 = document.createElement('span');
                const child2 = document.createElement('p');
                
                const element = domUtils.createElement('div', {}, [child1, child2]);
                
                expect(element.children).toHaveLength(2);
                expect(element.children[0]).toBe(child1);
                expect(element.children[1]).toBe(child2);
            });

            test('should handle string children', () => {
                const element = domUtils.createElement('div', {}, ['Text content']);
                
                expect(element.textContent).toBe('Text content');
            });
        });

        describe('isVisible', () => {
            test('should detect visible elements', () => {
                const element = domUtils.createElement('div');
                element.style.width = '100px';
                element.style.height = '100px';
                document.body.appendChild(element);
                
                expect(domUtils.isVisible(element)).toBe(true);
            });

            test('should detect hidden elements', () => {
                const element = domUtils.createElement('div');
                element.style.display = 'none';
                document.body.appendChild(element);
                
                expect(domUtils.isVisible(element)).toBe(false);
            });
        });
    });

    describe('Default Export', () => {
        test('should export all utility modules', () => {
            expect(helpers.string).toBe(stringUtils);
            expect(helpers.array).toBe(arrayUtils);
            expect(helpers.object).toBe(objectUtils);
            expect(helpers.time).toBe(timeUtils);
            expect(helpers.function).toBe(functionUtils);
            expect(helpers.random).toBe(randomUtils);
            expect(helpers.validation).toBe(validationUtils);
            expect(helpers.dom).toBe(domUtils);
        });
    });
});


