// ============================================================================
// Sarva Samarpit Sewa Sansthan - Enterprise SEO, AEO & GEO Configuration
// Optimization for Google Search Console, AI Search Engines (Perplexity/ChatGPT/Gemini)
// and Geographic Search Indexing
// ============================================================================

import { ORG_DETAILS } from "./constants";

export const SEO_METADATA = {
  title: "Sarva Samarpit Sewa Sansthan | Official 80G Registered NGO Prayagraj",
  hindiTitle: "सर्व समर्पित सेवा संस्थान • प्रयागराज",
  description:
    "Sarva Samarpit Sewa Sansthan is an official 80G & 12A registered public charitable trust located at Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj. Providing 24-hour Annapurna Bhandara food distribution, free evening pathshala education, free health clinics, and winter blanket distribution.",
  siteUrl: "https://sarva-samarpit-sewa-sansthan.in",
  googleSearchConsoleVerification: "google-site-verification-ssss-2026-prayagraj",
  geo: {
    region: "IN-UP",
    placename: "Prayagraj",
    position: "25.4282562;81.8617551",
    icbm: "25.4282562, 81.8617551",
  },
};

/**
 * Generates comprehensive JSON-LD Schemas covering NGO, LocalBusiness, 80G Tax Status,
 * and FAQPage (AEO: Answer Engine Optimization for AI Search)
 */
export function generateComprehensiveJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["NGO", "LocalBusiness", "GovernmentPermit"],
      "@id": "https://sarva-samarpit-sewa-sansthan.in/#organization",
      "name": ORG_DETAILS.name,
      "alternateName": [ORG_DETAILS.hindiName, "SSSS Prayagraj", "Sarva Samarpit"],
      "url": "https://sarva-samarpit-sewa-sansthan.in",
      "logo": "https://sarva-samarpit-sewa-sansthan.in/logo.jpg",
      "image": "https://sarva-samarpit-sewa-sansthan.in/images/founder.jpg",
      "telephone": ORG_DETAILS.phone,
      "email": ORG_DETAILS.email,
      "foundingDate": "2018-04-14",
      "founder": {
        "@type": "Person",
        "name": "Pt. Harsh Tiwari",
        "jobTitle": "Founder & Chief Managing Trustee",
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shree Bade Hanuman Ji Temple, Sangam Marg",
        "addressLocality": "Prayagraj",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "211005",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.4282562,
        "longitude": 81.8617551,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "00:00",
          "closes": "23:59",
        },
      ],
      "taxID": ORG_DETAILS.panNumber,
      "nonprofitStatus": "Nonprofit501c3",
      "priceRange": "Free / Charitable Contributions",
      "sameAs": [
        "https://facebook.com/sarvasamarpitsewasansthan",
        "https://instagram.com/sarvasamarpit_prayagraj",
        "https://youtube.com/@sarvasamarpitsewa",
        "https://twitter.com/sarvasamarpit",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://sarva-samarpit-sewa-sansthan.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Sarva Samarpit Sewa Sansthan eligible for Section 80G Tax Exemption?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Donations made to Sarva Samarpit Sewa Sansthan are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. Donors receive an instant official Form 10BD compliant tax certificate with a digital QR code upon making a contribution.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is the head office of Sarva Samarpit Sewa Sansthan located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The central head office is situated at Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, Uttar Pradesh – 211005 (near Triveni Sangam). The Sansthan operates 24 hours daily (Akhand Sewa).",
          },
        },
        {
          "@type": "Question",
          "name": "How can I verify an authorized volunteer or employee identity card?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each authorized identity card issued by Sarva Samarpit Sewa Sansthan features a digital QR code and unique ID (e.g., SSSS-VOL-000001). Scanning the QR code directs to our official government-registered verification portal showing active credentials and authorization status.",
          },
        },
      ],
    },
  ];
}
