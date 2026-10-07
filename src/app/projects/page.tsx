import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { dbStore } from "@/lib/db-storage";
import { Heart, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Our Seva Projects | Sarva Samarpit Sewa Sansthan",
  description: "Explore the impactful projects operated by Sarva Samarpit Sewa Sansthan across Prayagraj and Triveni Sangam.",
};

export default async function ProjectsPage() {
  const projects = await dbStore.getProjects();

  return (
    <div>
      <PageHeader
        title="Our Seva Projects &amp; Initiatives"
        subtitle="Transforming communities across Prayagraj through daily meals, free healthcare clinics, and pilgrimage assistance."
        breadcrumbs={[{ label: "Projects" }]}
        badge="Ground Impact"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const percent = Math.min(Math.round((proj.raisedAmount / proj.targetAmount) * 100), 100);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-xs transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-transition-colors duration-200 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-ngo-dark/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ngo-orange" />
                    <span>{proj.location}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                    {proj.status}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-gray-900 group-hover:text-ngo-orange transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                      {proj.fullDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">
                        Raised: <strong className="text-gray-900 font-bold">₹{proj.raisedAmount.toLocaleString("en-IN")}</strong> of ₹{proj.targetAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-ngo-orange font-bold text-sm">{percent}%</span>
                    </div>

                    <div className="w-full bg-gray-100 h-2.5 rounded-xs overflow-hidden mb-6">
                      <div
                        className="bg-ngo-orange h-full rounded-xs transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="text-xs font-bold text-gray-700 hover:text-ngo-orange transition-colors flex items-center gap-1"
                      >
                        <span>View In-Depth Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/donate?cause=${encodeURIComponent(proj.title)}`}
                        className="px-5 py-2.5 rounded-md bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Sponsor this Project</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
