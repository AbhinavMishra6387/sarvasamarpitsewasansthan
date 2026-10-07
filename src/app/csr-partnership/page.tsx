import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Briefcase, ShieldCheck, CheckCircle2, Phone, Mail, Award } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "CSR Partnerships (Corporate Social Responsibility) | Sarva Samarpit Sewa Sansthan",
  description: "Partner with Sarva Samarpit Sewa Sansthan for CSR initiatives in nutrition, preventive healthcare, and sanitation in Prayagraj under Schedule VII, Companies Act, 2013.",
};

export default function CsrPartnershipPage() {
  return (
    <div>
      <PageHeader
        title="Corporate Social Responsibility (CSR)"
        subtitle="Collaborate with a registered charitable trust in Prayagraj to deliver high-impact, compliant CSR projects in hunger eradication, healthcare, and ecological river protection."
        breadcrumbs={[{ label: "CSR Partnership" }]}
        badge="Schedule VII Compliant"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-50 px-3 py-1 rounded-md">
              MCA &bull; Section 135 Compliant
            </span>
            <h2 className="text-3xl font-heading font-semibold text-ngo-dark leading-tight">
              Driving Measurable Social Value for Corporations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Under the Companies Act 2013, <strong>Sarva Samarpit Sewa Sansthan</strong> qualifies as an eligible implementing agency with active <strong>12A, 80G</strong> registrations and rigorous financial governance.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We partner with public and private sector enterprises, banks, and industrial corporations to co-create sustainable CSR programs tailored to your board&apos;s ESG and CSR policy mandates.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-gray-900 block">Eradicating Hunger &amp; Malnutrition (Item i)</strong>
                  <span className="text-xs text-gray-500">Sponsoring automated community kitchens and daily nutritious meals for pilgrims and vulnerable slum children.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-gray-900 block">Promoting Preventive Healthcare (Item i)</strong>
                  <span className="text-xs text-gray-500">Funding mobile diagnostic dispensaries, cancer screening camps, and emergency first-aid stations.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-gray-900 block">Environmental Sustainability &amp; Clean Ganga (Item iv)</strong>
                  <span className="text-xs text-gray-500">Installing large-scale waste segregation bins, solar lighting along ghats, and plastic reclamation machinery.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-heading font-bold text-xl text-gray-900">
              Corporate CSR Inquiry Desk
            </h3>
            <p className="text-xs text-gray-500">
              Connect directly with our CSR Advisory Director to review project proposals, budget outlays, and audited compliance dossiers.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <strong className="block text-gray-900 mb-1">Direct Line for CSR Heads:</strong>
                <a href={`tel:${ORG_DETAILS.phone}`} className="text-ngo-orange font-bold text-base hover:underline">
                  {ORG_DETAILS.formattedPhone}
                </a>
                <span className="block text-[11px] text-gray-500 mt-1">Available 24x7 for urgent corporate queries.</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <strong className="block text-gray-900 mb-1">Official CSR Email:</strong>
                <a href={`mailto:${ORG_DETAILS.email}`} className="text-gray-800 font-semibold hover:underline">
                  {ORG_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full py-3.5 px-6 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Briefcase className="w-4 h-4" /> Submit CSR Partnership Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
