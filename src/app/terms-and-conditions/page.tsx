import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions | Sarva Samarpit Sewa Sansthan",
  description: "Terms and conditions governing the use of the website and online donations.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Terms &amp; Conditions"
        subtitle="General terms of usage for the official portal of Sarva Samarpit Sewa Sansthan."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
        badge="Legal Agreement"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-xs my-12 p-8 sm:p-12 prose text-gray-700 space-y-6">
        <h2 className="font-heading font-semibold text-2xl text-gray-900">1. Nature of the Organization</h2>
        <p>
          Sarva Samarpit Sewa Sansthan is an Indian public charitable trust registered in Prayagraj, Uttar Pradesh (Registration No: {ORG_DETAILS.registrationNo}). All funds received are voluntary charitable contributions utilized exclusively toward public welfare, free food distribution, free healthcare, and spiritual seva.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">2. Voluntary Donations</h2>
        <p>
          By remitting funds through this website, the donor acknowledges that contributions are made voluntarily and unconditionally without expectation of commercial consideration or quid-pro-quo benefit.
        </p>

        <h2 className="font-heading font-semibold text-2xl text-gray-900">3. Jurisdiction</h2>
        <p>
          Any dispute, claim, or legal controversy arising out of operations or transactions on this website shall be subject to the exclusive jurisdiction of the competent civil courts at <strong>Prayagraj (Allahabad), Uttar Pradesh, India</strong>.
        </p>
      </div>
    </div>
  );
}
