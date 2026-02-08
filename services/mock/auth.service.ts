import { mockDelay, generateId } from '@/lib/utils';
import type {
    LoginCredentials,
    RegisterData,
    User,
    ApiResponse,
    AuthState,
} from '@/types';

// Mock users database
const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@commerce.com',
        name: 'Admin User',
        role: 'admin',
        phoneNumber: '+911234567890',
        createdAt: new Date('2024-01-01'),
    },
    {
        id: '2',
        email: 'store@example.com',
        name: 'John Store Owner',
        role: 'store_owner',
        businessName: 'Johns General Store',
        phoneNumber: '+911234567891',
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '3',
        email: 'delivery@example.com',
        name: 'Mike Delivery',
        role: 'delivery_partner',
        phoneNumber: '+911234567892',
        createdAt: new Date('2024-02-01'),
    },
];

export const authService = {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<ApiResponse<AuthState>> {
        await mockDelay(500, 1000);

        // Validate credentials
        const user = mockUsers.find(
            u => u.email === credentials.email && u.role === credentials.role
        );

        if (!user) {
            // Simulate invalid credentials
            if (Math.random() > 0.7) {
                return {
                    success: false,
                    error: 'Invalid email or password',
                };
            }
        }

        //    // Mock password validation (in real app, this would be hashed)
        // For demo: accept any password with length >= 6
        if (credentials.password.length < 6) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        // Generate mock token
        const token = `mock_token_${generateId()}`;

        // For new emails, create a new user
        const authenticatedUser = user || {
            id: generateId(),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: credentials.role,
            phoneNumber: '+911234567890',
            createdAt: new Date(),
        };

        return {
            success: true,
            data: {
                user: authenticatedUser,
                token,
                isAuthenticated: true,
            },
            message: 'Login successful',
        };
    },

    /**
     * Register new user
     */
    async register(data: RegisterData): Promise<ApiResponse<AuthState>> {
        await mockDelay(700, 1200);

        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === data.email);
        if (existingUser) {
            return {
                success: false,
                error: 'Email already registered',
            };
        }

        // Create new user
        const newUser: User = {
            id: generateId(),
            email: data.email,
            name: data.name,
            role: 'store_owner', // Default role for registration
            businessName: data.businessName,
            phoneNumber: data.phoneNumber,
            createdAt: new Date(),
        };

        // Add to mock database
        mockUsers.push(newUser);

        // Generate token
        const token = `mock_token_${generateId()}`;

        return {
            success: true,
            data: {
                user: newUser,
                token,
                isAuthenticated: true,
            },
            message: 'Registration successful',
        };
    },

    /**
     * Forgot password
     */
    async forgotPassword(email: string): Promise<ApiResponse<void>> {
        await mockDelay(500, 800);

        const user = mockUsers.find(u => u.email === email);

        // For security, always return success (don't reveal if email exists)
        return {
            success: true,
            message: 'If the email exists, a password reset link has been sent',
        };
    },

    /**
     * Logout
     */
    async logout(): Promise<ApiResponse<void>> {
        await mockDelay(200, 400);

        return {
            success: true,
            message: 'Logged out successfully',
        };
    },

    /**
     * Get current user
     */
    async getCurrentUser(token: string): Promise<ApiResponse<User>> {
        await mockDelay(100, 300);

        if (!token || !token.startsWith('mock_token_')) {
            return {
                success: false,
                error: 'Invalid token',
            };
        }

        // Return first user for demo (in real app, decode token)
        return {
            success: true,
            data: mockUsers[1], // Store owner
        };
    },
};
