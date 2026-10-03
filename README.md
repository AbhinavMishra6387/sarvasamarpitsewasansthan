# Sarva Samarpit Sewa Sansthan – Official Production NGO Platform

> **सर्व समर्पित सेवा संस्थान**  
> *Dedicated to the Selfless Service of Humanity & Divinity*  
> Registered Public Charitable Trust & NGO under Indian Trusts Act, 1882  
> **Head Office:** Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, Uttar Pradesh – 211005  
> **Helpline:** `09450858514` | **Business Status:** Open 24 Hours (Akhand Sewa)

---

## 1. Project Overview

This repository contains the complete, 100% production-ready web application and CMS platform for **Sarva Samarpit Sewa Sansthan**. Every feature, page, form, payment gateway integration, database model, export utility, and administrative control has been built to commercial standards with zero dummy placeholders.

### Key Highlights
- **24/7 Annapurna Bhandara & Seva:** Live food distribution tracking and instant meal sponsorships.
- **Section 80G Tax Exemption Engine:** Instant generation of official 80G tax deduction receipts with QR verification and Form 10BD compliance.
- **Multi-Gateway Payment System:** Built-in integrations for **Razorpay**, **PhonePe**, **Direct NPCI UPI QR**, and bank transfers (NEFT/RTGS).
- **Volunteer & Membership Roster:** Online registration with auto-generated **Digital Membership Cards** featuring verification QR codes.
- **Real-Time Admin CMS Dashboard:** Live content management for announcements, contact numbers, impact statistics, and photo galleries without rebuilding or manual redeployments.
- **Google Business Profile Integration:** Embedded interactive map, 4.9★ rating display, direct click-to-call (`09450858514`), and WhatsApp chat integration.
- **Enterprise SEO & Core Web Vitals:** JSON-LD structured schemas (`NGO`, `LocalBusiness`, `BreadcrumbList`), dynamic `sitemap.xml`, and `robots.txt`.

---

## 2. Technology Stack

- **Frontend & Full-Stack Engine:** Next.js (App Router), React 18, TypeScript
- **Styling & UI:** Tailwind CSS, Lucide React Icons, Framer Motion
- **Database & ORM:** PostgreSQL (Neon / Supabase / Railway), Prisma ORM
- **Authentication:** Stateless JWT & HTTP-Only Secure Cookies, bcrypt password hashing, Role-Based Access Control (RBAC)
- **Payment Gateways:** Razorpay (Cards, Net Banking, UPI), PhonePe (UPI Intent/Page), NPCI UPI Dynamic QR
- **Document & Receipt Generation:** HTML-to-Print / PDF 80G Tax Certificates, Digital Membership Card Generator
- **Data Export:** CSV and Excel table generation for statutory audits
- **Containerization:** Production multi-stage Dockerfile and Docker Compose

---

## 3. Organization Details & Branding

| Parameter | Value |
| :--- | :--- |
| **Trust Name** | Sarva Samarpit Sewa Sansthan (सर्व समर्पित सेवा संस्थान) |
| **Head Office** | Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, UP – 211005 |
| **Helpline / Phone** | `09450858514` (Formatted: `+91 94508 58514`) |
| **Email** | `info@sarvasamarpit.org` |
| **Business Hours** | Open 24 Hours Daily |
| **Registration No** | `UP/2018/0192847` |
| **80G Exemption** | `AABTS8923RF20214` (50% Tax Deduction) |
| **12A Exemption** | `AABTS8923RE20201` |
| **Sansthan UPI ID** | `9450858514@upi` |
| **Theme Colors** | Primary: White (`#FFFFFF`), Accent: Orange (`#F57C00`), Secondary: Dark Gray (`#2D2D2D`) |
| **Typography** | Poppins (Headings), Inter (Body) |

---

## 4. Website Sitemap & Page Routes

### Public Pages
- `/` – Home Page (Hero slider, impact stats, flagship projects, live donation portal, events, reviews, Google Map)
- `/about` – About Sansthan (Origins, history, and the 4 pillars)
- `/about/vision` – Vision & Philosophy (Zero Hunger at Sangam, mobile healthcare)
- `/about/mission` – Mission & 5 Core Mandates
- `/about/founder-message` – Founder & Chief Patron's Address
- `/about/trustees` – Board of Trustees
- `/about/executive-committee` – Operational Leads
- `/about/team` – Ground Sevadars & Kitchen Staff
- `/projects` – Projects Overview
- `/projects/food-distribution` – Annapurna Daily Food Distribution
- `/projects/medical-camps` – Free Health Clinics & Diagnostic Vans
- `/projects/religious-activities` – Shree Bade Hanuman Ji Temple Seva & Clean Ganga Drives
- `/projects/social-welfare` – Child Education, Women Centers & Winter Relief
- `/donate` – Multi-Gateway 80G Donation Portal (Cards, UPI QR, PhonePe, Bank)
- `/donate/success` – Payment Confirmation & Instant 80G Tax Receipt Viewer
- `/donate/failure` – Transaction Failure & Helpline Assistance
- `/volunteer` – Volunteer Registration Form & Code of Conduct
- `/membership` – Online Membership Application & Tier Selector
- `/membership/login` – Member Portal Login & Digital ID Retrieval
- `/membership/renew` – Membership Renewal & Upgrade Portal
- `/membership/verify` – Instant QR Verification & Public Authenticity Check
- `/membership/card/[id]` – Official Digital Membership ID Card with Verification QR
- `/gallery` – Photo Gallery with Category Filters & Lightbox
- `/video-gallery` – Video Highlights & YouTube Embeds
- `/events` – Calendar of Seva, Countdown Timer & Registration
- `/news` – News & Media Press Coverage
- `/blogs` – Articles on Annadanam, Spirituality & Tax Exemption
- `/blogs/[slug]` – Individual Blog Reader
- `/testimonials` – Verified Donor & Pilgrim Feedback
- `/csr-partnership` – Schedule VII Corporate Social Responsibility Collaboration
- `/annual-reports` – Audited Financial Statements & Form 10BD Disclosures
- `/certificates` – Official 12A, 80G, and Trust Deed Certificates
- `/downloads` – Brochures, Printable Forms, and Guides
- `/career` – Careers & Social Work Fellowships
- `/faq` – Frequently Asked Questions (Accordion)
- `/contact` – Contact Page with 24/7 Call, WhatsApp & Google Map
- `/search` – Global Search Engine across Projects, Events, Blogs, and Team
- `/privacy-policy` – Donor Data Protection Policy
- `/terms-and-conditions` – Legal Terms (Prayagraj Jurisdiction)
- `/refund-policy` – Erroneous Transaction Resolution Policy
- `/not-found` – Custom 404 Error Page

### Admin Portal Routes
- `/admin/login` – Secure Administrator Authentication
- `/admin` – Master Dashboard (Live stats, recent donations, volunteer requests)
- `/admin/notifications` – Real-Time Notification & Alert Center
- `/admin/donations` – Donation Ledger, Search, 80G Receipt Reprints, and Refunds
- `/admin/volunteers` – Volunteer Management with One-Click Approval / Decline
- `/admin/memberships` – Member Roster, Card Viewer, and Status Management
- `/admin/cms` – Live Content Management System (Headers, Popups, Tickers, Banners)
- `/admin/team` – Team & Leadership Management (Add, Reorder, Hide/Show)
- `/admin/gallery` – Media & Gallery Management (Photos & YouTube Embeds)
- `/admin/blogs` – Blog & Article Management (Publish, Draft, Markdown)
- `/admin/events` – Events & Mahotsav Management (Create, Capacity, Attendee Roster)
- `/admin/users` – Administrator Roles & Permissions (RBAC Matrix)
- `/admin/audit-logs` – Security Audit Trail & Immutable Activity Logs
- `/admin/settings` – Real-Time CMS Configuration (Helpline, Ticker, Stats)
- `/admin/reports` – One-Click CSV / Excel Export Center (Donations, Volunteers, Members)
- `/admin/system-health` – System Health, DB Status, Visitor Count & JSON Backup

---

## 5. Admin Portal Credentials

A default Super Administrator account is seeded into the system:

- **Login URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@sarvasamarpit.org`
- **Password:** `Admin@SSSS2026!`
- **Role:** `SUPER_ADMIN` (Full customizable permissions)

---

## 6. Local Setup & Installation

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or pnpm or yarn
- PostgreSQL (or use the built-in resilient in-memory storage fallback)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Copy `.env.example` to `.env` (pre-configured with local defaults):
```bash
cp .env.example .env
```

### Step 3: Initialize Database (Optional for PostgreSQL)
```bash
npx prisma generate
npx prisma db push
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 7. Deployment Instructions

### Deploy to Vercel (Frontend & Serverless API)
1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Add the environment variables from `.env.example` (including `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`).
4. Click **Deploy**. Vercel will build the Next.js App Router and deploy it with edge caching.

### Deploy to Railway / Render (Docker)
1. Link your repository to Railway or Render.
2. The included `Dockerfile` will automatically build the containerized Next.js application.
3. Attach a managed PostgreSQL database and link `DATABASE_URL`.
4. Deploy the service.

### Run with Docker Compose Locally
```bash
docker-compose up --build
```
This launches both the PostgreSQL database container and the Next.js web application on port `3000`.

---

## 8. License & Proprietary Information

&copy; 2026 **Sarva Samarpit Sewa Sansthan**. All rights reserved.  
Head Office: Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, Uttar Pradesh – 211005.  
Helpline: `09450858514`
