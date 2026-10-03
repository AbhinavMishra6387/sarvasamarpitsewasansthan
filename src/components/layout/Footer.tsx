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
    <footer className="bg-ngo-dark-900 text-gray-300 pt-16 pb-8 border-t-4 border-ngo-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-ngo-dark-700">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ngo-orange flex items-center justify-center text-white font-bold text-lg shadow-md">
                <span>ॐ</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base leading-tight">
                  {ORG_DETAILS.name}
                </h3>
                <p className="text-xs text-ngo-orange-400 font-medium">
                  {ORG_DETAILS.hindiName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Serving the divine and humanity through round-the-clock Annapurna Bhandara, free medical health camps, pilgrim assistance, and sacred cleanliness drives at Triveni Sangam, Prayagraj.
            </p>

            <div className="bg-ngo-dark-800 p-3.5 rounded-xl border border-ngo-dark-700 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Operating 24 Hours Daily</span>
              </div>
              <div className="text-gray-400">
                Reg No: <span className="text-gray-200 font-medium">{ORG_DETAILS.registrationNo}</span>
              </div>
              <div className="text-gray-400">
                80G Exemption: <span className="text-ngo-orange-300 font-medium">{ORG_DETAILS.section80G}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & About */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-3 border-ngo-orange pl-2.5">
              About Sansthan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-ngo-orange transition-colors flex items-center gap-1.5 text-gray-400 hover:text-white"
                  >
                    <span className="text-ngo-orange">&rsaquo;</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Seva Programs & Compliance */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-3 border-ngo-orange pl-2.5">
              Seva & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-ngo-orange transition-colors flex items-center gap-1.5 text-gray-400 hover:text-white"
                  >
                    <span className="text-ngo-orange">&rsaquo;</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Head Office & 24/7 Helpline */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-3 border-ngo-orange pl-2.5">
              Head Office Contact
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ngo-orange shrink-0 mt-0.5" />
                <span>
                  {ORG_DETAILS.headOffice}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ngo-orange shrink-0" />
                <a
                  href={`tel:${ORG_DETAILS.phone}`}
                  className="font-bold text-white hover:text-ngo-orange transition-colors"
                >
                  {ORG_DETAILS.phone} (24x7 Helpline)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ngo-orange shrink-0" />
                <a
                  href={`mailto:${ORG_DETAILS.email}`}
                  className="hover:text-ngo-orange transition-colors"
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us (+91 94508 58514)
              </a>

              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-ngo-dark-800 hover:bg-ngo-dark-700 text-gray-300 hover:text-white rounded-lg text-xs font-semibold border border-ngo-dark-600 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-ngo-orange" /> Open Google Business Profile & Map
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
