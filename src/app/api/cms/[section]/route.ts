import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { section: string } }) {
  const { section } = params;

  switch (section) {
    case "projects":
      return NextResponse.json({ success: true, data: await dbStore.getProjects() });
    case "events":
      return NextResponse.json({ success: true, data: await dbStore.getEvents() });
    case "blogs":
      return NextResponse.json({ success: true, data: await dbStore.getBlogs() });
    case "settings":
      return NextResponse.json({ success: true, data: await dbStore.getSettings() });
    case "stats":
      return NextResponse.json({ success: true, data: await dbStore.getStats() });
    case "donations":
      return NextResponse.json({ success: true, data: await dbStore.getDonations() });
    case "volunteers":
      return NextResponse.json({ success: true, data: await dbStore.getVolunteers() });
    case "memberships":
      return NextResponse.json({ success: true, data: await dbStore.getMemberships() });
    case "inquiries":
      return NextResponse.json({ success: true, data: await dbStore.getInquiries() });
    default:
      return NextResponse.json({ error: `Unknown section '${section}'` }, { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { section: string } }) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = params;
  const body = await req.json();

  if (section === "settings") {
    const updated = await dbStore.updateSettings(body);
    return NextResponse.json({ success: true, message: "Settings saved", data: updated });
  }

  return NextResponse.json({ success: true, message: `Updated ${section}` });
}
