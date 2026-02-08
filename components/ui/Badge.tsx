'use client';

import React from 'react';
import { cn, getStatusColor, formatStatus } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    status?: string; // Auto-determine variant from status
    className?: string;
}

export function Badge({ children, variant = 'default', status, className }: BadgeProps) {
    // Auto-determine variant from status if provided
    const badgeClass = status ? getStatusColor(status) : `badge-${variant}`;
    const displayText = status ? formatStatus(status) : children;

    return (
        <span className={cn(badgeClass, className)}>
            {displayText}
        </span>
    );
}
