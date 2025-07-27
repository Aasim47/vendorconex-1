// codeZone/venderconex/frontend/src/pages/LoginPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa'; // Removed FaUser, FaMapMarkerAlt

import '../App.css'; // Import your main CSS for styles like .dark-mode

const LoginPage = ({ isDarkMode }) => {
    // Function to handle login (placeholder)
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission
        alert('Login functionality coming soon!');
        // Here you would typically handle authentication logic
    };

    // Function to handle Google login (placeholder)
    const handleGoogleLogin = () => {
        alert('Google Login functionality coming soon!');
        // Here you would typically integrate with Google OAuth
    };

    return (
        <div className={`login-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <header className="login-header">
                <div className="login-logo">
                    <span className="logo-icon">M</span> VendorConex
                </div>
                <button className="help-button">Help</button>
            </header>

            <main className="login-main-content">
                <h2>Welcome to VendorConex</h2>

                <div className="auth-tabs">
                    <button className="tab-button active">Login</button>
                    <Link to="/signup" className="tab-button">Sign Up</Link>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="text" placeholder="Email or Phone Number" /> {/* Changed placeholder */}
                        <FaEnvelope className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" />
                        <FaLock className="input-icon" />
                    </div>

                    <button type="submit" className="primary-button login-button-submit">
                        Login
                    </button>

                    <div className="or-separator">OR</div>

                    <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
                        <FaGoogle className="google-icon" /> Login with Google
                    </button>
                </form>

                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </main>
        </div>
    );
};

export default LoginPage;