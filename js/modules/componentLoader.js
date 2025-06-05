

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.componentCache = new Map();
    }

    async loadComponent(componentName, containerId) {
        try {
            // Check if component is already cached
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
            
            // Cache the component
            this.componentCache.set(componentName, html);
            
            // Insert into DOM
            this.insertComponent(html, containerId);
            
            // Mark as loaded
            this.loadedComponents.set(componentName, true);
            
            // Dispatch custom event for component loaded
            document.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentName, containerId }
            }));

        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            // Load fallback component or show error
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
            { name: 'header', containerId: 'header-container' },
            { name: 'home-screen', containerId: 'home-screen-container' },
            { name: 'game-screen', containerId: 'game-screen-container' },
            { name: 'results-screen', containerId: 'results-screen-container' },
            { name: 'settings-screen', containerId: 'settings-screen-container' },
            { name: 'instructions-screen', containerId: 'instructions-screen-container' },
            { name: 'loading-overlay', containerId: 'loading-overlay-container' },
            { name: 'toast-container', containerId: 'toast-container-element' }
        ];

        // Load components in parallel
        const loadPromises = components.map(component => 
            this.loadComponent(component.name, component.containerId)
        );

        try {
            await Promise.all(loadPromises);
            console.log('All components loaded successfully');
            
            // Dispatch event when all components are ready
            document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
            
        } catch (error) {
            console.error('Error loading some components:', error);
        }
    }

    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    async reloadComponent(componentName, containerId) {
        // Clear from cache
        this.componentCache.delete(componentName);
        this.loadedComponents.delete(componentName);
        
        // Reload
        await this.loadComponent(componentName, containerId);
    }
}

export default ComponentLoader;
