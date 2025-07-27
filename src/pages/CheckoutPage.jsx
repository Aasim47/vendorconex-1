// codeZone/venderconex/frontend/src/pages/CheckoutPage.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';
import { useOrder } from '../context/OrderContext'; // NEW: Import useOrder hook

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addOrder } = useOrder(); // NEW: Get addOrder function from context

    const { product, quantity } = location.state || {};

    if (!product) {
        return (
            <div className="checkout-container no-product">
                <h1>No product selected for checkout.</h1>
                <p>Please go back to the search page to select an item.</p>
                <button className="back-to-search-btn" onClick={() => navigate('/')}>
                    Go to Search Page
                </button>
            </div>
        );
    }

    const numericPrice = parseFloat(product.price.replace('₹', '').replace('/kg', '').replace('/pack', '').replace('/box', '').replace('/jar', '').replace('/loaf', '').replace('/dozen', '').replace('/each', '').replace('/liter', '').replace('/roll', '').replace('/bag', ''));
    const itemSubtotal = (numericPrice * quantity).toFixed(2);
    const deliveryFee = 50.00; // Example static delivery fee
    const grandTotal = (parseFloat(itemSubtotal) + deliveryFee).toFixed(2);

    const handlePlaceOrder = () => {
        // Add the order to the global state
        addOrder(product, quantity, grandTotal);

        alert(`Order for ${product.name} (${quantity}) placed successfully! Total: ₹${grandTotal}`);
        navigate('/orders'); // Navigate to the Orders page after placing order
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-header">Checkout Summary</h1>

            <div className="checkout-details-section">
                <div className="checkout-item-card">
                    <img src={product.image} alt={product.name} className="checkout-item-image" />
                    <div className="checkout-item-info">
                        <h2 className="checkout-item-name">{product.name}</h2>
                        <p className="checkout-item-price">Price: {product.price}</p>
                        <p className="checkout-item-quantity">Quantity: {quantity}</p>
                        <p className="checkout-item-subtotal">Subtotal: ₹{itemSubtotal}</p>
                    </div>
                </div>

                <div className="checkout-summary-box">
                    <h3>Order Summary</h3>
                    <p><span>Item Total:</span> <span>₹{itemSubtotal}</span></p>
                    <p><span>Delivery Fee:</span> <span>₹{deliveryFee.toFixed(2)}</span></p>
                    <p className="checkout-total"><span>Grand Total:</span> <span>₹{grandTotal}</span></p>
                </div>

                <div className="payment-options-section">
                    <h3>Payment Method</h3>
                    <div className="payment-method">
                        <input type="radio" id="cash" name="payment" value="cash" defaultChecked />
                        <label htmlFor="cash">Cash on Delivery</label>
                    </div>
                    <div className="payment-method">
                        <input type="radio" id="upi" name="payment" value="upi" disabled />
                        <label htmlFor="upi">UPI (Coming Soon)</label>
                    </div>
                </div>
            </div>

            <div className="checkout-actions">
                <button className="proceed-to-payment-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    Back to Product
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;