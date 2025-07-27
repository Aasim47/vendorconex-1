// codeZone/venderconex/frontend/src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Updated CSS import path

// --- SVG Icons (These remain unchanged) ---
const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);
const ProfilePicIcon = ({ src, alt }) => (
    <img src={src} alt={alt} className="profile-pic-icon" />
);
const PowerOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
        <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
);
const MyProfileIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const MyOrdersIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>);
const MyCartIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>);
const FaSun = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>);
const FaMoon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);

const allRecommendations = [
    "Suppliers", "Manufacturers", "Wholesale Distributors", "Bulk Orders",
    "Business Services", "Logistics Solutions", "Shipping Services", "Custom Packaging",
    "Industrial Equipment", "Office Supplies", "Commercial Kitchen Equipment",
    "IT Services", "Cloud Computing", "Cybersecurity Solutions", "CRM Software",
    "Digital Marketing", "SEO Services", "Web Development", "App Development",
    "Accounting Services", "Legal Consulting", "HR Solutions", "Payment Gateways",
    "Raw Materials", "Agricultural Products", "Construction Materials", "Textile Manufacturers",
    "Event Management Services", "Facility Management", "Security Services",
    "Cleaning Supplies", "MRO (Maintenance, Repair, Operations)", "Healthcare Supplies",
    "Retail Solutions", "E-commerce Platforms", "Franchise Opportunities"
];

// PROPS: isVendorMode and toggleMode are now received from App.js
const Navbar = ({ isLoggedIn, onLogout, isDarkMode, toggleDarkMode, hasNewNotification, onNotificationClick, isVendorMode, toggleMode }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const profileRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const dummyProfilePic = "http://googleusercontent.com/file_content/0";
    const dummyUserName = "VendorConex User"; // Changed to VendorConex

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowRecommendations(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleProfileClick = () => {
        setIsProfileMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        setIsProfileMenuOpen(false);
        onLogout();
    };

    const fetchRecommendations = (query) => {
        if (!query.trim()) {
            setRecommendations([]);
            return;
        }
        setTimeout(() => {
            const filtered = allRecommendations.filter(rec =>
                rec.toLowerCase().includes(query.toLowerCase())
            );
            setRecommendations(filtered);
        }, 200);
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        if (value.length > 0) {
            fetchRecommendations(value);
            setShowRecommendations(true);
        } else {
            setShowRecommendations(false);
            setRecommendations([]);
        }
    };

    const handleSelectRecommendation = (rec) => {
        setSearchQuery(rec);
        setShowRecommendations(false);
        if (isVendorMode) {
            handleSearchSubmit(rec);
        }
    };

    const handleSearchSubmit = (queryToSearch = searchQuery) => {
        if (!queryToSearch.trim() && isVendorMode) {
            alert("Please enter a search query.");
            return;
        }
        alert(`Searching for: "${queryToSearch}"`);
        navigate(`/search?query=${encodeURIComponent(queryToSearch)}`);
        setShowRecommendations(false);
    };

    const handleAddProductsClick = () => {
        navigate('/add-product');
        setShowRecommendations(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (isVendorMode) {
                handleSearchSubmit();
            }
        }
    };

    return (
        <nav className={`navbar-container ${isDarkMode ? 'dark-mode' : ''}`}> {/* Apply dark mode class here */}
            {/* Left Group: Back Arrow (Conditional), Brand, Home Link, and Mode Toggle */}
            <div className="navbar-left-group">
                {location.pathname !== '/' && (
                    <button className="back-arrow-button" onClick={handleGoBack}>
                        <BackArrowIcon />
                    </button>
                )}
                <div className="navbar-brand">
                    <Link to="/">VendorConex</Link> {/* Changed from VendorConnect */}
                </div>

                {/* Home Button with Icon - ALWAYS VISIBLE */}
                <Link to="/" className="navbar-home-button">
                    <HomeIcon /> Home
                </Link>

                {/* Mode Toggle buttons (moved here, a little smaller) */}
                {isLoggedIn && ( // Only show mode toggle if logged in
                    <div className="navbar-mode-toggle">
                        <button
                            className={`toggle-button ${isVendorMode ? 'active' : ''}`}
                            onClick={toggleMode}
                        >
                            Vendor
                        </button>
                        <button
                            className={`toggle-button ${!isVendorMode ? 'active' : ''}`}
                            onClick={toggleMode}
                        >
                            Supplier
                        </button>
                    </div>
                )}
            </div>

            {/* Center Section: Search Box or Add Products Button (prominent and centered) */}
            <div className="navbar-center-section-rect" ref={searchRef}>
                {isVendorMode ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search for products, vendors..."
                            className="search-input-navbar rectangular-input"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onFocus={() => recommendations.length > 0 && setShowRecommendations(true)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSearchSubmit} className="search-button-inside-box rectangular-button">
                            <SearchIcon />
                        </button>
                    </>
                ) : ( // Supplier Mode: "Add Products" button
                    <button onClick={handleAddProductsClick} className="add-products-button rectangular-add-button">
                        Add Products
                    </button>
                )}
                {isVendorMode && showRecommendations && recommendations.length > 0 && (
                    <div className="search-recommendations-dropdown">
                        {recommendations.map((rec, index) => (
                            <div
                                key={index}
                                className="recommendation-item"
                                onClick={() => handleSelectRecommendation(rec)}
                            >
                                {rec}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Group */}
            <div className="navbar-right-group">
                {/* Dark Mode Toggle Button - always visible */}
                <button onClick={toggleDarkMode} className="dark-mode-toggle-button">
                    {isDarkMode ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
                </button>

                {isLoggedIn ? (
                    <>
                        {/* Notification Bell with green dot */}
                        <button className="navbar-icon-button notification-bell" onClick={onNotificationClick}>
                            <BellIcon />
                            {hasNewNotification && <span className="notification-dot"></span>}
                        </button>

                        {/* User Avatar with Dropdown */}
                        <div className="profile-avatar-container" onClick={handleProfileClick} ref={profileRef}>
                            <ProfilePicIcon src={dummyProfilePic} alt="User Avatar" />
                            {isProfileMenuOpen && (
                                <div className="profile-dropdown-menu">
                                    <div className="profile-dropdown-header">
                                        <ProfilePicIcon src={dummyProfilePic} alt="User Avatar" />
                                        <div className="profile-text-info">
                                            <span className="profile-name">{dummyUserName}</span>
                                        </div>
                                    </div>
                                    {isVendorMode ? (
                                        <>
                                            <Link to="/dashboard" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyProfileIcon /> My Dashboard
                                            </Link>
                                            <Link to="/orders" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyOrdersIcon /> My Orders
                                            </Link>
                                            <Link to="/my-cart" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyCartIcon /> My Cart
                                            </Link>
                                        </>
                                    ) : ( // Supplier Mode
                                        <>
                                            <Link to="/dashboard" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyProfileIcon /> My Dashboard
                                            </Link>
                                            <Link to="/my-listings" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyOrdersIcon /> My Listings
                                            </Link>
                                            <Link to="/incoming-orders" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <BellIcon /> Incoming Orders
                                            </Link>
                                            <Link to="/reports" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                                <MyProfileIcon /> Reports
                                            </Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="dropdown-item logout-button">
                                        <PowerOffIcon /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // Show Login/Signup buttons if not logged in
                    <div className="auth-buttons">
                        <Link to="/login" className="navbar-button">Login</Link>
                        <Link to="/signup" className="navbar-button">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;