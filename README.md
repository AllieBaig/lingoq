



# LingoQuest 🎮

A progressive web application (PWA) word game designed for accessibility and engagement across all age groups. LingoQuest features multiple game modes, multilingual support, and adaptive themes optimized for seniors and students.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://web.dev/progressive-web-apps/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1-brightgreen.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![ES Modules](https://img.shields.io/badge/ES-Modules-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## 🌟 Features

### 🎯 Game Modes
- **Classic Mode**: Traditional word categorization with Names, Places, Animals, and Things
- **HollyBolly Mode**: Guess Hollywood movies from Bollywood-inspired clues with rewards system
- **MixLingo Mode**: Bilingual sentence completion challenges

### 👥 User Profiles
- **Senior-Friendly**: Large buttons, high contrast, simplified navigation
- **Student Themes**: Engaging animations, modern design, vibrant colors
- **Educator Tools**: Progress tracking and customizable difficulty

### 🌍 Accessibility & Internationalization
- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- Multiple languages: English, French, German, Spanish, Italian, Portuguese
- Dyslexic-friendly fonts
- Reduced motion options

### 🎨 Adaptive Themes
- **Senior Themes**: Light, Dark, High Contrast, Sepia, Blue Light Filter
- **Student Themes**: Neon Glow, Retro Arcade, Nature Forest, Space Galaxy, Candy Pop
- **Cartoon Themes**: Jetsons retro-futuristic style

## 🚀 Quick Start

### Online Play
Visit [LingoQuest](https://alliebaig.github.io/lingoq/) to play instantly in your browser.

### Local Development

```bash
# Clone the repository
git clone https://github.com/alliebaig/lingoq.git
cd lingoq

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Build optimized version
npm run build

# Serve production build
npm run start
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript ES6+ Modules
- **PWA**: Service Worker, Web App Manifest
- **Styling**: CSS3 with Custom Properties
- **Build**: NPM Scripts, ESLint, Stylelint
- **Testing**: Jest, Playwright

### Project Structure
```
lingoq/
├── components/           # HTML component templates
├── css/                 # Stylesheets and themes
├── js/
│   ├── modules/         # ES6 modules
│   │   ├── core/        # Core application modules
│   │   ├── game/        # Game logic and state
│   │   ├── settings/    # Settings and preferences
│   │   └── utils/       # Utility functions
│   ├── data/            # Game data and translations
│   └── workers/         # Web Workers for performance
├── assets/              # Images, icons, fonts
├── config/              # Configuration files
└── tests/               # Test files
```

## 🎮 Game Modes Guide

### Classic Mode
Choose the correct word for each category that starts with the given letter.

**Categories:**
- 👤 **Names**: Person's first names (Alice, Bob, Charlie)
- 📍 **Places**: Cities, countries, locations (Paris, Brazil, Mountain)
- 🐾 **Animals**: Any creatures (Cat, Eagle, Whale)
- 📦 **Things**: Objects or items (Book, Car, Phone)

**Difficulty Levels:**
- **Easy**: 2 choices per question
- **Medium**: 3 choices per question  
- **Hard**: 4 choices per question

### HollyBolly Mode
Guess Hollywood movies using Bollywood-inspired clues with an exciting rewards system.

**How it works:**
Each movie has three clues: Place, Animal, and Thing that appear in the film.

**Example:**
- Place: New York City
- Animal: Spider  
- Thing: Web
- **Answer**: Spider-Man

**Reward System:**
- 💰 **1 Correct**: Box office earnings comparison
- 🎭 **2 in a Row**: Directors' net worth data
- ⭐ **3 in a Row**: Lead actors' net worth comparison

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- NPM 8+
- Modern browser with ES6 module support

### Development Commands

```bash
# Development server with live reload
npm run dev

# Linting
npm run lint           # JavaScript
npm run lint:css       # CSS

# Testing
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests

# Build optimization
npm run minify:css     # Minify CSS
npm run minify:js      # Minify JavaScript

# PWA analysis
npm run lighthouse     # Lighthouse audit
npm run pwa-audit      # PWA Builder validation
```

### Code Style

The project follows strict ESLint and Stylelint configurations:

- ES6+ modules only
- No jQuery or external frameworks
- Semantic HTML5
- CSS custom properties for theming
- Accessible markup patterns

### Adding New Themes

1. Create theme configuration in `js/data/themes/`
2. Add CSS file in `css/themes/`
3. Register theme in `js/modules/settings/themeManager.js`
4. Update theme selector in settings

### Adding New Languages

1. Create translation file in `js/data/translations/`
2. Update `languageValidator.js` with language metadata
3. Add language option to settings interface
4. Test with actual native speakers

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Accessibility Testing
```bash
npm run test:a11y
```

### Performance Testing
```bash
npm run lighthouse
```

## 📱 PWA Features

- **Offline Support**: Full game functionality without internet
- **Install Prompt**: Add to home screen on mobile/desktop
- **Background Sync**: Sync progress when connection restored
- **Push Notifications**: Game reminders (optional)
- **App Shortcuts**: Quick access to favorite game modes

## ♿ Accessibility

LingoQuest is designed with accessibility as a primary concern:

- **Visual**: High contrast themes, scalable fonts, color-blind friendly
- **Motor**: Large touch targets, keyboard navigation, reduced motion
- **Cognitive**: Simple navigation, clear instructions, progress indicators
- **Auditory**: Visual feedback for all audio cues

## 🌍 Internationalization

Currently supported languages:
- 🇺🇸 English (default)
- 🇫🇷 French
- 🇩🇪 German  
- 🇪🇸 Spanish
- 🇮🇹 Italian
- 🇵🇹 Portuguese

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Areas for Contribution
- New game modes
- Additional languages
- Theme designs
- Accessibility improvements
- Performance optimizations
- Bug fixes

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Credits

### Development Team
- **Lead Developer**: [AllieBaig]
- **UI/UX Design**: Community Contributors
- **Accessibility Consultant**: [Consultant Name]
- **Translations**: Community Contributors

### Special Thanks
- Senior user testing group
- Student beta testers
- Accessibility advocacy organizations
- Open source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/alliebaig/lingoq/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alliebaig/lingoq/discussions)
- **Email**: support@lingoquest.app

## 🗺️ Roadmap

### Version 1.1
- [ ] MixLingo mode completion
- [ ] Score sharing and social features
- [ ] Additional student themes
- [ ] Voice recognition support

### Version 1.2
- [ ] Multiplayer mode
- [ ] Teacher dashboard
- [ ] Progress analytics
- [ ] More languages (Arabic, Hindi, Japanese)

### Version 2.0
- [ ] AI-powered difficulty adjustment
- [ ] Custom question creation
- [ ] Virtual reality mode
- [ ] Advanced analytics dashboard

---

**Made with ❤️ for learners of all ages**

*LingoQuest - Where words become adventures!*




