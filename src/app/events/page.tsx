"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Calendar, MapPin, Clock, Users, CheckCircle2, Heart } from "lucide-react";

const EVENTS = [
  {
    id: "evt-001",
    title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
    desc: "A 45-day continuous non-stop food distribution and round-the-clock shelter tent setup for hundreds of thousands of pilgrims congregating at Sangam.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
    date: "15 November 2026",
    time: "06:00 AM - 11:00 PM Daily",
    location: "Sector 3, Sangam Ghat, Prayagraj",
    maxAttendees: 2000,
    registered: 840,
  },
  {
    id: "evt-002",
    title: "Shree Bade Hanuman Jayanti Mahotsav & Free Health Camp",
    desc: "Grand abhishek, 108 Sundarkand paath recitations, mega blood donation drive, and free eye surgery screening for senior citizens.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    date: "25 October 2026",
    time: "08:00 AM - 08:00 PM",
    location: "Bade Hanuman Mandir Hall, Sangam Marg, Prayagraj",
    maxAttendees: 1500,
    registered: 620,
  },
  {
    id: "evt-003",
    title: "Sheetkal Seva: 5,000 Woollen Blankets Distribution",
    desc: "Night outreach across Prayagraj city to protect homeless brothers, sisters, and sadhus from biting winter frost.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    date: "01 December 2026",
    time: "08:00 PM - 02:00 AM",
    location: "Prayagraj Junction, Civil Lines, and Sangam Bandh",
    maxAttendees: 500,
    registered: 210,
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      selectedEvent.registered += 1;
      setRegSuccess(true);
    }
  };

  return (
    <div>
      <PageHeader
        title="Events &amp; Holy Mahotsavs"
        subtitle="Participate in our upcoming mega seva camps, spiritual festivals, and winter relief drives in Prayagraj."
        breadcrumbs={[{ label: "Events" }]}
        badge="Community Confluence"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Featured Countdown Banner */}
        <div className="bg-gradient-to-r from-ngo-orange-600 to-amber-600 text-white rounded-lg p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-md">
              Upcoming Flagship Seva
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold">
              Magh Mela &amp; Mahakumbh Annapurna Mega Camp
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              Volunteers are gearing up to prepare 15,000+ meals daily at Sector 3, Sangam Ghat. Join our sevadar brigade!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-heading font-bold block">45</span>
              <span className="text-[10px] uppercase font-bold text-orange-100">Days</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-heading font-bold block">24</span>
              <span className="text-[10px] uppercase font-bold text-orange-100">Hours</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-heading font-bold block">600+</span>
              <span className="text-[10px] uppercase font-bold text-orange-100">Sevadars</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-transition-colors duration-200 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-ngo-dark/85 backdrop-blur-sm text-white font-bold text-xs px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-ngo-orange" />
                  <span>{evt.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-gray-900 group-hover:text-ngo-orange transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {evt.desc}
                  </p>

                  <div className="space-y-1.5 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-ngo-orange shrink-0" />
                      <span>{evt.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-ngo-orange shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    <strong>{evt.registered}</strong> attending
                  </span>
                  <button
                    onClick={() => {
                      setSelectedEvent(evt);
                      setRegSuccess(false);
                    }}
                    className="px-4 py-2 rounded-md bg-orange-50 hover:bg-ngo-orange text-ngo-orange hover:text-white font-bold text-xs transition-colors"
                  >
                    Register Free &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-sm relative border-t-4 border-ngo-orange">
              {regSuccess ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-gray-900">
                    You Are Registered!
                  </h4>
                  <p className="text-xs text-gray-600">
                    We look forward to welcoming you to {selectedEvent.title}. An SMS / WhatsApp reminder will be sent to {regPhone}.
                  </p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2.5 rounded-md bg-ngo-orange text-white text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <h4 className="font-heading font-bold text-lg text-gray-900">
                    Register for {selectedEvent.title}
                  </h4>
                  <p className="text-xs text-gray-500">Free admission for all devotees and sevadars.</p>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-ngo-orange"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-ngo-orange hover:bg-ngo-orange-600 text-white rounded-md text-xs font-bold"
                    >
                      Confirm Registration
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
