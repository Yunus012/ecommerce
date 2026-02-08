'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Store, Truck, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container-glass py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold mb-6 gradient-text animate-fade-in">
            Digital Commerce Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empower small offline businesses to compete with centralized quick-commerce platforms
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => router.push('/auth/login')}
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/shop')}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="glass-card p-8 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
              <Store className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Inventory Management</h3>
            <p className="text-gray-400">
              Manage your products, stock levels, and pricing with ease
            </p>
          </div>

          <div className="glass-card p-8 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Online Orders</h3>
            <p className="text-gray-400">
              Receive and process online orders from customers seamlessly
            </p>
          </div>

          <div className="glass-card p-8 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Truck className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Logistics Integration</h3>
            <p className="text-gray-400">
              Integrated delivery partner management and tracking
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 glass-card p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-400">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">25+</div>
              <div className="text-gray-400">Sample Orders</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">3</div>
              <div className="text-gray-400">User Roles</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-hover p-6 flex gap-4">
              <Zap className="w-8 h-8 text-primary-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">
                  Built with Next.js for optimal performance and user experience
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 flex gap-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm">
                  Role-based access control and secure authentication
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 flex gap-4">
              <TrendingUp className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Analytics Dashboard</h3>
                <p className="text-gray-400 text-sm">
                  Real-time insights into sales, orders, and inventory
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 flex gap-4">
              <Store className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Easy to Use</h3>
                <p className="text-gray-400 text-sm">
                  Intuitive interface designed for small business owners
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-card p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the digital commerce revolution and start competing with larger platforms today
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/auth/register')}
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </div>
  );
}
