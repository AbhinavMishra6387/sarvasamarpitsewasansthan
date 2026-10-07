import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Donation Refund & Cancellation Policy | Sarva Samarpit Sewa Sansthan",
  description: "Official donation refund guidelines for accidental or erroneous payment processing.",
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHeader
        title="Donation Refund &amp; Cancellation Policy"
        subtitle="Transparent guidelines regarding erroneous, duplicate, or accidental charitable transactions."
        breadcrumbs={[{ label: "Refund Policy" }]}
        badge="Financial Policy"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-xs my-12 p-8 sm:p-12 prose text-gray-700 space-y-6">
        <h2 className="font-heading font-semibold text-2xl text-gray-900">1. Nature of Contributions</h2>
        <p>
          Donations made to Sarva Samarpit Sewa Sansthan are charitable offerings disbursed directly toward ongoing round-the-clock langar, medicine procurement, and pilgrim assistance. Consequently, donations are normally non-refundable once an 80G tax certificate has been generated and utilized.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">2. Erroneous or Duplicate Debits</h2>
        <p>
          In circumstances where:
        </p>
        <ul>
          <li>A technical glitch caused a duplicate or multiple deduction for a single donation attempt;</li>
          <li>An erroneous amount was typed by error (e.g. ₹50,000 instead of ₹5,000);</li>
        </ul>
        <p>
          The donor may request a refund by emailing <strong>{ORG_DETAILS.email}</strong> within <strong>7 days</strong> of transaction date, enclosing proof of deduction and payment ID.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">3. Resolution &amp; Reversal Timeline</h2>
        <p>
          Verified refunds are approved by our Accounts Trustee and credited back to the original funding source (Bank Account, Credit Card, or UPI ID) within <strong>5 to 7 working days</strong>.
        </p>
      </div>
    </div>
  );
}
