"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { DigitalMemberCard } from "@/components/membership/DigitalMemberCard";
import { Award, Search, Phone, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function MemberLoginPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/memberships/verify?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.found && data.member) {
        setMember(data.member);
      } else {
        setErrorMsg("No registered membership found for this ID or Mobile Number. Please verify and try again.");
      }
    } catch (e) {
      setErrorMsg("Failed to verify credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Member Portal &amp; Digital Card Login"
        subtitle="Retrieve your verified digital membership ID card, check validity, or renew your annual seva membership."
        breadcrumbs={[{ label: "Membership", href: "/membership" }, { label: "Member Login" }]}
        badge="Self-Service Member Portal"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {member ? (
          <div className="space-y-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Active Member Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-gray-900">
              Welcome Back, {member.fullName}!
            </h2>

            <DigitalMemberCard member={member} />

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link
                href="/membership/renew"
                className="px-6 py-3 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Renew Membership Online
              </Link>
              <button
                onClick={() => setMember(null)}
                className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition-colors"
              >
                Search Another Member
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-ngo-orange flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900">
                Member Sign In
              </h3>
              <p className="text-xs text-gray-500">
                Enter your 10-digit mobile number or Membership ID (e.g. SSSS-LIFE-00108)
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number or Membership ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9415233445 or SSSS-LIFE-00108"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Verifying Member..." : "Access Member Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 border-t text-center text-xs text-gray-500 space-y-1">
              <p>Not a registered member yet?</p>
              <Link href="/membership" className="text-ngo-orange font-bold hover:underline">
                Apply for New Membership Online &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
