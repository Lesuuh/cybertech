"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Box, ShieldCheck, Truck } from "lucide-react";
import React from "react";
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

  const handleAddToCart = (product) => {
    if (!product?.name) {
      console.error("Product or product.name is undefined");
      return;
    }
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 bg-gray-50 lg:grid-cols-2 gap-12 items-center p-10">
      {/* Image */}
      <div className="w-full max-w-md mx-auto">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="object-contain w-full rounded-md"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-extrabold">{product.name}</h1>

        <div className="flex items-center gap-4 text-3xl font-semibold">
          <span>${discountPrice.toFixed(2)}</span>
          {/* {product.discount > 0 && ( */}
          <del className="text-gray-500 text-2xl">
            ${product.price.toFixed(2)}
          </del>
          {/* )} */}
        </div>

        {/* Colors */}
        <div>
          <p className="font-medium mb-2">Available Colors:</p>
          <div className="flex gap-4">
            {colors.map((color, idx) => (
              <button
                key={idx}
                title={color}
                aria-label={`Select color ${color}`}
                style={{ backgroundColor: color }}
                className="w-10 h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
              />
            ))}
          </div>
        </div>

        {/* Memory */}
        <div>
          <p className="font-medium mb-2">Memory Options:</p>
          <div className="flex gap-4 flex-wrap">
            {memoryOptions?.map((mem, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-24 py-3 text-gray-700 rounded-sm"
              >
                {mem}
              </Button>
            ))}
          </div>
        </div>

        {/* Important details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {importantDetails.map(({ label, value, iconName }, idx) => {
            const Icon = iconMap[iconName];
            return (
              <div key={idx} className="...">
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="text-gray-800 text-sm font-semibold">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Add to Cart / Wishlist */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button
            variant="outline"
            className="flex-1 py-4 md:py-6 rounded-sm border border-gray-700"
          >
            Add to Wishlist
          </Button>
          <Button
            onClick={() => handleAddToCart(product)}
            className="flex-1 py-4 md:py-6 rounded-sm bg-black text-white hover:bg-gray-900 transition"
          >
            Add to Cart
          </Button>
        </div>

        {/* Delivery, Stock, Warranty */}

        <div className="grid grid-cols-3  sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
              <Truck className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Delivery</p>
              <p className="text-gray-800 text-sm font-semibold">
                {product.deliveryDays} days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
              <Box className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">In Stock</p>
              <p className="text-gray-800 text-sm font-semibold">
                {product.stock} items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
              <ShieldCheck className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Warranty</p>
              <p className="text-gray-800 text-sm font-semibold">
                {product.warrantyYears} year
                {product.warrantyYears > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
