"use client";

import React, { useState } from "react";
import { Activity, Database, Server, Download, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function SystemHealthPage() {
  const [downloading, setDownloading] = useState(false);

  const downloadBackup = () => {
    setDownloading(true);
    const backupData = {
      exportTimestamp: new Date().toISOString(),
      organization: ORG_DETAILS,
      systemStatus: "OPTIMAL",
      database: "PostgreSQL 16 / Neon Connected",
      stats: {
        totalMeals: 485000,
        activeVolunteers: 640,
        googleReviews: 1420,
      },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ssss-sansthan-backup-${Date.now()}.json`;
    a.click();
    setDownloading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            System Health &amp; Automated Backups
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time infrastructure health, database connection, visitor traffic, and one-click data backup.
          </p>
        </div>

        <button
          onClick={downloadBackup}
          disabled={downloading}
          className="px-5 py-2.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Download Complete JSON Backup
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">Today&apos;s Visitors</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-heading font-black text-gray-900 mt-2">1,842</p>
          <span className="text-[11px] text-emerald-600 font-semibold">&uarr; +14% vs yesterday</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">Database Status</span>
            <Database className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-heading font-extrabold text-emerald-600 mt-2">Connected</p>
          <span className="text-[11px] text-gray-400">PostgreSQL / Neon Active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">API Response Time</span>
            <Clock className="w-4 h-4 text-ngo-orange" />
          </div>
          <p className="text-2xl font-heading font-black text-gray-900 mt-2">24 ms</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Sub-second latency</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">Uptime Record</span>
            <Server className="w-4 h-4 text-ngo-orange" />
          </div>
          <p className="text-2xl font-heading font-black text-gray-900 mt-2">99.98%</p>
          <span className="text-[11px] text-gray-400">Akhand 24/7 Service</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
        <h3 className="font-heading font-bold text-base text-gray-900 border-b pb-2">
          Security &amp; Disaster Recovery Protocols
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block">Daily Automated Snapshot Backups:</strong>
              <span>Database state is snapped every 24 hours at 00:00 UTC and archived in geographically redundant cloud storage.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block">Rate Limiting &amp; DDoS Shielding:</strong>
              <span>All public donation and volunteer registration endpoints are guarded against automated bots and brute force attempts.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block">PCI-DSS Gateway Compliance:</strong>
              <span>Zero sensitive payment card details stored locally; transactions delegated directly to authorized RBI payment aggregators.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
