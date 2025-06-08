




# Contributing to LingoQuest

Thank you for your interest in contributing to LingoQuest! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher
- Modern web browser with ES6 module support
- Git for version control

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/LingoQuest.git
cd LingoQuest
```

3. Add the original repository as upstream:
```bash
git remote add upstream https://github.com/AllieBaig/LingoQuest.git
```

## Development Setup

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm start           # Start production server

# Code Quality
npm run lint        # Lint JavaScript files
npm run lint:css    # Lint CSS files
npm run format      # Format code with Prettier

# Testing
npm test           # Run all tests
npm run test:unit  # Run unit tests
npm run test:e2e   # Run end-to-end tests

# Build & Deploy
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages

# Analysis
npm run lighthouse # Run Lighthouse audit
npm run pwa-audit  # Validate PWA features
```

## Project Structure

```
LingoQuest/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker
├── css/                   # Stylesheets
│   ├── main.css          # Main styles
│   ├── themes.css        # Theme definitions
│   └── themes/           # Individual theme files
├── js/                    # JavaScript modules
│   ├── main.js           # Application entry point
│   ├── modules/          # Core modules
│   │   ├── core/         # Core functionality
│   │   ├── game/         # Game logic
│   │   ├── settings/     # Settings management
│   │   └── utils/        # Utility functions
│   ├── data/             # Game data
│   │   ├── questions/    # Question databases
│   │   ├── translations/ # Language files
│   │   └── themes/       # Theme configurations
│   └── workers/          # Web workers
├── components/            # HTML components
├── assets/               # Static assets
├── docs/                 # Documentation
└── tests/                # Test files
```

## Coding Standards

### JavaScript

- **ES6 Modules**: Always use ES6 import/export syntax
- **File Naming**: Use camelCase for files, PascalCase for classes
- **Code Style**: Follow the ESLint configuration
- **Comments**: Use JSDoc for functions and classes

#### Example:

```javascript
/**
 * Purpose: Utility function for array manipulation
 * @param {Array} array - Input array
 * @param {number} count - Number of elements to select
 * @returns {Array} Randomly selected elements
 */
export function getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
```

### CSS

- **Naming**: Use kebab-case for CSS classes
- **Organization**: Group related styles together
- **Custom Properties**: Use CSS custom properties for theming
- **Mobile First**: Write mobile-first responsive styles

#### Example:

```css
.game-card {
    --card-padding: 1rem;
    --card-radius: 0.5rem;
    
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    background: var(--surface-color);
}

@media (min-width: 768px) {
    .game-card {
        --card-padding: 1.5rem;
    }
}
```

### HTML

- **Semantic HTML**: Use appropriate semantic elements
- **Accessibility**: Include ARIA attributes when needed
- **Internationalization**: Use data-i18n attributes for translatable text

#### Example:

```html
<button 
    class="btn btn-primary" 
    data-i18n="buttons.start"
    aria-label="Start new game">
    Start Game
</button>
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(game): add HollyBolly mode with movie clues

- Implement movie question generation
- Add clue system for Place, Animal, Thing
- Create reward system for correct streaks

Closes #123
```

```bash
fix(accessibility): improve keyboard navigation

- Fix tab order in game screen
- Add focus indicators for all interactive elements
- Ensure screen reader compatibility

Fixes #456
```

## Pull Request Process

### Before Submitting

1. **Update your fork**:
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create feature branch**:
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**:
   - Follow coding standards
   - Add/update tests
   - Update documentation
   - Test thoroughly

4. **Commit your changes**:
```bash
git add .
git commit -m "feat(scope): descriptive message"
```

5. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

### Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] All tests pass (`npm test`)
- [ ] Code is properly documented
- [ ] Accessibility guidelines followed
- [ ] PWA functionality not broken
- [ ] Browser compatibility maintained
- [ ] Performance impact considered
- [ ] Security implications reviewed

### Review Process

1. Submit pull request with clear description
2. Automated checks must pass (CI/CD)
3. Code review by maintainers
4. Address feedback if needed
5. Approval and merge

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Environment**: Browser, OS, device
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Console Errors**: Any JavaScript errors

### Feature Requests

For feature requests, include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Use Cases**: When would this be used?

## Testing

### Unit Tests

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Watch mode for development
npm run test:unit -- --watch
```

### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- --grep "game flow"
```

### Manual Testing

Before submitting:

1. Test all game modes (Classic, HollyBolly)
2. Test all difficulty levels
3. Test accessibility features
4. Test on different devices/browsers
5. Test offline functionality
6. Test theme switching
7. Test language switching

## Documentation

### Code Documentation

- Use JSDoc for JavaScript functions and classes
- Include purpose, parameters, return values
- Add examples for complex functions
- Document any side effects

### User Documentation

- Update README.md for user-facing changes
- Add/update inline help text
- Update instruction screens
- Maintain translation files

### API Documentation

- Document any new configuration options
- Update theme documentation
- Document event system changes
- Update module interfaces

## Accessibility Guidelines

### WCAG Compliance

- Maintain WCAG 2.1 AA compliance
- Test with screen readers
- Ensure keyboard navigation
- Provide sufficient color contrast
- Include alternative text for images

### Testing Tools

- Use axe-core for automated testing
- Test with NVDA/JAWS screen readers
- Test keyboard-only navigation
- Validate with Lighthouse accessibility audit

## Performance Guidelines

### Optimization

- Minimize JavaScript bundle size
- Optimize images and assets
- Use efficient CSS selectors
- Implement proper caching strategies
- Monitor Core Web Vitals

### PWA Requirements

- Maintain service worker functionality
- Ensure offline capability
- Keep manifest.json updated
- Test installability
- Validate with PWA audit tools

## Security Considerations

- Sanitize all user inputs
- Avoid inline scripts and styles
- Use Content Security Policy
- Validate data on both client and server
- Follow OWASP guidelines

## Internationalization

### Adding New Languages

1. Create translation file in `js/data/translations/`
2. Update `languageValidator.js`
3. Test all UI elements
4. Ensure proper text direction (LTR/RTL)
5. Validate with native speakers

### Translation Guidelines

- Keep translations concise
- Maintain consistent terminology
- Consider cultural context
- Test with longer/shorter text
- Preserve HTML structure in translations

## Release Process

### Version Numbering

We follow Semantic Versioning (semver):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped in package.json and manifest.json
- [ ] Changelog updated
- [ ] Security audit passed
- [ ] Performance metrics acceptable
- [ ] Accessibility compliance verified

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: maintainer@lingoquest.app

### Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web standards reference
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [PWA Documentation](https://web.dev/progressive-web-apps/) - PWA best practices

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to LingoQuest! 🎉



