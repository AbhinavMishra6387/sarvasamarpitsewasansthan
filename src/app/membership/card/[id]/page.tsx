import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { DigitalMemberCard } from "@/components/membership/DigitalMemberCard";
import { dbStore } from "@/lib/db-storage";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default async function MemberCardPage({ params }: { params: { id: string } }) {
  const member = dbStore.memberships.find(
    (m) => m.id === params.id || m.membershipNumber === params.id
  );

  if (!member) {
    return notFound();
  }

  return (
    <div>
      <PageHeader
        title="Official Digital Membership ID"
        subtitle={`Member: ${member.fullName} | ID: ${member.membershipNumber}`}
        breadcrumbs={[
          { label: "Membership", href: "/membership" },
          { label: member.membershipNumber },
        ]}
        badge="Verified Certificate"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
        <DigitalMemberCard member={member} />

        <div className="bg-white p-6 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
          <p className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Digital Authenticity Verified</span>
          </p>
          <p>
            This card is an official electronic token of membership issued by Sarva Samarpit Sewa Sansthan, Prayagraj. You may present this card on your smartphone or carry a printed copy for identification during Sansthan gatherings and priority temple assistance.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/membership"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ngo-orange hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Membership Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
