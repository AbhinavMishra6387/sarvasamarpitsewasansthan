import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await dbStore.getMemberships();
  return NextResponse.json({ success: true, memberships });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, fatherSpouseName, email, phone, bloodGroup, occupation, fullAddress, membershipType } = body;

    if (!fullName || !phone || !email || !fullAddress) {
      return NextResponse.json({ error: "Full Name, Phone, Email, and Address are required" }, { status: 400 });
    }

    const membership = await dbStore.createMembership({
      fullName,
      fatherSpouseName,
      email,
      phone,
      bloodGroup,
      occupation,
      fullAddress,
      membershipType: membershipType || "ANNUAL",
    });

    return NextResponse.json({
      success: true,
      message: "Membership registration successful! Your digital card is ready.",
      membership,
      cardUrl: `/membership/card/${membership.id}`,
    });
  } catch (error: any) {
    console.error("Membership creation error:", error);
    return NextResponse.json({ error: "Failed to process membership application" }, { status: 500 });
  }
}
