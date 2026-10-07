import React from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
} from "lucide-react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StatisticsCounter } from "@/components/home/StatisticsCounter";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { LocationMapSection } from "@/components/home/LocationMapSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NoticePopupModal } from "@/components/home/NoticePopupModal";
import { DonationForm } from "@/components/donation/DonationForm";
import { dbStore } from "@/lib/db-storage";
import { ORG_DETAILS } from "@/lib/constants";

export default async function HomePage() {
  const events = (await dbStore.getEvents()).slice(0, 3);
  const blogs = (await dbStore.getBlogs()).slice(0, 3);

  return (
    <div>
      {/* 1. High-Priority Announcement Modal Popup */}
      <NoticePopupModal />

      {/* 2. Hero Carousel */}
      <HeroSlider />

      {/* 3. Statistical Impact Counters */}
      <StatisticsCounter />

      {/* 4. About NGO Summary Section */}
      {/* 4. About NGO Summary Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium tracking-wide border border-stone-200">
              <Flame className="w-3.5 h-3.5 text-orange-700" />
              <span>About Sarva Samarpit Sewa Sansthan</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-900 tracking-tight leading-tight">
              Selfless Devotion in the Sacred Land of Prayagraj
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Established under the divine aegis of the holy Triveni Sangam, <strong>Sarva Samarpit Sewa Sansthan</strong> is a registered charitable trust operating 24 hours daily from its head office adjacent to the iconic <strong>Shree Bade Hanuman Ji Temple (Sangam Marg)</strong>.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Our core mission rests on the principle of <em>Nar Seva is Narayan Seva</em>. Whether through our continuous Annapurna Bhandara serving freshly prepared meals to pilgrims, comprehensive free medical clinics, or preserving the sacred cleanliness of the Ganga and Yamuna riverbanks, our dedicated team of sevadars works untiringly 365 days a year.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0" />
                <span>365-Day 24x7 Hot Meals (Langar)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0" />
                <span>100% Tax Deductible (80G & 12A)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0" />
                <span>Doctor Consultations & Free Medicines</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0" />
                <span>Swachh Sangam Cleanliness Drives</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-md bg-stone-900 text-white font-medium text-sm hover:bg-black transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Read Full Sansthan History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/trustees"
                className="px-5 py-2.5 rounded-md bg-stone-50 text-stone-800 font-medium text-sm hover:bg-stone-100 transition-colors border border-stone-200"
              >
                Meet Board of Trustees
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xs border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=1200"
                alt="Shree Bade Hanuman Ji Temple Sangam Seva"
                className="w-full h-[450px] object-cover transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-lg shadow-sm border border-stone-200 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-stone-900 text-white flex items-center justify-center font-semibold text-lg shrink-0">
                  ॐ
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-stone-900 leading-tight">
                    Shree Bade Hanuman Ji
                  </h4>
                  <p className="text-xs text-orange-700 font-medium">Head Office, Sangam Marg</p>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                Revered as Bandh Wale Hanuman Ji, our sevadars assist pilgrims and manage prasad round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flagship Projects Showcase */}
      <FeaturedProjects />

      {/* 6. Live Donation Portal Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50/60 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-stone-800 text-xs font-medium tracking-wide border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-orange-700" />
                <span>Instant 80G Tax Exemption Certificate</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight leading-tight">
                Support Daily Food &amp; Healthcare Seva
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                In Indian philosophy, offering food (*Annadanam*) is considered the highest form of sacrifice. Your contribution provides warm meals and critical medication to elders, destitute individuals, and devotees at Triveni Sangam.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 font-medium text-xs border border-stone-200">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">100% Tax Exemption Under Section 80G</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      Receive an instant electronic 80G certificate with Trust PAN &amp; Registration details.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 font-medium text-xs border border-stone-200">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">Complete Transparency</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      Donations are audited by registered Chartered Accountants and published in annual reports.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 font-medium text-xs border border-stone-200">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">Flexible Payment Gateways</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      Donate seamlessly using UPI QR, Razorpay, PhonePe, Debit/Credit Cards, or Direct NEFT/RTGS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <DonationForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Upcoming Events */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-medium tracking-wide text-stone-800 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
                Calendar of Seva
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mt-2">
                Upcoming Seva Events &amp; Festivals
              </h2>
            </div>
            <Link
              href="/events"
              className="text-stone-800 hover:text-orange-700 font-medium text-sm flex items-center gap-1 group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-lg border border-stone-200 shadow-xs hover:border-stone-300 transition-colors overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-sm text-white font-medium text-xs px-3 py-1.5 rounded-md shadow-xs flex items-center gap-1.5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    <span>{new Date(evt.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-base text-stone-900 group-hover:text-orange-700 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-3">
                      <MapPin className="w-3.5 h-3.5 text-orange-700 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      {evt.registeredCount} / {evt.maxAttendees} Attending
                    </span>
                    <Link
                      href="/events"
                      className="px-3 py-1.5 rounded-md bg-stone-100 hover:bg-orange-700 text-stone-800 hover:text-white font-medium text-xs transition-colors border border-stone-200"
                    >
                      Register Now &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Volunteer Invitation Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-950 text-white border-y border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-medium tracking-wide text-orange-400 bg-white/10 px-3 py-1 rounded-md border border-white/10">
              Become a Sevadar
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Lend a Helping Hand at Triveni Sangam
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Doctors, students, teachers, IT professionals, and devotees—join over 640+ active volunteers dedicating their skills to human welfare.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/volunteer"
              className="px-5 py-2.5 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Apply as Volunteer</span>
            </Link>
            <Link
              href="/membership"
              className="px-5 py-2.5 rounded-md bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 font-medium text-sm transition-colors"
            >
              Get Digital Membership Card
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Institutional Partners & Sponsors */}
      <PartnersSection />

      {/* 10. Google Reviews & Business Profile */}
      <GoogleReviewsSection />

      {/* 11. Location & Embedded Google Map */}
      <LocationMapSection />
    </div>
  );
}
