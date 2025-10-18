import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem, Product } from "@/types";
import { storage, calculateCartTotal } from "@/lib/utils";

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          price: product.price,
        };
        state.items.push(newItem);
      }

      state.total = calculateCartTotal(state.items);
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Persist to localStorage
      storage.set("cart", state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      state.total = calculateCartTotal(state.items);
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Persist to localStorage
      storage.set("cart", state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        } else {
          item.quantity = quantity;
        }
      }

      state.total = calculateCartTotal(state.items);
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Persist to localStorage
      storage.set("cart", state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;

      // Clear from localStorage
      storage.remove("cart");
    },

    loadCartFromStorage: (state) => {
      const savedCart = storage.get("cart");
      if (savedCart) {
        state.items = savedCart.items || [];
        state.total = savedCart.total || 0;
        state.itemCount = savedCart.itemCount || 0;
      }
    },

    updateCartItemPrice: (
      state,
      action: PayloadAction<{ productId: string; newPrice: number }>
    ) => {
      const { productId, newPrice } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        item.price = newPrice;
        state.total = calculateCartTotal(state.items);
      }

      // Persist to localStorage
      storage.set("cart", state);
    },

    // Helper action to sync cart with updated product data
    syncCartWithProducts: (state, action: PayloadAction<Product[]>) => {
      const products = action.payload;

      state.items = state.items
        .map((item) => {
          const updatedProduct = products.find((p) => p.id === item.productId);
          if (updatedProduct) {
            return {
              ...item,
              product: updatedProduct,
              price: updatedProduct.price,
            };
          }
          return item;
        })
        .filter((item) => {
          // Remove items if product no longer exists
          return products.some((p) => p.id === item.productId);
        });

      state.total = calculateCartTotal(state.items);
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Persist to localStorage
      storage.set("cart", state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
  updateCartItemPrice,
  syncCartWithProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
