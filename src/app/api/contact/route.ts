import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Name, phone number, and message are required" }, { status: 400 });
    }

    const inquiry = await dbStore.recordInquiry({
      name,
      email: email || "N/A",
      phone,
      subject: subject || "General Inquiry / Seva Information",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to Sarva Samarpit Sewa Sansthan! Our sevadar team will respond promptly.",
      inquiry,
    });
  } catch (error: any) {
    console.error("Contact inquiry error:", error);
    return NextResponse.json({ error: "Failed to record inquiry" }, { status: 500 });
  }
}

export async function GET() {
  const inquiries = await dbStore.getInquiries();
  return NextResponse.json({ success: true, inquiries });
}
