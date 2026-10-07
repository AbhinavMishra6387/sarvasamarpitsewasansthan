"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

const FAQS = [
  {
    q: "Is Sarva Samarpit Sewa Sansthan a registered non-profit organization?",
    a: `Yes, Sarva Samarpit Sewa Sansthan is an officially registered Charitable Trust under the Indian Trusts Act, 1882 (Registration Number: ${ORG_DETAILS.registrationNo}). It holds active tax exemptions under Section 12A and Section 80G of the Income Tax Act, 1961.`,
  },
  {
    q: "How does the Section 80G Tax Exemption benefit me as a donor?",
    a: "Under Section 80G of the Income Tax Act, Indian taxpayers can claim a 50% deduction of their donated amount from their taxable income. After you donate online via our portal, you receive an instant digital receipt featuring our 80G registration number and your PAN number for seamless filing in your ITR.",
  },
  {
    q: "Where is the Head Office located and what are the operating hours?",
    a: `Our Head Office is situated at Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj, Uttar Pradesh – 211005 (near Triveni Sangam). We operate 24 Hours daily (Akhand Sewa) to accommodate pilgrims and emergency needs round the clock.`,
  },
  {
    q: "Can I sponsor food distribution (Bhandara) on a specific date (birthday, anniversary, shraadh)?",
    a: "Absolutely. Many devotees dedicate meals on specific auspicious dates. When donating, you can select the Annapurna Bhandara cause and specify your dedication date. Special prayers are recited for your family during the prasad offering.",
  },
  {
    q: "How do I verify the authenticity of my Digital Membership Card?",
    a: "Every issued membership card contains an encrypted QR Code. Scanning the QR code with any smartphone camera instantly opens our live verification portal displaying your verified membership credentials and validity date.",
  },
  {
    q: "How can I volunteer if I reside outside Prayagraj?",
    a: "We welcome remote volunteers! You can assist in digital communications, translations, blog writing, social media awareness, and corporate CSR outreach from anywhere in India or abroad.",
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions (FAQ)"
        subtitle="Clear answers regarding our 80G tax exemptions, 24/7 food seva, membership cards, and head office in Prayagraj."
        breadcrumbs={[{ label: "FAQ" }]}
        badge="Clarifications & Help"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={faq.q}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-semibold text-base text-gray-900 hover:text-ngo-orange transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    openIdx === idx ? "rotate-180 text-ngo-orange" : ""
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-orange-50/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-ngo-dark-900 text-white p-8 rounded-lg border-t-4 border-ngo-orange text-center space-y-3">
          <h4 className="font-heading font-bold text-lg">Still Have Unanswered Questions?</h4>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            Our 24/7 volunteer desk is available by phone or WhatsApp to address any inquiries.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${ORG_DETAILS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white text-xs font-bold transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5" /> Call Helpline: {ORG_DETAILS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
