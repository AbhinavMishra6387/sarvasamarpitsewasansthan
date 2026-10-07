"use client";

import React, { useState } from "react";
import { Camera, Video, Plus, Trash2, Eye, CheckCircle2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const [photos, setPhotos] = useState<any[]>([
    {
      id: "p-1",
      title: "Akhand Daily Food Distribution at Sangam Marg",
      category: "Annapurna Bhandara",
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "p-2",
      title: "Darshan & Holy Aarti at Shree Bade Hanuman Ji Temple",
      category: "Bade Hanuman Ji Seva",
      url: "https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "p-3",
      title: "Free Sunday Health Checkup & Blood Sugar Screening",
      category: "Medical Camps",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    },
  ]);

  const [videos, setVideos] = useState<any[]>([
    {
      id: "v-1",
      title: "Daily Akhand Bhandara Preparation & Serving",
      category: "Annapurna Langar",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "v-2",
      title: "Triveni Sangam Free Healthcare Camp Coverage",
      category: "Medical Seva",
      youtubeId: "dQw4w9WgXcQ",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("Annapurna Bhandara");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    if (activeTab === "photos") {
      setPhotos([
        {
          id: `p-${Date.now()}`,
          title: newTitle,
          url: newUrl,
          category: newCategory,
        },
        ...photos,
      ]);
    } else {
      setVideos([
        {
          id: `v-${Date.now()}`,
          title: newTitle,
          youtubeId: newUrl.replace("https://youtu.be/", "").replace("https://www.youtube.com/watch?v=", ""),
          category: newCategory,
        },
        ...videos,
      ]);
    }

    setShowAddModal(false);
    setNewTitle("");
    setNewUrl("");
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  const deleteVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Media &amp; Gallery Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload photos, organize albums, and embed YouTube seva highlights directly to public media pages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> {activeTab === "photos" ? "Add Photo to Album" : "Add Video Embed"}
        </button>
      </div>

      <div className="flex border-b border-gray-200 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab("photos")}
          className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 ${
            activeTab === "photos"
              ? "bg-white text-ngo-orange border-t-2 border-ngo-orange shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Camera className="w-4 h-4" /> Photo Albums ({photos.length})
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 ${
            activeTab === "videos"
              ? "bg-white text-ngo-orange border-t-2 border-ngo-orange shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Video className="w-4 h-4" /> Video Gallery ({videos.length})
        </button>
      </div>

      {activeTab === "photos" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((p) => (
            <div key={p.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-ngo-orange uppercase tracking-wider block">{p.category}</span>
                  <h4 className="font-heading font-bold text-sm text-gray-900 mt-1 line-clamp-1">{p.title}</h4>
                </div>
                <div className="pt-3 mt-3 border-t flex justify-end">
                  <button
                    onClick={() => deletePhoto(p.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-ngo-orange uppercase">{v.category}</span>
                  <h4 className="font-heading font-bold text-sm text-gray-900">{v.title}</h4>
                </div>
                <button
                  onClick={() => deleteVideo(v.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">
              {activeTab === "photos" ? "Upload / Add Photo URL" : "Embed YouTube Video"}
            </h3>
            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily Annapurna Bhandara near Sangam"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {activeTab === "photos" ? "Image URL (Cloudinary / CDN / HTTPS) *" : "YouTube Video URL or Video ID *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeTab === "photos" ? "https://images.unsplash.com/..." : "https://youtube.com/watch?v=..."}
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category Album</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange bg-white"
                >
                  <option value="Annapurna Bhandara">Annapurna Bhandara</option>
                  <option value="Bade Hanuman Ji Seva">Bade Hanuman Ji Seva</option>
                  <option value="Medical Camps">Medical Camps</option>
                  <option value="Sangam Snan">Sangam Snan &amp; Kumbh</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-ngo-orange text-white rounded-md font-bold">
                  Publish to Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
