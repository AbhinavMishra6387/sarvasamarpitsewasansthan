import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { SeoSchema } from "@/components/common/SeoSchema";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sarvasamarpit.org"),
  title: {
    default: "Sarva Samarpit Sewa Sansthan | Registered NGO & Charitable Trust, Prayagraj",
    template: "%s | Sarva Samarpit Sewa Sansthan",
  },
  description:
    "Official portal of Sarva Samarpit Sewa Sansthan (Registered Charitable Trust / NGO, Prayagraj). Dedicated to 24/7 Annapurna Food Distribution, Free Medical Camps, Bade Hanuman Ji Temple Seva, and Riverbank Cleanliness at Triveni Sangam. 80G Tax Exemption available.",
  keywords: [
    "Sarva Samarpit Sewa Sansthan",
    "NGO Prayagraj",
    "Bade Hanuman Ji Temple Prayagraj",
    "Sangam Food Distribution",
    "Annapurna Bhandara Prayagraj",
    "Charitable Trust Allahabad",
    "80G Tax Exemption NGO",
    "Free Medical Camp Sangam",
    "Triveni Sangam Seva",
    "Volunteer in Prayagraj",
    "Donate Food Sangam",
    "Magh Mela Seva",
    "Mahakumbh Seva",
  ],
  authors: [{ name: "Sarva Samarpit Sewa Sansthan" }],
  creator: "Sarva Samarpit Sewa Sansthan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sarvasamarpit.org",
    siteName: "Sarva Samarpit Sewa Sansthan",
    title: "Sarva Samarpit Sewa Sansthan - 24/7 Seva & Annapurna Bhandara in Prayagraj",
    description:
      "Join us in selfless seva at Triveni Sangam. Support daily food distribution, free medical camps, and pilgrim care near Shree Bade Hanuman Ji Temple. 80G receipts issued instantly.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Sarva Samarpit Sewa Sansthan Seva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarva Samarpit Sewa Sansthan - Prayagraj NGO",
    description: "Daily Annapurna Food Distribution & Free Medical Camps at Triveni Sangam, Prayagraj. 80G Certified.",
    images: ["https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <SeoSchema />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-ngo-dark antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
