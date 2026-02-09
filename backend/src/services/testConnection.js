const { User, DoctorPatientLink } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function testConnection() {
    try {
        console.log("Starting test...");

        // 1. Create a Dummy Doctor
        console.log("Creating Doctor...");
        const doctor = await User.create({
            phone: '9999999999',
            role: 'doctor',
            name: 'Test Doctor',
            specialization: 'Cardiology',
            hospital_name: 'Test Hospital',
            doctor_qr_id: 'DOC-TEST-' + Math.floor(Math.random() * 1000)
        });
        console.log("Doctor Created:", doctor.id, doctor.doctor_qr_id);

        // 2. Create a Dummy Patient
        console.log("Creating Patient...");
        const patient = await User.create({
            phone: '8888888888',
            role: 'patient',
            name: 'Test Patient',
            dob: '1990-01-01',
            gender: 'Male',
            blood_group: 'O+'
        });
        console.log("Patient Created:", patient.id);

        // 3. Connect Them
        console.log("Linking...");
        const link = await DoctorPatientLink.create({
            doctor_id: doctor.id,
            patient_id: patient.id,
            status: 'active'
        });
        console.log("Link Created:", link.id);

        // 4. Verify Link
        const verifiedLink = await DoctorPatientLink.findOne({
            where: {
                doctor_id: doctor.id,
                patient_id: patient.id
            },
            include: [
                { model: User, as: 'doctor' },
                { model: User, as: 'patient' }
            ]
        });

        if (verifiedLink && verifiedLink.doctor && verifiedLink.patient) {
            console.log("[SUCCESS] SUCCESS: Doctor and Patient are linked locally.");
            console.log("Doctor Name:", verifiedLink.doctor.name);
            console.log("Patient Name:", verifiedLink.patient.name);
        } else {
            console.error("[ERROR] FAILED: Link verification failed.");
        }

        // Cleanup
        await link.destroy();
        await doctor.destroy();
        await patient.destroy();
        console.log("Cleanup done.");

    } catch (err) {
        console.error("[ERROR] TEST CRASHED:", err);
    }
}

testConnection();
