"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/app/types";
import { truncateText } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="group relative bg-white rounded-sm flex flex-col h-[380px] md:h-[440px] shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Top badges container */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm">
            -{discount}% OFF
          </span>
        )}
        {isFeatured && (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
            ⭐ Featured
          </span>
        )}
        {isBestSeller && (
          <span className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
            🔥 Best Seller
          </span>
        )}
      </div>

      {/* Heart icon - redesigned with better hover effect */}
      <button
        onClick={onSave}
        aria-label="Add to favorites"
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
      >
        <Heart
          size={20}
          className={`${
            save ? "text-red-500 fill-red-500" : "text-gray-600"
          } transition-all duration-200`}
        />
      </button>

      {/* Product Image - redesigned with better container */}
      <div className="relative w-full h-[200px] md:h-[240px] bg-gray-50 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          className="p-6 transition-transform duration-500 group-hover:scale-110"
          priority
        />
      </div>

      {/* Product details - redesigned with better spacing and typography */}
      <div className="flex flex-col flex-1 p-5 bg-white">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
            {hasMounted ? truncateText(name, maxLength) : name}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
            {discount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Button - redesigned with better styling */}
        <Link href={`/products/${id}`} passHref className="mt-4">
          <Button className="w-full bg-gray-900 text-white py-6 hover:bg-gray-800 transition-all duration-300 text-sm font-semibold rounded-sm shadow-sm hover:shadow-md group-hover:bg-gray-800">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
