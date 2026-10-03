import React from "react";
import { Building2, ShieldCheck, HeartHandshake } from "lucide-react";

const PARTNERS = [
  { name: "State Bank of India (SBI)", type: "Official Banking & 80G Partner", desc: "Sangam Marg Branch" },
  { name: "Prayagraj Seva Mandal", type: "Spiritual Logistics", desc: "Triveni Sangam Ghats" },
  { name: "National Health Mission Volunteers", type: "Clinical Outreach", desc: "Medical Diagnostics" },
  { name: "Rotary Club Prayagraj Central", type: "CSR Welfare Associate", desc: "Blanket & Eye Camps" },
  { name: "Shree Bade Hanuman Mandir Trust", type: "Spiritual Aegis", desc: "Bandh Wale Hanuman Ji" },
  { name: "Ganga Action Parivar Volunteers", type: "Ecological River Seva", desc: "Swachh Sangam Mission" },
];

export function PartnersSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-100/70 px-3.5 py-1 rounded-full">
            Collaborative Philanthropy
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ngo-dark mt-2">
            Partners, Sponsors &amp; Associating Bodies
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Strengthening our collective capacity to feed, heal, and serve millions of pilgrims across Prayagraj.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-soft transition-all text-center flex flex-col justify-between items-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-ngo-orange text-ngo-orange group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-xs text-gray-900 leading-snug">
                {partner.name}
              </h4>
              <p className="text-[10px] text-gray-400 mt-1">{partner.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
