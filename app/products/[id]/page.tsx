/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  useAppDispatch,
  useAppSelector,
  useProduct,
  useProducts,
} from "@/lib/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Heart,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const productId = params?.id as string;
  const { product, isLoading } = useProduct(productId);
  const { addReview, products } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  // const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      toast.success("Product added to cart");
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product && reviewComment.trim()) {
      const result = await addReview(product.id, {
        rating: reviewRating,
        comment: reviewComment,
      });
      if (result.success) {
        setReviewComment("");
      }
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRatingChange?: (rating: number) => void
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type={interactive ? "button" : undefined}
        onClick={
          interactive && onRatingChange
            ? () => onRatingChange(i + 1)
            : undefined
        }
        className={`h-6 w-6 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        } ${interactive ? "hover:text-yellow-400 cursor-pointer" : ""}`}
      >
        <Star className="h-full w-full" />
      </button>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const avgRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  const similarProducts = products.filter(
    (p: any) => p.category === product?.category && p.id !== product?.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white border border-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Image Thumbnails could go here in a real app */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(avgRating)}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-gray-500">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Stock Status */}
            <div className="pt-2 border-t">
              <div
                className={`text-sm font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `✓ ${product.stock} in stock`
                  : "Out of stock"}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-medium">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-medium">Secure Checkout</p>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center"
                  min="1"
                  max={product.stock}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• High-quality materials and craftsmanship</li>
                <li>• Eco-friendly production process</li>
                <li>• Perfect for everyday use</li>
                <li>• Available in multiple colors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description & Details Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">About This Product</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
            <h3 className="font-semibold text-lg mb-3">Specifications:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>SKU:</strong> SKU-{product.id}
              </li>
              <li>
                <strong>Warranty:</strong> 2-year limited warranty
              </li>
              <li>
                <strong>Shipping Weight:</strong> 2.5 lbs
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "What's the warranty coverage?",
                a: "Our products come with a 2-year limited warranty covering manufacturing defects.",
              },
              {
                q: "How long does shipping take?",
                a: "Standard shipping takes 5-7 business days. Express shipping available for 2-3 business days.",
              },
              {
                q: "Is this product recyclable?",
                a: "Yes, our packaging is 100% recyclable and we use eco-friendly materials.",
              },
              {
                q: "Can I return or exchange?",
                a: "We offer 30-day returns and exchanges with no questions asked.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border rounded-lg">
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === idx ? null : idx)
                  }
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-left">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition ${
                      expandedFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFAQ === idx && (
                  <div className="px-4 pb-4 text-gray-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          {/* Add Review Form */}
          {isAuthenticated && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex space-x-1">
                      {renderStars(reviewRating, true, setReviewRating)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <Textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={!reviewComment.trim()}>
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8 bg-white rounded-lg border">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.userName}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((prod: any) => (
                <Link href={`/products/${prod.id}`} key={prod.id}>
                  <Card className="hover:shadow-lg transition h-full">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover hover:scale-105 transition"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                        {prod.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(prod.price)}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {(
                              prod.reviews.reduce(
                                (sum: number, r: any) => sum + r.rating,
                                0
                              ) / (prod.reviews.length || 1)
                            ).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-3"
                        size="sm"
                        variant="outline"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <MessageCircle className="h-6 w-6 mx-auto mb-3 text-blue-600" />
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Have questions about this product? Our support team is here to help.
          </p>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  );
}
