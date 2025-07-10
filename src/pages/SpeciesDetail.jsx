import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/SpeciesDetail.css';

// Component for displaying detailed information about a single species
const SpeciesDetail = () => {
  // Get the species ID from URL parameters
  const { id } = useParams();
  // State to store the current species' data
  const [species, setSpecies] = useState(null);

  // useEffect hook to fetch species details when ID changes
  useEffect(() => {
    // Async function to fetch specific species data
    const fetchSpecies = async () => {
      try {
        // Fetch species details from API
        const response = await fetch(`https://www.swapi.tech/api/species/${id}/`);
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched species data
        setSpecies(data.result);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching species details:', error);
      }
    };

    // Call the fetch function
    fetchSpecies();
  }, [id]); // Dependency on id means this runs whenever id changes

  // Show loading state while data is being fetched
  if (!species) {
    return <div className="loading">Loading species details...</div>;
  }

  // Helper function to generate a summary sentence
  const generateSummary = () => {
    return `${species.properties.name} is a ${species.properties.classification} species known for their ${species.properties.skin_colors} skin and ${species.properties.eye_colors} eyes.`;
  };

  // Render the species details
  return (
    <div className="species-detail-container">
      {/* Species name header */}
      <h1>{species.properties.name}</h1>
      {/* Generated summary sentence */}
      <p className="summary">{generateSummary()}</p>
      
      <div className="detail-content">
        {/* Species image with error fallback */}
        <img
          src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`}
          alt={species.properties.name}
          className="species-detail-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
          }}
        />
        
        {/* Detailed species information */}
        <div className="species-properties">
          <h2>Species Details</h2>
          <p><span className="detail-label">Classification:</span> {species.properties.classification}</p>
          <p><span className="detail-label">Designation:</span> {species.properties.designation}</p>
          <p><span className="detail-label">Average Height:</span> {species.properties.average_height} cm</p>
          <p><span className="detail-label">Skin Colors:</span> {species.properties.skin_colors}</p>
          <p><span className="detail-label">Hair Colors:</span> {species.properties.hair_colors}</p>
          <p><span className="detail-label">Eye Colors:</span> {species.properties.eye_colors}</p>
          <p><span className="detail-label">Average Lifespan:</span> {species.properties.average_lifespan} years</p>
          <p><span className="detail-label">Language:</span> {species.properties.language}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;