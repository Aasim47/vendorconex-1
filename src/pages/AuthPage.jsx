// File: codeZone/venderconex/frontend/src/pages/AuthPage.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Ensure this path is correct and authService has login/signup methods.
// NOTE: authService is now primarily used within AuthContext.js
// So, we don't *strictly* need it here if AuthContext handles all API calls,
// but it doesn't hurt to keep it if there's other direct API interaction.
// For now, let's remove it from here if AuthContext is the sole API caller for auth
// import { authService } from '../services/api'; 

import { AuthContext } from '../context/AuthContext'; // Import AuthContext

// Import the CSS file for styling (ensure Auth.css is in src/styles)
import '../styles/Auth.css'; // Make sure Auth.css exists and is correctly styled

// SVG components defined directly in this file for simplicity
const LocalSupplyLogo = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Correctly get login and signup from AuthContext
    const { login: authContextLogin, signup: authContextSignup } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true); // Set loading true during API call

        try {
            if (isSignUp) {
                await authContextSignup(name, email, password, location);
                alert('Account created successfully! Please log in.'); // SUCCESS ALERT
                navigate('/login'); 
            } else {
                await authContextLogin(email, password);
                alert('Logged in successfully!');
                navigate('/set-location'); // Navigate to /set-location on successful login
            }

        } catch (err) {
            console.error('Authentication error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false); // Set loading false after API call completes
        }
    };

    const handleDetectLocation = () => {
        navigate('/set-location');
    };

    return (
        <div className="auth-main-wrapper">
            <div className="layout-container">
                <header className="app-header">
                    <div className="header-brand">
                        <LocalSupplyLogo />
                        <h2 className="header-title">VendorConex</h2>
                    </div>
                    <button className="help-button">
                        <span className="truncate-text">Help</span>
                    </button>
                </header>

                <div className="main-content-area">
                    <div className="auth-content-card-wrapper">
                        <h2 className="welcome-heading">Welcome to VendorConex</h2>

                        <div className="tabs-wrapper">
                            <div className="auth-tabs">
                                <button
                                    // FIX: Use backticks for template literal
                                    className={`auth-tab-button ${!isSignUp ? 'active' : ''}`}
                                    onClick={() => { setIsSignUp(false); setError(''); }}
                                >
                                    <p className="auth-tab-text">Login</p>
                                </button>
                                <button
                                    // FIX: Use backticks for template literal
                                    className={`auth-tab-button ${isSignUp ? 'active' : ''}`}
                                    onClick={() => { setIsSignUp(true); setError(''); }}
                                >
                                    <p className="auth-tab-text">Sign Up</p>
                                </button>
                            </div>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <form onSubmit={handleSubmit}>
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

                            <div className="button-wrapper">
                                <button
                                    type="submit"
                                    className="primary-action-button"
                                    disabled={loading}
                                >
                                    <span className="truncate-text">
                                        {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
                                    </span>
                                </button>
                            </div>
                        </form>

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