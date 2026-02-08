"use client";

import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/data";
import { motion, AnimatePresence } from "framer-motion";

const ShoppingCart = () => {
  const removeItem = useCartStore((state) => state.removeItem);
  const userCart = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const router = useRouter();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");

  const discountCodes = {
    SAVE10: { type: "flat", value: 10 },
    OFF20: { type: "percent", value: 20 },
  };

  const cartDetailedItems = userCart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.product_id);
    return {
      ...cartItem,
      productName: product?.name || "Product",
      productPrice: product?.price || 0,
      totalPrice: (product?.price || 0) * cartItem.quantity,
      imageSrc: product?.imageSrc || "/placeholder.svg",
    };
  });

  const subTotal = cartDetailedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
  const tax = subTotal * 0.05;
  const shippingFee = subTotal > 0 ? 15 : 0;
  let discountAmount = 0;

  if (appliedCode && discountCodes[appliedCode as keyof typeof discountCodes]) {
    const { type, value } =
      discountCodes[appliedCode as keyof typeof discountCodes];
    discountAmount = type === "flat" ? value : subTotal * (value / 100);
  }

  const grandTotal = subTotal + tax + shippingFee - discountAmount;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10 md:py-16">
        {/* Header */}
        <header className="mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Your Cart
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {cartDetailedItems.length} items total
          </p>
        </header>

        {cartDetailedItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-gray-100 rounded-[32px]">
            <p className="text-gray-400 mb-8">Your cart is empty.</p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-gray-900 text-white px-8 h-12 rounded-xl text-sm"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Item List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartDetailedItems.map((item) => (
                  <motion.div
                    key={item.product_id}
                    layout
                    className="relative bg-white border border-gray-100 rounded-[24px] p-4 md:p-6 transition-all"
                  >
                    {/* Remove Button - Top Right */}
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 z-10"
                    >
                      <X size={18} />
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Image Container */}
                      <div className="w-full md:w-32 h-40 md:h-32 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-4">
                        <Image
                          src={item.imageSrc}
                          alt={item.productName}
                          width={100}
                          height={100}
                          className="object-contain h-full w-full"
                        />
                      </div>

                      {/* Info & Controls Wrapper */}
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                        {/* Name and Unit Price */}
                        <div className="text-center md:text-left space-y-1">
                          <h3 className="text-base font-medium text-gray-900">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            ${item.productPrice.toFixed(2)} / unit
                          </p>
                        </div>

                        {/* Quantity & Total Row */}
                        <div className="flex flex-row items-center justify-between md:justify-end gap-6 md:gap-10 border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100 scale-90 md:scale-100">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-all disabled:opacity-20"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Item Total Price */}
                          <p className="text-lg font-semibold tracking-tight text-gray-900">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-gray-900 text-white p-6 md:p-10 rounded-[32px]">
                <h2 className="text-lg font-medium mb-8">Summary</h2>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-gray-400">Total</span>
                    <span className="text-3xl font-semibold tracking-tighter">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 h-12">
                    <input
                      placeholder="Promo Code"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm outline-none focus:border-white/30"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      onClick={() => setAppliedCode(discountCode)}
                      className="bg-white text-black text-xs font-bold px-4 rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  <Button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-white text-black hover:bg-gray-100 h-14 rounded-xl flex items-center justify-center gap-2 font-semibold"
                  >
                    Checkout
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
