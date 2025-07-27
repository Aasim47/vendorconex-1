// frontend/src/components/ProfileDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileDropdown.css'; // <-- Make sure this path is correct for your styles folder

// Import your icon components. Ensure these files exist in frontend/src/assets/icons/
import PersonIcon from '../assets/icons/PersonIcon';
import OrdersIcon from '../assets/icons/OrdersIcon';
import CartIcon from '../assets/icons/CartIcon';
import ListingsIcon from '../assets/icons/ListingsIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import DarkModeIcon from '../assets/icons/DarkModeIcon';
import LogoutIcon from '../assets/icons/LogoutIcon';

// Dummy user data for demonstration.
// In a real app, you would get this from your authentication context or state.
const dummyUser = {
    name: "Sophia Carter",
    role: "Vendor",
    avatarInitial: "SC" // For placeholder if no image
};

const ProfileDropdown = ({ userName = dummyUser.name, userRole = dummyUser.role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle
    const dropdownRef = useRef(null); // Ref for detecting clicks outside the dropdown

    const navigate = useNavigate(); // Hook from React Router for navigation

    // Function to toggle dropdown visibility when the trigger is clicked
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Effect to close the dropdown if a click occurs outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the dropdown is open and the click is outside the dropdown container
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        // Add event listener when component mounts or isOpen changes
        document.addEventListener("mousedown", handleClickOutside);
        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]); // Re-run effect when isOpen state changes

    // Handles the logout action
    const handleLogout = () => {
        alert('Logging out...'); // Placeholder alert
        // TODO: Implement actual logout logic here (e.g., clear authentication tokens, reset user state)
        navigate('/login'); // Redirect to the login page after logout
        setIsOpen(false); // Close dropdown
    };

    // Handles navigation to different pages within the application
    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
        setIsOpen(false); // Close dropdown after navigation
    };

    // Toggles dark mode state
    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
        // TODO: Implement actual dark mode theme switching (e.g., by adding/removing a class on the <body> tag
        //       and defining corresponding CSS variables/rules in your global stylesheet).
        document.body.classList.toggle('dark-mode', !isDarkMode); // Example: toggles 'dark-mode' class on body
    };

    return (
        <div className="profile-dropdown-container" ref={dropdownRef}>
            {/* The clickable element that shows/hides the dropdown */}
            <div className="profile-dropdown-trigger" onClick={toggleDropdown}>
                {/* Placeholder for user avatar. You might replace this with an <img> tag later. */}
                <div className="profile-avatar">
                    {userName ? userName.charAt(0) : dummyUser.avatarInitial} {/* Displays first initial of name */}
                </div>
                <span>{userName}</span> {/* Displays the user's name */}
            </div>

            {/* The actual dropdown content, conditionally shown/hidden with CSS class */}
            <div className={`profile-dropdown-content ${isOpen ? 'show' : ''}`}>
                {/* User Name and Role Display */}
                <div className="profile-info">
                    <h3>{userName}</h3>
                    <p>{userRole}</p>
                </div>

                {/* Dropdown Menu Items (Links) */}
                <a href="#" className="dropdown-item" onClick={() => handleNavigation('/profile')}>
                    <PersonIcon /> View Profile
                </a>
                <a href="#" className="dropdown-item" onClick={() => handleNavigation('/orders')}>
                    <OrdersIcon /> My Orders
                </a>
                <a href="#" className="dropdown-item" onClick={() => handleNavigation('/cart')}>
                    <CartIcon /> My Cart
                </a>
                {/* "My Listings" only shown if the user's role is 'Vendor' */}
                {userRole === 'Vendor' && (
                    <a href="#" className="dropdown-item" onClick={() => handleNavigation('/listings')}>
                        <ListingsIcon /> My Listings
                    </a>
                )}
                <a href="#" className="dropdown-item" onClick={() => handleNavigation('/settings')}>
                    <SettingsIcon /> Settings
                </a>

                {/* Dark Mode Toggle Switch */}
                <div className="dropdown-item dark-mode-toggle">
                    <DarkModeIcon /> Dark Mode
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={handleDarkModeToggle}
                    />
                </div>

                {/* Logout Button */}
                <a href="#" className="dropdown-item logout-button" onClick={handleLogout}>
                    <LogoutIcon /> Logout
                </a>
            </div>
        </div>
    );
};

export default ProfileDropdown;