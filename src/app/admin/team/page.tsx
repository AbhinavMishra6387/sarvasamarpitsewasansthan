"use client";

import React, { useState } from "react";
import { Users, Plus, Trash2, Edit3, CheckCircle2, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([
    {
      id: "tm-1",
      name: "Dr. Ramesh Chandra Pandey",
      designation: "President / Managing Trustee",
      committee: "Trustee",
      phone: "+91 94508 58514",
      displayOrder: 1,
      isFeatured: true,
      visible: true,
    },
    {
      id: "tm-2",
      name: "Shri Krishna Murari Shukla",
      designation: "Vice President & Seva Director",
      committee: "Trustee",
      phone: "+91 94508 58514",
      displayOrder: 2,
      isFeatured: true,
      visible: true,
    },
    {
      id: "tm-3",
      name: "CA Satish Kumar Agarwal",
      designation: "Treasurer & Financial Trustee",
      committee: "Trustee",
      phone: "+91 94508 58514",
      displayOrder: 3,
      isFeatured: true,
      visible: true,
    },
    {
      id: "tm-4",
      name: "Dr. Ananya Mishra",
      designation: "Chief Medical Officer (Volunteer)",
      committee: "Executive",
      phone: "+91 94511 22334",
      displayOrder: 4,
      isFeatured: true,
      visible: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newCommittee, setNewCommittee] = useState("Executive");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newMember = {
      id: `tm-${Date.now()}`,
      name: newName,
      designation: newDesignation || "Sevadar Coordinator",
      committee: newCommittee,
      phone: "+91 94508 58514",
      displayOrder: members.length + 1,
      isFeatured: false,
      visible: true,
    };
    setMembers([...members, newMember]);
    setShowAddModal(false);
    setNewName("");
    setNewDesignation("");
  };

  const toggleVisibility = (id: string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m)));
  };

  const deleteMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            Team &amp; Leadership Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Add trustees, executive coordinators, and field captains. Changes reflect live on public About pages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Committee</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-400">#{m.displayOrder}</td>
                <td className="p-4 font-bold text-gray-900">{m.name}</td>
                <td className="p-4 text-gray-700">{m.designation}</td>
                <td className="p-4 font-semibold text-ngo-orange">{m.committee}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      m.visible ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {m.visible ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleVisibility(m.id)}
                      className="p-1.5 text-gray-500 hover:text-ngo-orange rounded-lg hover:bg-gray-100"
                      title="Toggle Visibility"
                    >
                      {m.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">Add New Team Member</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pandit Shivendra Nath"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Head Priest & Bhandara Incharge"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Committee</label>
                <select
                  value={newCommittee}
                  onChange={(e) => setNewCommittee(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-ngo-orange bg-white"
                >
                  <option value="Trustee">Board of Trustees</option>
                  <option value="Executive">Executive Committee</option>
                  <option value="Volunteer Lead">Volunteer Head</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-ngo-orange hover:bg-ngo-orange-600 text-white rounded-xl font-bold"
                >
                  Save Team Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
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
