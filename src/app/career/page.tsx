import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Briefcase, Heart, Mail, CheckCircle2 } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Careers & Internships | Sarva Samarpit Sewa Sansthan",
  description: "Work with purpose. Explore full-time roles, social work internships, and seva fellowships at Sarva Samarpit Sewa Sansthan in Prayagraj.",
};

const OPENINGS = [
  {
    title: "Central Kitchen Logistics & Store Supervisor",
    type: "Full-Time (Prayagraj On-Site)",
    dept: "Annapurna Bhandara",
    desc: "Oversee raw food grains intake, hygiene protocols, ration inventories, and daily dispatch to Sangam meal distribution booths.",
  },
  {
    title: "Healthcare Clinic Nurse & Triage Coordinator",
    type: "Full-Time / Part-Time",
    dept: "Medical Seva",
    desc: "Manage patient token queues, vital checks, medicine inventory dispensing, and assist volunteer specialist doctors.",
  },
  {
    title: "Social Work & Philanthropy Summer Fellow",
    type: "3-Month Paid Internship (MSW / BSW)",
    dept: "Field Outreach & Research",
    desc: "Conduct field surveys on street children nutrition, compile impact case studies, and assist in CSR proposal documentation.",
  },
];

export default function CareerPage() {
  return (
    <div>
      <PageHeader
        title="Careers &amp; Social Work Internships"
        subtitle="Channel your skills toward meaningful human transformation. Build a career rooted in social empathy and transparent philanthropy in Prayagraj."
        breadcrumbs={[{ label: "Careers" }]}
        badge="Join Our Mission"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-2xl text-gray-900">
            Current Openings &bull; Prayagraj Head Office
          </h3>

          <div className="space-y-4">
            {OPENINGS.map((job) => (
              <div
                key={job.title}
                className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-soft hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-ngo-orange uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
                      {job.dept}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{job.type}</span>
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-gray-900">
                    {job.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                <a
                  href={`mailto:${ORG_DETAILS.email}?subject=${encodeURIComponent("Application for " + job.title)}`}
                  className="px-6 py-2.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white text-xs font-bold shadow-md transition-all shrink-0 text-center"
                >
                  Apply via Email &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Spontaneous Applications */}
        <div className="bg-orange-50/80 p-8 rounded-3xl border border-orange-200 text-center space-y-3">
          <h4 className="font-heading font-bold text-lg text-ngo-dark">
            Do not see a role that fits your profile?
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Send your resume and a brief statement of purpose to <strong>{ORG_DETAILS.email}</strong>. We continuously evaluate dedicated professionals and university interns.
          </p>
        </div>
      </div>
    </div>
  );
}
