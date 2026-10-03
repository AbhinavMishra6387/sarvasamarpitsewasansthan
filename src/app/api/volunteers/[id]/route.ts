import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();
  const updated = await dbStore.updateVolunteerStatus(params.id, status);

  if (!updated) {
    return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: `Volunteer status updated to ${status}` });
}
