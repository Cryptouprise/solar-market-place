'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, Sun } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Sun className="h-6 w-6 text-yellow-500" />
              <span>Solar Market</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-sm hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-sm hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search solar panels..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </div>

            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/account">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
