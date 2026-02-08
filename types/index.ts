// User and Authentication Types
export type UserRole = 'admin' | 'store_owner' | 'delivery_partner';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    businessName?: string; // For store owners
    phoneNumber?: string;
    createdAt: Date;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
    role: UserRole;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    businessName: string;
    phoneNumber: string;
}

// Product Types
export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discount: number; // Percentage
    stock: number;
    lowStockThreshold: number;
    images: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductFormData {
    sku: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discount: number;
    stock: number;
    lowStockThreshold: number;
    images: File[];
}

//Order Types
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'packed'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface OrderTimeline {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
}

export interface Order {
    id: string;
    orderId: string; // Display ID like ORD-1234
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    items: OrderItem[];
    subtotal: number;
    discount: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    timeline: OrderTimeline[];
    paymentMethod: 'cash' | 'card' | 'upi' | 'wallet';
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    deliveryPartnerId?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Delivery Types
export type DeliveryStatus =
    | 'assigned'
    | 'picked_up'
    | 'in_transit'
    | 'delivered'
    | 'failed';

export interface DeliveryPartner {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    vehicleType: string;
    vehicleNumber: string;
    isAvailable: boolean;
    currentLocation?: {
        lat: number;
        lng: number;
    };
    rating: number;
    completedDeliveries: number;
}

export interface Delivery {
    id: string;
    orderId: string;
    partnerId: string;
    partnerName: string;
    status: DeliveryStatus;
    pickupAddress: string;
    deliveryAddress: string;
    estimatedDeliveryTime: Date;
    actualDeliveryTime?: Date;
    currentLocation?: {
        lat: number;
        lng: number;
    };
    timeline: {
        status: DeliveryStatus;
        timestamp: Date;
        location?: { lat: number; lng: number };
    }[];
    failureReason?: string;
}

// Cart Types
export interface CartItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    discount: number;
    quantity: number;
    stock: number;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
}

// Checkout Types
export interface CheckoutFormData {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: 'cash' | 'card' | 'upi' | 'wallet';
    couponCode?: string;
}

// Analytics Types
export interface DashboardAnalytics {
    dailySales: number;
    ordersCount: number;
    pendingDeliveries: number;
    lowStockItems: number;
    salesTrend: number; // Percentage change
    ordersTrend: number;
}

// Pagination Types
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ApiError {
    message: string;
    code: string;
    details?: any;
}

// Filter and Search Types
export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
}

export interface OrderFilters {
    status?: OrderStatus;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string; // For order ID search
}

// Form Validation Types
export interface FieldError {
    field: string;
    message: string;
}

export interface ValidationErrors {
    [key: string]: string;
}
