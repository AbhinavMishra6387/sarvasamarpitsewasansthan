import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";
import {
  convertToCSV,
  formatDonationExport,
  formatVolunteerExport,
  formatMembershipExport,
} from "@/lib/export-utils";

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "donations";

  let csvContent = "";
  let filename = `ssss-${type}-report-${Date.now()}.csv`;

  if (type === "donations") {
    const data = await dbStore.getDonations();
    csvContent = convertToCSV(formatDonationExport(data));
  } else if (type === "volunteers") {
    const data = await dbStore.getVolunteers();
    csvContent = convertToCSV(formatVolunteerExport(data));
  } else if (type === "memberships") {
    const data = await dbStore.getMemberships();
    csvContent = convertToCSV(formatMembershipExport(data));
  } else {
    return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
  }

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
