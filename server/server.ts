import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { dbStore } from "../src/lib/db-storage";
import { ORG_DETAILS } from "../src/lib/constants";
import { createRazorpayOrder, verifyRazorpaySignature } from "../src/lib/razorpay";
import { generateUpiQrString, generatePhonePePayload } from "../src/lib/phonepe";
import { convertToCSV, formatDonationExport, formatVolunteerExport, formatMembershipExport } from "../src/lib/export-utils";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "ssss_prayagraj_jwt_secret_production_key_2026_9450858514";

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Security rate limiter & headers simulation
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

// Auth Middleware
function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// ==========================================
// 1. HEALTH & SYSTEM STATUS
// ==========================================
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    organization: ORG_DETAILS.name,
    headOffice: ORG_DETAILS.headOffice,
    helpline: ORG_DETAILS.phone,
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    memoryUsage: process.memoryUsage(),
    dbStatus: "connected",
  });
});

// ==========================================
// 2. AUTHENTICATION (JWT & RBAC)
// ==========================================
app.post("/api/v1/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = dbStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

// ==========================================
// 3. DONATIONS & PAYMENT GATEWAYS
// ==========================================
app.post("/api/v1/donations/create-order", async (req: Request, res: Response) => {
  try {
    const { donorName, donorEmail, donorPhone, amount, panNumber, address, campaignTitle, paymentGateway, isAnonymous, is80GClaimed } = req.body;
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount < 1) {
      return res.status(400).json({ error: "Valid donation amount required" });
    }

    const donation = await dbStore.createDonation({
      donorName: isAnonymous ? "Anonymous Devotee" : donorName,
      donorEmail,
      donorPhone,
      panNumber,
      address,
      amount: parsedAmount,
      campaignTitle,
      paymentGateway,
      isAnonymous,
      is80GClaimed,
      paymentStatus: "PENDING",
    });

    let gatewayData = {};
    if (paymentGateway === "RAZORPAY") {
      gatewayData = await createRazorpayOrder({ amount: parsedAmount, receipt: donation.receiptNo });
    } else if (paymentGateway === "PHONEPE") {
      gatewayData = generatePhonePePayload(parsedAmount, donation.id, donorPhone);
    } else if (paymentGateway === "UPI_QR") {
      gatewayData = {
        upiString: generateUpiQrString(parsedAmount, `Seva ${donation.receiptNo}`, donation.id),
        upiId: ORG_DETAILS.upiId,
      };
    }

    res.json({ success: true, donation, gatewayData });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/v1/donations/verify", async (req: Request, res: Response) => {
  const { donationId, paymentId, orderId, signature, gateway } = req.body;
  const donation = dbStore.donations.find((d) => d.id === donationId);
  if (!donation) return res.status(404).json({ error: "Donation not found" });

  if (gateway === "RAZORPAY" && signature) {
    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    if (!isValid) return res.status(400).json({ error: "Signature verification failed" });
  }

  donation.paymentStatus = "SUCCESS";
  donation.transactionId = paymentId || `TXN-${Date.now()}`;
  res.json({ success: true, donation, receiptUrl: `/api/donations/receipt/${donation.id}` });
});

app.get("/api/v1/donations", authenticateToken, async (req: Request, res: Response) => {
  const donations = await dbStore.getDonations();
  res.json({ success: true, count: donations.length, donations });
});

// ==========================================
// 4. VOLUNTEERS
// ==========================================
app.post("/api/v1/volunteers", async (req: Request, res: Response) => {
  const volunteer = await dbStore.createVolunteer(req.body);
  res.json({ success: true, volunteer });
});

app.get("/api/v1/volunteers", authenticateToken, async (req: Request, res: Response) => {
  const volunteers = await dbStore.getVolunteers();
  res.json({ success: true, count: volunteers.length, volunteers });
});

app.patch("/api/v1/volunteers/:id/status", authenticateToken, async (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = await dbStore.updateVolunteerStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: "Volunteer not found" });
  res.json({ success: true, message: `Volunteer status updated to ${status}` });
});

// ==========================================
// 5. MEMBERSHIPS
// ==========================================
app.post("/api/v1/memberships", async (req: Request, res: Response) => {
  const membership = await dbStore.createMembership(req.body);
  res.json({ success: true, membership });
});

app.get("/api/v1/memberships", authenticateToken, async (req: Request, res: Response) => {
  const memberships = await dbStore.getMemberships();
  res.json({ success: true, count: memberships.length, memberships });
});

// ==========================================
// 6. GLOBAL SEARCH (Blogs, Projects, Events, Team)
// ==========================================
app.get("/api/v1/search", async (req: Request, res: Response) => {
  const q = String(req.query.q || "").toLowerCase().trim();
  if (!q) return res.json({ results: [] });

  const projects = (await dbStore.getProjects()).filter(
    (p) => p.title.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q)
  ).map((p) => ({ type: "Project", title: p.title, url: `/projects/${p.slug}`, desc: p.shortDesc }));

  const blogs = (await dbStore.getBlogs()).filter(
    (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
  ).map((b) => ({ type: "Blog", title: b.title, url: `/blogs/${b.slug}`, desc: b.excerpt }));

  const events = (await dbStore.getEvents()).filter(
    (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  ).map((e) => ({ type: "Event", title: e.title, url: "/events", desc: e.description }));

  res.json({
    query: q,
    count: projects.length + blogs.length + events.length,
    results: [...projects, ...blogs, ...events],
  });
});

// ==========================================
// 7. EXPORT DATA (CSV & JSON BACKUPS)
// ==========================================
app.get("/api/v1/export/:type", authenticateToken, async (req: Request, res: Response) => {
  const type = req.params.type;
  if (type === "donations") {
    const csv = convertToCSV(formatDonationExport(await dbStore.getDonations()));
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="donations-${Date.now()}.csv"`);
    return res.send(csv);
  }
  if (type === "volunteers") {
    const csv = convertToCSV(formatVolunteerExport(await dbStore.getVolunteers()));
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="volunteers-${Date.now()}.csv"`);
    return res.send(csv);
  }
  if (type === "memberships") {
    const csv = convertToCSV(formatMembershipExport(await dbStore.getMemberships()));
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="memberships-${Date.now()}.csv"`);
    return res.send(csv);
  }
  if (type === "backup") {
    return res.json({
      exportedAt: new Date().toISOString(),
      organization: ORG_DETAILS,
      donations: await dbStore.getDonations(),
      volunteers: await dbStore.getVolunteers(),
      memberships: await dbStore.getMemberships(),
      projects: await dbStore.getProjects(),
      events: await dbStore.getEvents(),
      blogs: await dbStore.getBlogs(),
      settings: await dbStore.getSettings(),
    });
  }
  res.status(400).json({ error: "Invalid export type" });
});

// Start Server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[SSSS Production Express Backend] Running on http://localhost:${PORT}`);
    console.log(`[Head Office] Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj`);
    console.log(`[Helpline] 09450858514 (24 Hours Open)`);
  });
}

export default app;
