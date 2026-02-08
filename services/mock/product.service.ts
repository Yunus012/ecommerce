import { mockDelay, generateId, generateOrderId } from '@/lib/utils';
import type { Product, ApiResponse, PaginatedResponse, ProductFilters } from '@/types';

// Mock product database with 50 initial products
const categories = ['Electronics', 'Groceries', 'Fashion', 'Home & Kitchen', 'Books', 'Sports'];
const productNames = [
    'Wireless Headphones', 'Organic Rice 5kg', 'Cotton T-Shirt', 'Coffee Maker',
    'Fiction Novel', 'Yoga Mat', 'Smartphone Case', 'Olive Oil 1L',
    'Denim Jeans', 'Blender', 'Programming Guide', 'Running Shoes',
    'Laptop Stand', 'Organic Honey', 'Winter Jacket', 'Water Bottle',
    'Mystery Novel', 'Dumbbells Set', 'USB Cable', 'Green Tea',
    'Casual Shirt', 'Non-Stick Pan', 'Self-Help Book', 'Gym Bag',
    'Bluetooth Speaker', 'Wholegrain Bread', 'Summer Dress', 'Cookware Set',
    'Biography', 'Resistance Bands', 'Phone Charger', 'Tomato Sauce',
    'Formal Pants', 'Kitchen Knife Set', 'Cookbook', 'Exercise Ball',
    'Wireless Mouse', 'Pasta 500g', 'Hoodie', 'Dinner Plates',
    'Travel Book', 'Jump Rope', 'HDMI Cable', 'Olive Oil Spray',
    'Blazer', 'Spice Rack', 'Business Book', 'Protein Shaker',
];

const mockProducts: Product[] = productNames.map((name, idx) => ({
    id: `prod-${idx + 1}`,
    sku: `SKU-${1000 + idx}`,
    name,
    description: `High-quality ${name.toLowerCase()} with excellent features and durability. Perfect for daily use.`,
    category: categories[idx % categories.length],
    price: Math.floor(Math.random() * 5000) + 100,
    discount: [0, 5, 10, 15, 20][Math.floor(Math.random() * 5)],
    stock: Math.floor(Math.random() * 100) + 5,
    lowStockThreshold: 10,
    images: [`/placeholder-product${(idx % 5) + 1}.jpg`],
    isAvailable: Math.random() > 0.1,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
}));

export const productService = {
    /**
     * Get paginated products list
     */
    async getProducts(
        page: number = 1,
        limit: number = 12,
        filters?: ProductFilters
    ): Promise<ApiResponse<PaginatedResponse<Product>>> {
        await mockDelay(300, 600);

        let filteredProducts = [...mockProducts];

        // Apply filters
        if (filters) {
            if (filters.category) {
                filteredProducts = filteredProducts.filter(p => p.category === filters.category);
            }
            if (filters.search) {
                const search = filters.search.toLowerCase();
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.sku.toLowerCase().includes(search)
                );
            }
            if (filters.inStock !== undefined) {
                filteredProducts = filteredProducts.filter(p =>
                    filters.inStock ? p.stock > 0 : p.stock === 0
                );
            }
            if (filters.minPrice !== undefined) {
                filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
            }
            if (filters.maxPrice !== undefined) {
                filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
            }
        }

        // Pagination
        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filteredProducts.slice(start, end);

        return {
            success: true,
            data: {
                data,
                total,
                page,
                limit,
                totalPages,
            },
        };
    },

    /**
     * Get single product
     */
    async getProduct(id: string): Promise<ApiResponse<Product>> {
        await mockDelay(200, 400);

        const product = mockProducts.find(p => p.id === id);

        if (!product) {
            return {
                success: false,
                error: 'Product not found',
            };
        }

        return {
            success: true,
            data: product,
        };
    },

    /**
     * Create product
     */
    async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
        await mockDelay(400, 800);

        // Check SKU uniqueness
        const existingSKU = mockProducts.find(p => p.sku === data.sku);
        if (existingSKU) {
            return {
                success: false,
                error: 'SKU already exists',
            };
        }

        const newProduct: Product = {
            ...data,
            id: `prod-${generateId()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        mockProducts.unshift(newProduct);

        return {
            success: true,
            data: newProduct,
            message: 'Product created successfully',
        };
    },

    /**
     * Update product
     */
    async updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
        await mockDelay(400, 800);

        const index = mockProducts.findIndex(p => p.id === id);

        if (index === -1) {
            return {
                success: false,
                error: 'Product not found',
            };
        }

        // Check SKU uniqueness if SKU is being updated
        if (data.sku && data.sku !== mockProducts[index].sku) {
            const existingSKU = mockProducts.find(p => p.sku === data.sku);
            if (existingSKU) {
                return {
                    success: false,
                    error: 'SKU already exists',
                };
            }
        }

        mockProducts[index] = {
            ...mockProducts[index],
            ...data,
            updatedAt: new Date(),
        };

        return {
            success: true,
            data: mockProducts[index],
            message: 'Product updated successfully',
        };
    },

    /**
     * Delete product
     */
    async deleteProduct(id: string): Promise<ApiResponse<void>> {
        await mockDelay(300, 600);

        const index = mockProducts.findIndex(p => p.id === id);

        if (index === -1) {
            return {
                success: false,
                error: 'Product not found',
            };
        }

        mockProducts.splice(index, 1);

        return {
            success: true,
            message: 'Product deleted successfully',
        };
    },

    /**
     * Toggle product availability
     */
    async toggleAvailability(id: string): Promise<ApiResponse<Product>> {
        await mockDelay(200, 400);

        const index = mockProducts.findIndex(p => p.id === id);

        if (index === -1) {
            return {
                success: false,
                error: 'Product not found',
            };
        }

        mockProducts[index].isAvailable = !mockProducts[index].isAvailable;
        mockProducts[index].updatedAt = new Date();

        return {
            success: true,
            data: mockProducts[index],
            message: `Product ${mockProducts[index].isAvailable ? 'enabled' : 'disabled'}`,
        };
    },

    /**
     * Get categories
     */
    async getCategories(): Promise<ApiResponse<string[]>> {
        await mockDelay(100, 200);

        return {
            success: true,
            data: categories,
        };
    },

    /**
     * Get low stock products
     */
    async getLowStockProducts(): Promise<ApiResponse<Product[]>> {
        await mockDelay(200, 400);

        const lowStockProducts = mockProducts.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);

        return {
            success: true,
            data: lowStockProducts,
        };
    },
};
