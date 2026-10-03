import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Eye, Target, Compass, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Vision & Philosophy | Sarva Samarpit Sewa Sansthan",
  description: "The overarching vision of Sarva Samarpit Sewa Sansthan: To cultivate a society where no soul goes hungry or untreated.",
};

export default function VisionPage() {
  return (
    <div>
      <PageHeader
        title="Our Vision &amp; Ideology"
        subtitle="Empowering communities, eradicating hunger at sacred pilgrimages, and nurturing universal brotherhood through dedicated, non-stop seva."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Vision" }]}
        badge="Divine Inspiration"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-orange-100 text-ngo-orange">
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ngo-dark">
                The Vision
              </h2>
              <p className="text-xs text-ngo-orange font-bold uppercase tracking-wider">
                Sarva Dharma Sambhava &bull; Daridra Narayana Seva
              </p>
            </div>
          </div>

          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="text-lg font-semibold text-gray-900 italic border-l-4 border-ngo-orange pl-4 bg-orange-50/50 py-3 rounded-r-xl">
              &ldquo;To realize a compassionate society in which every pilgrim, destitute person, elder, and child in Prayagraj has access to wholesome nourishment, dignified medical healing, and spiritual solace—fostering holistic upliftment without boundary of caste, creed, or background.&rdquo;
            </p>

            <h3 className="font-heading font-bold text-lg text-gray-900 pt-4">Strategic Vision Goals:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                <span><strong>Zero Hunger at Sangam:</strong> Operating an uninterrupted, tech-enabled 24/7 centralized kitchen providing 10,000+ meals daily during major holy bathing events like Kumbh and Magh Mela.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                <span><strong>Preventive Rural Healthcare:</strong> Deploying mobile diagnostic vans across Prayagraj rural circles equipped with automated blood analyzers, ECG, and telemedicine connectivity.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                <span><strong>Clean Ganga-Yamuna Sacred Waters:</strong> Promoting ecologically conscious pilgrimage habits, plastic-free ghat practices, and continuous eco-friendly leaf plate recycling.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/about/mission"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ngo-orange text-white font-bold text-sm shadow-md hover:bg-ngo-orange-600 transition-colors"
          >
            <span>Proceed to Our Mission &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
