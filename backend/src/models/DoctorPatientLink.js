const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DoctorPatientLink = sequelize.define('DoctorPatientLink', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    doctor_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    linked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = DoctorPatientLink;
