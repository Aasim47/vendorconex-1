// codeZone/venderconex/frontend/src/pages/SignupPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaGoogle } from 'react-icons/fa'; // Added FaGoogle

import '../App.css'; // Import your main CSS for styles like .dark-mode

const SignupPage = ({ isDarkMode }) => {
    const handleSignup = (event) => {
        event.preventDefault(); // Prevent default form submission
        alert('Signup functionality coming soon!');
        // Here you would typically handle user registration logic
    };

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
                <h2>Create Your VendorConex Account</h2>

                <div className="auth-tabs">
                    <Link to="/login" className="tab-button">Login</Link>
                    <button className="tab-button active">Sign Up</button>
                </div>

                <form className="login-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <input type="text" placeholder="Name" required />
                        <FaUser className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Location" required />
                        <FaMapMarkerAlt className="input-icon" />
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the <a href="/terms" className="terms-link">Terms and Conditions</a></label>
                    </div>

                    <button type="submit" className="primary-button create-account-button">
                        Sign Up
                    </button>

                    <div className="or-separator">OR</div>

                    <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
                        <FaGoogle className="google-icon" /> Sign Up with Google
                    </button>
                </form>

                <p className="already-have-account">
                    Already have an account? <Link to="/login" className="forgot-password-link">Login here</Link>
                </p>
            </main>
        </div>
    );
};

export default SignupPage;