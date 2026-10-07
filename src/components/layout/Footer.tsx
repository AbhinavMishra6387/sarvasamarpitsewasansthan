"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { ORG_DETAILS, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center text-white font-semibold text-base shadow-xs">
                <span>ॐ</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white text-base leading-tight">
                  {ORG_DETAILS.name}
                </h3>
                <p className="text-xs text-orange-400 font-medium">
                  {ORG_DETAILS.hindiName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Serving the divine and humanity through round-the-clock Annapurna Bhandara, free medical health camps, pilgrim assistance, and sacred cleanliness drives at Triveni Sangam, Prayagraj.
            </p>

            <div className="bg-stone-900 p-3.5 rounded-md border border-stone-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Clock className="w-4 h-4" />
                <span>Operating 24 Hours Daily</span>
              </div>
              <div className="text-stone-400">
                Reg No: <span className="text-stone-200 font-medium">{ORG_DETAILS.registrationNo}</span>
              </div>
              <div className="text-stone-400">
                80G Exemption: <span className="text-orange-300 font-medium">{ORG_DETAILS.section80G}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & About */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-700 pl-2.5">
              About Sansthan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-stone-400 hover:text-white"
                  >
                    <span className="text-orange-500">&rsaquo;</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Seva Programs & Compliance */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-700 pl-2.5">
              Seva & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-stone-400 hover:text-white"
                  >
                    <span className="text-orange-500">&rsaquo;</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Head Office & 24/7 Helpline */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-700 pl-2.5">
              Head Office Contact
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  {ORG_DETAILS.headOffice}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a
                  href={`tel:${ORG_DETAILS.phone}`}
                  className="font-medium text-white hover:text-orange-400 transition-colors"
                >
                  {ORG_DETAILS.phone} (24x7 Helpline)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a
                  href={`mailto:${ORG_DETAILS.email}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  {ORG_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/919450858514?text=${encodeURIComponent("Jai Shree Ram! I would like to inquire about Sarva Samarpit Sewa Sansthan seva and donation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us (+91 94508 58514)
              </a>

              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-black text-stone-300 hover:text-white rounded-md text-xs font-medium border border-stone-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-orange-400" /> Open Google Business Profile & Map
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & 80G Assurance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {ORG_DETAILS.name}. All Rights Reserved. Reg. Charitable Trust (Prayagraj).
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Tax Deductible (80G)
            </span>
            <span>&bull;</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>&bull;</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
            <span>&bull;</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
