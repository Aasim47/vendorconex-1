// codeZone/venderconex/frontend/src/pages/SignupPage.jsx

import React, { useState, useContext } from 'react'; // Added useState and useContext
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'; // Removed FaGoogle
import { AuthContext } from '../context/AuthContext'; // <--- IMPORTANT: Import AuthContext

import '../App.css'; // Import your main CSS for styles like .dark-mode

const SignupPage = ({ isDarkMode }) => {
    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    // State for error messages and loading status during API calls
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); // Hook for navigation
    
    // Get the signup function from AuthContext
    const { signup: authContextSignup } = useContext(AuthContext);

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setError(''); // Clear any previous errors
        setLoading(true); // Set loading to true while the request is in progress

        try {
            // Call the signup function provided by AuthContext
            // This function will handle the actual API call to your backend
            await authContextSignup(name, email, password, location);
            
            // If signup is successful, show an alert and navigate to the login page
            alert('Account created successfully! Please log in.');
            navigate('/login'); 

        } catch (err) {
            console.error('Signup error:', err.response?.data || err.message);
            // Display a user-friendly error message
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false); // Set loading back to false after the request completes
        }
    };

    // Removed handleGoogleLogin and the Google button as it's not implemented for now
    // If you plan to implement Google Login later, you'd integrate its specific OAuth flow here.

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

                {/* Display error message if there is one */}
                {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

                <form className="login-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        {/* Add value and onChange for controlled components */}
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
                        <FaUser className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                        <FaEnvelope className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
                        <FaLock className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required disabled={loading} />
                        <FaMapMarkerAlt className="input-icon" />
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" required disabled={loading} />
                        <label htmlFor="terms">I agree to the <a href="/terms" className="terms-link">Terms and Conditions</a></label>
                    </div>

                    <button type="submit" className="primary-button create-account-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'} {/* Change button text based on loading state */}
                    </button>

                    {/* Removed the Google Login section */}
                    {/*
                    <div className="or-separator">OR</div>
                    <button type="button" className="google-login-button" onClick={handleGoogleLogin} disabled={loading}>
                        <FaGoogle className="google-icon" /> Sign Up with Google
                    </button>
                    */}
                </form>

                <p className="already-have-account">
                    Already have an account? <Link to="/login" className="forgot-password-link">Login here</Link>
                </p>
            </main>
        </div>
    );
};

export default SignupPage;