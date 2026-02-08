'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { orderService } from '@/services/mock/order.service';
import { productService } from '@/services/mock/product.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, ShoppingBag, Truck, AlertTriangle, TrendingUp, TrendingDown, LogOut, Package } from 'lucide-react';
import type { DashboardAnalytics } from '@/types';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();
    const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        loadAnalytics();
    }, [isAuthenticated, router]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const response = await orderService.getDashboardAnalytics();
            if (response.success && response.data) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="min-h-screen p-8">
            <div className="container-glass">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-gray-400">{user.businessName || 'Dashboard Overview'}</p>
                    </div>
                    <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Analytics Cards */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="skeleton h-32 rounded-2xl" />
                        ))}
                    </div>
                ) : analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Daily Sales */}
                        <Card className="glow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-400">
                                        Daily Sales
                                    </CardTitle>
                                    <DollarSign className="w-5 h-5 text-primary-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white mb-1">
                                    {formatCurrency(analytics.dailySales)}
                                </div>
                                <div className="flex items-center text-sm">
                                    {analytics.salesTrend >= 0 ? (
                                        <>
                                            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                                            <span className="text-emerald-400">+{analytics.salesTrend}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                                            <span className="text-red-400">{analytics.salesTrend}%</span>
                                        </>
                                    )}
                                    <span className="text-gray-400 ml-1">vs yesterday</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Orders Count */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-400">
                                        Orders Today
                                    </CardTitle>
                                    <ShoppingBag className="w-5 h-5 text-cyan-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white mb-1">
                                    {analytics.ordersCount}
                                </div>
                                <div className="flex items-center text-sm">
                                    {analytics.ordersTrend >= 0 ? (
                                        <>
                                            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                                            <span className="text-emerald-400">+{analytics.ordersTrend}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                                            <span className="text-red-400">{analytics.ordersTrend}%</span>
                                        </>
                                    )}
                                    <span className="text-gray-400 ml-1">vs yesterday</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Deliveries */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-400">
                                        Out for Delivery
                                    </CardTitle>
                                    <Truck className="w-5 h-5 text-amber-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {analytics.pendingDeliveries}
                                </div>
                                <p className="text-sm text-gray-400">Active deliveries</p>
                            </CardContent>
                        </Card>

                        {/* Low Stock Items */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-400">
                                        Low Stock Alert
                                    </CardTitle>
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {analytics.lowStockItems}
                                </div>
                                <p className="text-sm text-gray-400">Items need restock</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button
                                variant="secondary"
                                className="flex-col h-24 gap-2"
                                onClick={() => router.push('/shop')}
                            >
                                <ShoppingBag className="w-6 h-6" />
                                <span>View Storefront</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-col h-24 gap-2"
                                onClick={() => alert('Inventory management coming soon!')}
                            >
                                <Package className="w-6 h-6" />
                                <span>Manage Inventory</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-col h-24 gap-2"
                                onClick={() => alert('Order management coming soon!')}
                            >
                                <Truck className="w-6 h-6" />
                                <span>View Orders</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Development Notice */}
                <div className="mt-8 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">🚀 Frontend Prototype</h3>
                    <p className="text-sm text-gray-400 mb-3">
                        This is a fully functional frontend prototype with mock data. All features are simulated and ready for backend integration.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                        <div>✅ Glassmorphism UI Design</div>
                        <div>✅ Mock Authentication Service</div>
                        <div>✅ 50+ Sample Products</div>
                        <div>✅ 25+ Sample Orders</div>
                        <div>✅ Cart with localStorage</div>
                        <div>✅ Form Validation (Zod)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
