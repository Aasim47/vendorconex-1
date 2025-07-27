// Example: codeZone/venderconex/frontend/src/pages/ProductDetailsPage.jsx (Conceptual)

import React, { useState, useEffect } from 'react';
// import './ProductDetailsPage.css'; // Link to your CSS for this page

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
    const productId = '123'; // Replace with actual ID from URL (e.g., useParams() from react-router-dom)

    useEffect(() => {
        // Simulate fetching product data based on productId
        // In a real app, this would be an API call
        const fetchProduct = () => {
            // Dummy Product Data with Rating
            const dummyProduct = {
                id: productId,
                name: 'Eco-Friendly Biodegradable Packaging',
                description: 'High-quality, durable, and compostable packaging solutions for various industries. Certified organic and sustainably sourced materials.',
                price: 0.75, // per unit
                category: 'Packaging',
                imageUrl: 'https://via.placeholder.com/400x300?text=Eco+Packaging',
                rating: 4.8, // NEW: Product rating
                numReviews: 245 // NEW: Number of reviews
            };
            setProduct(dummyProduct);
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading product details...</div>;
    }

    // Function to render stars (simple example)
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} style={{ color: '#FFD700' }}>&#9733;</span>); // Full star
        }
        if (halfStar) {
            stars.push(<span key="half" style={{ color: '#FFD700' }}>&#9734;&#xFE0E;</span>); // Half star placeholder, often uses specific icon font
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} style={{ color: '#ccc' }}>&#9733;</span>); // Empty star
        }
        return stars;
    };

    return (
        <div className="product-details-container" style={{
            maxWidth: '800px', margin: '40px auto', padding: '30px',
            backgroundColor: 'var(--secondary-background-color)',
            borderRadius: '10px', boxShadow: 'var(--box-shadow)',
            color: 'var(--text-color)'
        }}>
            <h1 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '20px' }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', maxWidth: '350px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <p style={{ fontSize: '1.1em', color: 'var(--text-color-light)', marginBottom: '15px' }}>{product.description}</p>
                    <p style={{ fontSize: '1.4em', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '10px' }}>Price: ${product.price.toFixed(2)}</p>
                    <p style={{ fontSize: '1em', color: 'var(--text-color-light)', marginBottom: '20px' }}>Category: {product.category}</p>

                    {/* NEW: Product Rating Section */}
                    {product.rating && (
                        <div className="product-rating" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', fontSize: '1.1em' }}>
                            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Rating:</span>
                            <div className="stars" style={{ marginRight: '8px' }}>
                                {renderStars(product.rating)}
                            </div>
                            <span style={{ color: 'var(--text-color)' }}>{product.rating.toFixed(1)} / 5</span>
                            {product.numReviews && <span style={{ marginLeft: '10px', color: 'var(--text-color-light)' }}>({product.numReviews} Reviews)</span>}
                        </div>
                    )}
                    {/* End NEW: Product Rating Section */}

                    <button style={{
                        padding: '12px 25px', backgroundColor: 'var(--secondary-color)', color: 'white',
                        border: 'none', borderRadius: '5px', fontSize: '1.1em', cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;