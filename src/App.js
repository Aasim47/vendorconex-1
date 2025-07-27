// frontend/src/App.js

import React, { useState, useEffect, useContext } from 'react';
// Import Navigate for conditional redirection
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

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
// Add a placeholder for set-location if you plan to navigate there
import SetLocationPage from './pages/SetLocationPage'; // Assuming you'll create this or a similar page

// Import Contexts and Providers
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider, CartContext } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import './App.css'; // Your global app styles (for dark mode, etc.)

// AppContent component contains the main application logic and UI structure
function AppContent() {
    const { loggedInUser, logout } = useContext(AuthContext); // Get loggedInUser from AuthContext
    const { totalItemsInCart } = useContext(CartContext);
    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
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
    }, [location.pathname]);

    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            <Navbar
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                loggedInUser={loggedInUser}
                logout={logout}
                totalItemsInCart={totalItemsInCart}
                activeSection={activeSection}
            />

            <main className="flex-grow">
                <OrderProvider>
                    <Routes>
                        {/* Conditional Routing based on loggedInUser status
                            If loggedInUser exists (even dummy), direct to main app content.
                            Otherwise, show authentication pages.
                        */}
                        {loggedInUser ? (
                            // Routes accessible when a user is "logged in"
                            <>
                                <Route path="/" element={<SearchPage />} /> {/* Default landing */}
                                <Route path="/search" element={<SearchPage />} />
                                <Route path="/product/:productId" element={<ProductDetail />} />
                                <Route path="/dashboard" element={
                                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                        <h2>Welcome to your Dashboard Page!</h2>
                                        <p>This page serves as your profile/dashboard. (Accessible in both modes)</p>
                                    </div>
                                } />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/add-product" element={<AddProductForm />} />
                                <Route path="/my-listings" element={<MyListingsPage />} />
                                <Route path="/incoming-orders" element={<IncomingOrdersPage />} />
                                <Route path="/set-location" element={<SetLocationPage />} /> {/* Page after login */}

                                {/* Redirect any unmatched paths to search or dashboard for logged-in users */}
                                <Route path="*" element={<Navigate to="/search" replace />} />
                            </>
                        ) : (
                            // Routes accessible when no user is "logged in"
                            // (Though with auto-login AuthContext, these might only flash briefly)
                            <>
                                <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
                                <Route path="/signup" element={<SignupPage isDarkMode={isDarkMode} />} />
                                <Route path="/forgot-password" element={
                                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                        <h2>Forgot Password?</h2>
                                        <p>This is where your forgot password form would go.</p>
                                        <p>For now, you can go back to the <Link to="/login">Login page</Link>.</p>
                                    </div>
                                } />
                                {/* If not logged in, redirect to login page for any other path */}
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </>
                        )}
                    </Routes>
                </OrderProvider>
            </main>

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