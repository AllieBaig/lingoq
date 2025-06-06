
// LingoQuest - HollyBolly Reward System
// ES6 Module for managing movie-based rewards and achievements
// Integrates with game progression and UI display

export class RewardSystem {
    constructor() {
        this.currentStreak = 0;
        this.totalCorrect = 0;
        this.rewardHistory = [];
        this.activeRewards = new Set();
        this.rewardThresholds = {
            boxOffice: 1,    // 1 correct answer
            director: 2,     // 2 in a row
            hero: 3          // 3 in a row
        };
    }
    
    processAnswer(isCorrect, movieData) {
        if (isCorrect) {
            this.currentStreak++;
            this.totalCorrect++;
            this.checkRewardUnlocks(movieData);
        } else {
            this.currentStreak = 0;
            this.clearActiveRewards();
        }
        
        return this.getActiveRewards();
    }
    
    checkRewardUnlocks(movieData) {
        // Box office reward (1 correct)
        if (this.currentStreak >= this.rewardThresholds.boxOffice && 
            !this.activeRewards.has('boxOffice')) {
            this.unlockBoxOfficeReward(movieData);
        }
        
        // Director reward (2 in a row)
        if (this.currentStreak >= this.rewardThresholds.director && 
            !this.activeRewards.has('director')) {
            this.unlockDirectorReward(movieData);
        }
        
        // Hero reward (3 in a row)
        if (this.currentStreak >= this.rewardThresholds.hero && 
            !this.activeRewards.has('hero')) {
            this.unlockHeroReward(movieData);
        }
    }
    
    unlockBoxOfficeReward(movieData) {
        const reward = {
            type: 'boxOffice',
            title: 'Box Office Revealed! 💰',
            data: {
                hollywood: this.formatCurrency(movieData.boxOffice.hollywood),
                bollywood: this.formatCurrency(movieData.boxOffice.bollywood),
                comparison: this.getBoxOfficeComparison(movieData.boxOffice)
            },
            icon: '💰',
            unlocked: Date.now()
        };
        
        this.activeRewards.add('boxOffice');
        this.rewardHistory.push(reward);
        this.displayReward(reward);
        
        return reward;
    }
    
    unlockDirectorReward(movieData) {
        const reward = {
            type: 'director',
            title: 'Director Details! 🎬',
            data: {
                name: movieData.director.name,
                netWorth: this.formatCurrency(movieData.director.netWorth),
                funFact: this.getDirectorFact(movieData.director)
            },
            icon: '🎬',
            unlocked: Date.now()
        };
        
        this.activeRewards.add('director');
        this.rewardHistory.push(reward);
        this.displayReward(reward);
        
        return reward;
    }
    
    unlockHeroReward(movieData) {
        const reward = {
            type: 'hero',
            title: 'Lead Actor Revealed! ⭐',
            data: {
                name: movieData.actors.lead,
                netWorth: this.formatCurrency(movieData.actors.netWorth),
                achievement: this.getActorAchievement(movieData.actors)
            },
            icon: '⭐',
            unlocked: Date.now()
        };
        
        this.activeRewards.add('hero');
        this.rewardHistory.push(reward);
        this.displayReward(reward);
        
        return reward;
    }
    
    getBoxOfficeComparison(boxOffice) {
        const hollywood = boxOffice.hollywood;
        const bollywood = boxOffice.bollywood;
        const ratio = hollywood / bollywood;
        
        if (ratio > 2) {
            return `Hollywood earned ${ratio.toFixed(1)}x more than Bollywood!`;
        } else if (ratio > 1.5) {
            return `Hollywood had a strong lead over Bollywood earnings.`;
        } else if (ratio > 1.1) {
            return `Hollywood slightly outperformed Bollywood.`;
        } else {
            return `Both markets performed similarly well!`;
        }
    }
    
    getDirectorFact(director) {
        const facts = [
            `Known for innovative filmmaking techniques`,
            `Multiple award winner and industry pioneer`,
            `Master of visual storytelling`,
            `Influenced generations of filmmakers`,
            `Box office success across multiple genres`
        ];
        
        return facts[Math.floor(Math.random() * facts.length)];
    }
    
    getActorAchievement(actor) {
        const achievements = [
            `Global superstar with massive fan following`,
            `Academy Award nominee/winner`,
            `Highest-paid actor in multiple years`,
            `Cultural icon and philanthropy leader`,
            `Box office record holder`
        ];
        
        return achievements[Math.floor(Math.random() * achievements.length)];
    }
    
    displayReward(reward) {
        // Create reward display element
        const rewardElement = this.createRewardElement(reward);
        
        // Add to rewards container
        const container = document.getElementById('rewards-container') || 
                         this.createRewardsContainer();
        
        container.appendChild(rewardElement);
        
        // Animate entrance
        setTimeout(() => {
            rewardElement.classList.add('reward-visible');
        }, 100);
        
        // Auto-hide after 5 seconds unless pinned
        if (!reward.pinned) {
            setTimeout(() => {
                this.hideReward(rewardElement);
            }, 5000);
        }
        
        // Trigger custom event
        const event = new CustomEvent('rewardUnlocked', {
            detail: { reward, streak: this.currentStreak }
        });
        document.dispatchEvent(event);
    }
    
    createRewardElement(reward) {
        const element = document.createElement('div');
        element.className = 'reward-card';
        element.setAttribute('data-reward-type', reward.type);
        
        element.innerHTML = `
            <div class="reward-header">
                <span class="reward-icon">${reward.icon}</span>
                <h3 class="reward-title">${reward.title}</h3>
                <button class="reward-close" aria-label="Close reward">×</button>
            </div>
            <div class="reward-content">
                ${this.generateRewardContent(reward)}
            </div>
            <div class="reward-footer">
                <span class="reward-streak">Streak: ${this.currentStreak}</span>
                <button class="reward-pin" aria-label="Pin reward">📌</button>
            </div>
        `;
        
        // Add event listeners
        const closeBtn = element.querySelector('.reward-close');
        const pinBtn = element.querySelector('.reward-pin');
        
        closeBtn.addEventListener('click', () => this.hideReward(element));
        pinBtn.addEventListener('click', () => this.togglePin(element, reward));
        
        return element;
    }
    
    generateRewardContent(reward) {
        switch (reward.type) {
            case 'boxOffice':
                return `
                    <div class="box-office-data">
                        <div class="earnings-row">
                            <span class="label">Hollywood:</span>
                            <span class="value">${reward.data.hollywood}</span>
                        </div>
                        <div class="earnings-row">
                            <span class="label">Bollywood:</span>
                            <span class="value">${reward.data.bollywood}</span>
                        </div>
                        <p class="comparison">${reward.data.comparison}</p>
                    </div>
                `;
                
            case 'director':
                return `
                    <div class="director-data">
                        <div class="info-row">
                            <span class="label">Director:</span>
                            <span class="value">${reward.data.name}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Net Worth:</span>
                            <span class="value">${reward.data.netWorth}</span>
                        </div>
                        <p class="fun-fact">${reward.data.funFact}</p>
                    </div>
                `;
                
            case 'hero':
                return `
                    <div class="actor-data">
                        <div class="info-row">
                            <span class="label">Lead Actor:</span>
                            <span class="value">${reward.data.name}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Net Worth:</span>
                            <span class="value">${reward.data.netWorth}</span>
                        </div>
                        <p class="achievement">${reward.data.achievement}</p>
                    </div>
                `;
                
            default:
                return '<p>Reward unlocked!</p>';
        }
    }
    
    createRewardsContainer() {
        const container = document.createElement('div');
        container.id = 'rewards-container';
        container.className = 'rewards-container';
        
        // Add to game screen or body
        const gameScreen = document.getElementById('game-screen') || document.body;
        gameScreen.appendChild(container);
        
        return container;
    }
    
    hideReward(element) {
        element.classList.add('reward-hiding');
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 300);
    }
    
    togglePin(element, reward) {
        reward.pinned = !reward.pinned;
        element.classList.toggle('reward-pinned', reward.pinned);
        
        const pinBtn = element.querySelector('.reward-pin');
        pinBtn.textContent = reward.pinned ? '📍' : '📌';
    }
    
    formatCurrency(amount) {
        if (amount >= 1000000000) {
            return `$${(amount / 1000000000).toFixed(1)}B`;
        } else if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}K`;
        } else {
            return `$${amount}`;
        }
    }
    
    clearActiveRewards() {
        this.activeRewards.clear();
        
        // Hide all unpinned rewards
        const rewards = document.querySelectorAll('.reward-card:not(.reward-pinned)');
        rewards.forEach(reward => this.hideReward(reward));
    }
    
    getActiveRewards() {
        return Array.from(this.activeRewards);
    }
    
    getCurrentStreak() {
        return this.currentStreak;
    }
    
    getTotalCorrect() {
        return this.totalCorrect;
    }
    
    getRewardHistory() {
        return [...this.rewardHistory];
    }
    
    reset() {
        this.currentStreak = 0;
        this.clearActiveRewards();
    }
    
    destroy() {
        const container = document.getElementById('rewards-container');
        if (container) {
            container.remove();
        }
        
        this.rewardHistory = [];
        this.activeRewards.clear();
    }
}

// Export singleton instance
export const rewardSystem = new RewardSystem();
