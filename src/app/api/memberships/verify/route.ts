import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || searchParams.get("id");

  if (!q) {
    return NextResponse.json({ error: "Membership ID or Number required" }, { status: 400 });
  }

  const member = dbStore.memberships.find(
    (m) =>
      m.id === q ||
      m.membershipNumber.toLowerCase() === q.toLowerCase() ||
      m.phone === q
  );

  if (!member) {
    return NextResponse.json({ found: false, message: "No registered member found with these details." }, { status: 404 });
  }

  return NextResponse.json({
    found: true,
    member: {
      membershipNumber: member.membershipNumber,
      fullName: member.fullName,
      membershipType: member.membershipType,
      validUntil: member.validUntil,
      status: member.status,
      bloodGroup: member.bloodGroup,
    },
  });
}
