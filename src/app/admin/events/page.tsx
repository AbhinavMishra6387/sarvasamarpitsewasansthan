"use client";

import React, { useState } from "react";
import { Calendar, Plus, Trash2, MapPin, Users, CheckCircle2 } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([
    {
      id: "evt-001",
      title: "Annual Mahakumbh & Magh Mela Annapurna Seva 2026",
      date: "15 November 2026",
      location: "Sector 3, Sangam Ghat, Prayagraj",
      maxAttendees: 2000,
      registered: 840,
      isUpcoming: true,
    },
    {
      id: "evt-002",
      title: "Shree Bade Hanuman Jayanti Mahotsav & Free Health Camp",
      date: "25 October 2026",
      location: "Bade Hanuman Mandir Hall, Prayagraj",
      maxAttendees: 1500,
      registered: 620,
      isUpcoming: true,
    },
    {
      id: "evt-003",
      title: "Sheetkal Seva: 5,000 Woollen Blankets Distribution",
      date: "01 December 2026",
      location: "Prayagraj Junction & Sangam Bandh",
      maxAttendees: 500,
      registered: 210,
      isUpcoming: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Bade Hanuman Ji Temple, Sangam Marg, Prayagraj");
  const [maxAttendees, setMaxAttendees] = useState(500);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    const newEvt = {
      id: `evt-${Date.now()}`,
      title,
      date,
      location,
      maxAttendees: Number(maxAttendees) || 500,
      registered: 0,
      isUpcoming: true,
    };
    setEvents([...events, newEvt]);
    setShowModal(false);
    setTitle("");
    setDate("");
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Events &amp; Mahotsav Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize upcoming Annapurna camps, health checkup drives, and temple festivals.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Event Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Location</th>
              <th className="p-4">Registrations</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900 max-w-sm truncate">{e.title}</td>
                <td className="p-4 font-semibold text-gray-700">{e.date}</td>
                <td className="p-4 text-gray-600">{e.location}</td>
                <td className="p-4 font-bold text-ngo-orange">
                  {e.registered} / {e.maxAttendees}
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteEvent(e.id)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">Create Seva Event</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Cardiac Diagnostic Camp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Event Date (e.g. 15 Nov 2026) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 November 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Max Attendee Capacity</label>
                <input
                  type="number"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(parseInt(e.target.value) || 500)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-ngo-orange text-white rounded-md font-bold">
                  Publish Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-md font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
