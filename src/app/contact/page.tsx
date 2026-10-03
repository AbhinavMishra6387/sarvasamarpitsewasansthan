"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry / Seva Information",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to submit message.");
      }
    } catch (err: any) {
      setErrorMsg("Network error. Please try calling directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact Us &amp; Visit in Prayagraj"
        subtitle="Reach our 24/7 seva helpline or visit our Head Office at Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj."
        breadcrumbs={[{ label: "Contact Us" }]}
        badge="Open 24 Hours Daily"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ngo-dark-900 text-white p-8 rounded-3xl border-t-4 border-ngo-orange shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-ngo-orange uppercase tracking-wider block mb-1">
                  Head Office &amp; Seva Kendra
                </span>
                <h3 className="text-2xl font-heading font-black text-white">
                  Sarva Samarpit Sewa Sansthan
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Registered Charitable Trust &bull; Prayagraj, UP
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Physical Address:</strong>
                    <span>{ORG_DETAILS.headOffice}</span>
                    <span className="text-xs text-gray-400 block mt-1">Near Triveni Sangam, Fort Road</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">24x7 Helpline / WhatsApp:</strong>
                    <a href={`tel:${ORG_DETAILS.phone}`} className="text-white font-bold hover:text-ngo-orange text-base block">
                      {ORG_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Email Inquiries:</strong>
                    <a href={`mailto:${ORG_DETAILS.email}`} className="text-gray-200 hover:text-ngo-orange">
                      {ORG_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Office &amp; Bhandara Timings:</strong>
                    <span className="text-emerald-400 font-bold">Open 24 Hours (Round-the-clock Seva)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <a
                  href={`https://wa.me/919450858514?text=${encodeURIComponent("Jai Shree Ram! I would like to contact Sarva Samarpit Sewa Sansthan.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp (+91 94508 58514)
                </a>

                <a
                  href={ORG_DETAILS.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-ngo-dark-800 hover:bg-ngo-dark-700 text-gray-300 font-medium text-xs flex items-center justify-center gap-2 border border-gray-700 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-ngo-orange" /> Open in Google Business &amp; Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card">
            <h3 className="font-heading font-extrabold text-2xl text-gray-900 mb-1">
              Send an Official Message
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our response team will reach out to you within 24 hours.
            </p>

            {success ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-gray-900">Message Delivered!</h4>
                <p className="text-xs text-gray-600">
                  Thank you for reaching out. A representative from Sarva Samarpit Sewa Sansthan will follow up with you.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-ngo-orange text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you with our seva programs or sponsorships?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending Message..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-gray-200 h-[400px]">
          <iframe
            src={ORG_DETAILS.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Sarva Samarpit Sewa Sansthan Head Office Google Map"
          />
        </div>
      </div>
    </div>
  );
}
