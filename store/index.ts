import { configureStore, Store, Reducer } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import { apiSlice } from "./api/apiSlice";
import { authMiddleware } from "./middleware/authMiddleware";
import { AuthState, ProductState, CartState, OrderState } from "../types";

const store: Store = configureStore({
  reducer: {
    auth: authReducer as Reducer<AuthState>,
    products: productReducer as Reducer<ProductState>,
    cart: cartReducer as Reducer<CartState>,
    orders: orderReducer as Reducer<OrderState>,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiSlice.middleware, authMiddleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
