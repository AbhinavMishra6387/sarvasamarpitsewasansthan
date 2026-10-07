"use client";

import React from "react";
import { Phone, MessageCircle, Heart } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";
import Link from "next/link";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Quick Donate Floating Button */}
      <Link
        href="/donate"
        className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-3.5 py-2 rounded-md shadow-float transition-colors text-xs sm:text-sm font-medium border border-orange-600/40 group"
      >
        <Heart className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">Donate Now (80G)</span>
        <span className="sm:hidden">Donate</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Call 24/7 Button */}
        <a
          href={`tel:${ORG_DETAILS.phone}`}
          title="Call 24/7 Helpline: 09450858514"
          className="w-10 h-10 rounded-md bg-stone-900 text-stone-200 hover:text-white hover:bg-black flex items-center justify-center shadow-float transition-colors border border-stone-800"
        >
          <Phone className="w-4 h-4 text-orange-400" />
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href={`https://wa.me/919450858514?text=${encodeURIComponent("Jai Shree Ram! I would like to connect with Sarva Samarpit Sewa Sansthan.")}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 94508 58514)"
          className="w-10 h-10 rounded-md bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center shadow-float transition-colors border border-emerald-600/60"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
        </a>
      </div>
    </div>
  );
}
