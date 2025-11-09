'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
        <p className="text-sm text-gray-500 mb-2">{product.wattage}W</p>

        {product.averageRating && product.reviewCount ? (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
