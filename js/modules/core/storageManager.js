
class StorageManager {
    constructor() {
        this.prefix = 'lingoquest_';
        this.isAvailable = this.checkStorageAvailability();
    }

    async init() {
        if (!this.isAvailable) {
            console.warn('localStorage not available, using memory storage');
        }
    }

    checkStorageAvailability() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    set(key, value) {
        try {
            const fullKey = this.prefix + key;
            const serializedValue = JSON.stringify(value);

            if (this.isAvailable) {
                localStorage.setItem(fullKey, serializedValue);
            }
        } catch (error) {
            console.error('Storage set error:', error);
        }
    }

    get(key, defaultValue = null) {
        try {
            const fullKey = this.prefix + key;

            if (this.isAvailable) {
                const item = localStorage.getItem(fullKey);
                return item ? JSON.parse(item) : defaultValue;
            }

            return defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    remove(key) {
        try {
            const fullKey = this.prefix + key;

            if (this.isAvailable) {
                localStorage.removeItem(fullKey);
            }
        } catch (error) {
            console.error('Storage remove error:', error);
        }
    }

    clearAll() {
        try {
            if (this.isAvailable) {
                Object.keys(localStorage)
                    .filter(key => key.startsWith(this.prefix))
                    .forEach(key => localStorage.removeItem(key));
            }
        } catch (error) {
            console.error('Storage clear error:', error);
        }
    }

    // Backwards compatibility alias methods
    setItem(key, value) {
        this.set(key, value);
    }

    getItem(key, defaultValue = null) {
        return this.get(key, defaultValue);
    }

    removeItem(key) {
        this.remove(key);
    }

    clear() {
        this.clearAll();
    }
}

export default StorageManager;
