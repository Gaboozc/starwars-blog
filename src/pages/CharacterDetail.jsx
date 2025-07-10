import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/CharacterDetail.css';

// Component for displaying detailed information about a single character
const CharacterDetail = () => {
  // Get the character ID from URL parameters
  const { id } = useParams();
  // State to store the current character's data
  const [character, setCharacter] = useState(null);

  // useEffect hook to fetch character details when ID changes
  useEffect(() => {
    // Async function to fetch specific character data
    const fetchCharacter = async () => {
      try {
        // Fetch character details from API
        const response = await fetch(`https://www.swapi.tech/api/people/${id}/`);
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched character data
        setCharacter(data.result);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching character details:', error);
      }
    };

    // Call the fetch function
    fetchCharacter();
  }, [id]); // Dependency on id means this runs whenever id changes

  // Show loading state while data is being fetched
  if (!character) {
    return <div className="loading">Loading character details...</div>;
  }

  // Helper function to generate a summary sentence
  const generateSummary = () => {
    return `Meet ${character.properties.name}, a ${character.properties.gender} character with ${character.properties.hair_color} hair and ${character.properties.eye_color} eyes.`;
  };

  // Render the character details
  return (
    <div className="character-detail-container">
      {/* Character name header */}
      <h1>{character.properties.name}</h1>
      {/* Generated summary sentence */}
      <p className="summary">{generateSummary()}</p>
      
      <div className="detail-content">
        {/* Character image with error fallback */}
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt={character.properties.name}
          className="character-detail-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Image+Not+Available';
          }}
        />
        
        {/* Detailed character information */}
        <div className="character-properties">
          <h2>Character Details</h2>
          <p><span className="detail-label">Height:</span> {character.properties.height} cm</p>
          <p><span className="detail-label">Mass:</span> {character.properties.mass} kg</p>
          <p><span className="detail-label">Birth Year:</span> {character.properties.birth_year}</p>
          <p><span className="detail-label">Gender:</span> {character.properties.gender}</p>
          <p><span className="detail-label">Hair Color:</span> {character.properties.hair_color}</p>
          <p><span className="detail-label">Skin Color:</span> {character.properties.skin_color}</p>
          <p><span className="detail-label">Eye Color:</span> {character.properties.eye_color}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;