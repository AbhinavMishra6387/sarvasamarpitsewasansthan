import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DonationForm } from "@/components/donation/DonationForm";
import { HeartPulse, CheckCircle2, ShieldCheck, Stethoscope, Pill } from "lucide-react";

export const metadata = {
  title: "Free Medical Camps & Clinics | Sarva Samarpit Sewa Sansthan",
  description: "Free medical clinics, physician consultations, and medicine distribution for underprivileged pilgrims in Prayagraj.",
};

export default function MedicalCampsPage() {
  return (
    <div>
      <PageHeader
        title="Free Medical Camps &amp; Healthcare Clinics"
        subtitle="Bringing specialized physicians, essential pharmaceuticals, and diagnostic screenings to underprivileged families and Sangam pilgrims."
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Medical Camps" }]}
        badge="Healthcare For All"
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200"
                alt="Free Medical Camp Prayagraj"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ngo-dark">
                Healing the Vulnerable at Triveni Sangam
              </h2>
              <p>
                Access to primary healthcare remains an acute challenge for the floating pilgrim population and daily-wage laborers residing along the riverbanks of Prayagraj. To address this, <strong>Sarva Samarpit Sewa Sansthan</strong> convenes weekend and festival medical camps staffed by volunteer doctors and nursing professionals.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <Stethoscope className="w-6 h-6 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">General Physician OPD</h4>
                    <p className="text-xs text-gray-600 mt-1">Screening for fever, infections, respiratory illness, and gastrointestinal conditions.</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <HeartPulse className="w-6 h-6 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Hypertension &amp; Diabetes</h4>
                    <p className="text-xs text-gray-600 mt-1">Immediate blood sugar and blood pressure checks with preventive lifestyle guidance.</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <Pill className="w-6 h-6 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">100% Free Medicines</h4>
                    <p className="text-xs text-gray-600 mt-1">Prescription medicines, antibiotics, analgesics, and vitamins given at zero cost.</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-ngo-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Emergency First Aid</h4>
                    <p className="text-xs text-gray-600 mt-1">Immediate wound dressing and heat exhaustion relief during major holy bathing days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <DonationForm initialCause="Free Healthcare Clinic & Medicines" />
          </div>
        </div>
      </div>
    </div>
  );
}
