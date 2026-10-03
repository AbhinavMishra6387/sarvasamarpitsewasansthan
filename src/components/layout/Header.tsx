"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Search,
} from "lucide-react";
import { ORG_DETAILS, NAVIGATION_LINKS } from "@/lib/constants";
import { NoticeTicker } from "./NoticeTicker";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-200">
      {/* Notice Board Ticker */}
      <NoticeTicker />

      {/* Top Bar with Organization Info */}
      <div className="bg-ngo-dark-900 text-gray-300 text-xs py-2 px-4 border-b border-ngo-dark-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href={`tel:${ORG_DETAILS.phone}`}
              className="flex items-center gap-1.5 hover:text-ngo-orange-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-ngo-orange" />
              <span className="font-semibold">{ORG_DETAILS.phone}</span>
            </a>
            <a
              href={`mailto:${ORG_DETAILS.email}`}
              className="flex items-center gap-1.5 hover:text-ngo-orange-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-ngo-orange" />
              <span>{ORG_DETAILS.email}</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-ngo-orange" />
              <span>Bade Hanuman Ji Temple, Sangam Marg, Prayagraj</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <Clock className="w-3 h-3" />
              <span>Open 24 Hours</span>
            </span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-ngo-orange-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>80G Tax Exemption</span>
            </span>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-white transition-colors ml-2 underline text-[11px]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-ngo-orange-600 to-ngo-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-ngo-orange/30 group-hover:scale-105 transition-transform">
            <span>ॐ</span>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-lg sm:text-xl text-ngo-dark tracking-tight leading-tight group-hover:text-ngo-orange transition-colors">
              Sarva Samarpit Sewa Sansthan
            </span>
            <span className="block text-[11px] sm:text-xs text-ngo-orange-600 font-medium">
              Registered Charitable Trust &bull; Prayagraj Sangam (UP)
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAVIGATION_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const hasSub = Boolean(link.subLinks);

            if (link.highlight) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="ml-3 px-5 py-2.5 rounded-full bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-sm shadow-md shadow-ngo-orange/25 hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  {link.name}
                </Link>
              );
            }

            return (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => hasSub && setOpenDropdown(link.name)}
                onMouseLeave={() => hasSub && setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${
                    isActive
                      ? "text-ngo-orange font-semibold"
                      : "text-ngo-dark-600 hover:text-ngo-orange hover:bg-orange-50/50"
                  }`}
                >
                  {link.name}
                  {hasSub && <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-ngo-orange" />}
                </Link>

                {hasSub && openDropdown === link.name && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-card border border-gray-100 py-2 mt-0 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {link.subLinks?.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-orange-50 hover:text-ngo-orange font-medium transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 ml-1 text-gray-500 hover:text-ngo-orange hover:bg-orange-50 rounded-full transition-colors"
            title="Global Search (Projects, Blogs, Events)"
            aria-label="Global Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 text-gray-600 hover:text-ngo-orange"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/donate"
            className="px-3.5 py-1.5 rounded-full bg-ngo-orange text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 fill-white" /> Donate
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-ngo-orange hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {NAVIGATION_LINKS.map((link) => {
              const hasSub = Boolean(link.subLinks);
              return (
                <div key={link.name} className="border-b border-gray-50 pb-1">
                  {hasSub ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-gray-800 hover:text-ngo-orange"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? "rotate-180 text-ngo-orange" : ""}`} />
                      </button>
                      {openDropdown === link.name && (
                        <div className="pl-4 pb-2 space-y-1 bg-orange-50/40 rounded-lg py-1">
                          {link.subLinks?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2 text-xs font-medium text-gray-600 hover:text-ngo-orange"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2.5 text-sm font-medium rounded-md ${
                        link.highlight
                          ? "bg-ngo-orange text-white text-center font-bold mt-2"
                          : "text-gray-800 hover:text-ngo-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-ngo-orange" />
              <span>Helpline: {ORG_DETAILS.phone} (24 Hours)</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-ngo-orange" />
              <span>Bade Hanuman Ji Temple, Sangam Marg, Prayagraj</span>
            </p>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
