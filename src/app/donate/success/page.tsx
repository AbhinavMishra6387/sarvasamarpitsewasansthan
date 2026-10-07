import React from "react";
import Link from "next/link";
import { CheckCircle2, Download, Printer, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { dbStore } from "@/lib/db-storage";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Donation Successful | Sarva Samarpit Sewa Sansthan",
  description: "Official confirmation of your charitable contribution to Sarva Samarpit Sewa Sansthan.",
};

export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string; txn?: string; mode?: string };
}) {
  const donationId = searchParams.id || searchParams.txn;
  const donation = donationId
    ? dbStore.donations.find((d) => d.id === donationId || d.transactionId === donationId)
    : dbStore.donations[0];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-md border border-emerald-200">
          Payment Confirmed &bull; 80G Tax Exemption Applicable
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mt-3">
          Thank You for Your Sacred Contribution!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto">
          Your donation has been successfully recorded. May Shree Bade Hanuman Ji bless you and your family with peace and prosperity.
        </p>
      </div>

      {/* Donation Receipt Summary Card */}
      {donation && (
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold">Receipt Number</span>
              <p className="font-mono font-bold text-ngo-orange text-base sm:text-lg">
                {donation.receiptNo}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase font-semibold">Amount Donated</span>
              <p className="font-heading font-semibold text-gray-900 text-xl sm:text-2xl">
                ₹ {donation.amount.toLocaleString("en-IN")} INR
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-500 block">Donor Name:</span>
              <strong className="text-gray-800">{donation.donorName}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Transaction Reference:</span>
              <strong className="text-gray-800 font-mono">{donation.transactionId || "SUCCESS"}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Seva Purpose:</span>
              <strong className="text-gray-800">{donation.campaignTitle}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Payment Mode:</span>
              <strong className="text-gray-800">{donation.paymentGateway}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href={`/api/donations/receipt/${donation.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <Printer className="w-4 h-4" /> Download / Print 80G Tax Receipt
            </a>

            <Link
              href="/"
              className="px-6 py-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              Back to Homepage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        A copy of this official receipt has also been dispatched to your email. For inquiries, call our 24/7 helpline: {ORG_DETAILS.phone}.
      </p>
    </div>
  );
}
