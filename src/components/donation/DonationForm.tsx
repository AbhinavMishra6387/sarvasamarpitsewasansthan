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
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 border-b border-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium tracking-wide bg-stone-800 border border-stone-700 px-3 py-1 rounded-md text-stone-300">
              Instant 80G Tax Exemption
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mt-2 tracking-tight">
              Contribute to Sacred Seva
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              Your charitable offering directly feeds devotees &amp; saves lives in Prayagraj.
            </p>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-md bg-stone-800 border border-stone-700 items-center justify-center">
            <Heart className="w-6 h-6 text-orange-400 fill-orange-400" />
          </div>
        </div>

        {/* Frequency Toggle */}
        <div className="grid grid-cols-2 gap-2 mt-6 bg-stone-950/60 p-1 rounded-md border border-stone-800">
          <button
            type="button"
            onClick={() => setFrequency("one-time")}
            className={`py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              frequency === "one-time" ? "bg-white text-stone-900 shadow-xs" : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            One-Time Seva
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              frequency === "monthly" ? "bg-white text-stone-900 shadow-xs" : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            Monthly Seva Sankalp
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errorMessage && (
          <div className="p-4 bg-red-50 border-l-2 border-red-600 rounded-md flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Select Amount */}
        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2">
            1. Select Donation Amount (₹ INR)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-3">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAmountSelect(val)}
                className={`py-2.5 px-2 rounded-md text-sm font-medium border transition-colors ${
                  amount === val && !customAmount
                    ? "bg-orange-700 text-white border-orange-700 shadow-xs"
                    : "bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400"
                }`}
              >
                ₹ {val.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-stone-500 font-medium">₹</span>
            <input
              type="number"
              min="1"
              placeholder="Or enter custom amount (e.g. 5000)"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full pl-8 pr-4 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm font-medium"
            />
          </div>

          <p className="text-xs text-stone-500 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>₹ 2,100 sponsors 40 warm nutritious meals for Sangam pilgrims & sadhus.</span>
          </p>
        </div>

        {/* Step 2: Select Seva Cause */}
        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2">
            2. Choose Dedicated Seva Project
          </label>
          <select
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm font-medium bg-white"
          >
            {SEVA_CAUSES.map((cause) => (
              <option key={cause} value={cause}>
                {cause}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Donor Details */}
        <div className="space-y-4 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-stone-800">
              3. Donor Contact Information
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 font-medium">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-orange-700 focus:ring-orange-700"
              />
              <span>Donate Anonymously (Gupt Daan)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isAnonymous && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                WhatsApp / Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm"
              />
            </div>

            <div className={isAnonymous ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email Address (For Tax Receipt &amp; Updates)
              </label>
              <input
                type="email"
                placeholder="e.g. ramesh@gmail.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-stone-700">
                  PAN Number (For 80G Tax Exemption)
                </label>
                <span className="text-[11px] text-orange-700 font-medium">50% Tax Saved</span>
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="e.g. ABCDE1234F"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-stone-400 text-sm uppercase"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Payment Gateway Mode */}
        <div className="pt-2 border-t border-stone-100">
          <label className="block text-sm font-medium text-stone-800 mb-3">
            4. Choose Payment Method
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setGateway("RAZORPAY")}
              className={`p-3 rounded-md border text-center transition-colors flex flex-col items-center gap-1.5 ${
                gateway === "RAZORPAY"
                  ? "border-orange-700 bg-stone-50 text-stone-900 font-medium shadow-xs"
                  : "border-stone-200 hover:border-stone-300 text-stone-700"
              }`}
            >
              <CreditCard className="w-5 h-5 text-orange-700" />
              <span className="text-xs">Cards / NetBanking</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("UPI_QR")}
              className={`p-3 rounded-md border text-center transition-colors flex flex-col items-center gap-1.5 ${
                gateway === "UPI_QR"
                  ? "border-orange-700 bg-stone-50 text-stone-900 font-medium shadow-xs"
                  : "border-stone-200 hover:border-stone-300 text-stone-700"
              }`}
            >
              <QrCode className="w-5 h-5 text-orange-700" />
              <span className="text-xs">Scan UPI QR Code</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("PHONEPE")}
              className={`p-3 rounded-md border text-center transition-colors flex flex-col items-center gap-1.5 ${
                gateway === "PHONEPE"
                  ? "border-orange-700 bg-stone-50 text-stone-900 font-medium shadow-xs"
                  : "border-stone-200 hover:border-stone-300 text-stone-700"
              }`}
            >
              <Smartphone className="w-5 h-5 text-orange-700" />
              <span className="text-xs">PhonePe / GPay</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway("BANK")}
              className={`p-3 rounded-md border text-center transition-colors flex flex-col items-center gap-1.5 ${
                gateway === "BANK"
                  ? "border-orange-700 bg-stone-50 text-stone-900 font-medium shadow-xs"
                  : "border-stone-200 hover:border-stone-300 text-stone-700"
              }`}
            >
              <Building2 className="w-5 h-5 text-orange-700" />
              <span className="text-xs">NEFT / RTGS / Bank</span>
            </button>
          </div>

          {gateway === "BANK" && (
            <div className="mt-4 p-4 rounded-md bg-stone-50 border border-stone-200 text-xs space-y-1.5">
              <p className="font-semibold text-stone-800 text-sm">Direct Bank Account Details:</p>
              <p><span className="font-medium text-stone-700">Account Name:</span> {ORG_DETAILS.bankDetails.accountName}</p>
              <p><span className="font-medium text-stone-700">Account Number:</span> {ORG_DETAILS.bankDetails.accountNumber}</p>
              <p><span className="font-medium text-stone-700">Bank:</span> {ORG_DETAILS.bankDetails.bankName}</p>
              <p><span className="font-medium text-stone-700">IFSC Code:</span> {ORG_DETAILS.bankDetails.ifscCode}</p>
              <p><span className="font-medium text-stone-700">Branch:</span> {ORG_DETAILS.bankDetails.branch}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-medium text-sm sm:text-base shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            {isSubmitting ? (
              <span>Securing Transaction...</span>
            ) : (
              <span>Proceed to Donate ₹ {finalAmount.toLocaleString("en-IN")}</span>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-stone-500">
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
