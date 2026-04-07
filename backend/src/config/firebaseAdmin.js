const admin = require('firebase-admin');

// [WARNING] WARNING: 
// To verify tokens securely, you MUST provide a Service Account JSON file.
// 1. Go to Firebase Console -> Project Settings -> Service Accounts
// 2. Generate new private key -> Download JSON
// 3. Save it as `service-account.json` in `backend/` folder (DO NOT COMMIT THIS FILE!)
// 4. Update the `serviceAccountPath` below if needed.

const path = require('path');
const serviceAccountPath = path.join(__dirname, '../../service-account.json');

try {
    let serviceAccount;
    
    // Try environment variable first (for cloud deployment like Render)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        console.log("[FIREBASE] Loading credentials from environment variable");
    } else {
        // Fall back to local file (for development)
        serviceAccount = require(serviceAccountPath);
        console.log("[FIREBASE] Loading credentials from service-account.json");
    }
    
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("[FIREBASE] Admin SDK initialized successfully");
    }
} catch (error) {
    console.error("[ERROR] Firebase Admin initialization failed:", error.message);
    console.error("[ERROR] Error type:", error.constructor.name);
    console.error("[ERROR] Full error:", JSON.stringify({ code: error.code, name: error.name, message: error.message }));
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.error("[ERROR] FIREBASE_SERVICE_ACCOUNT env var is set but parsing/init failed");
        console.error("[ERROR] Env var length:", process.env.FIREBASE_SERVICE_ACCOUNT.length);
        console.error("[ERROR] Env var starts with:", process.env.FIREBASE_SERVICE_ACCOUNT.substring(0, 30));
    }
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
