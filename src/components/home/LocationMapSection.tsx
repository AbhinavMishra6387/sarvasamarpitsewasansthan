import React from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Mail } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export function LocationMapSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium tracking-wide text-stone-800 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
            Visit Us in Prayagraj
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mt-3">
            Our Head Office at Shree Bade Hanuman Ji Temple
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Located right along Sangam Marg, mere minutes from Triveni Sangam. Open 24 hours daily for sevadars, pilgrims, and donors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Information Card */}
          <div className="bg-stone-900 text-white p-8 rounded-lg shadow-sm flex flex-col justify-between border border-stone-800 border-t-2 border-t-orange-700">
            <div className="space-y-6">
              <div>
                <span className="text-xs text-orange-400 font-medium uppercase tracking-wider block mb-1">
                  Central Seva Ashram
                </span>
                <h3 className="text-2xl font-heading font-semibold text-white">
                  Sarva Samarpit Sewa Sansthan
                </h3>
              </div>

              <div className="space-y-4 text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Physical Address:</strong>
                    <span>{ORG_DETAILS.headOffice}</span>
                    <span className="text-xs text-stone-400 block mt-1">Landmark: Near Triveni Sangam, Fort Road</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Timings:</strong>
                    <span className="text-emerald-400 font-medium">Open 24 Hours (Round The Clock Seva)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">24x7 Helpline / Seva Phone:</strong>
                    <a
                      href={`tel:${ORG_DETAILS.phone}`}
                      className="text-white font-medium hover:text-orange-400 transition-colors"
                    >
                      {ORG_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Official Email:</strong>
                    <a
                      href={`mailto:${ORG_DETAILS.email}`}
                      className="hover:text-orange-400 transition-colors"
                    >
                      {ORG_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" /> Get Driving Directions
              </a>
              <a
                href={`tel:${ORG_DETAILS.phone}`}
                className="py-2.5 px-4 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-400" /> Call Now
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-xs border border-stone-200 relative min-h-[380px] bg-stone-100">
            <iframe
              src={ORG_DETAILS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sarva Samarpit Sewa Sansthan Head Office Google Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
