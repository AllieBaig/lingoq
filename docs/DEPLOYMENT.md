



# LingoQuest Deployment Guide

## Overview

This document provides comprehensive instructions for deploying LingoQuest, a Progressive Web App (PWA) word game, to various hosting platforms and environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Environment Configuration](#environment-configuration)
- [Security Considerations](#security-considerations)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Development Environment

- **Node.js**: Version 16.0.0 or higher
- **NPM**: Version 8.0.0 or higher
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge for testing

### Required Files Check

Ensure these critical files are present:

```
├── index.html
├── manifest.json
├── sw.js (Service Worker)
├── css/
│   ├── main.css
│   └── themes/
├── js/
│   ├── main.js
│   └── modules/
├── components/
├── assets/
│   └── icons/
└── package.json
```

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Quality Checks

```bash
# Lint JavaScript
npm run lint

# Lint CSS
npm run lint:css

# Run tests
npm run test

# Check PWA compliance
npm run pwa-audit
```

### 3. Build for Production

```bash
# Full build with minification
npm run build

# Or individual steps
npm run minify:css
npm run minify:js
```

### 4. Local Testing

```bash
# Test production build locally
npm run serve

# Test with HTTPS (required for PWA features)
npm run serve:https
```

## Deployment Platforms

### GitHub Pages

#### Prerequisites
- GitHub repository
- GitHub Actions enabled

#### Setup Steps

1. **Configure GitHub Actions**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

3. **Update Base URLs**

Update `manifest.json`:
```json
{
  "start_url": "/your-repo-name/",
  "scope": "/your-repo-name/"
}
```

### Netlify

#### Method 1: Git Integration

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `16`

#### Method 2: Manual Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "16"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    
[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel

#### Method 1: Git Integration

1. Import project from GitHub
2. Vercel auto-detects static site
3. Configure in `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/sw.js",
      "headers": { "cache-control": "public, max-age=0, must-revalidate" },
      "dest": "/sw.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### Method 2: CLI Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Firebase Hosting

#### Setup

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

2. **Initialize Firebase**
```bash
firebase init hosting
```

3. **Configure `firebase.json`**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

4. **Deploy**
```bash
npm run build
firebase deploy
```

### Apache/Nginx Server

#### Apache Configuration

Create `.htaccess`:

```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# PWA routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Service Worker cache headers
<Files "sw.js">
    Header set Cache-Control "public, max-age=0, must-revalidate"
</Files>

# Manifest cache headers
<Files "manifest.json">
    Header set Cache-Control "public, max-age=0, must-revalidate"
</Files>

# Static asset caching
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/lingoquest;
    index index.html;
    
    # PWA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Service Worker
    location /sw.js {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        try_files $uri =404;
    }
    
    # Manifest
    location /manifest.json {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        try_files $uri =404;
    }
    
    # Static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        expires 1y;
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

## Environment Configuration

### Production Environment Variables

Create environment-specific configurations:

```javascript
// js/config/environment.js
export const config = {
  production: {
    apiUrl: 'https://api.lingoquest.app',
    analyticsId: 'GA-XXXXXXXXX',
    sentryDsn: 'https://xxx@sentry.io/xxx',
    debugMode: false,
    cacheVersion: '1.0.0'
  },
  staging: {
    apiUrl: 'https://staging-api.lingoquest.app',
    analyticsId: 'GA-STAGING-XXX',
    debugMode: true,
    cacheVersion: '1.0.0-staging'
  },
  development: {
    apiUrl: 'http://localhost:3001',
    debugMode: true,
    cacheVersion: '1.0.0-dev'
  }
};
```

### Build-time Configuration

Update `package.json` scripts:

```json
{
  "scripts": {
    "build:prod": "NODE_ENV=production npm run build",
    "build:staging": "NODE_ENV=staging npm run build",
    "deploy:prod": "npm run build:prod && npm run deploy",
    "deploy:staging": "npm run build:staging && npm run deploy:staging"
  }
}
```

## Security Considerations

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  manifest-src 'self';
  worker-src 'self';
">
```

### HTTPS Requirements

- **Required for PWA**: Service Workers only work over HTTPS
- **SSL Certificate**: Use Let's Encrypt for free certificates
- **HSTS**: Enable HTTP Strict Transport Security

### Security Headers

Implement security headers (shown in server configurations above):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Performance Optimization

### Asset Optimization

1. **Minification**
```bash
# CSS minification
npm run minify:css

# JavaScript minification
npm run minify:js
```

2. **Image Optimization**
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize images
imagemin assets/icons/*.png --out-dir=dist/assets/icons/
```

3. **Compression**

Enable Gzip/Brotli compression on server:

```nginx
# Nginx Gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Nginx Brotli
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;

brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### Caching Strategy

1. **Service Worker Caching**: Handled by `sw.js`
2. **CDN Caching**: Use CloudFlare or similar
3. **Browser Caching**: Set appropriate cache headers

### Performance Monitoring

Add to `index.html`:

```html
<script>
// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
  });
}
</script>
```

## Monitoring and Analytics

### Error Tracking

1. **Sentry Integration**
```javascript
// js/modules/core/errorTracking.js
import * as Sentry from '@sentry/browser';

if (window.location.hostname !== 'localhost') {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
}
```

2. **Custom Error Logging**
```javascript
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to logging service
});
```

### Analytics

```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Custom events
gtag('event', 'game_start', {
  game_mode: 'classic',
  difficulty: 'easy'
});
```

### Performance Monitoring

```javascript
// Core Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Troubleshooting

### Common Issues

#### 1. Service Worker Not Updating

**Symptoms**: Changes not reflecting after deployment

**Solutions**:
- Update cache version in `sw.js`
- Clear browser cache
- Check cache headers

```javascript
// Force service worker update
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.update());
  });
}
```

#### 2. PWA Not Installing

**Symptoms**: No install prompt appears

**Solutions**:
- Verify HTTPS
- Check `manifest.json` validity
- Ensure service worker is registered
- Test with Chrome DevTools → Application → Manifest

#### 3. Assets Not Loading

**Symptoms**: 404 errors for CSS/JS files

**Solutions**:
- Check base URL configuration
- Verify file paths in HTML
- Check server routing configuration

#### 4. Offline Functionality Not Working

**Symptoms**: App doesn't work offline

**Solutions**:
- Verify service worker registration
- Check cache strategy in `sw.js`
- Test offline in DevTools

### Debug Tools

```javascript
// Debug service worker
navigator.serviceWorker.ready.then(registration => {
  console.log('SW registered:', registration);
});

// Debug manifest
console.log('Manifest:', navigator.serviceWorker.controller);

// Debug cache
caches.keys().then(cacheNames => {
  console.log('Available caches:', cacheNames);
});
```

### Health Checks

Create deployment verification script:

```bash
#!/bin/bash
# deploy-check.sh

echo "🔍 Running post-deployment checks..."

# Check if site is accessible
if curl -f -s https://your-domain.com > /dev/null; then
    echo "✅ Site is accessible"
else
    echo "❌ Site is not accessible"
    exit 1
fi

# Check service worker
if curl -f -s https://your-domain.com/sw.js > /dev/null; then
    echo "✅ Service worker is accessible"
else
    echo "❌ Service worker not found"
    exit 1
fi

# Check manifest
if curl -f -s https://your-domain.com/manifest.json > /dev/null; then
    echo "✅ Manifest is accessible"
else
    echo "❌ Manifest not found"
    exit 1
fi

echo "🎉 All checks passed!"
```

## Rollback Procedures

### Quick Rollback

```bash
# Git-based rollback
git revert HEAD
git push origin main

# Or reset to previous commit
git reset --hard HEAD~1
git push origin main --force
```

### Platform-specific Rollback

#### Netlify
- Use Netlify dashboard to deploy previous version
- Or redeploy from previous Git commit

#### Vercel
```bash
vercel rollback [DEPLOYMENT_URL]
```

#### Firebase
```bash
firebase hosting:versions:list
firebase hosting:rollback [VERSION_ID]
```

## Maintenance

### Regular Tasks

1. **Weekly**:
   - Monitor error logs
   - Check performance metrics
   - Review analytics data

2. **Monthly**:
   - Update dependencies
   - Security audit
   - Performance audit

3. **Quarterly**:
   - SSL certificate renewal
   - Server maintenance
   - Backup verification

### Automated Monitoring

Set up monitoring alerts for:
- Site downtime
- Error rate spikes
- Performance degradation
- SSL certificate expiration

---

## Support

For deployment issues:
- Check the [troubleshooting section](#troubleshooting)
- Review server logs
- Test locally first
- Contact the development team

Last updated: June 2024
```

