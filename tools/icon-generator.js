







/**
 * Purpose: Icon generation tool for PWA icons, favicons, and app store assets
 * Key features: Multiple format support, size generation, optimization, manifest integration
 * Dependencies: Sharp/Canvas API, file system, image processing libraries
 * Related helpers: Image optimization, format conversion, manifest updating
 * Function names: generateIcons, createFavicon, optimizeImage, updateManifest, exportAssets
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:35 | File: tools/icon-generator.js
 */

import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

class IconGenerator {
    constructor(options = {}) {
        this.sourceImage = options.sourceImage || 'assets/logo.png';
        this.outputDir = options.outputDir || 'assets/icons';
        this.manifestPath = options.manifestPath || 'manifest.json';
        
        // Icon sizes for different platforms
        this.iconSizes = {
            // PWA Standard Icons
            pwa: [
                { size: 72, name: 'icon-72x72.png', purpose: 'any' },
                { size: 96, name: 'icon-96x96.png', purpose: 'any' },
                { size: 128, name: 'icon-128x128.png', purpose: 'any' },
                { size: 144, name: 'icon-144x144.png', purpose: 'any' },
                { size: 152, name: 'icon-152x152.png', purpose: 'any' },
                { size: 192, name: 'icon-192x192.png', purpose: 'any maskable' },
                { size: 384, name: 'icon-384x384.png', purpose: 'any' },
                { size: 512, name: 'icon-512x512.png', purpose: 'any maskable' }
            ],
            
            // Favicon variations
            favicon: [
                { size: 16, name: 'favicon-16x16.png', format: 'png' },
                { size: 32, name: 'favicon-32x32.png', format: 'png' },
                { size: 48, name: 'favicon-48x48.png', format: 'png' },
                { size: 64, name: 'favicon-64x64.png', format: 'png' }
            ],
            
            // Apple Touch Icons
            apple: [
                { size: 57, name: 'apple-touch-icon-57x57.png' },
                { size: 60, name: 'apple-touch-icon-60x60.png' },
                { size: 72, name: 'apple-touch-icon-72x72.png' },
                { size: 76, name: 'apple-touch-icon-76x76.png' },
                { size: 114, name: 'apple-touch-icon-114x114.png' },
                { size: 120, name: 'apple-touch-icon-120x120.png' },
                { size: 144, name: 'apple-touch-icon-144x144.png' },
                { size: 152, name: 'apple-touch-icon-152x152.png' },
                { size: 180, name: 'apple-touch-icon-180x180.png' }
            ],
            
            // Android Chrome Icons
            android: [
                { size: 36, name: 'android-chrome-36x36.png', density: 'ldpi' },
                { size: 48, name: 'android-chrome-48x48.png', density: 'mdpi' },
                { size: 72, name: 'android-chrome-72x72.png', density: 'hdpi' },
                { size: 96, name: 'android-chrome-96x96.png', density: 'xhdpi' },
                { size: 144, name: 'android-chrome-144x144.png', density: 'xxhdpi' },
                { size: 192, name: 'android-chrome-192x192.png', density: 'xxxhdpi' }
            ],
            
            // Microsoft Tiles
            mstile: [
                { size: 70, name: 'mstile-70x70.png', square: true },
                { size: 144, name: 'mstile-144x144.png', square: true },
                { size: 150, name: 'mstile-150x150.png', square: true },
                { size: 310, name: 'mstile-310x150.png', width: 310, height: 150 },
                { size: 310, name: 'mstile-310x310.png', square: true }
            ]
        };
        
        // Brand colors for different themes
        this.brandColors = {
            primary: '#007bff',
            secondary: '#6c757d',
            success: '#28a745',
            danger: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8',
            light: '#f8f9fa',
            dark: '#343a40'
        };
    }
    
    async init() {
        console.log('🎨 IconGenerator initializing...');
        
        // Create output directory if it doesn't exist
        await this.ensureDirectory(this.outputDir);
        
        // Verify source image exists
        if (!fs.existsSync(this.sourceImage)) {
            throw new Error(`Source image not found: ${this.sourceImage}`);
        }
        
        console.log('✅ IconGenerator initialized');
    }
    
    async generateAllIcons() {
        console.log('🚀 Starting icon generation...');
        
        try {
            // Load source image
            const sourceImg = await loadImage(this.sourceImage);
            console.log(`📷 Loaded source image: ${sourceImg.width}x${sourceImg.height}`);
            
            // Generate different icon sets
            await this.generatePWAIcons(sourceImg);
            await this.generateFavicons(sourceImg);
            await this.generateAppleIcons(sourceImg);
            await this.generateAndroidIcons(sourceImg);
            await this.generateMSTiles(sourceImg);
            
            // Generate special icons
            await this.generateMaskableIcons(sourceImg);
            await this.generateSplashScreens(sourceImg);
            
            // Create multi-size ICO file
            await this.generateICOFile();
            
            // Update manifest.json
            await this.updateManifest();
            
            // Generate HTML meta tags
            await this.generateHTMLMeta();
            
            console.log('✅ All icons generated successfully!');
            
        } catch (error) {
            console.error('❌ Icon generation failed:', error);
            throw error;
        }
    }
    
    async generatePWAIcons(sourceImg) {
        console.log('📱 Generating PWA icons...');
        
        for (const icon of this.iconSizes.pwa) {
            await this.createIcon(sourceImg, icon.size, icon.name, {
                purpose: icon.purpose,
                background: 'transparent'
            });
        }
    }
    
    async generateFavicons(sourceImg) {
        console.log('🔗 Generating favicons...');
        
        for (const favicon of this.iconSizes.favicon) {
            await this.createIcon(sourceImg, favicon.size, favicon.name, {
                format: favicon.format,
                background: 'white'
            });
        }
    }
    
    async generateAppleIcons(sourceImg) {
        console.log('🍎 Generating Apple Touch icons...');
        
        for (const apple of this.iconSizes.apple) {
            await this.createIcon(sourceImg, apple.size, apple.name, {
                background: 'white',
                rounded: true,
                platform: 'apple'
            });
        }
    }
    
    async generateAndroidIcons(sourceImg) {
        console.log('🤖 Generating Android Chrome icons...');
        
        for (const android of this.iconSizes.android) {
            await this.createIcon(sourceImg, android.size, android.name, {
                density: android.density,
                background: 'transparent',
                platform: 'android'
            });
        }
    }
    
    async generateMSTiles(sourceImg) {
        console.log('🪟 Generating Microsoft tiles...');
        
        for (const tile of this.iconSizes.mstile) {
            const width = tile.width || tile.size;
            const height = tile.height || tile.size;
            
            await this.createIcon(sourceImg, tile.size, tile.name, {
                width,
                height,
                background: this.brandColors.primary,
                platform: 'microsoft'
            });
        }
    }
    
    async generateMaskableIcons(sourceImg) {
        console.log('🎭 Generating maskable icons...');
        
        const maskableSizes = [192, 512];
        
        for (const size of maskableSizes) {
            await this.createMaskableIcon(sourceImg, size, `maskable-icon-${size}x${size}.png`);
        }
    }
    
    async generateSplashScreens(sourceImg) {
        console.log('💦 Generating splash screens...');
        
        const splashSizes = [
            { width: 640, height: 1136, name: 'splash-640x1136.png' }, // iPhone 5
            { width: 750, height: 1334, name: 'splash-750x1334.png' }, // iPhone 6/7/8
            { width: 828, height: 1792, name: 'splash-828x1792.png' }, // iPhone XR
            { width: 1125, height: 2436, name: 'splash-1125x2436.png' }, // iPhone X
            { width: 1242, height: 2208, name: 'splash-1242x2208.png' }, // iPhone 6+/7+/8+
            { width: 1536, height: 2048, name: 'splash-1536x2048.png' }, // iPad
            { width: 1668, height: 2224, name: 'splash-1668x2224.png' }, // iPad Pro 10.5"
            { width: 2048, height: 2732, name: 'splash-2048x2732.png' }  // iPad Pro 12.9"
        ];
        
        for (const splash of splashSizes) {
            await this.createSplashScreen(sourceImg, splash.width, splash.height, splash.name);
        }
    }
    
    async createIcon(sourceImg, size, filename, options = {}) {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Set background
        if (options.background && options.background !== 'transparent') {
            ctx.fillStyle = options.background;
            ctx.fillRect(0, 0, size, size);
        }
        
        // Calculate scaling and positioning
        const scale = Math.min(size / sourceImg.width, size / sourceImg.height);
        const scaledWidth = sourceImg.width * scale;
        const scaledHeight = sourceImg.height * scale;
        const x = (size - scaledWidth) / 2;
        const y = (size - scaledHeight) / 2;
        
        // Apply platform-specific adjustments
        let padding = 0;
        if (options.platform === 'apple') {
            padding = size * 0.1; // 10% padding for Apple icons
        } else if (options.platform === 'android') {
            padding = size * 0.05; // 5% padding for Android
        }
        
        // Draw the icon with padding
        if (padding > 0) {
            const paddedSize = size - (padding * 2);
            const paddedScale = Math.min(paddedSize / sourceImg.width, paddedSize / sourceImg.height);
            const paddedWidth = sourceImg.width * paddedScale;
            const paddedHeight = sourceImg.height * paddedScale;
            const paddedX = (size - paddedWidth) / 2;
            const paddedY = (size - paddedHeight) / 2;
            
            ctx.drawImage(sourceImg, paddedX, paddedY, paddedWidth, paddedHeight);
        } else {
            ctx.drawImage(sourceImg, x, y, scaledWidth, scaledHeight);
        }
        
        // Apply rounded corners for Apple icons
        if (options.rounded) {
            this.applyRoundedCorners(ctx, size);
        }
        
        // Save the icon
        const buffer = canvas.toBuffer('image/png');
        const filepath = path.join(this.outputDir, filename);
        fs.writeFileSync(filepath, buffer);
        
        console.log(`  ✓ Created ${filename} (${size}x${size})`);
    }
    
    async createMaskableIcon(sourceImg, size, filename) {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Create safe zone (80% of icon size)
        const safeZoneSize = size * 0.8;
        const padding = (size - safeZoneSize) / 2;
        
        // Fill background with brand color
        ctx.fillStyle = this.brandColors.primary;
        ctx.fillRect(0, 0, size, size);
        
        // Draw icon in safe zone
        const scale = Math.min(safeZoneSize / sourceImg.width, safeZoneSize / sourceImg.height);
        const scaledWidth = sourceImg.width * scale;
        const scaledHeight = sourceImg.height * scale;
        const x = (size - scaledWidth) / 2;
        const y = (size - scaledHeight) / 2;
        
        ctx.drawImage(sourceImg, x, y, scaledWidth, scaledHeight);
        
        // Save the maskable icon
        const buffer = canvas.toBuffer('image/png');
        const filepath = path.join(this.outputDir, filename);
        fs.writeFileSync(filepath, buffer);
        
        console.log(`  ✓ Created maskable ${filename} (${size}x${size})`);
    }
    
    async createSplashScreen(sourceImg, width, height, filename) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = this.brandColors.light;
        ctx.fillRect(0, 0, width, height);
        
        // Center the logo
        const maxLogoSize = Math.min(width, height) * 0.3; // 30% of smaller dimension
        const scale = Math.min(maxLogoSize / sourceImg.width, maxLogoSize / sourceImg.height);
        const logoWidth = sourceImg.width * scale;
        const logoHeight = sourceImg.height * scale;
        const x = (width - logoWidth) / 2;
        const y = (height - logoHeight) / 2;
        
        ctx.drawImage(sourceImg, x, y, logoWidth, logoHeight);
        
        // Add app name below logo
        ctx.fillStyle = this.brandColors.dark;
        ctx.font = `${width * 0.05}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('LingoQuest', width / 2, y + logoHeight + (height * 0.1));
        
        // Save splash screen
        const buffer = canvas.toBuffer('image/png');
        const filepath = path.join(this.outputDir, filename);
        fs.writeFileSync(filepath, buffer);
        
        console.log(`  ✓ Created splash ${filename} (${width}x${height})`);
    }
    
    applyRoundedCorners(ctx, size) {
        // Create clipping path for rounded corners (Apple style)
        const radius = size * 0.2; // 20% radius
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.roundRect(0, 0, size, size, radius);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
    
    async generateICOFile() {
        console.log('🖼️ Generating ICO file...');
        
        // For now, just copy the 32x32 favicon as .ico
        // In production, you'd use a proper ICO library
        const source = path.join(this.outputDir, 'favicon-32x32.png');
        const dest = path.join(this.outputDir, 'favicon.ico');
        
        if (fs.existsSync(source)) {
            fs.copyFileSync(source, dest);
            console.log('  ✓ Created favicon.ico');
        }
    }
    
    async updateManifest() {
        console.log('📄 Updating manifest.json...');
        
        try {
            let manifest = {};
            
            // Load existing manifest if it exists
            if (fs.existsSync(this.manifestPath)) {
                const manifestContent = fs.readFileSync(this.manifestPath, 'utf8');
                manifest = JSON.parse(manifestContent);
            }
            
            // Update icons array
            manifest.icons = this.iconSizes.pwa.map(icon => ({
                src: `assets/icons/${icon.name}`,
                sizes: `${icon.size}x${icon.size}`,
                type: 'image/png',
                purpose: icon.purpose
            }));
            
            // Add maskable icons
            manifest.icons.push(
                {
                    src: 'assets/icons/maskable-icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: 'assets/icons/maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            );
            
            // Save updated manifest
            fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2));
            console.log('  ✓ Updated manifest.json');
            
        } catch (error) {
            console.warn('⚠️ Failed to update manifest.json:', error.message);
        }
    }
    
    async generateHTMLMeta() {
        console.log('🏷️ Generating HTML meta tags...');
        
        const metaTags = `
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
<link rel="shortcut icon" href="assets/icons/favicon.ico">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon-180x180.png">
<link rel="apple-touch-icon" sizes="152x152" href="assets/icons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="assets/icons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="assets/icons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="114x114" href="assets/icons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="76x76" href="assets/icons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="72x72" href="assets/icons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="60x60" href="assets/icons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="57x57" href="assets/icons/apple-touch-icon-57x57.png">

<!-- Microsoft Tiles -->
<meta name="msapplication-TileImage" content="assets/icons/mstile-144x144.png">
<meta name="msapplication-TileColor" content="${this.brandColors.primary}">
<meta name="msapplication-config" content="browserconfig.xml">

<!-- Android Chrome -->
<meta name="theme-color" content="${this.brandColors.primary}">
<meta name="mobile-web-app-capable" content="yes">

<!-- Apple Safari -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="LingoQuest">

<!-- Splash Screens -->
<link rel="apple-touch-startup-image" href="assets/icons/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
<link rel="apple-touch-startup-image" href="assets/icons/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)">
<link rel="apple-touch-startup-image" href="assets/icons/splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)">
        `.trim();
        
        const metaFilePath = path.join(this.outputDir, 'meta-tags.html');
        fs.writeFileSync(metaFilePath, metaTags);
        
        console.log('  ✓ Generated meta-tags.html');
    }
    
    async ensureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    
    // Generate report of all created icons
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            sourceImage: this.sourceImage,
            outputDirectory: this.outputDir,
            iconsGenerated: {
                pwa: this.iconSizes.pwa.length,
                favicon: this.iconSizes.favicon.length,
                apple: this.iconSizes.apple.length,
                android: this.iconSizes.android.length,
                mstile: this.iconSizes.mstile.length,
                maskable: 2,
                splash: 8
            },
            totalIcons: 0
        };
        
        // Calculate total
        report.totalIcons = Object.values(report.iconsGenerated)
            .reduce((sum, count) => sum + count, 0);
        
        // Save report
        const reportPath = path.join(this.outputDir, 'generation-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`📊 Generated ${report.totalIcons} icons total`);
        console.log(`📋 Report saved to: ${reportPath}`);
        
        return report;
    }
}

// Export for use as a module
export default IconGenerator;

// CLI usage if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const generator = new IconGenerator({
        sourceImage: process.argv[2] || 'assets/logo.png',
        outputDir: process.argv[3] || 'assets/icons'
    });
    
    generator.init()
        .then(() => generator.generateAllIcons())
        .then(() => generator.generateReport())
        .then(() => {
            console.log('🎉 Icon generation completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('💥 Icon generation failed:', error);
            process.exit(1);
        });
}



