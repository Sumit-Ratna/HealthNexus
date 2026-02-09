const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    pan_hash: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('patient', 'doctor', 'admin'),
        defaultValue: 'patient'
    },

    // Profile Section A: Personal
    name: { type: DataTypes.STRING },
    profile_photo: { type: DataTypes.STRING }, // URL
    email: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    blood_group: { type: DataTypes.STRING },
    marital_status: { type: DataTypes.STRING },
    height: { type: DataTypes.FLOAT },
    weight: { type: DataTypes.FLOAT },
    address_city: { type: DataTypes.STRING },
    address_state: { type: DataTypes.STRING },
    emergency_contacts: { type: DataTypes.JSON, defaultValue: [] },

    // Profile Section B: Medical (JSON for flexibility)
    medical_history: {
        type: DataTypes.JSON,
        defaultValue: {
            allergies: [],
            current_meds: [],
            past_meds: [],
            chronic_diseases: [],
            injuries: [],
            surgeries: []
        }
    },

    // Profile Section C: Lifestyle
    lifestyle: {
        type: DataTypes.JSON,
        defaultValue: {
            smoking: 'no',
            alcohol: 'no',
            activity_level: 'moderate',
            food_preference: 'veg',
            occupation: ''
        }
    },

    // Doctor Specifics
    specialization: { type: DataTypes.STRING },
    hospital_name: { type: DataTypes.STRING },
    doctor_qr_id: { type: DataTypes.STRING, unique: true },

    // Auth & Security
    biometric_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    biometric_secret: { type: DataTypes.STRING }, // Simulated key
    refresh_token: { type: DataTypes.STRING(500) } // allow longer tokens
});

module.exports = User;
