"use client";

import React from "react";
import Link from "next/link";
import { Bell, ArrowRight, Heart } from "lucide-react";

export function NoticeTicker() {
  return (
    <div className="bg-ngo-dark-800 text-white text-xs py-2 px-4 border-b border-ngo-dark-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="flex items-center gap-1 bg-ngo-orange px-2 py-0.5 rounded text-[11px] font-bold text-white uppercase tracking-wider shrink-0 animate-pulse">
            <Bell className="w-3 h-3" /> Announcement
          </span>
          <p className="truncate text-gray-200 text-xs sm:text-sm">
            <span className="font-semibold text-ngo-orange-300">Jai Shree Ram!</span> Daily Akhand Annapurna Bhandara & Free Health Camps running 24x7 at Bade Hanuman Ji Temple, Sangam Marg, Prayagraj.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-[11px] sm:text-xs">
          <Link
            href="/donate"
            className="text-ngo-orange-400 hover:text-ngo-orange-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <Heart className="w-3 h-3 fill-current" /> Sponsor Today&apos;s Prasad <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-gray-400 hidden md:inline">|</span>
          <span className="text-emerald-400 font-medium hidden md:inline">● 24x7 Seva Helpline Active</span>
        </div>
      </div>
    </div>
  );
}
