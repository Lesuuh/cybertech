import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  userId: number | null;
  items: CartItem[];
  setUserId: (id: number) => void;
  setCart: (items: CartItem[]) => void;
  addItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      userId: null,
      items: [],

      setUserId: (id: number) => set(() => ({ userId: id, items: [] })),

      setCart: (items: CartItem[]) => set(() => ({ items })),

      addItem: (productId: number, quantity: number) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId
          );
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { productId, quantity }] };
          }
        }),

      updateQuantity: (productId: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          };
        }),

      removeItem: (productId: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      clearCart: () => set(() => ({ items: [] })),
    }),
    {
      name: "cart-storage",
    }
  )
);
