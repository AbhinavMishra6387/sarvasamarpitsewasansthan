import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | Sarva Samarpit Sewa Sansthan",
  description: "Official Privacy Policy regarding donor information and data protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        subtitle="How Sarva Samarpit Sewa Sansthan safeguards donor information, payment details, and personal data."
        breadcrumbs={[{ label: "Privacy Policy" }]}
        badge="Data Protection"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-xs my-12 p-8 sm:p-12 prose prose-sm sm:prose text-gray-700 space-y-6">
        <h2 className="font-heading font-semibold text-2xl text-gray-900">1. Information Collection</h2>
        <p>
          Sarva Samarpit Sewa Sansthan collects personal information including name, email address, phone number, address, and Permanent Account Number (PAN) strictly for the generation of statutory 80G tax receipts and Form 10BD income tax filings.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">2. Payment Security</h2>
        <p>
          We do NOT store credit card numbers, CVVs, or net banking passwords on our servers. All financial transactions are processed through certified PCI-DSS compliant payment gateways (Razorpay, PhonePe, and NPCI Unified Payments Interface).
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">3. Non-Disclosure &amp; Confidentiality</h2>
        <p>
          We never sell, rent, or lease donor mailing lists or personal information to third-party commercial marketing firms. Information is disclosed only when required by statutory authorities such as the Income Tax Department of India.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">4. Contact Data Grievance Officer</h2>
        <p>
          For queries or to request deletion of your non-statutory records, write to: <strong>{ORG_DETAILS.email}</strong> or call <strong>{ORG_DETAILS.phone}</strong>.
        </p>
      </div>
    </div>
  );
}
