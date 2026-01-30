"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCheckoutData } from "@/hooks/useCheckoutData";
import ShippingSection from "@/app/_components/checkout/ShippingSection";
import PaymentSection from "@/app/_components/checkout/PaymentSection";
import OrderSummary from "@/app/_components/checkout/OrderSummary";
import OrderConfirmationModal from "@/app/_components/checkout/OrderConfirmationModal";

export default function CheckoutPage() {
  const didMount = useRef(false);
  // State for payment method selection
  const [paymentMethod, setPaymentMethod] = useState("");
  // State for all addresses (array of address objects)
  const [addresses, setAddresses] = useState([]);
  // State for the currently selected address (address id)
  const [selectedAddress, setSelectedAddress] = useState("");
  // State to control the order confirmation modal visibility
  const [showOrderModal, setShowOrderModal] = useState(false);
  // State to hold order details for the confirmation modal
  const [orderDetails, setOrderDetails] = useState(null);

  // Custom hook to get cart items, grand total, and loading state
  const { cartItems, grandTotal, loading } = useCheckoutData();

  // Handler to add a new address
  const handleAddAddress = (address) => {
    const newAddress = {
      id: crypto.randomUUID(), // Generate a unique id for the address
      ...address,
    };

    setAddresses((prev) => [...prev, newAddress]); // Add new address to state
    setSelectedAddress(newAddress.id); // Select the newly added address
  };

  console.log(addresses);

  useEffect(() => {
    if (didMount.current) {
      localStorage.setItem("checkout-addresses", JSON.stringify(addresses));
    } else {
      didMount.current = true;
    }
  }, [addresses]);

  // On mount, load addresses from localStorage (if any)
  useEffect(() => {
    const savedAddresses = localStorage.getItem("checkout-addresses");

    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses);
      setAddresses(parsed);

      // If there are addresses, select the first one by default
      if (parsed.length > 0) {
        setSelectedAddress(parsed[0].id);
      }
    }
  }, []);

  // Handler for clicking "Continue" (placing the order)
  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    // Generate order number and estimated delivery date
    const orderNumber = `ORD-${Date.now()}`;
    const currentDate = new Date();
    const estimatedDelivery = new Date(
      currentDate.getTime() +
        (paymentMethod === "cod" ? 3 : 5) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Set order details for the confirmation modal
    setOrderDetails({
      orderNumber,
      paymentMethod,
      estimatedDelivery,
      cartItems,
    });

    // Show the order confirmation modal
    setShowOrderModal(true);
  };

  console.log(orderDetails);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-16 lg:px-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping address selection/creation */}
            <ShippingSection
              addresses={addresses}
              selectedAddress={selectedAddress}
              onAddressChange={setSelectedAddress}
              onAddAddress={handleAddAddress}
            />

            {/* Payment method selection */}
            <PaymentSection
              paymentMethod={paymentMethod}
              onPaymentChange={setPaymentMethod}
              grandTotal={grandTotal}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <OrderSummary
              cartItems={cartItems}
              grandTotal={grandTotal}
              loading={loading}
              paymentMethod={paymentMethod}
              onContinue={handleContinue}
            />
          </div>
        </div>

        {/* Order Confirmation Modal */}
        <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
          <DialogContent>
            <OrderConfirmationModal
              orderDetails={orderDetails}
              grandTotal={grandTotal}
              onClose={() => setShowOrderModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
