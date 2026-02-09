const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    patient_id: { type: DataTypes.UUID, allowNull: false },
    doctor_id: { type: DataTypes.UUID, allowNull: true }, // Can be null for general OPD

    type: { type: DataTypes.ENUM('OPD', 'VIDEO', 'LAB'), defaultValue: 'OPD' },
    status: { type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'), defaultValue: 'PENDING' },

    appointment_date: { type: DataTypes.DATE },
    slot_time: { type: DataTypes.STRING }, // e.g., "10:30 AM"

    symptoms: { type: DataTypes.STRING },
    queue_number: { type: DataTypes.INTEGER }, // For OPD Slip

    notes: { type: DataTypes.TEXT }
});

module.exports = Appointment;
