"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#211C24] to-[#1a1620] text-white min-h-[90dvh] flex items-center justify-center overflow-hidden">
      {/* Optional subtle particle/blur shapes can go behind */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_transparent)]" />

      <div className="w-full max-w-[1500px] px-4 md:px-16 lg:px-28">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 mt-20 lg:mt-0">
          {/* Text */}
          <div className="text-center lg:text-left flex flex-col gap-6 w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 tracking-wide">
              Pro. Beyond.
            </h2>

            <h1 className="text-5xl md:text-7xl font-thin leading-[1.1]">
              iPhone 14 <strong className="font-extrabold">Pro</strong>
            </h1>

            <p className=" text-gray-300 max-w-xl leading-relaxed">
              Designed to push boundaries and elevate everyday experiences.
              Powerful. Elegant. Essential.
            </p>

            <Button className="bg-transparent text-white px-8 py-3 rounded-full border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 w-max mx-auto lg:mx-0">
              Shop Now
            </Button>
          </div>

          {/* Image */}
          <motion.div
            className="w-full max-w-lg lg:max-w-xl flex items-center justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/Iphone Image.png"
              alt="iPhone 14 Pro"
              width={600}
              height={600}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
