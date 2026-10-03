"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Users,
  Award,
  Settings,
  FileSpreadsheet,
  Globe,
  LogOut,
  Menu,
  X,
  Camera,
  BookOpen,
  Calendar,
  Shield,
  Activity,
  Sliders,
  Bell,
  FileText,
} from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

const ADMIN_NAV = [
  { name: "Overview Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Notifications & Alerts", href: "/admin/notifications", icon: Bell },
  { name: "Donations & 80G Receipts", href: "/admin/donations", icon: Heart },
  { name: "Volunteers Pipeline", href: "/admin/volunteers", icon: Users },
  { name: "Memberships & Cards", href: "/admin/memberships", icon: Award },
  { name: "Content Management (CMS)", href: "/admin/cms", icon: Sliders },
  { name: "Team & Leadership", href: "/admin/team", icon: Users },
  { name: "Photo & Video Gallery", href: "/admin/gallery", icon: Camera },
  { name: "Blogs & Articles", href: "/admin/blogs", icon: BookOpen },
  { name: "Events Management", href: "/admin/events", icon: Calendar },
  { name: "Users & Roles (RBAC)", href: "/admin/users", icon: Shield },
  { name: "Security Audit Logs", href: "/admin/audit-logs", icon: FileText },
  { name: "Site Configuration", href: "/admin/settings", icon: Settings },
  { name: "Export Reports (CSV)", href: "/admin/reports", icon: FileSpreadsheet },
  { name: "System Health & Backup", href: "/admin/system-health", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebar, setMobileSidebar] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-72 h-screen bg-ngo-dark-900 text-white flex flex-col justify-between transition-transform duration-200 border-r border-ngo-dark-800 ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto flex-1">
          {/* Brand Logo */}
          <div className="p-5 border-b border-ngo-dark-800 flex items-center justify-between sticky top-0 bg-ngo-dark-900 z-10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-ngo-orange flex items-center justify-center font-bold text-white shadow-md text-base">
                ॐ
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm leading-tight text-white">
                  SSSS Admin
                </h3>
                <span className="text-[10px] text-ngo-orange-400 font-semibold block">
                  Prayagraj Seva Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebar(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebar(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-ngo-orange text-white shadow-md"
                      : "text-gray-400 hover:bg-ngo-dark-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-ngo-dark-800 space-y-2 bg-ngo-dark-900">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:bg-ngo-dark-800 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-ngo-orange shrink-0" />
            <span>Open Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out Administrator</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebar(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Super Admin Console &bull; Shree Bade Hanuman Ji Temple, Prayagraj
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/admin/notifications"
              className="p-2 text-gray-500 hover:text-ngo-orange hover:bg-gray-100 rounded-full relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ngo-orange" />
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
              ● Online (24 Hours Open)
            </span>
            <div className="w-8 h-8 rounded-full bg-ngo-orange text-white flex items-center justify-center font-bold text-xs shadow-sm">
              SA
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
