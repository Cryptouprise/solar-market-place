import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Package, Shield, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <Image
              src={images[0] || '/placeholder-solar.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            {product.averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.averageRating.toFixed(1)}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-4xl font-bold text-blue-600">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                  SAVE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}
                  %
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-lg text-gray-700 mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Power Output</div>
              <div className="text-xl font-bold">{product.wattage}W</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Efficiency</div>
              <div className="text-xl font-bold">{product.efficiency}%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Warranty</div>
              <div className="text-xl font-bold">{product.warranty} years</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Cell Type</div>
              <div className="text-xl font-bold">{product.cellType}</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <Button size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>In Stock: {product.stock} units</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>{product.warranty} Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>High Efficiency</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Certified Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Manufacturer</dt>
              <dd className="font-semibold">{product.manufacturer}</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Power Output</dt>
              <dd className="font-semibold">{product.wattage}W</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Efficiency</dt>
              <dd className="font-semibold">{product.efficiency}%</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Cell Type</dt>
              <dd className="font-semibold">{product.cellType}</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Dimensions</dt>
              <dd className="font-semibold">{product.dimensions}</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Weight</dt>
              <dd className="font-semibold">{product.weight} kg</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Warranty</dt>
              <dd className="font-semibold">{product.warranty} years</dd>
            </div>
            <div className="border-b pb-3">
              <dt className="text-sm text-gray-600 mb-1">Stock</dt>
              <dd className="font-semibold">{product.stock} units available</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map(
                (review: {
                  id: string;
                  rating: number;
                  title: string;
                  comment: string;
                  createdAt: string;
                  user: { name: string | null };
                }) => (
                <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="font-semibold ml-2">{review.user.name}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{review.title}</h3>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
