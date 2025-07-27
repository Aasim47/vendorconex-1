// codeZone/venderconex/frontend/src/pages/MyListingsPage.jsx

import React, { useState, useEffect } from 'react';
import '../styles/MyListingsPage.css';

const MyListingsPage = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching supplier's product listings
        const fetchListings = () => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
                const dummyListings = [
                    {
                        id: 's-prod-1',
                        name: 'Organic Cotton Fabric (Bulk)',
                        category: 'Textiles',
                        price: 12.50, // per meter
                        imageUrl: 'https://via.placeholder.com/100x100?text=Organic+Fabric',
                        rating: 4.7,
                        numReviews: 89
                    },
                    {
                        id: 's-prod-2',
                        name: 'Industrial Grade Fasteners Assortment',
                        category: 'Hardware',
                        price: 250.00, // per box
                        imageUrl: 'https://via.placeholder.com/100x100?text=Fasteners',
                        rating: 4.2,
                        numReviews: 55
                    },
                    {
                        id: 's-prod-3',
                        name: 'Customizable Glass Bottles (1000 pcs)',
                        category: 'Containers',
                        price: 0.90, // per bottle
                        imageUrl: 'https://via.placeholder.com/100x100?text=Glass+Bottles',
                        rating: 3.9,
                        numReviews: 32
                    },
                    {
                        id: 's-prod-4',
                        name: 'IT Support & Maintenance Contract',
                        category: 'Services',
                        price: 1200.00, // per month
                        imageUrl: 'https://via.placeholder.com/100x100?text=IT+Support',
                        rating: 5.0,
                        numReviews: 15
                    },
                ];
                setListings(dummyListings);
                setLoading(false);
            }, 800); // Simulate network delay
        };

        fetchListings();
    }, []);

    // Function to render stars
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} style={{ color: '#FFD700' }}>&#9733;</span>);
        }
        if (halfStar) {
            stars.push(<span key="half" style={{ color: '#FFD700' }}>&#9734;&#xFE0E;</span>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} style={{ color: '#ccc' }}>&#9733;</span>);
        }
        return stars;
    };

    // Function to handle product deletion
    const handleDeleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product listing? This action cannot be undone.")) {
            setLoading(true); // Indicate loading state for deletion
            // Simulate API call for deletion
            setTimeout(() => {
                const updatedListings = listings.filter(product => product.id !== productId);
                setListings(updatedListings);
                setLoading(false);
                alert(`Product with ID: ${productId} has been deleted.`);
            }, 500); // Simulate network delay for deletion
        }
    };

    if (loading) {
        return <div className="listings-loading">Loading your product listings...</div>;
    }

    if (error) {
        return <div className="listings-error">Error: {error}</div>;
    }

    if (listings.length === 0) {
        return (
            <div className="no-listings">
                <h2>No Products Listed Yet</h2>
                <p>Start by adding your first product!</p>
                {/* You might add a link here to the /add-product page */}
            </div>
        );
    }

    return (
        <div className="my-listings-container">
            <h2>My Product Listings</h2>
            <div className="listings-grid">
                {listings.map(product => (
                    <div key={product.id} className="listing-card">
                        <img src={product.imageUrl} alt={product.name} className="listing-image" />
                        <div className="listing-info">
                            <h3>{product.name}</h3>
                            <p className="listing-category">{product.category}</p>
                            <p className="listing-price">${product.price.toFixed(2)}</p>
                            {/* Product Rating in My Listings */}
                            {product.rating && (
                                <div className="listing-rating">
                                    <div className="stars">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="rating-value">{product.rating.toFixed(1)}</span>
                                    {product.numReviews && <span className="review-count">({product.numReviews} Reviews)</span>}
                                </div>
                            )}
                            <div className="listing-actions">
                                <button className="edit-button">Edit</button>
                                {/* Delete Button */}
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListingsPage;