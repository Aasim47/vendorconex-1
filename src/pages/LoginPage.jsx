// codeZone/venderconex/frontend/src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // <--- MODIFIED: Removed FaGoogle here
import { AuthContext } from '../context/AuthContext';

import '../App.css';

const LoginPage = ({ isDarkMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login: authContextLogin } = useContext(AuthContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authContextLogin(email, password);
            alert('Logged in successfully!');
            navigate('/set-location');

        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    // Google login placeholder function remains, but the button/icon is not rendered
    const handleGoogleLogin = () => {
        alert('Google Login functionality coming soon!');
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

                {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FaEnvelope className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FaLock className="input-icon" />
                    </div>

                    <button type="submit" className="primary-button login-button-submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>

                    {/*
                        NOTE: The Google login button and its icon (FaGoogle) are commented out
                        or removed from the JSX below.
                        If you add FaGoogle back to the JSX, you MUST uncomment it in the import statement above.
                    */}
                    <div className="or-separator">OR</div>
                    <button type="button" className="google-login-button" onClick={handleGoogleLogin} disabled={loading}>
                        {/* <FaGoogle className="google-icon" /> */} Login with Google
                    </button>
                </form>

                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </main>
        </div>
    );
};

export default LoginPage;