import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, FileSpreadsheet, ArrowDownToLine, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Export Reports | Sarva Samarpit Sewa Sansthan Admin",
};

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-black text-gray-900">
          Data Export &amp; Statutory Compliance Reports
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Export verified transaction sheets, volunteer contact rosters, and membership registers in CSV / Excel format.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-gray-900">
              Donations &amp; 80G Receipts
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Export all completed and verified donations with donor PAN numbers, UTR IDs, and campaign categories.
            </p>
          </div>

          <a
            href="/api/admin/export?type=donations"
            download
            className="w-full py-2.5 px-4 bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <ArrowDownToLine className="w-4 h-4" /> Download Donations CSV
          </a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-gray-900">
              Volunteers Roster
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Export all applicant records including phone numbers, availability slots, skills, and current approval status.
            </p>
          </div>

          <a
            href="/api/admin/export?type=volunteers"
            download
            className="w-full py-2.5 px-4 bg-ngo-dark hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <ArrowDownToLine className="w-4 h-4" /> Download Volunteers CSV
          </a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-gray-900">
              Memberships Register
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Export complete roster of annual and life members, validity dates, membership IDs, and blood groups.
            </p>
          </div>

          <a
            href="/api/admin/export?type=memberships"
            download
            className="w-full py-2.5 px-4 bg-gray-700 hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <ArrowDownToLine className="w-4 h-4" /> Download Memberships CSV
          </a>
        </div>
      </div>
    </div>
  );
}
