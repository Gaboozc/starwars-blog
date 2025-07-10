import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/PlanetDetail.css';

// Component for displaying detailed information about a single planet
const PlanetDetail = () => {
  // Get the planet ID from URL parameters
  const { id } = useParams();
  // State to store the current planet's data
  const [planet, setPlanet] = useState(null);

  // useEffect hook to fetch planet details when ID changes
  useEffect(() => {
    // Async function to fetch specific planet data
    const fetchPlanet = async () => {
      try {
        // Fetch planet details from API
        const response = await fetch(`https://www.swapi.tech/api/planets/${id}/`);
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched planet data
        setPlanet(data.result);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching planet details:', error);
      }
    };

    // Call the fetch function
    fetchPlanet();
  }, [id]); // Dependency on id means this runs whenever id changes

  // Show loading state while data is being fetched
  if (!planet) {
    return <div className="loading">Loading planet details...</div>;
  }

  // Helper function to generate a summary sentence
  const generateSummary = () => {
    return `${planet.properties.name} is a ${planet.properties.terrain} planet with a ${planet.properties.climate} climate.`;
  };

  // Render the planet details
  return (
    <div className="planet-detail-container">
      {/* Planet name header */}
      <h1>{planet.properties.name}</h1>
      {/* Generated summary sentence */}
      <p className="summary">{generateSummary()}</p>
      
      <div className="detail-content">
        {/* Planet image with error fallback */}
        <img
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt={planet.properties.name}
          className="planet-detail-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
          }}
        />
        
        {/* Detailed planet information */}
        <div className="planet-properties">
          <h2>Planet Details</h2>
          <p><span className="detail-label">Climate:</span> {planet.properties.climate}</p>
          <p><span className="detail-label">Diameter:</span> {planet.properties.diameter} km</p>
          <p><span className="detail-label">Gravity:</span> {planet.properties.gravity}</p>
          <p><span className="detail-label">Orbital Period:</span> {planet.properties.orbital_period} days</p>
          <p><span className="detail-label">Population:</span> {planet.properties.population}</p>
          <p><span className="detail-label">Rotation Period:</span> {planet.properties.rotation_period} hours</p>
          <p><span className="detail-label">Surface Water:</span> {planet.properties.surface_water}%</p>
          <p><span className="detail-label">Terrain:</span> {planet.properties.terrain}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;