"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { truncateText } from "@/lib/utils";
import type { ProductCardProps } from "@/app/types";
import { motion } from "framer-motion";

const ProductCard = ({
  imageSrc,
  name,
  price,
  id,
  discount = 0,
  isFeatured = false,
  isBestSeller = false,
  onSave,
  save,
}: ProductCardProps) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let maxLength = 50;
  if (windowWidth < 480) maxLength = 20;
  else if (windowWidth < 780) maxLength = 30;
  else if (windowWidth < 1020) maxLength = 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 12px 20px rgba(0,0,0,0.15)" }}
      className="group relative bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300"
    >
      {/* Save button */}
      <button
        onClick={onSave}
        aria-label="Add to favorites"
        className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200"
      >
        <Heart
          size={18}
          className={`${
            save ? "text-red-500 fill-red-500" : "text-gray-500"
          } transition-all duration-200`}
        />
      </button>

      {/* Image */}
      <motion.div
        className="relative w-full h-[220px] bg-gray-50"
        whileHover={{
          rotate: [0, 2, -2, 1, 0], // small wobble rotation
          skewX: [0, 2, -2, 1, 0], // subtle skew
          skewY: [0, 1, -1, 0.5, 0], // subtle skew
          scale: 1.05, // slight zoom
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain p-6"
          priority
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
      </motion.div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 leading-snug">
          {hasMounted ? truncateText(name, maxLength) : name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg md:text-xl font-semibold text-gray-900">
            ${price.toFixed(2)}
          </p>
          {discount > 0 && (
            <p className="text-xs text-gray-400 line-through">
              ${(price / (1 - discount / 100)).toFixed(2)}
            </p>
          )}
        </div>

        <Link href={`/products/${id}`} passHref>
          <Button
            variant="outline"
            className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 transition-all duration-200 text-sm font-medium rounded-lg"
          >
            View Details
          </Button>
        </Link>
      </div>

      {/* Featured / Best Seller subtle tag */}
      {(isFeatured || isBestSeller) && (
        <div className="absolute bottom-3 left-3 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          {isFeatured ? "Featured" : isBestSeller ? "Best Seller" : ""}
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
