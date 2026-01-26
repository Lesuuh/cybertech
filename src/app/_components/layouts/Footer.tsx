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
          <h2 className="text-2xl font-bold mb-4">CyberTech</h2>
          <p className="mb-6 max-w-md leading-relaxed text-[#cfcfcf]">
            CyberTech is a trusted online retailer offering the latest
            electronics, gadgets, and accessories. Shop with confidence, enjoy
            fast shipping, and excellent customer support.
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

        {/* Shop */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-3 text-sm text-[#cfcfcf]">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Electronics</li>
            <li>Accessories</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-3 text-sm text-[#cfcfcf]">
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Payment Methods</li>
            <li>FAQs</li>
            <li>Contact Us</li>
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
