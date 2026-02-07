"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Heart, Plus, Truck, Box, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  BatteryCharging,
  Camera,
  Monitor,
  Database,
  Cpu,
  Droplet,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { Product } from "@/app/types";

const iconMap = {
  BatteryCharging,
  Camera,
  Monitor,
  Database,
  Cpu,
  Droplet,
  Wifi,
  Truck,
  Box,
  ShieldCheck,
} as const;

export type IconName = keyof typeof iconMap;

interface ImportantDetail {
  label: string;
  value: string | number | null | undefined;
  iconName: IconName;
}

interface ProductDetailsClientProps {
  product: Product;
  discountPrice: number;
  colors: string[];
  memoryOptions: string[] | null;
  importantDetails: ImportantDetail[];
}

const ProductDetailsClient = ({
  product,
  discountPrice,
  colors,
  memoryOptions,
  importantDetails,
}: ProductDetailsClientProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (id: number) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: id,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    // Added items-start to the grid so the sticky column doesn't stretch to full height
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 p-8 lg:p-20 bg-white min-h-screen max-w-[1600px] mx-auto items-start">
      {/* Visual Component - Sticky Image */}
      <div className="lg:col-span-5 xl:sticky top-24">
        <div className="relative w-full aspect-square rounded-[40px] flex items-center justify-center p-12 border border-gray-100 overflow-hidden">
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-contain hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Interface Component - Scrollable Content */}
      <div className="lg:col-span-7 flex flex-col gap-12">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="text-right shrink-0">
              <p className="text-3xl font-medium tracking-tighter text-gray-900">
                ${discountPrice.toFixed(2)}
              </p>
              {product.price > discountPrice && (
                <del className="text-sm text-gray-300 font-light">
                  ${product.price.toFixed(2)}
                </del>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-bold">
              In Stock // Ready to Ship
            </p>
          </div>
        </header>

        {/* Configurator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {colors?.length > 0 && (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                Choose Color
              </p>
              <div className="flex gap-4">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-100 ring-offset-2 focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                ))}
              </div>
            </div>
          )}

          {memoryOptions && memoryOptions?.length > 0 && (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                Storage Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {memoryOptions.map((mem, idx) => (
                  <button
                    key={idx}
                    className="px-5 py-2.5 border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gray-900 transition-all"
                  >
                    {mem}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden">
          {importantDetails
            ?.slice(0, 4)
            .map(({ label, value, iconName }, idx) => {
              const Icon = iconMap[iconName];
              return (
                <div
                  key={idx}
                  className="bg-white p-8 flex items-start gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  {Icon && (
                    <Icon
                      className="w-4 h-4 text-gray-300 mt-1"
                      strokeWidth={1.5}
                    />
                  )}
                  <div>
                    <p className="text-[9px] tracking-widest text-gray-400 uppercase mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{value}</p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
            About this product
          </p>
          <p className="text-gray-500 leading-relaxed font-light text-base max-w-xl">
            {product.description}
          </p>
        </div>

        {/* Add to Cart Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-50">
          <Button
            onClick={() => handleAddToCart(product.id)}
            className="h-16 flex-[2] bg-gray-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em]">
              Add to Cart
            </span>
            <Plus size={16} />
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-1 rounded-2xl border-gray-100 hover:border-gray-900 flex items-center justify-center gap-2 group transition-all"
          >
            <Heart className="w-4 h-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span className="text-[10px] uppercase tracking-widest font-medium">
              Save to list
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
