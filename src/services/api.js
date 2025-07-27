// frontend/src/services/api.js

import axios from 'axios';

// IMPORTANT: Set the API_BASE_URL to the actual IP address of your backend server.
// If you are using Create React App and have a .env file, you can set REACT_APP_BACKEND_URL there.
// For example, in frontend/.env: REACT_APP_BACKEND_URL=http://192.168.241.198:5000/api
// If not using .env or for quick testing, hardcode it directly here.
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://192.168.241.198:5000/api'; // <--- UPDATED THIS LINE

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add JWT token to Authorization header for protected routes
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request. Clearing user session.');
            localStorage.removeItem('user');
            // Optionally, trigger a global logout or redirect to login page
            // window.location.href = '/login'; // If using react-router-dom, use navigate('/login')
        }
        return Promise.reject(error);
    }
);

// --- Exported API Services ---

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    signup: (name, email, password, location) => api.post('/auth/signup', { name, email, password, location }),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (profileData) => api.put('/users/profile', profileData),
};

export const productService = {
    getAll: (params) => api.get('/products', { params }), // params automatically added to query string
    getById: (id) => api.get(`/products/${id}`),
    create: (productData) => api.post('/products', productData),
    update: (id, productData) => api.put(`/products/${id}`, productData),
    remove: (id) => api.delete(`/products/${id}`),
    addReview: (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData),
};

export const orderService = {
    create: (orderData) => api.post('/orders', orderData),
    getById: (id) => api.get(`/orders/${id}`),
    getAllForUser: (userId) => api.get(`/users/${userId}/orders`),
    getAll: () => api.get('/orders'), // Admin/Vendor
    updateStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
};

export const chatService = {
    sendMessage: (message, chatHistory) => api.post('/chat', { message, chatHistory }),
};

export const cartService = {
    getCart: () => api.get('/cart'),
    addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
    updateCartItemQuantity: (productId, quantity) => api.put(`/cart/item/${productId}`, { quantity }),
    removeCartItem: (productId) => api.delete(`/cart/item/${productId}`),
    checkoutCart: () => api.post('/cart/checkout'),
};