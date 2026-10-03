"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

const SLIDES = [
  {
    title: "Akhand Annapurna Bhandara at Triveni Sangam",
    subtitle: "Ensuring no pilgrim or destitute soul goes hungry in the holy land of Prayagraj. Freshly cooked, nutritious meals served daily 24/7.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1600",
    tag: "365-Day Daily Food Seva",
    ctaText: "Sponsor A Meal",
    ctaLink: "/donate",
  },
  {
    title: "Selfless Service at Shree Bade Hanuman Ji Temple",
    subtitle: "Situated at sacred Sangam Marg, our sevadars provide elder assistance, prasad seva, and conduct regular holy riverbank cleanliness drives.",
    image: "https://images.unsplash.com/photo-1609137144822-261ef4216839?auto=format&fit=crop&q=80&w=1600",
    tag: "Spiritual Welfare & Cleanliness",
    ctaText: "Support Temple Seva",
    ctaLink: "/projects/religious-activities",
  },
  {
    title: "Free Medical Clinics & Life-Saving Healthcare",
    subtitle: "Empowering rural pilgrims and impoverished communities with free doctor consultations, blood tests, and vital prescribed medications.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600",
    tag: "Compassionate Healthcare",
    ctaText: "Sponsor Medical Camp",
    ctaLink: "/projects/medical-camps",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="relative overflow-hidden bg-ngo-dark-900 min-h-[550px] lg:min-h-[620px] flex items-center">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(18, 18, 18, 0.92) 0%, rgba(18, 18, 18, 0.75) 50%, rgba(18, 18, 18, 0.5) 100%), url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ngo-orange/30 border border-ngo-orange/50 text-ngo-orange-300 text-xs sm:text-sm font-bold tracking-wide uppercase mb-4 animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-ngo-orange animate-ping" />
            {SLIDES[current].tag}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight text-white drop-shadow-md">
            {SLIDES[current].title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed font-light">
            {SLIDES[current].subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={SLIDES[current].ctaLink}
              className="px-7 py-3.5 rounded-full bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-ngo-orange/30 hover:shadow-glow transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-5 h-5 fill-white" />
              {SLIDES[current].ctaText}
            </Link>

            <Link
              href="/volunteer"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm sm:text-base backdrop-blur-sm transition-all flex items-center gap-2"
            >
              Join as Volunteer <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${ORG_DETAILS.phone}`}
              className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-ngo-orange-400 text-sm font-semibold ml-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-ngo-orange" />
              <span>{ORG_DETAILS.phone} (24x7)</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 pt-6 border-t border-gray-700/60 flex flex-wrap items-center gap-6 text-xs text-gray-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Tax Deductible (80G)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-ngo-orange" /> Open 24 Hours
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-ngo-orange" /> Shree Bade Hanuman Ji Temple, Sangam Marg
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-ngo-orange text-white backdrop-blur-sm transition-all hidden md:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-ngo-orange text-white backdrop-blur-sm transition-all hidden md:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "w-8 bg-ngo-orange" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
