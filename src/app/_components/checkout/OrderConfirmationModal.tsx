"use client";

import { Button } from "@/components/ui/button";
import { Check, Clock, Mail } from "lucide-react";

export default function OrderConfirmationModal({
  orderDetails,
  grandTotal,
  onClose,
}) {
  const getPaymentMethodName = (method) => {
    const names = {
      cod: "CASH_ON_DELIVERY",
      bank: "BANK_TRANSFER",
      gateway: "ONLINE_PAYMENT",
    };
    return names[method] || method?.toUpperCase();
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-medium tracking-tight text-gray-900">
          Order Success
        </h3>
        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-2">
          Status: Logged // Entry_Confirmed
        </p>
      </div>

      {/* Data Grid */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden">
        <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
            Order_ID
          </span>
          <span className="text-xs font-mono font-medium text-gray-900">
            {orderDetails?.orderNumber || "ORD-772910"}
          </span>
        </div>

        <div className="p-6 space-y-4 bg-white">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Payment
            </span>
            <span className="text-xs font-medium text-gray-900">
              {getPaymentMethodName(orderDetails?.paymentMethod)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Delivery
            </span>
            <span className="text-xs font-medium text-gray-900">
              {orderDetails?.estimatedDelivery || "3-5 Days"}
            </span>
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              Total
            </span>
            <span className="text-2xl font-medium text-gray-900">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Info Blocks */}
      <div className="space-y-3">
        {orderDetails?.paymentMethod === "bank" && (
          <div className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <Clock className="h-5 w-5 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] font-medium text-gray-900 uppercase tracking-widest mb-1">
                Payment_Required
              </p>
              <p className="text-[11px] text-gray-500 uppercase">
                Transfer to registry account. Use Order ID as reference.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <Mail className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <p className="text-[10px] font-medium text-gray-900 uppercase tracking-widest mb-1">
              Receipt_Sent
            </p>
            <p className="text-[11px] text-gray-500 uppercase">
              Check registered email for manifest and tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 h-14 rounded-xl text-[10px] uppercase tracking-[0.2em]"
          onClick={onClose}
        >
          Exit
        </Button>
        <Button
          className="flex-1 h-14 rounded-xl bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]"
          onClick={onClose}
        >
          Track Order
        </Button>
      </div>
    </div>
  );
}
