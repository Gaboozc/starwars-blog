import React from 'react';
// Import the useFavorites hook to access favorite management functions
import { useFavorites } from '../Context/FavoriteContext';
// Import the CSS styles specific to this card component
import '../style/ItemCard.css';

/**
 * ItemCard Component - Reusable card component for displaying individual items
 * 
 * This component displays a single Star Wars item (character, planet, species, starship, or vehicle)
 * in a card format with an image, title, and action buttons.
 * 
 * Features:
 * - Displays item image with fallback placeholder
 * - Shows item name/title
 * - "Learn More" button that opens a detailed modal
 * - Heart icon button to add/remove from favorites
 * - Responsive design with hover effects
 * - Smooth animations and transitions
 * 
 * Props:
 * @param {Object} item - The item object containing data to display
 *   @param {string} item.name - The name of the item
 *   @param {string} item.uid - Unique identifier for fetching the image
 *   @param {Object} item.properties - Object containing item details
 *   @param {string} item.url - API URL for the item
 * @param {string} type - Type of item (characters, planets, species, starships, vehicles)
 * @param {Function} onLearnMore - Callback function when "Learn More" button is clicked
 */
const ItemCard = ({ item, type, onLearnMore }) => {
  // Get the addFavorite function from the FavoritesContext
  // This function allows us to add items to the user's favorites list
  const { addFavorite } = useFavorites();

  /**
   * Generate the correct image URL based on the item type
   * Different item types use different URLs on the Star Wars Visual Guide
   * 
   * Returns the URL to the item's image, or a placeholder if not found
   */
  const getImageUrl = () => {
    // Base URL for all Star Wars Visual Guide images
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    
    // Use the item type to construct the correct image path
    // item.uid is the unique identifier for each item
    switch(type) {
      // Characters are stored in the /characters/ directory
      case 'characters':
        return `${baseUrl}/characters/${item.uid}.jpg`;
      // Planets are stored in the /planets/ directory
      case 'planets':
        return `${baseUrl}/planets/${item.uid}.jpg`;
      // Species are stored in the /species/ directory
      case 'species':
        return `${baseUrl}/species/${item.uid}.jpg`;
      // Starships are stored in the /starships/ directory
      case 'starships':
        return `${baseUrl}/starships/${item.uid}.jpg`;
      // Vehicles are stored in the /vehicles/ directory
      case 'vehicles':
        return `${baseUrl}/vehicles/${item.uid}.jpg`;
      // Return a placeholder image if type doesn't match any category
      default:
        return 'https://via.placeholder.com/300x400?text=No+Image';
    }
  };

  /**
   * Handle adding the item to favorites
   * This function is called when the heart button is clicked
   */
  const handleAddFavorite = () => {
    // Get item properties - either directly from item or from item.properties
    const properties = item.properties || item;
    
    // Call addFavorite with a complete item object
    // Includes all properties, URL, name, ID, and type for reference
    addFavorite({
      // Spread all properties from the item
      ...properties,
      // Include the API URL for potential future use
      url: item.url,
      // Include the item name
      name: item.name,
      // Include the unique ID for reference
      id: item.uid,
      // Include the type so we know what kind of item this is
      type: type
    });
  };

  /**
   * Main JSX return - render the card component
   */
  return (
    <div className="item-card">
      
      {/* ================================================================ */}
      {/* IMAGE CONTAINER */}
      {/* ================================================================ */}
      <div className="card-image-container">
        {/* 
          Image element displaying the item's visual representation
          Includes error handling to show placeholder if image fails to load
        */}
        <img
          // Set the source to the correct image URL based on item type
          src={getImageUrl()}
          // Alt text for accessibility and as fallback text
          alt={item.name}
          // CSS class for styling the image
          className="card-image"
          // Error handler - if image fails to load, show placeholder
          // e.target refers to the image element itself
          // e.target.src overwrites the src attribute with the placeholder
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
      </div>
      
      {/* ================================================================ */}
      {/* CONTENT SECTION */}
      {/* ================================================================ */}
      <div className="card-content">
        {/* 
          Card title - displays the item's name
          CSS class "card-title" applies styling from ItemCard.css
        */}
        <h3 className="card-title">{item.name}</h3>
        
        {/* ============================================================== */}
        {/* ACTION BUTTONS CONTAINER */}
        {/* ============================================================== */}
        <div className="card-actions">
          {/* 
            "Learn More" button - Opens the modal with detailed information
            CSS class "btn btn-learn-more" applies primary button styling
          */}
          <button 
            // CSS classes for button styling
            className="btn btn-learn-more" 
            // onClick handler calls the onLearnMore prop function
            // This tells the parent (Home.jsx) which item was selected
            onClick={() => onLearnMore(item)}
            // Title attribute shows text on hover (accessibility feature)
            title="View detailed information"
          >
            Learn More
          </button>
          
          {/* 
            Favorite button - Heart icon to add item to favorites
            CSS class "btn btn-favorite" applies heart button styling
          */}
          <button 
            // CSS classes for button styling
            className="btn btn-favorite" 
            // onClick handler calls the handleAddFavorite function
            onClick={handleAddFavorite}
            // Title attribute shows text on hover (accessibility feature)
            title="Add to favorites"
          >
            {/* Heart symbol (♥) as the button content */}
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default ItemCard;
