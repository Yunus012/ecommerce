import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';
import { authService } from '@/services/mock/auth.service';

interface AuthStore extends AuthState {
    login: (email: string, password: string, role: string) => Promise<boolean>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email, password, role) => {
                try {
                    const response = await authService.login({
                        email,
                        password,
                        role: role as any,
                    });

                    if (response.success && response.data) {
                        set({
                            user: response.data.user,
                            token: response.data.token,
                            isAuthenticated: true,
                        });

                        // Store token in localStorage for API client
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('auth_token', response.data.token);
                        }

                        return true;
                    }

                    return false;
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });

                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
            },

            setUser: (user) => {
                set({ user });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
