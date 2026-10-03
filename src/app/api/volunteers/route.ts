import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { getAuthUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Allow admin viewing
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const volunteers = await dbStore.getVolunteers();
  return NextResponse.json({ success: true, volunteers });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, address, city, state, pincode, skills, availability, reasonToJoin } = body;

    if (!fullName || !phone || !email) {
      return NextResponse.json({ error: "Name, email, and phone number are required" }, { status: 400 });
    }

    const volunteer = await dbStore.createVolunteer({
      fullName,
      email,
      phone,
      address: address || "Prayagraj",
      city: city || "Prayagraj",
      state: state || "Uttar Pradesh",
      pincode: pincode || "211005",
      skills: Array.isArray(skills) ? skills : [skills || "General Seva"],
      availability: availability || "Weekends",
      reasonToJoin: reasonToJoin || "Service at Triveni Sangam",
    });

    return NextResponse.json({
      success: true,
      message: "Your volunteer registration has been successfully submitted! Our team will contact you.",
      volunteer,
    });
  } catch (error: any) {
    console.error("Volunteer submission error:", error);
    return NextResponse.json({ error: "Failed to submit volunteer registration" }, { status: 500 });
  }
}
