import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Sarva Samarpit Sewa Sansthan production database...");

  // 1. Super Admin
  const passwordHash = await bcrypt.hash("Admin@SSSS2026!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sarvasamarpit.org" },
    update: {},
    create: {
      email: "admin@sarvasamarpit.org",
      name: "Sansthan Super Admin",
      phone: "09450858514",
      role: "SUPER_ADMIN",
      passwordHash,
      isActive: true,
    },
  });

  // 2. Initial Projects
  const foodProject = await prisma.project.upsert({
    where: { slug: "food-distribution" },
    update: {},
    create: {
      slug: "food-distribution",
      title: "Annapurna Mahaprasad & Daily Food Distribution",
      shortDesc: "Serving hygienic, freshly cooked warm meals 365 days a year to pilgrims, sadhus, and destitute families at Triveni Sangam.",
      fullDesc: "Operating 24/7 near Shree Bade Hanuman Ji Temple, over 1,500 wholesome meals are prepared and distributed daily in eco-friendly pattals.",
      category: "FOOD_DISTRIBUTION",
      featuredImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
      galleryImages: ["https://images.unsplash.com/photo-1593113598332-cd288d649433"],
      targetAmount: 1000000,
      raisedAmount: 745000,
      donorsCount: 820,
      status: "ONGOING",
      location: "Sangam Marg, Bade Hanuman Mandir Complex, Prayagraj",
    },
  });

  // 3. Initial Event
  await prisma.event.upsert({
    where: { slug: "magh-mela-mega-langar-seva" },
    update: {},
    create: {
      slug: "magh-mela-mega-langar-seva",
      title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
      description: "A 45-day continuous non-stop food distribution and round-the-clock shelter tent setup at Sangam Ghat.",
      bannerImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
      location: "Sector 3, Sangam Ghat, Prayagraj",
      eventDate: new Date("2026-11-15T06:00:00Z"),
      isUpcoming: true,
      maxAttendees: 2000,
      registeredCount: 840,
    },
  });

  console.log("Seeding completed successfully! Super Admin: admin@sarvasamarpit.org");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
