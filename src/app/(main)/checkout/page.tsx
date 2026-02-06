"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCheckoutData } from "@/hooks/useCheckoutData";
import ShippingSection from "@/app/_components/checkout/ShippingSection";
import PaymentSection from "@/app/_components/checkout/PaymentSection";
import OrderSummary from "@/app/_components/checkout/OrderSummary";
import OrderConfirmationModal from "@/app/_components/checkout/OrderConfirmationModal";

type Address = { id: string } & Record<string, string>;
export default function CheckoutPage() {
  const didMount = useRef(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  type OrderDetails = {
    orderNumber: string;
    paymentMethod: string;
    estimatedDelivery: string;
    cartItems: typeof cartItems;
  } | null;

  const [orderDetails, setOrderDetails] = useState<OrderDetails>(null);

  const { cartItems, grandTotal } = useCheckoutData();

  const handleAddAddress = (address: Record<string, string>) => {
    const newAddress = {
      id: crypto.randomUUID(),
      ...address,
    };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress.id);
  };

  useEffect(() => {
    if (didMount.current) {
      localStorage.setItem("checkout-addresses", JSON.stringify(addresses));
    } else {
      didMount.current = true;
    }
  }, [addresses]);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("checkout-addresses");
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses);
      setAddresses(parsed);
      if (parsed.length > 0) setSelectedAddress(parsed[0].id);
    }
  }, []);

  const handleContinue = () => {
    if (!paymentMethod || !selectedAddress) return;

    const orderNumber = `ORD-${Date.now()}`;
    const currentDate = new Date();
    const estimatedDelivery = new Date(
      currentDate.getTime() +
        (paymentMethod === "cod" ? 3 : 5) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    setOrderDetails({
      orderNumber,
      paymentMethod,
      estimatedDelivery,
      cartItems,
    });

    setShowOrderModal(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* Page Header - Clean & Architectural */}
        <header className="mb-12">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900">
            Checkout
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-2">
            Secure_Transaction_Protocol // Step 02 of 02
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Main Forms (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            <ShippingSection
              addresses={addresses|| []}
              selectedAddress={selectedAddress}
              onAddressChange={setSelectedAddress }
              onAddAddress={handleAddAddress}
            />

            <PaymentSection
              paymentMethod={paymentMethod}
              onPaymentChange={setPaymentMethod}
              grandTotal={grandTotal}
            />
          </div>

          {/* Right Column - Summary (4 Columns) */}
          <div className="lg:col-span-4">
            <OrderSummary
              cartItems={cartItems}
              grandTotal={grandTotal}
              paymentMethod={paymentMethod}
              onContinue={handleContinue}
            />
          </div>
        </div>

        {/* Order Confirmation Modal - Clean Design */}
        <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
          <DialogContent className="sm:max-w-[550px] rounded-[40px] border-none p-10 shadow-2xl">
            <OrderConfirmationModal
              orderDetails={orderDetails ?? {}}
              grandTotal={grandTotal}
              onClose={() => setShowOrderModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
