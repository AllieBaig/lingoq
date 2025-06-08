
// File: testRunner.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, 'tests');

fs.readdirSync(testDir)
    .filter(file => file.endsWith('.test.js'))
    .forEach(file => {
        console.log(`\n🧪 Running: ${file}`);
        import(path.join(testDir, file)).catch(err => {
            console.error(`❌ Error running ${file}:`, err.message);
        });
    });

