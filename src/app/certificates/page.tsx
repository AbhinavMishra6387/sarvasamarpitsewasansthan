import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Trust Legal Certificates (12A & 80G) | Sarva Samarpit Sewa Sansthan",
  description: "View official registration certificates, 80G approval, 12A exemption, and Trust Deed of Sarva Samarpit Sewa Sansthan, Prayagraj.",
};

const CERTS = [
  {
    title: "Income Tax Section 80G Registration Certificate",
    regNo: ORG_DETAILS.section80G,
    authority: "Commissioner of Income Tax (Exemption)",
    benefit: "50% Tax Exemption on all donations for Indian taxpayers",
  },
  {
    title: "Income Tax Section 12A Registration Certificate",
    regNo: ORG_DETAILS.section12A,
    authority: "Income Tax Department of India",
    benefit: "Tax-free charitable status granted under Indian Tax Code",
  },
  {
    title: "Public Charitable Trust Registration Deed",
    regNo: ORG_DETAILS.registrationNo,
    authority: "Sub-Registrar of Trusts, Prayagraj, Uttar Pradesh",
    benefit: "Registered under the Indian Trusts Act, 1882",
  },
  {
    title: "NGO Darpan (NITI Aayog) Registration",
    regNo: "UP/2021/0289190",
    authority: "NITI Aayog, Government of India",
    benefit: "Empaneled for Central & State humanitarian projects",
  },
];

export default function CertificatesPage() {
  return (
    <div>
      <PageHeader
        title="Official Legal Certificates &amp; Registrations"
        subtitle="Verification records of our registration under the Indian Trusts Act, Section 12A, Section 80G, and NITI Aayog NGO Darpan."
        breadcrumbs={[{ label: "Certificates" }]}
        badge="Statutory Verification"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="p-6 sm:p-8 bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-orange-100 text-ngo-orange">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Active &bull; Verified
                  </span>
                </div>

                <h4 className="font-heading font-semibold text-lg text-gray-900 leading-snug">
                  {c.title}
                </h4>

                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100 text-xs font-mono text-gray-800">
                  <span className="text-gray-400 block text-[10px] font-sans">Certificate / Reg Number:</span>
                  <strong>{c.regNo}</strong>
                </div>

                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  <strong>Issuing Authority:</strong> {c.authority}
                </p>
                <p className="text-xs text-ngo-orange-800 font-semibold mt-1">
                  &bull; {c.benefit}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Sarva Samarpit Sewa Sansthan</span>
                <span>Prayagraj (UP)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
