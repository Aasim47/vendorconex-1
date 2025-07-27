// codeZone/venderconex/frontend/src/pages/MyOrdersPage.jsx

import React, { useState, useEffect } from 'react';
import '../styles/MyOrdersPage.css'; // Link to its specific CSS file

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyOrders = () => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
                const dummyOrders = [
                    {
                        id: 'order-101',
                        productName: 'Organic Cotton Fabric (Bulk)',
                        quantity: 500,
                        unit: 'meters',
                        totalPrice: 625.00,
                        orderDate: '2025-07-20',
                        sellerName: 'Green Textiles Co.',
                        sellerContact: 'green.textiles@example.com',
                        trackingNumber: 'TRK6789012345',
                        // Initial status - this will be overridden by localStorage if available
                        status: 'Pending', 
                        expectedDelivery: '2025-07-27',
                        shippingMethod: 'Standard Ground',
                        paymentMethod: 'Credit Card',
                    },
                    {
                        id: 'order-102',
                        productName: 'Industrial Grade Fasteners Assortment',
                        quantity: 10,
                        unit: 'boxes',
                        totalPrice: 2500.00,
                        orderDate: '2025-07-18',
                        sellerName: 'Robust Hardware Solutions',
                        sellerContact: 'support@robusthardware.com',
                        trackingNumber: 'TRK9876543210',
                        status: 'Processing',
                        expectedDelivery: '2025-07-25',
                        shippingMethod: 'Freight',
                        paymentMethod: 'Bank Transfer',
                    },
                    {
                        id: 'order-103',
                        productName: 'Customizable Glass Bottles (1000 pcs)',
                        quantity: 5,
                        unit: 'units',
                        totalPrice: 4500.00,
                        orderDate: '2025-07-15',
                        sellerName: 'Crystal Clear Containers',
                        sellerContact: 'info@crystalclear.net',
                        trackingNumber: 'TRK1122334455',
                        status: 'Shipped',
                        expectedDelivery: '2025-07-22',
                        shippingMethod: 'Express Air',
                        paymentMethod: 'Credit Card',
                    },
                ];

                // Check localStorage for updated statuses from the seller side
                const updatedOrders = dummyOrders.map(order => {
                    const storedStatus = localStorage.getItem(`orderStatus_${order.id}`);
                    return {
                        ...order,
                        status: storedStatus || order.status // Use stored status if available
                    };
                });

                setOrders(updatedOrders);
                setLoading(false);
            }, 800); // Simulate network delay
        };

        fetchMyOrders();

        // Optional: Add an event listener for custom events if you want real-time updates without page reload,
        // but for localStorage, a simple useEffect on mount/focus is usually enough for a demo.
        // window.addEventListener('storage', fetchMyOrders); // Listen for localStorage changes
        // return () => window.removeEventListener('storage', fetchMyOrders);

    }, []); // Empty dependency array means this runs once on mount

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    if (loading) {
        return <div className="orders-loading">Loading your orders...</div>;
    }

    if (error) {
        return <div className="orders-error">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="no-orders">
                <h2>No Orders Found</h2>
                <p>It looks like you haven't placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            <div className="orders-grid">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h3>Order ID: {order.id}</h3>
                            <span className={`status-badge ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="order-details-group">
                            <p><strong>Product:</strong> {order.productName}</p>
                            <p><strong>Quantity:</strong> {order.quantity} {order.unit}</p>
                            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                            <p><strong>Ordered On:</strong> {order.orderDate}</p>
                            <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
                            <p><strong>Shipping Method:</strong> {order.shippingMethod}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        </div>

                        <div className="order-tracking-section">
                            <h4>Tracking Information</h4>
                            <p><strong>Tracking No.:</strong> {order.trackingNumber}</p>
                            <a 
                                href={`https://www.faketracking.com?id=${order.trackingNumber}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="tracking-link"
                            >
                                Track Your Order
                            </a>
                        </div>

                        <div className="order-contact-section">
                            <h4>Need Assistance?</h4>
                            <p><strong>Contact Seller:</strong> {order.sellerName} ({order.sellerContact})</p>
                            <a href={`mailto:${order.sellerContact}`} className="contact-button seller-contact">
                                Email Seller
                            </a>
                            <p><strong>Customer Care:</strong></p>
                            <a href="mailto:support@venderconex.com" className="contact-button customer-care">
                                Email Customer Care
                            </a>
                            <a href="tel:+1234567890" className="contact-button customer-care">
                                Call Customer Care
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrdersPage;