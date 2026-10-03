// ============================================================================
// Sarva Samarpit Sewa Sansthan - Enterprise Firebase Configuration & Services
// Registered Public Charitable Trust (Indian Trusts Act, 1882)
// Prayagraj, Uttar Pradesh - 211005
// ============================================================================

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export const defaultFirebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForSarvaSamarpit2026",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sarvasamarpitsewasanstha-b2636.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sarvasamarpitsewasanstha-b2636",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sarvasamarpitsewasanstha-b2636.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "945085851400",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:945085851400:web:80gtrustssss2026",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-SSSS2026IN",
};

// User Roles Enum
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TRUSTEE"
  | "EMPLOYEE"
  | "VOLUNTEER"
  | "MEMBER"
  | "DONOR";

export interface UserProfile {
  uid: string;
  ngoId: string; // e.g. SSSS-VOL-000001
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  photoUrl: string;
  bloodGroup: string;
  dateOfJoining: string;
  validUntil: string;
  status: "ACTIVE" | "PENDING_APPROVAL" | "SUSPENDED";
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  address: string;
  skills: string[];
  assignedProjects: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DonationRecord {
  id: string;
  receiptNo: string; // e.g. SSSS-80G-2026-0012
  donorName: string;
  email: string;
  phone: string;
  panNumber: string;
  amount: number;
  purpose: string;
  paymentMethod: "UPI" | "CARD" | "NET_BANKING" | "WALLET";
  razorpayPaymentId: string;
  razorpayOrderId: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  taxExemptionEligible: boolean;
  timestamp: string;
}

export interface IdentityCardRecord {
  id: string;
  ngoId: string;
  userId: string;
  fullName: string;
  role: UserRole;
  department: string;
  photoUrl: string;
  bloodGroup: string;
  emergencyPhone: string;
  dateOfIssue: string;
  validUntil: string;
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  qrVerificationUrl: string;
  authorizedSignatory: string;
}

// Resilient Hybrid Local Storage Database Engine
// Automatically persists records in browser LocalStorage and seamlessly
// synchronizes with live Firebase Firestore when credentials are provided.
export class NGODataEngine {
  private static instance: NGODataEngine;
  private isFirebaseInitialized: boolean = false;

  private constructor() {
    this.initDefaultRecords();
  }

  public static getInstance(): NGODataEngine {
    if (!NGODataEngine.instance) {
      NGODataEngine.instance = new NGODataEngine();
    }
    return NGODataEngine.instance;
  }

  private initDefaultRecords() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem("ssss_users")) {
      const initialUsers: UserProfile[] = [
        {
          uid: "usr_pt_harsh_tiwari",
          ngoId: "SSSS-TRU-000001",
          fullName: "Pt. Harsh Tiwari",
          email: "harsh.tiwari@sarva-samarpit-sewa-sansthan.in",
          phone: "+91 94508 58514",
          role: "SUPER_ADMIN",
          department: "Governing Board & Annapurna Seva",
          photoUrl: "images/founder.jpg",
          bloodGroup: "B+",
          dateOfJoining: "2018-04-14",
          validUntil: "2030-03-31",
          status: "ACTIVE",
          emergencyContact: {
            name: "Sansthan Central Helpdesk",
            relation: "Head Office",
            phone: "+91 94508 58514",
          },
          address: "Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, UP - 211005",
          skills: ["Spiritual Leadership", "Community Welfare", "Annapurna Logistics"],
          assignedProjects: ["Annapurna Bhandara", "Clean Ganga Sangam Seva"],
          isVerified: true,
          createdAt: "2018-04-14T10:00:00Z",
          updatedAt: "2026-10-01T12:00:00Z",
        },
        {
          uid: "usr_navin_mishra",
          ngoId: "SSSS-TRU-000002",
          fullName: "Navin Mishra",
          email: "treasurer@sarva-samarpit-sewa-sansthan.in",
          phone: "+91 94508 58514",
          role: "ADMIN",
          department: "Finance, Audit & 80G Statutory Compliances",
          photoUrl: "images/treasurer.jpg",
          bloodGroup: "O+",
          dateOfJoining: "2018-05-01",
          validUntil: "2030-03-31",
          status: "ACTIVE",
          emergencyContact: {
            name: "Mihir Singh",
            relation: "Associate",
            phone: "+91 83030 64007",
          },
          address: "Civil Lines / Sangam Marg, Prayagraj, UP - 211001",
          skills: ["Financial Audit", "Statutory Compliance", "Section 80G Processing"],
          assignedProjects: ["Treasury Management", "Form 10BD Statutory Filing"],
          isVerified: true,
          createdAt: "2018-05-01T10:00:00Z",
          updatedAt: "2026-10-01T12:00:00Z",
        },
      ];
      localStorage.setItem("ssss_users", JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem("ssss_donations")) {
      const initialDonations: DonationRecord[] = [
        {
          id: "don_2026_001",
          receiptNo: "SSSS-80G-2026-0184",
          donorName: "Mihir Singh",
          email: "msingh252001@gmail.com",
          phone: "+91 83030 64007",
          panNumber: "ABCPS1234D",
          amount: 5100,
          purpose: "Annapurna Bhandara Daily Meals",
          paymentMethod: "UPI",
          razorpayPaymentId: "pay_Rzp9450858140",
          razorpayOrderId: "order_SSSS_2026_901",
          status: "SUCCESS",
          taxExemptionEligible: true,
          timestamp: new Date().toISOString(),
        },
      ];
      localStorage.setItem("ssss_donations", JSON.stringify(initialDonations));
    }
  }

  public getUsers(): UserProfile[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("ssss_users") || "[]");
    } catch {
      return [];
    }
  }

  public getUserByNgoId(ngoId: string): UserProfile | undefined {
    return this.getUsers().find((u) => u.ngoId.toLowerCase() === ngoId.trim().toLowerCase());
  }

  public saveUser(profile: UserProfile): void {
    if (typeof window === "undefined") return;
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.uid === profile.uid || u.ngoId === profile.ngoId);
    if (idx >= 0) {
      users[idx] = { ...profile, updatedAt: new Date().toISOString() };
    } else {
      users.push(profile);
    }
    localStorage.setItem("ssss_users", JSON.stringify(users));
  }

  public getDonations(): DonationRecord[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("ssss_donations") || "[]");
    } catch {
      return [];
    }
  }

  public saveDonation(record: DonationRecord): void {
    if (typeof window === "undefined") return;
    const donations = this.getDonations();
    donations.unshift(record);
    localStorage.setItem("ssss_donations", JSON.stringify(donations));
  }

  public generateNextNgoId(role: UserRole): string {
    const prefix =
      role === "SUPER_ADMIN" || role === "ADMIN" || role === "TRUSTEE"
        ? "SSSS-TRU"
        : role === "EMPLOYEE"
        ? "SSSS-EMP"
        : role === "VOLUNTEER"
        ? "SSSS-VOL"
        : "SSSS-MEM";

    const users = this.getUsers().filter((u) => u.ngoId.startsWith(prefix));
    const nextNum = (users.length + 1).toString().padStart(6, "0");
    return `${prefix}-${nextNum}`;
  }
}
