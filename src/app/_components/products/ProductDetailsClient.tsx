"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Box, ShieldCheck, Truck, Plus, Heart } from "lucide-react";
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
};

const ProductDetailsClient = ({
  product,
  discountPrice,
  colors,
  memoryOptions,
  importantDetails,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (id: number) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: id,
      quantity: 1,
    });
    toast.success(`${product.name} registered to terminal`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 p-8 lg:p-20 bg-white min-h-screen max-w-[1600px] mx-auto">
      {/* Visual Component - 5 Cols */}
      <div className="lg:col-span-5 flex justify-center items-start sticky top-24">
        <div className="relative w-full aspect-square bg-gray-50/50 rounded-[40px] flex items-center justify-center p-12 border border-gray-100">
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-8 left-8">
            <span className="text-[10px] tracking-[0.3em] text-gray-300 uppercase font-medium">
              Hardware Object // 001
            </span>
          </div>
        </div>
      </div>

      {/* Interface Component - 7 Cols */}
      <div className="lg:col-span-7 flex flex-col gap-10">
        {/* Title & Price Registry */}
        <header className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 max-w-lg">
              {product.name}
            </h1>
            <div className="text-right">
              <p className="text-3xl font-medium tracking-tighter">
                ${discountPrice.toFixed(2)}
              </p>
              <del className="text-sm text-gray-400 font-light tracking-wide">
                ${product.price.toFixed(2)}
              </del>
            </div>
          </div>
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
            In Stock
          </p>
        </header>

        {/* Dynamic Configurator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Color Matrix */}
          {colors?.length > 0 && (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                Chassis Finish
              </p>
              <div className="flex gap-4">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-200 ring-offset-4 focus:ring-1 focus:ring-gray-900 transition-all hover:scale-110"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Memory Matrix */}
          {memoryOptions?.length > 0 && (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                Memory Module
              </p>
              <div className="flex gap-2 flex-wrap">
                {memoryOptions.map((mem, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 border border-gray-100 rounded-xl text-xs font-medium hover:border-gray-900 transition-all uppercase tracking-widest"
                  >
                    {mem}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Specs Grid */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {importantDetails
            ?.slice(0, 4)
            .map(({ label, value, iconName }, idx) => {
              const Icon = iconMap[iconName];
              return (
                <div key={idx} className="bg-white p-6 flex items-start gap-4">
                  {Icon && <Icon className="w-4 h-4 text-gray-400 mt-0.5" />}
                  <div>
                    <p className="text-[9px] tracking-widest text-gray-400 uppercase mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-900 uppercase">
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Narrative */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
            Operational Summary
          </p>
          <p className="text-gray-600 leading-relaxed font-light text-sm max-w-xl">
            {product.description}
          </p>
        </div>

        {/* Terminal Actions */}
        <div className="flex gap-4 pt-6 border-t border-gray-50">
          <Button
            onClick={() => handleAddToCart(product.id)}
            className="h-16 flex-[2] bg-gray-900 hover:bg-black text-white rounded-2xl flex items-center justify-center px-8 group transition-all"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em]">
              Add To Terminal
            </span>
            {/* <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> */}
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-1 rounded-2xl border-gray-200 hover:border-gray-900 flex items-center justify-center gap-2 group transition-all"
          >
            <Heart className="w-4 h-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span className="text-[10px] uppercase tracking-widest font-medium">
              Save
            </span>
          </Button>
        </div>

        {/* Logistics Manifest */}
        {/* <div className="grid grid-cols-3 gap-8 py-6 px-8 bg-gray-50/50 rounded-3xl border border-gray-100">
          {[
            {
              icon: Truck,
              label: "Logistics",
              val: `${product.deliveryDays}D`,
            },
            { icon: Box, label: "Registry", val: `${product.stock}U` },
            {
              icon: ShieldCheck,
              label: "Warranty",
              val: `${product.warrantyYears}Y`,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon className="w-4 h-4 text-gray-300" />
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-tighter">
                  {item.label}
                </p>
                <p className="text-[10px] font-semibold text-gray-900 uppercase">
                  {item.val}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailsClient;
