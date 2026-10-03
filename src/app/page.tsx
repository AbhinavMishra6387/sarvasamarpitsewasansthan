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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-ngo-orange-700 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-ngo-orange fill-ngo-orange" />
              <span>About Sarva Samarpit Sewa Sansthan</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-ngo-dark leading-tight">
              Selfless Devotion in the Sacred Land of Prayagraj
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Established under the divine aegis of the holy Triveni Sangam, <strong>Sarva Samarpit Sewa Sansthan</strong> is a registered charitable trust operating 24 hours daily from its head office adjacent to the iconic <strong>Shree Bade Hanuman Ji Temple (Sangam Marg)</strong>.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our core mission rests on the principle of <em>Nar Seva is Narayan Seva</em>. Whether through our continuous Annapurna Bhandara serving freshly prepared meals to pilgrims, comprehensive free medical clinics, or preserving the sacred cleanliness of the Ganga and Yamuna riverbanks, our dedicated team of sevadars works untiringly 365 days a year.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-ngo-orange shrink-0" />
                <span>365-Day 24x7 Hot Meals (Langar)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-ngo-orange shrink-0" />
                <span>100% Tax Deductible (80G & 12A)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-ngo-orange shrink-0" />
                <span>Doctor Consultations & Free Medicines</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-ngo-orange shrink-0" />
                <span>Swachh Sangam Cleanliness Drives</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-ngo-dark text-white font-bold text-sm hover:bg-black transition-all flex items-center gap-2"
              >
                <span>Read Full Sansthan History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/trustees"
                className="px-6 py-3 rounded-full bg-orange-50 text-ngo-orange font-bold text-sm hover:bg-orange-100 transition-all border border-orange-200"
              >
                Meet Board of Trustees
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=1200"
                alt="Shree Bade Hanuman Ji Temple Sangam Seva"
                className="w-full h-[450px] object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-orange-100 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-ngo-orange text-white flex items-center justify-center font-bold text-xl shrink-0">
                  ॐ
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-gray-900 leading-tight">
                    Shree Bade Hanuman Ji
                  </h4>
                  <p className="text-xs text-ngo-orange font-semibold">Head Office, Sangam Marg</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Revered as Bandh Wale Hanuman Ji, our sevadars assist pilgrims and manage prasad round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flagship Projects Showcase */}
      <FeaturedProjects />

      {/* 6. Live Donation Portal Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-ngo-orange-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-ngo-orange" />
                <span>Instant 80G Tax Exemption Certificate</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-ngo-dark leading-tight">
                Support Daily Food &amp; Healthcare Seva
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                In Indian philosophy, offering food (*Annadanam*) is considered the highest form of sacrifice. Your contribution provides warm meals and critical medication to elders, destitute individuals, and devotees at Triveni Sangam.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-ngo-orange flex items-center justify-center shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">100% Tax Exemption Under Section 80G</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Receive an instant electronic 80G certificate with Trust PAN &amp; Registration details.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-ngo-orange flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Complete Transparency</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Donations are audited by registered Chartered Accountants and published in annual reports.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-ngo-orange flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Flexible Payment Gateways</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange bg-orange-100 px-3.5 py-1 rounded-full">
                Calendar of Seva
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ngo-dark mt-2">
                Upcoming Seva Events &amp; Festivals
              </h2>
            </div>
            <Link
              href="/events"
              className="text-ngo-orange hover:text-ngo-orange-700 font-bold text-sm flex items-center gap-1 group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-ngo-dark/85 backdrop-blur-sm text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ngo-orange" />
                    <span>{new Date(evt.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 group-hover:text-ngo-orange transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-3">
                      <MapPin className="w-3.5 h-3.5 text-ngo-orange shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {evt.registeredCount} / {evt.maxAttendees} Attending
                    </span>
                    <Link
                      href="/events"
                      className="px-3.5 py-1.5 rounded-lg bg-orange-50 hover:bg-ngo-orange text-ngo-orange hover:text-white font-bold text-xs transition-colors"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ngo-dark-900 via-ngo-dark-800 to-ngo-dark-900 text-white border-y-4 border-ngo-orange">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-ngo-orange-400 bg-white/10 px-3.5 py-1 rounded-full">
              Become a Sevadar
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Lend a Helping Hand at Triveni Sangam
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Doctors, students, teachers, IT professionals, and devotees—join over 640+ active volunteers dedicating their skills to human welfare.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/volunteer"
              className="px-7 py-3.5 rounded-full bg-ngo-orange hover:bg-ngo-orange-600 text-white font-bold text-sm shadow-lg shadow-ngo-orange/30 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Apply as Volunteer</span>
            </Link>
            <Link
              href="/membership"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all"
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
