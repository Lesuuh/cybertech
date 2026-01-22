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
import { useRef, useState, useEffect } from "react";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.offsetWidth * 0.7;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto flex flex-col my-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Browse Categories</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            className="disabled:opacity-40"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll right"
            disabled={!canScrollRight}
            className="disabled:opacity-40"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Scroll container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar py-2"
        >
          {categories.map(({ name, icon: Icon, href }, idx) => (
            <Link
              href={href}
              key={idx}
              className="flex flex-col items-center justify-center min-w-[140px] md:min-w-[180px]
                         bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8
                         transition-transform duration-300 ease-in-out
                         hover:scale-105 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
            >
              <Icon className="w-10 h-10 text-gray-700 dark:text-gray-200 mb-2" />
              <span className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 text-center">
                {name}
              </span>
            </Link>
          ))}
        </div>

        {/* Scroll gradient indicators */}
        {canScrollLeft && (
          <div
            className="absolute top-0 left-0 h-full w-12 pointer-events-none
                          bg-gradient-to-r from-white/90 via-white/0 to-transparent dark:from-gray-900/90"
          />
        )}
        {canScrollRight && (
          <div
            className="absolute top-0 right-0 h-full w-12 pointer-events-none
                          bg-gradient-to-l from-white/90 via-white/0 to-transparent dark:from-gray-900/90"
          />
        )}
      </div>
    </section>
  );
};

export default BrowseCategory;
