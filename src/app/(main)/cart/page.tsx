"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { deleteItem, fetchCart } from "@/services/useCart";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useProducts } from "@/services/useProducts";
import Spinner from "@/components/ui/Spinner";

const ShoppingCart = () => {
  const user = useUserStore((state) => state.user);
  const { data: products } = useProducts();
  const removeItem = useCartStore((state) => state.removeItem);
  const userCart = useCartStore((state) => state.items);
  const setCart = useCartStore((state) => state.setCart);
  const [loading, setLoading] = useState(true);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    if (!user?.id) return;

    const loadCart = async () => {
      try {
        const cart = await fetchCart(user.id);
        console.log(cart.cart_items);
        setCart(cart.cart_items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user?.id, setCart]);

  const subTotal = 250.0;
  const estimatedTax = 20.0;
  const shippingHandling = 15.0;
  const total = subTotal + estimatedTax + shippingHandling;

  const handleRemoveItem = (product) => {
    deleteItem(product.product_id);
    removeItem(product.product_id);
    toast.success(`${product?.productName} removed from cart`);
  };

  if (!Array.isArray(userCart)) return <p>No cart found for this user</p>;

  const cartDetailedItems = userCart.map((cartItem) => {
    const product = products?.find((p) => p.id === cartItem.product_id);
    return {
      ...cartItem,
      productName: product?.name || "Unknown Product",
      productPrice: product?.price || 0,
      totalPrice: (product?.price || 0) * cartItem.quantity,
      imageSrc: product?.imageSrc || "/placeholder.svg",
    };
  });

  const handleQuantityChange = (product, action) => {
    if (action === "increase") {
      updateQuantity(product.product_id, product.quantity + 1);
    } else if (action === "decrease" && product.quantity > 1) {
      updateQuantity(product.product_id, product.quantity - 1);
    }
  };

  if (loading) return <Spinner />;
  if (!userCart) return <p>No cart found for this user</p>;

  return (
    <section className="max-w-[1500px] bg-white mx-auto px-4 my-20">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      <div className="grid grid-cols-1 items-start h-auto md:grid-cols-2 w-full gap-8">
        {cartDetailedItems?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartDetailedItems?.map((item) => (
              <div
                key={item.product_id}
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
                      onClick={() => handleQuantityChange(item, "decrease")}
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
                      onClick={() => handleQuantityChange(item, "increase")}
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
                    onClick={() => handleRemoveItem(item)}
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
