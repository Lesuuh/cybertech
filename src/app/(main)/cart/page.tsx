"use client";

import { X, Minus, Plus, ShoppingBag} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
      productName: product?.name || "Unknown Product",
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
  const shippingFee = subTotal > 0 ? 15 : 0; // Flat tech shipping
  let discountAmount = 0;

  if (appliedCode && discountCodes[appliedCode as keyof typeof discountCodes]) {
    const { type, value } =
      discountCodes[appliedCode as keyof typeof discountCodes];
    discountAmount = type === "flat" ? value : subTotal * (value / 100);
  }

  const grandTotal = subTotal + tax + shippingFee - discountAmount;

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-3xl md:text-3xl text-indigo-600 font-black tracking-tighter uppercase leading-none">
              Your Cart
            </h1>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">
              System Ready for Checkout // {cartDetailedItems.length} Units
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/products")}
            className="text-xs font-black uppercase tracking-widest hover:bg-slate-50"
          >
            Continue Shopping
          </Button>
        </div>

        {cartDetailedItems.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
            <p className="text-slate-300 font-black italic text-4xl mb-6 uppercase">
              Cart_Is_Empty
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-black text-white px-10 py-6 rounded-full font-bold"
            >
              Browse Hardware
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Cart List */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence>
                {cartDetailedItems.map((item) => (
                  <motion.div
                    key={item.product_id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-slate-50 relative group"
                  >
                    <div className="w-full sm:w-40 h-40 bg-[#F6F6F6] rounded-2xl flex items-center justify-center p-4">
                      <Image
                        src={item.imageSrc}
                        alt={item.productName}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-black leading-tight max-w-[300px]">
                            {item.productName}
                          </h3>
                          <p className="text-slate-400 text-sm font-medium mt-1">
                            ${item.productPrice.toFixed(2)} / unit
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="text-slate-300 hover:text-black transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-xl font-black italic tracking-tighter">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-[#111111] text-white p-8 md:p-10 rounded-[32px] sticky top-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShoppingBag size={120} strokeWidth={1} />
                </div>

                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 relative z-10">
                  Summary
                </h2>

                <div className="space-y-4 relative z-10 mb-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Subtotal
                    </span>
                    <span className="font-bold">${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Tax (5%)
                    </span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Shipping
                    </span>
                    <span className="font-bold">${shippingFee.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-indigo-400 font-bold">
                      <span className="uppercase tracking-widest text-[10px]">
                        Discount
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="bg-white/10 my-6" />
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Total Payable
                    </span>
                    <span className="text-4xl font-black italic tracking-tighter">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex gap-2">
                    <input
                      placeholder="PROMO_CODE"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-indigo-500 transition-all"
                      value={discountCode}
                      onChange={(e) =>
                        setDiscountCode(e.target.value.toUpperCase())
                      }
                    />
                    <Button
                      onClick={() => setAppliedCode(discountCode)}
                      className="bg-white text-black hover:bg-indigo-500 hover:text-white font-black uppercase text-[10px] tracking-widest px-6 rounded-xl transition-all"
                    >
                      Apply
                    </Button>
                  </div>

                  <Button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-indigo-600  hover:bg-indigo-700 text-white h-15 rounded-2xl flex items-center justify-center px-8 group"
                  >
                    <span className="font-black uppercase  ">
                      Initialize Checkout
                    </span>
                    {/* <ArrowRight className="group-hover:translate-x-2 transition-transform" /> */}
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
