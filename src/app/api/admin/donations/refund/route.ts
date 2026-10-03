import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { donationId, reason } = await req.json();

    if (!donationId) {
      return NextResponse.json({ error: "Donation ID required" }, { status: 400 });
    }

    const donation = dbStore.donations.find((d) => d.id === donationId);
    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    if (donation.paymentStatus === "REFUNDED") {
      return NextResponse.json({ error: "Donation is already refunded" }, { status: 400 });
    }

    donation.paymentStatus = "REFUNDED";
    donation.notes = `${donation.notes || ""} [REFUNDED on ${new Date().toISOString()} by ${user.name}: ${reason || "Accidental transaction requested by donor"}]`.trim();

    return NextResponse.json({
      success: true,
      message: `Donation ${donation.receiptNo} marked as REFUNDED successfully.`,
      donation,
    });
  } catch (error: any) {
    console.error("Refund processing error:", error);
    return NextResponse.json({ error: "Failed to process refund" }, { status: 500 });
  }
}
