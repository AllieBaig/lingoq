



/**
 * Purpose: DOM element translation and internationalization management
 * Key features: Real-time DOM translation, attribute handling, element watching, text interpolation
 * Dependencies: TranslationEngine, MutationObserver, DOM manipulation utilities
 * Related helpers: Element selection, attribute updates, text content management, observer patterns
 * Function names: applyLanguage, translateElement, updateAttributes, watchForChanges, interpolateText
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:00 | File: js/modules/settings/domTranslator.js
 */

export class DOMTranslator {
    constructor(translationEngine) {
        this.translationEngine = translationEngine;
        this.observer = null;
        this.translatedElements = new WeakSet();
        this.attributeMap = new Map();
        this.isWatching = false;
        this.translationQueue = [];
        this.isProcessing = false;
        
        this.initializeAttributeMapping();
    }
    
    initializeAttributeMapping() {
        // Define which attributes should be translated
        this.attributeMap.set('data-i18n', 'textContent');
        this.attributeMap.set('data-i18n-placeholder', 'placeholder');
        this.attributeMap.set('data-i18n-title', 'title');
        this.attributeMap.set('data-i18n-aria', 'aria-label');
        this.attributeMap.set('data-i18n-alt', 'alt');
        this.attributeMap.set('data-i18n-value', 'value');
    }
    
    async applyLanguage(languageCode) {
        try {
            console.log(`🌐 Applying language to DOM: ${languageCode}`);
            
            // Update document language attribute
            document.documentElement.lang = languageCode;
            
            // Translate all existing elements
            await this.translateAllElements();
            
            // Start watching for new elements if not already watching
            if (!this.isWatching) {
                this.startWatching();
            }
            
            console.log(`✅ DOM translation completed for: ${languageCode}`);
            
        } catch (error) {
            console.error('❌ Failed to apply language to DOM:', error);
            throw error;
        }
    }
    
    async translateAllElements() {
        // Find all elements with translation attributes
        const elements = this.findTranslatableElements();
        
        // Process elements in batches to avoid blocking the UI
        await this.processBatchTranslation(elements);
    }
    
    findTranslatableElements() {
        const selectors = Array.from(this.attributeMap.keys()).map(attr => `[${attr}]`);
        const selector = selectors.join(', ');
        
        return document.querySelectorAll(selector);
    }
    
    async processBatchTranslation(elements) {
        const batchSize = 50; // Process 50 elements at a time
        
        for (let i = 0; i < elements.length; i += batchSize) {
            const batch = Array.from(elements).slice(i, i + batchSize);
            
            // Process batch
            batch.forEach(element => this.translateElement(element));
            
            // Yield control to browser for other tasks
            if (i + batchSize < elements.length) {
                await this.yieldToMain();
            }
        }
    }
    
    yieldToMain() {
        return new Promise(resolve => {
            if (typeof scheduler !== 'undefined' && scheduler.postTask) {
                scheduler.postTask(resolve, { priority: 'user-blocking' });
            } else {
                setTimeout(resolve, 0);
            }
        });
    }
    
    translateElement(element) {
        try {
            // Skip if already processed recently
            if (this.translatedElements.has(element)) {
                return;
            }
            
            // Process each translation attribute
            for (const [dataAttr, targetProp] of this.attributeMap) {
                if (element.hasAttribute(dataAttr)) {
                    this.translateAttribute(element, dataAttr, targetProp);
                }
            }
            
            // Mark as translated
            this.translatedElements.add(element);
            
        } catch (error) {
            console.warn('⚠️ Failed to translate element:', error, element);
        }
    }
    
    translateAttribute(element, dataAttribute, targetProperty) {
        const translationKey = element.getAttribute(dataAttribute);
        
        if (!translationKey) {
            return;
        }
        
        // Get translation options from additional attributes
        const options = this.getTranslationOptions(element, dataAttribute);
        
        // Get translated text
        const translatedText = this.translationEngine.translate(translationKey, options);
        
        // Apply translation based on target property
        this.applyTranslation(element, targetProperty, translatedText, options);
        
        // Store original value for debugging
        if (!element.hasAttribute('data-original-' + targetProperty)) {
            const originalValue = this.getElementProperty(element, targetProperty);
            if (originalValue) {
                element.setAttribute('data-original-' + targetProperty, originalValue);
            }
        }
    }
    
    getTranslationOptions(element, dataAttribute) {
        const options = {};
        
        // Check for interpolation data
        const interpolationAttr = dataAttribute + '-data';
        if (element.hasAttribute(interpolationAttr)) {
            try {
                const interpolationData = JSON.parse(element.getAttribute(interpolationAttr));
                options.interpolation = interpolationData;
            } catch (error) {
                console.warn('⚠️ Invalid interpolation data:', error);
            }
        }
        
        // Check for count attribute (for pluralization)
        const countAttr = dataAttribute + '-count';
        if (element.hasAttribute(countAttr)) {
            const count = parseInt(element.getAttribute(countAttr), 10);
            if (!isNaN(count)) {
                options.count = count;
            }
        }
        
        // Check for fallback
        const fallbackAttr = dataAttribute + '-fallback';
        if (element.hasAttribute(fallbackAttr)) {
            options.fallback = element.getAttribute(fallbackAttr);
        }
        
        return options;
    }
    
    applyTranslation(element, targetProperty, translatedText, options) {
        switch (targetProperty) {
            case 'textContent':
                this.setTextContent(element, translatedText, options);
                break;
                
            case 'innerHTML':
                this.setInnerHTML(element, translatedText, options);
                break;
                
            case 'placeholder':
            case 'title':
            case 'alt':
            case 'aria-label':
                element.setAttribute(targetProperty, translatedText);
                break;
                
            case 'value':
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = translatedText;
                }
                break;
                
            default:
                element.setAttribute(targetProperty, translatedText);
        }
    }
    
    setTextContent(element, text, options) {
        // Handle special cases
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            element.value = text;
        } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    }
    
    setInnerHTML(element, html, options) {
        // Security check - only allow if explicitly enabled
        if (options.allowHTML === true) {
            element.innerHTML = html;
        } else {
            element.textContent = html; // Fallback to text content for security
        }
    }
    
    getElementProperty(element, property) {
        switch (property) {
            case 'textContent':
                return element.textContent;
            case 'innerHTML':
                return element.innerHTML;
            case 'value':
                return element.value;
            default:
                return element.getAttribute(property);
        }
    }
    
    startWatching() {
        if (this.isWatching || !window.MutationObserver) {
            return;
        }
        
        this.observer = new MutationObserver((mutations) => {
            this.handleMutations(mutations);
        });
        
        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: Array.from(this.attributeMap.keys())
        });
        
        this.isWatching = true;
        console.log('👁️ DOM translation watcher started');
    }
    
    stopWatching() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.isWatching = false;
        console.log('👁️ DOM translation watcher stopped');
    }
    
    handleMutations(mutations) {
        const elementsToTranslate = new Set();
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                // Handle added nodes
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.collectTranslatableElements(node, elementsToTranslate);
                    }
                });
            } else if (mutation.type === 'attributes') {
                // Handle attribute changes
                const target = mutation.target;
                if (this.attributeMap.has(mutation.attributeName)) {
                    elementsToTranslate.add(target);
                }
            }
        });
        
        // Queue elements for translation
        if (elementsToTranslate.size > 0) {
            this.queueTranslation(Array.from(elementsToTranslate));
        }
    }
    
    collectTranslatableElements(element, collection) {
        // Check the element itself
        for (const attr of this.attributeMap.keys()) {
            if (element.hasAttribute && element.hasAttribute(attr)) {
                collection.add(element);
                break;
            }
        }
        
        // Check descendants
        if (element.querySelectorAll) {
            const descendants = this.findTranslatableElements();
            descendants.forEach(el => collection.add(el));
        }
    }
    
    queueTranslation(elements) {
        this.translationQueue.push(...elements);
        
        if (!this.isProcessing) {
            this.processTranslationQueue();
        }
    }
    
    async processTranslationQueue() {
        if (this.isProcessing || this.translationQueue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        
        try {
            while (this.translationQueue.length > 0) {
                const element = this.translationQueue.shift();
                this.translateElement(element);
                
                // Yield periodically
                if (this.translationQueue.length % 10 === 0) {
                    await this.yieldToMain();
                }
            }
        } catch (error) {
            console.warn('⚠️ Error processing translation queue:', error);
        } finally {
            this.isProcessing = false;
        }
    }
    
    // Utility methods
    refreshElement(element) {
        // Remove from translated set to force re-translation
        this.translatedElements.delete(element);
        this.translateElement(element);
    }
    
    refreshAllElements() {
        // Clear translated elements set
        this.translatedElements = new WeakSet();
        
        // Re-translate all elements
        this.translateAllElements();
    }
    
    getTranslationInfo(element) {
        const info = {};
        
        for (const [dataAttr, targetProp] of this.attributeMap) {
            if (element.hasAttribute(dataAttr)) {
                const key = element.getAttribute(dataAttr);
                const originalAttr = 'data-original-' + targetProp;
                
                info[dataAttr] = {
                    key,
                    targetProperty: targetProp,
                    currentValue: this.getElementProperty(element, targetProp),
                    originalValue: element.getAttribute(originalAttr),
                    translation: this.translationEngine.translate(key)
                };
            }
        }
        
        return info;
    }
    
    validateElement(element) {
        const issues = [];
        
        for (const [dataAttr] of this.attributeMap) {
            if (element.hasAttribute(dataAttr)) {
                const key = element.getAttribute(dataAttr);
                
                if (!key || key.trim() === '') {
                    issues.push(`Empty translation key in ${dataAttr}`);
                }
                
                if (!this.translationEngine.hasTranslation(key)) {
                    issues.push(`Missing translation for key: ${key}`);
                }
            }
        }
        
        return {
            isValid: issues.length === 0,
            issues
        };
    }
    
    // Debug methods
    getStats() {
        return {
            isWatching: this.isWatching,
            queueLength: this.translationQueue.length,
            isProcessing: this.isProcessing,
            attributeMappings: this.attributeMap.size,
            translatableElements: this.findTranslatableElements().length
        };
    }
    
    exportElementReport() {
        const elements = this.findTranslatableElements();
        const report = [];
        
        elements.forEach((element, index) => {
            report.push({
                index,
                tagName: element.tagName,
                id: element.id,
                className: element.className,
                translationInfo: this.getTranslationInfo(element),
                validation: this.validateElement(element)
            });
        });
        
        return report;
    }
    
    destroy() {
        console.log('🗑️ DOMTranslator destroying...');
        
        // Stop watching
        this.stopWatching();
        
        // Clear queues and caches
        this.translationQueue = [];
        this.translatedElements = new WeakSet();
        this.attributeMap.clear();
        
        this.translationEngine = null;
        this.isProcessing = false;
    }
}

export default DOMTranslator;



