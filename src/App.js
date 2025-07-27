// frontend/src/App.js

import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import all necessary components
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatbotWidget from './components/ChatbotWidget'; // Used globally for an overlay/fixed element

import AddProductForm from './components/AddProductForm';
import MyListingsPage from './pages/MyListingsPage';
import IncomingOrdersPage from './pages/IncomingOrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetail from './components/ProductDetail'; // Ensure this component exists if you use this route

// Import Contexts and Providers
// Ensure these context files (AuthContext.js, CartContext.js, OrderContext.js)
// are correctly defined in your frontend/src/context directory.
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider, CartContext } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import './App.css'; // Your global app styles (for dark mode, etc.)

// AppContent component contains the main application logic and UI structure
function AppContent() {
    const { loggedInUser, logout } = useContext(AuthContext);
    const { totalItemsInCart } = useContext(CartContext);
    const location = useLocation(); // To get current path for potential sidebar highlighting

    // Dark mode toggle state and function
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // Toggle 'dark-mode' class on the body or a root container element
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    // Optional: State to manage active sidebar link highlighting based on route
    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
        // This effect can be used to set an 'active' state for sidebar links
        // based on the current URL path.
        const path = location.pathname;
        if (path === '/' || path.includes('/search')) setActiveSection('products');
        else if (path.includes('/checkout')) setActiveSection('checkout');
        else if (path.includes('/login')) setActiveSection('login');
        else if (path.includes('/dashboard')) setActiveSection('dashboard');
        else if (path.includes('/orders')) setActiveSection('orders');
        else if (path.includes('/signup')) setActiveSection('signup');
        else if (path.includes('/add-product')) setActiveSection('addProduct');
        else if (path.includes('/my-listings')) setActiveSection('myListings');
        else if (path.includes('/incoming-orders')) setActiveSection('incomingOrders');
        // Add more mappings as needed for your specific sidebar navigation
    }, [location.pathname]);


    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}> {/* Apply dark/light class */}
            {/* Navbar component receives dark mode props and user/cart info */}
            <Navbar
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                loggedInUser={loggedInUser}
                logout={logout}
                totalItemsInCart={totalItemsInCart}
                activeSection={activeSection} // Pass active section for highlighting
            />

            {/* Main content area */}
            <main className="flex-grow"> {/* Adjust styling as per your layout needs */}
                {/* Wrap routes with OrderProvider to make order context available */}
                <OrderProvider>
                    <Routes>
                        {/* Public Routes & General User Routes */}
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/product/:productId" element={<ProductDetail />} /> {/* Example for product detail */}

                        {/* Authentication Routes */}
                        <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
                        <Route path="/signup" element={<SignupPage isDarkMode={isDarkMode} />} />
                        <Route path="/forgot-password" element={
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2>Forgot Password?</h2>
                                <p>This is where your forgot password form would go.</p>
                                <p>For now, you can go back to the <Link to="/login">Login page</Link>.</p>
                            </div>
                        } />

                        {/* User-Specific Features */}
                        <Route path="/dashboard" element={
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2>Welcome to your Dashboard Page!</h2>
                                <p>This page serves as your profile/dashboard. (Accessible in both modes)</p>
                            </div>
                        } />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/orders" element={<OrdersPage />} />

                        {/* Supplier-Specific Routes (Assuming protected routes in a real app) */}
                        <Route path="/add-product" element={<AddProductForm />} />
                        <Route path="/my-listings" element={<MyListingsPage />} />
                        <Route path="/incoming-orders" element={<IncomingOrdersPage />} />

                        {/* Add other routes here as needed */}
                    </Routes>
                </OrderProvider> {/* END OF ORDERPROVIDER WRAPPER */}
            </main>

            {/* Chatbot Widget - Rendered globally, typically as an overlay */}
            <ChatbotWidget />
        </div>
    );
}

// The root App component wraps AppContent with the Router and main Context Providers
function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <AppContent />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;