import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Package, Shield, TrendingUp, Award, Zap, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/products" className="hover:text-blue-600 transition-colors">Products</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images Section - Enhanced */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group bg-gradient-to-br from-blue-50 to-gray-100">
              <Image
                src={images[0] || '/placeholder-solar.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  SAVE {discountPercentage}%
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Share2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-500">
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Enhanced */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {product.manufacturer}
                </span>
                {product.stock > 0 && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {product.name}
              </h1>

              {product.averageRating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200">
              {product.discountPrice ? (
                <>
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-3xl text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>

            {/* Key Specs - Enhanced */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-200">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-medium">Power Output</span>
                </div>
                <div className="text-3xl font-bold text-blue-900">{product.wattage}W</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-sm border border-green-200">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Efficiency</span>
                </div>
                <div className="text-3xl font-bold text-green-900">{product.efficiency}%</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm border border-purple-200">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Warranty</span>
                </div>
                <div className="text-3xl font-bold text-purple-900">{product.warranty} yrs</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm border border-amber-200">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">Cell Type</span>
                </div>
                <div className="text-xl font-bold text-amber-900">{product.cellType}</div>
              </div>
            </div>

            {/* Action Buttons - Enhanced */}
            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <ShoppingCart className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="w-full text-lg py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                Buy Now
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm pt-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{product.stock} units available</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-medium">{product.warranty} Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="font-medium">High Efficiency</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span className="font-medium">Certified Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section - Enhanced */}
        <Card className="mb-12 shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white">Technical Specifications</h2>
          </div>
          <CardContent className="p-8">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Manufacturer', value: product.manufacturer },
                { label: 'Power Output', value: `${product.wattage}W` },
                { label: 'Efficiency', value: `${product.efficiency}%` },
                { label: 'Cell Type', value: product.cellType },
                { label: 'Dimensions', value: product.dimensions },
                { label: 'Weight', value: `${product.weight} kg` },
                { label: 'Warranty', value: `${product.warranty} years` },
                { label: 'Stock', value: `${product.stock} units available` },
              ].map((spec, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                  <dt className="text-sm font-medium text-gray-600 mb-1">{spec.label}</dt>
                  <dd className="text-xl font-bold text-gray-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Reviews Section - Enhanced */}
        {product.reviews && product.reviews.length > 0 && (
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
            </div>
            <CardContent className="p-8">
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
                  <div key={review.id} className="border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-transparent rounded-r-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-lg text-gray-900">{review.user.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{review.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
