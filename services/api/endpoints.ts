// API endpoint definitions for the platform
export const API_ENDPOINTS = {
    // Authentication
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        forgotPassword: '/api/auth/forgot-password',
        resetPassword: '/api/auth/reset-password',
        me: '/api/auth/me',
    },

    // Products
    products: {
        list: '/api/products',
        detail: (id: string) => `/api/products/${id}`,
        create: '/api/products',
        update: (id: string) => `/api/products/${id}`,
        delete: (id: string) => `/api/products/${id}`,
        toggleAvailability: (id: string) => `/api/products/${id}/availability`,
        search: '/api/products/search',
    },

    // Orders
    orders: {
        list: '/api/orders',
        detail: (id: string) => `/api/orders/${id}`,
        create: '/api/orders',
        updateStatus: (id: string) => `/api/orders/${id}/status`,
        cancel: (id: string) => `/api/orders/${id}/cancel`,
        stats: '/api/orders/stats',
    },

    // Delivery
    delivery: {
        partners: '/api/delivery/partners',
        assign: '/api/delivery/assign',
        track: (id: string) => `/api/delivery/track/${id}`,
        updateStatus: (id: string) => `/api/delivery/${id}/status`,
    },

    // Analytics
    analytics: {
        dashboard: '/api/analytics/dashboard',
        sales: '/api/analytics/sales',
        orders: '/api/analytics/orders',
    },

    // Categories
    categories: {
        list: '/api/categories',
    },
};
