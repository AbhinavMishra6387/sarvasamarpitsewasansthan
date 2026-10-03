"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Image as ImageIcon, Camera, Filter } from "lucide-react";

const CATEGORIES = ["All Photos", "Annapurna Bhandara", "Bade Hanuman Ji Seva", "Medical Camps", "Sangam Snan"];

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Akhand Daily Food Distribution at Sangam Marg",
    category: "Annapurna Bhandara",
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Darshan & Holy Aarti at Shree Bade Hanuman Ji Temple",
    category: "Bade Hanuman Ji Seva",
    url: "https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Free Sunday Health Checkup & Blood Sugar Screening",
    category: "Medical Camps",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Devotees Taking Holy Snan at Triveni Confluence",
    category: "Sangam Snan",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Hot Kheer & Puri Mahaprasad Preparation",
    category: "Annapurna Bhandara",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Volunteer Doctors Examining Rural Elderly Patients",
    category: "Medical Camps",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const filtered = activeCategory === "All Photos"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div>
      <PageHeader
        title="Photo Gallery &amp; Seva Moments"
        subtitle="Visual glimpses of round-the-clock langar, holy festivities, and clinical seva in Prayagraj."
        breadcrumbs={[{ label: "Gallery" }]}
        badge="Moments of Compassion"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-ngo-orange text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-soft hover:shadow-card cursor-pointer border border-gray-100 bg-gray-100"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <span className="text-[10px] font-bold text-ngo-orange uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">
                    {photo.category}
                  </span>
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base mt-1.5 leading-snug">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-6 bg-white flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-ngo-orange uppercase">{selectedPhoto.category}</span>
                  <h3 className="font-heading font-bold text-gray-900 text-lg">{selectedPhoto.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
