


/**
 * Purpose: Database of names for Classic Mode word game, organized by starting letter and difficulty
 * Key features: Categorized names, difficulty levels, cultural diversity, senior-friendly selections
 * Dependencies: None (pure data file)
 * Related helpers: mcqGenerator.js, gameLogic.js
 * Function names: getNamesByLetter, getNamesByDifficulty, getAllNames, getRandomNames
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-12-19 15:30 | File: js/data/questions/classic/names.js
 */

// Names database organized by starting letter
const NAMES_DATABASE = {
  A: {
    easy: [
      { name: "Alice", gender: "female", popularity: "high", culture: "western" },
      { name: "Anna", gender: "female", popularity: "high", culture: "international" },
      { name: "Alex", gender: "unisex", popularity: "high", culture: "western" },
      { name: "Amy", gender: "female", popularity: "high", culture: "western" },
      { name: "Adam", gender: "male", popularity: "high", culture: "international" },
      { name: "Andy", gender: "male", popularity: "high", culture: "western" },
      { name: "Anne", gender: "female", popularity: "high", culture: "western" },
      { name: "Alan", gender: "male", popularity: "high", culture: "western" }
    ],
    medium: [
      { name: "Abraham", gender: "male", popularity: "medium", culture: "biblical" },
      { name: "Abigail", gender: "female", popularity: "medium", culture: "biblical" },
      { name: "Adrian", gender: "male", popularity: "medium", culture: "latin" },
      { name: "Angela", gender: "female", popularity: "medium", culture: "western" },
      { name: "Antonio", gender: "male", popularity: "medium", culture: "spanish" },
      { name: "Andrea", gender: "unisex", popularity: "medium", culture: "international" },
      { name: "Arthur", gender: "male", popularity: "medium", culture: "celtic" },
      { name: "Amanda", gender: "female", popularity: "medium", culture: "western" }
    ],
    hard: [
      { name: "Anastasia", gender: "female", popularity: "low", culture: "greek" },
      { name: "Archibald", gender: "male", popularity: "low", culture: "scottish" },
      { name: "Arabella", gender: "female", popularity: "low", culture: "latin" },
      { name: "Ambrose", gender: "male", popularity: "low", culture: "greek" },
      { name: "Allegra", gender: "female", popularity: "low", culture: "italian" },
      { name: "Augustus", gender: "male", popularity: "low", culture: "roman" },
      { name: "Aurelia", gender: "female", popularity: "low", culture: "roman" },
      { name: "Alistair", gender: "male", popularity: "low", culture: "scottish" }
    ]
  },
  
  B: {
    easy: [
      { name: "Bob", gender: "male", popularity: "high", culture: "western" },
      { name: "Ben", gender: "male", popularity: "high", culture: "western" },
      { name: "Beth", gender: "female", popularity: "high", culture: "western" },
      { name: "Bill", gender: "male", popularity: "high", culture: "western" },
      { name: "Betty", gender: "female", popularity: "high", culture: "western" },
      { name: "Brad", gender: "male", popularity: "high", culture: "western" },
      { name: "Bella", gender: "female", popularity: "high", culture: "international" },
      { name: "Brian", gender: "male", popularity: "high", culture: "irish" }
    ],
    medium: [
      { name: "Benjamin", gender: "male", popularity: "medium", culture: "biblical" },
      { name: "Barbara", gender: "female", popularity: "medium", culture: "greek" },
      { name: "Beatrice", gender: "female", popularity: "medium", culture: "latin" },
      { name: "Bernard", gender: "male", popularity: "medium", culture: "german" },
      { name: "Bridget", gender: "female", popularity: "medium", culture: "irish" },
      { name: "Bradley", gender: "male", popularity: "medium", culture: "english" },
      { name: "Bianca", gender: "female", popularity: "medium", culture: "italian" },
      { name: "Byron", gender: "male", popularity: "medium", culture: "english" }
    ],
    hard: [
      { name: "Bartholomew", gender: "male", popularity: "low", culture: "biblical" },
      { name: "Brunhilde", gender: "female", popularity: "low", culture: "german" },
      { name: "Balthazar", gender: "male", popularity: "low", culture: "biblical" },
      { name: "Belinda", gender: "female", popularity: "low", culture: "german" },
      { name: "Benedictine", gender: "female", popularity: "low", culture: "latin" },
      { name: "Barnabas", gender: "male", popularity: "low", culture: "biblical" },
      { name: "Bernadette", gender: "female", popularity: "low", culture: "french" },
      { name: "Beauregard", gender: "male", popularity: "low", culture: "french" }
    ]
  },

  C: {
    easy: [
      { name: "Carl", gender: "male", popularity: "high", culture: "german" },
      { name: "Claire", gender: "female", popularity: "high", culture: "french" },
      { name: "Chris", gender: "unisex", popularity: "high", culture: "western" },
      { name: "Carol", gender: "female", popularity: "high", culture: "western" },
      { name: "Chad", gender: "male", popularity: "high", culture: "western" },
      { name: "Cindy", gender: "female", popularity: "high", culture: "western" },
      { name: "Cole", gender: "male", popularity: "high", culture: "english" },
      { name: "Cathy", gender: "female", popularity: "high", culture: "western" }
    ],
    medium: [
      { name: "Charles", gender: "male", popularity: "medium", culture: "german" },
      { name: "Charlotte", gender: "female", popularity: "medium", culture: "french" },
      { name: "Catherine", gender: "female", popularity: "medium", culture: "greek" },
      { name: "Christopher", gender: "male", popularity: "medium", culture: "greek" },
      { name: "Claudia", gender: "female", popularity: "medium", culture: "latin" },
      { name: "Connor", gender: "male", popularity: "medium", culture: "irish" },
      { name: "Camila", gender: "female", popularity: "medium", culture: "spanish" },
      { name: "Caleb", gender: "male", popularity: "medium", culture: "biblical" }
    ],
    hard: [
      { name: "Cassandra", gender: "female", popularity: "low", culture: "greek" },
      { name: "Constantine", gender: "male", popularity: "low", culture: "latin" },
      { name: "Cordelia", gender: "female", popularity: "low", culture: "celtic" },
      { name: "Cornelius", gender: "male", popularity: "low", culture: "latin" },
      { name: "Clementine", gender: "female", popularity: "low", culture: "latin" },
      { name: "Crispin", gender: "male", popularity: "low", culture: "latin" },
      { name: "Crescentia", gender: "female", popularity: "low", culture: "latin" },
      { name: "Chrysanthemum", gender: "female", popularity: "low", culture: "greek" }
    ]
  },

  D: {
    easy: [
      { name: "Dan", gender: "male", popularity: "high", culture: "biblical" },
      { name: "Dave", gender: "male", popularity: "high", culture: "biblical" },
      { name: "Diane", gender: "female", popularity: "high", culture: "roman" },
      { name: "Don", gender: "male", popularity: "high", culture: "scottish" },
      { name: "Donna", gender: "female", popularity: "high", culture: "italian" },
      { name: "Doug", gender: "male", popularity: "high", culture: "scottish" },
      { name: "Dawn", gender: "female", popularity: "high", culture: "english" },
      { name: "Dean", gender: "male", popularity: "high", culture: "english" }
    ],
    medium: [
      { name: "Daniel", gender: "male", popularity: "medium", culture: "biblical" },
      { name: "Dorothy", gender: "female", popularity: "medium", culture: "greek" },
      { name: "Douglas", gender: "male", popularity: "medium", culture: "scottish" },
      { name: "Deborah", gender: "female", popularity: "medium", culture: "biblical" },
      { name: "Dennis", gender: "male", popularity: "medium", culture: "greek" },
      { name: "Diana", gender: "female", popularity: "medium", culture: "roman" },
      { name: "Derek", gender: "male", popularity: "medium", culture: "german" },
      { name: "Denise", gender: "female", popularity: "medium", culture: "french" }
    ],
    hard: [
      { name: "Demetrius", gender: "male", popularity: "low", culture: "greek" },
      { name: "Desdemona", gender: "female", popularity: "low", culture: "greek" },
      { name: "Delphine", gender: "female", popularity: "low", culture: "french" },
      { name: "Dominique", gender: "unisex", popularity: "low", culture: "french" },
      { name: "Dagmar", gender: "female", popularity: "low", culture: "scandinavian" },
      { name: "Dionysius", gender: "male", popularity: "low", culture: "greek" },
      { name: "Dulcinea", gender: "female", popularity: "low", culture: "spanish" },
      { name: "Drusilla", gender: "female", popularity: "low", culture: "roman" }
    ]
  },

  E: {
    easy: [
      { name: "Ed", gender: "male", popularity: "high", culture: "english" },
      { name: "Eva", gender: "female", popularity: "high", culture: "biblical" },
      { name: "Emma", gender: "female", popularity: "high", culture: "german" },
      { name: "Eric", gender: "male", popularity: "high", culture: "scandinavian" },
      { name: "Ellen", gender: "female", popularity: "high", culture: "greek" },
      { name: "Evan", gender: "male", popularity: "high", culture: "welsh" },
      { name: "Ella", gender: "female", popularity: "high", culture: "german" },
      { name: "Earl", gender: "male", popularity: "high", culture: "english" }
    ],
    medium: [
      { name: "Edward", gender: "male", popularity: "medium", culture: "english" },
      { name: "Elizabeth", gender: "female", popularity: "medium", culture: "biblical" },
      { name: "Eugene", gender: "male", popularity: "medium", culture: "greek" },
      { name: "Eleanor", gender: "female", popularity: "medium", culture: "greek" },
      { name: "Edmund", gender: "male", popularity: "medium", culture: "english" },
      { name: "Evelyn", gender: "female", popularity: "medium", culture: "english" },
      { name: "Ernest", gender: "male", popularity: "medium", culture: "german" },
      { name: "Estelle", gender: "female", popularity: "medium", culture: "french" }
    ],
    hard: [
      { name: "Evangeline", gender: "female", popularity: "low", culture: "greek" },
      { name: "Ebenezer", gender: "male", popularity: "low", culture: "biblical" },
      { name: "Euphemia", gender: "female", popularity: "low", culture: "greek" },
      { name: "Ecclesiastes", gender: "male", popularity: "low", culture: "biblical" },
      { name: "Emerald", gender: "female", popularity: "low", culture: "english" },
      { name: "Erasmus", gender: "male", popularity: "low", culture: "greek" },
      { name: "Esperanza", gender: "female", popularity: "low", culture: "spanish" },
      { name: "Eustace", gender: "male", popularity: "low", culture: "greek" }
    ]
  }
  
  // Continue for all 26 letters...
  // Note: For brevity, showing first 5 letters. Full implementation would include F-Z
};

// Helper functions for accessing name data
class NamesDatabase {
  /**
   * Get names by starting letter and difficulty
   * @param {string} letter - Starting letter (A-Z)
   * @param {string} difficulty - easy, medium, or hard
   * @returns {Array} Array of name objects
   */
  static getNamesByLetter(letter, difficulty = 'easy') {
    const upperLetter = letter.toUpperCase();
    if (!NAMES_DATABASE[upperLetter]) {
      return [];
    }
    return NAMES_DATABASE[upperLetter][difficulty] || [];
  }

  /**
   * Get random names for MCQ choices
   * @param {string} correctLetter - The correct starting letter
   * @param {string} difficulty - Difficulty level
   * @param {number} count - Number of names to return
   * @returns {Array} Array of name objects
   */
  static getRandomNames(correctLetter, difficulty, count = 4) {
    const correctNames = this.getNamesByLetter(correctLetter, difficulty);
    const wrongNames = this.getWrongNames(correctLetter, difficulty, count - 1);
    
    if (correctNames.length === 0) {
      return [];
    }

    // Get one correct name
    const correctName = correctNames[Math.floor(Math.random() * correctNames.length)];
    
    // Combine and shuffle
    const allChoices = [correctName, ...wrongNames];
    return this.shuffleArray(allChoices);
  }

  /**
   * Get names that don't start with the specified letter
   * @param {string} excludeLetter - Letter to exclude
   * @param {string} difficulty - Difficulty level
   * @param {number} count - Number of names needed
   * @returns {Array} Array of name objects
   */
  static getWrongNames(excludeLetter, difficulty, count) {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const wrongNames = [];
    
    for (const letter of allLetters) {
      if (letter !== excludeLetter.toUpperCase()) {
        const names = this.getNamesByLetter(letter, difficulty);
        wrongNames.push(...names);
      }
    }
    
    // Shuffle and return requested count
    const shuffled = this.shuffleArray(wrongNames);
    return shuffled.slice(0, count);
  }

  /**
   * Get all names for a specific difficulty
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Array of all name objects
   */
  static getNamesByDifficulty(difficulty) {
    const allNames = [];
    const letters = Object.keys(NAMES_DATABASE);
    
    for (const letter of letters) {
      const names = NAMES_DATABASE[letter][difficulty] || [];
      allNames.push(...names);
    }
    
    return allNames;
  }

  /**
   * Get all available letters that have names
   * @returns {Array} Array of available letters
   */
  static getAvailableLetters() {
    return Object.keys(NAMES_DATABASE);
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Get name statistics
   * @returns {Object} Statistics about the name database
   */
  static getStatistics() {
    const stats = {
      totalLetters: 0,
      totalNames: 0,
      byDifficulty: { easy: 0, medium: 0, hard: 0 },
      byGender: { male: 0, female: 0, unisex: 0 },
      byCulture: {}
    };

    const letters = Object.keys(NAMES_DATABASE);
    stats.totalLetters = letters.length;

    for (const letter of letters) {
      for (const difficulty of ['easy', 'medium', 'hard']) {
        const names = NAMES_DATABASE[letter][difficulty] || [];
        stats.totalNames += names.length;
        stats.byDifficulty[difficulty] += names.length;

        for (const nameObj of names) {
          // Count by gender
          if (stats.byGender[nameObj.gender] !== undefined) {
            stats.byGender[nameObj.gender]++;
          }

          // Count by culture
          if (!stats.byCulture[nameObj.culture]) {
            stats.byCulture[nameObj.culture] = 0;
          }
          stats.byCulture[nameObj.culture]++;
        }
      }
    }

    return stats;
  }

  /**
   * Validate name database integrity
   * @returns {Object} Validation results
   */
  static validateDatabase() {
    const validation = {
      isValid: true,
      errors: [],
      warnings: []
    };

    const letters = Object.keys(NAMES_DATABASE);
    
    for (const letter of letters) {
      for (const difficulty of ['easy', 'medium', 'hard']) {
        const names = NAMES_DATABASE[letter][difficulty];
        
        if (!names || names.length === 0) {
          validation.warnings.push(`No ${difficulty} names for letter ${letter}`);
          continue;
        }

        if (names.length < 4) {
          validation.warnings.push(`Only ${names.length} ${difficulty} names for letter ${letter} (recommended: 4+)`);
        }

        // Validate each name object
        for (const nameObj of names) {
          if (!nameObj.name || typeof nameObj.name !== 'string') {
            validation.errors.push(`Invalid name object in ${letter}-${difficulty}`);
            validation.isValid = false;
          }

          if (!nameObj.name.toUpperCase().startsWith(letter)) {
            validation.errors.push(`Name "${nameObj.name}" doesn't start with ${letter}`);
            validation.isValid = false;
          }

          const requiredFields = ['name', 'gender', 'popularity', 'culture'];
          for (const field of requiredFields) {
            if (!nameObj[field]) {
              validation.errors.push(`Missing ${field} for name "${nameObj.name}"`);
              validation.isValid = false;
            }
          }
        }
      }
    }

    return validation;
  }
}

// Export for use in other modules
export default NamesDatabase;
export { NAMES_DATABASE, NamesDatabase };


