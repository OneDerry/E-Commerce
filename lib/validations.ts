import { z } from "zod";

// Auth Validation Schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Product Validation Schemas
export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().nonnegative("Stock cannot be negative"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
});

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

// Order Validation Schemas
export const checkoutSchema = z.object({
  shippingAddress: z
    .string()
    .min(10, "Shipping address must be at least 10 characters"),
  paymentMethod: z.enum(["stripe", "paystack"], {
    message: "Please select a payment method",
  }),
});

// Search and Filter Schemas
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  rating: z.number().min(1).max(5).optional(),
  inStock: z.boolean().optional(),
});

export const sortSchema = z.object({
  field: z.enum(["name", "price", "rating", "createdAt"]),
  direction: z.enum(["asc", "desc"]),
});

// Pagination Schema
export const paginationSchema = z.object({
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(20),
});

// Admin Validation Schemas
export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered"]),
});

export const updateUserRoleSchema = z.object({
  isAdmin: z.boolean(),
});

// Email Validation
export const emailSchema = z.object({
  to: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  html: z.string().min(1, "Email content is required"),
});

// Utility function to get error messages
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return typeof error === "object" && error && "message" in error
      ? (error as { message?: string }).message || "Validation error"
      : "Validation error";
  }
  return (error as Error)?.message || "An error occurred";
};

// Type exports for form data
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type SortFormData = z.infer<typeof sortSchema>;
export type PaginationFormData = z.infer<typeof paginationSchema>;
export type UpdateOrderStatusFormData = z.infer<typeof updateOrderStatusSchema>;
export type UpdateUserRoleFormData = z.infer<typeof updateUserRoleSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
