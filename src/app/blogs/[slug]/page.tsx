import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { dbStore } from "@/lib/db-storage";
import { Clock, Calendar, User, ArrowLeft, Heart, Share2 } from "lucide-react";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await dbStore.getBlogBySlug(params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div>
      <PageHeader
        title={blog.title}
        subtitle={`Published by ${blog.authorName} (${blog.authorRole}) &bull; ${blog.category}`}
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: blog.title.slice(0, 30) + "..." },
        ]}
        badge={blog.category}
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="rounded-lg overflow-hidden shadow-xs border-4 border-white max-h-[450px]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between py-4 border-y border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-gray-800">
              <User className="w-4 h-4 text-ngo-orange" /> {blog.authorName}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />{" "}
              {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {blog.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-orange-50 text-ngo-orange font-bold px-2.5 py-1 rounded-md">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-gray-100 shadow-xs prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
          <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
            {blog.content}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Seva Banner */}
        <div className="bg-orange-50 rounded-lg p-8 border border-orange-200 text-center space-y-4">
          <h3 className="font-heading font-bold text-xl text-ngo-dark">
            Support Our Daily Seva in Prayagraj
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Your generous contributions sustain the Annapurna Bhandara and medical outreach highlighted in this article.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/donate"
              className="px-6 py-3 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" /> Donate Now (80G Tax Free)
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-3 rounded-md bg-white text-gray-800 border border-gray-200 font-bold text-xs sm:text-sm hover:bg-gray-50 transition-colors"
            >
              &larr; More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
