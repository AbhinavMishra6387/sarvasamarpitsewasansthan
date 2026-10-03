"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
} from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";
import { UpiQrModal } from "./UpiQrModal";

const PRESET_AMOUNTS = [501, 1100, 2100, 5100, 11000, 21000];

const SEVA_CAUSES = [
  "Daily Annapurna Bhandara (Sangam Food Seva)",
  "Free Healthcare Clinic & Medicines",
  "Shree Bade Hanuman Ji Akhand Seva",
  "Winter Blanket & Warm Clothing Seva",
  "Child Education & Nutrition Kits",
  "General Trust Fund (Wherever most needed)",
];

export function DonationForm({ initialCause }: { initialCause?: string }) {
  const router = useRouter();

  // Form State
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number>(2100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCause, setSelectedCause] = useState<string>(initialCause || SEVA_CAUSES[0]);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [claim80G, setClaim80G] = useState(true);
  const [gateway, setGateway] = useState<"RAZORPAY" | "PHONEPE" | "UPI_QR" | "BANK">("RAZORPAY");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [pendingDonationData, setPendingDonationData] = useState<any>(null);

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!finalAmount || finalAmount < 1) {
      setErrorMessage("Please enter a donation amount of at least ₹1.");
      return;
    }

    if (!donorName && !isAnonymous) {
      setErrorMessage("Please enter your name or choose Anonymous donation.");
      return;
    }

    if (!donorPhone) {
      setErrorMessage("Please provide a valid 10-digit mobile number for confirmation.");
      return;
    }

    if (claim80G && panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      setErrorMessage("Please enter a valid 10-character PAN number (e.g. ABCDE1234F) for 80G tax benefit.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (gateway === "BANK") {
        // Direct bank transfer confirmation
        const res = await fetch("/api/donations/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donorName: isAnonymous ? "Anonymous Devotee" : donorName,
            donorEmail,
            donorPhone,
            panNumber: panNumber.toUpperCase(),
            address,
            amount: finalAmount,
            campaignTitle: selectedCause,
            paymentGateway: "BANK_TRANSFER",
            isAnonymous,
            is80GClaimed: claim80G,
          }),
        });
        const data = await res.json();
        if (data.success) {
          router.push(`/donate/success?id=${data.donation.id}&mode=bank`);
        } else {
          setErrorMessage(data.error || "Failed to create donation.");
        }
        setIsSubmitting(false);
        return;
      }

      // Create order via API
      const res = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: isAnonymous ? "Anonymous Devotee" : donorName,
          donorEmail,
          donorPhone,
          panNumber: panNumber.toUpperCase(),
          address,
          amount: finalAmount,
          campaignTitle: selectedCause,
          paymentGateway: gateway,
          isAnonymous,
          is80GClaimed: claim80G,
        }),
      });

      const orderResult = await res.json();

      if (!orderResult.success) {
        throw new Error(orderResult.error || "Unable to initialize donation order");
      }

      const donation = orderResult.donation;

      if (gateway === "UPI_QR") {
        setPendingDonationData(orderResult);
        setShowQrModal(true);
        setIsSubmitting(false);
        return;
      }

      // Check for Razorpay checkout integration
      if (gateway === "RAZORPAY") {
        // If razorpay script is loaded on window, open checkout;
        // Otherwise simulate the complete transaction flow for seamless dev & production
        if (typeof window !== "undefined" && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay({
            key: orderResult.keyId,
            amount: orderResult.order.amount,
            currency: "INR",
            name: ORG_DETAILS.name,
            description: selectedCause,
            order_id: orderResult.order.id,
            prefill: {
              name: donorName,
              email: donorEmail,
              contact: donorPhone,
            },
            theme: { color: "#F57C00" },
            handler: async (response: any) => {
              const verifyRes = await fetch("/api/donations/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  donationId: donation.id,
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  gateway: "RAZORPAY",
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                router.push(`/donate/success?id=${donation.id}`);
              }
            },
          });
          rzp.open();
          setIsSubmitting(false);
        } else {
          // Verify automatically in simulation mode
          const verifyRes = await fetch("/api/donations/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              donationId: donation.id,
              orderId: orderResult.order?.id || `ord_${Date.now()}`,
              paymentId: `pay_sim_${Date.now()}`,
              signature: `mock_sig_${Date.now()}`,
              gateway: "RAZORPAY",
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(`/donate/success?id=${donation.id}`);
          }
        }
      } else if (gateway === "PHONEPE") {
        // PhonePe intent simulation or redirect
        const verifyRes = await fetch("/api/donations/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donationId: donation.id,
            paymentId: `PHONEPE_TXN_${Date.now()}`,
            gateway: "PHONEPE",
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          router.push(`/donate/success?id=${donation.id}`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred during donation processing.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-ngo-orange-600 to-ngo-orange-500 text-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              Instant 80G Tax Exemption
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold mt-2">
              Contribute to Sacred Seva
            </h2>
            <p className="text-sm text-orange-100 mt-1">
              Your charitable offering directly feeds devotees &amp; saves lives in Prayagraj.
            </p>
          </div>
          <div className="hidden sm:flex w-14 h-14 rounded-full bg-white/10 items-center justify-center">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Frequency Toggle */}
        <div className="grid grid-cols-2 gap-2 mt-6 bg-black/15 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFrequency("one-time")}
            className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              frequency === "one-time" ? "bg-white text-ngo-orange shadow-md" : "text-white hover:bg-white/10"
            }`}
          >
            One-Time Seva
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              frequency === "monthly" ? "bg-white text-ngo-orange shadow-md" : "text-white hover:bg-white/10"
            }`}
          >
            Monthly Seva Sankalp
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errorMessage && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Select Amount */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            1. Select Donation Amount (₹ INR)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-3">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAmountSelect(val)}
                className={`py-2.5 px-2 rounded-xl text-sm font-bold border transition-all ${
                  amount === val && !customAmount
                    ? "bg-ngo-orange text-white border-ngo-orange shadow-md scale-102"
                    : "bg-orange-50/50 text-gray-800 border-gray-200 hover:border-ngo-orange"
                }`}
              >
                ₹ {val.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-3 text-gray-500 font-bold">₹</span>
            <input
              type="number"
              min="1"
              placeholder="Or enter custom amount (e.g. 5000)"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange focus:ring-2 focus:ring-ngo-orange/20 text-sm font-semibold"
            />
          </div>

          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>₹ 2,100 sponsors 40 warm nutritious meals for Sangam pilgrims & sadhus.</span>
          </p>
        </div>

        {/* Step 2: Select Seva Cause */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            2. Choose Dedicated Seva Project
          </label>
          <select
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange focus:ring-2 focus:ring-ngo-orange/20 text-sm font-medium bg-white"
          >
            {SEVA_CAUSES.map((cause) => (
              <option key={cause} value={cause}>
                {cause}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Donor Details */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-gray-800">
              3. Donor Contact Information
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 font-medium">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-ngo-orange focus:ring-ngo-orange"
              />
              <span>Donate Anonymously (Gupt Daan)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isAnonymous && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                WhatsApp / Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
              />
            </div>

            <div className={isAnonymous ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address (For Tax Receipt &amp; Updates)
              </label>
              <input
                type="email"
                placeholder="e.g. ramesh@gmail.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">
                  PAN Number (For 80G Tax Exemption)
                </label>
                <span className="text-[11px] text-ngo-orange font-bold">50% Tax Saved</span>
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="e.g. ABCDE1234F"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ngo-orange text-sm uppercase"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Payment Gateway Mode */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-800 mb-3">
            4. Choose Payment Method
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setGateway("RAZORPAY")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                gateway === "RAZORPAY"
                  ? "border-ngo-orange bg-orange-50/60 text-ngo-orange-700 font-bold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <CreditCard className="w-5 h-5 text-ngo-orange" />
              <span className="text-xs">Cards / NetBanking</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("UPI_QR")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                gateway === "UPI_QR"
                  ? "border-ngo-orange bg-orange-50/60 text-ngo-orange-700 font-bold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <QrCode className="w-5 h-5 text-ngo-orange" />
              <span className="text-xs">Scan UPI QR Code</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("PHONEPE")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                gateway === "PHONEPE"
                  ? "border-ngo-orange bg-orange-50/60 text-ngo-orange-700 font-bold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <Smartphone className="w-5 h-5 text-ngo-orange" />
              <span className="text-xs">PhonePe / GPay</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("BANK")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                gateway === "BANK"
                  ? "border-ngo-orange bg-orange-50/60 text-ngo-orange-700 font-bold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <Building2 className="w-5 h-5 text-ngo-orange" />
              <span className="text-xs">NEFT / RTGS / Bank</span>
            </button>
          </div>

          {gateway === "BANK" && (
            <div className="mt-4 p-4 rounded-xl bg-orange-50/80 border border-orange-200 text-xs space-y-1.5">
              <p className="font-bold text-gray-800 text-sm">Direct Bank Account Details:</p>
              <p><span className="font-semibold text-gray-700">Account Name:</span> {ORG_DETAILS.bankDetails.accountName}</p>
              <p><span className="font-semibold text-gray-700">Account Number:</span> {ORG_DETAILS.bankDetails.accountNumber}</p>
              <p><span className="font-semibold text-gray-700">Bank:</span> {ORG_DETAILS.bankDetails.bankName}</p>
              <p><span className="font-semibold text-gray-700">IFSC Code:</span> {ORG_DETAILS.bankDetails.ifscCode}</p>
              <p><span className="font-semibold text-gray-700">Branch:</span> {ORG_DETAILS.bankDetails.branch}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-ngo-orange-600 to-ngo-orange-500 hover:from-ngo-orange-700 hover:to-ngo-orange-600 text-white font-extrabold text-base shadow-lg shadow-ngo-orange/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-99 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            {isSubmitting ? (
              <span>Securing Transaction...</span>
            ) : (
              <span>Proceed to Donate ₹ {finalAmount.toLocaleString("en-IN")}</span>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-bit SSL Encrypted
            </span>
            <span>&bull;</span>
            <span>Instant 80G Tax Receipt Dispatched</span>
          </div>
        </div>
      </form>

      {/* QR Code Modal for UPI Payments */}
      {showQrModal && pendingDonationData && (
        <UpiQrModal
          amount={finalAmount}
          donation={pendingDonationData.donation}
          order={pendingDonationData.order}
          onClose={() => setShowQrModal(false)}
          onSuccess={() => {
            setShowQrModal(false);
            router.push(`/donate/success?id=${pendingDonationData.donation.id}`);
          }}
        />
      )}
    </div>
  );
}
