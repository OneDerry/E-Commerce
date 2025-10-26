/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useProducts, useAuth, useEventTracking } from "@/lib/hooks";
import ProductCard from "@/components/products/ProductCard";

/**
 * Example component showing how to use the new RTK Query + Redux setup
 * This replaces the old pattern of using createAsyncThunk
 */
export const ProductListExample: React.FC = () => {
  const {
    products,
    filteredProducts,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    setSearch,
    setCategory,
    clearFilters,
  } = useProducts();

  const { isAuthenticated, user } = useAuth();
  const { trackEvent } = useEventTracking();

  // Track page view
  useEffect(() => {
    trackEvent("page_view", "products", {
      page: "product_list",
      productCount: products.length,
    });
  }, [trackEvent, products.length]);

  const handleSearch = (query: string) => {
    setSearch(query);
    trackEvent("search", "products", { query });
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    trackEvent("filter", "products", { category });
  };

  // const handleProductClick = (productId: string) => {
  //   trackEvent("product_click", "products", { productId });
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading products: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* User Info */}
      {isAuthenticated && (
        <div className="bg-muted p-4 rounded-lg">
          <p>Welcome back, {user?.name}!</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchQuery || selectedCategory
              ? "No products match your filters"
              : "No products available"}
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
