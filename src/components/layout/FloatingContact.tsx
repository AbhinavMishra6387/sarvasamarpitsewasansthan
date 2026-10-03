"use client";

import React from "react";
import { Phone, MessageCircle, Heart } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";
import Link from "next/link";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Donate Floating Button */}
      <Link
        href="/donate"
        className="flex items-center gap-2 bg-gradient-to-r from-ngo-orange-600 to-ngo-orange-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-glow hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold group"
      >
        <Heart className="w-4 h-4 fill-white animate-pulse" />
        <span className="hidden sm:inline">Donate Now (80G)</span>
        <span className="sm:hidden">Donate</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Call 24/7 Button */}
        <a
          href={`tel:${ORG_DETAILS.phone}`}
          title="Call 24/7 Helpline: 09450858514"
          className="w-11 h-11 rounded-full bg-ngo-dark-800 text-white flex items-center justify-center shadow-lg hover:bg-ngo-dark-700 hover:scale-110 active:scale-95 transition-all border border-gray-700"
        >
          <Phone className="w-5 h-5 text-ngo-orange-400" />
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href={`https://wa.me/919450858514?text=${encodeURIComponent("Jai Shree Ram! I would like to connect with Sarva Samarpit Sewa Sansthan.")}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 94508 58514)"
          className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
      </div>
    </div>
  );
}
