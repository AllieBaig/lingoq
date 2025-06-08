/**
 * Purpose: Display runtime errors in a persistent on-screen log.
 * Key features: console.error interception, DOM log display.
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 */

class ErrorLogger {
    constructor() {
        this.originalConsoleError = console.error.bind(console);
        this.container = null;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.container = document.getElementById('error-log');
        if (!this.container) return;

        console.error = (...args) => {
            this.log(...args);
            this.originalConsoleError(...args);
        };
    }

    log(...args) {
        if (!this.container) return;
        const message = args
            .map(arg => {
                if (arg instanceof Error) {
                    return arg.stack || arg.message;
                }
                if (typeof arg === 'object') {
                    try {
                        return JSON.stringify(arg);
                    } catch {
                        return String(arg);
                    }
                }
                return String(arg);
            })
            .join(' ');

        const entry = document.createElement('div');
        entry.className = 'error-entry';
        entry.textContent = message;
        this.container.appendChild(entry);
    }
}

const errorLogger = new ErrorLogger();
export default errorLogger;
