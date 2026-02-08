import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { calculateDiscountPrice } from '@/lib/utils';

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => { subtotal: number; discount: number; total: number };
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const items = get().items;
                const existingItem = items.find(i => i.productId === item.productId);

                if (existingItem) {
                    // Update quantity if item already exists
                    set({
                        items: items.map(i =>
                            i.productId === item.productId
                                ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                                : i
                        ),
                    });
                } else {
                    // Add new item
                    set({
                        items: [...items, { ...item, quantity: 1 }],
                    });
                }
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter(i => i.productId !== productId),
                });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set({
                    items: get().items.map(i =>
                        i.productId === productId
                            ? { ...i, quantity: Math.min(quantity, i.stock) }
                            : i
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            getCartTotal: () => {
                const items = get().items;
                const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const discount = items.reduce((sum, item) => {
                    const itemTotal = item.price * item.quantity;
                    const itemDiscount = (itemTotal * item.discount) / 100;
                    return sum + itemDiscount;
                }, 0);
                const total = subtotal - discount;

                return { subtotal, discount, total };
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
