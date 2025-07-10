import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../Context/FavoriteContext';
import '../style/StarshipList.css';

// Main component for displaying a list of starships
const StarshipList = () => {
  // State to store the list of starships
  const [starships, setStarships] = useState([]);
  // Access the addFavorite function from the favorites context
  const { addFavorite } = useFavorites();

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Async function to fetch starship data from SWAPI
    const fetchData = async () => {
      try {
        // Fetch starships from the API
        const response = await fetch('https://www.swapi.tech/api/starships/');
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched starships
        setStarships(data.results);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching starship data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array means this runs only once on mount

  // Render the component
  return (
    <div className="starship-list">
      {/* Page header */}
      <h1>Starships</h1>
      <p>Discover the iconic starships of Star Wars.</p>
      
      {/* List of starships */}
      <ul>
        {starships.map((starship) => {
          // Extract starship ID from the URL (more reliable than index)
          const id = starship.uid || starship.url.split('/').filter(Boolean).pop();

          return (
            <li key={starship.name}>
              {/* Starship image with error fallback */}
              <img
                src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                alt={starship.name}
                className="starship-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                }}
              />

              {/* Starship information section */}
              <div className="starship-info">
                <h3>
                  {/* Link to starship detail page */}
                  <Link to={`/starships/${id}`}>{starship.name}</Link>
                </h3>
                {/* Basic starship details */}
                <p>Model: {starship.properties?.model}</p>
                <p>Manufacturer: {starship.properties?.manufacturer}</p>
                <p>Cost: {starship.properties?.cost_in_credits} credits</p>
              </div>

              {/* Button to add starship to favorites */}
              <button 
                className="btn" 
                onClick={() => addFavorite({
                  ...starship.properties,
                  url: starship.url,
                  name: starship.name,
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

export default StarshipList;