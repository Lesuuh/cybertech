"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/app/types";
import { truncateText } from "@/lib/utils";
import { useEffect, useState } from "react";
const ProductCard = ({
  imageSrc,
  name,
  price,
  onBuy,
  onSave,
  save,
}: ProductCardProps) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // now we are on client

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize(); // set initial width
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
      {" "}
      <button
        onClick={onSave}
        aria-label="Add to favorites"
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        {save ? (
          <Heart size={24} className="text-red-500" />
        ) : (
          <Heart size={24} />
        )}
      </button>{" "}
      <div className="relative w-full h-[150px] md:h-[180px] mb-3 md:mb-4 overflow-hidden">
        {" "}
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-t-lg"
          priority
        />{" "}
      </div>{" "}
      <div className="px-2 md:px-4 flex flex-col items-center space-y-2 md:space-y-3">
        {" "}
        <h3 className="text-base md:text-lg font-semibold text-gray-900 text-center">
          {hasMounted ? truncateText(name, maxLength) : name}
        </h3>{" "}
        <p className="text-lg md:text-xl font-bold text-gray-800">${price}</p>{" "}
        <Button
          onClick={onBuy}
          className="bg-black mt-3 md:mt-4 border rounded-sm py-5 md:py-6 px-8 md:px-10 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out text-sm md:text-base"
        >
          Shop Now
        </Button>{" "}
      </div>{" "}
    </div>
  );
};
export default ProductCard;
