import React from "react";
import { Star, MessageCircle, ExternalLink, CheckCircle } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

const REVIEWS = [
  {
    name: "Acharya Ramendra Shastri",
    role: "Senior Priest & Pilgrim",
    rating: 5,
    date: "1 week ago",
    text: "Sarva Samarpit Sewa Sansthan's Bhandara near Bade Hanuman Ji Temple is exemplary. The food is sattvic, piping hot, and served with utmost humility to thousands daily. Truly devoted souls.",
  },
  {
    name: "Dr. Alok Nath Tripathi",
    role: "Visiting Cardiologist",
    rating: 5,
    date: "2 weeks ago",
    text: "I volunteered at their Sunday Triveni Sangam free health clinic. Their organization, medicine inventory, and genuine care for destitute patients who cannot afford basic care is commendable.",
  },
  {
    name: "Mrs. Vandana Agarwal",
    role: "Regular Donor (Kanpur)",
    rating: 5,
    date: "3 weeks ago",
    text: "Transparent donation system with instant 80G tax receipt on WhatsApp and email. Received full updates of food distribution done in the memory of my late father at Triveni Sangam.",
  },
];

export function GoogleReviewsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50/40 border-y border-orange-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-white px-3 py-1 rounded-full border border-orange-200 shadow-sm">
                Google Business Profile
              </span>
              <span className="text-xs text-gray-500 font-medium">Verified NGO on Google Maps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ngo-dark">
              What Devotees &amp; Donors Say About Us
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white p-5 rounded-2xl shadow-soft border border-orange-200 flex items-center gap-5 shrink-0">
            <div className="text-center">
              <span className="text-4xl font-heading font-black text-ngo-dark">4.9</span>
              <div className="flex text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 mt-0.5 block">1,420+ Reviews</span>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>100% Genuine Seva</span>
              </div>
              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-ngo-orange hover:text-ngo-orange-700 flex items-center gap-1"
              >
                <span>Write a Google Review</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ngo-orange-500 to-amber-400 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
