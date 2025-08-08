"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ imageSrc, name, price, onBuy }) => {
  return (
    <div
      className="relative bg-[#f6f6f6] p-6 rounded-sm overflow-hidden flex flex-col justify-between"
      style={{ height: 400 }}
    >
      {/* Heart icon top-right */}
      <button
        aria-label="Add to favorites"
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <Heart size={24} />
      </button>

      {/* Product Image Container */}
      <div
        className="relative w-full h-[180px] mb-4"
        style={{ maxHeight: 180, overflow: "hidden" }}
      >
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
      <div className="px-4 flex flex-col items-center space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          {name}
        </h3>
        <p className="text-xl font-bold text-gray-800">${price}</p>
        <Button
          onClick={onBuy}
          className="bg-black mt-4 border rounded-sm py-3 px-6 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
