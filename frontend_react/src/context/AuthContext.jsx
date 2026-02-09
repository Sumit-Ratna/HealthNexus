import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }

        // Global Axios Interceptor for 401 errors
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    console.warn("Session expired or unauthorized. Logging out...");
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/auth/me');
            setUser(res.data);
        } catch (err) {
            console.error("Auth Check Failed", err);
            localStorage.removeItem('accessToken');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const setupRecaptcha = (elementId) => {
        // Recaptcha is disabled in Fake OTP mode
        console.log("Recaptcha Skipped (Fake OTP Mode)");
    };

    const sendOtp = async (phone, recaptchaContainerId = 'recaptcha-container') => {
        try {
            console.log(`🔥 [FAKE MODE] Preparing OTP for ${phone}`);

            // 1. Check User Status with Backend
            const res = await axios.post('http://localhost:8080/api/auth/otp/send', { phone });
            const { isNew } = res.data;

            // 2. Generate Fake OTP
            const fakeOtp = "123456";
            console.log(`✅ [FAKE OTP GENERATED] Use this code to login: ${fakeOtp}`);
            alert(`[DEV MODE] Your OTP is: ${fakeOtp}`); // Alert the user for easier testing

            // 3. Create a Mock Confirmation Result (Mimics Firebase)
            const mockConfirmationResult = {
                verificationId: "fake-verification-id-" + Date.now(),
                confirm: async (otpInput) => {
                    if (otpInput === fakeOtp) {
                        console.log("✅ [FAKE OTP] Verified Successfully");
                        return {
                            user: {
                                getIdToken: async () => 'FAKE_FIREBASE_TOKEN_12345',
                                phoneNumber: phone,
                                uid: "fake-user-" + phone
                            }
                        };
                    } else {
                        throw new Error("Invalid OTP. Please use " + fakeOtp);
                    }
                }
            };

            return { confirmationResult: mockConfirmationResult, isNew };
        } catch (err) {
            console.error("OTP Send Error:", err);
            throw err;
        }
    };

    const verifyOtp = async (confirmationResult, otp, phone, expectedRole = 'patient') => {
        // 1. Verify with Firebase
        const result = await confirmationResult.confirm(otp);
        const firebaseUser = result.user;
        const idToken = await firebaseUser.getIdToken();

        console.log("🔥 Firebase Auth Success. Token:", idToken);

        // 2. Login with Backend using Token
        const res = await axios.post('http://localhost:8080/api/auth/otp/verify', {
            phone,
            firebaseToken: idToken,
            role: expectedRole
        });

        const { accessToken, user } = res.data;

        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(user);

        return user;
    };

    const register = async (userData, firebaseToken) => {
        // userData: { phone, role, name, etc. }
        const res = await axios.post('http://localhost:8080/api/auth/register', {
            ...userData,
            firebaseToken
        });
        const { accessToken, user } = res.data;

        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(user);

        return user;
    };

    const deleteAccount = async () => {
        await axios.delete('http://localhost:8080/api/profile/delete');
        logout();
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, loading, sendOtp, verifyOtp, register, logout, deleteAccount, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
