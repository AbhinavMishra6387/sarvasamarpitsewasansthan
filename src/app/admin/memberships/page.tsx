"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, Search, QrCode, ArrowDownToLine, ExternalLink } from "lucide-react";

export default function AdminMembershipsPage() {
  const [members, setMembers] = useState<any[]>([
    {
      id: "mem-001",
      membershipNumber: "SSSS-LIFE-00108",
      fullName: "Satya Prakash Tripathi",
      phone: "+91 94152 33445",
      bloodGroup: "O+",
      membershipType: "LIFE",
      validUntil: "2044-01-01T00:00:00Z",
      status: "ACTIVE",
    },
    {
      id: "mem-002",
      membershipNumber: "SSSS-ANN-00452",
      fullName: "Pooja Singhania",
      phone: "+91 98399 88776",
      bloodGroup: "B+",
      membershipType: "ANNUAL",
      validUntil: "2026-12-31T23:59:59Z",
      status: "ACTIVE",
    },
  ]);

  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.membershipNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            Registered Members &amp; Digital Cards
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Official roster of patron and annual seva members with active verification status.
          </p>
        </div>

        <a
          href="/api/admin/export?type=memberships"
          download
          className="px-4 py-2 bg-ngo-dark hover:bg-black text-white font-bold text-xs rounded-xl self-start sm:self-auto"
        >
          Download Members CSV
        </a>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by member name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs sm:text-sm focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Membership Number</th>
                <th className="p-4">Member Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Category</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Validity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Digital Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-ngo-orange">
                    {m.membershipNumber}
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    {m.fullName}
                  </td>
                  <td className="p-4 text-gray-600">
                    {m.phone}
                  </td>
                  <td className="p-4 font-bold text-gray-700">
                    {m.membershipType}
                  </td>
                  <td className="p-4 font-bold text-red-500">
                    {m.bloodGroup}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(m.validUntil).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/membership/card/${m.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-ngo-orange text-ngo-orange hover:text-white font-bold text-[11px] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Card
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
