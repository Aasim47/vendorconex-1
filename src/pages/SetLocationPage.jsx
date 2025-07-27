// File: codeZone/vendorconex/frontend/src/pages/SetLocationPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SetLocation.css'; // Import the CSS for this page

// Dummy Map Placeholder - In a real app, this would be a map library like Google Maps or Leaflet
const MapPlaceholder = () => (
    <div className="map-placeholder">
        {/* You'd integrate a map component here */}
        <p>Map will be displayed here</p>
        <p>Bhubaneswar, Odisha, India</p> {/* Example location shown on map */}
    </div>
);

function SetLocationPage() {
    const [useCurrent, setUseCurrent] = useState(true);
    const [manualLocation, setManualLocation] = useState('');
    const navigate = useNavigate();

    const handleDetectLocation = async () => {
        // This is a placeholder for actual geolocation
        console.log("Attempting to detect location...");
        // In a real application, you would use Geolocation API here:
        // navigator.geolocation.getCurrentPosition(
        //   (position) => {
        //     const { latitude, longitude } = position.coords;
        //     console.log('Latitude:', latitude, 'Longitude:', longitude);
        //     // You would then send this to your backend
        //     // sendLocationToBackend({ lat: latitude, lng: longitude });
        //     alert('Location detected! (Simulated)');
        //   },
        //   (error) => {
        //     console.error("Error detecting location:", error);
        //     alert('Could not detect location. Please enter manually.');
        //     setUseCurrent(false); // Switch to manual input if detection fails
        //   }
        // );

        // Simulate a backend call to save location
        try {
            const response = await fetch('http://localhost:5000/api/detect-location', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // If authentication is required
                },
                body: JSON.stringify({
                    locationType: 'current',
                    // In a real app, send actual lat/lng
                    latitude: 20.2961, // Example for Bhubaneswar
                    longitude: 85.8245  // Example for Bhubaneswar
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Location detection success:', data);
                alert('Location detected and saved!');
            } else {
                const errorData = await response.json();
                console.error('Location detection error:', errorData.message);
                alert(`Error detecting location: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error during location detection:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleContinue = async () => {
        let locationData = {};
        if (useCurrent) {
            // In a real scenario, you'd send the actual detected coordinates
            locationData = {
                type: 'current',
                latitude: 20.2961, // Dummy data for demonstration
                longitude: 85.8245  // Dummy data for demonstration
            };
        } else {
            if (!manualLocation) {
                alert('Please enter a location manually.');
                return;
            }
            locationData = {
                type: 'manual',
                address: manualLocation
            };
        }

        console.log("Saving location:", locationData);

        // Simulate API call to save the chosen location
        try {
            const response = await fetch('http://localhost:5000/api/save-location', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // If authentication is required
                },
                body: JSON.stringify(locationData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Location saved successfully:', data);
                // After saving, navigate to the main dashboard
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('Failed to save location:', errorData.message);
                alert(`Failed to save location: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error saving location:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleSkip = () => {
        // Navigate to dashboard without setting location
        navigate('/dashboard');
    };

    return (
        <div className="set-location-page-container">
            <div className="set-location-content-card">
                <h2 className="set-location-heading">Set Your Location</h2>
                <p className="set-location-description">Help us connect you with nearby suppliers/vendors</p>

                <MapPlaceholder /> {/* Placeholder for the map */}

                <div className="location-options">
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="location-choice"
                            checked={useCurrent}
                            onChange={() => setUseCurrent(true)}
                        />
                        Use Current Location
                    </label>
                    {useCurrent && (
                        <button className="detect-location-button" onClick={handleDetectLocation}>
                            Detect
                        </button>
                    )}

                    <label className="radio-option">
                        <input
                            type="radio"
                            name="location-choice"
                            checked={!useCurrent}
                            onChange={() => setUseCurrent(false)}
                        />
                        Enter Manually
                    </label>
                    {!useCurrent && (
                        <input
                            type="text"
                            placeholder="Enter your location manually"
                            className="manual-location-input"
                            value={manualLocation}
                            onChange={(e) => setManualLocation(e.target.value)}
                        />
                    )}
                </div>

                <div className="action-buttons">
                    <button className="continue-button" onClick={handleContinue}>
                        Continue
                    </button>
                    <button className="skip-button" onClick={handleSkip}>
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SetLocationPage;