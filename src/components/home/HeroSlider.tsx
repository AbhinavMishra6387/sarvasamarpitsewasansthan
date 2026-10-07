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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-orange-200 text-xs font-medium tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-xs bg-orange-400" />
            {SLIDES[current].tag}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight text-white">
            {SLIDES[current].title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
            {SLIDES[current].subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={SLIDES[current].ctaLink}
              className="px-5 py-2.5 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-medium text-sm sm:text-base shadow-xs transition-colors flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              {SLIDES[current].ctaText}
            </Link>

            <Link
              href="/volunteer"
              className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm sm:text-base backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              Join as Volunteer <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${ORG_DETAILS.phone}`}
              className="hidden sm:flex items-center gap-2 text-stone-300 hover:text-orange-400 text-sm font-medium ml-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>{ORG_DETAILS.phone} (24x7)</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-6 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Tax Deductible (80G)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-400" /> Open 24 Hours
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400" /> Shree Bade Hanuman Ji Temple, Sangam Marg
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-md bg-black/50 hover:bg-black/70 text-white border border-white/10 backdrop-blur-sm transition-colors hidden md:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-md bg-black/50 hover:bg-black/70 text-white border border-white/10 backdrop-blur-sm transition-colors hidden md:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-xs transition-all ${
              idx === current ? "w-6 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
