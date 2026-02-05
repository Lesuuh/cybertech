"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, Building2, Copy, Check, Info } from "lucide-react";

export default function PaymentSection({
  paymentMethod,
  onPaymentChange,
  grandTotal,
}) {
  const [copiedField, setCopiedField] = useState("");

  const bankReference = useMemo(
    () => `REF-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
    [],
  );

  const bankDetails = {
    bankName: "First National Bank",
    accountName: "TechStore Inc.",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    reference: bankReference,
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="h-5 w-5 text-gray-400" />
        <h2 className="text-xl font-medium tracking-tight text-gray-900">
          Payment Method
        </h2>
      </div>

      <div className="grid gap-4">
        {[
          {
            id: "cod",
            icon: Truck,
            title: "Pay on Delivery",
            desc: "Cash or card upon arrival",
          },
          {
            id: "bank",
            icon: Building2,
            title: "Bank Transfer",
            desc: "Direct wire to corporate account",
          },
          {
            id: "gateway",
            icon: CreditCard,
            title: "Online Payment",
            desc: "Secure card or mobile wallet",
          },
        ].map((method) => (
          <label
            key={method.id}
            className={`flex items-start p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${
              paymentMethod === method.id
                ? "border-gray-900 bg-gray-50/50"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <div className="pt-1 mr-4">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === method.id
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === method.id && (
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                )}
              </div>
            </div>

            <method.icon
              className={`h-5 w-5 mr-4 mt-0.5 ${
                paymentMethod === method.id ? "text-gray-900" : "text-gray-400"
              }`}
            />

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {method.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">
                {method.desc}
              </p>
            </div>
            <input
              type="radio"
              name="payment"
              value={method.id}
              className="hidden"
              onChange={(e) => onPaymentChange(e.target.value)}
            />
          </label>
        ))}

        {/* Bank Details Expansion */}
        {paymentMethod === "bank" && (
          <div className="mt-2 p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-6">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-4">
                Wire_Transfer_Details
              </p>
              <div className="grid gap-3">
                {Object.entries(bankDetails).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-200/50 last:border-0"
                  >
                    <span className="text-xs text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-900">
                        {value}
                      </span>
                      <button
                        onClick={() => copyToClipboard(value, key)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {copiedField === key ? (
                          <Check size={12} />
                        ) : (
                          <Copy size={12} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border border-gray-100 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-gray-400" />
                <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                  Instructions
                </p>
              </div>
              <ul className="text-[11px] leading-relaxed text-gray-600 space-y-2">
                <li>
                  • Transfer exactly{" "}
                  <span className="text-gray-900 font-medium">
                    ${grandTotal.toFixed(2)}
                  </span>
                </li>
                <li>
                  • Include reference{" "}
                  <span className="text-gray-900 font-medium">
                    {bankDetails.reference}
                  </span>
                </li>
                <li>• Verfication time: 1-24 Business Hours</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
