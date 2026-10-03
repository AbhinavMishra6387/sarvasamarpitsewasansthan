import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DonationForm } from "@/components/donation/DonationForm";
import { Heart, BookOpen, Snowflake, Sparkles } from "lucide-react";

export const metadata = {
  title: "Social Welfare, Education & Winter Relief | Sarva Samarpit Sewa Sansthan",
  description: "Child education kits, blanket distribution in harsh winters, and women empowerment in Prayagraj.",
};

export default function SocialWelfarePage() {
  return (
    <div>
      <PageHeader
        title="Social Welfare, Education &amp; Relief"
        subtitle="Protecting the vulnerable with seasonal warm clothing, empowering slum children through education, and uplifting local families."
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Social Welfare" }]}
        badge="Community Development"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200"
                alt="Child Education and Social Welfare Prayagraj"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ngo-dark">
                Uplifting the Underprivileged in Prayagraj
              </h2>
              <p>
                True charity addresses both immediate physical hardship and systemic deprivation. Our social welfare initiatives target two of the most critical vulnerabilities in Northern India:
              </p>

              <div className="space-y-4 my-6">
                <div className="p-5 bg-orange-50/70 rounded-2xl border border-orange-100 flex items-start gap-3.5">
                  <Snowflake className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-base text-gray-900">
                      Sheetkal Seva: Annual Winter Blanket Outreach
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Temperatures in Prayagraj plummet below 4°C during December and January. Our late-night outreach squads traverse railway stations, bus terminuses, hospital grounds, and temple verandas delivering thousands of thick double-ply woollen blankets directly to people shivering in the open.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-orange-50/70 rounded-2xl border border-orange-100 flex items-start gap-3.5">
                  <BookOpen className="w-6 h-6 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-base text-gray-900">
                      Vidya Daan: Supporting Slum Children&apos;s Education
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Supplying free school bags, notebooks, geometry sets, and winter sweaters to over 350 children from slum settlements, ensuring economic distress does not force young minds to drop out of basic schooling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <DonationForm initialCause="Winter Blanket & Warm Clothing Seva" />
          </div>
        </div>
      </div>
    </div>
  );
}
