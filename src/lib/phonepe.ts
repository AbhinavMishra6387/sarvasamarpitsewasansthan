import crypto from "crypto";

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "M22TXXXXXXXXXX";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "demo-salt-key-phonepe";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";

export function generateUpiQrString(amount: number, transactionNote: string, txnId: string) {
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "9450858514@upi";
  const name = encodeURIComponent(process.env.NEXT_PUBLIC_UPI_NAME || "Sarva Samarpit Sewa Sansthan");
  const note = encodeURIComponent(transactionNote || "Sansthan Seva Donation");

  // Standard NPCI UPI URI Format:
  // upi://pay?pa=address&pn=name&am=amount&cu=INR&tn=note&tr=txnId
  return `upi://pay?pa=${upiId}&pn=${name}&am=${amount.toFixed(2)}&cu=INR&tn=${note}&tr=${txnId}`;
}

export function generatePhonePePayload(amount: number, transactionId: string, mobileNumber: string) {
  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: `MUID_${mobileNumber.replace(/\D/g, "").slice(-10)}`,
    amount: Math.round(amount * 100),
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donate/success?txn=${transactionId}`,
    redirectMode: "POST",
    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/donations/phonepe-callback`,
    mobileNumber: mobileNumber.replace(/\D/g, "").slice(-10),
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const stringToHash = base64Payload + "/pg/v1/pay" + SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
  const checksum = `${sha256}###${SALT_INDEX}`;

  return {
    base64Payload,
    checksum,
    transactionId,
  };
}
