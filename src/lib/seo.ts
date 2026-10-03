import { ORG_DETAILS } from "./constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "LocalBusiness", "GovernmentPermit"],
    "name": ORG_DETAILS.name,
    "alternateName": ORG_DETAILS.hindiName,
    "description": "Sarva Samarpit Sewa Sansthan is a registered charitable trust in Prayagraj providing 24-hour food distribution (Annapurna Bhandara), free health camps, Triveni Sangam cleanliness drives, and pilgrimage assistance near Shree Bade Hanuman Ji Temple.",
    "url": "https://sarvasamarpit.org",
    "logo": "https://sarvasamarpit.org/images/logo.png",
    "image": "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    "telephone": ORG_DETAILS.phone,
    "email": ORG_DETAILS.email,
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
    "priceRange": "Free / Charitable Contributions",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1420",
    },
    "sameAs": [
      ORG_DETAILS.socialMedia.facebook,
      ORG_DETAILS.socialMedia.instagram,
      ORG_DETAILS.socialMedia.youtube,
      ORG_DETAILS.socialMedia.twitter,
      ORG_DETAILS.googleBusinessUrl,
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
