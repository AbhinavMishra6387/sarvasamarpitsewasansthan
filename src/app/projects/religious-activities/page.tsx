import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DonationForm } from "@/components/donation/DonationForm";
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Shree Bade Hanuman Ji Seva & Religious Activities | Sarva Samarpit Sewa Sansthan",
  description: "Devotional seva, pilgrim guidance, and holy riverbank cleanliness campaigns at Shree Bade Hanuman Ji Temple, Prayagraj.",
};

export default function ReligiousActivitiesPage() {
  return (
    <div>
      <PageHeader
        title="Shree Bade Hanuman Ji Seva &amp; Sangam Cleanliness"
        subtitle="Serving pilgrims at the iconic reclining Hanuman Ji Temple, managing akhand prasad, and maintaining river purity."
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Religious Activities" }]}
        badge="Spiritual & Ecological Seva"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-lg overflow-hidden shadow-xs border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=1200"
                alt="Shree Bade Hanuman Ji Temple Sangam Seva"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-ngo-dark">
                The Heritage of Bandh Wale Hanuman Ji
              </h2>
              <p>
                The subterranean temple of <strong>Shree Bade Hanuman Ji</strong> on Sangam Marg is world-renowned for housing the only reclining idol of Lord Hanuman, submerged annually by Mother Ganga during the monsoons. Millions of devotees converge here annually seeking protection, vigor, and divine grace.
              </p>
              <p>
                The volunteers of <em>Sarva Samarpit Sewa Sansthan</em> provide round-the-clock support at the temple premises:
              </p>

              <div className="bg-orange-50/60 p-6 rounded-lg border border-orange-100 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Elderly &amp; Divyang Darshan Assistance</h4>
                    <p className="text-xs text-gray-600">Wheelchairs, walking aids, and volunteer escorts ensuring smooth darshan without stampede or distress.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Swachh Sangam - Nirmal Ganga Clean-Up Drives</h4>
                    <p className="text-xs text-gray-600">Weekly volunteer drives clearing non-biodegradable waste, used cloths, and discarded plastic along the Triveni bank.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Pure Drinking Water (Jal Seva)</h4>
                    <p className="text-xs text-gray-600">Free cold RO drinking water distribution points serving parched devotees during scorching summer months.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <DonationForm initialCause="Shree Bade Hanuman Ji Akhand Seva" />
          </div>
        </div>
      </div>
    </div>
  );
}
