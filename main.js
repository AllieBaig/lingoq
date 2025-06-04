
/**
 * Main entry point for HollyBolly Game
 * Initializes the game UI and loads game data
 */
import { GameUI } from './GameUI.js';
import { gameData } from './gameData.js';

/**
 * Initialize the game when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Initializing HollyBolly Game...');
        
        // Create game UI instance
        const gameUI = new GameUI();
        
        // Initialize with game data
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
export { GameUI, gameData };

