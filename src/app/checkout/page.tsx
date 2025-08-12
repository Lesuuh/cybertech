"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Minus,
  Plus,
  CreditCard,
  Truck,
  Building2,
  Copy,
  Check,
  MapPin,
  CheckCircle,
  Clock,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(true);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [copiedField, setCopiedField] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    paymentMethod: string;
    estimatedDelivery: string;
  } | null>(null);

  const savedAddresses = [
    {
      id: "1",
      name: "Home",
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    {
      id: "2",
      name: "Office",
      fullName: "John Doe",
      email: "john.work@company.com",
      address: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zip: "10002",
    },
  ];

  const bankDetails = {
    bankName: "First National Bank",
    accountName: "TechStore Inc.",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    swiftCode: "FNBKUS33",
    reference: `ORDER-${Date.now()}`,
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 29.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]);

  //   const updateQuantity = (id: number, change: number) => {
  //     setCartItems((items) =>
  //       items
  //         .map((item) =>
  //           item.id === id
  //             ? { ...item, quantity: Math.max(0, item.quantity + change) }
  //             : item
  //         )
  //         .filter((item) => item.quantity > 0)
  //     );
  //   };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const orderNumber = `ORD-${Date.now()}`;
    const currentDate = new Date();
    const estimatedDelivery = new Date(
      currentDate.getTime() +
        (paymentMethod === "cod" ? 3 : 5) * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setOrderDetails({
      orderNumber,
      paymentMethod,
      estimatedDelivery,
    });

    setShowOrderModal(true);
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "bank":
        return "Bank Transfer";
      case "gateway":
        return "Online Payment";
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-16 lg:px-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="shadow-0 border-1 p-6 bg-white rounded-sm">
              <div className="pb-4">
                <div className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                  Shipping Information
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Choose a delivery address for your order
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Delivery Address
                  </h3>

                  <div className="space-y-3">
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-start space-x-3"
                      >
                        <input
                          type="radio"
                          id={`address-${address.id}`}
                          name="deliveryAddress"
                          value={address.id}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`address-${address.id}`}
                          className="flex-1 cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-1 bg-gray-100 rounded">
                              <MapPin className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900">
                                {address.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                <div>{address.fullName}</div>
                                <div>{address.address}</div>
                                <div>
                                  {address.city}, {address.state} {address.zip}
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}

                    <div className="flex items-start space-x-3">
                      <label
                        htmlFor="address-new"
                        className="flex-1 cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-green-100 rounded">
                            <Plus className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="font-medium text-green-700">
                            Add New Address
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {showNewAddress && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Add New Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="fullName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            type="text"
                            value={newAddress.fullName}
                            placeholder="Enter your full name"
                            className="mt-1 py-6"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="mt-1 py-6"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="address"
                            className="text-sm font-medium text-gray-700"
                          >
                            Street Address{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="address"
                            type="text"
                            value={newAddress.address}
                            placeholder="Enter your street address"
                            className="mt-1 py-6"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="city"
                            className="text-sm font-medium text-gray-700"
                          >
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            type="text"
                            placeholder="Enter your city"
                            className="mt-1 py-6"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="state"
                            className="text-sm font-medium text-gray-700"
                          >
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            type="text"
                            value={newAddress.state}
                            placeholder="Enter your state"
                            className="mt-1 py-6"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="py-6 px-8"
                        >
                          Cancel
                        </Button>
                        <Button type="button" className="py-6 px-8">
                          Save Address
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border p-6 bg-white rounded-sm">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </div>
              </div>
              <div className="space-y-3">
                {/* Pay on Delivery */}
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <Truck className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p className="font-medium">Pay on Delivery</p>
                    <p className="text-sm text-gray-500">
                      Pay cash or card when your order arrives.
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                    paymentMethod === "bank"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <Building2 className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p className="font-medium">Direct Bank Transfer</p>
                    <p className="text-sm text-gray-500">
                      Transfer to our bank account and send proof of payment.
                    </p>
                  </div>
                </label>

                {paymentMethod === "bank" && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-3">
                      Bank Transfer Details
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700">Bank Name:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {bankDetails.bankName}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(bankDetails.bankName, "bankName")
                            }
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "bankName" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700">Account Name:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {bankDetails.accountName}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.accountName,
                                "accountName"
                              )
                            }
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "accountName" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {bankDetails.accountNumber}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.accountNumber,
                                "accountNumber"
                              )
                            }
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "accountNumber" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700">Routing Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {bankDetails.routingNumber}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.routingNumber,
                                "routingNumber"
                              )
                            }
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "routingNumber" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700">Reference:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {bankDetails.reference}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.reference,
                                "reference"
                              )
                            }
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "reference" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-100 rounded-md">
                      <h5 className="font-medium text-amber-900 mb-2">
                        Instructions:
                      </h5>
                      <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
                        <li>
                          Transfer the exact amount of{" "}
                          <strong>${total.toFixed(2)}</strong> to the above
                          account
                        </li>
                        <li>
                          Use the reference number{" "}
                          <strong>{bankDetails.reference}</strong> in your
                          transfer
                        </li>
                        <li>
                          Email your payment receipt to{" "}
                          <strong>orders@techstore.com</strong>
                        </li>
                        <li>
                          Your order will be processed within 24 hours of
                          payment verification
                        </li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Online Payment Gateway */}
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                    paymentMethod === "gateway"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="gateway"
                    checked={paymentMethod === "gateway"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p className="font-medium">Online Payment Gateway</p>
                    <p className="text-sm text-gray-500">
                      Pay securely online with your card or mobile wallet.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="p-6 rounded-sm border bg-white">
              <div>
                <h2 className="text-xl font-semibold  mb-4">Your Order</h2>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border p-6 bg-white rounded-sm">
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-4 space-y-2">
                  <Badge
                    variant="secondary"
                    className="w-full justify-center py-2"
                  >
                    Free returns within 30 days
                  </Badge>
                  <Badge
                    variant="outline"
                    className="w-full justify-center py-2"
                  >
                    Secure checkout with SSL encryption
                  </Badge>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full mt-6 py-6"
                  size="lg"
                  disabled={!paymentMethod}
                >
                  {paymentMethod
                    ? paymentMethod === "cod"
                      ? "Place Order"
                      : paymentMethod === "bank"
                      ? "Confirm Bank Transfer"
                      : "Proceed to Payment"
                    : "Select Payment Method"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Confirmation Modal */}
        <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-6 w-6" />
                Order Placed Successfully!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Thank you for your order!
                </h3>
                <p className="text-gray-600 mt-1">
                  Your order has been received and is being processed.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Order Number:
                  </span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                    {orderDetails?.orderNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Payment Method:
                  </span>
                  <span className="text-sm text-gray-900">
                    {orderDetails &&
                      getPaymentMethodName(orderDetails.paymentMethod)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Total Amount:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700">
                    Estimated Delivery:
                  </span>
                  <span className="text-sm text-gray-900 text-right">
                    {orderDetails?.estimatedDelivery}
                  </span>
                </div>
              </div>

              {orderDetails?.paymentMethod === "bank" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-900">
                        Next Steps for Bank Transfer:
                      </h4>
                      <ul className="text-xs text-amber-800 mt-2 space-y-1">
                        <li>
                          • Transfer ${total.toFixed(2)} to the provided bank
                          account
                        </li>
                        <li>• Use reference: {bankDetails.reference}</li>
                        <li>• Email receipt to orders@techstore.com</li>
                        <li>
                          • Order ships within 24hrs of payment verification
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {orderDetails?.paymentMethod === "cod" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Cash on Delivery
                      </h4>
                      <p className="text-xs text-blue-800 mt-1">
                        Have ${total.toFixed(2)} ready when your order arrives.
                        You can pay with cash or card.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">
                      Order Confirmation
                    </h4>
                    <p className="text-xs text-green-800 mt-1">
                      A confirmation email with tracking details has been sent
                      to your email address.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setShowOrderModal(false)}
              >
                Continue Shopping
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setShowOrderModal(false);
                  alert("Redirecting to order tracking...");
                }}
              >
                Track Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
