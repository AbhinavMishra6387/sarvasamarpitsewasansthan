import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Official Documents & Downloads | Sarva Samarpit Sewa Sansthan",
  description: "Download membership brochures, volunteer enrollment forms, annual report summaries, and 80G tax exemption guidelines.",
};

const DOWNLOADS = [
  {
    name: "Sansthan Official Brochure & Seva Overview (2026)",
    desc: "A comprehensive color guide explaining our 24/7 Annapurna Bhandara, free clinics, and Sangam cleanliness initiatives.",
    format: "PDF (3.2 MB)",
  },
  {
    name: "Volunteer Application & Code of Conduct Form",
    desc: "Printable enrollment application for sevadars unable to register online.",
    format: "PDF (850 KB)",
  },
  {
    name: "Section 80G Income Tax Exemption Guideline",
    desc: "A detailed explanatory note on how to claim deductions under Section 80G in Indian Income Tax Returns (ITR-1, 2, 3, 4).",
    format: "PDF (1.1 MB)",
  },
  {
    name: "Membership Application & Undertaking Document",
    desc: "Official physical application form for Annual and Life Patron membership.",
    format: "PDF (920 KB)",
  },
];

export default function DownloadsPage() {
  return (
    <div>
      <PageHeader
        title="Official Documents &amp; Forms"
        subtitle="Download printable forms, brochures, tax guidelines, and organizational materials published by Sarva Samarpit Sewa Sansthan."
        breadcrumbs={[{ label: "Downloads" }]}
        badge="Resource Center"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        {DOWNLOADS.map((doc) => (
          <div
            key={doc.name}
            className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-orange-100 text-ngo-orange shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 leading-snug">
                  {doc.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                  {doc.desc}
                </p>
                <span className="text-[11px] font-bold text-ngo-orange mt-2 inline-block">
                  Format: {doc.format}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading ${doc.name} (${doc.format}). Provided by Sarva Samarpit Sewa Sansthan.`)}
              className="px-6 py-2.5 rounded-xl bg-ngo-dark hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
