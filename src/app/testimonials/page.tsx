import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Star, Quote, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Testimonials & Devotee Experiences | Sarva Samarpit Sewa Sansthan",
  description: "Read inspiring stories and reviews from donors, volunteers, and beneficiaries of Sarva Samarpit Sewa Sansthan.",
};

const TESTIMONIALS = [
  {
    name: "Mahant Ramdas Ji",
    location: "Ayodhya Dham",
    quote: "During Magh Mela, when biting winter nights made survival painful for hundreds of sadhus on Sangam sands, Sarva Samarpit Sewa Sansthan arrived with warm blankets and hot kheer every night without failure.",
    rating: 5,
  },
  {
    name: "Smt. Shashi Prabha Saxena",
    location: "Prayagraj",
    quote: "My 78-year-old mother received immediate medical treatment and free cardiovascular medicines at their clinic near Bade Hanuman Temple. The volunteer doctors treated her with the affection of own family.",
    rating: 5,
  },
  {
    name: "Vikramaditya Singhal",
    location: "New Delhi (Donor)",
    quote: "I have been sponsoring monthly Bhandaras for 2 years now. The transparency is outstanding—instant 80G tax receipt issued, and photos sent via WhatsApp. Best charitable trust in Uttar Pradesh.",
    rating: 5,
  },
  {
    name: "Komal Pandey",
    location: "Student & Volunteer",
    quote: "Volunteering with the Annapurna kitchen taught me what genuine selfless seva means. Seeing the smile on elderly devotees receiving warm food is the most fulfilling feeling in the world.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div>
      <PageHeader
        title="Testimonials &amp; Voices of Seva"
        subtitle="Reflections of grace, gratitude, and healing from pilgrims, donors, and volunteer sevadars across India."
        breadcrumbs={[{ label: "Testimonials" }]}
        badge="Devotee Feedback"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-200" />
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-gray-900 text-base">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
