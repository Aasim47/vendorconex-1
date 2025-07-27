// frontend/src/components/ProductList.js

import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductDetail from './ProductDetail'; // Import ProductDetail

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchName, setSearchName] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null); // State to manage viewing product details

    const { addItemToCart } = useContext(CartContext);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const params = {};
            if (searchName) params.name = searchName;
            if (categoryFilter) params.category = categoryFilter;
            const data = await productService.getAll(params);
            setProducts(data);
        } catch (err) {
            setError('Failed to load products.');
            console.error('Fetch products error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); // Initial fetch on mount

    const handleAddToCart = async (productId, productName) => {
        await addItemToCart(productId, 1); // Quantity 1 by default
        // Feedback handled by CartContext
    };

    if (selectedProductId) {
        return <ProductDetail productId={selectedProductId} onBack={() => setSelectedProductId(null)} />;
    }

    if (loading) return <p className="text-center">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Product Catalog</h2>
            <p className="text-slate-600 mb-8">Explore products, add to your cart, or view details.</p>

            <div className="mb-6 flex space-x-4">
                <input type="text" placeholder="Search by name..." value={searchName} onChange={(e) => setSearchName(e.target.value)}
                       className="flex-1 p-2 border border-slate-300 rounded-md shadow-sm" />
                <input type="text" placeholder="Filter by category..." value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                       className="flex-1 p-2 border border-slate-300 rounded-md shadow-sm" />
                <button onClick={fetchProducts} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Apply Filters</button>
            </div>

            <div id="product-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="col-span-full text-center text-slate-500">No products found.</p>
                ) : (
                    products.map(product => (
                        <div key={product._id} className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                            <p className="text-sm text-slate-600">Category: {product.category}</p>
                            <p className="text-sm text-slate-600">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-sm text-slate-600">Rating: {product.rating ? product.rating.toFixed(1) : 'N/A'} ({product.numReviews || 0} reviews)</p>
                            <p className="text-sm mt-2 truncate">{product.description}</p>
                            <div className="flex justify-between items-center mt-3">
                                <button onClick={() => setSelectedProductId(product._id)}
                                        className="bg-slate-200 text-slate-800 py-1 px-3 rounded-md text-sm hover:bg-slate-300 transition-colors">
                                    View Details
                                </button>
                                <button onClick={() => handleAddToCart(product._id, product.name)}
                                        className="bg-green-500 text-white py-1 px-3 rounded-md text-sm hover:bg-green-600 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductList;