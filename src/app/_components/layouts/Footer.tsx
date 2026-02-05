"use client";

import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const socialIcons = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20">
          {/* Brand & Mission - 5 Cols */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-3xl font-medium tracking-tighter">CyberTech</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-light">
              Architecting the next generation of personal hardware. Premium
              electronics delivered with technical precision and global
              logistics.
            </p>
            <div className="flex space-x-5">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="p-3 bg-[#111] rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - 7 Cols split into sub-grids */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column: Inventory */}
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
                Inventory
              </h3>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                {[
                  "New_Arrivals",
                  "Processors",
                  "Audio_Gear",
                  "Displays",
                  "Gift_Cards",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors flex items-center group"
                  >
                    {link}
                    <ArrowUpRight
                      size={12}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column: Logistics */}
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
                Logistics
              </h3>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                {[
                  "Order_Tracking",
                  "Returns",
                  "Global_Shipping",
                  "Warranty",
                  "Compliance",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column: Support */}
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
                Interface
              </h3>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                {[
                  "Customer_Hub",
                  "FAQs",
                  "API_Access",
                  "Developer_Logs",
                  "Contact",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-12 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-[10px] tracking-widest text-gray-600 uppercase font-medium">
              &copy; {currentYear} CyberTech_Retail_Systems
            </p>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[9px] tracking-[0.1em] text-gray-600 uppercase">
                System_Online
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <p className="text-[9px] tracking-widest text-gray-600 uppercase hover:text-white cursor-pointer transition-colors">
              Privacy_Protocol
            </p>
            <p className="text-[9px] tracking-widest text-gray-600 uppercase hover:text-white cursor-pointer transition-colors">
              Terms_Of_Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
