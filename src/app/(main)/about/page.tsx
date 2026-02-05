"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Zap } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">
            About CyberTech // Established 2024
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-8">
            Reliable electronics. No guesswork.
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-12">
            CyberTech is an online electronics store focused on selling quality,
            reliable devices at fair prices. We make it easy to find, buy, and
            receive the tech you need—without confusion or unnecessary stress.
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden">
          <Image
            src="/images/about-hero.png"
            alt="Electronics workspace"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              Our goal is simple: help people buy electronics with confidence.
              We work with trusted suppliers, focus on products with proven
              reliability, and provide clear support before and after purchase.
            </p>
            <div className="pt-4">
              <div className="h-px w-20 bg-gray-900" />
            </div>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-[32px] overflow-hidden border border-gray-100">
            <Image
              src="/images/about-mission.png"
              alt="Team handling electronics"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <Zap className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-gray-900">
              Carefully Selected Products
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We focus on electronics that offer real value—no overcrowded
              listings, no low-quality knockoffs.
            </p>
          </div>

          <div className="space-y-4">
            <Truck className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-gray-900">
              Fast Processing
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Orders are processed quickly and shipped with tracking so you know
              exactly where your item is.
            </p>
          </div>

          <div className="space-y-4">
            <ShieldCheck className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-gray-900">
              Customer Support
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Need help choosing a product or resolving an issue? Our support
              team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-medium tracking-tight text-gray-900">
            Shop electronics with confidence
          </h2>
          <p className="text-gray-500 font-light">
            Browse our collection and get dependable tech delivered to your
            doorstep.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gray-900 text-white py-4 px-10 rounded-2xl hover:bg-black transition-all group"
          >
            <span className="text-sm font-medium uppercase tracking-widest">
              Shop Now
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
