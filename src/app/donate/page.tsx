import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DonationForm } from "@/components/donation/DonationForm";
import { ShieldCheck, Heart, Sparkles, Building2, Phone, HelpCircle } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Donate Online (80G Tax Exemption) | Sarva Samarpit Sewa Sansthan",
  description: "Contribute to 24/7 Annapurna food distribution and medical camps in Prayagraj. 50% Tax Deduction under Section 80G. Razorpay, PhonePe & UPI.",
};

export default function DonatePage({ searchParams }: { searchParams: { cause?: string } }) {
  return (
    <div>
      <PageHeader
        title="Contribute to Akhand Seva"
        subtitle="Your generous donation sustains daily hot meals, medicines, and winter relief at Triveni Sangam. Claim 50% Tax Exemption under Section 80G."
        breadcrumbs={[{ label: "Donate Online" }]}
        badge="Instant 80G Tax Receipt"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Donation Form */}
          <div className="lg:col-span-7">
            <DonationForm initialCause={searchParams.cause} />
          </div>

          {/* Sidebar Information & Bank Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* 80G Information Card */}
            <div className="bg-orange-50/80 p-6 rounded-3xl border border-orange-200 space-y-4">
              <div className="flex items-center gap-2.5 text-ngo-orange-800 font-extrabold text-base">
                <ShieldCheck className="w-5 h-5 text-ngo-orange" />
                <span>Income Tax Exemption Benefits</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                All donations to <strong>Sarva Samarpit Sewa Sansthan</strong> are eligible for a <strong>50% deduction</strong> from taxable income under Section 80G of the Income Tax Act, 1961.
              </p>
              <div className="bg-white p-3.5 rounded-xl border border-orange-200 text-xs space-y-1 text-gray-600">
                <p><strong>Trust Reg No:</strong> {ORG_DETAILS.registrationNo}</p>
                <p><strong>80G Unique Reg No:</strong> {ORG_DETAILS.section80G}</p>
                <p><strong>Trust PAN:</strong> {ORG_DETAILS.panNumber}</p>
              </div>
            </div>

            {/* Direct Bank Account Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-4">
              <div className="flex items-center gap-2.5 text-gray-900 font-extrabold text-base">
                <Building2 className="w-5 h-5 text-ngo-orange" />
                <span>Direct Bank Transfer (NEFT / RTGS / IMPS)</span>
              </div>
              <p className="text-xs text-gray-500">
                You can transfer funds directly into our verified State Bank of India account:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs font-mono text-gray-800">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Account Name:</span>
                  <span className="font-bold">{ORG_DETAILS.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Account Number:</span>
                  <span className="font-bold text-ngo-orange-700">{ORG_DETAILS.bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Bank Name:</span>
                  <span className="font-bold">{ORG_DETAILS.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">IFSC Code:</span>
                  <span className="font-bold text-emerald-700">{ORG_DETAILS.bankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Branch:</span>
                  <span className="font-bold">{ORG_DETAILS.bankDetails.branch}</span>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-ngo-dark-900 text-white p-6 rounded-3xl border-t-4 border-ngo-orange space-y-3">
              <h4 className="font-heading font-bold text-base flex items-center gap-2">
                <Phone className="w-4 h-4 text-ngo-orange" /> Need Assistance with Your Donation?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Our donor support desk operates 24/7. Contact us anytime for custom seva sponsorships, offline receipts, or CSR partnerships.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${ORG_DETAILS.phone}`}
                  className="inline-block px-4 py-2 bg-ngo-orange hover:bg-ngo-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Call Helpline: {ORG_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
