import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sarva-samarpit-sewa-sansthan.in";

  const routes = [
    "",
    "/free-education",
    "/about",
    "/about/vision",
    "/about/mission",
    "/about/founder-message",
    "/about/trustees",
    "/about/executive-committee",
    "/about/team",
    "/projects",
    "/projects/food-distribution",
    "/projects/medical-camps",
    "/projects/religious-activities",
    "/projects/social-welfare",
    "/donate",
    "/volunteer",
    "/membership",
    "/membership/login",
    "/membership/renew",
    "/membership/verify",
    "/gallery",
    "/video-gallery",
    "/events",
    "/news",
    "/blogs",
    "/testimonials",
    "/csr-partnership",
    "/annual-reports",
    "/certificates",
    "/downloads",
    "/career",
    "/faq",
    "/contact",
    "/search",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/donate" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/donate" ? 0.9 : 0.8,
  }));
}
