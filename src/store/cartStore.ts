import { create, StateCreator } from "zustand";

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

const cartStore: StateCreator<CartState> = (set) => ({
  userId: null,
  items: [],

  setUserId: (id) => set(() => ({ userId: id, items: [] })),

  setCart: (items) => set(() => ({ items })),

  addItem: (productId: number, quantity: number) =>
    set((state: CartState) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity = quantity + 1;
        return { items: state.items };
      } else {
        return { items: [...state.items, { productId, quantity }] };
      }
    }),

  updateQuantity: (productId, quantity) =>
    set((state: CartState) => {
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
    set((state: CartState) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),

  clearCart: () => set(() => ({ items: [] })),
});

export const useCartStore = create<CartState>(cartStore);
