"use client";

import React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gradient-to-br from-muted/20 to-muted/30 aspect-square rounded-2xl mb-6"></div>
            <div className="space-y-3">
              <div className="h-5 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-1/2"></div>
              <div className="h-6 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gradient-to-br from-muted/20 to-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <div className="text-foreground/70 text-xl font-semibold mb-4">
          No products found
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your search or filter criteria to find what you&apos;re
          looking for
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
