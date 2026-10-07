import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Heart, Phone } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-24 h-24 rounded-lg bg-orange-100 text-ngo-orange flex items-center justify-center font-heading font-bold text-4xl mx-auto shadow-inner">
          404
        </div>

        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">
          The page or seva program you are looking for may have been moved, renamed, or is temporarily undergoing maintenance.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/donate"
            className="px-6 py-3 rounded-md bg-ngo-dark hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" /> Donate Now
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Need assistance? Call our 24/7 Helpline: <strong>{ORG_DETAILS.phone}</strong>
        </p>
      </div>
    </div>
  );
}
