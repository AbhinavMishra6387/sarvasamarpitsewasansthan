import React from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Mail } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export function LocationMapSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-100/70 px-3.5 py-1 rounded-full">
            Visit Us in Prayagraj
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ngo-dark mt-3">
            Our Head Office at Shree Bade Hanuman Ji Temple
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Located right along Sangam Marg, mere minutes from Triveni Sangam. Open 24 hours daily for sevadars, pilgrims, and donors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Information Card */}
          <div className="bg-ngo-dark-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between border-t-4 border-ngo-orange">
            <div className="space-y-6">
              <div>
                <span className="text-xs text-ngo-orange-400 font-bold uppercase tracking-wider block mb-1">
                  Central Seva Ashram
                </span>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Sarva Samarpit Sewa Sansthan
                </h3>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Physical Address:</strong>
                    <span>{ORG_DETAILS.headOffice}</span>
                    <span className="text-xs text-gray-400 block mt-1">Landmark: Near Triveni Sangam, Fort Road</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Timings:</strong>
                    <span className="text-emerald-400 font-semibold">Open 24 Hours (Round The Clock Seva)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">24x7 Helpline / Seva Phone:</strong>
                    <a
                      href={`tel:${ORG_DETAILS.phone}`}
                      className="text-white font-bold hover:text-ngo-orange transition-colors"
                    >
                      {ORG_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Official Email:</strong>
                    <a
                      href={`mailto:${ORG_DETAILS.email}`}
                      className="hover:text-ngo-orange transition-colors"
                    >
                      {ORG_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={ORG_DETAILS.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" /> Get Driving Directions
              </a>
              <a
                href={`tel:${ORG_DETAILS.phone}`}
                className="py-3 px-4 rounded-xl bg-ngo-dark-800 hover:bg-ngo-dark-700 text-gray-200 border border-gray-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-ngo-orange" /> Call Now
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-card border border-gray-200 relative min-h-[380px] bg-gray-100">
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
