import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { setToken } from "../slices/authSlice";

export const authMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action: any) => {
    // Initialize auth state from localStorage on app start
    if (action.type === "@@INIT" && typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        store.dispatch(setToken(token));
      }
    }

    // Handle token persistence
    if (action.type === "auth/setToken" && typeof window !== "undefined") {
      localStorage.setItem("token", action.payload);
    }

    if (action.type === "auth/clearAuth" && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    return next(action);
  };
