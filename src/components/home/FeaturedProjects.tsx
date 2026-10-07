import React from "react";
import Link from "next/link";
import { ArrowRight, Heart, Users, MapPin } from "lucide-react";
import { dbStore } from "@/lib/db-storage";

export async function FeaturedProjects() {
  const projects = await dbStore.getProjects();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-medium tracking-wide text-stone-800 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
              Pillars of Seva
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mt-2">
              Our Ongoing Seva Initiatives
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              From daily nutritional meals to specialized medical clinics, discover how Sarva Samarpit Sewa Sansthan serves every day in Prayagraj.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-stone-800 hover:text-orange-700 font-medium text-sm flex items-center gap-1 group self-start md:self-end"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => {
            const percent = Math.min(Math.round((proj.raisedAmount / proj.targetAmount) * 100), 100);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-lg border border-stone-200 shadow-xs hover:border-stone-300 transition-colors overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/85 backdrop-blur-sm text-white font-medium text-[11px] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-xs bg-emerald-400" />
                    {proj.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-base text-stone-900 line-clamp-2 group-hover:text-orange-700 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                      {proj.shortDesc}
                    </p>
                  </div>

                  {/* Funding Progress */}
                  <div className="mt-5 pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-stone-500">Raised: <strong className="text-stone-900 font-medium">₹{(proj.raisedAmount / 1000).toFixed(0)}k</strong></span>
                      <span className="text-orange-700 font-semibold">{percent}%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-xs overflow-hidden">
                      <div
                        className="bg-orange-700 h-full rounded-xs transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                      >
                        Read Details &rarr;
                      </Link>

                      <Link
                        href={`/donate?cause=${encodeURIComponent(proj.title)}`}
                        className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-black text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Heart className="w-3 h-3 fill-current" /> Donate
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
