import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage (if exists)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear auth and redirect to login
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('user');
                        window.location.href = '/auth/login';
                    }
                    break;
                case 403:
                    // Forbidden - redirect to unauthorized page
                    if (typeof window !== 'undefined') {
                        window.location.href = '/unauthorized';
                    }
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error occurred');
                    break;
                default:
                    console.error('API Error:', data.message || data.error);
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error - no response from server');
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                code: 'NETWORK_ERROR',
            });
        } else {
            // Something else happened
            console.error('Error:', error.message);
            return Promise.reject({
                message: error.message,
                code: 'UNKNOWN_ERROR',
            });
        }
    }
);

export default apiClient;
