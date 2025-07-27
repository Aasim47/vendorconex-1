// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
// import { authService } from '../services/api'; // No longer needed for direct login

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null); 

    useEffect(() => {
        // Attempt to load user from localStorage first (for persistence if needed)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('user');
            }
        } else {
            // If no user in localStorage, immediately "log in" a dummy user
            // THIS IS FOR DEVELOPMENT/TESTING ONLY
            const dummyUser = {
                userId: 'dummy_user_id_123',
                userName: 'Test User',
                email: 'test@example.com',
                token: 'dummy_jwt_token_for_testing_purposes', // This token will NOT be valid with a real backend
                // Add any other user properties your app expects
                location: 'Dummy Location, India',
                role: 'vendor' // Or 'customer', depending on what you need for testing
            };
            setLoggedInUser(dummyUser);
            localStorage.setItem('user', JSON.stringify(dummyUser));
            console.warn("WARNING: Auto-logged in a dummy user. This is for development/testing ONLY!");
        }
    }, []);

    // These functions will no longer make API calls, but just manage state locally
    // For direct login, these won't be called from LoginPage/AuthPage anyway
    const login = async (email, password) => {
        // Simulate successful login without API call
        const dummyUser = {
            userId: 'dummy_user_id_from_login',
            userName: 'Logged In User',
            email: email, // Use provided email for dummy
            token: 'another_dummy_jwt_token',
            location: 'Simulated Location',
            role: 'customer'
        };
        setLoggedInUser(dummyUser);
        localStorage.setItem('user', JSON.stringify(dummyUser));
        return { data: { user: dummyUser, token: dummyUser.token } }; // Simulate a response
    };

    const signup = async (name, email, password, location) => {
        // Simulate successful signup without API call
        console.log("Simulating signup for:", { name, email, location });
        alert('Signup simulated successfully! (No actual backend interaction)');
        return { data: { message: 'Signup simulated' } }; // Simulate a response
    };

    const logout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('user');
        console.log("Dummy user logged out.");
    };

    const value = {
        loggedInUser,
        login,
        signup, 
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};