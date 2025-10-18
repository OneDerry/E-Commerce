"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_DESCRIPTIONS,
  Category,
} from "@/lib/constants";

interface BestSellersSectionProps {
  category: Category;
  products: Product[];
  isLoading?: boolean;
  maxProducts?: number;
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  category,
  products,
  isLoading = false,
  maxProducts = 4,
}) => {
  const bestSellers = products
    .filter((product) => product.category === category)
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews.length - a.reviews.length;
    })
    .slice(0, maxProducts);

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted/20 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-muted/20 rounded w-48"></div>
                  <div className="h-4 bg-muted/20 rounded w-32"></div>
                </div>
              </div>
              <div className="h-10 bg-muted/20 rounded w-24"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted/20 aspect-square rounded-2xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-muted/20 rounded w-3/4"></div>
                    <div className="h-4 bg-muted/20 rounded w-1/2"></div>
                    <div className="h-6 bg-muted/20 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <section className="py-6 shadow">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">
                {CATEGORY_ICONS[category] || "📦"}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground/70 mb-2">
              No products in {category}
            </h3>
            <p className="text-muted-foreground">
              {CATEGORY_DESCRIPTIONS[category] ||
                "Check back soon for amazing products in this category!"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 shadow">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${
                CATEGORY_COLORS[category] || "from-accent to-primary"
              } rounded-xl flex items-center justify-center shadow-lg`}
            >
              <span className="text-2xl">
                {CATEGORY_ICONS[category] || "📦"}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Best Sellers in {category}
              </h2>
              <p className="text-muted-foreground">
                {CATEGORY_DESCRIPTIONS[category] ||
                  "Top-rated products customers love"}
              </p>
            </div>
          </div>
          <Link
            href={`/products?category=${encodeURIComponent(
              category.toLowerCase()
            )}`}
          >
            <Button
              variant="outline"
              className="border-border hover:border-foreground/20 group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>
                  {bestSellers.length > 0
                    ? (
                        bestSellers.reduce((sum, p) => sum + p.rating, 0) /
                        bestSellers.length
                      ).toFixed(1)
                    : "0.0"}{" "}
                  avg rating
                </span>
              </div>
              <div>
                {bestSellers.reduce((sum, p) => sum + p.reviews.length, 0)}+
                reviews
              </div>
              <div>{bestSellers.length} products</div>
            </div>
            <div className="text-accent font-medium">
              Free shipping on orders over $50
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
