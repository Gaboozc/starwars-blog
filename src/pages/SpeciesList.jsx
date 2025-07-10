import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../Context/FavoriteContext';
import '../style/SpeciesList.css';

// Main component for displaying a list of species
const SpeciesList = () => {
  // State to store the list of species
  const [species, setSpecies] = useState([]);
  // Access the addFavorite function from the favorites context
  const { addFavorite } = useFavorites();

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Async function to fetch species data from SWAPI
    const fetchData = async () => {
      try {
        // Fetch species from the API
        const response = await fetch('https://www.swapi.tech/api/species/');
        // Parse the JSON response
        const data = await response.json();
        // Update state with the fetched species
        setSpecies(data.results);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching species data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array means this runs only once on mount

  // Render the component
  return (
    <div className="species-list">
      {/* Page header */}
      <h1>Species</h1>
      <p>Discover the diverse species of Star Wars.</p>
      
      {/* List of species */}
      <ul>
        {species.map((specie) => {
          // Extract species ID from the URL (more reliable than index)
          const id = specie.uid || specie.url.split('/').filter(Boolean).pop();

          return (
            <li key={specie.name}>
              {/* Species image with error fallback */}
              <img
                src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`}
                alt={specie.name}
                className="species-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />

              {/* Species information section */}
              <div className="species-info">
                <h3>
                  {/* Link to species detail page */}
                  <Link to={`/species/${id}`}>{specie.name}</Link>
                </h3>
                {/* Basic species details */}
                <p>Classification: {specie.properties?.classification}</p>
                <p>Language: {specie.properties?.language}</p>
                <p>Average Lifespan: {specie.properties?.average_lifespan} years</p>
              </div>

              {/* Button to add species to favorites */}
              <button 
                className="btn" 
                onClick={() => addFavorite({
                  ...specie.properties,
                  url: specie.url,
                  name: specie.name,
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

export default SpeciesList;