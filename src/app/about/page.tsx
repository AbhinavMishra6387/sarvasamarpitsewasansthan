import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { ORG_DETAILS } from "@/lib/constants";
import { ShieldCheck, Heart, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Sarva Samarpit Sewa Sansthan",
  description: "Learn about the origins, charitable mission, and values of Sarva Samarpit Sewa Sansthan in Prayagraj.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Sarva Samarpit Sewa Sansthan"
        subtitle="A beacon of hope, selfless feeding, and medical care operating 24 hours at the sacred confluence of Triveni Sangam, Prayagraj."
        breadcrumbs={[{ label: "About Us" }]}
        badge="Our Journey & Legacy"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-50 px-3 py-1 rounded-md">
              Registered Charitable Trust
            </span>
            <h2 className="text-3xl font-heading font-semibold text-ngo-dark">
              Selfless Service Rooted in Sanatana Values
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>Sarva Samarpit Sewa Sansthan</strong> (Registration No: {ORG_DETAILS.registrationNo}) was founded by revered spiritual thinkers, philanthropists, and local citizens of Prayagraj who recognized the immense need for structured, round-the-clock humanitarian support for millions of pilgrims, sadhus, and destitute residents visiting the sacred Sangam.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Operating under the guiding light of <strong>Shree Bade Hanuman Ji Temple (Bandh Wale Hanuman Ji)</strong>, the Sansthan maintains an unbroken commitment to feed every empty stomach, heal every ailing body, and preserve the spiritual sanctity of our holy rivers.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Section 80G Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Section 12A Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Audited Annual Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Open 24 Hours Akhand Seva</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xs border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200"
              alt="Annapurna Bhandara Seva"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ngo-dark">
              The Four Pillars of Our Sansthan
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Every initiative is governed by strict transparency, compassion, and divine purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="font-heading font-bold text-lg text-ngo-dark mb-2">Annapurna Seva</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Daily fresh hot sattvic meals served continuously at Triveni Sangam bank without discrimination.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="font-heading font-bold text-lg text-ngo-dark mb-2">Arogya Seva</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Free clinical consultations, diagnostic testing, and medicines provided by qualified volunteer doctors.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="font-heading font-bold text-lg text-ngo-dark mb-2">Dharamik Seva</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pilgrim guidance, prasad distribution at Bade Hanuman Ji Temple, and Swachh Sangam cleanliness drives.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-ngo-orange flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h4 className="font-heading font-bold text-lg text-ngo-dark mb-2">Manav Kalyan</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Winter blanket distribution, child educational support kits, and empowerment programs for rural women.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links Submenu */}
        <div className="p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-bold text-xl text-ngo-dark">
              Explore Our Governance &amp; Leadership
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Read our Founder’s message, meet our Board of Trustees, and review our registered vision.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/vision"
              className="px-4 py-2 bg-white hover:bg-ngo-orange hover:text-white rounded-md text-xs font-bold border border-orange-200 transition-colors shadow-sm"
            >
              Vision &amp; Mission
            </Link>
            <Link
              href="/about/trustees"
              className="px-4 py-2 bg-white hover:bg-ngo-orange hover:text-white rounded-md text-xs font-bold border border-orange-200 transition-colors shadow-sm"
            >
              Board of Trustees
            </Link>
            <Link
              href="/about/team"
              className="px-4 py-2 bg-ngo-orange text-white rounded-md text-xs font-bold transition-all shadow-md"
            >
              Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
