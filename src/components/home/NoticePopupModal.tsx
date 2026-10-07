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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-float p-6 sm:p-8 border border-stone-200 border-t-2 border-t-orange-700 text-center space-y-4">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center mx-auto border border-stone-200">
          <Bell className="w-6 h-6 text-orange-700" />
        </div>

        <div>
          <span className="text-xs font-medium text-stone-800 tracking-wide bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
            Special Seva Announcement &bull; 2026
          </span>
          <h3 className="font-heading font-bold text-2xl text-stone-900 mt-2 tracking-tight">
            Mahakumbh &amp; Magh Mela Annapurna Bhandara
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Sarva Samarpit Sewa Sansthan has initiated preparations for 45 days of non-stop hot meal distribution at Sector 3, Sangam Ghat, Prayagraj. Over 15,000 pilgrims will be fed daily.
          </p>
        </div>

        <div className="p-3 bg-stone-50 rounded-md border border-stone-200 text-xs text-stone-700 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All meal sponsorships are 100% Tax Deductible under Section 80G.</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/donate"
            onClick={handleDismiss}
            className="flex-1 py-2.5 px-4 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" /> Sponsor Meals Now
          </Link>
          <button
            onClick={handleDismiss}
            className="py-2.5 px-4 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs sm:text-sm transition-colors border border-stone-200"
          >
            Remind Me Later
          </button>
        </div>
      </div>
    </div>
  );
}
