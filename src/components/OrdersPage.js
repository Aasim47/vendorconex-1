// frontend/src/components/OrdersPage.js

import React, { useState, useEffect, useContext } from 'react';
import { orderService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { loggedInUser } = useContext(AuthContext);

    const fetchOrders = async (allOrders = false) => {
        if (!loggedInUser) {
            setError('Please log in to view orders.');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError('');
        try {
            let data;
            if (allOrders && loggedInUser.userId) { // Assuming admin/vendor check would be done server-side
                data = await orderService.getAll(); // Fetch all orders (admin/vendor view)
            } else if (loggedInUser.userId) {
                data = await orderService.getAllForUser(loggedInUser.userId); // Fetch user's own orders
            } else {
                setError('User ID not available. Please log in.');
                setLoading(false);
                return;
            }
            setOrders(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load orders.');
            console.error('Fetch orders error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(false); // Fetch user's own orders by default on mount
    }, [loggedInUser]); // Re-fetch if user changes

    if (loading) return <p className="text-center">Loading orders...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (orders.length === 0) return <p className="text-center">No orders found.</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Order History</h2>
            <div className="mb-6 flex space-x-4">
                <button onClick={() => fetchOrders(false)} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">My Orders</button>
                <button onClick={() => fetchOrders(true)} className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">All Orders (Admin/Vendor)</button>
            </div>

            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order._id} className="border border-slate-200 p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">Order ID: {order._id}</h3>
                        <p className="text-sm text-slate-600">User: {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})</p>
                        <p className="text-sm text-slate-600">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-slate-600">Status: <span className={`font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>{order.status}</span></p>
                        <p className="text-sm text-slate-600">Ordered At: {new Date(order.orderedAt).toLocaleDateString()}</p>
                        <h4 className="text-md font-semibold mt-3 mb-2">Products:</h4>
                        <ul className="list-disc list-inside text-sm text-slate-700">
                            {order.products.map(item => (
                                <li key={item.product?._id || item._id}>
                                    {item.product?.name || 'Unknown Product'} (Qty: {item.quantity}) - $ {item.priceAtOrder?.toFixed(2) || 'N/A'} each
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;