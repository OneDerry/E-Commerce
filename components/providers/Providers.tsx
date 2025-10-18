"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loadCartFromStorage } from "@/store/slices/cartSlice";
import { useGetCurrentUserQuery } from "@/store/api/apiSlice";

// Component to initialize cart and auth on app load
function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  // Automatically verify token when component mounts if token exists
  useGetCurrentUserQuery(undefined, {
    skip: !token, // Only run if token exists
  });

  useEffect(() => {
    // Load cart from localStorage
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
