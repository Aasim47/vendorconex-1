// File: codeZone/vendorconex/frontend/src/layouts/DashboardLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar from components
import '../styles/DashboardLayout.css'; // Optional: Add a CSS file for layout specific styles

const DashboardLayout = ({ children, currentLocation }) => {
    return (
        <div className="dashboard-layout">
            <Navbar currentLocation={currentLocation} />
            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;