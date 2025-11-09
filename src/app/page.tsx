import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Zap, Shield, TrendingUp, Award, Sun, Sparkles, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 10,000+ Customers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in">
              Power Your Future with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mt-2">
                Solar Energy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Discover premium solar panels from trusted manufacturers at competitive prices. 
              Join the renewable energy revolution today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-6">
                  <Sun className="mr-2 h-6 w-6" />
                  Shop Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              {[
                { value: '10k+', label: 'Happy Customers' },
                { value: '500+', label: 'Solar Panels' },
                { value: '25 Yrs', label: 'Warranty' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why Choose Solar Market?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of sustainable energy with our premium solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'High Efficiency',
                description: 'Premium solar panels with up to 22% efficiency ratings',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50'
              },
              {
                icon: Shield,
                title: 'Warranty Protected',
                description: 'All products come with manufacturer warranty up to 25 years',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50'
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Competitive pricing from multiple verified sellers',
                gradient: 'from-amber-500 to-orange-500',
                bgGradient: 'from-amber-50 to-orange-50'
              },
              {
                icon: Award,
                title: 'Trusted Quality',
                description: 'Only certified products from reputable manufacturers',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Leaf className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">Eco-Friendly & Sustainable</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make the Switch?
          </h2>
          
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen solar energy and are saving money while saving the planet
          </p>
          
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-6">
              <Sun className="mr-2 h-6 w-6" />
              Browse Products
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          
          <div className="mt-12 flex justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
