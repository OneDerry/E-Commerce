/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useCallback } from "react";
import {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,
  useTrackEventMutation,
} from "@/store/api/apiSlice";
import {
  setProducts,
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
  setError as setProductError,
} from "@/store/slices/productSlice";
import {
  setOrders,
  addOrder,
  updateOrder,
  setCurrentOrder,
  setError as setOrderError,
} from "@/store/slices/orderSlice";
import {
  setUser,
  setToken,
  clearAuth,
  setError as setAuthError,
} from "@/store/slices/authSlice";

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// Auth hooks
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: isSignupLoading }] = useSignupMutation();
  const { isLoading: isVerifying } = useGetCurrentUserQuery(undefined, {
    skip: !auth.token,
  });

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const result = await loginMutation(credentials).unwrap();
        if (result.success && result.data) {
          dispatch(setToken(result.data.accessToken));
          dispatch(setUser(result.data.user));
          return { success: true };
        }
        return { success: false, error: "Login failed" };
      } catch (error: any) {
        dispatch(setAuthError(error.message || "Login failed"));
        return { success: false, error: error.message || "Login failed" };
      }
    },
    [dispatch, loginMutation]
  );

  const signup = useCallback(
    async (userData: {
      name: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const result = await signupMutation(userData).unwrap();
        if (result.success && result.data) {
          dispatch(setToken(result.data.accessToken));
          dispatch(setUser(result.data.user));
          return { success: true };
        }
        return { success: false, error: "Signup failed" };
      } catch (error: any) {
        dispatch(setAuthError(error.message || "Signup failed"));
        return { success: false, error: error.message || "Signup failed" };
      }
    },
    [dispatch, signupMutation]
  );

  const logout = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    ...auth,
    login,
    signup,
    logout,
    isLoading: isLoginLoading || isSignupLoading || isVerifying,
  };
};

// Product hooks
export const useProducts = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.products);
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createProductMutation] = useCreateProductMutation();
  const [updateProductMutation] = useUpdateProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [addReviewMutation] = useAddReviewMutation();

  // Update local state when RTK Query data changes
  if (products && products !== productState.products) {
    dispatch(setProducts(products));
  }

  const createProduct = useCallback(
    async (productData: any) => {
      try {
        const result = await createProductMutation(productData).unwrap();
        return { success: true, data: result.data };
      } catch (error: any) {
        dispatch(setProductError(error.message || "Failed to create product"));
        return {
          success: false,
          error: error.message || "Failed to create product",
        };
      }
    },
    [dispatch, createProductMutation]
  );

  const updateProduct = useCallback(
    async (id: string, data: any) => {
      try {
        const result = await updateProductMutation({ id, data }).unwrap();
        return { success: true, data: result.data };
      } catch (error: any) {
        dispatch(setProductError(error.message || "Failed to update product"));
        return {
          success: false,
          error: error.message || "Failed to update product",
        };
      }
    },
    [dispatch, updateProductMutation]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteProductMutation(id).unwrap();
        return { success: true };
      } catch (error: any) {
        dispatch(setProductError(error.message || "Failed to delete product"));
        return {
          success: false,
          error: error.message || "Failed to delete product",
        };
      }
    },
    [dispatch, deleteProductMutation]
  );

  const addReview = useCallback(
    async (productId: string, reviewData: any) => {
      try {
        const result = await addReviewMutation({
          productId,
          reviewData,
        }).unwrap();
        return { success: true, data: result.data };
      } catch (error: any) {
        dispatch(setProductError(error.message || "Failed to add review"));
        return {
          success: false,
          error: error.message || "Failed to add review",
        };
      }
    },
    [dispatch, addReviewMutation]
  );

  const setSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const setCategory = useCallback(
    (category: string) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  const clearProductFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    ...productState,
    isLoading: isLoading || productState.isLoading,
    error: (error as any)?.message || productState.error,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview,
    setSearch,
    setCategory,
    clearFilters: clearProductFilters,
  };
};

export const useProduct = (id: string) => {
  const { data: product, isLoading, error } = useGetProductQuery(id);
  return {
    product,
    isLoading,
    error: (error as any)?.message,
  };
};

// Order hooks
export const useOrders = () => {
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.orders);
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [createOrderMutation] = useCreateOrderMutation();
  const [updateOrderStatusMutation] = useUpdateOrderStatusMutation();
  const [updatePaymentStatusMutation] = useUpdatePaymentStatusMutation();

  // Update local state when RTK Query data changes
  if (orders && orders !== orderState.orders) {
    dispatch(setOrders(orders));
  }

  const createOrder = useCallback(
    async (orderData: any) => {
      try {
        const result = await createOrderMutation(orderData).unwrap();
        if (result.success && result.data) {
          dispatch(addOrder(result.data));
          return { success: true, data: result.data };
        }
        return { success: false, error: "Failed to create order" };
      } catch (error: any) {
        dispatch(setOrderError(error.message || "Failed to create order"));
        return {
          success: false,
          error: error.message || "Failed to create order",
        };
      }
    },
    [dispatch, createOrderMutation]
  );

  const updateOrderStatus = useCallback(
    async (id: string, status: string) => {
      try {
        const result = await updateOrderStatusMutation({ id, status }).unwrap();
        if (result.success && result.data) {
          dispatch(updateOrder(result.data));
          return { success: true, data: result.data };
        }
        return { success: false, error: "Failed to update order status" };
      } catch (error: any) {
        dispatch(
          setOrderError(error.message || "Failed to update order status")
        );
        return {
          success: false,
          error: error.message || "Failed to update order status",
        };
      }
    },
    [dispatch, updateOrderStatusMutation]
  );

  const updatePaymentStatus = useCallback(
    async (id: string, paymentStatus: string) => {
      try {
        const result = await updatePaymentStatusMutation({
          id,
          paymentStatus,
        }).unwrap();
        if (result.success && result.data) {
          dispatch(updateOrder(result.data));
          return { success: true, data: result.data };
        }
        return { success: false, error: "Failed to update payment status" };
      } catch (error: any) {
        dispatch(
          setOrderError(error.message || "Failed to update payment status")
        );
        return {
          success: false,
          error: error.message || "Failed to update payment status",
        };
      }
    },
    [dispatch, updatePaymentStatusMutation]
  );

  const setCurrent = useCallback(
    (order: any) => {
      dispatch(setCurrentOrder(order));
    },
    [dispatch]
  );

  return {
    ...orderState,
    isLoading: isLoading || orderState.isLoading,
    error: (error as any)?.message || orderState.error,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    setCurrentOrder: setCurrent,
  };
};

export const useOrder = (id: string) => {
  const { data: order, isLoading, error } = useGetOrderQuery(id);
  return {
    order,
    isLoading,
    error: (error as any)?.message,
  };
};

// Event tracking hook
export const useEventTracking = () => {
  const [trackEventMutation] = useTrackEventMutation();
  const auth = useAppSelector((state) => state.auth);

  const trackEvent = useCallback(
    async (name: string, category: string, payload?: any) => {
      try {
        await trackEventMutation({
          name,
          category,
          payload,
          userId: auth.user?.id,
          sessionId:
            typeof window !== "undefined"
              ? sessionStorage.getItem("sessionId") || undefined
              : undefined,
        }).unwrap();
      } catch (error) {
        console.warn("Failed to track event:", error);
      }
    },
    [trackEventMutation, auth.user?.id]
  );

  return { trackEvent };
};
