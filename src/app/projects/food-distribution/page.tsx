import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { DonationForm } from "@/components/donation/DonationForm";
import { Utensils, CheckCircle2, Clock, Users, ShieldCheck } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Annapurna Food Distribution (Bhandara) | Sarva Samarpit Sewa Sansthan",
  description: "24/7 continuous hot meal distribution for pilgrims, sadhus, and destitute at Triveni Sangam, Prayagraj.",
};

export default function FoodDistributionPage() {
  return (
    <div>
      <PageHeader
        title="Annapurna Food Distribution Seva"
        subtitle="Unbroken, round-the-clock free meals served with utmost devotion at Triveni Sangam and Shree Bade Hanuman Ji Temple, Prayagraj."
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Food Distribution" }]}
        badge="365-Day Daily Langar"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-lg overflow-hidden shadow-xs border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200"
                alt="Annapurna Bhandara Preparation"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-ngo-dark">
                The Sacred Tradition of Annadanam at Prayagraj
              </h2>
              <p>
                In the holy confluence of Ganga, Yamuna, and Saraswati, thousands of pilgrims, sadhus, and impoverished families congregate daily. For many traveling from distant villages, securing even one hot meal is an insurmountable hardship.
              </p>
              <p>
                Operating 24 hours a day adjacent to <strong>Shree Bade Hanuman Ji Temple</strong>, the central kitchen of <em>Sarva Samarpit Sewa Sansthan</em> prepares and distributes over <strong>1,500 wholesome, sattvic meals every single day</strong>—surging to more than 10,000 daily during the historic Magh Mela and Kumbh Mela periods.
              </p>

              <div className="bg-orange-50/70 p-6 rounded-lg border border-orange-200 my-6 space-y-3">
                <h3 className="font-heading font-bold text-lg text-ngo-dark">
                  What Goes Into Every Meal:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pure Desi Ghee &amp; Mustard Oil Cooking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nutritious Yellow Arhar &amp; Moong Dal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fresh Seasonal Vegetables (Sabzi)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fresh Whole Wheat Rotis &amp; Steamed Rice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sweet Kheer / Halwa Prasad Offering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Eco-Friendly Biodegradable Pattals</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-heading font-bold text-ngo-dark">
                Sponsor a Day’s Bhandara in Memory or on Auspicious Occasions
              </h3>
              <p>
                Many donors sponsor a day&apos;s meals on birthdays, marriage anniversaries, or in reverence of their departed ancestors (*Shraadh Seva*). When you sponsor, our team recites prayers on behalf of your family during the prasad bhog.
              </p>
            </div>
          </div>

          {/* Dedicated Donation Form */}
          <div className="lg:col-span-5 sticky top-28">
            <DonationForm initialCause="Daily Annapurna Bhandara (Sangam Food Seva)" />
          </div>
        </div>
      </div>
    </div>
  );
}
