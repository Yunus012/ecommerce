'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Store, Truck, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container-glass py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 pt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in leading-tight">
            Digital Commerce Platform
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empower small offline businesses to compete with centralized quick-commerce platforms
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => router.push('/auth/login')}
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => router.push('/shop')}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-20 max-w-6xl mx-auto">
          <div className="glass-card p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
              <Store className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Inventory Management</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your products, stock levels, and pricing with ease
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Online Orders</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Receive and process online orders from customers seamlessly
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Logistics Integration</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Integrated delivery partner management and tracking
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="glass-card p-8 sm:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="pb-8 sm:pb-0">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-400 font-medium">Products Available</div>
              </div>
              <div className="py-8 sm:py-0">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">25+</div>
                <div className="text-gray-400 font-medium">Sample Orders</div>
              </div>
              <div className="pt-8 sm:pt-0">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">3</div>
                <div className="text-gray-400 font-medium">User Roles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-hover p-6 rounded-xl border border-white/5 flex gap-4 items-start group hover:border-primary-500/30 transition-colors">
              <div className="p-3 rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors shrink-0">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">Lightning Fast</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Built with Next.js for optimal performance and user experience
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 rounded-xl border border-white/5 flex gap-4 items-start group hover:border-cyan-500/30 transition-colors">
              <div className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors shrink-0">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Role-based access control and secure authentication
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 rounded-xl border border-white/5 flex gap-4 items-start group hover:border-emerald-500/30 transition-colors">
              <div className="p-3 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Analytics Dashboard</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Real-time insights into sales, orders, and inventory
                </p>
              </div>
            </div>

            <div className="glass-hover p-6 rounded-xl border border-white/5 flex gap-4 items-start group hover:border-amber-500/30 transition-colors">
              <div className="p-3 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors shrink-0">
                <Store className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">Easy to Use</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Intuitive interface designed for small business owners
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 mb-20 text-center max-w-4xl mx-auto">
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
                Join the digital commerce revolution and start competing with larger platforms today
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8"
                onClick={() => router.push('/auth/register')}
              >
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
