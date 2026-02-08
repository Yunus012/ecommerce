import { mockDelay, generateOrderId, generateId } from '@/lib/utils';
import type { Order, ApiResponse, PaginatedResponse, OrderFilters, OrderStatus, DashboardAnalytics } from '@/types';

// Generate mock orders
const mockOrders: Order[] = Array.from({ length: 25 }, (_, idx) => {
    const statuses: OrderStatus[] = ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

    return {
        id: `order-${idx + 1}`,
        orderId: generateOrderId(),
        customerId: `cust-${idx + 1}`,
        customerName: `Customer ${idx + 1}`,
        customerEmail: `customer${idx + 1}@example.com`,
        customerPhone: `+91${9000000000 + idx}`,
        deliveryAddress: {
            street: `${idx + 1} Main Street`,
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            country: 'India',
        },
        items: [
            {
                productId: `prod-${idx % 10 + 1}`,
                productName: 'Sample Product',
                productImage: '/placeholder-product1.jpg',
                quantity: Math.floor(Math.random() * 3) + 1,
                price: Math.floor(Math.random() * 2000) + 100,
                discount: [0, 5, 10][Math.floor(Math.random() * 3)],
            },
        ],
        subtotal: Math.floor(Math.random() * 5000) + 500,
        discount: 0,
        tax: 0,
        deliveryFee: 50,
        total: Math.floor(Math.random() * 5000) + 550,
        status,
        timeline: [
            {
                status: 'pending',
                timestamp: createdAt,
                note: 'Order placed',
            },
            ...(status !== 'pending' && status !== 'cancelled' ? [{
                status: 'confirmed' as OrderStatus,
                timestamp: new Date(createdAt.getTime() + 10 * 60 * 1000),
                note: 'Order confirmed',
            }] : []),
        ],
        paymentMethod: ['cash', 'card', 'upi', 'wallet'][Math.floor(Math.random() * 4)] as any,
        paymentStatus: status === 'delivered' ? 'completed' : status === 'cancelled' ? 'refunded' : 'pending',
        createdAt,
        updatedAt: new Date(),
    };
});

export const orderService = {
    /**
     * Get paginated orders
     */
    async getOrders(
        page: number = 1,
        limit: number = 10,
        filters?: OrderFilters
    ): Promise<ApiResponse<PaginatedResponse<Order>>> {
        await mockDelay(300, 600);

        let filteredOrders = [...mockOrders];

        if (filters) {
            if (filters.status) {
                filteredOrders = filteredOrders.filter(o => o.status === filters.status);
            }
            if (filters.search) {
                filteredOrders = filteredOrders.filter(o =>
                    o.orderId.toLowerCase().includes(filters.search!.toLowerCase())
                );
            }
        }

        const total = filteredOrders.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const data = filteredOrders.slice(start, start + limit);

        return {
            success: true,
            data: { data, total, page, limit, totalPages },
        };
    },

    /**
     * Get single order
     */
    async getOrder(id: string): Promise<ApiResponse<Order>> {
        await mockDelay(200, 400);

        const order = mockOrders.find(o => o.id === id || o.orderId === id);

        if (!order) {
            return {
                success: false,
                error: 'Order not found',
            };
        }

        return {
            success: true,
            data: order,
        };
    },

    /**
     * Update order status
     */
    async updateOrderStatus(id: string, status: OrderStatus, note?: string): Promise<ApiResponse<Order>> {
        await mockDelay(300, 600);

        const order = mockOrders.find(o => o.id === id);

        if (!order) {
            return {
                success: false,
                error: 'Order not found',
            };
        }

        order.status = status;
        order.timeline.push({
            status,
            timestamp: new Date(),
            note,
        });
        order.updatedAt = new Date();

        return {
            success: true,
            data: order,
            message: 'Order status updated successfully',
        };
    },

    /**
     * Get dashboard analytics
     */
    async getDashboardAnalytics(): Promise<ApiResponse<DashboardAnalytics>> {
        await mockDelay(200, 400);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayOrders = mockOrders.filter(o => o.createdAt >= today);
        const dailySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
        const ordersCount = todayOrders.length;
        const pendingDeliveries = mockOrders.filter(o => o.status === 'out_for_delivery').length;

        return {
            success: true,
            data: {
                dailySales,
                ordersCount,
                pendingDeliveries,
                lowStockItems: 8, // Mock value
                salesTrend: Math.floor(Math.random() * 30) - 10,
                ordersTrend: Math.floor(Math.random() * 20) - 5,
            },
        };
    },
};
