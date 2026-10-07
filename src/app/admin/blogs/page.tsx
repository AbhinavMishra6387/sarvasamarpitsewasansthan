"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Trash2, Eye, CheckCircle2, Clock } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([
    {
      id: "blg-001",
      slug: "sacred-significance-of-annadanam-at-triveni-sangam",
      title: "The Sacred Significance of Annadanam at Triveni Sangam: Why Feeding Every Soul Matters",
      category: "Spiritual Philosophy",
      author: "Pujya Swami Ji",
      readTime: "5 min read",
      isPublished: true,
      viewCount: 1420,
    },
    {
      id: "blg-002",
      slug: "holistic-healthcare-for-underprivileged-pilgrims",
      title: "Healing with Compassion: How Our Volunteer Doctors Bring Hope to Rural Pilgrims",
      category: "Health & Seva",
      author: "Dr. Ananya Mishra",
      readTime: "4 min read",
      isPublished: true,
      viewCount: 980,
    },
    {
      id: "blg-003",
      slug: "understanding-80g-tax-benefits-for-charitable-donations",
      title: "Maximizing Impact: A Guide to 80G Tax Exemption for Donors to Sarva Samarpit Sewa Sansthan",
      category: "Compliance & 80G",
      author: "Chartered Advisory Desk",
      readTime: "6 min read",
      isPublished: true,
      viewCount: 1650,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Social Welfare");
  const [author, setAuthor] = useState("Sarva Samarpit Editorial Desk");
  const [content, setContent] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const newBlog = {
      id: `blg-${Date.now()}`,
      slug,
      title,
      category,
      author,
      readTime: "4 min read",
      isPublished: true,
      viewCount: 0,
    };
    setBlogs([newBlog, ...blogs]);
    setShowModal(false);
    setTitle("");
    setContent("");
  };

  const togglePublish = (id: string) => {
    setBlogs(blogs.map((b) => (b.id === id ? { ...b, isPublished: !b.isPublished } : b)));
  };

  const deleteBlog = (id: string) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Blog &amp; Article Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Write, publish, and optimize articles on Annapurna Seva, spiritual values, and 80G tax rules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Views</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900 max-w-md truncate">
                  <Link href={`/blogs/${b.slug}`} target="_blank" className="hover:text-ngo-orange">
                    {b.title}
                  </Link>
                </td>
                <td className="p-4 font-semibold text-ngo-orange">{b.category}</td>
                <td className="p-4 text-gray-600">{b.author}</td>
                <td className="p-4 font-bold text-gray-700">{b.viewCount.toLocaleString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => togglePublish(b.id)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      b.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {b.isPublished ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blogs/${b.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-600 hover:text-ngo-orange"
                      title="View Article"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteBlog(b.id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">Write New Article</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Transformative Power of Langar at Sangam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange bg-white"
                  >
                    <option value="Spiritual Philosophy">Spiritual Philosophy</option>
                    <option value="Health & Seva">Health &amp; Seva</option>
                    <option value="Compliance & 80G">Compliance &amp; 80G</option>
                    <option value="Social Welfare">Social Welfare</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Article Content (Markdown supported)</label>
                <textarea
                  rows={6}
                  placeholder="Write your article text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-ngo-orange"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-ngo-orange text-white rounded-md font-bold">
                  Publish Article
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
