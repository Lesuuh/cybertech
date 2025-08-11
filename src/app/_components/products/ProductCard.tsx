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

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let maxLength;
  if (windowWidth < 480) {
    maxLength = 20;
  } else if (windowWidth < 780) {
    maxLength = 30;
  } else if (windowWidth < 1020) {
    maxLength = 40;
  } else {
    maxLength = 50;
  }

  return (
    <div className="relative bg-[#f6f6f6] p-4 md:p-6 rounded-sm overflow-hidden flex flex-col justify-between h-[350px] md:h-[400px]">
      {/* Discount badge top-left */}
      {discount > 0 ? (
        <div className="absolute z-10 top-3 left-3 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
          -{discount}%
        </div>
      ) : null}

      {/* Featured / Best seller badges under discount */}
      {isFeatured || isBestSeller ? (
        <div className="absolute z-10 top-3 left-3 flex space-x-2">
          {isFeatured && (
            <span className="bg-gray-300 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {isBestSeller && (
            <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>
      ) : null}

      {/* Heart icon top-right */}
      <button
        onClick={onSave}
        aria-label="Add to favorites"
        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition"
      >
        {save ? (
          <Heart size={24} className="text-red-500" />
        ) : (
          <Heart size={24} />
        )}
      </button>

      {/* Product Image */}
      <div className="relative w-full h-[150px] md:h-[180px] mb-3 md:mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-t-lg"
          priority
        />
      </div>

      {/* Product details */}
      <div className="px-2 md:px-4 flex flex-col items-center space-y-2 md:space-y-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 text-center">
          {hasMounted ? truncateText(name, maxLength) : name}
        </h3>
        <p className="text-lg md:text-xl font-bold text-gray-800">
          ${price.toFixed(2)}
        </p>
        <Link href={`/products/${id}`} passHref>
          <Button className="bg-black mt-3 md:mt-4 border rounded-sm py-5 md:py-6 px-8 md:px-10 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out text-sm md:text-base">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
