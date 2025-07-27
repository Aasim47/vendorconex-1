// frontend/src/components/Login.js

import React, { useState, useContext } from 'react';
import { authService } from '../services/api';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Login({ onLoginSuccess }) {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupLocation, setSignupLocation] = useState('');
    const [error, setError] = useState('');
    const { login: authContextLogin } = useContext(AuthContext); // Get login function from AuthContext

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await authService.login(loginEmail, loginPassword);
            authContextLogin({ userId: data.userId, userName: data.userName, token: data.token });
            alert(`Login successful! Welcome, ${data.userName}`);
            onLoginSuccess(); // Trigger navigation in App.js
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
            console.error('Login error:', err);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await authService.signup(signupName, signupEmail, signupPassword, signupLocation);
            authContextLogin({ userId: data.userId, userName: data.userName, token: data.token });
            alert(`Signup successful! Welcome, ${data.userName}. You are now logged in.`);
            onLoginSuccess(); // Trigger navigation in App.js
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. User might already exist.');
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Authentication</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Login</h3>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" id="login-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700">Name</label>
                        <input type="text" id="signup-name" value={signupName} onChange={(e) => setSignupName(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" id="signup-email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" id="signup-password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="signup-location" className="block text-sm font-medium text-slate-700">Location (Optional)</label>
                        <input type="text" id="signup-location" value={signupLocation} onChange={(e) => setSignupLocation(e.target.value)}
                               className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Login;