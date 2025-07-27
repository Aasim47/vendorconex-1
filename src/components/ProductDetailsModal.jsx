// codeZone/venderconex/frontend/src/components/ProductDetailsModal.jsx
// MODIFIED: Added console.log for debugging render state.

import React from 'react';
import '../styles/ProductDetailsModal.css';

const ProductDetailsModal = ({ product, onClose, onAddToCartRequest, onBuyNow }) => {
    // Log to confirm when this modal component is actually being rendered
    // If you see this log BEFORE you click a product card, that's our problem!
    console.log("ProductDetailsModal IS RENDERING. Product:", product ? product.name : "NO PRODUCT (should only happen if SearchPage's selectedProductForDetails is unexpectedly null)");

    // If 'product' is null or undefined, the modal shouldn't render.
    // However, the conditional rendering in SearchPage.jsx (showProductDetailsModal && selectedProductForDetails && ...)
    // should ideally prevent this component from even being mounted if product is null.
    // This check acts as a safeguard.
    if (!product) {
        return null;
    }

    return (
        // The 'visible' class is applied here assuming that if this component renders,
        // it's intended to be visible. The conditional rendering in SearchPage controls
        // whether this component is even mounted/in the DOM.
        // The fact that the overlay was visible in your screenshot means
        // `showProductDetailsModal` was true, causing this component to render.
        <div className="product-details-overlay visible" onClick={onClose}>
            <div className="product-details-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-details-btn" onClick={onClose}>&times;</button>
                <div className="product-details-body">
                    <img src={product.image} alt={product.name} className="details-product-image" />
                    <div className="details-product-info">
                        <h2>{product.name}</h2>
                        <p className="details-price">{product.price}</p>
                        <p><strong>Supplier:</strong> {product.supplier}</p>
                        <p><strong>Distance:</strong> {product.distance}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Rating:</strong> {product.rating} / 5</p>
                        <p className="details-description">
                            Experience the freshness and quality of our {product.name.toLowerCase()},
                            directly from {product.supplier}. Perfect for your everyday needs.
                            Our commitment to quality ensures you get the best.
                        </p>
                        <div className="details-actions">
                            <button className="details-add-to-cart-btn" onClick={() => onAddToCartRequest(product)}>
                                Add to Cart
                            </button>
                            <button className="details-buy-now-btn" onClick={() => onBuyNow(product)}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;