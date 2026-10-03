"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Award, ShieldCheck, CheckCircle2, QrCode, CreditCard, ArrowRight } from "lucide-react";
import { DigitalMemberCard } from "@/components/membership/DigitalMemberCard";

const TIERS = [
  {
    type: "ANNUAL",
    title: "Annual Seva Member",
    fee: 1100,
    validity: "1 Year",
    benefits: [
      "Official Digital Membership ID Card with QR Verification",
      "Priority Darshan Coordination at Bade Hanuman Ji Temple",
      "Name mentioned in Annual Seva Souvenir",
      "Regular WhatsApp Updates on Monthly Bhandaras",
    ],
  },
  {
    type: "LIFE",
    title: "Life Patron (Ajeevan Sadasya)",
    fee: 21000,
    validity: "Lifetime (25 Years)",
    recommended: true,
    benefits: [
      "Permanent Gold Laminated Digital & Physical Membership ID",
      "Special Sankalp Bhog conducted on member's birthday every year",
      "Invitation to Board of Trustees Annual Gathering",
      "80G Tax Exemption Certificate for full donation",
      "24/7 Dedicated Sevadar Concierge in Prayagraj",
    ],
  },
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<string>("ANNUAL");
  const [formData, setFormData] = useState({
    fullName: "",
    fatherSpouseName: "",
    email: "",
    phone: "",
    bloodGroup: "O+",
    occupation: "",
    fullAddress: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [createdMember, setCreatedMember] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          membershipType: selectedTier,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCreatedMember(data.membership);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Sansthan Membership &amp; Digital Card"
        subtitle="Become an official member of Sarva Samarpit Sewa Sansthan. Receive an authentic Digital Membership Card with instant QR code verification."
        breadcrumbs={[{ label: "Membership" }]}
        badge="Official Identity"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {createdMember ? (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Membership Issued Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-gray-900">
              Your Digital Membership ID Card is Ready
            </h2>

            <DigitalMemberCard member={createdMember} />

            <div className="pt-4 flex justify-center gap-3">
              <Link
                href={`/membership/card/${createdMember.id}`}
                className="px-6 py-2.5 rounded-xl bg-ngo-orange text-white text-xs font-bold shadow hover:bg-ngo-orange-600 transition-colors"
              >
                View Full Card Page &rarr;
              </Link>
              <button
                onClick={() => setCreatedMember(null)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Apply Another Member
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Membership Tiers */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
                Choose Your Membership Category
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                All membership fees are non-profit contributions supporting our 24/7 Annapurna food distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {TIERS.map((tier) => (
                <div
                  key={tier.type}
                  onClick={() => setSelectedTier(tier.type)}
                  className={`p-8 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                    selectedTier === tier.type
                      ? "border-ngo-orange bg-orange-50/40 shadow-card"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3.5 right-6 bg-ngo-orange text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                      Most Revered Choice
                    </span>
                  )}

                  <div>
                    <h4 className="font-heading font-bold text-xl text-gray-900">
                      {tier.title}
                    </h4>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-heading font-black text-ngo-orange-700">
                        ₹ {tier.fee.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">/ {tier.validity}</span>
                    </div>

                    <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-gray-700">
                      {tier.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-200/60">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        selectedTier === tier.type
                          ? "bg-ngo-orange text-white shadow-md"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedTier === tier.type ? "Selected Tier" : "Select this Tier"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-card">
              <h4 className="font-heading font-bold text-xl text-gray-900 mb-1">
                Complete Member Profile
              </h4>
              <p className="text-xs text-gray-500 mb-6">
                Your details will be inscribed onto your official verified digital card.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satya Prakash Tripathi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Father&apos;s / Spouse&apos;s Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Late Ram Ashray Tripathi"
                      value={formData.fatherSpouseName}
                      onChange={(e) => setFormData({ ...formData, fatherSpouseName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. satya@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange bg-white"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Occupation / Profession
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Retired Officer, Advocate"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Permanent Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Complete residential address with PIN code"
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ngo-orange"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Award className="w-4 h-4" />
                    {submitting ? "Generating Digital Membership..." : "Generate Digital Membership Card"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
