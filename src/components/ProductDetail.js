// frontend/src/components/ProductDetail.js

import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function ProductDetail({ productId, onBack }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');

    const { loggedInUser } = useContext(AuthContext);
    const { addItemToCart } = useContext(CartContext);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await productService.getById(productId);
            setProduct(data);
        } catch (err) {
            setError('Failed to load product details.');
            console.error('Fetch product detail error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]); // Re-fetch if productId changes

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!loggedInUser) {
            alert('Please log in to submit a review.');
            return;
        }
        try {
            await productService.addReview(productId, { rating: reviewRating, comment: reviewComment });
            alert('Review submitted successfully!');
            setReviewRating(5);
            setReviewComment('');
            fetchProduct(); // Re-fetch product to show new review
        } catch (err) {
            alert('Failed to submit review: ' + (err.response?.data?.message || err.message));
            console.error('Review submit error:', err);
        }
    };

    const handleAddToCart = async () => {
        await addItemToCart(productId, 1); // Add 1 quantity
        // Feedback handled by CartContext
    };

    if (loading) return <p className="text-center">Loading product details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!product) return <p className="text-center">Product not found.</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">← Back to Products</button>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
            <p className="text-slate-600 mb-1">Category: {product.category}</p>
            <p className="text-slate-600 mb-1">Price: ${product.price.toFixed(2)}</p>
            <p className="text-slate-600 mb-4">Rating: {product.rating ? product.rating.toFixed(1) : 'N/A'} ({product.numReviews || 0} reviews)</p>
            <p className="text-slate-700">{product.description}</p>

            <button onClick={handleAddToCart}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                Add to Cart
            </button>

            <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                <div className="space-y-4 mb-6">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map(review => (
                            <div key={review._id} className="border border-slate-200 p-3 rounded-md">
                                <p className="font-semibold">{review.user?.name || 'Anonymous'} <span className="text-slate-500 text-sm">- {new Date(review.createdAt).toLocaleDateString()}</span></p>
                                <p className="text-sm">Rating: {review.rating} / 5</p>
                                <p className="text-slate-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">No reviews yet.</p>
                    )}
                </div>

                {loggedInUser ? (
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Add Your Review</h4>
                        <form onSubmit={handleReviewSubmit} className="space-y-3">
                            <div>
                                <label htmlFor="review-rating" className="block text-sm font-medium text-slate-700">Rating (1-5)</label>
                                <input type="number" id="review-rating" min="1" max="5" value={reviewRating} onChange={(e) => setReviewRating(parseInt(e.target.value))}
                                       className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700">Comment</label>
                                <textarea id="review-comment" rows="3" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                                          className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm" required></textarea>
                            </div>
                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Submit Review</button>
                        </form>
                    </div>
                ) : (
                    <p className="text-slate-500">Please log in to add a review.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;