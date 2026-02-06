"use client";

import { categories } from "@/app/data/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// const categories = [
//   { name: "Phones", icon: Smartphone, slug: "phones" },
//   { name: "Computing", icon: Monitor, slug: "computing" },
//   { name: "Photography", icon: Camera, slug: "photography" },
//   { name: "Smart TV", icon: Tv, slug: "tv" },
//   { name: "Wearables", icon: Watch, slug: "wearables" },
//   { name: "Gaming", icon: Gamepad, slug: "gaming" },
//   { name: "Audio", icon: Headphones, slug: "audio" },
// ];

const BrowseCategory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 20);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth * 0.6;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-24 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-medium">
            System_Categories
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900">
            Browse by Category
          </h2>
        </div>

        {/* Navigation Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-12 w-12 rounded-2xl border-gray-100 hover:border-gray-900 disabled:opacity-10 transition-all bg-white"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-12 w-12 rounded-2xl border-gray-100 hover:border-gray-900 disabled:opacity-10 transition-all bg-white"
          >
            <ChevronRight className="w-5 h-5 text-gray-900" />
          </Button>
        </div>
      </div>

      {/* Category Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {categories.map(({ id, name, slug, icon: Icon }) => (
          <Link
            key={id}
            href={`/category/${slug}`}
            className="group flex flex-col items-center justify-center min-w-[180px] aspect-square 
               bg-white border border-gray-100 rounded-[40px] p-8
               transition-all duration-500 ease-in-out
               hover:border-gray-900 hover:bg-gray-50/50"
          >
            {Icon && (
              <Icon
                className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors"
                strokeWidth={1.2}
              />
            )}
            <span className="mt-4 text-[11px] font-medium tracking-widest uppercase">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategory;
