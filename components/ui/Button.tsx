'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    className,
    disabled,
    children,
    ...props
}: ButtonProps) {
    const baseClasses = 'rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';

    const variantClasses = {
        primary: 'btn-glass-primary',
        secondary: 'btn-glass-secondary',
        ghost: 'px-4 py-2 text-white hover:bg-white/10 rounded-xl',
        danger: 'px-6 py-3 bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 backdrop-blur-sm',
    };

    const sizeClasses = {
        sm: 'text-sm px-4 py-2',
        md: 'text-base px-6 py-3',
        lg: 'text-lg px-8 py-4',
    };

    return (
        <button
            className={cn(
                baseClasses,
                variantClasses[variant],
                size !== 'md' && sizeClasses[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
