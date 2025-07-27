// File: codeZone/vendorconex/frontend/src/pages/AuthPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import the CSS file for styling (ensure Auth.css is in src/styles)
import '../styles/Auth.css';

// SVG components defined directly in this file for simplicity
const LocalSupplyLogo = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/*
          TO CHANGE THE LOGO:
          Replace the 'd' attribute value in the <path> below with the SVG path data
          of your desired "VendorConex" logo.
          Example: <path d="M your_new_svg_path_data_here Z"/>
          You might also need to adjust viewBox, width, height for proper sizing.
        */}
        <path d="M3 3h18v18H3zM12 8v8M8 12h8"/> {/* Current placeholder icon */}
    </svg>
);
const EmailInputSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M22 7L12 13L2 7"/>
    </svg>
);
const LockInputSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
);
const UserInputSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);
const MapPinInputSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="3"/>
    </svg>
);


function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState(''); // This state will eventually be sent to backend or handled by SetLocationPage
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => { // Added async for potential API calls
        e.preventDefault();
        console.log('Form submitted:', { email, password, name, location, isSignUp });

        // Placeholder for API call
        try {
            const endpoint = isSignUp ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/login'; // Replace with your backend endpoints
            const method = 'POST';
            const body = isSignUp ? { email, password, name, location } : { email, password };

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                // On successful login/signup, navigate to /set-location as per flow
                navigate('/set-location');
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                alert(`Error: ${errorData.message || 'Something went wrong!'}`); // Display error to user
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleDetectLocation = () => {
        // Navigate to the SetLocationPage (UI_20250726 (1).pdf, page 2)
        // Note: The actual location detection logic would be on SetLocationPage.
        // This button simply takes the user to the next step.
        navigate('/set-location');
    };

    return (
        // Outer wrapper mimicking the design's background and structure
        // Using semantic class names for easier CSS management
        <div className="auth-main-wrapper">
            <div className="layout-container">
                {/* Header: VendorConex Brand and Help Button */}
                <header className="app-header">
                    <div className="header-brand">
                        <LocalSupplyLogo />
                        <h2 className="header-title">VendorConex</h2>
                    </div>
                    <button className="help-button">
                        <span className="truncate-text">Help</span>
                    </button>
                </header>

                {/* Main Content Area */}
                <div className="main-content-area">
                    <div className="auth-content-card-wrapper">
                        <h2 className="welcome-heading">Welcome to VendorConex</h2>

                        {/* Login / Sign Up Tabs */}
                        <div className="tabs-wrapper">
                            <div className="auth-tabs">
                                <button
                                    className={`auth-tab-button ${!isSignUp ? 'active' : ''}`}
                                    onClick={() => setIsSignUp(false)}
                                >
                                    <p className="auth-tab-text">Login</p>
                                </button>
                                <button
                                    className={`auth-tab-button ${isSignUp ? 'active' : ''}`}
                                    onClick={() => setIsSignUp(true)}
                                >
                                    <p className="auth-tab-text">Sign Up</p>
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="form-field-wrapper">
                                <label className="input-label-container">
                                    <div className="input-field-group">
                                        <input
                                            placeholder="Email"
                                            className="form-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <div className="input-icon-container">
                                            <EmailInputSVG />
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Password Input */}
                            <div className="form-field-wrapper">
                                <label className="input-label-container">
                                    <div className="input-field-group">
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            className="form-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="input-icon-container">
                                            <LockInputSVG />
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Name Input (Sign Up Only) */}
                            {isSignUp && (
                                <div className="form-field-wrapper">
                                    <label className="input-label-container">
                                        <div className="input-field-group">
                                            <input
                                                placeholder="Name"
                                                className="form-input"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <div className="input-icon-container">
                                                <UserInputSVG />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            )}

                            {/* Location Section (Sign Up Only) */}
                            {isSignUp && (
                                <>
                                    <h3 className="location-heading">Location</h3>
                                    <div className="form-field-wrapper">
                                        <label className="input-label-container">
                                            <div className="input-field-group">
                                                <input
                                                    placeholder="Enter your location"
                                                    className="form-input"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    required
                                                />
                                                <div className="input-icon-container">
                                                    <MapPinInputSVG />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="button-wrapper">
                                        <button
                                            type="button"
                                            onClick={handleDetectLocation}
                                            className="detect-location-button"
                                        >
                                            <span className="truncate-text">Detect Location</span>
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Submit Button */}
                            <div className="button-wrapper">
                                <button
                                    type="submit"
                                    className="primary-action-button"
                                >
                                    <span className="truncate-text">{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                </button>
                            </div>
                        </form>

                        {/* Forgot Password Link (Login Only) */}
                        {!isSignUp && (
                            <p className="forgot-password-link">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;