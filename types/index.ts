/* eslint-disable @typescript-eslint/no-explicit-any */
// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
}

// Product Types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Order Types
export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentMethod: "card" | "paystack";
  paymentStatus: "pending" | "completed" | "failed";
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

export interface CheckoutFormData {
  shippingAddress: string;
  paymentMethod: "card" | "paystack";
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// UI Types
export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export interface SortOption {
  field: "name" | "price" | "rating" | "createdAt";
  direction: "asc" | "desc";
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  lowStockProducts: Product[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}
