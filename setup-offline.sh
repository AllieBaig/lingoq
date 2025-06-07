
#!/bin/bash

echo "🔧 Installing LingoQuest dev dependencies..."

npm install --save-dev jest @testing-library/jest-dom jest-canvas-mock jest-html-reporters

echo "📦 Saving all dependencies..."
npm ci

echo "🗜️ Zipping project for offline usage..."
zip -r lingoquest-offline.zip . -x "node_modules/.cache/*" "coverage/*" "*.DS_Store"

echo "✅ Offline bundle ready: lingoquest-offline.zip"

