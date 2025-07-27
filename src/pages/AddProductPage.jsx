// codeZone/venderconex/frontend/src/components/AddProductPage.jsx

import React from 'react';
import '../styles/AddProductPage.css'; // We'll create this CSS file too

const AddProductPage = () => {
    return (
        <div className="add-product-page-container">
            <h1 className="page-title">List a New Product for Sale</h1>
            <p className="page-description">
                Use the form below to add your products to the marketplace.
            </p>

            {/* Placeholder for the product form */}
            <div className="product-form-section">
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" placeholder="e.g., Organic Cotton T-Shirt" />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Description:</label>
                    <textarea id="productDescription" rows="5" placeholder="Detailed description of your product..."></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (per unit):</label>
                    <input type="number" id="price" step="0.01" placeholder="e.g., 25.99" />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity Available:</label>
                    <input type="number" id="quantity" placeholder="e.g., 500" />
                </div>
                <div className="form-group">
                    <label htmlFor="images">Product Images:</label>
                    <input type="file" id="images" multiple accept="image/*" />
                    <p className="file-hint">Upload up to 5 images (JPG, PNG, GIF)</p>
                </div>
                <button className="submit-product-button">Submit Product Listing</button>
            </div>

            {/* You can add more sections here like "My Current Listings" */}
            <div className="current-listings-preview">
                <h2>Your Current Product Listings (Coming Soon)</h2>
                <p>Manage your existing products and track sales performance here.</p>
                {/* Example: A table or list of products */}
            </div>
        </div>
    );
};

export default AddProductPage;