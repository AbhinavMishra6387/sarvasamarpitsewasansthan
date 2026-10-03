import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Phone, ArrowLeft } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Donation Not Completed | Sarva Samarpit Sewa Sansthan",
  description: "Payment status update for Sarva Samarpit Sewa Sansthan.",
};

export default function DonationFailurePage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-heading font-black text-gray-900">
        Transaction Could Not Be Completed
      </h1>

      <p className="text-sm text-gray-600 leading-relaxed">
        Your payment was declined or interrupted by the bank gateway. If your account was debited, it will be automatically refunded by your issuing bank within 3 to 5 business days.
      </p>

      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-xs text-gray-700 space-y-1">
        <p><strong>Alternative Ways to Contribute:</strong></p>
        <p>You can scan our Direct UPI QR Code (no gateway fees) or transfer directly to our SBI account.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/donate"
          className="px-6 py-3 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Try Donating Again
        </Link>
        <a
          href={`tel:${ORG_DETAILS.phone}`}
          className="px-6 py-3 rounded-xl bg-ngo-dark hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-ngo-orange" /> Call Helpline ({ORG_DETAILS.phone})
        </a>
      </div>
    </div>
  );
}
