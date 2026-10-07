import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, Award, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Executive Committee | Sarva Samarpit Sewa Sansthan",
  description: "The dedicated Executive Committee executing field operations, medical logistics, and community seva.",
};

const COMMITTEE = [
  {
    name: "Er. Vivek Singhal",
    position: "General Secretary & Operations Lead",
    dept: "Central Kitchen & Bhandara Management",
    desc: "Oversees daily food procurement, cooking standards, and logistical distribution points across Triveni Sangam banks.",
  },
  {
    name: "Dr. Ananya Mishra",
    position: "Chief Medical Officer (Volunteer)",
    dept: "Free Medical Camps & Clinical Outreach",
    desc: "Coordinates doctor rosters, diagnostic van schedules, and manages pharmaceutical donations.",
  },
  {
    name: "Shri Mahendra Pratap Singh",
    position: "Joint Secretary & Public Relations",
    dept: "Pilgrim Assistance & Mandir Liaison",
    desc: "Coordinates with local administration, traffic police, and Bade Hanuman Ji Temple authorities during festivals.",
  },
  {
    name: "Adv. Alok Ranjan Dwivedi",
    position: "Legal & Compliance Advisor",
    dept: "Trust Governance & 80G Statutory Audits",
    desc: "Monitors legal compliance under Indian Trusts Act, NGO Darpan filings, and transparent reporting.",
  },
];

export default function ExecutiveCommitteePage() {
  return (
    <div>
      <PageHeader
        title="Executive Committee"
        subtitle="Operational coordinators managing daily ground initiatives, procurement, hygiene standards, and volunteer deployment."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Executive Committee" }]}
        badge="Ground Leadership"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMITTEE.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ngo-orange uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-md">
                    {member.dept}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mt-2">
                  {member.name}
                </h3>
                <p className="text-xs text-ngo-orange-700 font-bold mb-3">{member.position}</p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                <span>Sarva Samarpit Sewa Sansthan</span>
                <span>Active 2026 Committee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
