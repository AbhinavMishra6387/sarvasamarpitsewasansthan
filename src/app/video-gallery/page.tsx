import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Play, Video } from "lucide-react";

export const metadata = {
  title: "Video Gallery | Sarva Samarpit Sewa Sansthan",
  description: "Watch inspiring video clips of our 24/7 Annapurna kitchen, Bhandara seva, and Bade Hanuman Ji Temple aartis.",
};

const VIDEOS = [
  {
    title: "Daily Akhand Bhandara Preparation & Serving at Sangam Marg",
    desc: "Behind the scenes in our mega kitchen serving thousands of warm sattvic meals daily.",
    embedId: "dQw4w9WgXcQ", // Standard embed format
    category: "Annapurna Langar",
  },
  {
    title: "Triveni Sangam Free Healthcare Camp Coverage",
    desc: "Volunteer doctors conducting diagnostic checkups and dispensing free medicines.",
    embedId: "dQw4w9WgXcQ",
    category: "Medical Seva",
  },
  {
    title: "Shree Bade Hanuman Ji Mandir Mangla Aarti & Pilgrim Seva",
    desc: "Devotional morning prayers and seva at the sacred reclining Hanuman Ji Temple.",
    embedId: "dQw4w9WgXcQ",
    category: "Temple Seva",
  },
];

export default function VideoGalleryPage() {
  return (
    <div>
      <PageHeader
        title="Video Gallery &amp; Seva Chronicles"
        subtitle="Experience live video glimpses of our kitchen operations, healthcare camps, and divine temple gatherings in Prayagraj."
        breadcrumbs={[{ label: "Video Gallery" }]}
        badge="Seva in Motion"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.embedId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-ngo-orange uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
                    {v.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-gray-900 mt-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">{v.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
