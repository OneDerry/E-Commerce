/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{
      success: boolean;
      user: any;
      accessToken: string;
      refreshToken: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      this.setToken(response.accessToken);
    }

    return response;
  }

  async signup(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) {
    const response = await this.request<{
      success: boolean;
      user: any;
      accessToken: string;
      refreshToken: string;
    }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setToken(response.accessToken);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: any }>("/auth/me");
  }

  async refreshToken(refreshToken: string) {
    const response = await this.request<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    this.setToken(response.accessToken);
    return response;
  }

  // Products endpoints
  async getProducts(params?: { search?: string; category?: string }) {
    // Use dummy data in development if forced
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true"
    ) {
      console.log("Using dummy data (forced in development)");
      console.log("Environment check:", {
        NODE_ENV: process.env.NODE_ENV,
        USE_DUMMY_DATA: process.env.NEXT_PUBLIC_USE_DUMMY_DATA,
      });
      const { DUMMY_PRODUCTS } = await import("@/lib/constants");
      // console.log("Loaded dummy products:", DUMMY_PRODUCTS.length);

      let products = DUMMY_PRODUCTS;

      // Apply filters to dummy data
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

      return products;
    }

    try {
      const query = new URLSearchParams();
      if (params?.search) query.append("search", params.search);
      if (params?.category) query.append("category", params.category);

      const endpoint = query.toString() ? `/products?${query}` : "/products";
      return this.request<any[]>(endpoint);
    } catch (error) {
      // Fallback to dummy data when API is unavailable
      console.warn("API unavailable, using dummy data:", error);
      const { DUMMY_PRODUCTS } = await import("@/lib/constants");
      console.log("Fallback: Loaded dummy products:", DUMMY_PRODUCTS.length);

      let products = DUMMY_PRODUCTS;

      // Apply filters to dummy data
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

      return products;
    }
  }

  async getProduct(id: string) {
    // Use dummy data in development if forced
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true"
    ) {
      console.log("Using dummy data for product (forced in development):", id);
      const { DUMMY_PRODUCTS } = await import("@/lib/constants");

      const product = DUMMY_PRODUCTS.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }

      return product;
    }

    try {
      return this.request<any>(`/products/${id}`);
    } catch (error) {
      // Fallback to dummy data when API is unavailable
      console.warn("API unavailable, using dummy data for product:", id, error);
      const { DUMMY_PRODUCTS } = await import("@/lib/constants");

      const product = DUMMY_PRODUCTS.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }

      return product;
    }
  }

  // Orders endpoints
  async createOrder(data: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: string;
    paymentMethod: "stripe" | "paystack";
  }) {
    return this.request<any>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOrders() {
    return this.request<any[]>("/orders");
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`);
  }

  // Events endpoint
  async trackEvent(data: {
    name: string;
    category: string;
    payload?: any;
    userId?: string;
    sessionId?: string;
  }) {
    return this.request<{ success: boolean; id: string }>("/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
