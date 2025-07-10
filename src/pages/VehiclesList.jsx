import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/vehiclesList.css"; // Ensure this file exists (created below)

/**
 * VehiclesList Component - Displays a grid of Star Wars vehicles with interactive starfield background.
 * Key Features:
 * - Replicates the starfield animation from Home.jsx
 * - Fetches vehicle data from SWAPI (Star Wars API)
 * - Responsive card grid with hover effects
 * - Loading state handling
 */
const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== STARFIELD ANIMATION (COPIED FROM HOME.JSX) =====
  /**
   * Sets up the canvas-based starfield background.
   * Creates 200 stars with random positions/speeds and animates them.
   */
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Handle window resizing to keep canvas fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize canvas size
    resizeCanvas();

    // Generate stars with random properties
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5, // Random star size (0 to 1.5px)
      speed: Math.random() * 0.5 + 0.1 // Random speed (0.1 to 0.6)
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white'; // Star color

      stars.forEach(star => {
        star.y += star.speed; // Move star downward
        // Reset star to top when it exits the screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup: Remove event listener on component unmount
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // ===== FETCH VEHICLE DATA FROM SWAPI =====
  /**
   * Fetches vehicle data from the Star Wars API (SWAPI).
   * Handles loading state and stores results in state.
   */
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/vehicles/");
        const data = await response.json();
        setVehicles(data.results);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // ===== RENDER COMPONENT =====
  return (
    <div className="vehicles-list-page">
      {/* Starfield Canvas (Background) */}
      <canvas id="starfield" className="starfield-canvas" />

      {/* Content Container */}
      <div className="content-wrapper">
        <h1 className="page-title">Star Wars Vehicles</h1>
        
        {loading ? (
          <div className="loading-message">Loading vehicles...</div>
        ) : (
          <div className="vehicles-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle.name} className="vehicle-card">
                <h3>{vehicle.name}</h3>
                <p>Model: {vehicle.model}</p>
                <p>Class: {vehicle.vehicle_class}</p>
                <Link
                  to={`/vehicles/${vehicle.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesList;