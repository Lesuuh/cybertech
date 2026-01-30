"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Box, ShieldCheck, Truck } from "lucide-react";
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
    toast(product.name + " " + "added to cart");
  };

  console.log(product);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-16 bg-white">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <Image
          src={product.imageSrc}
          alt="MacBook Pro"
          width={600} // <-- required
          height={400} // <-- required
          className="w-full max-w-md rounded-xl object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        {/* Title & Price */}
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 text-3xl font-semibold">
          <span className="text-black">${discountPrice.toFixed(2)}</span>
          <del className="text-gray-400 text-xl">
            ${product.price.toFixed(2)}
          </del>
        </div>

        {/* Color Selection */}
        {colors?.length > 0 && (
          <div>
            <p className="font-medium mb-2 text-gray-700">Available Colors:</p>
            <div className="flex gap-3">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  style={{ backgroundColor: color }}
                  title={color}
                  className="w-10 h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>
        )}

        {/* Memory Options */}
        {memoryOptions?.length > 0 && (
          <div>
            <p className="font-medium mb-2 text-gray-700">Memory Options:</p>
            <div className="flex gap-3 flex-wrap">
              {memoryOptions.map((mem, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {mem}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Important Details */}
        {importantDetails?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {importantDetails.map(({ label, value, iconName }, idx) => {
              const Icon = iconMap[iconName];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 border rounded-md bg-gray-50"
                >
                  {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="text-gray-900 text-sm font-semibold">
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Button
            variant="outline"
            className="flex-1 py-3 rounded-md border border-gray-700 hover:bg-gray-100"
          >
            Add to Wishlist
          </Button>
          <Button
            onClick={() => handleAddToCart(product)}
            className="flex-1 py-3 rounded-md bg-black text-white hover:bg-gray-900 transition"
          >
            Add to Cart
          </Button>
        </div>

        {/* Delivery, Stock, Warranty */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <Truck className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-gray-400 text-xs">Delivery</p>
              <p className="text-gray-900 text-sm font-semibold">
                {product.deliveryDays} days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <Box className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-gray-400 text-xs">In Stock</p>
              <p className="text-gray-900 text-sm font-semibold">
                {product.stock} items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-gray-400 text-xs">Warranty</p>
              <p className="text-gray-900 text-sm font-semibold">
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
