"use client";

import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-20 px-4 md:px-16 lg:px-28 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About YourStore
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          YourStore is your go-to online destination for the latest electronics,
          gadgets, and accessories. We combine quality products, fast shipping,
          and excellent customer service to give you the best shopping
          experience.
        </p>
        <div className="relative w-full h-64 md:h-96 mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80"
            alt="YourStore Hero Banner"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Mission / Story Section */}
      <section className="py-20 px-4 md:px-16 lg:px-28 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              We believe shopping online should be simple, fast, and enjoyable.
              That’s why we carefully select the best products, offer easy
              returns, and provide round-the-clock customer support.
            </p>
            <p className="text-gray-600 text-lg">
              Whether you&apos;re looking for the newest gadgets or timeless
              electronics, we make sure you get exactly what you need.
            </p>
          </div>
          <div className="relative w-full h-80 md:h-96">
            <Image
              src="/images/mission.jpg" // Replace with a mission-related image
              alt="Our Mission"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-4 md:px-16 lg:px-28 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <Image
                src="/images/selection.jpg" // Replace with icon/image
                alt="Wide Selection"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Wide Selection</h3>
            <p className="text-gray-600">
              Browse hundreds of electronics, accessories, and gadgets. We keep
              our catalog fresh with the latest trends.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <Image
                src="/images/delivery.jpg" // Replace with delivery image
                alt="Fast Delivery"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Fast & Secure Delivery
            </h3>
            <p className="text-gray-600">
              Get your orders delivered quickly and securely, right to your
              doorstep, with reliable shipping options.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <Image
                src="/images/support.jpg" // Replace with support image
                alt="Customer Support"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Customer Support
            </h3>
            <p className="text-gray-600">
              Our friendly support team is available 24/7 to help with orders,
              returns, and any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-action */}
      <section className="py-16 px-4 md:px-16 lg:px-28 text-center bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Ready to Shop?
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our catalog and discover the latest electronics at unbeatable
          prices.
        </p>
        <a
          href="/shop"
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Shopping
        </a>
      </section>
    </div>
  );
};

export default About;
