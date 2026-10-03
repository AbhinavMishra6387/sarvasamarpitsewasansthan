import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { createRazorpayOrder } from "@/lib/razorpay";
import { generateUpiQrString, generatePhonePePayload } from "@/lib/phonepe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      donorName,
      donorEmail,
      donorPhone,
      amount,
      panNumber,
      address,
      isAnonymous,
      is80GClaimed,
      campaignTitle,
      paymentGateway = "RAZORPAY",
      notes,
    } = body;

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount < 1) {
      return NextResponse.json({ error: "Please enter a valid donation amount (min ₹1)" }, { status: 400 });
    }

    if (!donorName || !donorPhone) {
      return NextResponse.json({ error: "Donor Name and Phone Number are required" }, { status: 400 });
    }

    // Record initial pending donation in storage
    const newDonation = await dbStore.createDonation({
      donorName: isAnonymous ? "Anonymous Devotee" : donorName,
      donorEmail: donorEmail || "donor@sarvasamarpit.org",
      donorPhone,
      panNumber,
      address,
      amount: parsedAmount,
      isAnonymous: Boolean(isAnonymous),
      is80GClaimed: Boolean(is80GClaimed),
      campaignTitle: campaignTitle || "Akhand Annapurna & Seva Fund",
      paymentGateway: paymentGateway as any,
      paymentStatus: "PENDING",
      notes,
    });

    let orderData: any = {};

    if (paymentGateway === "RAZORPAY") {
      orderData = await createRazorpayOrder({
        amount: parsedAmount,
        receipt: newDonation.receiptNo,
        notes: {
          donationId: newDonation.id,
          campaign: campaignTitle || "General Seva",
        },
      });
      newDonation.orderId = orderData.id;
    } else if (paymentGateway === "PHONEPE") {
      const phonepeData = generatePhonePePayload(parsedAmount, newDonation.id, donorPhone);
      orderData = {
        transactionId: newDonation.id,
        ...phonepeData,
      };
      newDonation.transactionId = phonepeData.transactionId;
    } else if (paymentGateway === "UPI_QR") {
      const upiString = generateUpiQrString(
        parsedAmount,
        `Seva Donation ${newDonation.receiptNo}`,
        newDonation.id
      );
      orderData = {
        upiString,
        upiId: process.env.NEXT_PUBLIC_UPI_ID || "9450858514@upi",
        amount: parsedAmount,
        transactionId: newDonation.id,
      };
      newDonation.transactionId = `UPI-${Date.now()}`;
    }

    return NextResponse.json({
      success: true,
      donation: newDonation,
      order: orderData,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SarvaSamarpitSewa",
    });
  } catch (error: any) {
    console.error("Donation create-order error:", error);
    return NextResponse.json({ error: error.message || "Failed to create donation order" }, { status: 500 });
  }
}
