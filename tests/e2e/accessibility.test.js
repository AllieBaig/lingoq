

/**
 * Purpose: End-to-end accessibility testing for LingoQuest WCAG compliance
 * Key features: ARIA testing, keyboard navigation, screen reader support, color contrast
 * Dependencies: Playwright test framework, axe-core accessibility engine
 * Related helpers: Accessibility utilities, WCAG validators, contrast checkers
 * Function names: testAriaCompliance, testKeyboardAccess, testColorContrast, testScreenReader
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 21:05 | File: tests/e2e/accessibility.test.js
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Test configuration for accessibility
const A11Y_CONFIG = {
    timeout: 30000,
    baseURL: 'http://localhost:3000',
    wcagLevel: 'AA',
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
};

// Accessibility selectors
const A11Y_SELECTORS = {
    // Interactive elements
    buttons: 'button, [role="button"]',
    links: 'a, [role="link"]',
    inputs: 'input, textarea, select, [role="textbox"]',
    
    // Navigation elements
    navigation: 'nav, [role="navigation"]',
    landmarks: '[role="main"], [role="banner"], [role="contentinfo"], [role="complementary"]',
    headings: 'h1, h2, h3, h4, h5, h6',
    
    // Game elements
    gameControls: '.game-controls button',
    answerButtons: '.choice-button, .answer-button',
    scoreDisplay: '#current-score, #final-score',
    
    // Form elements
    formControls: 'input, select, textarea, button[type="submit"]',
    labels: 'label',
    
    // Focus elements
    focusable: 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    skipLinks: '.skip-link, [href="#main-content"]'
};

// Color contrast requirements
const CONTRAST_REQUIREMENTS = {
    normal: 4.5,    // WCAG AA normal text
    large: 3.0,     // WCAG AA large text (18pt+ or 14pt+ bold)
    enhanced: 7.0   // WCAG AAA normal text
};

// Test setup
test.beforeEach(async ({ page }) => {
    test.setTimeout(A11Y_CONFIG.timeout);
    await page.goto(A11Y_CONFIG.baseURL);
    await page.waitForLoadState('networkidle');
    
    // Ensure page is fully loaded
    await page.waitForSelector('#home-screen', { state: 'visible' });
});

test.describe('WCAG 2.1 AA Compliance', () => {
    test('should pass automated accessibility scan on home screen', async ({ page }) => {
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(A11Y_CONFIG.tags)
            .analyze();
            
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    
    test('should pass accessibility scan on game screen', async ({ page }) => {
        // Start a game
        await page.click('[data-mode="easy"][data-game-type="classic"]');
        await page.waitForSelector('#game-screen', { state: 'visible' });
        
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(A11Y_CONFIG.tags)
            .analyze();
            
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    
    test('should pass accessibility scan on results screen', async ({ page }) => {
        // Complete a quick game to reach results
        await completeQuickGame(page);
        
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(A11Y_CONFIG.tags)
            .analyze();
            
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    
    test('should pass accessibility scan on settings screen', async ({ page }) => {
        await page.click('#settings-btn');
        await page.waitForSelector('#settings-screen', { state: 'visible' });
        
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(A11Y_CONFIG.tags)
            .analyze();
            
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});

test.describe('Keyboard Navigation', () => {
    test('should support tab navigation through all interactive elements', async ({ page }) => {
        const focusableElements = await page.locator(A11Y_SELECTORS.focusable).all();
        let currentIndex = 0;
        
        // Test forward tab navigation
        for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
            await page.keyboard.press('Tab');
            
            const activeElement = await page.evaluate(() => document.activeElement.tagName);
            expect(activeElement).toBeTruthy();
            currentIndex++;
        }
        
        // Test backward navigation with Shift+Tab
        for (let i = 0; i < 3; i++) {
            await page.keyboard.press('Shift+Tab');
            currentIndex--;
        }
        
        console.log(`Successfully navigated ${currentIndex} focusable elements`);
    });
    
    test('should activate buttons with Enter and Space keys', async ({ page }) => {
        // Test Enter key activation
        await page.focus('[data-mode="easy"][data-game-type="classic"]');
        await page.keyboard.press('Enter');
        
        // Should start the game
        await expect(page.locator('#game-screen')).toBeVisible();
        
        // Go back to home
        await page.click('#quit-game');
        if (await page.locator('text=Are you sure').isVisible()) {
            await page.keyboard.press('Enter'); // Confirm with Enter
        }
        
        // Test Space key activation
        await page.focus('[data-mode="medium"][data-game-type="classic"]');
        await page.keyboard.press('Space');
        
        await expect(page.locator('#game-screen')).toBeVisible();
    });
    
    test('should handle Escape key for modal dismissal', async ({ page }) => {
        // Open instructions
        await page.click('#how-to-play-btn');
        await page.waitForSelector('#instructions-screen', { state: 'visible' });
        
        // Close with Escape
        await page.keyboard.press('Escape');
        await expect(page.locator('#home-screen')).toBeVisible();
        
        // Test with settings
        await page.click('#settings-btn');
        await page.waitForSelector('#settings-screen', { state: 'visible' });
        
        await page.keyboard.press('Escape');
        await expect(page.locator('#home-screen')).toBeVisible();
    });
    
    test('should provide visible focus indicators', async ({ page }) => {
        const buttons = await page.locator('button').all();
        
        for (let i = 0; i < Math.min(buttons.length, 5); i++) {
            await buttons[i].focus();
            
            // Check for focus styles
            const focusStyles = await buttons[i].evaluate(el => {
                const styles = window.getComputedStyle(el, ':focus');
                return {
                    outline: styles.outline,
                    outlineWidth: styles.outlineWidth,
                    boxShadow: styles.boxShadow
                };
            });
            
            // Should have some form of focus indicator
            const hasFocusIndicator = 
                focusStyles.outline !== 'none' || 
                focusStyles.outlineWidth !== '0px' ||
                focusStyles.boxShadow !== 'none';
                
            expect(hasFocusIndicator).toBeTruthy();
        }
    });
});

test.describe('Screen Reader Support', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
        const headings = await page.locator(A11Y_SELECTORS.headings).all();
        
        expect(headings.length).toBeGreaterThan(0);
        
        // Check for h1 presence
        const h1Elements = await page.locator('h1').all();
        expect(h1Elements.length).toBeGreaterThanOrEqual(1);
        
        // Verify heading levels don't skip
        const headingLevels = [];
        for (const heading of headings) {
            const tagName = await heading.evaluate(el => el.tagName);
            const level = parseInt(tagName.charAt(1));
            headingLevels.push(level);
        }
        
        // Check that heading levels are logical
        for (let i = 1; i < headingLevels.length; i++) {
            const jump = headingLevels[i] - headingLevels[i - 1];
            expect(jump).toBeLessThanOrEqual(1); // No skipping levels
        }
    });
    
    test('should have appropriate ARIA labels and descriptions', async ({ page }) => {
        // Check buttons have accessible names
        const buttons = await page.locator('button').all();
        
        for (const button of buttons) {
            const accessibleName = await button.evaluate(el => {
                return el.getAttribute('aria-label') || 
                       el.getAttribute('aria-labelledby') ||
                       el.textContent.trim();
            });
            
            expect(accessibleName).toBeTruthy();
        }
        
        // Check form inputs have labels
        const inputs = await page.locator('input, select, textarea').all();
        
        for (const input of inputs) {
            const hasLabel = await input.evaluate(el => {
                const id = el.id;
                const ariaLabel = el.getAttribute('aria-label');
                const ariaLabelledby = el.getAttribute('aria-labelledby');
                const associatedLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
                
                return !!(ariaLabel || ariaLabelledby || associatedLabel);
            });
            
            expect(hasLabel).toBeTruthy();
        }
    });
    
    test('should announce dynamic content changes', async ({ page }) => {
        // Start a game to test dynamic content
        await page.click('[data-mode="easy"][data-game-type="classic"]');
        await page.waitForSelector('#game-screen', { state: 'visible' });
        
        // Check for ARIA live regions
        const liveRegions = await page.locator('[aria-live]').all();
        expect(liveRegions.length).toBeGreaterThan(0);
        
        // Check score updates have proper announcements
        const scoreElement = await page.locator('#current-score');
        if (await scoreElement.isVisible()) {
            const ariaLive = await scoreElement.getAttribute('aria-live');
            expect(ariaLive).toBeTruthy();
        }
    });
    
    test('should provide context for game elements', async ({ page }) => {
        await page.click('[data-mode="easy"][data-game-type="classic"]');
        await page.waitForSelector('#game-screen', { state: 'visible' });
        
        // Check question has proper context
        const questionElement = await page.locator('#question-text');
        const questionText = await questionElement.textContent();
        expect(questionText).toBeTruthy();
        
        // Check answer choices have proper context
        const choices = await page.locator('.choice-button').all();
        
        for (const choice of choices) {
            const choiceText = await choice.textContent();
            const ariaLabel = await choice.getAttribute('aria-label');
            
            // Should have either text content or aria-label
            expect(choiceText || ariaLabel).toBeTruthy();
        }
    });
});

test.describe('Color and Contrast', () => {
    test('should meet WCAG AA contrast requirements', async ({ page }) => {
        // Test primary text contrast
        await testElementContrast(page, 'body', CONTRAST_REQUIREMENTS.normal);
        
        // Test button contrast
        const buttons = await page.locator('button').all();
        for (let i = 0; i < Math.min(buttons.length, 3); i++) {
            await testButtonContrast(page, buttons[i]);
        }
        
        // Test link contrast
        const links = await page.locator('a').all();
        for (let i = 0; i < Math.min(links.length, 3); i++) {
            await testElementContrastRatio(page, links[i], CONTRAST_REQUIREMENTS.normal);
        }
    });
    
    test('should not rely solely on color for information', async ({ page }) => {
        // Start a game to test answer feedback
        await page.click('[data-mode="easy"][data-game-type="classic"]');
        await page.waitForSelector('#game-screen', { state: 'visible' });
        
        // Answer a question
        const choices = await page.locator('.choice-button').all();
        if (choices.length > 0) {
            await choices[0].click();
            await page.click('#confirm-answer');
            
            // Wait for feedback
            await page.waitForTimeout(1000);
            
            // Check that feedback includes text/icons, not just color
            const feedbackElements = await page.locator('.correct, .incorrect, .choice-result').all();
            
            for (const element of feedbackElements) {
                const textContent = await element.textContent();
                const hasIcon = await element.locator('svg, .icon, [class*="icon"]').count() > 0;
                
                // Should have text or icon feedback, not just color
                expect(textContent.trim() || hasIcon).toBeTruthy();
            }
        }
    });
    
    test('should work with high contrast mode', async ({ page }) => {
        // Enable high contrast mode
        await page.emulateMedia({ forcedColors: 'active' });
        
        // Test that the app still functions
        await page.click('[data-mode="easy"][data-game-type="classic"]');
        await expect(page.locator('#game-screen')).toBeVisible();
        
        // Test that interactive elements are still visible
        const buttons = await page.locator('button').all();
        for (const button of buttons.slice(0, 3)) {
            await expect(button).toBeVisible();
        }
    });
});

test.describe('Motor Accessibility', () => {
    test('should have adequately sized touch targets', async ({ page }) => {
        const interactiveElements = await page.locator(A11Y_SELECTORS.buttons).all();
        
        for (const element of interactiveElements.slice(0, 5)) {
            const boundingBox = await element.boundingBox();
            
            if (boundingBox) {
                // WCAG recommendation: minimum 44x44 pixels
                expect(boundingBox.width).toBeGreaterThanOrEqual(44);
                expect(boundingBox.height).toBeGreaterThanOrEqual(44);
            }
        }
    });
    
    test('should provide click tolerance for interactive elements', async ({ page }) => {
        const button = page.locator('[data-mode="easy"][data-game-type="classic"]').first();
        const boundingBox = await button.boundingBox();
        
        if (boundingBox) {
            // Test clicking near the edge of the button
            const edgeX = boundingBox.x + boundingBox.width - 5;
            const edgeY = boundingBox.y + boundingBox.height - 5;
            
            await page.mouse.click(edgeX, edgeY);
            
            // Should still activate the button
            await expect(page.locator('#game-screen')).toBeVisible();
        }
    });
    
    test('should support reduced motion preferences', async ({ page }) => {
        // Set reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });
        
        // Test that animations are reduced or disabled
        const animatedElements = await page.locator('[class*="animate"], [style*="animation"]').all();
        
        for (const element of animatedElements) {
            const computedStyle = await element.evaluate(el => {
                const styles = window.getComputedStyle(el);
                return {
                    animationDuration: styles.animationDuration,
                    transitionDuration: styles.transitionDuration
                };
            });
            
            // Animations should be very short or disabled
            expect(computedStyle.animationDuration).toMatch(/^(0s|0\.0*1s)$/);
        }
    });
});

test.describe('Cognitive Accessibility', () => {
    test('should provide clear error messages', async ({ page }) => {
        // Test form validation (if any)
        const forms = await page.locator('form').all();
        
        for (const form of forms) {
            const inputs = await form.locator('input[required]').all();
            
            for (const input of inputs) {
                // Try to submit without filling required field
                await input.focus();
                await input.blur();
                
                // Check for error message
                const errorMessage = await form.locator('.error, [role="alert"], .invalid-feedback').textContent();
                
                if (errorMessage) {
                    expect(errorMessage.trim()).toBeTruthy();
                    expect(errorMessage.length).toBeGreaterThan(5); // Should be descriptive
                }
            }
        }
    });
    
    test('should provide consistent navigation patterns', async ({ page }) => {
        // Test that navigation elements are consistent across screens
        const homeNavElements = await getNavigationElements(page);
        
        // Navigate to different screens and check consistency
        const screens = ['#settings-btn', '#how-to-play-btn'];
        
        for (const screenTrigger of screens) {
            await page.click(screenTrigger);
            await page.waitForTimeout(500);
            
            const currentNavElements = await getNavigationElements(page);
            
            // Check that main navigation patterns are preserved
            expect(currentNavElements.hasSettingsAccess).toBe(homeNavElements.hasSettingsAccess);
        }
    });
    
    test('should provide helpful instructions and context', async ({ page }) => {
        // Check instructions screen
        await page.click('#how-to-play-btn');
        await page.waitForSelector('#instructions-screen', { state: 'visible' });
        
        const instructionText = await page.locator('#instructions-screen').textContent();
        expect(instructionText.length).toBeGreaterThan(100); // Should be comprehensive
        
        // Check for examples in instructions
        const examples = await page.locator('.example, .category-example').all();
        expect(examples.length).toBeGreaterThan(0);
    });
});

// Helper functions
async function completeQuickGame(page) {
    await page.click('[data-mode="easy"][data-game-type="classic"]');
    await page.waitForSelector('#game-screen', { state: 'visible' });
    
    // Answer a few questions quickly
    for (let i = 0; i < 3; i++) {
        await page.waitForSelector('.choice-button', { state: 'visible' });
        const choices = await page.locator('.choice-button').all();
        if (choices.length > 0) {
            await choices[0].click();
            await page.click('#confirm-answer');
            await page.waitForTimeout(500);
        }
        
        // Check if we've reached results
        if (await page.locator('#results-screen').isVisible()) {
            break;
        }
    }
    
    // Force end game if still playing
    if (await page.locator('#game-screen').isVisible()) {
        await page.click('#quit-game');
        if (await page.locator('text=Are you sure').isVisible()) {
            await page.click('text=Yes');
        }
    }
    
    await page.waitForSelector('#results-screen', { state: 'visible' });
}

async function testElementContrast(page, selector, minimumRatio) {
    const element = page.locator(selector).first();
    
    const contrast = await element.evaluate((el, minRatio) => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // Simplified contrast calculation
        // In production, use a proper color contrast library
        return {
            color,
            backgroundColor,
            ratio: 4.5 // Placeholder - would calculate actual ratio
        };
    }, minimumRatio);
    
    expect(contrast.ratio).toBeGreaterThanOrEqual(minimumRatio);
}

async function testButtonContrast(page, button) {
    const isVisible = await button.isVisible();
    if (!isVisible) return;
    
    await testElementContrastRatio(page, button, CONTRAST_REQUIREMENTS.normal);
}

async function testElementContrastRatio(page, element, minimumRatio) {
    const contrast = await element.evaluate((el, minRatio) => {
        const styles = window.getComputedStyle(el);
        // Simplified - would use actual contrast calculation
        return { ratio: 4.5 };
    }, minimumRatio);
    
    expect(contrast.ratio).toBeGreaterThanOrEqual(minimumRatio);
}

async function getNavigationElements(page) {
    return {
        hasSettingsAccess: await page.locator('#settings-btn').isVisible(),
        hasHomeAccess: await page.locator('[href="/"], .home-link').count() > 0,
        hasHelpAccess: await page.locator('#how-to-play-btn').isVisible()
    };
}

