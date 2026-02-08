import { z } from 'zod';

// Authentication Schemas
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'store_owner', 'delivery_partner']),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    businessName: z.string().min(2, 'Business name must be at least 2 characters'),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// Product Schemas
export const productSchema = z.object({
    sku: z.string().min(3, 'SKU must be at least 3 characters'),
    name: z.string().min(2, 'Product name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price cannot be negative'),
    discount: z.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
    stock: z.number().min(0, 'Stock cannot be negative').int('Stock must be a whole number'),
    lowStockThreshold: z.number().min(0, 'Threshold cannot be negative').int('Threshold must be a whole number'),
});

// Order Schemas
export const updateOrderStatusSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled', 'refunded']),
    note: z.string().optional(),
});

export const cancelOrderSchema = z.object({
    reason: z.string().min(10, 'Cancellation reason must be at least 10 characters'),
});

// Checkout Schemas
export const checkoutSchema = z.object({
    customerName: z.string().min(2, 'Name must be at least 2 characters'),
    customerEmail: z.string().email('Invalid email address'),
    customerPhone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
    deliveryAddress: z.object({
        street: z.string().min(5, 'Street address must be at least 5 characters'),
        city: z.string().min(2, 'City must be at least 2 characters'),
        state: z.string().min(2, 'State must be at least 2 characters'),
        zipCode: z.string().regex(/^\d{6}$/, 'Invalid ZIP code (6 digits required)'),
        country: z.string().min(2, 'Country must be at least 2 characters'),
    }),
    paymentMethod: z.enum(['cash', 'card', 'upi', 'wallet']),
    couponCode: z.string().optional(),
});

// Delivery Schemas
export const assignDeliveryPartnerSchema = z.object({
    orderId: z.string(),
    partnerId: z.string(),
});

export const updateDeliveryStatusSchema = z.object({
    status: z.enum(['assigned', 'picked_up', 'in_transit', 'delivered', 'failed']),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }).optional(),
    failureReason: z.string().optional(),
});

// Export types from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type UpdateOrderStatusData = z.infer<typeof updateOrderStatusSchema>;
export type CancelOrderData = z.infer<typeof cancelOrderSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type AssignDeliveryPartnerData = z.infer<typeof assignDeliveryPartnerSchema>;
export type UpdateDeliveryStatusData = z.infer<typeof updateDeliveryStatusSchema>;
