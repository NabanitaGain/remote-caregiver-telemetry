export const patients = [
  {
    id: "P-1001",
    name: "Margaret Wilson",
    age: 68,
    gender: "Female",
    room: "A-204",
    status: "Stable",
    risk: "Low",
    caregiver: "Emma Carter",
    condition: "Hypertension",
    lastSeen: "2 min ago",
    avatar: "/avatars/male.jpg",

    vitals: {
      heartRate: 72,
      spo2: 97,
      systolic: 124,
      diastolic: 78,
      temp: 36.7,
      respiratory: 16
    }
  },

  {
    id: "P-1002",
    name: "Robert Anderson",
    age: 74,
    gender: "Male",
    room: "B-112",
    status: "Needs Attention",
    risk: "Medium",
    caregiver: "Daniel Lee",
    condition: "COPD",
    lastSeen: "1 min ago",
    avatar: "/avatars/male1.jpg",

    vitals: {
      heartRate: 91,
      spo2: 93,
      systolic: 138,
      diastolic: 84,
      temp: 37.1,
      respiratory: 21
    }
  },

  {
    id: "P-1003",
    name: "Sophia Martinez",
    age: 61,
    gender: "Female",
    room: "C-305",
    status: "Critical",
    risk: "High",
    caregiver: "Olivia Brown",
    condition: "Heart Failure",
    lastSeen: "30 sec ago",
    avatar: "/avatars/female1.jpg",

    vitals: {
      heartRate: 108,
      spo2: 88,
      systolic: 158,
      diastolic: 96,
      temp: 38.2,
      respiratory: 25
    }
  },

  {
    id: "P-1004",
    name: "James Thompson",
    age: 70,
    gender: "Male",
    room: "A-118",
    status: "Stable",
    risk: "Low",
    caregiver: "Emma Carter",
    condition: "Diabetes",
    lastSeen: "4 min ago",
    avatar: "/avatars/male2.png",

    vitals: {
      heartRate: 76,
      spo2: 96,
      systolic: 129,
      diastolic: 80,
      temp: 36.5,
      respiratory: 17
    }
  },

  {
    id: "P-1005",
    name: "Linda Davis",
    age: 66,
    gender: "Female",
    room: "B-208",
    status: "Monitoring",
    risk: "Medium",
    caregiver: "Noah Wilson",
    condition: "Asthma",
    lastSeen: "3 min ago",
    avatar: "/avatars/female2.jpg",

    vitals: {
      heartRate: 84,
      spo2: 95,
      systolic: 132,
      diastolic: 82,
      temp: 36.9,
      respiratory: 19
    }
  },

  {
    id: "P-1006",
    name: "William Harris",
    age: 79,
    gender: "Male",
    room: "C-104",
    status: "Stable",
    risk: "Low",
    caregiver: "Daniel Lee",
    condition: "Hypertension",
    lastSeen: "5 min ago",
    avatar: "/avatars/male3.jpg",

    vitals: {
      heartRate: 69,
      spo2: 98,
      systolic: 118,
      diastolic: 74,
      temp: 36.4,
      respiratory: 15
    }
  }
];

export const alerts = [
  { id: "ALT-901", patient: "Sophia Martinez", type: "Low SpO₂", value: "88%", severity: "Critical", time: "2 min ago", status: "Open" },
  { id: "ALT-902", patient: "Robert Anderson", type: "High Respiratory Rate", value: "21 /min", severity: "Warning", time: "7 min ago", status: "Open" },
  { id: "ALT-903", patient: "Sophia Martinez", type: "High Temperature", value: "38.2°C", severity: "Warning", time: "12 min ago", status: "Acknowledged" },
  { id: "ALT-904", patient: "Linda Davis", type: "Elevated Blood Pressure", value: "132/82", severity: "Info", time: "18 min ago", status: "Acknowledged" },
  { id: "ALT-905", patient: "Robert Anderson", type: "Heart Rate Elevated", value: "91 bpm", severity: "Warning", time: "31 min ago", status: "Resolved" }
];

export const telemetry = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, "0")}:00`,
  heartRate: 70 + Math.round(Math.sin(i / 2) * 8) + (i % 5),
  spo2: 96 + Math.round(Math.cos(i / 3) * 2),
  systolic: 120 + Math.round(Math.sin(i / 3) * 9),
  diastolic: 76 + Math.round(Math.cos(i / 4) * 5),
  temperature: +(36.5 + Math.sin(i / 4) * 0.5).toFixed(1),
  respiratory: 15 + Math.round(Math.sin(i / 3) * 3)
}));

export const weeklyAdmissions = [
  { day: "Mon", stable: 28, attention: 7, critical: 2 },
  { day: "Tue", stable: 31, attention: 6, critical: 1 },
  { day: "Wed", stable: 29, attention: 9, critical: 3 },
  { day: "Thu", stable: 34, attention: 5, critical: 2 },
  { day: "Fri", stable: 36, attention: 8, critical: 2 },
  { day: "Sat", stable: 32, attention: 4, critical: 1 },
  { day: "Sun", stable: 35, attention: 6, critical: 2 }
];
