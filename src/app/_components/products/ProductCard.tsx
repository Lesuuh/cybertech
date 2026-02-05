"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import Link from "next/link";
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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddtoCart = (id: number) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: id,
      quantity: 1,
    });
    toast.success(`${name} added to cart`);
  };

  const originalPrice = discount > 0 ? price / (1 - discount / 100) : price;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 hover:border-gray-900 rounded-[32px]"
    >
      {/* Action Buttons */}
      <button
        onClick={onSave}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <Heart
          size={16}
          className={`${save ? "text-red-500 fill-red-500" : "text-gray-400"}`}
        />
      </button>

      <Link href={`/products/${id}`} className="flex-1 flex flex-col">
        {/* Image Display */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain p-8  group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
          />

          {discount > 0 && (
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-bold tracking-widest text-gray-900 bg-white px-2 py-1 border border-gray-100 rounded-md">
                -{discount}%
              </span>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-6 flex flex-col gap-2">
          <div className="space-y-1">
            <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-medium">
              Ref_ID: {id}
            </p>
            <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-1 uppercase tracking-tight">
              {name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-lg font-medium tracking-tighter text-gray-900">
              ${price.toFixed(2)}
            </p>
            {discount > 0 && (
              <p className="text-[10px] text-gray-300 line-through tracking-tighter">
                ${originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Slide-up Add to Cart */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-30">
        <button
          onClick={() => handleAddtoCart(id)}
          className="flex w-full items-center justify-between bg-gray-900 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-black transition-colors"
        >
          <span>Add to Cart</span>
          <Plus size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
