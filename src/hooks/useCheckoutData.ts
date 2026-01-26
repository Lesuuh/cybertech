import { useMemo } from "react";
import { products } from "@/app/data/data";
import { useCartStore } from "@/store/cartStore";

export function useCheckoutData() {
  // Access cart items from the store if needed
  const cartItemsFromStore = useCartStore((state) => state.items);

  const cartItems = useMemo(() => {
    if (!Array.isArray(cartItemsFromStore) || !products) return [];

    return cartItemsFromStore.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product_id);
      return {
        ...cartItem,
        productName: product?.name || "Unknown Product",
        productPrice: product?.price || 0,
        totalPrice: (product?.price || 0) * cartItem.quantity,
        imageSrc: product?.imageSrc || "/placeholder.svg",
      };
    });
  }, [cartItemsFromStore]);

  const grandTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.quantity * item.productPrice,
      0,
    );
  }, [cartItems]);

  return {
    cartItems,
    grandTotal,
  };
}
