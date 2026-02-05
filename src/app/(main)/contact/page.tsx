"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message received. We will get back to you shortly.");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Simple Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">
          Support Center
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
          How can we help?
        </h1>
        <p className="text-gray-500 text-lg font-light max-w-xl">
          Whether you have a question about a product, shipping, or technical
          specs, our team is ready to assist.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar: Simple Info */}
          <div className="lg:col-span-4 space-y-12">
            <section className="space-y-8">
              <div className="flex items-start gap-5">
                <Mail
                  className="w-5 h-5 text-gray-400 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium">support@cybertech.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Phone
                  className="w-5 h-5 text-gray-400 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium mb-1">
                    Phone
                  </p>
                  <p className="text-sm font-medium">+1 (555) 000-1234</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <MapPin
                  className="w-5 h-5 text-gray-400 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium mb-1">
                    Office
                  </p>
                  <p className="text-sm font-medium">
                    101 Tech Plaza, Silicon Valley, CA
                  </p>
                </div>
              </div>
            </section>

            <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Our support team is active Monday through Friday, 9am to 6pm. We
                usually reply to all messages within 2 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-gray-400 uppercase font-medium ml-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-gray-50/50 border border-gray-100 px-6 py-4 rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-gray-400 uppercase font-medium ml-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-gray-50/50 border border-gray-100 px-6 py-4 rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-gray-400 uppercase font-medium ml-1">
                  Subject
                </label>
                <select className="w-full bg-gray-50/50 border border-gray-100 px-6 py-4 rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all text-sm appearance-none cursor-pointer">
                  <option>Product Question</option>
                  <option>Order Shipping</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-gray-400 uppercase font-medium ml-1">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full bg-gray-50/50 border border-gray-100 px-6 py-4 rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all text-sm resize-none"
                />
              </div>

              <Button
                disabled={isSubmitting}
                className="h-16 px-10 bg-gray-900 hover:bg-black text-white rounded-2xl flex items-center gap-3 transition-all group"
              >
                <span className="text-xs font-medium uppercase tracking-widest">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                {/* <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> */}
              </Button>
            </form>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-gray-50">
          {[
            {
              title: "Live Chat",
              desc: "Speak with a specialist in real-time.",
              icon: MessageSquare,
            },
            {
              title: "Safe Shopping",
              desc: "Secure payments and data protection.",
              icon: ShieldCheck,
            },
            {
              title: "Fast Logistics",
              desc: "Track your orders across the globe.",
              icon: Globe,
            },
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <item.icon className="w-6 h-6 text-gray-300" strokeWidth={1.5} />
              <h3 className="font-medium text-gray-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Contact;
