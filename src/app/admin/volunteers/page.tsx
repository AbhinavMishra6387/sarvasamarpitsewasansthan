"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Search, Mail, Phone, Users, Shield } from "lucide-react";

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([
    {
      id: "vol-001",
      volunteerCode: "VOL-PRG-0101",
      fullName: "Prashant Dwivedi",
      email: "prashant.d@gmail.com",
      phone: "+91 98380 91823",
      city: "Prayagraj",
      skills: ["Event Organization", "Crowd Management", "Food Logistics"],
      availability: "Weekends & Festivals",
      status: "APPROVED",
    },
    {
      id: "vol-002",
      volunteerCode: "VOL-PRG-0102",
      fullName: "Dr. Ananya Mishra",
      email: "ananya.mishra.md@gmail.com",
      phone: "+91 94511 22334",
      city: "Prayagraj",
      skills: ["Medical Checkups", "Blood Pressure Screening"],
      availability: "Sunday Medical Camps",
      status: "APPROVED",
    },
    {
      id: "vol-003",
      volunteerCode: "VOL-PRG-0103",
      fullName: "Rahul Tiwari",
      email: "rahul.tiwari99@gmail.com",
      phone: "+91 91255 66778",
      city: "Prayagraj",
      skills: ["Social Media", "Photography", "Website Maintenance"],
      availability: "Flexible Evenings",
      status: "PENDING",
    },
  ]);

  const [query, setQuery] = useState("");

  const updateStatus = (id: string, newStatus: string) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const filtered = volunteers.filter(
    (v) =>
      v.fullName.toLowerCase().includes(query.toLowerCase()) ||
      v.email.toLowerCase().includes(query.toLowerCase()) ||
      v.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Volunteer Sevadar Pipeline
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review applicant skills, assign tasks, and approve field credentials.
          </p>
        </div>

        <a
          href="/api/admin/export?type=volunteers"
          download
          className="px-4 py-2 bg-ngo-dark hover:bg-black text-white font-bold text-xs rounded-md self-start sm:self-auto"
        >
          Download Volunteers CSV
        </a>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-xs sm:text-sm focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Volunteer Code</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Skills &amp; Interests</th>
                <th className="p-4">Availability</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-ngo-orange">
                    {v.volunteerCode}
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    {v.fullName}
                  </td>
                  <td className="p-4 text-gray-600">
                    <div>{v.phone}</div>
                    <div className="text-[11px] text-gray-400">{v.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {v.skills.map((s: string) => (
                        <span key={s} className="bg-orange-50 text-ngo-orange-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    {v.availability}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        v.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : v.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {v.status !== "APPROVED" && (
                        <button
                          onClick={() => updateStatus(v.id, "APPROVED")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {v.status !== "REJECTED" && (
                        <button
                          onClick={() => updateStatus(v.id, "REJECTED")}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 font-bold text-[11px] hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          Decline
                        </button>
                      )}
                    </div>
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
