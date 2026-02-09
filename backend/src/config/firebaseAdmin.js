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
    const serviceAccount = require(serviceAccountPath);
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("[FIREBASE] Admin SDK initialized successfully");
    }
} catch (error) {
    console.error("[ERROR] Firebase Admin initialization failed:", error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
        console.warn("[WARNING] service-account.json not found at:", serviceAccountPath);
    }
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
