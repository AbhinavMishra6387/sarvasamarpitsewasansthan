import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { sendDonationReceiptEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const {
      donationId,
      orderId,
      paymentId,
      signature,
      gateway = "RAZORPAY",
    } = await req.json();

    const donation = dbStore.donations.find((d) => d.id === donationId);
    if (!donation) {
      return NextResponse.json({ error: "Donation record not found" }, { status: 404 });
    }

    if (gateway === "RAZORPAY") {
      const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
      if (!isValid) {
        donation.paymentStatus = "FAILED";
        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
      }
      donation.transactionId = paymentId;
    } else {
      // Manual/UPI or simulated confirmation
      donation.transactionId = paymentId || `TXN-${Date.now()}`;
    }

    donation.paymentStatus = "SUCCESS";

    // Send confirmation email asynchronously
    sendDonationReceiptEmail({
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      receiptNo: donation.receiptNo,
      amount: donation.amount,
      paymentGateway: donation.paymentGateway,
      transactionId: donation.transactionId || "SUCCESS",
      campaignTitle: donation.campaignTitle || "General Seva",
      date: donation.createdAt,
      panNumber: donation.panNumber,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      donation,
      receiptUrl: `/api/donations/receipt/${donation.id}`,
    });
  } catch (error: any) {
    console.error("Donation verify error:", error);
    return NextResponse.json({ error: "Verification process failed" }, { status: 500 });
  }
}
