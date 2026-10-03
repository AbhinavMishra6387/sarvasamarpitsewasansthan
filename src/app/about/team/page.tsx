import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Heart, Users, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Our Sevadar Team | Sarva Samarpit Sewa Sansthan",
  description: "Meet the sevadars, kitchen captains, health coordinators, and volunteer marshals of Sarva Samarpit Sewa Sansthan.",
};

const TEAM_MEMBERS = [
  {
    name: "Pandit Shivendra Nath",
    role: "Head Priest & Bhandara Incharge",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
    experience: "15+ Years in Temple Prasad & Bhandara Seva",
  },
  {
    name: "Nurse Sunita Srivastava",
    role: "Lead Medical Camps Coordinator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    experience: "Certified Healthcare Professional & Triage Specialist",
  },
  {
    name: "Prashant Dwivedi",
    role: "Youth Volunteer Captain",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    experience: "Sangam Ghat Management & Crowd Facilitation",
  },
  {
    name: "Rahul Tiwari",
    role: "IT & Digital Transparency Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    experience: "80G Digital Receipt Engine & Social Updates",
  },
];

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Our Dedicated Sevadar Team"
        subtitle="The compassionate human force working day and night behind every warm meal, clean ghat, and medical prescription."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Our Team" }]}
        badge="Heart of the Sansthan"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col group"
            >
              <div className="h-60 overflow-hidden bg-gray-100">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-ngo-orange uppercase tracking-wider block mb-1">
                    {m.role}
                  </span>
                  <h3 className="font-heading font-extrabold text-base text-gray-900">
                    {m.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">{m.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join the Team CTA */}
        <div className="p-8 bg-orange-50 rounded-3xl border border-orange-200 text-center max-w-2xl mx-auto space-y-3">
          <h3 className="font-heading font-bold text-xl text-ngo-dark">
            Do You Want to Join Our Dedicated Sevadar Family?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            We welcome volunteers from all walks of life. Whether you can spare 2 hours on Sunday or assist in digital design, your contribution matters.
          </p>
          <div className="pt-2">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ngo-orange text-white text-xs font-bold shadow-md hover:bg-ngo-orange-600 transition-colors"
            >
              <Users className="w-4 h-4" /> Register as a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
