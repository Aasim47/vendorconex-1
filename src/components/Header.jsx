// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import '../styles/Header.css';
// import '../styles/Auth.css'; // You might still need this for general button styles if used elsewhere

// Import icons for the header (make sure all these are in assets/icons)
import PencilIcon from '../assets/icons/PencilIcon';
// import LocationIcon from '../assets/icons/LocationIcon'; // No longer needed directly in Header.jsx
import SearchIcon from '../assets/icons/SearchIcon';
import BellIcon from '../assets/icons/BellIcon';

const Header = ({ currentUser = { name: "Sophia Carter", role: "Vendor" }, currentLocation }) => {
    const [activeRole, setActiveRole] = useState(currentUser.role);
    const navigate = useNavigate();

    const isLoggedIn = true; // Still assuming logged in for testing header visibility

    return (
        <header className="main-header">
            {/* Left Section: Logo and Main Navigation */}
            <div className="header-left">
                <Link to="/" className="header-logo">
                    <PencilIcon />
                    <span>VendorConex</span>
                </Link>
                <nav className="main-nav">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/faqs">FAQs</Link>
                </nav>
            </div>

            {/* The header-center section is now removed as its contents have moved */}

            {/* Right Section: Role Toggle, Icons, and Profile Dropdown */}
            <div className="header-right header-icons">
                {/* Moved Role Toggle here */}
                <div className="role-toggle">
                    <button
                        className={activeRole === 'Vendor' ? 'active' : ''}
                        onClick={() => setActiveRole('Vendor')}
                    >
                        Vendor
                    </button>
                    <button
                        className={activeRole === 'Supplier' ? 'active' : ''}
                        onClick={() => setActiveRole('Supplier')}
                    >
                        Supplier
                    </button>
                </div>

                <button className="icon-btn">
                    <SearchIcon />
                </button>
                <button className="icon-btn">
                    <BellIcon />
                </button>

                {isLoggedIn && (
                    <ProfileDropdown userName={currentUser.name} userRole={currentUser.role} />
                )}
            </div>
        </header>
    );
};

export default Header;