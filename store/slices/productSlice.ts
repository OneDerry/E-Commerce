/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, Product, ProductFilters, SortOption } from "@/types";

// Initial state
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedCategory: "",
  searchQuery: "",
  isLoading: false,
  error: null,
};

// Product slice - now simplified to work with RTK Query
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredProducts = filterProductsByCategoryAndSearch(
        state.products,
        state.selectedCategory,
        action.payload
      );
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterProductsByCategoryAndSearch(
        state.products,
        action.payload,
        state.searchQuery
      );
    },
    filterProducts: (state, action: PayloadAction<ProductFilters>) => {
      state.filteredProducts = applyFilters(state.products, action.payload);
    },
    sortProducts: (state, action: PayloadAction<SortOption>) => {
      state.filteredProducts = sortProductsByOption(
        state.filteredProducts,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.selectedCategory = "";
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = filterProductsByCategoryAndSearch(
        action.payload,
        state.selectedCategory,
        state.searchQuery
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Helper functions
function filterProductsByCategoryAndSearch(
  products: Product[],
  category: string,
  searchQuery: string
): Product[] {
  let filtered = products;

  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let filtered = products;

  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category === filters.category
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
  }

  if (filters.rating !== undefined) {
    filtered = filtered.filter((product) => product.rating >= filters.rating!);
  }

  if (filters.inStock !== undefined) {
    filtered = filtered.filter((product) =>
      filters.inStock ? product.stock > 0 : product.stock === 0
    );
  }

  return filtered;
}

function sortProductsByOption(
  products: Product[],
  sortOption: SortOption
): Product[] {
  return [...products].sort((a, b) => {
    let aValue: any = a[sortOption.field];
    let bValue: any = b[sortOption.field];

    if (sortOption.field === "price") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (sortOption.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

export const {
  setSearchQuery,
  setSelectedCategory,
  filterProducts,
  sortProducts,
  clearFilters,
  setError,
  setProducts,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;
