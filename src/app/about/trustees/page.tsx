import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ShieldCheck, Mail, Phone, Award } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Board of Trustees | Sarva Samarpit Sewa Sansthan",
  description: "Meet the honorable Board of Trustees providing visionary governance and transparency for Sarva Samarpit Sewa Sansthan.",
};

const TRUSTEES = [
  {
    name: "Dr. Ramesh Chandra Pandey",
    role: "President / Managing Trustee",
    bio: "Eminent social philosopher and philanthropist with over 35 years of dedicated public welfare service across Eastern Uttar Pradesh. Oversees institutional governance and donor relations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Shri Krishna Murari Shukla",
    role: "Vice President & Seva Director",
    bio: "Devoted spiritual leader coordinating the 24-hour Annapurna Bhandara logistics, ration sourcing, and pilgrim assistance booths at Bade Hanuman Ji Temple.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "CA Satish Kumar Agarwal",
    role: "Treasurer & Financial Trustee",
    bio: "Senior Fellow Chartered Accountant ensuring 100% statutory compliance, Section 80G filings, transparent annual reporting, and zero administrative waste.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Smt. Shanti Devi Tripathi",
    role: "Trustee (Women & Child Welfare)",
    bio: "Leading rural literacy drives, distribution of free school kits, and organizing tailoring skill centers for widows and marginalized women in Prayagraj.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  },
];

export default function TrusteesPage() {
  return (
    <div>
      <PageHeader
        title="Board of Trustees"
        subtitle="Distinguished leaders guiding the charitable policies, ethical values, and audited transparency of the Sansthan."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Board of Trustees" }]}
        badge="Governance & Stewardship"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUSTEES.map((trustee) => (
            <div
              key={trustee.name}
              className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all overflow-hidden flex flex-col group"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={trustee.image}
                  alt={trustee.name}
                  className="w-full h-full object-cover group-transition-colors duration-200 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-ngo-orange uppercase tracking-wider block mb-1">
                    {trustee.role}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-gray-900 leading-tight">
                    {trustee.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {trustee.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Trustee Board
                  </span>
                  <span>Prayagraj, UP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
