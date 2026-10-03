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
    <section className="bg-gradient-to-b from-white to-orange-50/50 py-16 px-4 sm:px-6 lg:px-8 border-b border-orange-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-100/70 px-3.5 py-1 rounded-full">
            Our Measurable Ground Impact
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ngo-dark mt-3">
            Real Seva. Tangible Lives Touched.
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Every rupee donated and every hour volunteered transforms someone&apos;s hunger into nourishment and pain into healing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-center flex flex-col items-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 group-hover:bg-ngo-orange text-ngo-orange group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-black text-ngo-dark tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-ngo-orange-700 mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
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
