# HealthNexus Medical Records Platform

HealthNexus is an advanced AI-powered health records management system that bridges the gap between doctors and patients.

## Key Features


### 1. **AI-Powered Diagnostics & Insights**
- **Smart Lab Reports**: Upload lab reports (PDF/Images) and get instant, simplified AI summaries.
- **AI Guardian**: Real-time safety checks for medications against your patient history and allergies.
- **Consultation History**: Automatically organized visits and clinical notes.

### 2. **AI Video Explanations (Animated Medical Library)**
- **Automated Storyboarding**: For every medicine in your analyzed lab reports, HealthNexus generates an AI storyboard (video script) explaining how the medicine works in simple terms.
- **Interactive Video Player**: Watch animated-style explanations that break down complex medical mechanisms into easy-to-understand visuals.
- **Searchable Medicine Library**: Search for any medicine name (e.g., "Aspirin", "Metformin") to instantly generate and watch a video explanation.
- **Education First**: Simplifies pharmacology for patients to improve medication adherence and safety.

### 3. **Secure Connections**
- **Doctor Handshake**: Link with your doctor using a unique QR Code ID. Share your records securely with a single click.
- **Privacy Control**: Patients choose exactly which reports to share with which doctor.
- **Family Health**: Manage health records for your entire family (Mother, Father, Spouse, etc.) in one place.
- **Automatic Sync**: If a family member signs up later with the same phone number, their data is automatically linked.
- **Direct Login**: One-click login flow using phone number verification (bypassing complex OTPs for demo convenience).

### 4. **Professional Tools for Doctors**
- **Digital Prescriptions**: Generate professional PDF prescriptions that are automatically shared with patients.
- **Bi-directional View**:
    *   **Patients**: See all connected doctors and their clinical notes.
    *   **Doctors**: View shared medical history and upload prescriptions directly to a patient's timeline.
- **Patient Dashboard**: Track all connected patients, their history, and uploaded records in a unified interface.

### 5. OPD & Appointment Management
*   **Live Status**: Track your current position in the doctor's OPD queue.
*   **Booking**: Schedule visits and get notifications for upcoming checkups.
*   **History**: Every visit is logged with automated data extraction for future reference.

---

##  Technical Architecture

### Frontend (React + Vite)
*   **UI/UX**: Modern, mobile-first design using `framer-motion` for smooth transitions.
*   **State Management**: React Context API for secure Auth and User data.
*   **Resiliency**: Built-in 30s timeouts and retry logic specifically optimized for Render deployment.

### Backend (Node.js + Express)
*   **Database**: Google Firebase Firestore (NoSQL) for high-speed, scalable data storage.
*   **Security**: JWT (JSON Web Tokens) for protected routes and cross-origin resource sharing (CORS).
*   **AI Engine**: Native integration with Google Gemini 1.5 Pro.

---


##  Security & Privacy
*   **Data Normalization**: Automatic self-healing database logic for phone numbers.
*   **Private by Default**: No doctor can see a report unless it is explicitly shared by the patient.
*   **Secure Auth**: No-password direct login mode supported with Firebase background verification.


##  Demo Credentials

Use the following credentials to test the application. The OTP is hardcoded to `123456` for all test accounts.

###  Doctor Portal
*   **Phone**: `+91 1234567890`
*   **OTP**: `123456`

###   Patient Portal (Main)
*   **Phone**: `+91 1234567899`
*   **OTP**: `123456`

###   Patient Portal (Secondary)
*   **Phone**: `+91 6205904440`
*   **OTP**: `123456`

---

##  Setup & Running

### Prerequisites
- Node.js (v18+)
- Firebase Project with Firestore & Auth enabled

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env and service-account.json files
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend_react
npm install
npm run dev
```

The application will be available at [http://localhost:5000](http://localhost:5000).

## Credits

This project was developed and maintained with contributions from the following individuals:

- **Sumit Kumar Ratna**
- **Aditya Singh**
- **Anshika Thakur**
- **Vishnukant Bajpai**

We acknowledge and appreciate the efforts, ideas, and collaboration of all contributors involved in this project.
