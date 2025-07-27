// codeZone/venderconex/frontend/src/context/OrderContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the Context
const OrderContext = createContext();

// Create a custom hook to use the Order Context easily
export const useOrder = () => {
    return useContext(OrderContext);
};

// Create the Provider component
export const OrderProvider = ({ children }) => {
    // State to hold all orders
    const [orders, setOrders] = useState([]);

    // Function to add a new order
    const addOrder = (product, quantity, totalPrice) => {
        const newOrder = {
            id: Date.now(), // Simple unique ID for the order
            product: product,
            quantity: quantity,
            totalPrice: totalPrice,
            orderDate: new Date().toLocaleString()
        };
        setOrders(prevOrders => [...prevOrders, newOrder]);
        console.log("Order added:", newOrder);
    };

    // The value provided to consumers of this context
    const value = {
        orders,
        addOrder, // <-- Ensure addOrder is explicitly included here
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};