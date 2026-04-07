#!/bin/bash
echo "🚀 Starting Mobile App Setup..."

# 1. Install Capacitor
echo "📦 Installing Capacitor dependencies..."
npm install @capacitor/core
npm install -D @capacitor/cli @capacitor/android

# 2. Initialize Capacitor
echo "⚙️ Initializing Capacitor..."
# Uses non-interactive mode with default app name and ID
npx cap init HealthNexus com.healthnexus.app --web-dir dist

# 3. Add Android Platform
echo "🤖 Adding Android platform..."
npx cap add android

# 4. Build React App
echo "🏗️ Building React app..."
npm run build

# 5. Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync

echo "✅ Setup Complete!"
echo "📱 To run the app, type: npx cap open android"
