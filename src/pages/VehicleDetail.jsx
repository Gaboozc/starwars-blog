import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../style/vehicleDetails.css'; // Make sure this path is correct

/**
 * VehicleDetail Component - Displays detailed information about a Star Wars vehicle
 * Features:
 * - Dynamic data loading based on URL parameter
 * - Animated starfield background
 * - Responsive layout with back button
 * - Error handling and loading states
 */
const VehicleDetail = () => {
  const { vehicleName } = useParams(); // Get vehicle name from URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== STARFIELD BACKGROUND ANIMATION =====
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Handle window resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    handleResize();

    // Create stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    const animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ===== FETCH VEHICLE DATA =====
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Convert URL parameter to API-friendly format
        const searchName = vehicleName.replace(/-/g, ' ');
        const response = await fetch(
          `https://swapi.dev/api/vehicles/?search=${searchName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.results.length === 0) {
          throw new Error('Vehicle not found');
        }

        setVehicle(data.results[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleName]);

  // ===== RENDER COMPONENT =====
  return (
    <div className="vehicle-detail-page">
      {/* Starfield Background Canvas */}
      <canvas id="starfield" className="starfield-canvas" />
      
      {/* Content Container */}
      <div className="content-wrapper">
        {/* Back Navigation */}
        <Link to="/vehicles" className="back-button">
          &larr; Back to Vehicles
        </Link>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading vehicle data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <h2>Error</h2>
            <p>{error}</p>
            <Link to="/vehicles" className="retry-button">
              Try Again
            </Link>
          </div>
        )}

        {/* Vehicle Data Display */}
        {vehicle && !loading && !error && (
          <div className="vehicle-data">
            <h1 className="vehicle-title">{vehicle.name}</h1>
            
            <div className="vehicle-info-grid">
              <div className="info-card">
                <h3>Model</h3>
                <p>{vehicle.model || 'Unknown'}</p>
              </div>
              
              <div className="info-card">
                <h3>Class</h3>
                <p>{vehicle.vehicle_class || 'Unknown'}</p>
              </div>
              
              <div className="info-card">
                <h3>Manufacturer</h3>
                <p>{vehicle.manufacturer || 'Unknown'}</p>
              </div>
              
              <div className="info-card">
                <h3>Cost</h3>
                <p>{vehicle.cost_in_credits || 'Unknown'} credits</p>
              </div>
              
              <div className="info-card">
                <h3>Length</h3>
                <p>{vehicle.length || 'Unknown'} meters</p>
              </div>
              
              <div className="info-card">
                <h3>Max Speed</h3>
                <p>{vehicle.max_atmosphering_speed || 'Unknown'} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetail;