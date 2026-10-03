export function convertToCSV(data: Record<string, any>[]): string {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((item) =>
    headers
      .map((header) => {
        const val = item[header];
        if (val === null || val === undefined) return '""';
        const stringVal = String(val).replace(/"/g, '""');
        return `"${stringVal}"`;
      })
      .join(",")
  );

  return [headers.join(","), ...rows].join("\r\n");
}

export function formatDonationExport(donations: any[]) {
  return donations.map((d) => ({
    "Receipt Number": d.receiptNo,
    "Date": new Date(d.createdAt).toLocaleDateString("en-IN"),
    "Donor Name": d.donorName,
    "Email": d.donorEmail,
    "Phone": d.donorPhone,
    "Amount (INR)": d.amount,
    "PAN Number": d.panNumber || "N/A",
    "Status": d.paymentStatus,
    "Payment Gateway": d.paymentGateway,
    "Transaction ID": d.transactionId || "N/A",
    "Campaign": d.campaignTitle,
    "80G Claimed": d.is80GClaimed ? "YES" : "NO",
  }));
}

export function formatVolunteerExport(volunteers: any[]) {
  return volunteers.map((v) => ({
    "Volunteer Code": v.volunteerCode,
    "Full Name": v.fullName,
    "Email": v.email,
    "Phone": v.phone,
    "City": v.city,
    "State": v.state,
    "Occupation": v.occupation || "N/A",
    "Skills": Array.isArray(v.skills) ? v.skills.join("; ") : v.skills,
    "Availability": v.availability,
    "Status": v.status,
    "Registered Date": new Date(v.createdAt).toLocaleDateString("en-IN"),
  }));
}

export function formatMembershipExport(memberships: any[]) {
  return memberships.map((m) => ({
    "Membership Number": m.membershipNumber,
    "Full Name": m.fullName,
    "Email": m.email,
    "Phone": m.phone,
    "Blood Group": m.bloodGroup || "N/A",
    "Type": m.membershipType,
    "Amount Paid": m.amountPaid,
    "Valid From": new Date(m.validFrom).toLocaleDateString("en-IN"),
    "Valid Until": new Date(m.validUntil).toLocaleDateString("en-IN"),
    "Status": m.status,
  }));
}
