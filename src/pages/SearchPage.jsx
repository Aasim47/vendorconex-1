// codeZone/venderconex/frontend/src/pages/SearchPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ADDED THIS IMPORT
import '../styles/SearchPage.css';
import QuantitySelectorModal from '../components/QuantitySelectorModal';
import ProductDetailsModal from '../components/ProductDetailsModal';

// SVG Icons (unchanged)
const SearchIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);

// --- DUMMY PRODUCT DATABASE (Client-side "database" for hackathon MVP) ---
const allProducts = [
    { id: 1, name: "Organic Carrots", price: "₹150/kg", supplier: "Green Farms", distance: "1.2 mi", category: "Vegetables", rating: 4.5, image: "https://images.unsplash.com/photo-1596702758880-36b13e0c036c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Fresh Apples", price: "₹120/kg", supplier: "Orchard Fresh", distance: "2.5 mi", category: "Fruits", rating: 4.8, image: "https://images.unsplash.com/photo-1560037894-3a9d9e2b1b36?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Biodegradable Plates", price: "₹800/pack", supplier: "Eco Supplies", distance: "0.8 mi", category: "Disposables", rating: 4.2, image: "https://images.unsplash.com/photo-1596131450259-7b3c2e176b6d?auto=format&fit=fit&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Assorted Snacks", price: "₹500/box", supplier: "Quick Mart", distance: "1.5 mi", category: "FMCG", rating: 4.0, image: "https://images.unsplash.com/photo-1582283084654-be19bf1855a9?auto=format&fit=fit&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, name: "Local Honey", price: "₹450/jar", supplier: "Bee's Knees", distance: "3.0 mi", category: "FMCG", rating: 4.7, image: "https://images.unsplash.com/photo-1542826792-bf3d61100370?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, name: "Artisan Bread", price: "₹200/loaf", supplier: "The Daily Loaf", distance: "0.5 mi", category: "Bakery", rating: 4.9, image: "https://images.unsplash.com/photo-1595171783584-638062a4a753?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, name: "Organic Broccoli", price: "₹180/kg", supplier: "Green Farms", distance: "1.3 mi", category: "Vegetables", rating: 4.4, image: "https://images.unsplash.com/photo-1589927909068-12501a4e214d?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, name: "Bananas", price: "₹60/dozen", supplier: "Fresh Produce Co.", distance: "1.8 mi", category: "Fruits", rating: 4.6, image: "https://images.unsplash.com/photo-1574226500854-325b59664f33?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 9, name: "Compostable Cutlery", price: "₹600/pack", supplier: "Eco Supplies", distance: "0.9 mi", category: "Disposables", rating: 4.1, image: "https://images.unsplash.com/photo-1623999494391-7649d0388d1d?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 10, name: "Specialty Coffee Beans", price: "₹900/bag", supplier: "Bean Haven", distance: "2.1 mi", category: "FMCG", rating: 4.9, image: "https://images.unsplash.com/photo-1507119058774-6ed552d0a7a3?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 11, name: "Organic Tomatoes", price: "₹100/kg", supplier: "Green Farms", distance: "1.0 mi", category: "Vegetables", rating: 4.3, image: "https://images.unsplash.com/photo-1596702758880-36b13e0c036c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, name: "Mangoes", price: "₹250/kg", supplier: "Orchard Fresh", distance: "2.0 mi", category: "Fruits", rating: 4.9, image: "https://images.unsplash.com/photo-1560037894-3a9d9e2b1b36?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 13, name: "Reusable Water Bottles", price: "₹350/each", supplier: "Eco Supplies", distance: "0.7 mi", category: "Disposables", rating: 4.6, image: "https://images.unsplash.com/photo-1596131450259-7b3c2e176b6d?auto=format&fit=fit&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8Mjh9fHx8fA%3D%3D" },
    { id: 14, name: "Gourmet Chocolates", price: "₹800/box", supplier: "Sweet Indulgence", distance: "1.7 mi", category: "FMCG", rating: 4.8, image: "https://images.unsplash.com/photo-1582283084654-be19bf1855a9?auto=format&fit=fit&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, name: "Organic Milk", price: "₹80/liter", supplier: "Dairy Delights", distance: "2.8 mi", category: "Dairy", rating: 4.5, image: "https://images.unsplash.com/photo-1542826792-bf3d61100370?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 16, name: "Whole Wheat Pasta", price: "₹150/pack", supplier: "Grain Goods", distance: "0.6 mi", category: "Pantry", rating: 4.3, image: "https://images.unsplash.com/photo-1595171783584-638062a4a753?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 17, name: "Avocados", price: "₹200/each", supplier: "Fresh Produce Co.", distance: "1.9 mi", category: "Fruits", rating: 4.7, image: "https://images.unsplash.com/photo-1574226500854-325b59664f33?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 18, name: "Paper Towels (Recycled)", price: "₹300/roll", supplier: "Eco Supplies", distance: "1.0 mi", category: "Disposables", rating: 4.0, image: "https://images.unsplash.com/photo-1623999494391-7649d0388d1d?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 19, name: "Herbal Tea Bags", price: "₹250/box", supplier: "Tea Time", distance: "2.3 mi", category: "FMCG", rating: 4.5, image: "https://images.unsplash.com/photo-1507119058774-6ed552d0a7a3?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 20, name: "Fresh Salmon", price: "₹900/pack", supplier: "Ocean Catch", distance: "4.0 mi", category: "Seafood", rating: 4.9, image: "https://images.unsplash.com/photo-1542826792-bf3d61100370?auto=format&fit=fit&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];


const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    const [sortBy, setSortBy] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [productToAddToCart, setProductToAddToCart] = useState(null);

    const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
    const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);

    const navigate = useNavigate(); // INITIALIZE NAVIGATE

    const parsePrice = (priceString) => {
        return parseFloat(priceString.replace('₹', ''));
    };

    const parseDistance = (distanceString) => {
        return parseFloat(distanceString.replace(' mi', ''));
    };

    useEffect(() => {
        let currentProducts = [...allProducts];

        if (searchTerm) {
            currentProducts = currentProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            currentProducts = currentProducts.filter(product =>
                product.category === selectedCategory
            );
        }

        if (selectedSupplier) {
            currentProducts = currentProducts.filter(product =>
                product.supplier === selectedSupplier
            );
        }

        if (selectedRating) {
            currentProducts = currentProducts.filter(product =>
                product.rating >= parseFloat(selectedRating)
            );
        }

        if (sortBy) {
            currentProducts.sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return parsePrice(a.price) - parsePrice(b.price);
                    case 'price-desc':
                        return parsePrice(b.price) - parsePrice(a.price);
                    case 'delivery-asc':
                        return parseDistance(a.distance) - parseDistance(b.distance);
                    default:
                        return 0;
                }
            });
        }

        setFilteredProducts(currentProducts);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedSupplier, selectedLocation, selectedPriceRange, selectedRating, sortBy]);


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProductsOnPage = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleAddToCartClick = (product) => {
        setProductToAddToCart(product);
        setShowQuantityModal(true);
        handleCloseProductDetailsModal(); // Close details modal when quantity modal opens
    };

    const handleConfirmAddToCart = (product, quantity) => {
        console.log(`Adding ${quantity} of ${product.name} to cart.`);
        setShowQuantityModal(false);
        setProductToAddToCart(null);
        // Optionally, navigate to a cart page or show a success message
        // navigate('/cart'); // Example
    };

    const handleCloseQuantityModal = () => {
        setShowQuantityModal(false);
        setProductToAddToCart(null);
    };

    const handleProductCardClick = (product) => {
        console.log("SearchPage: Product card clicked for details:", product);
        setSelectedProductForDetails(product);
        setShowProductDetailsModal(true);
    };

    const handleCloseProductDetailsModal = () => {
        console.log("SearchPage: Closing product details modal.");
        setShowProductDetailsModal(false);
        setSelectedProductForDetails(null);
    };

    const handleBuyNow = (product) => {
        console.log("SearchPage: Buy now clicked for product:", product.name);
        handleCloseProductDetailsModal(); // Close the product details modal
        // Navigate to a checkout/purchase page, passing the product data
        navigate('/checkout', { state: { product, quantity: 1 } }); // Pass quantity as 1 for Buy Now
    };


    const categories = [...new Set(allProducts.map(p => p.category))];
    const suppliers = [...new Set(allProducts.map(p => p.supplier))];
    const ratings = [4.5, 4.0, 3.5, 3.0]; // Example ratings

    return (
        <div className="search-page-container">
            <div className="search-page-header">
                <h2>Find Fresh Supplies Near You</h2>
            </div>

            <div className="search-page-content">
                <aside className="filters-sidebar">
                    <h3>Filters</h3>
                    <div className="filter-group">
                        <label>Category</label>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                            <option value="">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Supplier</label>
                        <select onChange={(e) => setSelectedSupplier(e.target.value)} value={selectedSupplier}>
                            <option value="">All Suppliers</option>
                            {suppliers.map(sup => <option key={sup} value={sup}>{sup}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Location</label>
                        <select onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
                            <option value="">All Locations</option>
                            <option value="1">Within 1 mi</option>
                            <option value="5">Within 5 mi</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Price</label>
                        <select onChange={(e) => setSelectedPriceRange(e.target.value)} value={selectedPriceRange}>
                            <option value="">All Prices</option>
                            <option value="1-10">₹1 - ₹500</option>
                            <option value="10-20">₹500 - ₹1000</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Rating</label>
                        <select onChange={(e) => setSelectedRating(e.target.value)} value={selectedRating}>
                            <option value="">All Ratings</option>
                            {ratings.map(r => <option key={r} value={r}>{r}+ Stars</option>)}
                        </select>
                    </div>
                    <button className="apply-filters-btn" onClick={() => {/* Filter applied via state change, this can be a reset or just visual */}}>Apply Filters</button>
                </aside>

                <main className="search-results-main">
                    <div className="search-and-sort-area">
                        <div className="main-search-bar">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchIcon className="search-icon" />
                        </div>

                        <div className="filter-group sort-by-group">
                            <label>Sort By</label>
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value="">None</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="delivery-asc">Delivery Time: Low to High</option>
                            </select>
                        </div>
                    </div>

                    <div className="category-chips">
                        <span className={`chip ${!selectedCategory ? 'active' : ''}`} onClick={() => setSelectedCategory('')}>All</span>
                        {categories.map(cat => (
                            <span
                                key={cat}
                                className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    <h3>Popular Near You</h3>
                    <div className="product-grid">
                        {currentProductsOnPage.length > 0 ? (
                            currentProductsOnPage.map(product => (
                                <div
                                    key={product.id}
                                    className="product-card"
                                    onClick={() => handleProductCardClick(product)}
                                >
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-info">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-price">{product.price}</span>
                                        <span className="product-supplier">{product.supplier}</span>
                                        <span className="product-distance">{product.distance}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No products found matching your criteria.</p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="pagination-button"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="pagination-button"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {showQuantityModal && productToAddToCart && (
                <QuantitySelectorModal
                    product={productToAddToCart}
                    onClose={handleCloseQuantityModal}
                    onAddToCart={handleConfirmAddToCart}
                />
            )}

            {showProductDetailsModal && selectedProductForDetails && (
                <ProductDetailsModal
                    product={selectedProductForDetails}
                    onClose={handleCloseProductDetailsModal}
                    onAddToCartRequest={handleAddToCartClick}
                    onBuyNow={handleBuyNow} // This prop now calls the updated handleBuyNow
                />
            )}
        </div>
    );
};

export default SearchPage;