import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface CartState {
  userId: number | null;
  items: CartItem[];
  setUserId: (id: number) => void;
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (product_id: number) => void;
  updateQuantity: (product_id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      userId: null,
      items: [],

      setUserId: (id: number) => set(() => ({ userId: id, items: [] })),

      setCart: (items: CartItem[]) => set(() => ({ items })),

      addItem: (item: CartItem) =>
        set((state) => {
          const exists = state.items.some(
            (i) => i.product_id === item.product_id
          );
          if (exists) {
            // If item exists, update quantity
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            // If not, add new item
            return { items: [...state.items, item] };
          }
        }),

      updateQuantity: (product_id: number, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === product_id ? { ...item, quantity } : item
          ),
        })),

      removeItem: (product_id: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== product_id),
        })),

      clearCart: () => set(() => ({ items: [] })),
    }),
    {
      name: "cart-storage",
    }
  )
);
