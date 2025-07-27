// codeZone/venderconex/frontend/src/pages/OrdersPage.jsx

import React from 'react';
import { useOrder } from '../context/OrderContext'; // Import useOrder hook
import { useNavigate } from 'react-router-dom';
import '../styles/OrdersPage.css'; // Create this CSS file next

const OrdersPage = () => {
    const { orders } = useOrder(); // Get orders from context
    const navigate = useNavigate();

    return (
        <div className="orders-container">
            <h1 className="orders-header">Your Placed Orders</h1>

            {orders.length === 0 ? (
                <div className="no-orders-message">
                    <p>You haven't placed any orders yet.</p>
                    <button className="go-to-search-btn" onClick={() => navigate('/')}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="orders-grid">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header-info">
                                <span className="order-id">Order ID: #{order.id}</span>
                                <span className="order-date">{order.orderDate}</span>
                            </div>
                            <div className="order-item-details">
                                <img src={order.product.image} alt={order.product.name} className="order-item-image" />
                                <div className="order-item-info">
                                    <h3 className="order-item-name">{order.product.name}</h3>
                                    <p className="order-item-supplier">Supplier: {order.product.supplier}</p>
                                    <p className="order-item-price">Price: {order.product.price}</p>
                                    <p className="order-item-quantity">Quantity: {order.quantity}</p>
                                    <p className="order-total">Total: ₹{order.totalPrice}</p>
                                </div>
                            </div>
                            <div className="order-status">
                                <span className="status-label">Status:</span>
                                <span className="status-value pending">Pending</span> {/* Example static status */}
                            </div>
                            {/* You could add more actions here like "View Details", "Track Order" */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;