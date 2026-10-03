import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await dbStore.getStats();
  const recentDonations = (await dbStore.getDonations()).slice(0, 5);
  const recentVolunteers = (await dbStore.getVolunteers()).slice(0, 5);

  return NextResponse.json({
    success: true,
    stats,
    recentDonations,
    recentVolunteers,
  });
}
