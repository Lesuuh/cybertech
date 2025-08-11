"use client";

import { X } from "lucide-react";
import { carts, products, users } from "../data/data"; // assuming you also have users
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ShoppingCart = () => {
  const userId = 5;

  // Find the cart for this user
  const userCart = carts.find((cart) => cart.userId === userId);

  const subTotal = 250.0;
  const estimatedTax = 20.0;
  const shippingHandling = 15.0;
  const total = subTotal + estimatedTax + shippingHandling;

  // Map cart items to detailed info
  const cartDetailedItems = userCart
    ? userCart.items.map((cartItem) => {
        const product = products.find(
          (product) => product.id === cartItem.productId
        );

        return {
          ...cartItem,
          productName: product?.name || "Unknown Product",
          productPrice: product?.price || 0,
          totalPrice: (product?.price || 0) * cartItem.quantity,
          imageSrc: product?.imageSrc || "/placeholder.svg", // Add this
        };
      })
    : [];

  // Optionally, get user info for display (assuming you have a users array)
  const user = users.find((user) => user.id === userId);

  if (!userCart) {
    console.log("No cart found for this user");
  }

  return (
    <section className="max-w-[1500px] bg-white mx-auto px-4 my-20">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      <div className="grid grid-cols-1 items-start h-auto md:grid-cols-2 w-full gap-8">
        {cartDetailedItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartDetailedItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row gap-4 pb-6 mb-6 border-b items-center sm:items-start bg-white"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.productName}
                  width={96} // Equivalent to w-24
                  height={96} // Equivalent to h-24
                  className="w-24 h-24 object-contain rounded-md flex-shrink-0"
                />

                <div className="flex-1 grid gap-2 text-center sm:text-left">
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <p className="text-gray-600">
                    ${item.productPrice.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="inline-flex items-center overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      aria-label="Decrease quantity"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                    >
                      -
                    </Button>
                    <span className="px-3 py-1 bg-gray-50 text-center font-medium min-w-[2rem]">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      aria-label="Increase quantity"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-bold text-lg whitespace-nowrap">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Remove item"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border p-8 rounded-sm w-full  md:max-w-md mx-auto my-10 bg-white shadow">
          <h2 className="font-semibold text-xl mb-6">Order Summary</h2>

          <div className="space-y-6">
            {/* Single Input without button (optional) */}
            <div>
              <label htmlFor="code1" className="block text-sm font-medium mb-2">
                Discount code / Promo code
              </label>
              <Input
                id="code1"
                placeholder="Enter code"
                className="w-full py-6"
              />
            </div>

            {/* Input with Apply button */}
            <div>
              <label htmlFor="code2" className="block text-sm font-medium mb-2">
                Discount code / Promo code
              </label>
              <div className="relative">
                <Input
                  id="code2"
                  placeholder="Enter code"
                  className="pr-28 py-6 w-full"
                />
                <Button
                  variant="outline"
                  className="absolute top-1/2 right-1 text-black outline-black -translate-y-1/2 px-6"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Price summary */}
            <div className="border-t pt-6 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>${shippingHandling.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Button
              className="w-full py-6 cursor-pointer md:py-6 text-lg mt-6"
              size="lg"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
