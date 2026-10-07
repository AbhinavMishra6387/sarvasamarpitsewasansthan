"use client";

import React from "react";
import { ORG_DETAILS } from "@/lib/constants";
import { ShieldCheck, Award, Printer, CheckCircle } from "lucide-react";

interface MemberProps {
  membershipNumber: string;
  fullName: string;
  membershipType: string;
  bloodGroup?: string;
  validFrom: string;
  validUntil: string;
  status: string;
  phone?: string;
}

export function DigitalMemberCard({ member }: { member: MemberProps }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://sarvasamarpit.org/membership/verify?q=${encodeURIComponent(member.membershipNumber)}`;

  return (
    <div className="flex flex-col items-center">
      {/* Printable Card Area */}
      <div className="w-full max-w-md bg-stone-900 text-white rounded-lg p-6 shadow-sm border border-stone-800 relative overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-white shadow-xs text-base">
              ॐ
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm leading-tight text-white">
                {ORG_DETAILS.name}
              </h4>
              <p className="text-[10px] text-orange-400 font-medium">
                Official Digital Member Card &bull; Prayagraj
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-medium tracking-wide px-2.5 py-0.5 rounded-md bg-stone-800 text-orange-300 border border-stone-700">
            {member.membershipType}
          </span>
        </div>

        {/* Member Details Body */}
        <div className="grid grid-cols-3 gap-3 items-center my-4">
          <div className="col-span-2 space-y-2">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                Member Full Name
              </span>
              <p className="font-heading font-bold text-lg text-white leading-tight">
                {member.fullName}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                Membership ID
              </span>
              <p className="font-mono font-bold text-ngo-orange-300 text-sm">
                {member.membershipNumber}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-[9px] text-gray-400 block">Blood Group</span>
                <span className="font-bold text-red-400">{member.bloodGroup || "O+"}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 block">Valid Until</span>
                <span className="font-bold text-gray-200">
                  {new Date(member.validUntil).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Verification QR Code */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-1.5 rounded-md border border-stone-700 shadow-xs">
              <img
                src={qrUrl}
                alt="Verification QR Code"
                width={76}
                height={76}
                className="rounded-xs"
              />
            </div>
            <span className="text-[9px] text-stone-400 mt-1 flex items-center gap-0.5">
              <CheckCircle className="w-2.5 h-2.5 text-emerald-400" /> Verified
            </span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
          <span>Head Office: Bade Hanuman Mandir, Prayagraj</span>
          <span className="text-orange-400 font-medium">{ORG_DETAILS.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-stone-900 hover:bg-black text-white rounded-md text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors border border-stone-800"
        >
          <Printer className="w-3.5 h-3.5 text-orange-400" /> Print / Save Card PDF
        </button>
      </div>
    </div>
  );
}
