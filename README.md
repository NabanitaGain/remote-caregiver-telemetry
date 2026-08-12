# CarePulse — Remote Caregiver Telemetry Dashboard V3

## Stack
- React + Vite
- Tailwind CSS v4
- DaisyUI
- Recharts
- React Router
- Lucide React

## Run
```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## V3 pages
- Dashboard
- Patients
- Patient Details
- Live Telemetry
- Alerts
- Analytics
- Settings

## Important
The telemetry and patient records are simulated mock data for a university capstone prototype. They are not real clinical data and should not be presented as a medical diagnostic system.

## Backend-ready structure
The current UI reads from `src/data/mockData.js`. Later, replace those imports with API calls such as:
- GET /api/patients
- GET /api/patients/:id
- GET /api/telemetry/:patientId
- GET /api/alerts
- PATCH /api/alerts/:id
- GET /api/analytics/summary
