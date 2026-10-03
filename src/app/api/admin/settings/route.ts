import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function GET() {
  const settings = await dbStore.getSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await req.json();
  const updatedSettings = await dbStore.updateSettings(updates);

  return NextResponse.json({
    success: true,
    message: "Settings updated successfully! Changes are live across the website.",
    settings: updatedSettings,
  });
}
