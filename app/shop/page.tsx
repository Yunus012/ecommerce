'use client';

import React, { useEffect, useState } from 'react';
import { productService } from '@/services/mock/product.service';
import { useCartStore } from '@/store/cart.store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';
import { ShoppingCart, Search, Filter, Home } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const { items: cartItems, addItem } = useCartStore();

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, [search, selectedCategory]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await productService.getProducts(1, 24, {
                search: search || undefined,
                category: selectedCategory || undefined,
                inStock: true,
            });

            if (response.success && response.data) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        const response = await productService.getCategories();
        if (response.success && response.data) {
            setCategories(response.data);
        }
    };

    const handleAddToCart = (product: Product) => {
        addItem({
            productId: product.id,
            productName: product.name,
            productImage: product.images[0],
            price: product.price,
            discount: product.discount,
            stock: product.stock,
        });
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="container-glass">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-1">Product Catalog</h1>
                        <p className="text-gray-400">Browse our collection of quality products</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/">
                            <Button variant="ghost">
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </Button>
                        </Link>
                        <div className="relative">
                            <Button variant="secondary">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Cart
                            </Button>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="glass-card p-4 mb-6">
                    <div className="flex flex-wrap gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[250px]">
                            <Input
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap items-center">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === ''
                                        ? 'bg-primary-500/30 text-primary-300 border border-primary-500/50'
                                        : 'glass-hover text-gray-400'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-primary-500/30 text-primary-300 border border-primary-500/50'
                                            : 'glass-hover text-gray-400'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton h-80 rounded-2xl" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-gray-400 text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => {
                            const finalPrice = calculateDiscountPrice(product.price, product.discount);
                            const inCart = cartItems.some(item => item.productId === product.id);

                            return (
                                <Card key={product.id} hover className="flex flex-col">
                                    {/* Product Image Placeholder */}
                                    <div className="h-48 rounded-t-2xl bg-gradient-to-br from-primary-900/20 to-cyan-900/20 flex items-center justify-center">
                                        <div className="text-4xl">📦</div>
                                    </div>

                                    <CardHeader>
                                        <div className="flex justify-between items-start gap-2">
                                            <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                                            {product.discount > 0 && (
                                                <Badge variant="success" className="text-xs">
                                                    {product.discount}% OFF
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge variant="info" className="w-fit mt-2">
                                            {product.category}
                                        </Badge>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="mt-4">
                                            {product.discount > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-white">
                                                        {formatCurrency(finalPrice)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {formatCurrency(product.price)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-2xl font-bold text-white">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 text-sm text-gray-400">
                                            {product.stock > 0 ? (
                                                <span className="text-emerald-400">In Stock ({product.stock})</span>
                                            ) : (
                                                <span className="text-red-400">Out of Stock</span>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            variant={inCart ? "secondary" : "primary"}
                                            className="w-full"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {inCart ? 'Added' : 'Add to Cart'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Product Count */}
                {!loading && products.length > 0 && (
                    <div className="mt-8 text-center text-gray-400">
                        Showing {products.length} products
                    </div>
                )}
            </div>
        </div>
    );
}
