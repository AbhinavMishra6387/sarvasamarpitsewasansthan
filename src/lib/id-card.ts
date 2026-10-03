// ============================================================================
// Sarva Samarpit Sewa Sansthan - Corporate Digital ID Card Engine
// High-Resolution Canvas Rendering, QR Verification & Print-Ready PDF/PNG Exporter
// ============================================================================

import { UserProfile } from "./firebase";
import { ORG_DETAILS } from "./constants";

export interface IdCardRenderOptions {
  width?: number; // e.g. 640 for high DPI
  height?: number; // e.g. 1012 for CR80 aspect ratio
  scale?: number;
}

export class DigitalIdCardEngine {
  /**
   * Generates a standard SVG string representing the corporate ID Card
   * featuring the organization logo, emblem, photo, signature, seal, and QR code.
   */
  public static generateIdCardSvg(profile: UserProfile, qrDataUri: string): string {
    const roleColor =
      profile.role === "SUPER_ADMIN" || profile.role === "ADMIN"
        ? "#F57C00" // Saffron / Gold
        : profile.role === "TRUSTEE"
        ? "#D97706" // Deep Amber
        : profile.role === "EMPLOYEE"
        ? "#2563EB" // Royal Blue
        : profile.role === "VOLUNTEER"
        ? "#059669" // Emerald Green
        : "#4B5563";

    const roleTitle =
      profile.role === "SUPER_ADMIN"
        ? "CHIEF MANAGING TRUSTEE"
        : profile.role === "ADMIN"
        ? "TREASURER & FINANCE HEAD"
        : profile.role === "TRUSTEE"
        ? "BOARD OF TRUSTEES"
        : profile.role === "EMPLOYEE"
        ? "EXECUTIVE STAFF"
        : profile.role === "VOLUNTEER"
        ? "AUTHORIZED SEVADAR"
        : "REGISTERED MEMBER";

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 1012" width="640" height="1012">
  <defs>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="60%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#F57C00"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${roleColor}"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
    <clipPath id="photoClip">
      <rect x="230" y="240" width="180" height="210" rx="20"/>
    </clipPath>
  </defs>

  <!-- Background Card Container -->
  <rect x="10" y="10" width="620" height="992" rx="36" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" filter="url(#cardShadow)"/>

  <!-- Card Top Lanyard Slot -->
  <rect x="270" y="24" width="100" height="14" rx="7" fill="#CBD5E1"/>

  <!-- Top Header Banner -->
  <rect x="10" y="50" width="620" height="150" fill="url(#headerGrad)"/>
  <rect x="10" y="196" width="620" height="6" fill="#F57C00"/>

  <!-- Trust Hindi Header -->
  <text x="320" y="94" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="21" fill="#FEF08A" text-anchor="middle">
    सर्व समर्पित सेवा संस्थान
  </text>
  <!-- Trust English Name -->
  <text x="320" y="122" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="19" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
    SARVA SAMARPIT SEWA SANSTHAN
  </text>
  <!-- Registered Tagline -->
  <text x="320" y="146" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#E2E8F0" text-anchor="middle">
    Regd. Public Charitable Trust • Indian Trusts Act, 1882 • Reg: UP/2018/0192847
  </text>
  <text x="320" y="168" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" fill="#FDE047" text-anchor="middle">
    Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, UP – 211005
  </text>

  <!-- Photo Border & Image Placeholder -->
  <rect x="224" y="234" width="192" height="222" rx="24" fill="#F8FAFC" stroke="${roleColor}" stroke-width="4"/>
  <rect x="230" y="240" width="180" height="210" rx="20" fill="#E2E8F0"/>
  <text x="320" y="355" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" fill="#64748B" text-anchor="middle">
    [OFFICIAL PHOTO]
  </text>

  <!-- Role Badge -->
  <rect x="160" y="475" width="320" height="38" rx="19" fill="url(#badgeGrad)"/>
  <text x="320" y="500" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
    ${roleTitle}
  </text>

  <!-- Member Full Name -->
  <text x="320" y="555" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="28" fill="#0F172A" text-anchor="middle">
    ${profile.fullName.toUpperCase()}
  </text>
  <!-- Unique NGO ID -->
  <text x="320" y="590" font-family="'Courier New', monospace" font-weight="800" font-size="22" fill="#F57C00" text-anchor="middle">
    ${profile.ngoId}
  </text>

  <!-- Details Grid -->
  <g font-family="'Segoe UI', Roboto, sans-serif" font-size="14">
    <!-- Row 1: Department -->
    <text x="70" y="635" font-weight="600" fill="#64748B">DEPARTMENT:</text>
    <text x="230" y="635" font-weight="700" fill="#1E293B">${profile.department}</text>

    <!-- Row 2: Date of Joining -->
    <text x="70" y="668" font-weight="600" fill="#64748B">JOINED:</text>
    <text x="230" y="668" font-weight="700" fill="#1E293B">${profile.dateOfJoining}</text>
    <text x="370" y="668" font-weight="600" fill="#64748B">VALIDITY:</text>
    <text x="450" y="668" font-weight="700" fill="#059669">${profile.validUntil}</text>

    <!-- Row 3: Blood Group & Status -->
    <text x="70" y="701" font-weight="600" fill="#64748B">BLOOD GROUP:</text>
    <text x="230" y="701" font-weight="800" fill="#DC2626">${profile.bloodGroup}</text>
    <text x="370" y="701" font-weight="600" fill="#64748B">STATUS:</text>
    <text x="450" y="701" font-weight="800" fill="#16A34A">${profile.status}</text>

    <!-- Row 4: Emergency Helpline -->
    <text x="70" y="734" font-weight="600" fill="#64748B">EMERGENCY NO:</text>
    <text x="230" y="734" font-weight="700" fill="#1E293B">${profile.emergencyContact.phone}</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="760" x2="590" y2="760" stroke="#E2E8F0" stroke-width="2"/>

  <!-- QR Code & Verification Block -->
  <g transform="translate(60, 785)">
    <!-- QR Border Box -->
    <rect x="0" y="0" width="140" height="140" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <image href="${qrDataUri}" x="10" y="10" width="120" height="120"/>
  </g>

  <g transform="translate(225, 805)" font-family="'Segoe UI', Roboto, sans-serif">
    <text x="0" y="18" font-weight="800" font-size="15" fill="#0F172A">OFFICIAL TRUST AUTHENTICATION</text>
    <text x="0" y="38" font-size="11" fill="#475569">Scan QR with smartphone camera</text>
    <text x="0" y="54" font-size="11" fill="#475569">to verify live active status on government</text>
    <text x="0" y="70" font-size="11" fill="#475569">and trust registers via sarva-samarpit portal.</text>

    <text x="0" y="105" font-weight="700" font-size="13" fill="#F57C00">Pt. Harsh Tiwari</text>
    <text x="0" y="122" font-size="10" fill="#64748B">Founder &amp; Chief Managing Trustee</text>
  </g>

  <!-- Official Trust Hologram Seal Symbol -->
  <g transform="translate(515, 840)">
    <circle cx="28" cy="28" r="32" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
    <circle cx="28" cy="28" r="26" fill="#F59E0B" opacity="0.15"/>
    <text x="28" y="24" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="10" fill="#B45309" text-anchor="middle">TRUST</text>
    <text x="28" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="9" fill="#B45309" text-anchor="middle">SEAL</text>
  </g>

  <!-- Bottom Strip -->
  <rect x="10" y="955" width="620" height="47" rx="20" fill="#0F172A"/>
  <text x="320" y="984" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#E2E8F0" text-anchor="middle">
    www.sarva-samarpit-sewa-sansthan.in • Helpline: 09450858514
  </text>
</svg>
`;
  }
}
