'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            role: 'store_owner',
        },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            const success = await login(data.email, data.password, data.role);

            if (success) {
                // Redirect based on role
                if (data.role === 'store_owner' || data.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/delivery');
                }
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">
                        Commerce Platform
                    </h1>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Select Role
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['admin', 'store_owner', 'delivery_partner'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setValue('role', role as any)}
                                        className={cn(
                                            'py-2 px-3 rounded-lg text-sm font-medium transition-all',
                                            selectedRole === role
                                                ? 'bg-primary-500/30 text-primary-300 border border-primary-500/50'
                                                : 'glass-hover text-gray-400'
                                        )}
                                    >
                                        {role === 'admin' && 'Admin'}
                                        {role === 'store_owner' && 'Store'}
                                        {role === 'delivery_partner' && 'Delivery'}
                                    </button>
                                ))}
                            </div>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            icon={<Mail className="w-5 h-5" />}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-5 h-5" />}
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            href="/auth/register"
                            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                        >
                            Create one
                        </Link>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <p className="text-xs text-cyan-300 font-medium mb-2">Demo Credentials:</p>
                        <p className="text-xs text-gray-400">Email: store@example.com</p>
                        <p className="text-xs text-gray-400">Password: any password (6+ chars)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility function (same as utils)
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
