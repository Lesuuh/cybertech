"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const BannerCTA = () => {
  return (
    <section className="w-full bg-white px-4 py-8 md:px-6">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 lg:h-[50dvh] gap-3 md:gap-4">
        {/* 1. Vision Pro - Side by Side (Mobile) */}
        <div className="bg-[#1A1A1A] rounded-2xl md:rounded-[32px] relative overflow-hidden p-5 md:p-8 flex flex-col justify-between h-[280px] lg:h-auto">
          <div className="z-10">
            <h2 className="text-xl md:text-3xl font-light text-white tracking-tight">
              Apple <span className="font-bold block">Vision Pro</span>
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center flex-1 items-center"
          >
            <Image
              src="/images/image 36.png"
              width={140}
              height={140}
              alt="Vision Pro"
              className="object-contain"
            />
          </motion.div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Spatial Computing
          </p>
        </div>

        {/* 2. AirPod Max - Side by Side (Mobile) */}
        <div className="bg-[#EDEDED] rounded-2xl md:rounded-[32px] relative overflow-hidden p-5 md:p-8 flex flex-col justify-between h-[280px] lg:h-auto">
          <div className="z-10">
            <h2 className="text-xl md:text-3xl font-light text-black tracking-tight">
              AirPod <span className="font-bold block">Max</span>
            </h2>
          </div>
          <motion.div
            whileHover={{ y: -5 }}
            className="flex justify-center flex-1 items-center"
          >
            <Image
              src="/images/half-air.png"
              width={130}
              height={130}
              alt="AirPods"
              className="object-contain"
            />
          </motion.div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Premium Audio
          </p>
        </div>

        {/* 3. PlayStation 5 - Full Width (Mobile) */}
        <div className="col-span-2 bg-[#F2F2F2] rounded-2xl md:rounded-[32px] relative overflow-hidden group p-6 md:p-10 flex flex-row items-center justify-between min-h-[220px] lg:h-auto">
          <div className="z-10 max-w-[180px] md:max-w-[280px]">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-tighter text-black leading-none">
              PlayStation <span className="font-black">5</span>
            </h2>
            <p className="mt-2 text-xs md:text-sm text-gray-500 font-medium">
              Next-gen gaming power.
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: -3, scale: 1.05 }}
            className="w-1/2 flex justify-end"
          >
            <Image
              src="/images/PlayStation.png"
              width={260}
              height={260}
              alt="PS5"
              className="object-contain drop-shadow-xl max-h-[180px] lg:max-h-[240px]"
            />
          </motion.div>
        </div>

        {/* 4. MacBook Air - The Fixed Hero Card */}
        <div className="col-span-2 lg:row-start-1 lg:col-start-1 lg:col-span-2 bg-[#F9F9F9] rounded-2xl md:rounded-[32px] relative overflow-hidden border border-gray-100 flex md:flex-row items-center justify-between p-8 md:p-10 min-h-[320px] lg:h-auto">
          <div className="z-10 md:w-3/5 text-left space-y-4">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter text-black leading-none">
              MacBook{" "}
              <span className="font-black block text-indigo-600 md:inline">
                Air 15&quot;
              </span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-[240px] leading-relaxed">
              Spacious Liquid Retina display. Impossible thinness. M3 power.
            </p>
            <Link href={"/products/21"}>
              <Button className="bg-black text-white rounded-full lg:px-8 lg:py-6 text-sm group transition-transform active:scale-95">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Fixed Image Container: Constrained size */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full md:w-2/5 flex justify-center md:justify-end mt-6 md:mt-0"
          >
            <div className="relative w-full aspect-[4/3] max-w-[280px] lg:max-w-[340px]">
              <Image
                src="/images/macbook15.png"
                alt="MacBook"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerCTA;
