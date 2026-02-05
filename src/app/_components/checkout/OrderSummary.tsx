"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import { ShieldCheck, Truck, ArrowRight } from "lucide-react";

export default function OrderSummary({
  cartItems,
  grandTotal,
  loading,
  paymentMethod,
  onContinue,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-medium tracking-tight text-gray-900">
          Order Summary
        </h2>
        <p className="text-[10px] tracking-[0.15em] text-gray-400 uppercase mt-1">
          Review your manifest
        </p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            <div className="space-y-6 max-h-[380px] overflow-y-auto no-scrollbar pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 p-2">
                    <Image
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-contain"
                    />
                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </h4>
                    <p className="text-[10px] tracking-wider text-gray-400 uppercase mt-0.5">
                      Price: ${item.productPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.quantity * item.productPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-gray-100" />

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] tracking-[0.1em] text-gray-400 uppercase">
                  Total Amount
                </span>
                <span className="text-2xl font-semibold text-gray-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <Truck size={14} className="text-gray-400" />
          <span className="text-[10px] tracking-wide text-gray-500 uppercase">
            Global Express Delivery
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <ShieldCheck size={14} className="text-gray-400" />
          <span className="text-[10px] tracking-wide text-gray-500 uppercase">
            SSL Secure Transaction
          </span>
        </div>
      </div>

      <Button
        onClick={onContinue}
        disabled={!paymentMethod || cartItems.length === 0}
        className={`w-full mt-8 h-14 rounded-2xl flex items-center justify-center px-8 transition-all
          ${
            paymentMethod
              ? "bg-gray-900 hover:bg-black text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="text-xs tracking-widest uppercase font-medium">
          {paymentMethod ? "Complete Purchase" : "Select Payment Method"}
        </span>
      </Button>
    </div>
  );
}
