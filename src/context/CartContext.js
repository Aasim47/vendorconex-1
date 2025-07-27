// frontend/src/context/CartContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/api';
import { AuthContext } from './AuthContext'; // Import AuthContext

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null); // Will store the cart object from the backend
    const [loadingCart, setLoadingCart] = useState(true);
    const [cartError, setCartError] = useState(null);
    const { loggedInUser } = useContext(AuthContext); // Get loggedInUser from AuthContext

    // Function to fetch the cart from the backend
    const fetchCart = async () => {
        if (!loggedInUser) {
            setCart(null); // Clear cart if not logged in
            setLoadingCart(false);
            return;
        }
        setLoadingCart(true);
        setCartError(null);
        try {
            const response = await cartService.getCart();
            setCart(response); // The backend returns the cart object directly
        } catch (err) {
            console.error('Failed to fetch cart:', err);
            setCartError(err.response?.data?.message || 'Failed to load cart.');
            setCart(null);
        } finally {
            setLoadingCart(false);
        }
    };

    // Effect to fetch cart when user logs in or out
    useEffect(() => {
        fetchCart();
    }, [loggedInUser]); // Re-fetch cart when loggedInUser changes

    // Functions to interact with the cart via API
    const addItemToCart = async (productId, quantity = 1) => {
        if (!loggedInUser) {
            setCartError('Please log in to add items to cart.');
            alert('Please log in to add items to cart.'); // User feedback
            return false;
        }
        try {
            const response = await cartService.addToCart(productId, quantity);
            setCart(response.cart); // Backend returns updated cart in 'cart' field
            alert('Product added to cart!'); // Success feedback
            return true;
        } catch (err) {
            setCartError(err.response?.data?.message || 'Failed to add item to cart.');
            alert('Failed to add item to cart: ' + (err.response?.data?.message || err.message)); // User feedback
            console.error('Add to cart error:', err);
            return false;
        }
    };

    const updateItemQuantity = async (productId, quantity) => {
        if (!loggedInUser) {
            setCartError('Please log in to modify cart.');
            alert('Please log in to modify cart.');
            return false;
        }
        try {
            const response = await cartService.updateCartItemQuantity(productId, quantity);
            setCart(response.cart);
            alert('Cart updated!');
            return true;
        } catch (err) {
            setCartError(err.response?.data?.message || 'Failed to update item quantity.');
            alert('Failed to update item quantity: ' + (err.response?.data?.message || err.message));
            console.error('Update cart quantity error:', err);
            return false;
        }
    };

    const removeItemFromCart = async (productId) => {
        if (!loggedInUser) {
            setCartError('Please log in to remove items from cart.');
            alert('Please log in to remove items from cart.');
            return false;
        }
        try {
            const response = await cartService.removeCartItem(productId);
            setCart(response.cart);
            alert('Item removed from cart!');
            return true;
        } catch (err) {
            setCartError(err.response?.data?.message || 'Failed to remove item from cart.');
            alert('Failed to remove item from cart: ' + (err.response?.data?.message || err.message));
            console.error('Remove from cart error:', err);
            return false;
        }
    };

    const checkout = async () => {
        if (!loggedInUser) {
            setCartError('Please log in to checkout.');
            alert('Please log in to checkout.');
            return false;
        }
        if (!cart || !cart.items || cart.items.length === 0) {
            setCartError('Your cart is empty. Cannot checkout.');
            alert('Your cart is empty. Cannot checkout.');
            return false;
        }
        try {
            const response = await cartService.checkoutCart();
            setCart({ user: loggedInUser.userId, items: [] }); // Clear local cart state on successful checkout
            alert(`Order placed successfully! Order ID: ${response.order._id}`);
            return response; // Return order details
        } catch (err) {
            setCartError(err.response?.data?.message || 'Checkout failed.');
            alert('Checkout failed: ' + (err.response?.data?.message || err.message));
            console.error('Checkout error:', err);
            return false;
        }
    };

    // Calculate total items and total amount for convenience
    const totalItemsInCart = cart && cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const totalCartAmount = cart && cart.items ? cart.items.reduce((sum, item) => sum + (item.product?.price * item.quantity || 0), 0) : 0;

    const value = {
        cart,
        loadingCart,
        cartError,
        fetchCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        checkout,
        totalItemsInCart,
        totalCartAmount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};