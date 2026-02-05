"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShoppingBag, Zap, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the image on scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90dvh] flex flex-col justify-center bg-[#020617] text-white overflow-hidden border-b border-white/5"
    >
      {/* Dynamic Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col gap-6 w-full lg:max-w-2xl"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-mono font-medium text-indigo-400 tracking-[0.3em] uppercase"
            >
              Pro. Beyond.
            </motion.h2>

            <h1 className="text-6xl md:text-8xl font-thin leading-none tracking-tighter">
              iPhone 14 <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-slate-400">
                Pro
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              Designed to push boundaries and elevate everyday experiences.
              Powerful. Elegant. Essential.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
              <Link href={"/products/10"}>
                <Button className="bg-white hover:bg-indigo-600 text-black rounded-full px-8 py-6 group cursor-pointer">
                  Shop Now{" "}
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Limited Stock Available
              </div>
            </div>
          </motion.div>

          {/* Image Showcase */}
          <motion.div
            style={{ y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="w-full max-w-lg lg:max-w-xl relative"
          >
            {/* Ambient glow behind image */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full scale-75" />

            <Image
              src="/images/Iphone Image.png"
              alt="iPhone 14 Pro"
              width={650}
              height={650}
              className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Conversion Ribbon (E-commerce Essentials) */}
      {/* <div className="relative z-20 mt-auto bg-white/[0.02] backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-indigo-400" />
            <div className="hidden sm:block">
              <p className="text-white text-xs font-bold uppercase tracking-wider">
                Free Shipping
              </p>
              <p className="text-slate-500 text-[10px]">
                Express delivery on all orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <div className="hidden sm:block">
              <p className="text-white text-xs font-bold uppercase tracking-wider">
                Secure Tech
              </p>
              <p className="text-slate-500 text-[10px]">
                2-Year CyberProtect Warranty
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-indigo-400" />
            <div className="hidden sm:block">
              <p className="text-white text-xs font-bold uppercase tracking-wider">
                Quick Trade-In
              </p>
              <p className="text-slate-500 text-[10px]">
                Upgrade and save up to $600
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border border-slate-900 bg-slate-700" />
              <div className="w-7 h-7 rounded-full border border-slate-900 bg-indigo-600" />
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-wider">
                4.9/5 Rating
              </p>
              <p className="text-slate-500 text-[10px]">
                Trusted by 10k+ users
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
