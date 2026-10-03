import React from "react";
import Link from "next/link";
import { ArrowRight, Heart, Users, MapPin } from "lucide-react";
import { dbStore } from "@/lib/db-storage";

export async function FeaturedProjects() {
  const projects = await dbStore.getProjects();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-100/70 px-3.5 py-1 rounded-full">
              Pillars of Seva
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ngo-dark mt-2">
              Our Ongoing Seva Initiatives
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              From daily nutritional meals to specialized medical clinics, discover how Sarva Samarpit Sewa Sansthan serves every day in Prayagraj.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-ngo-orange hover:text-ngo-orange-700 font-bold text-sm flex items-center gap-1 group self-start md:self-end"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => {
            const percent = Math.min(Math.round((proj.raisedAmount / proj.targetAmount) * 100), 100);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-ngo-dark font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {proj.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-ngo-dark line-clamp-2 group-hover:text-ngo-orange transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {proj.shortDesc}
                    </p>
                  </div>

                  {/* Funding Progress */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Raised: <strong className="text-gray-900">₹{(proj.raisedAmount / 1000).toFixed(0)}k</strong></span>
                      <span className="text-ngo-orange font-bold">{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-ngo-orange h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="text-xs font-semibold text-gray-700 hover:text-ngo-orange transition-colors"
                      >
                        Read Details &rarr;
                      </Link>

                      <Link
                        href={`/donate?cause=${encodeURIComponent(proj.title)}`}
                        className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-ngo-orange text-ngo-orange hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
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
