import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../Context/FavoriteContext';
import '../style/CharacterList.css';

// Main component for displaying a list of characters
const CharacterList = () => {
  // State to store the list of characters
  const [characters, setCharacters] = useState([]);
  // Access the addFavorite function from the favorites context
  const { addFavorite } = useFavorites();

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Async function to fetch character data from SWAPI
    const fetchData = async () => {
      try {
        // Fetch characters from the API
        const response = await fetch('https://www.swapi.tech/api/people/');
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched characters
        setCharacters(data.results);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array means this runs only once on mount

  // Render the component
  return (
    <div className="character-list">
      {/* Page header */}
      <h1>Characters</h1>
      <p>Meet the iconic characters of Star Wars.</p>
      
      {/* List of characters */}
      <ul>
        {characters.map((character) => {
          // Extract character ID from the URL (more reliable than index)
          const id = character.uid || character.url.split('/').filter(Boolean).pop();

          return (
            <li key={character.name}>
              {/* Character image with error fallback */}
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt={character.name}
                className="character-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />

              {/* Character information section */}
              <div className="character-info">
                <h3>
                  {/* Link to character detail page */}
                  <Link to={`/characters/${id}`}>{character.name}</Link>
                </h3>
                {/* Basic character details */}
                <p>Height: {character.properties?.height} cm</p>
                <p>Mass: {character.properties?.mass} kg</p>
                <p>Birth Year: {character.properties?.birth_year}</p>
              </div>

              {/* Button to add character to favorites */}
              <button 
                className="btn" 
                onClick={() => addFavorite({
                  ...character.properties,
                  url: character.url,
                  name: character.name,
                  id: id // Adding ID for reference
                })}
              >
                Add to Favorites
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CharacterList;