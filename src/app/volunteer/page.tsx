"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, Heart, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

const AVAILABLE_SKILLS = [
  "Annapurna Kitchen & Food Distribution",
  "Crowd Management & Pilgrim Assistance",
  "Medical & Healthcare Support",
  "Swachh Sangam Cleanliness Drives",
  "Photography & Social Media",
  "IT & Website Maintenance",
  "Accounting & Administrative Work",
  "Legal & Public Relations",
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    city: "Prayagraj",
    availability: "Weekends",
    reasonToJoin: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Annapurna Kitchen & Food Distribution",
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills: selectedSkills,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit volunteer application");
      }

      setSuccessResult(data.volunteer);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Join Our Sevadar Family"
        subtitle="Dedicate your time, empathy, and skills to serve pilgrims, elders, and needy souls at Triveni Sangam, Prayagraj."
        breadcrumbs={[{ label: "Volunteer" }]}
        badge="Selfless Service (Nishkam Seva)"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {successResult ? (
          <div className="bg-white p-8 sm:p-12 rounded-lg border border-gray-200 shadow-xs text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
              Welcome, Sevadar {successResult.fullName}!
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Your volunteer application has been received and registered under Reference Code:{" "}
              <strong className="text-ngo-orange font-mono">{successResult.volunteerCode}</strong>.
              Our Volunteer Head will contact you via WhatsApp / Phone to schedule your orientation at Bade Hanuman Ji Temple.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSuccessResult(null)}
                className="px-6 py-2.5 rounded-md bg-ngo-orange text-white text-xs font-bold shadow hover:bg-ngo-orange-600 transition-colors"
              >
                Register Another Volunteer
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-8 bg-white p-8 rounded-lg border border-gray-100 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-bold text-ngo-orange uppercase tracking-wider block mb-1">
                  Volunteer Application Form
                </span>
                <h3 className="text-2xl font-heading font-bold text-gray-900">
                  Lend Your Hands to Humanity
                </h3>
              </div>

              {errorMsg && (
                <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Occupation / Profession
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Doctor, Student, Teacher, Engineer"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Residential Address &bull; City
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Street / Locality"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="sm:col-span-2 px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                    <input
                      type="text"
                      placeholder="City (Default: Prayagraj)"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Areas of Seva Interest &bull; Select All That Apply
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AVAILABLE_SKILLS.map((skill) => (
                      <label
                        key={skill}
                        className={`p-2.5 rounded-md border text-xs font-medium cursor-pointer flex items-center gap-2 transition-all ${
                          selectedSkills.includes(skill)
                            ? "bg-orange-50 border-ngo-orange text-ngo-orange-800 font-bold"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="rounded text-ngo-orange focus:ring-ngo-orange"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm bg-white"
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Mornings">Mornings (06:00 - 11:00 AM)</option>
                      <option value="Evenings">Evenings (04:00 - 09:00 PM)</option>
                      <option value="Festivals / Snan Days">Major Festivals &amp; Snan Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Why do you wish to join?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Devotion to Hanuman Ji and desire to feed the needy"
                      value={formData.reasonToJoin}
                      onChange={(e) => setFormData({ ...formData, reasonToJoin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Users className="w-4 h-4" />
                    {submitting ? "Submitting Application..." : "Submit Volunteer Registration"}
                  </button>
                </div>
              </form>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-orange-50/70 p-6 rounded-lg border border-orange-200 space-y-4">
                <h4 className="font-heading font-bold text-base text-ngo-dark">
                  Why Volunteer with Us?
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Spiritual Bliss:</strong> Direct service to thousands of devotees at Triveni Sangam.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Volunteer Certificate:</strong> Official certificate of voluntary community service.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sevadar ID Card:</strong> Official Sansthan volunteer badge for access during religious festivals.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-ngo-dark-900 text-white p-6 rounded-lg border-t-4 border-ngo-orange space-y-2 text-xs">
                <p className="font-bold text-sm text-white">Questions about Volunteering?</p>
                <p className="text-gray-300">Call our Volunteer Helpdesk at {ORG_DETAILS.phone} (24x7).</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
