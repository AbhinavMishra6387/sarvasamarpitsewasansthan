"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Heart, Bell, ShieldCheck, ArrowRight } from "lucide-react";

export function NoticePopupModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup once after 2.5 seconds if not dismissed previously
    const dismissed = sessionStorage.getItem("ssss_popup_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("ssss_popup_dismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-t-4 border-ngo-orange text-center space-y-4">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-ngo-orange flex items-center justify-center mx-auto shadow-inner">
          <Bell className="w-7 h-7 text-ngo-orange" />
        </div>

        <div>
          <span className="text-xs font-bold text-ngo-orange uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
            Special Seva Announcement &bull; 2026
          </span>
          <h3 className="font-heading font-black text-2xl text-gray-900 mt-2">
            Mahakumbh &amp; Magh Mela Annapurna Bhandara
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Sarva Samarpit Sewa Sansthan has initiated preparations for 45 days of non-stop hot meal distribution at Sector 3, Sangam Ghat, Prayagraj. Over 15,000 pilgrims will be fed daily.
          </p>
        </div>

        <div className="p-3.5 bg-orange-50/70 rounded-2xl border border-orange-200 text-xs text-gray-700 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All meal sponsorships are 100% Tax Deductible under Section 80G.</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/donate"
            onClick={handleDismiss}
            className="flex-1 py-3 px-5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" /> Sponsor Meals Now
          </Link>
          <button
            onClick={handleDismiss}
            className="py-3 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition-colors"
          >
            Remind Me Later
          </button>
        </div>
      </div>
    </div>
  );
}
