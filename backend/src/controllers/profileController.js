const firestoreService = require('../services/firestoreService');

// Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { section, data } = req.body;

        console.log(`[UPDATE] Updating ${section} profile for user ${userId}`);

        let updates = {};
        if (section === 'personal' || !section) {
            updates = { ...(data || req.body) };
        } else if (section === 'medical') {
            updates = { medical_history: data };
        } else if (section === 'lifestyle') {
            updates = { lifestyle: data };
        }

        // Don't allow updating sensitive fields
        delete updates.id;
        delete updates.phone;
        delete updates.role;
        delete updates.refresh_token;
        delete updates.section;

        await firestoreService.updateUser(userId, updates);
        const updatedUser = await firestoreService.getUser(userId);

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await firestoreService.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Delete User Profile
exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`[DELETE] Deleting account for user ${userId}`);

        // Delete user document
        await firestoreService.deleteUser(userId);

        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error("Delete Profile Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = exports;
