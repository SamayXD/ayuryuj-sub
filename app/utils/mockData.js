export const doctorsData = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    //   image: require("../../assets/doctors/doctor1.png"),
    education: [
      "MBBS - AIIMS Delhi",
      "MD (Cardiology) - PGI Chandigarh",
      "DM (Cardiology) - AIIMS Delhi",
    ],
    experience: 15, // years
    languages: ["English", "Hindi", "Punjabi"],
    price: 1200, // consultation fee in INR
    availableToday: true,
    rating: 4.8,
    totalReviews: 1250,
    about:
      "Specializes in interventional cardiology with expertise in complex cardiac procedures.",
    hospitalAffiliation: "Max Super Speciality Hospital, Delhi",
    awards: ["Best Cardiologist Award 2022", "Medical Excellence Award 2020"],
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    //   image: require("../../assets/doctors/doctor2.png"),
    education: [
      "MBBS - KEM Hospital Mumbai",
      "MD (Pediatrics) - JIPMER Puducherry",
    ],
    experience: 8,
    languages: ["English", "Hindi", "Marathi"],
    price: 800,
    availableToday: true,
    rating: 4.9,
    totalReviews: 890,
    about:
      "Child specialist with focus on developmental pediatrics and vaccination.",
    hospitalAffiliation: "Fortis Hospital, Mumbai",
    awards: ["Young Pediatrician Award 2021"],
  },
  {
    id: 3,
    name: "Dr. Arun Venkatesh",
    specialty: "Neurologist",
    //   image: require("../../assets/doctors/doctor3.png"),
    education: [
      "MBBS - Madras Medical College",
      "MD (Neurology) - NIMHANS Bangalore",
      "Fellowship in Stroke Medicine - UK",
    ],
    experience: 20,
    languages: ["English", "Tamil", "Telugu", "Hindi"],
    price: 1500,
    availableToday: false,
    rating: 4.7,
    totalReviews: 1540,
    about: "Expert in stroke treatment and neuro-rehabilitation.",
    hospitalAffiliation: "Apollo Hospitals, Chennai",
    awards: ["Lifetime Achievement in Neurology 2019"],
  },
  {
    id: 4,
    name: "Dr. Meera Patel",
    specialty: "Dermatologist",
    //   image: require("../../assets/doctors/doctor4.png"),
    education: [
      "MBBS - BJ Medical College Ahmedabad",
      "MD (Dermatology) - LTMMC Mumbai",
    ],
    experience: 12,
    languages: ["English", "Hindi", "Gujarati"],
    price: 1000,
    availableToday: true,
    rating: 4.6,
    totalReviews: 750,
    about:
      "Cosmetic dermatologist specializing in skin treatments and procedures.",
    hospitalAffiliation: "Kokilaben Hospital, Mumbai",
    awards: ["Best Dermatologist Award 2023"],
  },
  {
    id: 5,
    name: "Dr. Sunil Mehta",
    specialty: "Orthopedic Surgeon",
    //   image: require("../../assets/doctors/doctor5.png"),
    education: [
      "MBBS - Grant Medical College Mumbai",
      "MS (Ortho) - PGIMER Chandigarh",
      "Fellowship in Joint Replacement - Germany",
    ],
    experience: 18,
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    price: 1300,
    availableToday: true,
    rating: 4.9,
    totalReviews: 2100,
    about: "Specializes in joint replacement surgery and sports injuries.",
    hospitalAffiliation: "Breach Candy Hospital, Mumbai",
    awards: ["Excellence in Orthopedic Surgery 2021"],
  },
];

// Common specialties list
export const specialties = [
  "Cardiologist",
  "Pediatrician",
  "Neurologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Gynecologist",
  "ENT Specialist",
  "Psychiatrist",
  "Dentist",
  "General Physician",
];

// Time slots format
export const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
];

// ... existing doctorsData, specialties, and timeSlots ...

export const myAppointments = {
  upcoming: [
    {
      id: "ua1",
      doctorId: 1, // references doctorsData
      date: "2024-02-15",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "Confirmed",
      symptoms: "Chest pain and shortness of breath",
      bookingId: "AP89012",
    },
    {
      id: "ua2",
      doctorId: 4,
      date: "2024-02-20",
      time: "04:30 PM",
      type: "In-Person",
      status: "Scheduled",
      symptoms: "Skin rash and itching",
      bookingId: "AP89013",
    },
  ],
  past: [
    {
      id: "pa1",
      doctorId: 2,
      date: "2024-01-15",
      time: "11:00 AM",
      type: "Video Consultation",
      status: "Completed",
      diagnosis: "Seasonal flu",
      prescription: "prescription_pa1.pdf",
      followUpNeeded: true,
      followUpDate: "2024-02-15",
    },
    {
      id: "pa2",
      doctorId: 3,
      date: "2023-12-20",
      time: "09:30 AM",
      type: "In-Person",
      status: "Completed",
      diagnosis: "Migraine",
      prescription: "prescription_pa2.pdf",
      followUpNeeded: false,
    },
  ],
};

export const myReports = {
  medical: [
    {
      id: "mr1",
      name: "Complete Blood Count",
      date: "2024-01-20",
      laboratory: "Max Labs, Mumbai",
      type: "Blood Test",
      doctorId: 1,
      status: "Normal",
      file: "cbc_report.pdf",
      keyFindings: [
        "Hemoglobin: 14.5 g/dL",
        "WBC Count: 7500/μL",
        "Platelet Count: 250,000/μL",
      ],
    },
    {
      id: "mr2",
      name: "Lipid Profile",
      date: "2024-01-20",
      laboratory: "Max Labs, Mumbai",
      type: "Blood Test",
      doctorId: 1,
      status: "Attention Needed",
      file: "lipid_profile.pdf",
      keyFindings: [
        "Total Cholesterol: 210 mg/dL",
        "HDL: 45 mg/dL",
        "LDL: 140 mg/dL",
      ],
    },
  ],
  imaging: [
    {
      id: "ir1",
      name: "Chest X-Ray",
      date: "2023-12-15",
      facility: "City Imaging Center",
      type: "X-Ray",
      doctorId: 1,
      status: "Normal",
      file: "chest_xray.pdf",
      findings: "No significant abnormalities detected",
    },
  ],
  prescriptions: [
    {
      id: "pr1",
      date: "2024-01-15",
      doctorId: 2,
      medications: [
        {
          name: "Paracetamol",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "5 days",
        },
        {
          name: "Azithromycin",
          dosage: "250mg",
          frequency: "Once daily",
          duration: "3 days",
        },
      ],
      instructions: "Take medicine after meals",
      file: "prescription_pr1.pdf",
    },
  ],
};

export const myProfile = {
  id: "user123",
  name: "Samay Negi",
  age: 28,
  gender: "Male",
  bloodGroup: "B+",
  height: "175 cm",
  weight: "70 kg",
  allergies: ["Penicillin"],
  chronicConditions: [],
  emergencyContact: {
    name: "Rahul Negi",
    relation: "Brother",
    phone: "+91-9876543210",
  },
  address: {
    street: "123 Palm Grove",
    area: "Bandra West",
    city: "Mumbai",
    pincode: "400050",
  },
};

export default {
  doctorsData,
  myAppointments,
  myReports,
};
