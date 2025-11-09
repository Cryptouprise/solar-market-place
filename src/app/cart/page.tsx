'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Start shopping for solar panels to power your future!
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const images = JSON.parse(item.product.images);
            const image = images[0] || '/placeholder-solar.jpg';
            const itemTotal = item.product.price * item.quantity;

            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-xl font-semibold hover:text-blue-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 mt-1">{item.product.manufacturer}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.product.wattage}W</p>

                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{formatPrice(itemTotal)}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping:</span>
                <span>{total > 500 ? 'FREE' : formatPrice(50)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%):</span>
                <span>{formatPrice(total * 0.08)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    {formatPrice(total + total * 0.08 + (total > 500 ? 0 : 50))}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              <div className="text-sm text-gray-600 mt-4">
                <p>✓ Secure checkout</p>
                <p>✓ Free shipping over $500</p>
                <p>✓ 30-day return policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
