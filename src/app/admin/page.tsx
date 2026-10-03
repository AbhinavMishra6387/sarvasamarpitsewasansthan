import React from "react";
import Link from "next/link";
import { dbStore } from "@/lib/db-storage";
import {
  Heart,
  Users,
  Award,
  Utensils,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Sarva Samarpit Sewa Sansthan",
};

export default async function AdminDashboardPage() {
  const stats = await dbStore.getStats();
  const donations = (await dbStore.getDonations()).slice(0, 5);
  const volunteers = (await dbStore.getVolunteers()).slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-gray-900">
            Sansthan Live Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time analytics across Prayagraj feeding operations, donor contributions, and volunteer pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports"
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-ngo-orange" /> Export Data
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-ngo-orange hover:bg-ngo-orange-600 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            Edit CMS Settings
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Total Funds Raised</span>
            <h3 className="text-2xl font-heading font-black text-gray-900 mt-1">
              ₹ {stats.totalDonationAmount.toLocaleString("en-IN")}
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> {stats.totalDonationsCount} Successful Donations
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ngo-orange flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Active Volunteers</span>
            <h3 className="text-2xl font-heading font-black text-gray-900 mt-1">
              {stats.activeVolunteersCount}
            </h3>
            <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" /> {stats.pendingVolunteersCount} Pending Review
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ngo-orange flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Registered Members</span>
            <h3 className="text-2xl font-heading font-black text-gray-900 mt-1">
              {stats.activeMembersCount}
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Verified QR Cards
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ngo-orange flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Warm Meals Served</span>
            <h3 className="text-2xl font-heading font-black text-gray-900 mt-1">
              {stats.mealsServed.toLocaleString("en-IN")}
            </h3>
            <span className="text-[11px] text-ngo-orange-700 font-bold flex items-center gap-1 mt-1">
              24/7 Akhand Bhandara
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-ngo-orange flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Donations & Volunteers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Donations */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-gray-900">
              Recent Verified Donations
            </h4>
            <Link
              href="/admin/donations"
              className="text-xs font-bold text-ngo-orange hover:text-ngo-orange-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100 overflow-x-auto">
            {donations.map((d) => (
              <div key={d.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <strong className="text-gray-900 block text-sm">{d.donorName}</strong>
                  <span className="text-gray-400 font-mono text-[11px]">{d.receiptNo}</span>
                  <span className="text-gray-500 block text-[11px] mt-0.5">{d.campaignTitle}</span>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-heading font-black text-sm text-gray-900 block">
                    ₹ {d.amount.toLocaleString("en-IN")}
                  </span>
                  <a
                    href={`/api/donations/receipt/${d.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-ngo-orange hover:underline font-bold flex items-center gap-1 justify-end mt-1"
                  >
                    <Printer className="w-3 h-3" /> 80G Receipt
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Applications */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-gray-900">
              Volunteer Queue
            </h4>
            <Link
              href="/admin/volunteers"
              className="text-xs font-bold text-ngo-orange hover:text-ngo-orange-700 flex items-center gap-1"
            >
              <span>Manage Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {volunteers.map((v) => (
              <div
                key={v.id}
                className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <strong className="text-gray-900 block text-sm">{v.fullName}</strong>
                  <span className="text-gray-500 text-[11px]">{v.city} &bull; {v.occupation || "Volunteer"}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    v.status === "APPROVED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
