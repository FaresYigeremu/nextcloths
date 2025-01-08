import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Adds a product to the basket. If the product already exists in the basket,
       * increments the quantity by one. Otherwise, adds the product to the basket
       * with a quantity of one.
       */
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      /**
       * Removes an item from the basket by its product ID. If the item's quantity is greater than one,
       * it decrements the quantity by one. Otherwise, it removes the item from the basket.
       */
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),

      /**
       * Clears all items from the basket.
       */
      clearBasket: () => set({ items: [] }),

      /**
       * Gets the total price of all items in the basket.
       */
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      /**
       * Gets the quantity of a product in the basket by its ID.
       */
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      /**
       * Gets all items in the basket grouped by product.
       */
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store", // Name of the storage key
    }
  )
);

export default useBasketStore;
