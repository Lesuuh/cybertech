"use client";

import { X, Minus, Plus, Tag, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { deleteItem } from "@/services/useCart";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/data";

const ShoppingCart = () => {
  const removeItem = useCartStore((state) => state.removeItem);
  const userCart = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  const discountCodes: Record<
    string,
    { type: "flat" | "percent"; value: number }
  > = {
    SAVE10: { type: "flat", value: 10 },
    OFF20: { type: "percent", value: 20 },
  };

  const router = useRouter();

  const handleRemoveItem = (product: any) => {
    deleteItem(product.product_id);
    removeItem(product.product_id);
    toast.success(`${product?.productName} removed from cart`);
  };

  if (!Array.isArray(userCart)) return <p>No cart found</p>;

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

  const handleQuantityChange = (
    product: any,
    action: "increase" | "decrease",
  ) => {
    if (action === "increase")
      updateQuantity(product.product_id, product.quantity + 1);
    else if (action === "decrease" && product.quantity > 1)
      updateQuantity(product.product_id, product.quantity - 1);
  };

  const calculateCheckout = (
    cartItems: any[],
    {
      taxRate = 0.05,
      shippingRate = 0.05,
      discountCode,
    }: {
      taxRate?: number;
      shippingRate?: number;
      discountCode?: string | null;
    },
  ) => {
    const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subTotal * taxRate;

    let discount = 0;
    if (discountCode && discountCodes[discountCode]) {
      const { type, value } = discountCodes[discountCode];
      discount = type === "flat" ? value : subTotal * (value / 100);
    }

    const shippingFee = subTotal * shippingRate;
    const grandTotal = subTotal + tax + shippingFee - discount;

    return { grandTotal, subTotal, tax, discount, shippingFee };
  };

  const { grandTotal, subTotal, tax, discount, shippingFee } =
    calculateCheckout(cartDetailedItems, {
      discountCode: appliedCode || null,
    });

  const applyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountMessage("Please enter a code to apply discount");
      return;
    }

    if (discountCodes[discountCode.trim()]) {
      setAppliedCode(discountCode.trim());
      setDiscountMessage("Discount code applied");
      toast.success("Discount code applied successfully!");
    } else {
      setAppliedCode("");
      setDiscountMessage("Invalid discount code");
      toast.error("Invalid discount code");
    }
  };

  if (loading) return <Spinner />;
  if (!userCart) return <p>No cart found</p>;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="h-8 w-8" />
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Shopping Cart
            </h1>
          </div>
          <p className="text-muted-foreground">
            {cartDetailedItems.length}{" "}
            {cartDetailedItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartDetailedItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to get started
            </p>
            <Button size="lg">Continue Shopping</Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartDetailedItems.map((item) => (
                <Card
                  key={item.product_id}
                  className="p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-muted border">
                        <Image
                          src={item.imageSrc}
                          alt={item.productName}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.productPrice.toFixed(2)} each
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none hover:bg-muted"
                            onClick={() =>
                              handleQuantityChange(item, "decrease")
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-12 text-center font-medium text-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none hover:bg-muted"
                            onClick={() =>
                              handleQuantityChange(item, "increase")
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {/* Discount Code */}
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Promo Code
                  </label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Enter code"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountMessage("");
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={applyDiscount}
                      variant="secondary"
                      className="px-6"
                    >
                      Apply
                    </Button>
                  </div>
                  {discountMessage && (
                    <div className="mt-2">
                      {discountMessage.includes("applied") ? (
                        <Badge variant="default" className="bg-green-600">
                          {discountMessage}
                        </Badge>
                      ) : (
                        <p className="text-sm text-destructive">
                          {discountMessage}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <Separator className="my-2" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      ${shippingFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-2" />

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Taxes and shipping calculated at checkout
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
