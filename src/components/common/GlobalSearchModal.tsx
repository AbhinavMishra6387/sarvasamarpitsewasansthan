"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Heart, Calendar, BookOpen, Layers } from "lucide-react";

interface SearchResult {
  type: string;
  title: string;
  url: string;
  desc: string;
}

const STATIC_SEARCH_INDEX: SearchResult[] = [
  {
    type: "Project",
    title: "Annapurna Mahaprasad & Daily Food Distribution",
    url: "/projects/food-distribution",
    desc: "Serving hygienic, freshly cooked warm meals 365 days a year to pilgrims, sadhus, and destitute families at Triveni Sangam.",
  },
  {
    type: "Project",
    title: "Free Healthcare Clinics & Diagnostic Camps",
    url: "/projects/medical-camps",
    desc: "Providing free specialized physician consultations, diagnostic blood tests, and vital medicines to disadvantaged pilgrims.",
  },
  {
    type: "Project",
    title: "Shree Bade Hanuman Ji Seva & Sangam Cleanliness Drive",
    url: "/projects/religious-activities",
    desc: "Spiritual welfare, akhand sankirtan, pilgrim guidance, and holy riverbank cleanliness campaigns at Bade Hanuman Ji Temple.",
  },
  {
    type: "Project",
    title: "Child Education, Women Skill Centers & Winter Seva",
    url: "/projects/social-welfare",
    desc: "Empowering slum children with books, tuition, school uniforms, and distributing thousands of winter blankets.",
  },
  {
    type: "Event",
    title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
    url: "/events",
    desc: "A 45-day continuous non-stop food distribution and round-the-clock shelter tent setup at Sector 3, Sangam Ghat.",
  },
  {
    type: "Event",
    title: "Shree Bade Hanuman Jayanti Mahotsav & Free Health Camp",
    url: "/events",
    desc: "Grand abhishek, 108 Sundarkand paath recitations, mega blood donation drive at Bade Hanuman Mandir Hall.",
  },
  {
    type: "Blog",
    title: "The Sacred Significance of Annadanam at Triveni Sangam",
    url: "/blogs/sacred-significance-of-annadanam-at-triveni-sangam",
    desc: "Why feeding every soul matters in the holy city of Prayagraj. Spiritual philosophy and traditions.",
  },
  {
    type: "Blog",
    title: "Healing with Compassion: How Volunteer Doctors Bring Hope",
    url: "/blogs/holistic-healthcare-for-underprivileged-pilgrims",
    desc: "Inside our free weekend medical camps, diagnostic vans, and distribution of life-saving medicines.",
  },
  {
    type: "Blog",
    title: "Maximizing Impact: A Guide to 80G Tax Exemption for Donors",
    url: "/blogs/understanding-80g-tax-benefits-for-charitable-donations",
    desc: "Learn how your donation grants you a 50% income tax deduction under Section 80G.",
  },
  {
    type: "Seva Portal",
    title: "Online 80G Donation & Meal Sponsorship Portal",
    url: "/donate",
    desc: "Contribute securely via Razorpay, PhonePe, UPI QR, and direct bank transfers with instant 80G receipts.",
  },
  {
    type: "Participation",
    title: "Join as a Sevadar (Volunteer Registration)",
    url: "/volunteer",
    desc: "Apply to dedicate your time and skills at Triveni Sangam and Shree Bade Hanuman Ji Temple.",
  },
  {
    type: "Identity",
    title: "Apply for Official Digital Membership Card",
    url: "/membership",
    desc: "Receive an authentic Sansthan digital membership card with encrypted QR verification.",
  },
];

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = STATIC_SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-ngo-orange shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, bhandara seva, blogs, events, 80G tax rules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base focus:outline-none text-gray-900"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {query.trim() === "" ? (
            <div className="text-center py-8 text-gray-400 text-xs sm:text-sm">
              <p>Type keywords like <span className="text-ngo-orange font-bold">&quot;bhandara&quot;</span>, <span className="text-ngo-orange font-bold">&quot;medical&quot;</span>, <span className="text-ngo-orange font-bold">&quot;80G&quot;</span>, or <span className="text-ngo-orange font-bold">&quot;hanuman ji&quot;</span></p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs sm:text-sm">
              No direct matches found for &ldquo;{query}&rdquo;. Try another seva keyword.
            </div>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                href={r.url}
                onClick={onClose}
                className="block p-4 rounded-lg border border-gray-100 hover:border-ngo-orange hover:bg-orange-50/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-ngo-orange uppercase tracking-wider bg-orange-100/70 px-2 py-0.5 rounded-md">
                    {r.type}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-ngo-orange group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-gray-900 mt-1.5 group-hover:text-ngo-orange transition-colors">
                  {r.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {r.desc}
                </p>
              </Link>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Sarva Samarpit Sewa Sansthan &bull; Global Search Engine
        </div>
      </div>
    </div>
  );
}
