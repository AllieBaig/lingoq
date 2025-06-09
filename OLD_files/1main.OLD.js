
/**
 * Main entry point for HollyBolly Game
 * Initializes the game UI and loads game data
 */
import { GameUI } from './GameUI.js';

async function loadGameData() {
    const resp = await fetch('../json/gameData.json');
    if (!resp.ok) {
        throw new Error('Failed to load gameData.json');
    }
    return resp.json();
}

/**
 * Initialize the game when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Initializing HollyBolly Game...');
        
        // Create game UI instance
        const gameUI = new GameUI();
        
        // Load questions from JSON and initialize
        const gameData = await loadGameData();
        await gameUI.init(gameData);
        
        console.log('HollyBolly Game loaded successfully!');
        
    } catch (error) {
        console.error('Failed to initialize HollyBolly Game:', error);
        
        // Show error to user
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.textContent = 'Failed to load game. Please refresh the page.';
            loadingElement.style.color = '#ff6b6b';
        }
    }
});

// Export for potential external use
export { GameUI, loadGameData };

