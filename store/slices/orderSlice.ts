import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState, Order } from "@/types";

// Initial state
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

// Order slice - simplified to work with RTK Query
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentOrder,
  clearCurrentOrder,
  setError,
  clearError,
  setOrders,
  addOrder,
  updateOrder,
  setLoading,
} = orderSlice.actions;

export default orderSlice.reducer;
