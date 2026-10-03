"use client";

import React, { useState } from "react";
import { X, Copy, Check, QrCode, Smartphone, ShieldCheck } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

interface UpiQrModalProps {
  amount: number;
  donation: any;
  order: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpiQrModal({ amount, donation, order, onClose, onSuccess }: UpiQrModalProps) {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");

  const copyUpiId = () => {
    navigator.clipboard.writeText(ORG_DETAILS.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    setVerifying(true);
    try {
      const res = await fetch("/api/donations/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId: donation.id,
          paymentId: utrNumber || `UPI-APP-${Date.now()}`,
          gateway: "UPI_QR",
        }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifying(false);
    }
  };

  const upiIntentUrl = order.upiString || `upi://pay?pa=${ORG_DETAILS.upiId}&pn=${encodeURIComponent(ORG_DETAILS.name)}&am=${amount}&cu=INR`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border-t-4 border-ngo-orange">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex p-3 rounded-full bg-orange-100 text-ngo-orange mb-3">
          <QrCode className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-heading font-extrabold text-gray-900">
          Scan &amp; Pay via Any UPI App
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Open Google Pay, PhonePe, Paytm, or BHIM and scan below
        </p>

        {/* Amount Pill */}
        <div className="my-4 bg-orange-50 border border-orange-200 py-2.5 px-4 rounded-xl inline-block">
          <span className="text-xs text-gray-600 block">Amount to Donate</span>
          <span className="text-2xl font-extrabold text-ngo-orange-700">
            ₹ {amount.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Visual QR Code Display */}
        <div className="flex justify-center my-3">
          <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-2xl shadow-inner inline-block">
            {/* Generated QR Code Image using standard QR service */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiIntentUrl)}&color=2D-2D-2D`}
              alt="Sarva Samarpit Sewa Sansthan UPI QR"
              width={180}
              height={180}
              className="rounded-lg mx-auto"
            />
            <p className="text-[10px] text-gray-500 mt-2 font-mono font-semibold">
              BHIM UPI &bull; PhonePe &bull; GPay &bull; Paytm
            </p>
          </div>
        </div>

        {/* UPI ID Pill with Copy Button */}
        <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-xl flex items-center justify-between gap-2 text-xs mb-4">
          <div className="text-left overflow-hidden">
            <span className="text-gray-500 text-[10px] block font-medium">Official Sansthan UPI ID:</span>
            <span className="font-mono font-bold text-gray-800 truncate block">{ORG_DETAILS.upiId}</span>
          </div>
          <button
            onClick={copyUpiId}
            className="flex items-center gap-1 bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 font-semibold transition-all shrink-0 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Mobile UPI App Button (for mobile users) */}
        <a
          href={upiIntentUrl}
          className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs flex items-center justify-center gap-2 mb-4 transition-colors"
        >
          <Smartphone className="w-4 h-4" /> Tap to Open Installed UPI App
        </a>

        {/* Optional UTR / Reference input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter 12-digit UPI Ref / UTR (Optional)"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl text-center focus:outline-none focus:border-ngo-orange"
          />
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={verifying}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4" />
          {verifying ? "Verifying Payment..." : "I Have Completed Payment &rarr;"}
        </button>
      </div>
    </div>
  );
}
