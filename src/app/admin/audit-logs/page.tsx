"use client";

import React, { useState } from "react";
import { ShieldCheck, Search, Clock, FileText, User } from "lucide-react";

const AUDIT_LOGS = [
  {
    id: "log-1",
    action: "STATUS_UPDATE",
    entity: "Volunteer (VOL-PRG-0102)",
    details: "Approved volunteer status for Dr. Ananya Mishra",
    performedBy: "admin@sarvasamarpit.org",
    role: "SUPER_ADMIN",
    ip: "103.21.124.58",
    time: "2026-10-01 21:05:12",
  },
  {
    id: "log-2",
    action: "REFUND_PROCESSED",
    entity: "Donation (SSSS-2026-RCP-1081)",
    details: "Processed accidental duplicate debit refund of ₹2,100",
    performedBy: "admin@sarvasamarpit.org",
    role: "SUPER_ADMIN",
    ip: "103.21.124.58",
    time: "2026-10-01 20:42:30",
  },
  {
    id: "log-3",
    action: "CMS_SETTINGS_UPDATE",
    entity: "SiteConfiguration",
    details: "Updated announcement ticker message and helpline phone number",
    performedBy: "editor@sarvasamarpit.org",
    role: "EDITOR",
    ip: "103.21.124.90",
    time: "2026-10-01 19:15:00",
  },
  {
    id: "log-4",
    action: "REPORT_EXPORT",
    entity: "Donations Ledger",
    details: "Generated full CSV export for FY 2026 statutory audit",
    performedBy: "admin@sarvasamarpit.org",
    role: "SUPER_ADMIN",
    ip: "103.21.124.58",
    time: "2026-10-01 18:30:45",
  },
  {
    id: "log-5",
    action: "USER_LOGIN",
    entity: "AuthSession",
    details: "Successful admin authentication via JWT",
    performedBy: "admin@sarvasamarpit.org",
    role: "SUPER_ADMIN",
    ip: "103.21.124.58",
    time: "2026-10-01 18:00:10",
  },
];

export default function AdminAuditLogsPage() {
  const [filter, setFilter] = useState("");

  const filtered = AUDIT_LOGS.filter(
    (l) =>
      l.details.toLowerCase().includes(filter.toLowerCase()) ||
      l.action.toLowerCase().includes(filter.toLowerCase()) ||
      l.performedBy.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Security Audit Trail &amp; Activity Logs
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Immutable audit record of all administrative operations, logins, status approvals, and financial exports.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter audit logs by action, user, or details..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full text-xs sm:text-sm focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Details</th>
                <th className="p-4">Performed By</th>
                <th className="p-4">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                    {log.time}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-ngo-orange-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">{log.entity}</td>
                  <td className="p-4 text-gray-600 max-w-xs">{log.details}</td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-800 block">{log.performedBy}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{log.role}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-gray-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
