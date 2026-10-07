"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { Search, ArrowRight, BookOpen, Calendar, Heart, Users, Camera, Filter } from "lucide-react";

const INDEX_DATA = [
  {
    type: "Projects",
    title: "Annapurna Mahaprasad & Daily Food Distribution",
    url: "/projects/food-distribution",
    desc: "Serving hygienic, freshly cooked warm meals 365 days a year to pilgrims, sadhus, and destitute families at Triveni Sangam.",
  },
  {
    type: "Projects",
    title: "Free Healthcare Clinics & Diagnostic Camps",
    url: "/projects/medical-camps",
    desc: "Providing free specialized physician consultations, diagnostic blood tests, and vital medicines to disadvantaged pilgrims.",
  },
  {
    type: "Projects",
    title: "Shree Bade Hanuman Ji Seva & Sangam Cleanliness Drive",
    url: "/projects/religious-activities",
    desc: "Spiritual welfare, akhand sankirtan, pilgrim guidance, and holy riverbank cleanliness campaigns at Bade Hanuman Ji Temple.",
  },
  {
    type: "Projects",
    title: "Child Education, Women Skill Centers & Winter Seva",
    url: "/projects/social-welfare",
    desc: "Empowering slum children with books, tuition, school uniforms, and distributing thousands of winter blankets.",
  },
  {
    type: "Blogs",
    title: "The Sacred Significance of Annadanam at Triveni Sangam",
    url: "/blogs/sacred-significance-of-annadanam-at-triveni-sangam",
    desc: "Why feeding every soul matters in the holy city of Prayagraj. Spiritual philosophy and traditions.",
  },
  {
    type: "Blogs",
    title: "Healing with Compassion: How Volunteer Doctors Bring Hope",
    url: "/blogs/holistic-healthcare-for-underprivileged-pilgrims",
    desc: "Inside our free weekend medical camps, diagnostic vans, and distribution of life-saving medicines.",
  },
  {
    type: "Blogs",
    title: "Maximizing Impact: A Guide to 80G Tax Exemption for Donors",
    url: "/blogs/understanding-80g-tax-benefits-for-charitable-donations",
    desc: "Learn how your donation grants you a 50% income tax deduction under Section 80G.",
  },
  {
    type: "Events",
    title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
    url: "/events",
    desc: "A 45-day continuous non-stop food distribution and round-the-clock shelter tent setup at Sector 3, Sangam Ghat.",
  },
  {
    type: "Events",
    title: "Shree Bade Hanuman Jayanti Mahotsav & Free Health Camp",
    url: "/events",
    desc: "Grand abhishek, 108 Sundarkand paath recitations, mega blood donation drive at Bade Hanuman Mandir Hall.",
  },
  {
    type: "Team",
    title: "Board of Trustees & Leadership Roster",
    url: "/about/trustees",
    desc: "Meet the honorable trustees, financial advisors, and spiritual patrons guiding Sansthan governance.",
  },
  {
    type: "Gallery",
    title: "Sangam Seva & Daily Bhandara Photo Archives",
    url: "/gallery",
    desc: "Browse high-resolution photographs of daily langar, river cleanliness drives, and holy aartis.",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [filterType, setFilterType] = useState("ALL");
  const [results, setResults] = useState(INDEX_DATA);

  useEffect(() => {
    let matches = INDEX_DATA;
    if (query.trim()) {
      const q = query.toLowerCase();
      matches = matches.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
      );
    }
    if (filterType !== "ALL") {
      matches = matches.filter((item) => item.type === filterType);
    }
    setResults(matches);
  }, [query, filterType]);

  const categories = ["ALL", "Projects", "Blogs", "Events", "Team", "Gallery"];

  return (
    <div>
      <PageHeader
        title="Sansthan Global Search Engine"
        subtitle="Search across all seva initiatives, blogs, religious events, photo archives, and donation options."
        breadcrumbs={[{ label: "Search" }]}
        badge="Instant Discovery"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-xs flex items-center gap-3">
          <Search className="w-5 h-5 text-ngo-orange shrink-0" />
          <input
            type="text"
            placeholder="Search keywords: bhandara, 80G tax, medical camp, hanuman ji..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base focus:outline-none text-gray-900"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterType(c)}
              className={`px-4 py-2 rounded-md transition-all ${
                filterType === c
                  ? "bg-ngo-orange text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-xs text-gray-500 font-semibold">
            Showing {results.length} result(s) {query ? `for "${query}"` : ""}
          </p>

          {results.length === 0 ? (
            <div className="bg-white p-12 rounded-lg border border-gray-200 text-center text-gray-500 space-y-2">
              <p className="text-base font-bold">No results found.</p>
              <p className="text-xs">Try broader keywords or reset the category filter.</p>
            </div>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                href={r.url}
                className="block p-6 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs hover:border-ngo-orange transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-ngo-orange uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-md">
                    {r.type}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-ngo-orange group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 mt-2 group-hover:text-ngo-orange transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  {r.desc}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
