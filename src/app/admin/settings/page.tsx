"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    phone: "09450858514",
    email: "info@sarvasamarpit.org",
    headOffice: ORG_DETAILS.headOffice,
    announcementText: "Jai Shree Ram! Akhand Annapurna Bhandara & Free Health Camp running 24x7 at Bade Hanuman Ji Temple, Sangam Marg, Prayagraj.",
    totalMealsServed: 485000,
    patientsTreated: 32400,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Real-Time CMS &amp; Site Configuration
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Updates made here reflect across all pages immediately without requiring manual rebuilds.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Settings saved successfully! Website content updated in real-time.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs space-y-6">
        <div>
          <h3 className="font-heading font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Top Announcement Bar / Ticker
          </h3>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Live Announcement Ticker Message
            </label>
            <textarea
              rows={2}
              value={settings.announcementText || ""}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 border rounded-md text-xs sm:text-sm focus:outline-none focus:border-ngo-orange"
            />
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Contact &amp; Head Office (Prayagraj)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                24x7 Seva Helpline Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 border rounded-md text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border rounded-md text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Head Office Address
              </label>
              <input
                type="text"
                value={settings.headOffice || ""}
                onChange={(e) => setSettings({ ...settings, headOffice: e.target.value })}
                className="w-full px-3.5 py-2.5 border rounded-md text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Impact Counters (Ground Metrics)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Total Meals Served Counter
              </label>
              <input
                type="number"
                value={settings.totalMealsServed || 0}
                onChange={(e) => setSettings({ ...settings, totalMealsServed: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border rounded-md text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Total Patients Treated Counter
              </label>
              <input
                type="number"
                value={settings.patientsTreated || 0}
                onChange={(e) => setSettings({ ...settings, patientsTreated: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border rounded-md text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm rounded-md shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Publishing Real-Time Updates..." : "Save & Sync Real-Time Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
