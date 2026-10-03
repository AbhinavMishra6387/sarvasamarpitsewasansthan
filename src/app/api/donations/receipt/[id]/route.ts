import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/db-storage";
import { ORG_DETAILS } from "@/lib/constants";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const donation = dbStore.donations.find((d) => d.id === params.id || d.receiptNo === params.id);

  if (!donation) {
    return new NextResponse("Donation receipt not found", { status: 404 });
  }

  // Convert number to Indian words
  const amountInWords = (num: number): string => {
    const a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if ((num = num.toString().split(".")[0] as any) === "0") return "Zero Rupees Only";
    if (num > 10000000) return "Rupees " + num + " Only";
    let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "Rupees " + num + " Only";
    let str = "";
    str += Number(n[1]) != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " : "";
    str += Number(n[2]) != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " : "";
    str += Number(n[3]) != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " : "";
    str += Number(n[4]) != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " : "";
    str += Number(n[5]) != 0 ? (str != "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : "";
    return str.trim() + " Rupees Only";
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Receipt ${donation.receiptNo} - Sarva Samarpit Sewa Sansthan</title>
      <style>
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .receipt-container { box-shadow: none !important; border: 2px solid #2D2D2D !important; }
        }
        body { font-family: 'Times New Roman', Times, serif; background-color: #f1f5f9; padding: 30px; margin: 0; color: #1e293b; }
        .receipt-container { max-width: 820px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; position: relative; }
        .header { text-align: center; border-bottom: 2px double #F57C00; padding-bottom: 16px; margin-bottom: 24px; }
        .org-title { font-size: 26px; font-weight: bold; color: #1e293b; margin: 0; letter-spacing: 0.5px; }
        .org-hindi { font-size: 20px; font-weight: bold; color: #F57C00; margin: 4px 0; }
        .org-sub { font-size: 13px; color: #475569; margin: 3px 0; }
        .reg-badges { display: flex; justify-content: space-around; background: #FFF8E1; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #BF360C; margin-top: 10px; }
        .meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; font-weight: bold; }
        .receipt-grid { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .receipt-grid td { padding: 10px 14px; border: 1px solid #cbd5e1; font-size: 14px; }
        .receipt-grid td.label { background-color: #f8fafc; font-weight: bold; width: 30%; color: #334155; }
        .receipt-grid td.val { font-weight: 600; }
        .amount-highlight { background-color: #fef3c7; color: #92400e; font-size: 18px !important; font-weight: bold; }
        .cert-clause { font-size: 12px; line-height: 1.6; color: #475569; background: #f8fafc; border-left: 4px solid #F57C00; padding: 12px 16px; margin-bottom: 30px; font-style: italic; }
        .signature-section { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
        .stamp-box { border: 1.5px dashed #94a3b8; border-radius: 50%; width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase; }
        .signature-line { text-align: center; width: 220px; }
        .signature-line hr { border: none; border-top: 1px solid #334155; margin-bottom: 6px; }
        .action-bar { text-align: center; margin-bottom: 20px; }
        .btn-print { background-color: #F57C00; color: white; padding: 10px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 10px rgba(245, 124, 0, 0.3); }
        .btn-print:hover { background-color: #E65100; }
      </style>
    </head>
    <body>
      <div class="action-bar no-print">
        <button onclick="window.print()" class="btn-print">🖨️ Print / Download 80G Tax Receipt</button>
      </div>

      <div class="receipt-container">
        <div class="header">
          <div class="org-hindi">${ORG_DETAILS.hindiName}</div>
          <h1 class="org-title">${ORG_DETAILS.name}</h1>
          <p class="org-sub">Head Office: ${ORG_DETAILS.headOffice}</p>
          <p class="org-sub">Phone: ${ORG_DETAILS.formattedPhone} &bull; Email: ${ORG_DETAILS.email} &bull; 24 Hours Open</p>
          <div class="reg-badges">
            <span>Trust Reg No: ${ORG_DETAILS.registrationNo}</span>
            <span>12A Reg: ${ORG_DETAILS.section12A}</span>
            <span>80G Reg: ${ORG_DETAILS.section80G}</span>
            <span>PAN: ${ORG_DETAILS.panNumber}</span>
          </div>
        </div>

        <div class="meta-row">
          <div>Receipt No: <span style="color:#E65100;">${donation.receiptNo}</span></div>
          <div>Date: ${new Date(donation.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
        </div>

        <table class="receipt-grid">
          <tr>
            <td class="label">Received with thanks from:</td>
            <td class="val">${donation.donorName}</td>
          </tr>
          <tr>
            <td class="label">Donor PAN Number:</td>
            <td class="val">${donation.panNumber || "NOT PROVIDED"}</td>
          </tr>
          <tr>
            <td class="label">Donor Address:</td>
            <td class="val">${donation.address || "Prayagraj, Uttar Pradesh"}</td>
          </tr>
          <tr>
            <td class="label">Contact Phone / Email:</td>
            <td class="val">${donation.donorPhone} | ${donation.donorEmail}</td>
          </tr>
          <tr>
            <td class="label">Purpose / Seva Project:</td>
            <td class="val">${donation.campaignTitle || "Akhand Bhandara & Seva Activities"}</td>
          </tr>
          <tr>
            <td class="label">Payment Mode & Reference:</td>
            <td class="val">${donation.paymentGateway} &bull; Ref: ${donation.transactionId || "CONFIRMED"}</td>
          </tr>
          <tr>
            <td class="label">Amount (in Words):</td>
            <td class="val" style="color: #92400e;">${amountInWords(donation.amount)}</td>
          </tr>
          <tr>
            <td class="label">Total Amount Paid:</td>
            <td class="val amount-highlight">₹ ${donation.amount.toLocaleString("en-IN")}/- INR</td>
          </tr>
        </table>

        <div class="cert-clause">
          <strong>Tax Exemption Certificate:</strong> This certifies that the donation received above qualifies for deduction under Section 80G of the Income Tax Act, 1961 as per order issued by the Commissioner of Income Tax. This transaction is eligible for filing in Form 10BD for electronic verification on the Income Tax Portal.
        </div>

        <div class="signature-section">
          <div class="stamp-box">
            SARVA SAMARPIT<br/>SEWA SANSTHAN<br/>PRAYAGRAJ<br/>OFFICIAL SEAL
          </div>
          <div class="signature-line">
            <div style="font-family:'Brush Script MT', cursive; font-size:22px; color:#1e293b; margin-bottom:5px;">Sarva Samarpit</div>
            <hr/>
            <div style="font-size: 13px; font-weight: bold;">Authorized Signatory / Secretary</div>
            <div style="font-size: 11px; color: #64748b;">Sarva Samarpit Sewa Sansthan</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
