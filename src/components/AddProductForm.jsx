import React from 'react';
import '../styles/AddProductForm.css'; // Link to its specific CSS file

const AddProductForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would collect form data (e.g., using useState for each input)
        // and send it to your backend API here.
        alert('Add Product Form Submitted! (This is a placeholder action)');
        // You might want to clear the form or show a success message after submission
    };

    return (
        <div className="add-product-form-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" id="productName" placeholder="Enter product name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Description</label>
                    <textarea id="productDescription" placeholder="Provide a detailed description" rows="4"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <input type="number" id="productPrice" placeholder="e.g., 29.99" step="0.01" required />
                </div>
                <div className="form-group">
                    <label htmlFor="productCategory">Category</label>
                    <input type="text" id="productCategory" placeholder="e.g., Electronics, Apparel" />
                </div>
                <div className="form-group">
                    <label htmlFor="productImage">Product Image URL</label>
                    <input type="url" id="productImage" placeholder="https://example.com/image.jpg" />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;