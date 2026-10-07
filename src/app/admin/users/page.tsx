"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, CheckCircle2, Lock } from "lucide-react";

const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "CONTENT_MANAGER",
  "DONATION_MANAGER",
  "VOLUNTEER_MANAGER",
  "ACCOUNT_MANAGER",
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([
    {
      id: "usr-1",
      name: "Sansthan Super Admin",
      email: "admin@sarvasamarpit.org",
      role: "SUPER_ADMIN",
      isActive: true,
      lastLogin: "Active Now",
    },
    {
      id: "usr-2",
      name: "Media & Seva Coordinator",
      email: "editor@sarvasamarpit.org",
      role: "EDITOR",
      isActive: true,
      lastLogin: "Yesterday",
    },
    {
      id: "usr-3",
      name: "Bhandara Accounts Officer",
      email: "accounts@sarvasamarpit.org",
      role: "ACCOUNT_MANAGER",
      isActive: true,
      lastLogin: "2 days ago",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("EDITOR");

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    setUsers([
      ...users,
      {
        id: `usr-${Date.now()}`,
        name: newName,
        email: newEmail,
        role: newRole,
        isActive: true,
        lastLogin: "Never",
      },
    ]);
    setShowModal(false);
    setNewName("");
    setNewEmail("");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Administrator Roles &amp; Permissions (RBAC)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage granular access privileges for Super Admins, Donation Managers, Volunteer Leads, and Editors.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add System User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{u.name}</td>
                <td className="p-4 font-mono text-gray-600">{u.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-orange-100 text-ngo-orange-800">
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="p-4 text-gray-500">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4 shadow-xs">
        <h4 className="font-heading font-bold text-base text-gray-900">
          Role-Based Access Control (RBAC) Permission Matrix
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-orange-50/70 rounded-lg border border-orange-200 space-y-1.5">
            <strong className="text-gray-900 block font-bold">SUPER_ADMIN</strong>
            <p className="text-gray-600">Unrestricted full control over financial ledgers, audit logs, user management, and real-time CMS settings.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
            <strong className="text-gray-900 block font-bold">DONATION_MANAGER</strong>
            <p className="text-gray-600">Access to payment gateways, transaction verification, 80G tax receipt generation, and refund administration.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
            <strong className="text-gray-900 block font-bold">VOLUNTEER_MANAGER</strong>
            <p className="text-gray-600">Authorized to review applicant dossiers, verify photo IDs, and approve or reject sevadar applications.</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">Add Administrator Account</h3>
            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">User Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Seva Coordinator"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. coordinator@sarvasamarpit.org"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange bg-white"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-ngo-orange text-white rounded-md font-bold">
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-md font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
