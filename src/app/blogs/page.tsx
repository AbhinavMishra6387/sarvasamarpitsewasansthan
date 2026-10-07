import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { dbStore } from "@/lib/db-storage";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";

export const metadata = {
  title: "Blogs & Philanthropic Articles | Sarva Samarpit Sewa Sansthan",
  description: "Insightful articles on the philosophy of Annadanam, spiritual traditions of Prayagraj, 80G tax exemptions, and holistic seva.",
};

export default async function BlogsPage() {
  const blogs = await dbStore.getBlogs();

  return (
    <div>
      <PageHeader
        title="Blogs &amp; Philanthropic Articles"
        subtitle="Insights on spiritual philosophy, the sacred virtues of Annadanam, and practical guides on 80G tax exemptions."
        breadcrumbs={[{ label: "Blogs" }]}
        badge="Wisdom & Seva"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-transition-colors duration-200 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-ngo-orange text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />{" "}
                      {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 group-hover:text-ngo-orange transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">By {blog.authorName}</span>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-xs font-bold text-ngo-orange hover:text-ngo-orange-700 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
