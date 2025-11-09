'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Zap, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    images: string;
    wattage: number;
    manufacturer: string;
    averageRating?: number;
    reviewCount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = JSON.parse(product.images);
  const mainImage = images[0] || '/placeholder-solar.jpg';
  const discount = product.discountPrice
    ? calculateDiscount(product.price, product.discountPrice)
    : 0;

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-xl">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
              SAVE {discount}%
            </div>
          )}
          {product.wattage >= 400 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Zap className="h-3 w-3" />
              High Power
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {product.manufacturer}
          </span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
            <Zap className="h-3 w-3" />
            {product.wattage}W
          </span>
        </div>

        {product.averageRating && product.reviewCount ? (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.averageRating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 mb-3 text-gray-400">
            <Award className="h-4 w-4" />
            <span className="text-xs">Certified Quality</span>
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-1">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-base text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">Free shipping included</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full group/btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
