"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";

import type { ProductCardProps } from "@/app/types";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const ProductCard = ({
  imageSrc,
  name,
  price,
  id,
  discount = 0,
  onSave,
  save,
}: ProductCardProps) => {
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {
  // setHasMounted(true);
  // const handleResize = () => setWindowWidth(window.innerWidth);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // let maxLength = 50;
  // if (windowWidth < 480) maxLength = 20;
  // else if (windowWidth < 780) maxLength = 30;
  // else if (windowWidth < 1020) maxLength = 40;

  const addItem = useCartStore((state) => state.addItem);

  const handleAddtoCart = (id: number) => {
    console.log(id + " " + "added to cart");
    addItem({
      id: crypto.randomUUID(),
      product_id: id,
      quantity: 1,
    });
    toast(name + " " + "added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // whileHover={{ scale: 1.03, boxShadow: "0 12px 20px rgba(0,0,0,0.15)" }}
      className="group relative bg-white h-auto rounded-xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300"
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
      <Link href={`/products/${id}`} className="block">
        {/* Image */}
        <motion.div
          className="relative w-full h-[200px] bg-gray-50"
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
        <div className="flex flex-col flex-1 p-4 ">
          <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 leading-snug line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center gap-2 group-hover:hidden">
            <p className="text-lg md:text-xl font-semibold text-gray-900">
              ${price.toFixed(2)}
            </p>

            {discount > 0 && (
              <p className="text-xs text-gray-400 line-through">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-150 ease-out">
        <button
          onClick={() => handleAddtoCart(id)}
          className="flex w-full cursor-pointer items-center justify-between bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          aria-label={`Add ${name} to cart for $${price.toFixed(2)}`}
        >
          <span>Add to cart</span>
          <span className="text-white/80">${price.toFixed(2)}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
