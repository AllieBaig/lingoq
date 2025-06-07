




/**
 * Purpose: Unit tests for StorageManager module functionality
 * Key features: localStorage operations, data persistence, error handling, cache management
 * Dependencies: Jest testing framework, StorageManager module, localStorage mocks
 * Related helpers: Test utilities, mock localStorage, data validation helpers
 * Function names: describe, test, beforeEach, afterEach, expect, mock
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: tests/unit/storageManager.test.js
 */

import StorageManager from '../../js/modules/core/storageManager.js';
import { jest } from '@jest/globals';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value;
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        get length() {
            return Object.keys(store).length;
        },
        key: jest.fn((index) => {
            const keys = Object.keys(store);
            return keys[index] || null;
        })
    };
})();

// Mock global localStorage
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
});

describe('StorageManager', () => {
    let storageManager;

    beforeEach(async () => {
        // Reset localStorage mock
        localStorageMock.clear();
        jest.clearAllMocks();
        
        // Create new StorageManager instance
        storageManager = new StorageManager();
        await storageManager.init();
    });

    afterEach(() => {
        if (storageManager && typeof storageManager.destroy === 'function') {
            storageManager.destroy();
        }
    });

    describe('Initialization', () => {
        test('should initialize successfully', async () => {
            const manager = new StorageManager();
            await expect(manager.init()).resolves.not.toThrow();
        });

        test('should check storage availability during init', async () => {
            const manager = new StorageManager();
            await manager.init();
            
            expect(manager.isAvailable).toBe(true);
        });

        test('should handle unavailable localStorage gracefully', async () => {
            // Mock localStorage to throw error
            const originalSetItem = localStorageMock.setItem;
            localStorageMock.setItem.mockImplementation(() => {
                throw new Error('Storage not available');
            });

            const manager = new StorageManager();
            await manager.init();
            
            expect(manager.isAvailable).toBe(false);
            
            // Restore original implementation
            localStorageMock.setItem.mockImplementation(originalSetItem);
        });

        test('should set correct prefix', () => {
            expect(storageManager.prefix).toBe('lingoquest_');
        });
    });

    describe('Basic Storage Operations', () => {
        test('should store and retrieve string values', () => {
            const key = 'testString';
            const value = 'Hello World';
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBe(value);
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'lingoquest_testString',
                JSON.stringify(value)
            );
        });

        test('should store and retrieve number values', () => {
            const key = 'testNumber';
            const value = 42;
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBe(value);
            expect(typeof retrieved).toBe('number');
        });

        test('should store and retrieve boolean values', () => {
            const key = 'testBoolean';
            const value = true;
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBe(value);
            expect(typeof retrieved).toBe('boolean');
        });

        test('should store and retrieve object values', () => {
            const key = 'testObject';
            const value = { name: 'John', age: 30, active: true };
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toEqual(value);
            expect(typeof retrieved).toBe('object');
        });

        test('should store and retrieve array values', () => {
            const key = 'testArray';
            const value = ['apple', 'banana', 'cherry'];
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toEqual(value);
            expect(Array.isArray(retrieved)).toBe(true);
        });

        test('should store and retrieve null values', () => {
            const key = 'testNull';
            const value = null;
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBeNull();
        });
    });

    describe('Default Value Handling', () => {
        test('should return default value for non-existent key', () => {
            const defaultValue = 'default';
            const retrieved = storageManager.get('nonExistentKey', defaultValue);
            
            expect(retrieved).toBe(defaultValue);
        });

        test('should return null as default when no default provided', () => {
            const retrieved = storageManager.get('nonExistentKey');
            
            expect(retrieved).toBeNull();
        });

        test('should return stored value instead of default when key exists', () => {
            const key = 'existingKey';
            const storedValue = 'stored';
            const defaultValue = 'default';
            
            storageManager.set(key, storedValue);
            const retrieved = storageManager.get(key, defaultValue);
            
            expect(retrieved).toBe(storedValue);
        });
    });

    describe('Key Removal', () => {
        test('should remove stored values', () => {
            const key = 'testRemove';
            const value = 'to be removed';
            
            storageManager.set(key, value);
            expect(storageManager.get(key)).toBe(value);
            
            storageManager.remove(key);
            expect(storageManager.get(key)).toBeNull();
            
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('lingoquest_testRemove');
        });

        test('should handle removal of non-existent keys gracefully', () => {
            expect(() => {
                storageManager.remove('nonExistentKey');
            }).not.toThrow();
        });
    });

    describe('Clear All Operations', () => {
        test('should clear all LingoQuest prefixed keys', () => {
            // Set some test data
            storageManager.set('key1', 'value1');
            storageManager.set('key2', 'value2');
            storageManager.set('key3', 'value3');
            
            // Add non-prefixed key to localStorage directly
            localStorageMock.setItem('otherApp_key', 'should not be cleared');
            
            // Clear all LingoQuest data
            storageManager.clearAll();
            
            // LingoQuest keys should be gone
            expect(storageManager.get('key1')).toBeNull();
            expect(storageManager.get('key2')).toBeNull();
            expect(storageManager.get('key3')).toBeNull();
            
            // Non-prefixed key should still exist
            expect(localStorageMock.getItem('otherApp_key')).toBe('should not be cleared');
        });

        test('should handle clearAll when no keys exist', () => {
            expect(() => {
                storageManager.clearAll();
            }).not.toThrow();
        });
    });

    describe('Error Handling', () => {
        test('should handle localStorage setItem errors gracefully', () => {
            // Mock setItem to throw an error
            localStorageMock.setItem.mockImplementationOnce(() => {
                throw new Error('Storage full');
            });
            
            expect(() => {
                storageManager.set('testKey', 'testValue');
            }).not.toThrow();
            
            // Should not have stored the value
            expect(storageManager.get('testKey')).toBeNull();
        });

        test('should handle localStorage getItem errors gracefully', () => {
            // Mock getItem to throw an error
            localStorageMock.getItem.mockImplementationOnce(() => {
                throw new Error('Storage error');
            });
            
            const result = storageManager.get('testKey', 'defaultValue');
            expect(result).toBe('defaultValue');
        });

        test('should handle JSON parse errors gracefully', () => {
            // Manually set invalid JSON in localStorage
            localStorageMock.setItem('lingoquest_invalidJson', 'invalid json {');
            
            const result = storageManager.get('invalidJson', 'defaultValue');
            expect(result).toBe('defaultValue');
        });

        test('should handle localStorage removeItem errors gracefully', () => {
            // Mock removeItem to throw an error
            localStorageMock.removeItem.mockImplementationOnce(() => {
                throw new Error('Remove error');
            });
            
            expect(() => {
                storageManager.remove('testKey');
            }).not.toThrow();
        });

        test('should handle localStorage clear errors gracefully', () => {
            // Mock localStorage methods to throw errors
            Object.defineProperty(window, 'localStorage', {
                value: {
                    ...localStorageMock,
                    removeItem: jest.fn(() => {
                        throw new Error('Remove error');
                    })
                },
                writable: true
            });
            
            expect(() => {
                storageManager.clearAll();
            }).not.toThrow();
        });
    });

    describe('Storage Availability Detection', () => {
        test('should detect available localStorage', () => {
            const manager = new StorageManager();
            expect(manager.checkStorageAvailability()).toBe(true);
        });

        test('should detect unavailable localStorage', () => {
            // Mock localStorage to be undefined
            const originalLocalStorage = window.localStorage;
            delete window.localStorage;
            
            const manager = new StorageManager();
            expect(manager.checkStorageAvailability()).toBe(false);
            
            // Restore localStorage
            window.localStorage = originalLocalStorage;
        });

        test('should detect localStorage that throws on access', () => {
            // Mock localStorage to throw on setItem
            const originalLocalStorage = window.localStorage;
            Object.defineProperty(window, 'localStorage', {
                value: {
                    setItem: () => {
                        throw new Error('Access denied');
                    },
                    removeItem: () => {}
                },
                writable: true
            });
            
            const manager = new StorageManager();
            expect(manager.checkStorageAvailability()).toBe(false);
            
            // Restore localStorage
            window.localStorage = originalLocalStorage;
        });
    });

    describe('Complex Data Storage', () => {
        test('should handle nested objects', () => {
            const key = 'nestedObject';
            const value = {
                user: {
                    profile: {
                        name: 'John Doe',
                        settings: {
                            theme: 'dark',
                            notifications: true
                        }
                    }
                },
                scores: [100, 95, 88]
            };
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toEqual(value);
            expect(retrieved.user.profile.name).toBe('John Doe');
            expect(retrieved.scores).toEqual([100, 95, 88]);
        });

        test('should handle arrays of objects', () => {
            const key = 'arrayOfObjects';
            const value = [
                { id: 1, name: 'Item 1', active: true },
                { id: 2, name: 'Item 2', active: false },
                { id: 3, name: 'Item 3', active: true }
            ];
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toEqual(value);
            expect(Array.isArray(retrieved)).toBe(true);
            expect(retrieved[0].name).toBe('Item 1');
        });

        test('should handle Date objects (as strings)', () => {
            const key = 'dateTest';
            const date = new Date('2024-06-07T12:00:00Z');
            const value = { timestamp: date.toISOString() };
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved.timestamp).toBe(date.toISOString());
        });
    });

    describe('Memory Storage Fallback', () => {
        test('should work when localStorage is not available', () => {
            // Create manager with unavailable localStorage
            const originalIsAvailable = storageManager.isAvailable;
            storageManager.isAvailable = false;
            
            // Should still work without throwing
            expect(() => {
                storageManager.set('testKey', 'testValue');
                storageManager.get('testKey');
                storageManager.remove('testKey');
                storageManager.clearAll();
            }).not.toThrow();
            
            // Restore original state
            storageManager.isAvailable = originalIsAvailable;
        });
    });

    describe('Performance', () => {
        test('should handle multiple rapid operations', () => {
            const startTime = Date.now();
            
            // Perform many operations
            for (let i = 0; i < 100; i++) {
                storageManager.set(`key${i}`, { value: i, data: `data${i}` });
                storageManager.get(`key${i}`);
            }
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(1000); // Should complete in under 1 second
        });

        test('should handle large data objects', () => {
            const largeData = {
                array: new Array(1000).fill(0).map((_, i) => ({
                    id: i,
                    data: `item-${i}`,
                    metadata: { created: Date.now(), active: true }
                }))
            };
            
            expect(() => {
                storageManager.set('largeData', largeData);
                const retrieved = storageManager.get('largeData');
                expect(retrieved.array).toHaveLength(1000);
            }).not.toThrow();
        });
    });

    describe('Key Prefix Handling', () => {
        test('should use correct prefix for all operations', () => {
            const key = 'testKey';
            const expectedKey = 'lingoquest_testKey';
            
            storageManager.set(key, 'value');
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                expectedKey,
                expect.any(String)
            );
            
            storageManager.get(key);
            expect(localStorageMock.getItem).toHaveBeenCalledWith(expectedKey);
            
            storageManager.remove(key);
            expect(localStorageMock.removeItem).toHaveBeenCalledWith(expectedKey);
        });

        test('should handle keys with special characters', () => {
            const specialKeys = [
                'key-with-dashes',
                'key_with_underscores',
                'key.with.dots',
                'key with spaces',
                'key/with/slashes'
            ];
            
            specialKeys.forEach(key => {
                expect(() => {
                    storageManager.set(key, 'value');
                    storageManager.get(key);
                    storageManager.remove(key);
                }).not.toThrow();
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle undefined values', () => {
            const key = 'undefinedValue';
            
            storageManager.set(key, undefined);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBeNull(); // undefined becomes null in JSON
        });

        test('should handle empty strings', () => {
            const key = 'emptyString';
            const value = '';
            
            storageManager.set(key, value);
            const retrieved = storageManager.get(key);
            
            expect(retrieved).toBe(value);
        });

        test('should handle very long keys', () => {
            const longKey = 'a'.repeat(1000);
            const value = 'test value';
            
            expect(() => {
                storageManager.set(longKey, value);
                const retrieved = storageManager.get(longKey);
                expect(retrieved).toBe(value);
            }).not.toThrow();
        });

        test('should handle circular references gracefully', () => {
            const circularObj = { name: 'test' };
            circularObj.self = circularObj;
            
            expect(() => {
                storageManager.set('circular', circularObj);
            }).not.toThrow();
            
            // Should not crash, but may not store the circular reference
            const retrieved = storageManager.get('circular');
            expect(retrieved).toBeDefined();
        });
    });
});



