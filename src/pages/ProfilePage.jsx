import React from 'react';
import '../styles/ProfilePage.css'; // We will create this CSS file

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            <h2 className="profile-page-title">My Profile</h2>

            {/* Profile Header Section */}
            <div className="profile-header card">
                <div className="profile-avatar-section">
                    <img src="https://via.placeholder.com/100/4CAF50/FFFFFF?text=PS" alt="Priya Sharma" className="profile-avatar" />
                    <div className="profile-header-info">
                        <h3>Priya Sharma</h3>
                        <p className="profile-rating">5.0 <span className="stars">★★★★★</span> (84 reviews)</p>
                    </div>
                </div>
                <button className="edit-profile-btn primary-btn">Edit Profile</button>
            </div>

            {/* Quick Stats Section */}
            <div className="quick-stats-section">
                <div className="stat-card card">
                    <h4>Transactions this month</h4>
                    <p className="stat-value">23</p>
                </div>
                <div className="stat-card card">
                    <h4>Monthly Activity value</h4>
                    <p className="stat-value">₹18,750</p>
                </div>
                <div className="stat-card card">
                    <h4>Active connections</h4>
                    <p className="stat-value">12 suppliers/vendors</p>
                </div>
                <div className="stat-card card">
                    <h4>Member since</h4>
                    <p className="stat-value">March 2023</p>
                </div>
            </div>

            {/* Main Profile Details Section (Collapsed panels) */}
            <div className="profile-details-section">
                <div className="profile-section-card card">
                    <div className="section-header">
                        <h4>Profile Details</h4>
                        <span className="toggle-icon">▼</span>
                    </div>
                    {/* Content will go here for Personal Information, Business Details, Location & Address, Contact Information */}
                    <div className="section-content">
                        {/* Placeholder for content */}
                        <p>Personal information, business details, contact information, and location will appear here in expandable sections.</p>
                    </div>
                </div>

                <div className="profile-section-card card">
                    <div className="section-header">
                        <h4>Account Settings</h4>
                        <span className="toggle-icon">▼</span>
                    </div>
                     <div className="section-content">
                        {/* Placeholder for content */}
                        <p>Notification preferences, privacy settings, and app preferences will be managed here.</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="profile-action-buttons">
                    <button className="primary-btn">Save Changes</button>
                    <button className="secondary-btn">Reset to Default</button>
                    <button className="logout-profile-btn secondary-btn">Logout</button> {/* Specific logout button for profile page */}
                    <button className="delete-account-btn danger-btn">Delete Account</button>
                </div>
            </div>

            {/* Activity Feed and Profile Completion Sidebar */}
            <div className="profile-sidebar card">
                <div className="profile-completion">
                    <h4>Profile Completion</h4>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: '75%'}}></div> {/* Example progress */}
                    </div>
                    <p className="progress-text">Complete your profile</p>
                    <p className="suggestion-text">Improvement Suggestions:</p>
                    <ul>
                        <li>Add business description</li>
                        <li>Upload profile photo</li>
                        <li>Verify your phone number</li>
                    </ul>
                </div>

                <div className="quick-actions">
                    <h4>Quick Actions</h4>
                    <button className="share-profile-btn secondary-btn">Share Profile</button>
                    <button className="download-qr-btn secondary-btn">Download Profile QR Code</button>
                </div>

                <div className="activity-feed">
                    <h4>Activity Feed</h4>
                    <ul>
                        <li>Ordered vegetables from Ayush Supplier</li>
                        <li>Added tomatoes to listing</li>
                        <li>Finished ⭐️⭐️⭐️⭐️⭐️ rating from Anjali Vendor</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;