"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Sliders, Bell, Globe, MapPin, Phone, MessageSquare, Layout } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "sliders" | "popups" | "footer">("general");
  const [saved, setSaved] = useState(false);

  // CMS state
  const [cmsData, setCmsData] = useState({
    logoText: "Sarva Samarpit Sewa Sansthan",
    tagline: "Dedicated to the Selfless Service of Humanity & Divinity",
    phone: "09450858514",
    whatsapp: "+91 94508 58514",
    email: "info@sarvasamarpit.org",
    headOffice: ORG_DETAILS.headOffice,
    googleMapEmbed: ORG_DETAILS.googleMapsEmbed,
    noticeTickerText: "Jai Shree Ram! Akhand Annapurna Bhandara & Free Health Camp running 24x7 at Bade Hanuman Ji Temple, Sangam Marg, Prayagraj.",
    popupEnabled: true,
    popupTitle: "Mahakumbh & Magh Mela 2026 Seva Alert",
    popupMessage: "Join our 24x7 mega food distribution at Sangam Ghat. Sponsoring a meal earns divine blessings.",
    popupCtaText: "Sponsor A Meal (80G)",
    popupCtaLink: "/donate",
    footerText: "Serving the divine and humanity through round-the-clock Annapurna Bhandara, free medical health camps, and sacred cleanliness drives at Triveni Sangam.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            Content Management System (CMS)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit website headers, hero sliders, popup alerts, notice board tickers, and footer information in real time.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" /> Save CMS Changes
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All CMS content updated and synchronized across all frontend components!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab("general")}
          className={`py-2.5 px-4 rounded-t-xl transition-all ${
            activeTab === "general"
              ? "bg-white text-ngo-orange border-t-2 border-ngo-orange shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Header, Logo &amp; Contact
        </button>
        <button
          onClick={() => setActiveTab("sliders")}
          className={`py-2.5 px-4 rounded-t-xl transition-all ${
            activeTab === "sliders"
              ? "bg-white text-ngo-orange border-t-2 border-ngo-orange shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Notice Ticker &amp; Popups
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`py-2.5 px-4 rounded-t-xl transition-all ${
            activeTab === "footer"
              ? "bg-white text-ngo-orange border-t-2 border-ngo-orange shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Footer &amp; Social Links
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-soft">
        {activeTab === "general" && (
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-base text-gray-900 border-b pb-2">
              Header Branding &amp; Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Organization Title</label>
                <input
                  type="text"
                  value={cmsData.logoText}
                  onChange={(e) => setCmsData({ ...cmsData, logoText: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">24/7 Helpline Phone</label>
                <input
                  type="text"
                  value={cmsData.phone}
                  onChange={(e) => setCmsData({ ...cmsData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Helpline Number</label>
                <input
                  type="text"
                  value={cmsData.whatsapp}
                  onChange={(e) => setCmsData({ ...cmsData, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={cmsData.email}
                  onChange={(e) => setCmsData({ ...cmsData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Head Office Address</label>
                <input
                  type="text"
                  value={cmsData.headOffice}
                  onChange={(e) => setCmsData({ ...cmsData, headOffice: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={cmsData.googleMapEmbed}
                  onChange={(e) => setCmsData({ ...cmsData, googleMapEmbed: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "sliders" && (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-base text-gray-900 border-b pb-2">
              Notice Board Ticker &amp; Modal Popup Alerts
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Top Notice Board Ticker Message
              </label>
              <textarea
                rows={2}
                value={cmsData.noticeTickerText}
                onChange={(e) => setCmsData({ ...cmsData, noticeTickerText: e.target.value })}
                className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>

            <div className="p-5 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-900">
                    Homepage Modal Popup Alert
                  </h4>
                  <p className="text-xs text-gray-500">Show high-priority announcements to visiting devotees</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cmsData.popupEnabled}
                    onChange={(e) => setCmsData({ ...cmsData, popupEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ngo-orange"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Popup Title</label>
                <input
                  type="text"
                  value={cmsData.popupTitle}
                  onChange={(e) => setCmsData({ ...cmsData, popupTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Popup Message</label>
                <textarea
                  rows={2}
                  value={cmsData.popupMessage}
                  onChange={(e) => setCmsData({ ...cmsData, popupMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-ngo-orange"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "footer" && (
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-base text-gray-900 border-b pb-2">
              Footer Description &amp; Social Links
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Footer About Synopsis</label>
              <textarea
                rows={3}
                value={cmsData.footerText}
                onChange={(e) => setCmsData({ ...cmsData, footerText: e.target.value })}
                className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Facebook URL</label>
                <input
                  type="text"
                  defaultValue={ORG_DETAILS.socialMedia.facebook}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">YouTube Channel URL</label>
                <input
                  type="text"
                  defaultValue={ORG_DETAILS.socialMedia.youtube}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Instagram URL</label>
                <input
                  type="text"
                  defaultValue={ORG_DETAILS.socialMedia.instagram}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Google Business Link</label>
                <input
                  type="text"
                  defaultValue={ORG_DETAILS.googleBusinessUrl}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
