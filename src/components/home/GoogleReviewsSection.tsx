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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50/50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium tracking-wide text-stone-800 bg-white px-3 py-1 rounded-md border border-stone-200 shadow-xs">
                Google Business Profile
              </span>
              <span className="text-xs text-stone-500 font-normal">Verified NGO on Google Maps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
              What Devotees &amp; Donors Say About Us
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white p-5 rounded-lg shadow-xs border border-stone-200 flex items-center gap-5 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-heading font-bold text-stone-900">4.9</span>
              <div className="flex text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-stone-500 mt-0.5 block">1,420+ Reviews</span>
            </div>
            <div className="h-10 w-px bg-stone-200" />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-stone-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Seva</span>
              </div>
              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-stone-700 hover:text-orange-700 flex items-center gap-1"
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
              className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs hover:border-stone-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-stone-900 text-white font-medium flex items-center justify-center text-xs shadow-xs">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-stone-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
