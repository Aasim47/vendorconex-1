// codeZone/vendorconex/frontend/src/components/QuantitySelectorModal.jsx

import React, { useState } from 'react';
import '../styles/QuantitySelectorModal.css'; // Will create this CSS next

const QuantitySelectorModal = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(isNaN(value) || value < 1 ? 1 : value);
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleSubmit = () => {
        onAddToCart(product, quantity);
    };

    if (!product) return null; // Should not happen if parent passes product correctly

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h2>Select Quantity</h2>
                <div className="modal-product-info">
                    <img src={product.image} alt={product.name} className="modal-product-image" />
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                </div>
                <div className="quantity-controls">
                    <button onClick={decrementQuantity}>-</button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="quantity-input"
                    />
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-add-to-cart" onClick={handleSubmit}>Add {quantity} to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default QuantitySelectorModal;