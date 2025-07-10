import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../Context/FavoriteContext';
import '../style/PlanetList.css';

// Main component for displaying a list of planets
const PlanetList = () => {
  // State to store the list of planets
  const [planets, setPlanets] = useState([]);
  // Access the addFavorite function from the favorites context
  const { addFavorite } = useFavorites();

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Async function to fetch planet data from SWAPI
    const fetchData = async () => {
      try {
        // Fetch planets from the API
        const response = await fetch('https://www.swapi.tech/api/planets/');
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched planets
        setPlanets(data.results);
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
    <div className="planet-list">
      {/* Page header */}
      <h1>Planets</h1>
      <p>Explore the various planets in the galaxy.</p>
      
      {/* List of planets */}
      <ul>
        {planets.map((planet) => {
          // Extract planet ID from the URL (alternative to using uid)
          const id = planet.url.split('/').filter(Boolean).pop();

          return (
            <li key={planet.name}>
              {/* Planet image with error fallback */}
              <img
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                alt={planet.name}
                className="planet-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                }}
              />

              {/* Planet information section */}
              <div className="planet-info">
                <h3>
                  {/* Link to planet detail page */}
                  <Link to={`/planets/${id}`}>{planet.name}</Link>
                </h3>
                {/* Basic planet details */}
                <p>Climate: {planet.properties?.climate}</p>
                <p>Population: {planet.properties?.population}</p>
                <p>Terrain: {planet.properties?.terrain}</p>
              </div>

              {/* Button to add planet to favorites */}
              <button 
                className="btn" 
                onClick={() => addFavorite({
                  ...planet.properties,
                  url: planet.url,
                  name: planet.name,
                  id: id // Adding ID for potential future use
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

export default PlanetList;