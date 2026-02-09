import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Lock, Stethoscope } from 'lucide-react';

const DoctorLogin = () => {
    const { sendOtp, verifyOtp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);

    const handleSend = async () => {
        try {
            const { confirmationResult, isNew } = await sendOtp(phoneNumber, 'recaptcha-doctor-login');
            setConfirmationResult(confirmationResult);
            setIsNewUser(isNew || false);
            setStep(2);
        } catch (err) {
            console.error("Doctor Login Error:", err);
            const errMsg = err.code ? `Firebase: ${err.code}` : (err.message || "Failed to send OTP");
            alert(errMsg);
        }
    };

    const handleVerify = async () => {
        try {
            if (!confirmationResult) throw new Error("Please request OTP first");
            await verifyOtp(confirmationResult, otp, phoneNumber, 'doctor');
            navigate('/doctor/dashboard');
        } catch (err) {
            console.error("Verify Error:", err);
            const errMsg = err.code ? `Firebase: ${err.code}` : (err.message || "Invalid OTP");
            alert(errMsg);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: 'var(--bg-color)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
            >
                <div style={{
                    width: '64px', height: '64px',
                    background: 'var(--primary-color)',
                    borderRadius: '16px',
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.4)'
                }}>
                    <Stethoscope color="white" size={32} />
                </div>

                <h1 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Doctor Portal</h1>
                <p style={{ marginBottom: '32px' }}>Secure access for medical professionals</p>

                <div className="card" style={{ padding: '40px 32px', textAlign: 'left', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
                    {step === 1 ? (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <label>Registered Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        style={{ paddingLeft: '44px' }}
                                    />
                                    <Phone size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                            </div>

                            <div id="recaptcha-doctor-login" style={{ marginBottom: '20px' }}></div>

                            <button className="btn-primary" onClick={handleSend}>
                                Send Verification Code
                            </button>

                            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                                <span
                                    onClick={() => navigate('/login')}
                                    style={{ color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    Login as Patient <span style={{ marginLeft: '4px' }}>→</span>
                                </span>
                            </div>

                            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                New Doctor?{' '}
                                <span
                                    onClick={() => navigate('/signup', { state: { role: 'doctor' } })}
                                    style={{ color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}
                                >
                                    Register Here
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ marginBottom: '24px' }}>
                                <label>Enter OTP</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="1 2 3 4 5 6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        style={{ paddingLeft: '44px', letterSpacing: '4px', fontWeight: '600' }}
                                    />
                                    <Lock size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '8px' }}>
                                    Code sent to {phoneNumber}. <span onClick={() => setStep(1)} style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>Change</span>
                                </p>
                            </div>

                            <button className="btn-primary" onClick={handleVerify}>
                                Verify & Access Dashboard
                            </button>
                        </>
                    )}
                </div>

                {
                    isNewUser && step === 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                marginTop: '16px',
                                padding: '12px',
                                background: '#fff1f2',
                                borderRadius: '8px',
                                fontSize: '13px',
                                color: '#e11d48',
                                border: '1px solid #fecaca'
                            }}
                        >
                            ⚠️ New doctor registration requires admin approval
                        </motion.div>
                    )
                }
            </motion.div >
        </div >
    );
};

export default DoctorLogin;
