// codeZone/venderconex/frontend/src/pages/IncomingOrdersPage.jsx

import React, { useState, useEffect } from 'react';
import '../styles/IncomingOrdersPage.css'; // Link to its specific CSS file

const IncomingOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching incoming orders for the supplier
        const fetchIncomingOrders = () => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
                const dummyOrders = [
                    {
                        id: 'order-101',
                        customerName: 'Global Corp',
                        productName: 'Organic Cotton Fabric (Bulk)',
                        quantity: 500,
                        unit: 'meters',
                        totalPrice: 625.00,
                        status: 'Pending',
                        orderDate: '2025-07-20',
                    },
                    {
                        id: 'order-102',
                        customerName: 'Eco-Builders Inc.',
                        productName: 'Industrial Grade Fasteners Assortment',
                        quantity: 10,
                        unit: 'boxes',
                        totalPrice: 2500.00,
                        status: 'Processing',
                        orderDate: '2025-07-18',
                    },
                    {
                        id: 'order-103',
                        customerName: 'Artisan Crafts LLC',
                        productName: 'Customizable Glass Bottles (1000 pcs)',
                        quantity: 5,
                        unit: 'units', // 5 units of 1000 pcs each
                        totalPrice: 4500.00,
                        status: 'Shipped',
                        orderDate: '2025-07-15',
                    },
                    {
                        id: 'order-104', // Keeping this one as an example of a potentially "delivered" order
                        customerName: 'Tech Solutions Co.',
                        productName: 'IT Support & Maintenance Contract',
                        quantity: 1,
                        unit: 'month',
                        totalPrice: 1200.00,
                        status: 'Delivered', 
                        orderDate: '2025-07-10',
                    },
                ];

                // Overlay statuses from localStorage if they were previously changed
                const ordersWithStoredStatus = dummyOrders.map(order => {
                    const storedStatus = localStorage.getItem(`orderStatus_${order.id}`);
                    return {
                        ...order,
                        status: storedStatus || order.status
                    };
                });

                setOrders(ordersWithStoredStatus);
                setLoading(false);
            }, 800); // Simulate network delay
        };

        fetchIncomingOrders();
    }, []);

    // Function to handle status update
    const handleUpdateStatus = (orderId, newStatus) => {
        // In a real app, this would be an API call to update the order status on the backend
        setLoading(true); // Show loading while updating
        setTimeout(() => {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            // Store the updated status in localStorage
            localStorage.setItem(`orderStatus_${orderId}`, newStatus);
            setLoading(false);
            alert(`Order ${orderId} status updated to: ${newStatus}`);
        }, 300); // Simulate API call delay
    };

    if (loading) {
        return <div className="orders-loading">Loading incoming orders...</div>;
    }

    if (error) {
        return <div className="orders-error">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="no-orders">
                <h2>No Incoming Orders</h2>
                <p>You currently have no new orders.</p>
            </div>
        );
    }

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="incoming-orders-container">
            <h2>Incoming Orders</h2>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-details">
                            <h3>Order ID: {order.id}</h3>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Product:</strong> {order.productName}</p>
                            <p><strong>Quantity:</strong> {order.quantity} {order.unit}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                            <p><strong>Order Date:</strong> {order.orderDate}</p>
                            <div className="order-status-section">
                                <strong>Status: </strong>
                                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                                <select 
                                    value={order.status} 
                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncomingOrdersPage;