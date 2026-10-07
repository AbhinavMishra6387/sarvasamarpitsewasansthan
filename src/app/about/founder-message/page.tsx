import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Heart, Quote, Phone, Award } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Founder's Message | Sarva Samarpit Sewa Sansthan",
  description: "A heartfelt message from the Founder & Chief Patron of Sarva Samarpit Sewa Sansthan, Prayagraj.",
};

export default function FounderMessagePage() {
  return (
    <div>
      <PageHeader
        title="Message from the Founder &amp; Patron"
        subtitle="Reflections on selfless service, the spiritual aura of Triveni Sangam, and the pledge of Akhand Annapurna Seva."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Founder's Message" }]}
        badge="Inspirational Address"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-gray-100 shadow-xs">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8 pb-8 border-b border-gray-100">
            <div className="w-40 h-40 rounded-lg overflow-hidden shrink-0 border-4 border-orange-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"
                alt="Founder & Chief Patron"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Quote className="w-10 h-10 text-ngo-orange/40 mb-2" />
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ngo-dark leading-tight">
                &ldquo;Service to humanity is not an obligation—it is our highest privilege.&rdquo;
              </h2>
              <div className="mt-3">
                <h4 className="font-heading font-bold text-base text-gray-900">
                  Pujya Seva Sanyasi Ji / Chief Patron
                </h4>
                <p className="text-xs text-ngo-orange font-semibold">
                  Founder Trustee &bull; Sarva Samarpit Sewa Sansthan, Prayagraj
                </p>
              </div>
            </div>
          </div>

          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-5">
            <p>
              <strong>Hari Om &amp; Jai Shree Ram to all Devotees and Well-Wishers,</strong>
            </p>
            <p>
              Prayagraj is the Tirtha Raj—the king of all holy places. For countless centuries, kings, saints, and humble seekers have walked these sands along Triveni Sangam seeking liberation, peace, and spiritual renewal. Yet, when one stands near the sacred waters, one also observes the elderly pilgrim who has traveled thousands of miles on meager savings, the destitute child sleeping without food, and the patient suffering from untended fever.
            </p>
            <p>
              It was under the eternal gaze of <strong>Shree Bade Hanuman Ji</strong> that this humble endeavor, <em>Sarva Samarpit Sewa Sansthan</em>, took birth. Our resolve was absolute: no person who sets foot in this holy sanctuary should weep from hunger or succumb to illness for lack of basic medicines.
            </p>
            <p>
              Today, with the grace of the Almighty and the boundless generosity of donors across India and the globe, our Annapurna kitchen runs 24 hours a day. Every grain of rice, every spoonful of dal is prepared with love and reverence.
            </p>
            <p>
              I urge every devotee to associate themselves with this holy cause. Even the smallest donation, or a few hours of weekend volunteering, brings immeasurable peace to your life and divine blessings to your family.
            </p>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  With Infinite Blessings &amp; Sincere Prayers,
                </p>
                <p className="text-xs text-ngo-orange font-bold">
                  Sarva Samarpit Sewa Sansthan Seva Mandal
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/donate"
                  className="px-5 py-2.5 rounded-md bg-ngo-orange text-white text-xs font-bold shadow hover:bg-ngo-orange-600 transition-colors"
                >
                  Join the Seva Fund
                </Link>
                <a
                  href={`tel:${ORG_DETAILS.phone}`}
                  className="px-5 py-2.5 rounded-md bg-ngo-dark text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Call Helpline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
