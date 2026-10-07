"use client";

import React from "react";
import { Utensils, HeartPulse, Users, Award, ShieldCheck, Flame } from "lucide-react";

const STATS = [
  {
    icon: Utensils,
    value: "4,85,000+",
    label: "Warm Meals Served",
    description: "Daily Annapurna Bhandara round the clock at Triveni Sangam",
  },
  {
    icon: HeartPulse,
    value: "32,400+",
    label: "Patients Treated",
    description: "Free medical examinations and life-saving medicines distributed",
  },
  {
    icon: Users,
    value: "640+",
    label: "Active Sevadars",
    description: "Passionate volunteers offering selfless service across Prayagraj",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Tax Deductible",
    description: "Registered under Section 12A & 80G of Income Tax Act",
  },
];

export function StatisticsCounter() {
  return (
    <section className="bg-stone-50/50 py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium tracking-wide text-stone-800 bg-white px-3 py-1 rounded-md border border-stone-200">
            Our Measurable Ground Impact
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mt-3">
            Real Seva. Tangible Lives Touched.
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Every rupee donated and every hour volunteered transforms someone&apos;s hunger into nourishment and pain into healing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs hover:border-stone-300 transition-colors text-center flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-md bg-stone-100 text-stone-700 group-hover:text-orange-700 flex items-center justify-center transition-colors mb-4 border border-stone-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-stone-700 mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
