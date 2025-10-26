"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-xl h-110 transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/5 border-0 rounded-2xl overflow-hidden">
        <div className="relative h-60 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Heart Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg"
            >
              <Heart className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-sm text-muted-foreground ml-2">
                ({product.reviews.length})
              </span>
            </div>

            <p className="text-sm truncate w-full text-foreground/70 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {formatCurrency(product.price)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} left` : "Sold out"}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
