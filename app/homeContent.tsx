/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/products/ProductCard";
import BestSellersSection from "@/components/products/BestSellersSection";
import { CATEGORIES } from "@/lib/constants";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Star,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";

import Shoes from "@/public/Shoes.jpeg";
import HeadPhones from "@/public/HeadPhones.jpeg";
import Sneakers from "@/public/Sneakers.jpeg";
import Toaster from "@/public/Toaster.jpeg";
import Watch from "@/public/Watch.jpeg";

export default function Home() {
  const searchParams = useSearchParams();
  const { products, isLoading, setSearch, setCategory } = useProducts();

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("search");
      const category = searchParams.get("category");

      if (search) {
        setSearch(search);
      }

      if (category) {
        setCategory(category);
      }
    }
  }, [searchParams, setSearch, setCategory]);

  // Get featured products (top rated or newest)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Get popular products (most reviews)
  const popularProducts = [...products]
    .sort((a, b) => b.reviews.length - a.reviews.length)
    .slice(0, 5);

  // const popularBuys = [...products]
  //   .sort((a, b) => b.sales - a.sales)
  //   .slice(0, 2);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const popularCount = popularProducts.length;

  const handlePrev = () =>
    setCarouselIndex((prev) => (prev - 1 + popularCount) % popularCount);
  const handleNext = () =>
    setCarouselIndex((prev) => (prev + 1) % popularCount);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen">
        {/* Main Content Container */}
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="backdrop-blur-sm rounded-3xl  p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Hero Section */}
              <div className="lg:col-span-2">
                {/* Featured Product Image */}
                <div className="relative mb-8">
                  <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Abstract background shapes */}
                        <div className="absolute -top-10 -left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/15 rounded-full blur-lg"></div>

                        {/* Carousel for Popular Products */}
                        {popularCount > 0 && (
                          <div className="w-80 h-80 bg-gradient-to-br from-accent to-primary rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500 animate-float relative">
                            <Image
                              key={popularProducts[carouselIndex].id}
                              src={popularProducts[carouselIndex].image}
                              alt={popularProducts[carouselIndex].name}
                              fill
                              className="rounded"
                              style={{ objectFit: "cover" }}
                            />
                            {/* Carousel navigation buttons overlay (for more visible placement) */}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2 shadow-lg"
                      aria-label="Previous popular product"
                    >
                      <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2 shadow-lg"
                      aria-label="Next popular product"
                    >
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </button>
                  </div>

                  {/* Navigation Arrows removed from outer layer; now in carousel */}
                </div>

                {/* Featured Products Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-foreground">
                      Featured Products
                    </h2>
                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="border-border hover:border-foreground/20"
                      >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="bg-gradient-to-br from-muted/20 to-muted/30 aspect-square rounded-2xl mb-4"></div>
                          <div className="space-y-3">
                            <div className="h-5 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-3/4"></div>
                            <div className="h-4 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-1/2"></div>
                            <div className="h-6 bg-gradient-to-r from-muted/20 to-muted/30 rounded w-1/3"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="transform hover:scale-105 transition-transform duration-300"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-br from-muted/20 to-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🎧</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground/70 mb-2">
                        No products available
                      </h3>
                      <p className="text-muted-foreground">
                        Check back soon for amazing audio products!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Popular Orders */}
                <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Popular Buys
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative w-24 h-24 bg-gray-300 p-2 rounded-xl border-2 border-white shadow-lg">
                      <Image
                        src={Shoes}
                        alt="Popular order - coffee"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="relative w-24 h-24 bg-gray-300 p-2 rounded-xl border-2 border-white shadow-lg">
                      <Image
                        src={HeadPhones}
                        alt="Popular order - coffee"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="relative w-24 h-24 bg-gray-300 p-2 rounded-xl border-2 border-white shadow-lg">
                      <Image
                        src={Sneakers}
                        alt="Popular order"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="relative w-24 h-24 bg-gray-300 p-2 rounded-xl border-2 border-white shadow-lg">
                      <Image
                        src={Toaster}
                        alt="Popular order"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="relative w-24 h-24 bg-gray-300 p-2 rounded-xl border-2 border-white shadow-lg">
                      <Image
                        src={Watch}
                        alt="Popular order"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                </Card>

                {/* Featured Product Cards */}
                <div className="mb-5">
                  {popularProducts.slice(0, 2).map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">
                              {product.rating.toFixed(1)}
                            </span>
                            <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="mt-5">
                  {/* Fallback cards if no products available */}
                  {products.length === 0 && (
                    <>
                      <Card className="p-6 mt-5 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                              <div className="text-4xl">🎧</div>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Premium Headphones
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Coming Soon</span>
                          <ArrowRight className="h-5 w-5 text-gray-500" />
                        </div>
                      </Card>

                      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center">
                              <div className="text-4xl">🎵</div>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Audio Accessories
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Coming Soon</span>
                          <ArrowRight className="h-5 w-5 text-gray-500" />
                        </div>
                      </Card>
                    </>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-5 gap-6">
                  {/* Follow Us */}
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Follow us on:
                    </h3>
                    <div className="flex gap-3">
                      <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <Youtube className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                        <Instagram className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  </Card>

                  {/* More Products */}
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">
                        More Products
                      </h3>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      {products.length} items available.
                    </p>
                    <div className="flex gap-2">
                      {products.slice(0, 3).map((product: any) => (
                        <div
                          key={product.id}
                          className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Downloads */}
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                    <div className="flex gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                    </div>
                    <p className="text-lg font-bold text-blue-800">
                      {products.reduce(
                        (sum: number, p: any) => sum + p.reviews.length,
                        0
                      )}
                      + Reviews
                    </p>
                    <p className="text-blue-600">
                      {products.length > 0
                        ? (
                            products.reduce(
                              (sum: number, p: any) => sum + p.rating,
                              0
                            ) / products.length
                          ).toFixed(1)
                        : "0.0"}{" "}
                      avg rating
                    </p>
                  </Card>

                  {/* Product Rating */}
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600">Popular</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {popularProducts.length > 0
                        ? popularProducts[0].name
                        : "Featured Product"}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      {popularProducts.slice(0, 3).map((product) => (
                        <div
                          key={product.id}
                          className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded overflow-hidden"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">
                        {popularProducts.length > 0
                          ? popularProducts[0].rating.toFixed(1)
                          : "0.0"}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-500 ml-auto" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Sellers Sections */}
        {CATEGORIES.map((category) => (
          <BestSellersSection
            key={category}
            category={category}
            products={products}
            isLoading={isLoading}
            maxProducts={4}
          />
        ))}
      </div>
    </Suspense>
  );
}
