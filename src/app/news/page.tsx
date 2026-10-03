import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

export const metadata = {
  title: "News & Media Coverage | Sarva Samarpit Sewa Sansthan",
  description: "Official press releases, newspaper coverage, and media highlights of our seva in Prayagraj.",
};

const NEWS_ARTICLES = [
  {
    title: "Dainik Jagran: Sarva Samarpit Sewa Sansthan Expands Daily Bhandara Ahead of Magh Mela",
    date: "28 September 2026",
    source: "Dainik Jagran (Prayagraj Edition)",
    summary: "The charitable trust announced automated roti-making machines and insulated food trucks to cater to over 15,000 pilgrims daily along the Triveni Sangam banks.",
    link: "#",
  },
  {
    title: "Amar Ujala: Over 1,200 Elder Pilgrims Treated at Free Sunday Camp near Bade Hanuman Mandir",
    date: "14 September 2026",
    source: "Amar Ujala",
    summary: "Senior physicians and cardiologists from leading medical institutions volunteered their expertise, dispensing free medicines and vital diabetic screenings.",
    link: "#",
  },
  {
    title: "Hindustan: Swachh Sangam Campaign Collects 4 Tons of Plastic Waste Post Holy Snan",
    date: "02 September 2026",
    source: "Hindustan Samachar",
    summary: "Volunteers of Sarva Samarpit Sewa Sansthan led a massive 6-hour clean-up drive maintaining pristine conditions at the holy river confluence.",
    link: "#",
  },
];

export default function NewsPage() {
  return (
    <div>
      <PageHeader
        title="News &amp; Media Highlights"
        subtitle="Public reporting, press announcements, and media features highlighting our philanthropic work in Prayagraj."
        breadcrumbs={[{ label: "News" }]}
        badge="Press Room"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {NEWS_ARTICLES.map((article) => (
          <div
            key={article.title}
            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-soft hover:shadow-card transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-ngo-orange uppercase tracking-wider">{article.source}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.date}
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-gray-900 leading-snug">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {article.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
