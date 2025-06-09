
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.componentCache = new Map();
        this.isInitialized = false;
    }

    async init() {
        console.log('📦 ComponentLoader initializing...');
        await this.loadAllComponents();
        this.isInitialized = true;
        console.log('✅ ComponentLoader initialized');
    }

    async loadComponent(componentName, containerId) {
        try {
            if (this.componentCache.has(componentName)) {
                const cachedHTML = this.componentCache.get(componentName);
                this.insertComponent(cachedHTML, containerId);
                return;
            }

            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }

            const html = await response.text();
            this.componentCache.set(componentName, html);
            this.insertComponent(html, containerId);
            this.loadedComponents.set(componentName, true);

            document.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentName, containerId }
            }));

        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            this.loadFallbackComponent(componentName, containerId);
        }
    }

    insertComponent(html, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    }

    loadFallbackComponent(componentName, containerId) {
        const fallbackHTML = `
            <div class="error-component">
                <p>Failed to load ${componentName} component</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
        this.insertComponent(fallbackHTML, containerId);
    }

    async loadAllComponents() {
        const components = [
            { name: 'home-screen', containerId: 'home-screen-container' },
            { name: 'game-screen', containerId: 'game-screen-container' },
            { name: 'results-screen', containerId: 'results-screen-container' },
            { name: 'settings-screen', containerId: 'settings-screen-container' },
            { name: 'instructions-screen', containerId: 'instructions-screen-container' },
            { name: 'tools-screen', containerId: 'tools-screen-container' },
            { name: 'loading-overlay', containerId: 'loading-overlay-container' },
            { name: 'toast-container', containerId: 'toast-container-element' }
        ];

        const loadPromises = components.map(component =>
            this.loadComponent(component.name, component.containerId)
        );

        try {
            await Promise.all(loadPromises);
            document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
        } catch (error) {
            console.error('Error loading some components:', error);
        }
    }
}

export default ComponentLoader;

