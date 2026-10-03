"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { RefreshCw, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { DonationForm } from "@/components/donation/DonationForm";

export default function MembershipRenewPage() {
  const [membershipId, setMembershipId] = useState("");
  const [renewalType, setRenewalType] = useState<"ANNUAL" | "LIFE">("ANNUAL");

  return (
    <div>
      <PageHeader
        title="Membership Renewal Portal"
        subtitle="Extend your annual seva membership and support continuous Bhandara operations at Triveni Sangam."
        breadcrumbs={[
          { label: "Membership", href: "/membership" },
          { label: "Renewal" },
        ]}
        badge="Seva Continuity"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card space-y-6">
          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-2xl text-gray-900">
              Renew Your Active Membership
            </h3>
            <p className="text-xs text-gray-500">
              Enter your current Membership ID to renew for another year or upgrade to Life Patron status.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Existing Membership Number *
              </label>
              <input
                type="text"
                placeholder="e.g. SSSS-ANN-00452"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange font-mono uppercase font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Renewal Term
              </label>
              <select
                value={renewalType}
                onChange={(e) => setRenewalType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange bg-white font-semibold"
              >
                <option value="ANNUAL">Annual Renewal (₹ 1,100 / 1 Year)</option>
                <option value="LIFE">Upgrade to Life Patron (₹ 21,000 / Lifetime)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment via Donation Engine */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Complete Renewal Payment via Secure Gateway (80G Tax Deductible)</span>
          </div>
          <DonationForm initialCause={`Membership Renewal - ${renewalType} (${membershipId || "Annual"})`} />
        </div>
      </div>
    </div>
  );
}
