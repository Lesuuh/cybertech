"use client";

import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialIcons = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
];

const Footer = () => {
  return (
    <section className="max-w-[2000px] py-20 px-4 md:px-16 lg:px-28 mx-auto w-full mt-20 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About + social on desktop */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">Cyber</h2>
          <p className="mb-6 max-w-md leading-relaxed text-[#cfcfcf]">
            We are a residential interior design firm located in Portland. Our
            boutique studio offers more than just design — we deliver tailored
            solutions for your space.
          </p>

          {/* Social icons desktop */}
          <div className="hidden md:flex space-x-6 pt-20">
            {socialIcons.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-8 text-sm text-[#cfcfcf]">
            <li>Interior Design Consultation</li>
            <li>Space Planning & Layout</li>
            <li>Furniture Selection</li>
            <li>Lighting Design</li>
            <li>Custom Decor Solutions</li>
          </ul>
        </div>

        {/* Assistance */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Assistance to the Buyer
          </h3>
          <ul className="space-y-8 text-sm text-[#cfcfcf]">
            <li>Product Warranty Info</li>
            <li>Order Tracking</li>
            <li>Return Policy</li>
            <li>Payment Methods</li>
            <li>Customer Support</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      {/* Social icons mobile */}
      <div className="mt-10 flex justify-center space-x-6 md:hidden">
        {socialIcons.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Footer;
