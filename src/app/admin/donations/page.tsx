"use client";

import React, { useState } from "react";
import { Download, Search, Printer, RotateCcw, ShieldCheck, ArrowDownToLine, AlertCircle } from "lucide-react";

export default function AdminDonationsPage() {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [refundModal, setRefundModal] = useState<any>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundLoading, setRefundLoading] = useState(false);

  const [list, setList] = useState<any[]>([
    {
      id: "don-001",
      receiptNo: "SSSS-2026-RCP-1082",
      donorName: "Rajesh Kumar Sharma",
      donorPhone: "+91 98390 12345",
      amount: 5100,
      paymentGateway: "UPI_QR",
      paymentStatus: "SUCCESS",
      campaignTitle: "Daily Annapurna Bhandara Seva",
      panNumber: "ABCPS1234F",
      createdAt: "2026-09-28T10:15:00Z",
    },
    {
      id: "don-002",
      receiptNo: "SSSS-2026-RCP-1083",
      donorName: "Sunita Devi Verma",
      donorPhone: "+91 94151 78901",
      amount: 11000,
      paymentGateway: "RAZORPAY",
      paymentStatus: "SUCCESS",
      campaignTitle: "Free Triveni Sangam Medical Health Camp",
      panNumber: "BNMPV5678K",
      createdAt: "2026-09-29T14:20:00Z",
    },
    {
      id: "don-003",
      receiptNo: "SSSS-2026-RCP-1084",
      donorName: "Anonymous Devotee",
      donorPhone: "+91 94508 58514",
      amount: 2100,
      paymentGateway: "PHONEPE",
      paymentStatus: "SUCCESS",
      campaignTitle: "Shree Bade Hanuman Ji Akhand Prasad Seva",
      panNumber: "N/A",
      createdAt: "2026-09-30T09:00:00Z",
    },
    {
      id: "don-004",
      receiptNo: "SSSS-2026-RCP-1085",
      donorName: "Amitabh Srivastava",
      donorPhone: "+91 99182 34567",
      amount: 25000,
      paymentGateway: "BANK_TRANSFER",
      paymentStatus: "SUCCESS",
      campaignTitle: "Winter Blanket & Clothing Distribution",
      panNumber: "AAAPS7711M",
      createdAt: "2026-09-30T16:45:00Z",
    },
  ]);

  const handleProcessRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModal) return;
    setRefundLoading(true);

    try {
      const res = await fetch("/api/admin/donations/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId: refundModal.id,
          reason: refundReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setList((prev) =>
          prev.map((d) => (d.id === refundModal.id ? { ...d, paymentStatus: "REFUNDED" } : d))
        );
        setRefundModal(null);
        setRefundReason("");
      } else {
        alert(data.error || "Refund failed.");
      }
    } catch (e) {
      alert("Error processing refund.");
    } finally {
      setRefundLoading(false);
    }
  };

  const filtered = list.filter((item) => {
    const matchesSearch =
      item.donorName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.receiptNo.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.campaignTitle.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesStatus = selectedStatus === "ALL" || item.paymentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            Donations Ledger &amp; Refund Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Complete transaction ledger with verified 80G receipts, PAN data, and statutory refund administration.
          </p>
        </div>

        <a
          href="/api/admin/export?type=donations"
          download
          className="px-4 py-2.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <ArrowDownToLine className="w-4 h-4" /> Download Complete CSV Ledger
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by donor name, receipt number, or cause..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full text-xs sm:text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 font-semibold shrink-0">Filter Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 border rounded-xl bg-white focus:outline-none focus:border-ngo-orange"
          >
            <option value="ALL">All Transactions</option>
            <option value="SUCCESS">Success Only</option>
            <option value="PENDING">Pending</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Receipt No</th>
                <th className="p-4">Donor Details</th>
                <th className="p-4">Seva Cause</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-ngo-orange">
                    {d.receiptNo}
                  </td>
                  <td className="p-4">
                    <strong className="text-gray-900 block">{d.donorName}</strong>
                    <span className="text-gray-500 text-[11px]">{d.donorPhone}</span>
                    {d.panNumber && (
                      <span className="block text-[10px] text-gray-400 font-mono">PAN: {d.panNumber}</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-700 max-w-xs truncate">
                    {d.campaignTitle}
                  </td>
                  <td className="p-4 font-heading font-black text-gray-900 text-sm">
                    ₹ {d.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 font-semibold text-gray-600">
                    {d.paymentGateway}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        d.paymentStatus === "SUCCESS"
                          ? "bg-emerald-100 text-emerald-800"
                          : d.paymentStatus === "REFUNDED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {d.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/api/donations/receipt/${d.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-ngo-orange text-ngo-orange hover:text-white font-bold text-[11px] transition-colors"
                        title="Print 80G Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" /> Receipt
                      </a>
                      {d.paymentStatus === "SUCCESS" && (
                        <button
                          onClick={() => setRefundModal(d)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 font-bold text-[11px] transition-colors"
                          title="Process Refund"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {refundModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Donation Refund</span>
            </div>
            <p className="text-xs text-gray-600">
              You are processing a refund for <strong>{refundModal.receiptNo}</strong> (₹ {refundModal.amount.toLocaleString("en-IN")}) to donor <strong>{refundModal.donorName}</strong>.
            </p>

            <form onSubmit={handleProcessRefund} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Reason for Refund *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Duplicate debit or accidental extra donation requested by donor"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={refundLoading}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {refundLoading ? "Processing Reversal..." : "Confirm & Reverse"}
                </button>
                <button
                  type="button"
                  onClick={() => setRefundModal(null)}
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
