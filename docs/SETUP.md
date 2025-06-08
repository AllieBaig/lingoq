




# LingoQuest Setup Guide

## Overview

LingoQuest is a Progressive Web Application (PWA) built with vanilla JavaScript ES6 modules. This guide will help you set up the development environment, configure the application, and deploy it for production use.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Environment Setup](#environment-setup)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 8.0.0 or higher
- **Modern browser** with ES6+ support
- **Git** for version control

### Browser Support

| Browser | Minimum Version | Recommended |
|---------|----------------|-------------|
| Chrome | 80+ | Latest |
| Firefox | 75+ | Latest |
| Safari | 13+ | Latest |
| Edge | 80+ | Latest |

### Development Tools (Recommended)

- **VS Code** with extensions:
  - ES6 String HTML
  - Live Server
  - ESLint
  - Prettier
- **Chrome DevTools** for debugging
- **Lighthouse** for PWA auditing

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/AllieBaig/LingoQuest.git
cd LingoQuest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open in Browser

Navigate to `http://localhost:3000` in your browser.

---

## Development Setup

### Step-by-Step Setup

#### 1. Environment Preparation

```bash
# Check Node.js version
node --version  # Should be 16.0.0+

# Check npm version
npm --version   # Should be 8.0.0+

# Update npm if needed
npm install -g npm@latest
```

#### 2. Project Installation

```bash
# Clone the repository
git clone https://github.com/AllieBaig/LingoQuest.git
cd LingoQuest

# Install all dependencies
npm install

# Verify installation
npm run validate
```

#### 3. Development Server Options

```bash
# Option 1: Live Server (recommended for development)
npm run dev

# Option 2: Simple HTTP server
npm start

# Option 3: HTTPS server (for PWA testing)
npm run serve:https
```

#### 4. Verify Setup

Open your browser and check:

1. ✅ Application loads at `http://localhost:3000`
2. ✅ No console errors
3. ✅ Service Worker registers successfully
4. ✅ Themes can be switched
5. ✅ Game modes are accessible

---

## Project Structure

### Directory Overview

```
LingoQuest/
├── index.html                 # Main HTML file
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker
├── package.json              # Dependencies and scripts
├── eslint.config.js          # ESLint configuration
├── 
├── css/                      # Stylesheets
│   ├── main.css             # Main styles
│   ├── themes.css           # Built-in themes
│   ├── components.css       # Component styles
│   ├── responsive.css       # Responsive design
│   ├── accessibility.css    # Accessibility styles
│   └── themes/              # External theme files
│       ├── student-neon-glow.css
│       ├── student-retro-arcade.css
│       ├── student-nature-forest.css
│       ├── student-space-galaxy.css
│       ├── student-candy-pop.css
│       ├── college-campus-classic.css
│       ├── college-minimal-focus.css
│       ├── college-night-owl.css
│       └── cartoon-jetsons.css
│
├── js/                       # JavaScript modules
│   ├── main.js              # Application entry point
│   ├── modules/             # Core application modules
│   │   ├── core/            # Core system modules
│   │   │   ├── componentLoader.js
│   │   │   ├── eventManager.js
│   │   │   ├── uiManager.js
│   │   │   └── storageManager.js
│   │   ├── settings/        # Settings management
│   │   │   ├── themeManager.js
│   │   │   ├── languageManager.js
│   │   │   ├── languageLoader.js
│   │   │   ├── translationEngine.js
│   │   │   ├── languageValidator.js
│   │   │   ├── domTranslator.js
│   │   │   └── settingsManager.js
│   │   ├── game/            # Game logic modules
│   │   │   ├── gameLogic.js
│   │   │   ├── gameStateManager.js
│   │   │   ├── mcqGenerator.js
│   │   │   ├── scoreCalculator.js
│   │   │   └── rewardSystem.js
│   │   ├── ui/              # UI components
│   │   │   └── darkModeToggle.js
│   │   ├── utils/           # Utility modules
│   │   │   ├── helpers.js
│   │   │   ├── validators.js
│   │   │   ├── animations.js
│   │   │   └── accessibility.js
│   │   └── services/        # Service modules
│   │       └── updateService.js
│   ├── data/                # Game and configuration data
│   │   ├── config/          # Configuration files
│   │   │   ├── constants.js
│   │   │   ├── gameConfig.js
│   │   │   └── adminConfig.js
│   │   ├── translations/    # Language files
│   │   │   ├── en.js
│   │   │   ├── fr.js
│   │   │   ├── de.js
│   │   │   ├── es.js
│   │   │   ├── it.js
│   │   │   └── pt.js
│   │   ├── questions/       # Question databases
│   │   │   ├── classic/     # Classic mode questions
│   │   │   │   ├── names.js
│   │   │   │   ├── places.js
│   │   │   │   ├── animals.js
│   │   │   │   └── things.js
│   │   │   └── hollybolly/  # HollyBolly mode data
│   │   │       ├── movies.js
│   │   │       ├── boxOfficeData.js
│   │   │       ├── directorsData.js
│   │   │       └── actorsData.js
│   │   └── themes/          # Theme configurations
│   │       ├── themes.js
│   │       ├── light.js
│   │       ├── retro-arcade.js
│   │       └── nature-forest.js
│   └── workers/             # Web Workers
│       ├── gameWorker.js
│       └── analysisWorker.js
│
├── components/              # HTML component files
│   ├── header.html
│   ├── home-screen.html
│   ├── game-screen.html
│   ├── results-screen.html
│   ├── settings-screen.html
│   ├── instructions-screen.html
│   ├── tools-screen.html
│   ├── loading-overlay.html
│   ├── toast-container.html
│   └── confirm-dialog.html
│
├── assets/                  # Static assets
│   ├── icons/              # App icons
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   ├── icon-512x512.png
│   │   └── favicon.ico
│   ├── screenshots/        # PWA screenshots
│   └── sounds/             # Audio files (if any)
│
├── test/                   # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   │   ├── gameFlow.test.js
│   │   └── settingsFlow.test.js
│   └── e2e/               # End-to-end tests
│
└── docs/                  # Documentation
    ├── API.md             # API documentation
    ├── SETUP.md           # This file
    ├── DEPLOYMENT.md      # Deployment guide
    └── CONTRIBUTING.md    # Contribution guidelines
```

---

## Configuration

### Application Configuration

#### 1. Game Configuration (`js/data/config/gameConfig.js`)

```javascript
export const gameConfig = {
    modes: {
        classic: {
            totalQuestions: 20,
            timeLimit: 60,
            scoring: {
                correct: 10,
                incorrect: 0,
                timeBonus: 5,
                streakMultiplier: 1.2
            }
        },
        hollybolly: {
            totalQuestions: 15,
            timeLimit: 90,
            rewards: {
                boxOffice: 1,
                director: 2,
                hero: 3
            }
        }
    },
    difficulty: {
        easy: {
            choiceCount: 2,
            timeMultiplier: 1.5
        },
        medium: {
            choiceCount: 3,
            timeMultiplier: 1.0
        },
        hard: {
            choiceCount: 4,
            timeMultiplier: 0.8
        }
    }
};
```

#### 2. Admin Configuration (`js/data/config/adminConfig.js`)

```javascript
export const adminConfig = {
    languages: {
        core: {
            english: { enabled: true, required: true }
        },
        optional: {
            french: { enabled: true },
            german: { enabled: true },
            spanish: { enabled: false },
            italian: { enabled: false },
            portuguese: { enabled: false }
        }
    },
    themes: {
        senior: {
            light: { enabled: true, default: true },
            dark: { enabled: true },
            highContrast: { enabled: true }
        },
        student: {
            neonGlow: { enabled: true },
            retroArcade: { enabled: true },
            natureForest: { enabled: true },
            spaceGalaxy: { enabled: true },
            candyPop: { enabled: true }
        }
    }
};
```

### Environment Variables

Create a `.env` file (optional):

```bash
# Development settings
NODE_ENV=development
PORT=3000
DEBUG=true

# PWA settings
APP_NAME=LingoQuest
APP_VERSION=1.0.0
APP_THEME_COLOR=#4a90e2

# Analytics (optional)
ANALYTICS_ENABLED=false
ANALYTICS_ID=

# Feature flags
ENABLE_SERVICE_WORKER=true
ENABLE_OFFLINE_MODE=true
ENABLE_PUSH_NOTIFICATIONS=false
```

---

## Environment Setup

### Development Environment

#### 1. VS Code Setup

Install recommended extensions:

```bash
# Install VS Code extensions
code --install-extension ms-vscode.vscode-json
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

VS Code settings (`.vscode/settings.json`):

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "emmet.includeLanguages": {
        "javascript": "html"
    },
    "files.associations": {
        "*.js": "javascript"
    }
}
```

#### 2. Git Hooks Setup

```bash
# Install husky for git hooks
npm install --save-dev husky

# Setup pre-commit hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-push "npm run test"
```

#### 3. Browser Setup

For Chrome development:

1. Install **Chrome DevTools**
2. Enable **Developer Mode** in Chrome
3. Install **Lighthouse** extension
4. Enable **Application** tab for PWA debugging

### Testing Environment

#### 1. Jest Configuration

The project uses Jest for testing. Configuration in `package.json`:

```json
{
    "jest": {
        "testEnvironment": "jsdom",
        "testMatch": ["**/test/**/*.test.js"],
        "collectCoverageFrom": [
            "js/**/*.js",
            "!js/data/**/*.js"
        ],
        "coverageThreshold": {
            "global": {
                "branches": 80,
                "functions": 80,
                "lines": 80,
                "statements": 80
            }
        }
    }
}
```

#### 2. Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- gameFlow.test.js

# Watch mode for development
npm test -- --watch
```

---

## Building for Production

### 1. Pre-build Validation

```bash
# Lint code
npm run lint

# Run tests
npm test

# Validate configuration
npm run validate
```

### 2. Build Process

```bash
# Build for production
npm run build

# This will:
# - Lint and fix code
# - Run tests
# - Minify CSS and JavaScript
# - Optimize assets
# - Generate service worker
```

### 3. Production Optimization

#### CSS Optimization

```bash
# Minify CSS files
npm run minify:css

# Output: dist/css/
```

#### JavaScript Optimization

```bash
# Minify JavaScript
npm run minify:js

# Output: dist/js/
```

#### Asset Optimization

```bash
# Optimize images (if needed)
npm run optimize:images

# Optimize icons
npm run optimize:icons
```

### 4. PWA Optimization

#### Service Worker

The service worker (`sw.js`) is automatically configured for:

- Static asset caching
- Dynamic content caching
- Offline functionality
- Background sync
- Push notifications (optional)

#### Manifest Validation

```bash
# Validate PWA manifest
npm run pwa-audit

# Generate PWA report
npm run lighthouse
```

---

## Deployment

### Static Hosting (Recommended)

#### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
git add dist/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

#### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/`
4. Deploy automatically on push

#### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Server Deployment

#### Apache Configuration

Create `.htaccess` file:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name lingoquest.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lingoquest.app;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /var/www/lingoquest;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Set cache headers
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## Troubleshooting

### Common Issues

#### 1. Service Worker Not Registering

**Problem**: Service worker fails to register

**Solutions**:
```bash
# Check if serving over HTTPS or localhost
# Service workers require secure context

# Clear browser cache and storage
# Check browser console for errors

# Verify sw.js file exists and is accessible
curl http://localhost:3000/sw.js
```

#### 2. Modules Not Loading

**Problem**: ES6 modules fail to load

**Solutions**:
```javascript
// Ensure proper MIME type for .js files
// Check server configuration

// Verify module paths are correct
import ThemeManager from './modules/settings/themeManager.js';
//                                                    ^^^^ .js extension required

// Check for circular dependencies
```

#### 3. Themes Not Applying

**Problem**: Theme changes don't take effect

**Solutions**:
```bash
# Check if theme CSS files exist
ls css/themes/

# Verify CSS custom properties support
# Check browser console for CSS errors

# Clear localStorage and try again
localStorage.clear();
```

#### 4. Components Not Loading

**Problem**: HTML components fail to load

**Solutions**:
```javascript
// Check if components/ directory is accessible
// Verify fetch permissions and CORS

// Check component file paths
// Ensure proper error handling in componentLoader.js
```

#### 5. Build Errors

**Problem**: npm run build fails

**Solutions**:
```bash
# Check Node.js and npm versions
node --version
npm --version

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Run tests to identify issues
npm test
```

### Performance Issues

#### 1. Slow Loading

**Solutions**:
- Enable compression (gzip)
- Optimize images
- Use CDN for assets
- Implement lazy loading
- Minimize JavaScript bundles

#### 2. Memory Leaks

**Solutions**:
- Check for proper event listener cleanup
- Verify module destruction methods
- Monitor memory usage in DevTools
- Implement proper garbage collection

### Browser-Specific Issues

#### Chrome
- Check Application tab for PWA status
- Verify service worker in DevTools
- Test in incognito mode

#### Firefox
- Enable Developer Tools
- Check storage permissions
- Test offline functionality

#### Safari
- Verify iOS compatibility
- Check Web Inspector
- Test on actual iOS device

---

## Development Workflow

### Daily Development

1. **Start development server**:
```bash
npm run dev
```

2. **Make changes** to code

3. **Test changes** in browser

4. **Run tests**:
```bash
npm test
```

5. **Lint code**:
```bash
npm run lint
```

6. **Commit changes**:
```bash
git add .
git commit -m "feat: add new feature"
git push
```

### Release Process

1. **Update version** in `package.json` and `manifest.json`

2. **Run full test suite**:
```bash
npm run validate
```

3. **Build for production**:
```bash
npm run build
```

4. **Test production build**:
```bash
npm run serve:prod
```

5. **Deploy to staging**

6. **Test staging environment**

7. **Deploy to production**

8. **Tag release**:
```bash
git tag v1.0.0
git push --tags
```

---

## Additional Resources

### Documentation
- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### External Resources
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

### Community
- [GitHub Issues](https://github.com/AllieBaig/LingoQuest/issues)
- [Discussions](https://github.com/AllieBaig/LingoQuest/discussions)

---

## Support

If you encounter issues not covered in this guide:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search [existing issues](https://github.com/AllieBaig/LingoQuest/issues)
3. Create a [new issue](https://github.com/AllieBaig/LingoQuest/issues/new) with:
   - Detailed description
   - Steps to reproduce
   - Environment information
   - Browser console output

---



