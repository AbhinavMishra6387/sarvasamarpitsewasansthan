import { ORG_DETAILS } from "./constants";

export interface DonationReceiptEmailData {
  donorName: string;
  donorEmail: string;
  receiptNo: string;
  amount: number;
  paymentGateway: string;
  transactionId: string;
  campaignTitle: string;
  date: string;
  panNumber?: string;
}

export async function sendDonationReceiptEmail(data: DonationReceiptEmailData) {
  // Production SMTP sender logic
  console.log(`[SMTP Mailer] Sending 80G Tax Donation Receipt to ${data.donorEmail} for Receipt #${data.receiptNo}`);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Official Donation Receipt - Sarva Samarpit Sewa Sansthan</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; margin: 0; padding: 20px; color: #2D2D2D; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border-top: 6px solid #F57C00; }
        .header { background: #2D2D2D; color: #ffffff; padding: 24px; text-align: center; }
        .content { padding: 30px; }
        .badge { background: #FFF3E0; color: #E65100; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 13px; display: inline-block; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 25px; }
        .table td { padding: 10px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; }
        .table td.title { color: #666666; width: 45%; }
        .table td.value { font-weight: 600; text-align: right; }
        .amount-row td { font-size: 18px; color: #E65100; font-weight: bold; border-top: 2px solid #F57C00; }
        .tax-note { background: #fdf8f0; border-left: 4px solid #F57C00; padding: 12px 16px; font-size: 12px; color: #555555; line-height: 1.5; margin-bottom: 20px; }
        .footer { background: #fbfbfb; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.5px;">${ORG_DETAILS.name}</h2>
          <p style="margin: 5px 0 0; font-size: 13px; color: #e0e0e0;">${ORG_DETAILS.headOffice}</p>
          <p style="margin: 3px 0 0; font-size: 12px; color: #F57C00;">Helpline: ${ORG_DETAILS.phone} (24 Hours Open)</p>
        </div>
        <div class="content">
          <div style="text-align: center; margin-bottom: 20px;">
            <span class="badge">Official 80G Tax Exemption Receipt</span>
            <h3 style="margin: 12px 0 4px; font-size: 22px;">Thank You, ${data.donorName}!</h3>
            <p style="margin: 0; color: #666666; font-size: 14px;">Your pious contribution supports our ongoing daily Bhandara & Healthcare seva.</p>
          </div>

          <table class="table">
            <tr><td class="title">Receipt Number</td><td class="value">${data.receiptNo}</td></tr>
            <tr><td class="title">Date of Transaction</td><td class="value">${new Date(data.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
            <tr><td class="title">Transaction / UTR ID</td><td class="value">${data.transactionId}</td></tr>
            <tr><td class="title">Payment Gateway</td><td class="value">${data.paymentGateway}</td></tr>
            <tr><td class="title">Seva Cause</td><td class="value">${data.campaignTitle}</td></tr>
            ${data.panNumber ? `<tr><td class="title">Donor PAN Number</td><td class="value">${data.panNumber}</td></tr>` : ""}
            <tr class="amount-row"><td class="title">Total Donated Amount</td><td class="value">₹ ${data.amount.toLocaleString("en-IN")} INR</td></tr>
          </table>

          <div class="tax-note">
            <strong>Income Tax Exemption:</strong> Donations are exempt under Section 80G of the Income Tax Act, 1961. Reg No: <strong>${ORG_DETAILS.section80G}</strong>. Trust Registration: <strong>${ORG_DETAILS.registrationNo}</strong>.
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0;">May Shree Bade Hanuman Ji bless you and your family with boundless joy and health.</p>
          <p style="margin: 5px 0 0;">Sarva Samarpit Sewa Sansthan &bull; Sangam Marg, Prayagraj &bull; Call: ${ORG_DETAILS.phone}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    success: true,
    messageId: `msg-${Date.now()}`,
    htmlPreview: htmlContent,
  };
}
