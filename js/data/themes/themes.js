
/**
 * File: js/data/themes/themes.js
 * LingoQuest - Theme Configuration Database
 * Central theme registry with metadata for all available themes
 * Dependencies: None (pure data module)
 * Features: Theme definitions, accessibility options, user preferences
 * Functions: getThemeConfig, validateTheme, getThemesByAudience
 * MIT License - https://github.com/AllieBaig/LingoQuest
 * Created: 2025-06-05 14:38:21 UTC
 */

// Theme configuration database
const themes = {
  // Senior-friendly themes (accessibility focused)
  senior: {
    light: {
      id: 'light',
      name: 'Light',
      category: 'senior',
      description: 'Clean, bright theme with high readability',
      cssFile: 'css/themes.css',
      accessibility: {
        highContrast: true,
        largeText: true,
        reducedMotion: true,
        screenReaderFriendly: true
      },
      colors: {
        primary: '#1976d2',
        secondary: '#424242',
        background: '#ffffff',
        text: '#212121'
      },
      features: ['large-buttons', 'clear-typography', 'simple-navigation'],
      recommended: true,
      ageGroup: '60+'
    },
    
    dark: {
      id: 'dark',
      name: 'Dark',
      category: 'senior',
      description: 'Dark theme to reduce eye strain',
      cssFile: 'css/themes.css',
      accessibility: {
        highContrast: true,
        largeText: true,
        reducedMotion: true,
        eyeStrainReduction: true
      },
      colors: {
        primary: '#90caf9',
        secondary: '#e0e0e0',
        background: '#121212',
        text: '#ffffff'
      },
      features: ['eye-comfort', 'low-light-friendly', 'large-buttons'],
      recommended: false,
      ageGroup: '60+'
    },
    
    'high-contrast': {
      id: 'high-contrast',
      name: 'High Contrast',
      category: 'senior',
      description: 'Maximum contrast for visual accessibility',
      cssFile: 'css/themes.css',
      accessibility: {
        highContrast: true,
        largeText: true,
        reducedMotion: true,
        visualImpairmentSupport: true
      },
      colors: {
        primary: '#000000',
        secondary: '#000000',
        background: '#ffffff',
        text: '#000000'
      },
      features: ['maximum-contrast', 'accessibility-compliant', 'large-buttons'],
      recommended: false,
      ageGroup: '60+',
      specialNeeds: 'visual-impairment'
    }
  },
  
  // Student-friendly themes (engaging & modern)
  student: {
    'neon-glow': {
      id: 'neon-glow',
      name: 'Neon Glow',
      category: 'student',
      description: 'Cyberpunk-inspired theme with glowing effects',
      cssFile: 'css/themes/student-neon-glow.css',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        animations: true
      },
      colors: {
        primary: '#00ffff',
        secondary: '#ff0080',
        background: '#0a0a0a',
        text: '#ffffff'
      },
      features: ['glow-effects', 'animations', 'cyberpunk-style', 'dark-theme'],
      mood: 'futuristic',
      ageGroup: '6-18',
      popularity: 'high'
    },
    
    'retro-arcade': {
      id: 'retro-arcade',
      name: 'Retro Arcade',
      category: 'student',
      description: '80s/90s arcade game inspired theme',
      cssFile: 'css/themes/student-retro-arcade.css',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        animations: true
      },
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        background: '#2d1b69',
        text: '#ffffff'
      },
      features: ['pixel-art', 'retro-colors', '8bit-style', 'scanlines'],
      mood: 'nostalgic',
      ageGroup: '6-18',
      popularity: 'high'
    },
    
    'nature-forest': {
      id: 'nature-forest',
      name: 'Nature Forest',
      category: 'student',
      description: 'Calming forest theme with earth tones',
      cssFile: 'css/themes/student-nature-forest.css',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        animations: true,
        calmingEffects: true
      },
      colors: {
        primary: '#2d5016',
        secondary: '#3e6b1f',
        background: '#f1f8e9',
        text: '#1b5e20'
      },
      features: ['organic-shapes', 'nature-animations', 'earth-tones', 'calming'],
      mood: 'peaceful',
      ageGroup: '6-18',
      popularity: 'medium',
      studyFriendly: true
    },
    
    'space-galaxy': {
      id: 'space-galaxy',
      name: 'Space Galaxy',
      category: 'student',
      description: 'Cosmic theme with deep space elements',
      cssFile: 'css/themes/student-space-galaxy.css',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        animations: true
      },
      colors: {
        primary: '#3f51b5',
        secondary: '#9c27b0',
        background: '#0a0e27',
        text: '#ffffff'
      },
      features: ['starfield', 'cosmic-effects', 'space-animations', 'dark-theme'],
      mood: 'adventurous',
      ageGroup: '6-18',
      popularity: 'high'
    },
    
    'candy-pop': {
      id: 'candy-pop',
      name: 'Candy Pop',
      category: 'student',
      description: 'Sweet candy-inspired colorful theme',
      cssFile: 'css/themes/student-candy-pop.css',
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        animations: true
      },
      colors: {
        primary: '#e91e63',
        secondary: '#ff5722',
        background: '#fce4ec',
        text: '#880e4f'
      },
      features: ['bright-colors', 'candy-effects', 'playful-animations', 'light-theme'],
      mood: 'playful',
      ageGroup: '6-18',
      popularity: 'medium'
    }
  }
};

// Theme categories metadata
const categories = {
  senior: {
    name: 'Senior Friendly',
    description: 'Designed for accessibility and ease of use',
    targetAge: '60+',
    focus: 'accessibility',
    features: ['large-text', 'high-contrast', 'simple-navigation', 'reduced-motion']
  },
  student: {
    name: 'Student Themes',
    description: 'Engaging and modern themes for younger users',
    targetAge: '6-18',
    focus: 'engagement',
    features: ['animations', 'modern-design', 'interactive-effects', 'vibrant-colors']
  }
};

/**
 * Get theme configuration by ID
 * @param {string} themeId - Theme identifier
 * @returns {Object|null} Theme configuration object
 */
export function getThemeConfig(themeId) {
  // Search in senior themes
  if (themes.senior[themeId]) {
    return themes.senior[themeId];
  }
  
  // Search in student themes
  if (themes.student[themeId]) {
    return themes.student[themeId];
  }
  
  return null;
}

/**
 * Get all themes by category
 * @param {string} category - 'senior' or 'student'
 * @returns {Object} Themes in the specified category
 */
export function getThemesByCategory(category) {
  return themes[category] || {};
}

/**
 * Get themes suitable for specific age group
 * @param {string} ageGroup - Age group ('6-18' or '60+')
 * @returns {Array} Array of suitable themes
 */
export function getThemesByAgeGroup(ageGroup) {
  const suitableThemes = [];
  
  Object.values(themes.senior).forEach(theme => {
    if (theme.ageGroup === ageGroup) {
      suitableThemes.push(theme);
    }
  });
  
  Object.values(themes.student).forEach(theme => {
    if (theme.ageGroup === ageGroup) {
      suitableThemes.push(theme);
    }
  });
  
  return suitableThemes;
}

/**
 * Get recommended themes for new users
 * @param {string} category - Optional category filter
 * @returns {Array} Array of recommended themes
 */
export function getRecommendedThemes(category = null) {
  const recommended = [];
  
  const searchCategories = category ? [category] : ['senior', 'student'];
  
  searchCategories.forEach(cat => {
    Object.values(themes[cat]).forEach(theme => {
      if (theme.recommended || theme.popularity === 'high') {
        recommended.push(theme);
      }
    });
  });
  
  return recommended;
}

/**
 * Validate theme configuration
 * @param {Object} themeConfig - Theme configuration to validate
 * @returns {boolean} True if valid configuration
 */
export function validateTheme(themeConfig) {
  const requiredFields = ['id', 'name', 'category', 'description', 'cssFile'];
  
  return requiredFields.every(field => 
    themeConfig && themeConfig.hasOwnProperty(field) && themeConfig[field]
  );
}

/**
 * Get theme CSS file path
 * @param {string} themeId - Theme identifier
 * @returns {string|null} CSS file path or null if not found
 */
export function getThemeCSSFile(themeId) {
  const theme = getThemeConfig(themeId);
  return theme ? theme.cssFile : null;
}

/**
 * Check if theme supports accessibility features
 * @param {string} themeId - Theme identifier
 * @param {string} feature - Accessibility feature to check
 * @returns {boolean} True if theme supports the feature
 */
export function supportsAccessibilityFeature(themeId, feature) {
  const theme = getThemeConfig(themeId);
  return theme && theme.accessibility && theme.accessibility[feature] === true;
}

/**
 * Get themes with specific mood
 * @param {string} mood - Mood type ('peaceful', 'playful', 'futuristic', etc.)
 * @returns {Array} Array of themes matching the mood
 */
export function getThemesByMood(mood) {
  const moodThemes = [];
  
  Object.values(themes.student).forEach(theme => {
    if (theme.mood === mood) {
      moodThemes.push(theme);
    }
  });
  
  return moodThemes;
}

/**
 * Get study-friendly themes
 * @returns {Array} Array of themes suitable for studying
 */
export function getStudyFriendlyThemes() {
  const studyThemes = [];
  
  // All senior themes are study-friendly
  Object.values(themes.senior).forEach(theme => {
    studyThemes.push(theme);
  });
  
  // Student themes marked as study-friendly
  Object.values(themes.student).forEach(theme => {
    if (theme.studyFriendly) {
      studyThemes.push(theme);
    }
  });
  
  return studyThemes;
}

// Export main data structures
export { themes, categories };

// Export default configuration
export default {
  themes,
  categories,
  getConfig: getThemeConfig,
  getByCategory: getThemesByCategory,
  getByAge: getThemesByAgeGroup,
  getRecommended: getRecommendedThemes,
  validate: validateTheme,
  getCSSFile: getThemeCSSFile,
  supportsA11y: supportsAccessibilityFeature,
  getByMood: getThemesByMood,
  getStudyFriendly: getStudyFriendlyThemes
};

