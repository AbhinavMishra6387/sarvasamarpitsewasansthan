import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Target, CheckCircle2, Shield, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Our Mission | Sarva Samarpit Sewa Sansthan",
  description: "The core mission statements of Sarva Samarpit Sewa Sansthan guiding everyday seva across Prayagraj.",
};

export default function MissionPage() {
  return (
    <div>
      <PageHeader
        title="Our Mission &amp; Action Plan"
        subtitle="Translating compassion into everyday action through disciplined, accountable, and transparent charitable activities."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Mission" }]}
        badge="Call to Action"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-100 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100 text-ngo-orange">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-ngo-dark">
                The 5 Core Mission Mandates
              </h2>
              <p className="text-xs text-ngo-orange font-bold uppercase tracking-wider">
                Measurable Milestones in Action
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-orange-50/60 border border-orange-100 space-y-2">
              <span className="text-xs font-bold text-ngo-orange uppercase">Mandate 1</span>
              <h4 className="font-heading font-bold text-base text-gray-900">Round-The-Clock Food Distribution</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Provide hot, hygienic, freshly prepared sattvic meals every single day of the year to pilgrims, sadhus, destitute, and differently-abled individuals at Triveni Sangam.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-orange-50/60 border border-orange-100 space-y-2">
              <span className="text-xs font-bold text-ngo-orange uppercase">Mandate 2</span>
              <h4 className="font-heading font-bold text-base text-gray-900">Accessible Healthcare For All</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Conduct free medical consultations, screening for chronic diseases, and dispense essential medications without charging a single penny.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-orange-50/60 border border-orange-100 space-y-2">
              <span className="text-xs font-bold text-ngo-orange uppercase">Mandate 3</span>
              <h4 className="font-heading font-bold text-base text-gray-900">Pilgrim Care &amp; Elder Assistance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Maintain 24/7 assistance booths at Shree Bade Hanuman Ji Temple aiding senior pilgrims with wheel chairs, lost-and-found help, and pure drinking water.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-orange-50/60 border border-orange-100 space-y-2">
              <span className="text-xs font-bold text-ngo-orange uppercase">Mandate 4</span>
              <h4 className="font-heading font-bold text-base text-gray-900">Emergency &amp; Winter Relief</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Distribute 5,000+ heavy woollen blankets, woollen caps, and conduct emergency food drops across railway shelters and open pavements during northern frost months.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center flex justify-center gap-4">
          <Link
            href="/about/founder-message"
            className="px-6 py-3 rounded-md bg-ngo-dark text-white font-bold text-sm hover:bg-black transition-colors"
          >
            Founder&apos;s Message &rarr;
          </Link>
          <Link
            href="/donate"
            className="px-6 py-3 rounded-md bg-ngo-orange text-white font-bold text-sm hover:bg-ngo-orange-600 transition-colors shadow-md"
          >
            Support the Mission
          </Link>
        </div>
      </div>
    </div>
  );
}
