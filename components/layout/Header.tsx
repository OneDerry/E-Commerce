"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  RotateCcw,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { clearAuth } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, isAdmin } = useAppSelector(
    (state) => state.auth
  );
  const { itemCount } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-primary/95 backdrop-blur-sm border-b border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">
                N
              </span>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">
              VDM Store.
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-8 items-center gap-3"
          >
            {/* Filter Dropdown for All */}
            <div>
              <select
                className="h-11 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground px-4 focus:outline-none focus:border-accent"
                defaultValue="all"
                // You may want to add state + onChange handler if you want real filtering behavior
              >
                <option value="all">All</option>
              </select>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search VDM Store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-full border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder-primary-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Refresh Icon */}
            <button className="p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-colors">
              <RotateCcw className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Heart/Wishlist */}
            <button className="p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-full px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary-foreground">
                    {user?.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart" className="relative p-2 text-foreground/70">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-card-foreground">
                    Welcome, {user?.name}
                  </div>
                  <Link
                    href="/orders"
                    className="block px-3 py-2 text-foreground/70 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-foreground/70 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-foreground/70 hover:text-foreground"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-foreground/70 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-foreground/70 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
