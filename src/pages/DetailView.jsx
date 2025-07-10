import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import { useFavorites } from "../Context/FavoriteContext";

// Generic detail view component that can handle different SWAPI endpoints
const DetailView = ({ apiEndpoint }) => {
  // Get the item ID from URL parameters
  const { id } = useParams();
  
  // Access the addFavorite function from the favorites context
  const { addFavorite } = useFavorites();
  
  // State to store the current item's data
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine the category based on the API endpoint
  const category = apiEndpoint.split('/').pop();

  // useEffect hook to fetch data when ID or endpoint changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch item details from API
        const response = await fetch(`https://www.swapi.tech/api/${category}/${id}/`);
        
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // The new API wraps results in a 'result' object with 'properties'
        if (!data.result) {
          throw new Error("Invalid data structure received from API");
        }
        
        // Flatten the properties for easier display
        const itemData = {
          ...data.result.properties,
          id: data.result.uid || id,
          url: data.result.url
        };
        
        setItem(itemData);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [apiEndpoint, id, category]);

  // Show loading state
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading {category} details...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="alert alert-danger my-5">
        <h4>Error loading {category} details</h4>
        <p>{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // Format property keys for display (e.g., "hair_color" becomes "Hair Color")
  const formatKey = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Skip these keys when displaying properties
  const excludedKeys = ['created', 'edited', 'url', 'id'];

  return (
    <div className="detail-page container my-5">
      <Card className="detail-card shadow-lg">
        {/* Item image with error fallback */}
        <Card.Img
          variant="top"
          src={`https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`}
          alt={item.name || item.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
            e.target.onerror = null; // Prevent infinite loop
          }}
          className="p-4"
        />
        
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h2>{item.name || item.title}</h2>
          </Card.Title>
          
          <Card.Text>
            {/* Display all properties except excluded ones */}
            {Object.entries(item)
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key, value]) => (
                <p key={key}>
                  <strong>{formatKey(key)}:</strong>{" "}
                  {Array.isArray(value) 
                    ? value.join(", ") 
                    : value || "N/A"}
                </p>
              ))}
          </Card.Text>
          
          {/* Add to favorites button */}
          <div className="text-center mt-4">
            <Button 
              variant="warning" 
              onClick={() => addFavorite({
                ...item,
                type: category // Add type for filtering in favorites
              })}
            >
              Add to Favorites
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailView;