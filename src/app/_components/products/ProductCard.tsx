"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/app/types";
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
    <div className="relative bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl flex flex-col justify-between h-[360px] md:h-[420px] shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/50 hover:scale-[1.02]">
      {/* Top-left badges */}
      <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}
        {isFeatured && (
          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Featured
          </span>
        )}
        {isBestSeller && (
          <span className="bg-gray-800 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
      </div>

      {/* Heart icon top-right */}
      <button
        onClick={onSave}
        aria-label="Add to favorites"
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-all duration-200 z-10"
      >
        <Heart
          size={22}
          className={`${
            save ? "text-red-500 fill-red-500" : "fill-transparent"
          } transition-all duration-200`}
        />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-[160px] md:h-[200px] mb-4 overflow-hidden rounded-lg group">
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* Product details */}
      <div className="px-3 flex flex-col items-center space-y-3 text-center">
        <h3 className="text-base md:text-lg font-medium text-gray-900 tracking-tight">
          {hasMounted ? truncateText(name, maxLength) : name}
        </h3>
        <p className="text-lg md:text-xl font-semibold text-gray-800">
          ${price.toFixed(2)}
        </p>
        <Link href={`/products/${id}`} passHref>
          <Button className="bg-gray-900 text-white mt-4 py-2.5 px-8 hover:bg-gray-700 transition-all duration-300 text-sm md:text-base font-medium shadow-sm">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
