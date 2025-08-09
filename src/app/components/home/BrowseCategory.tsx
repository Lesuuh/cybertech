"use client";

import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Monitor,
  Camera,
  Tv,
  Watch,
  Gamepad,
  Headphones,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const categories = [
  { name: "Smartphones", icon: Smartphone, href: "/categories/smartphones" },
  { name: "Laptops", icon: Monitor, href: "/categories/laptops" },
  { name: "Cameras", icon: Camera, href: "/categories/cameras" },
  { name: "Televisions", icon: Tv, href: "/categories/televisions" },
  { name: "Watches", icon: Watch, href: "/categories/watches" },
  { name: "Gaming", icon: Gamepad, href: "/categories/gaming" },
  { name: "Headphones", icon: Headphones, href: "/categories/headphones" },
];

const BrowseCategory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full flex-col items-center my-20">
      <div className="flex items-center justify-between ">
        <h2 className="text-left text-xl font-semibold">Browse Category</h2>
        <div className="space-x-4">
          <Button onClick={scrollLeft} className="cursor-pointer">
            <ArrowLeft />
          </Button>
          <Button onClick={scrollRight} className="cursor-pointer">
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex  justify-between items-center gap-6 mt-10 scroll-smooth overflow-x-auto whitespace-nowrap"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map(({ name, icon: Icon, href }, idx) => (
          <Link
            href={href}
            key={idx}
            className="flex flex-col items-center w-40 bg-[#ededed] rounded-sm p-10 hover:bg-gray-300 transition-colors duration-200"
          >
            <Icon className="w-10 h-10 text-gray-700" />
            <span className="mt-2 text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategory;
