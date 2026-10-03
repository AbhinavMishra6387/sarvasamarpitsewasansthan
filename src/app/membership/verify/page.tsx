import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { DigitalMemberCard } from "@/components/membership/DigitalMemberCard";
import { dbStore } from "@/lib/db-storage";
import { ORG_DETAILS } from "@/lib/constants";
import { ShieldCheck, CheckCircle2, XCircle, ArrowLeft, Phone, Calendar } from "lucide-react";

export const metadata = {
  title: "Official Membership Verification Portal | Sarva Samarpit Sewa Sansthan",
  description: "Instant QR authentication and verification of digital membership cards issued by Sarva Samarpit Sewa Sansthan, Prayagraj.",
};

export default async function MembershipVerifyPage({
  searchParams,
}: {
  searchParams: { q?: string; id?: string };
}) {
  const query = (searchParams.q || searchParams.id || "").trim();

  const member = query
    ? dbStore.memberships.find(
        (m) =>
          m.membershipNumber.toLowerCase() === query.toLowerCase() ||
          m.id === query ||
          m.phone.includes(query)
      )
    : null;

  return (
    <div>
      <PageHeader
        title="Digital Membership Verification"
        subtitle="Real-time cryptographic verification of official membership identity cards issued by Sarva Samarpit Sewa Sansthan."
        breadcrumbs={[
          { label: "Membership", href: "/membership" },
          { label: "Verification" },
        ]}
        badge="Instant QR Verification"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        {member ? (
          <div className="space-y-8 text-center">
            {/* Authenticity Banner */}
            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full">
                      Authentic &bull; Official Record
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      Trust Reg: {ORG_DETAILS.registrationNo}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-xl text-gray-900 mt-1">
                    Verified Active Member: {member.fullName}
                  </h3>
                  <p className="text-xs text-gray-600">
                    ID Number: <strong className="font-mono text-ngo-orange">{member.membershipNumber}</strong> &bull; Category: {member.membershipType} Seva Member
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-gray-500 block">Valid Until</span>
                <span className="font-heading font-extrabold text-sm text-gray-800">
                  {new Date(member.validUntil).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Render Digital Card */}
            <DigitalMemberCard member={member} />

            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-2 max-w-2xl mx-auto text-left">
              <p className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verification Record Details</span>
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
                <div><strong>Full Name:</strong> {member.fullName}</div>
                <div><strong>Blood Group:</strong> {member.bloodGroup || "O+"}</div>
                <div><strong>Registered Phone:</strong> {member.phone}</div>
                <div><strong>Member Status:</strong> <span className="text-emerald-700 font-bold">{member.status}</span></div>
                <div className="col-span-2"><strong>Head Office:</strong> Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ngo-orange hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Membership Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900">
                {query ? "Membership Record Not Found" : "Scan or Enter Member ID"}
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {query
                  ? `No verified record corresponds to ID "${query}". Please check the membership number or scan the QR code again.`
                  : "Please provide a valid Membership ID to verify authenticity."}
              </p>
            </div>

            {/* Quick Search Input */}
            <form action="/membership/verify" method="GET" className="space-y-3">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="e.g. SSSS-LIFE-00108"
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange font-mono uppercase text-center"
              />
              <button
                type="submit"
                className="w-full py-3 bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Verify Membership Now
              </button>
            </form>

            <div className="pt-4 border-t text-xs text-gray-400 space-y-2">
              <p>For helpline verification inquiries, call: <strong>{ORG_DETAILS.phone}</strong></p>
              <Link href="/membership" className="text-ngo-orange font-bold hover:underline block">
                &larr; Return to Membership Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
