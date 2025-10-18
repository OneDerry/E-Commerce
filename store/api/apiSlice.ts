/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";
import {
  User,
  Product,
  Order,
  LoginFormData,
  SignupFormData,
  CheckoutFormData,
  ReviewFormData,
  ProductFormData,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

// Base query with re-authentication and fallback
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle network errors or backend unavailable
  if (
    result.error &&
    (result.error.status === "FETCH_ERROR" ||
      result.error.status === "PARSING_ERROR")
  ) {
    console.warn("Backend unavailable, this is expected in development mode");
    // Return a special error that can be handled by individual endpoints
    return {
      error: {
        status: "BACKEND_UNAVAILABLE",
        data: "Backend server is not running",
      },
    };
  }

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      // Store the new token
      api.dispatch({
        type: "auth/setToken",
        payload: (refreshResult.data as any).accessToken,
      });
      // Retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      api.dispatch({ type: "auth/clearAuth" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Product", "Order", "Review"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
      LoginFormData
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<
      ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
      SignupFormData
    >({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query<ApiResponse<{ user: User }>, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    refreshToken: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { refreshToken: string }
    >({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),

    // Product endpoints
    getProducts: builder.query<
      Product[],
      { search?: string; category?: string } | void
    >({
      queryFn: async (
        params: { search?: string; category?: string } = {},
        queryApi,
        extraOptions,
        baseQuery
      ) => {
        const query = new URLSearchParams();
        if (params.search) query.append("search", params.search);
        if (params.category) query.append("category", params.category);

        const result = await baseQuery(
          `/products${query.toString() ? `?${query}` : ""}`
        );

        if (result.error && result.error.status === "BACKEND_UNAVAILABLE") {
          try {
            const { DUMMY_PRODUCTS } = await import("@/lib/constants");
            let products = DUMMY_PRODUCTS;

            if (params?.category) {
              products = products.filter((p) => p.category === params.category);
            }
            if (params?.search) {
              const searchTerm = params.search.toLowerCase();
              products = products.filter(
                (p) =>
                  p.name.toLowerCase().includes(searchTerm) ||
                  p.description.toLowerCase().includes(searchTerm)
              );
            }

            return { data: products };
          } catch (error) {
            console.error("Failed to load products:", error);
            return {
              error: {
                status: 500,
                data: "Failed to load products",
                error: error,
              },
            };
          }
        }

        if (result.error) {
          return result;
        }

        return { data: result.data as Product[] };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: builder.query<Product, string>({
      queryFn: async (
        id: string,
        queryApi: any,
        extraOptions: any,
        baseQuery: any
      ) => {
        const result = await baseQuery(
          `/products/${id}`,
          queryApi,
          extraOptions
        );

        if (result.error && result.error.status === "BACKEND_UNAVAILABLE") {
          try {
            const { DUMMY_PRODUCTS } = await import("@/lib/constants");
            const product = DUMMY_PRODUCTS.find((p) => p.id === id);

            if (!product) {
              return { error: { status: 404, data: "Product not found" } };
            }

            return { data: product };
          } catch (error) {
            return { error: { status: 500, data: "Failed to load product" } };
          }
        }

        if (result.error) {
          return result;
        }

        return { data: result.data as Product };
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation<ApiResponse<Product>, ProductFormData>({
      query: (productData) => ({
        url: "/products/admin",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      ApiResponse<Product>,
      { id: string; data: Partial<ProductFormData> }
    >({
      query: ({ id, data }) => ({
        url: `/products/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/products/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    addReview: builder.mutation<
      ApiResponse<any>,
      { productId: string; reviewData: ReviewFormData }
    >({
      query: ({ productId, reviewData }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
        { type: "Review", id: "LIST" },
      ],
    }),

    // Order endpoints
    createOrder: builder.mutation<ApiResponse<Order>, CheckoutFormData>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrderStatus: builder.mutation<
      ApiResponse<Order>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/orders/admin/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    updatePaymentStatus: builder.mutation<
      ApiResponse<Order>,
      { id: string; paymentStatus: string }
    >({
      query: ({ id, paymentStatus }) => ({
        url: `/orders/admin/${id}`,
        method: "PUT",
        body: { paymentStatus },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    // Event tracking
    trackEvent: builder.mutation<
      ApiResponse<{ id: string }>,
      {
        name: string;
        category: string;
        payload?: any;
        userId?: string;
        sessionId?: string;
      }
    >({
      query: (eventData) => ({
        url: "/events",
        method: "POST",
        body: eventData,
      }),
    }),
  }),
});

export const {
  // Auth hooks
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,

  // Product hooks
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,

  // Order hooks
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,

  // Event tracking
  useTrackEventMutation,
} = apiSlice;
