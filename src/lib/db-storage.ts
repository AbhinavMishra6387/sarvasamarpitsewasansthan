import bcrypt from "bcryptjs";

export interface DonationRecord {
  id: string;
  receiptNo: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber?: string;
  address?: string;
  amount: number;
  currency: string;
  paymentGateway: "RAZORPAY" | "PHONEPE" | "UPI_QR" | "BANK_TRANSFER";
  paymentStatus: "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED";
  transactionId?: string;
  orderId?: string;
  campaignTitle?: string;
  isAnonymous: boolean;
  is80GClaimed: boolean;
  taxReceiptUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface VolunteerRecord {
  id: string;
  volunteerCode: string;
  fullName: string;
  email: string;
  phone: string;
  altPhone?: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  photoUrl?: string;
  resumeUrl?: string;
  skills: string[];
  availability: string;
  previousExperience?: string;
  reasonToJoin?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "INACTIVE";
  notes?: string;
  createdAt: string;
}

export interface MembershipRecord {
  id: string;
  membershipNumber: string;
  fullName: string;
  fatherSpouseName?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  aadharNo?: string;
  occupation?: string;
  fullAddress: string;
  photoUrl?: string;
  digitalCardUrl?: string;
  qrCodeData?: string;
  membershipType: "ANNUAL" | "PATRON" | "LIFE" | "HONORARY";
  paymentStatus: "SUCCESS" | "PENDING" | "FAILED";
  amountPaid: number;
  validFrom: string;
  validUntil: string;
  status: "ACTIVE" | "PENDING_APPROVAL" | "EXPIRED" | "CANCELLED";
  createdAt: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "FOOD_DISTRIBUTION" | "MEDICAL_CAMPS" | "RELIGIOUS_ACTIVITIES" | "SOCIAL_WELFARE";
  featuredImage: string;
  galleryImages: string[];
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  status: "ONGOING" | "COMPLETED" | "UPCOMING";
  location: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  bannerImage: string;
  location: string;
  googleMapUrl?: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  isUpcoming: boolean;
  registrationRequired: boolean;
  maxAttendees: number;
  registeredCount: number;
  isFeatured: boolean;
}

export interface BlogRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  authorRole: string;
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  publishedAt: string;
  viewCount: number;
}

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "CONTENT_MANAGER" | "DONATION_MANAGER" | "VOLUNTEER_MANAGER" | "ACCOUNT_MANAGER";
  passwordHash: string;
  isActive: boolean;
  lastLogin?: string;
}

// Global In-Memory Singleton Storage ensuring state persistence across Next.js API requests
class AppDataStore {
  private static instance: AppDataStore;

  public users: UserRecord[] = [];
  public donations: DonationRecord[] = [];
  public volunteers: VolunteerRecord[] = [];
  public memberships: MembershipRecord[] = [];
  public projects: ProjectRecord[] = [];
  public events: EventRecord[] = [];
  public blogs: BlogRecord[] = [];
  public inquiries: any[] = [];
  public settings: Record<string, any> = {};
  public auditLogs: any[] = [];

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): AppDataStore {
    if (!AppDataStore.instance) {
      AppDataStore.instance = new AppDataStore();
    }
    return AppDataStore.instance;
  }

  private seedInitialData() {
    // Default Admin (Password: Admin@SSSS2026!)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Admin@SSSS2026!", salt);

    this.users = [
      {
        id: "usr-admin-1",
        email: "admin@sarvasamarpit.org",
        name: "Sansthan Super Admin",
        phone: "09450858514",
        role: "SUPER_ADMIN",
        passwordHash: hash,
        isActive: true,
        lastLogin: new Date().toISOString(),
      },
      {
        id: "usr-editor-1",
        email: "editor@sarvasamarpit.org",
        name: "Media & Seva Coordinator",
        phone: "09450858514",
        role: "EDITOR",
        passwordHash: hash,
        isActive: true,
      },
    ];

    this.donations = [
      {
        id: "don-001",
        receiptNo: "SSSS-2026-RCP-1082",
        donorName: "Rajesh Kumar Sharma",
        donorEmail: "rajesh.sharma@gmail.com",
        donorPhone: "+91 98390 12345",
        panNumber: "ABCPS1234F",
        address: "Civil Lines, Prayagraj, UP",
        amount: 5100,
        currency: "INR",
        paymentGateway: "UPI_QR",
        paymentStatus: "SUCCESS",
        transactionId: "UPI-428910293812",
        orderId: "order_NP89234812",
        campaignTitle: "Daily Annapurna Bhandara Seva",
        isAnonymous: false,
        is80GClaimed: true,
        taxReceiptUrl: "/api/donations/receipt/don-001",
        notes: "Donated on auspicious Tuesday at Bade Hanuman Ji Temple",
        createdAt: "2026-09-28T10:15:00Z",
      },
      {
        id: "don-002",
        receiptNo: "SSSS-2026-RCP-1083",
        donorName: "Sunita Devi Verma",
        donorEmail: "sunitav1975@yahoo.co.in",
        donorPhone: "+91 94151 78901",
        panNumber: "BNMPV5678K",
        address: "Katra, Prayagraj",
        amount: 11000,
        currency: "INR",
        paymentGateway: "RAZORPAY",
        paymentStatus: "SUCCESS",
        transactionId: "pay_OpL98124901",
        orderId: "order_OP98124901",
        campaignTitle: "Free Triveni Sangam Medical Health Camp",
        isAnonymous: false,
        is80GClaimed: true,
        taxReceiptUrl: "/api/donations/receipt/don-002",
        createdAt: "2026-09-29T14:20:00Z",
      },
      {
        id: "don-003",
        receiptNo: "SSSS-2026-RCP-1084",
        donorName: "Anonymous Devotee",
        donorEmail: "anonymous@sarvasamarpit.org",
        donorPhone: "+91 94508 58514",
        amount: 2100,
        currency: "INR",
        paymentGateway: "PHONEPE",
        paymentStatus: "SUCCESS",
        transactionId: "TXN-PHN-89217391",
        campaignTitle: "Shree Bade Hanuman Ji Akhand Prasad Seva",
        isAnonymous: true,
        is80GClaimed: false,
        createdAt: "2026-09-30T09:00:00Z",
      },
      {
        id: "don-004",
        receiptNo: "SSSS-2026-RCP-1085",
        donorName: "Amitabh Srivastava",
        donorEmail: "amitabh.sriv@outlook.com",
        donorPhone: "+91 99182 34567",
        panNumber: "AAAPS7711M",
        amount: 25000,
        currency: "INR",
        paymentGateway: "BANK_TRANSFER",
        paymentStatus: "SUCCESS",
        transactionId: "NEFT-SBIN260930114",
        campaignTitle: "Winter Blanket & Clothing Distribution for Sangam Pilgrims",
        isAnonymous: false,
        is80GClaimed: true,
        taxReceiptUrl: "/api/donations/receipt/don-004",
        createdAt: "2026-09-30T16:45:00Z",
      },
    ];

    this.volunteers = [
      {
        id: "vol-001",
        volunteerCode: "VOL-PRG-0101",
        fullName: "Prashant Dwivedi",
        email: "prashant.d@gmail.com",
        phone: "+91 98380 91823",
        address: "Daraganj, Sangam Marg, Prayagraj",
        city: "Prayagraj",
        state: "Uttar Pradesh",
        pincode: "211006",
        occupation: "University Lecturer & Social Worker",
        skills: ["Event Organization", "Crowd Management", "First Aid", "Food Logistics"],
        availability: "Weekends & Sangam Holy Festivals",
        reasonToJoin: "Long-standing devotion to Hanuman Ji and eager to feed needy devotees on Triveni Sangam bank.",
        status: "APPROVED",
        createdAt: "2026-09-15T11:00:00Z",
      },
      {
        id: "vol-002",
        volunteerCode: "VOL-PRG-0102",
        fullName: "Dr. Ananya Mishra",
        email: "ananya.mishra.md@gmail.com",
        phone: "+91 94511 22334",
        address: "Tagore Town, Prayagraj",
        city: "Prayagraj",
        state: "Uttar Pradesh",
        pincode: "211002",
        occupation: "Medical Doctor (General Physician)",
        skills: ["Medical Checkups", "Blood Pressure & Diabetes Screening", "Prescription Counseling"],
        availability: "Sunday Medical Camps",
        reasonToJoin: "Want to volunteer free healthcare services for underprivileged pilgrims and local residents.",
        status: "APPROVED",
        createdAt: "2026-09-18T14:30:00Z",
      },
      {
        id: "vol-003",
        volunteerCode: "VOL-PRG-0103",
        fullName: "Rahul Tiwari",
        email: "rahul.tiwari99@gmail.com",
        phone: "+91 91255 66778",
        address: "Allahpur, Prayagraj",
        city: "Prayagraj",
        state: "Uttar Pradesh",
        pincode: "211006",
        occupation: "Software Engineer",
        skills: ["Social Media", "Photography", "Website Maintenance", "Live Streaming"],
        availability: "Flexible / Online & Evenings",
        reasonToJoin: "Contribute technological skills to expand the reach of Sansthan's seva activities.",
        status: "PENDING",
        createdAt: "2026-09-30T17:15:00Z",
      },
    ];

    this.memberships = [
      {
        id: "mem-001",
        membershipNumber: "SSSS-LIFE-00108",
        fullName: "Satya Prakash Tripathi",
        fatherSpouseName: "Late Ram Ashray Tripathi",
        email: "satya.tripathi@gmail.com",
        phone: "+91 94152 33445",
        bloodGroup: "O+",
        occupation: "Retired Senior Government Officer",
        fullAddress: "Sangam Marg, Civil Lines, Prayagraj - 211001",
        membershipType: "LIFE",
        paymentStatus: "SUCCESS",
        amountPaid: 21000,
        validFrom: "2024-01-01T00:00:00Z",
        validUntil: "2044-01-01T00:00:00Z",
        status: "ACTIVE",
        qrCodeData: "https://sarvasamarpit.org/membership/card/mem-001",
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "mem-002",
        membershipNumber: "SSSS-ANN-00452",
        fullName: "Pooja Singhania",
        email: "pooja.singh@gmail.com",
        phone: "+91 98399 88776",
        bloodGroup: "B+",
        occupation: "Educationist",
        fullAddress: "George Town, Prayagraj - 211002",
        membershipType: "ANNUAL",
        paymentStatus: "SUCCESS",
        amountPaid: 1100,
        validFrom: "2026-01-01T00:00:00Z",
        validUntil: "2026-12-31T23:59:59Z",
        status: "ACTIVE",
        qrCodeData: "https://sarvasamarpit.org/membership/card/mem-002",
        createdAt: "2026-01-05T00:00:00Z",
      },
    ];

    this.projects = [
      {
        id: "proj-001",
        slug: "food-distribution",
        title: "Annapurna Mahaprasad & Daily Food Distribution",
        shortDesc: "Serving hygienic, freshly cooked warm meals 365 days a year to pilgrims, sadhus, and destitute families at Triveni Sangam.",
        fullDesc: "Our Annapurna Bhandara initiative operates round the clock near Shree Bade Hanuman Ji Temple and Sangam Ghat. Over 1,500 wholesome meals containing dal, rice, rotis, sabzi, and holy kheer are prepared and served every day in clean, eco-friendly pattals.",
        category: "FOOD_DISTRIBUTION",
        featuredImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
        galleryImages: [
          "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        ],
        targetAmount: 1000000,
        raisedAmount: 745000,
        donorsCount: 820,
        status: "ONGOING",
        location: "Sangam Marg, Bade Hanuman Mandir Complex, Prayagraj",
        isFeatured: true,
        displayOrder: 1,
        createdAt: "2024-01-10T00:00:00Z",
      },
      {
        id: "proj-002",
        slug: "medical-camps",
        title: "Free Healthcare Clinics & Diagnostic Camps",
        shortDesc: "Providing free specialized physician consultations, diagnostic blood tests, and vital medicines to disadvantaged rural and urban populations.",
        fullDesc: "Every weekend and during holy Snan days, our team of dedicated volunteer doctors, nurses, and pharmacists set up mobile healthcare booths. Patients receive free cardiac, diabetic, ocular, and general health screenings along with 100% free prescribed medicines.",
        category: "MEDICAL_CAMPS",
        featuredImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200",
        galleryImages: [
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        ],
        targetAmount: 500000,
        raisedAmount: 382000,
        donorsCount: 415,
        status: "ONGOING",
        location: "Triveni Sangam Ghat & Trans-Ganga Rural Belts",
        isFeatured: true,
        displayOrder: 2,
        createdAt: "2024-02-15T00:00:00Z",
      },
      {
        id: "proj-003",
        slug: "religious-activities",
        title: "Shree Bade Hanuman Ji Seva & Sangam Cleanliness Drive",
        shortDesc: "Spiritual welfare, akhand sankirtan, pilgrim guidance, and holy riverbank cleanliness campaigns to preserve Triveni Sangam sanctity.",
        fullDesc: "Operating at the historic Shree Bade Hanuman Ji Temple (Bandh Wale Hanuman Ji), our volunteers facilitate smooth darshan for elder citizens, manage prasad distribution, and lead regular 'Swachh Sangam - Nirmal Ganga' clean-up drives collecting bio-waste and plastics.",
        category: "RELIGIOUS_ACTIVITIES",
        featuredImage: "https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=1200",
        galleryImages: [
          "https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
        ],
        targetAmount: 350000,
        raisedAmount: 295000,
        donorsCount: 310,
        status: "ONGOING",
        location: "Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj",
        isFeatured: true,
        displayOrder: 3,
        createdAt: "2024-03-01T00:00:00Z",
      },
      {
        id: "proj-004",
        slug: "social-welfare",
        title: "Child Education, Women Skill Centers & Winter Seva",
        shortDesc: "Empowering underserved children with books, tuition, school uniforms, and providing seasonal blankets to elderly people sleeping rough.",
        fullDesc: "We support over 350 underprivileged children with free remedial education kits, stationery, and nutritional supplements. In extreme northern winters, our night rescue team distributes thousands of thick woollen blankets across Prayagraj railway stations, bus stands, and temple sheds.",
        category: "SOCIAL_WELFARE",
        featuredImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
        galleryImages: [
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
        ],
        targetAmount: 600000,
        raisedAmount: 430000,
        donorsCount: 520,
        status: "ONGOING",
        location: "Prayagraj Urban Slums & Surrounding Rural Villages",
        isFeatured: true,
        displayOrder: 4,
        createdAt: "2024-04-10T00:00:00Z",
      },
    ];

    this.events = [
      {
        id: "evt-001",
        slug: "magh-mela-mega-langar-seva",
        title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
        description: "A 45-day continuous non-stop food distribution and round-the-clock shelter tent setup for hundreds of thousands of pilgrims congregating at Sangam.",
        bannerImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
        location: "Sector 3, Sangam Ghat, Prayagraj",
        eventDate: "2026-11-15T06:00:00Z",
        startTime: "06:00 AM",
        endTime: "11:00 PM",
        isUpcoming: true,
        registrationRequired: true,
        maxAttendees: 2000,
        registeredCount: 840,
        isFeatured: true,
      },
      {
        id: "evt-002",
        slug: "hanuman-jayanti-mahotsav-and-health-camp",
        title: "Shree Bade Hanuman Jayanti Mahotsav & Free Health Camp",
        description: "Grand abhishek, 108 Sundarkand paath recitations, mega blood donation drive, and free eye surgery screening for senior citizens.",
        bannerImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200",
        location: "Bade Hanuman Mandir Hall, Sangam Marg, Prayagraj",
        eventDate: "2026-10-25T08:00:00Z",
        startTime: "08:00 AM",
        endTime: "08:00 PM",
        isUpcoming: true,
        registrationRequired: true,
        maxAttendees: 1500,
        registeredCount: 620,
        isFeatured: true,
      },
      {
        id: "evt-003",
        slug: "winter-blanket-distribution-drive",
        title: "Sheetkal Seva: 5,000 Woollen Blankets Distribution",
        description: "Door-to-door and night outreach across Prayagraj city to protect homeless brothers, sisters, and sadhus from biting winter frost.",
        bannerImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
        location: "Prayagraj Junction, Civil Lines, and Sangam Bandh",
        eventDate: "2026-12-01T20:00:00Z",
        startTime: "08:00 PM",
        endTime: "02:00 AM",
        isUpcoming: true,
        registrationRequired: false,
        maxAttendees: 500,
        registeredCount: 210,
        isFeatured: true,
      },
    ];

    this.blogs = [
      {
        id: "blg-001",
        slug: "sacred-significance-of-annadanam-at-triveni-sangam",
        title: "The Sacred Significance of Annadanam at Triveni Sangam: Why Feeding Every Soul Matters",
        excerpt: "In ancient Indian tradition, giving food is not merely charity—it is an offering directly to the Divine resident in every human heart.",
        content: `
# The Sacred Significance of Annadanam at Triveni Sangam

In the sacred realm of Prayagraj, where the holy rivers Ganga, Yamuna, and the mystical Saraswati converge, every act of benevolence echoes with eternal merit (*Punya*). Among all virtues described in the scriptures, **Annadanam** (the selfless offering of food) stands as the supreme dharma:

> *"Annam Bahu Kurveeta Tad Vratam"* — Let one create and offer food in abundance; that is the sacred vow.

### Operating 24 Hours Near Shree Bade Hanuman Ji
At Sarva Samarpit Sewa Sansthan, our central mission is ensuring that no pilgrim, devotee, elderly person, or destitute individual sleeping by the riverbank goes hungry. Operating from the shadows of the holy **Shree Bade Hanuman Ji Temple on Sangam Marg**, our kitchen fires burn continuously.

### Nutrition with Dignity
Our food seva is prepared with pure vegetarian ingredients, ghee, wholesome lentils, seasonal vegetables, and whole wheat rotis. We treat every recipient not as a beneficiary of charity, but as **Narayana Himself** (*Daridra Narayana Seva*).

### How You Can Participate
Whether you wish to sponsor a day's meal on your birthday, honor the memory of your ancestors, or dedicate seva on a special Tuesday or Saturday, your contribution directly feeds thousands of living souls at the Sangam.
        `,
        coverImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
        authorName: "Pujya Swami Ji / Seva Mandal",
        authorRole: "Chief Patron & Trustee",
        category: "Spiritual Philosophy",
        tags: ["Annadanam", "Triveni Sangam", "Bade Hanuman Ji", "Food Seva"],
        readTime: "5 min read",
        isPublished: true,
        publishedAt: "2026-09-20T10:00:00Z",
        viewCount: 1420,
      },
      {
        id: "blg-002",
        slug: "holistic-healthcare-for-underprivileged-pilgrims",
        title: "Healing with Compassion: How Our Volunteer Doctors Bring Hope to Rural Pilgrims",
        excerpt: "Inside our free weekend medical camps, diagnostic vans, and distribution of life-saving medicines at Prayagraj.",
        content: `
# Healing with Compassion: Our Healthcare Seva Mission

Healthcare is a basic human right, yet for thousands of rural pilgrims visiting Prayagraj and underprivileged families living along the riverbanks, quality medical diagnosis remains out of reach.

### Our Clinical Infrastructure
Sarva Samarpit Sewa Sansthan mobilizes qualified specialist doctors—physicians, cardiologists, pediatricians, ophthalmologists, and orthopedic specialists—who donate their valuable time on weekends.

1. **Free Diagnostic Screenings**: Complete blood counts, random blood sugar tests, ECG, and blood pressure checks.
2. **Prescription Fulfillment**: We supply full 15-to-30 day courses of necessary medications at 100% zero cost.
3. **Emergency First Aid at Sangam**: Our trained volunteers assist elder devotees suffering from heat exhaustion, fatigue, or injuries during large bathing festivals.

Join our volunteer medical panel or sponsor essential medicines today!
        `,
        coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200",
        authorName: "Dr. Ananya Mishra",
        authorRole: "Medical Volunteer Head",
        category: "Health & Seva",
        tags: ["Healthcare", "Free Medical Camp", "Prayagraj Doctors", "Compassion"],
        readTime: "4 min read",
        isPublished: true,
        publishedAt: "2026-09-25T11:30:00Z",
        viewCount: 980,
      },
      {
        id: "blg-003",
        slug: "understanding-80g-tax-benefits-for-charitable-donations",
        title: "Maximizing Impact: A Guide to 80G Tax Exemption for Donors to Sarva Samarpit Sewa Sansthan",
        excerpt: "Learn how your donation of any amount grants you a 50% income tax deduction under Section 80G while creating tangible positive change.",
        content: `
# Tax Benefits of Giving: Section 80G Guide

Donations made to **Sarva Samarpit Sewa Sansthan** qualify for tax deductions under **Section 80G of the Income Tax Act, 1961** (Registration No: \`AABTS8923RF20214\`).

### Key Highlights for Donors:
- **Eligible Deduction**: Up to 50% of the donated amount can be deducted from your taxable income.
- **Instant Digital 80G Receipt**: Every online donation via Razorpay, PhonePe, or UPI generates an immediate digital 80G tax certificate containing our trust registration number and your PAN details.
- **Form 10BD Compliance**: We electronically report all eligible contributions to the Income Tax Department annually, ensuring the donation automatically populates in your AIS (Annual Information Statement) and pre-filled ITR.

Invest in selfless service today and optimize your tax liabilities responsibly!
        `,
        coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        authorName: "Chartered Advisory Desk",
        authorRole: "Financial Trustee",
        category: "Compliance & 80G",
        tags: ["80G", "Tax Exemption", "ITR", "Charitable Trust"],
        readTime: "6 min read",
        isPublished: true,
        publishedAt: "2026-09-28T09:00:00Z",
        viewCount: 1650,
      },
    ];

    this.settings = {
      orgName: "Sarva Samarpit Sewa Sansthan",
      tagline: "Dedicated to the Selfless Service of Humanity & Divinity",
      phone: "09450858514",
      email: "info@sarvasamarpit.org",
      headOffice: "Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, Uttar Pradesh – 211005",
      businessHours: "Open 24 Hours",
      upiId: "9450858514@upi",
      totalMealsServed: 485000,
      patientsTreated: 32400,
      activeVolunteers: 640,
      registeredMembers: 1250,
      announcementActive: true,
      announcementText: "Jai Shree Ram! Akhand Annapurna Bhandara & Free Health Camp running 24x7 at Bade Hanuman Ji Temple, Sangam Marg, Prayagraj.",
      announcementLink: "/donate",
    };
  }

  // Donation methods
  public async getDonations(): Promise<DonationRecord[]> {
    return [...this.donations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async createDonation(data: Partial<DonationRecord>): Promise<DonationRecord> {
    const id = `don-${Date.now()}`;
    const receiptNo = `SSSS-${new Date().getFullYear()}-RCP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = {
      id,
      receiptNo,
      donorName: data.donorName || "Kind Devotee",
      donorEmail: data.donorEmail || "donor@sarvasamarpit.org",
      donorPhone: data.donorPhone || "09450858514",
      panNumber: data.panNumber?.toUpperCase() || "",
      address: data.address || "",
      amount: Number(data.amount) || 500,
      currency: "INR",
      paymentGateway: data.paymentGateway || "RAZORPAY",
      paymentStatus: data.paymentStatus || "SUCCESS",
      transactionId: data.transactionId || `TXN-${Date.now()}`,
      orderId: data.orderId || `ord_${Date.now()}`,
      campaignTitle: data.campaignTitle || "General Food & Seva Fund",
      isAnonymous: Boolean(data.isAnonymous),
      is80GClaimed: Boolean(data.is80GClaimed ?? true),
      taxReceiptUrl: `/api/donations/receipt/${id}`,
      notes: data.notes || "",
      createdAt: new Date().toISOString(),
    };
    this.donations.unshift(newDonation);
    return newDonation;
  }

  // Volunteer methods
  public async getVolunteers(): Promise<VolunteerRecord[]> {
    return [...this.volunteers].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async createVolunteer(data: Partial<VolunteerRecord>): Promise<VolunteerRecord> {
    const id = `vol-${Date.now()}`;
    const code = `VOL-PRG-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: VolunteerRecord = {
      id,
      volunteerCode: code,
      fullName: data.fullName || "Volunteer",
      email: data.email || "",
      phone: data.phone || "",
      altPhone: data.altPhone || "",
      dateOfBirth: data.dateOfBirth || "",
      gender: data.gender || "Not specified",
      occupation: data.occupation || "",
      address: data.address || "",
      city: data.city || "Prayagraj",
      state: data.state || "Uttar Pradesh",
      pincode: data.pincode || "211005",
      photoUrl: data.photoUrl || "",
      skills: Array.isArray(data.skills) ? data.skills : ["General Seva"],
      availability: data.availability || "Weekends",
      previousExperience: data.previousExperience || "",
      reasonToJoin: data.reasonToJoin || "Desire to serve at Sangam",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    this.volunteers.unshift(record);
    return record;
  }

  public async updateVolunteerStatus(id: string, status: VolunteerRecord["status"]): Promise<boolean> {
    const vol = this.volunteers.find((v) => v.id === id);
    if (vol) {
      vol.status = status;
      return true;
    }
    return false;
  }

  // Membership methods
  public async getMemberships(): Promise<MembershipRecord[]> {
    return [...this.memberships].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async createMembership(data: Partial<MembershipRecord>): Promise<MembershipRecord> {
    const id = `mem-${Date.now()}`;
    const num = `SSSS-${data.membershipType || "ANN"}-${Math.floor(1000 + Math.random() * 9000)}`;
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + (data.membershipType === "LIFE" ? 25 : 1));

    const record: MembershipRecord = {
      id,
      membershipNumber: num,
      fullName: data.fullName || "Member",
      fatherSpouseName: data.fatherSpouseName || "",
      email: data.email || "",
      phone: data.phone || "",
      bloodGroup: data.bloodGroup || "O+",
      occupation: data.occupation || "",
      fullAddress: data.fullAddress || "Prayagraj",
      membershipType: data.membershipType || "ANNUAL",
      paymentStatus: "SUCCESS",
      amountPaid: data.membershipType === "LIFE" ? 21000 : 1100,
      validFrom: new Date().toISOString(),
      validUntil: validUntil.toISOString(),
      status: "ACTIVE",
      qrCodeData: `https://sarvasamarpit.org/membership/card/${id}`,
      createdAt: new Date().toISOString(),
    };
    this.memberships.unshift(record);
    return record;
  }

  // Projects
  public async getProjects(): Promise<ProjectRecord[]> {
    return [...this.projects];
  }

  public async getProjectBySlug(slug: string): Promise<ProjectRecord | undefined> {
    return this.projects.find((p) => p.slug === slug);
  }

  // Events
  public async getEvents(): Promise<EventRecord[]> {
    return [...this.events];
  }

  public async getEventBySlug(slug: string): Promise<EventRecord | undefined> {
    return this.events.find((e) => e.slug === slug);
  }

  // Blogs
  public async getBlogs(): Promise<BlogRecord[]> {
    return [...this.blogs];
  }

  public async getBlogBySlug(slug: string): Promise<BlogRecord | undefined> {
    return this.blogs.find((b) => b.slug === slug);
  }

  // Settings & Overview Stats
  public async getStats() {
    const totalDonations = this.donations
      .filter((d) => d.paymentStatus === "SUCCESS")
      .reduce((sum, d) => sum + d.amount, 0);

    return {
      totalDonationAmount: totalDonations,
      totalDonationsCount: this.donations.filter((d) => d.paymentStatus === "SUCCESS").length,
      activeVolunteersCount: this.volunteers.filter((v) => v.status === "APPROVED").length,
      pendingVolunteersCount: this.volunteers.filter((v) => v.status === "PENDING").length,
      activeMembersCount: this.memberships.filter((m) => m.status === "ACTIVE").length,
      totalProjectsCount: this.projects.length,
      totalEventsCount: this.events.length,
      totalBlogsCount: this.blogs.length,
      mealsServed: this.settings.totalMealsServed || 485000,
      patientsTreated: this.settings.patientsTreated || 32400,
      googleRating: 4.9,
      googleReviewCount: 1420,
    };
  }

  public async getSettings() {
    return { ...this.settings };
  }

  public async updateSettings(newSettings: Record<string, any>) {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }

  // Contact Inquiries
  public async recordInquiry(inquiry: any) {
    const item = { id: `inq-${Date.now()}`, ...inquiry, createdAt: new Date().toISOString() };
    this.inquiries.unshift(item);
    return item;
  }

  public async getInquiries() {
    return [...this.inquiries];
  }
}

export const dbStore = AppDataStore.getInstance();
