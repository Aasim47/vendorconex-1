// File: codeZone/vendorconex/frontend/src/components/LogoutConfirmation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutConfirmation.css'; // We'll create this CSS file next

const LogoutConfirmation = () => {
    const navigate = useNavigate();

    const handleConfirmLogout = () => {
        // In a real application, this is where you would:
        // 1. Clear user authentication tokens (e.g., localStorage.removeItem('authToken'))
        // 2. Clear any user-specific state
        console.log("User confirmed logout. Performing actual logout actions.");
        // After logout, redirect to the login page (assuming '/' is your login route)
        navigate('/login'); // Assuming you have a /login route
    };

    const handleCancel = () => {
        console.log("Logout cancelled. Navigating back.");
        // Go back to the previous page or a dashboard, for example
        navigate(-1); // navigate(-1) goes back one step in history
    };

    return (
        <div className="logout-confirmation-container">
            <div className="logout-confirmation-card">
                <h2 className="logout-confirmation-title">Confirm Logout</h2>
                <p className="logout-confirmation-message">Are you sure you want to logout?</p>
                <p className="logout-confirmation-sub-message">You'll need to login again to access your account</p>
                <div className="logout-confirmation-buttons">
                    <button className="logout-cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="logout-confirm-button" onClick={handleConfirmLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmation;