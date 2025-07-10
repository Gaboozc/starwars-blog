import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/StarshipDetail.css';

// Component for displaying detailed information about a single starship
const StarshipDetail = () => {
  // Get the starship ID from URL parameters
  const { id } = useParams();
  // State to store the current starship's data
  const [starship, setStarship] = useState(null);

  // useEffect hook to fetch starship details when ID changes
  useEffect(() => {
    // Async function to fetch specific starship data
    const fetchStarship = async () => {
      try {
        // Fetch starship details from API
        const response = await fetch(`https://www.swapi.tech/api/starships/${id}/`);
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched starship data
        setStarship(data.result);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching starship details:', error);
      }
    };

    // Call the fetch function
    fetchStarship();
  }, [id]); // Dependency on id means this runs whenever id changes

  // Show loading state while data is being fetched
  if (!starship) {
    return <div className="loading">Loading starship details...</div>;
  }

  // Helper function to generate a summary sentence
  const generateSummary = () => {
    return `${starship.properties.name} is a ${starship.properties.starship_class} class starship manufactured by ${starship.properties.manufacturer}.`;
  };

  // Render the starship details
  return (
    <div className="starship-detail-container">
      {/* Starship name header */}
      <h1>{starship.properties.name}</h1>
      {/* Generated summary sentence */}
      <p className="summary">{generateSummary()}</p>
      
      <div className="detail-content">
        {/* Starship image with error fallback */}
        <img
          src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
          alt={starship.properties.name}
          className="starship-detail-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x300?text=Image+Not+Available';
          }}
        />
        
        {/* Detailed starship information */}
        <div className="starship-properties">
          <h2>Technical Specifications</h2>
          <p><span className="detail-label">Model:</span> {starship.properties.model}</p>
          <p><span className="detail-label">Manufacturer:</span> {starship.properties.manufacturer}</p>
          <p><span className="detail-label">Cost:</span> {starship.properties.cost_in_credits} credits</p>
          <p><span className="detail-label">Length:</span> {starship.properties.length} meters</p>
          <p><span className="detail-label">Crew:</span> {starship.properties.crew}</p>
          <p><span className="detail-label">Passengers:</span> {starship.properties.passengers}</p>
          <p><span className="detail-label">Max Atmosphering Speed:</span> {starship.properties.max_atmosphering_speed}</p>
          <p><span className="detail-label">Hyperdrive Rating:</span> {starship.properties.hyperdrive_rating}</p>
          <p><span className="detail-label">Starship Class:</span> {starship.properties.starship_class}</p>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetail;