import React from 'react';
// Import custom CSS styles for the modal component
import '../style/DetailModal.css';

/**
 * DetailModal Component - Displays comprehensive information about a selected item
 * 
 * This component renders a modal popup that shows detailed information about a selected
 * Star Wars item (character, planet, species, starship, or vehicle).
 * 
 * Features:
 * - Modal overlay that can be closed by clicking outside
 * - Responsive image display with fallback
 * - Dynamic fields based on item type
 * - Close button (×) in the top-right corner
 * - Smooth animations and transitions
 * - Mobile-responsive layout
 * 
 * Props:
 * @param {boolean} isOpen - Controls whether the modal is visible
 * @param {Function} onClose - Callback function called when modal should close
 * @param {Object} item - The item object to display details for
 * @param {string} type - Type of item (characters, planets, species, starships, vehicles)
 */
const DetailModal = ({ isOpen, onClose, item, type }) => {
  /**
   * Early return if modal is not open or no item is selected
   * This prevents the component from rendering anything if not needed
   * Returns null (renders nothing) when conditions are not met
   */
  if (!isOpen || !item) return null;

  /**
   * Get the detail fields to display based on item type
   * Different item types have different properties to display
   * 
   * @returns {Array} Array of objects with {label, value} for each detail
   */
  const getDetailFields = () => {
    // Get the properties object - some items store data in .properties, others don't
    const properties = item.properties || item;
    
    // Use switch statement to determine which fields to display based on type
    switch(type) {
      // Character details section
      case 'characters':
        return [
          // Physical characteristics
          { label: 'Height', value: properties.height },
          { label: 'Mass', value: properties.mass },
          // Life information
          { label: 'Birth Year', value: properties.birth_year },
          // Physical attributes
          { label: 'Gender', value: properties.gender },
          { label: 'Hair Color', value: properties.hair_color },
          { label: 'Skin Color', value: properties.skin_color },
          { label: 'Eye Color', value: properties.eye_color }
        ];
      
      // Planet details section
      case 'planets':
        return [
          // Physical properties
          { label: 'Diameter', value: properties.diameter },
          // Rotation and orbital characteristics
          { label: 'Rotation Period', value: properties.rotation_period },
          { label: 'Orbital Period', value: properties.orbital_period },
          // Environmental conditions
          { label: 'Gravity', value: properties.gravity },
          { label: 'Population', value: properties.population },
          { label: 'Climate', value: properties.climate },
          { label: 'Terrain', value: properties.terrain }
        ];
      
      // Species details section
      case 'species':
        return [
          // Classification information
          { label: 'Classification', value: properties.classification },
          { label: 'Designation', value: properties.designation },
          // Physical characteristics
          { label: 'Average Height', value: properties.average_height },
          { label: 'Skin Colors', value: properties.skin_colors },
          { label: 'Hair Colors', value: properties.hair_colors },
          { label: 'Eye Colors', value: properties.eye_colors },
          // Communication
          { label: 'Language', value: properties.language }
        ];
      
      // Starship details section
      case 'starships':
        return [
          // Identification
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          // Physical characteristics
          { label: 'Length', value: properties.length },
          // Performance specifications
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          // Capacity information
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          // Operational details
          { label: 'Consumables', value: properties.consumables }
        ];
      
      // Vehicle details section
      case 'vehicles':
        return [
          // Identification
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          // Physical characteristics
          { label: 'Length', value: properties.length },
          // Performance specifications
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          // Capacity information
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          // Operational details
          { label: 'Consumables', value: properties.consumables }
        ];
      
      // Default case - return empty array if type doesn't match
      default:
        return [];
    }
  };

  /**
   * Get the correct image URL based on item type
   * Uses the Star Wars Visual Guide API
   * 
   * @returns {string} URL to the item's image or placeholder
   */
  const getImageUrl = () => {
    // Base URL for all Star Wars Visual Guide images
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    
    // Construct the image URL based on item type
    if (type === 'characters') {
      return `${baseUrl}/characters/${item.uid}.jpg`;
    } else if (type === 'planets') {
      return `${baseUrl}/planets/${item.uid}.jpg`;
    } else if (type === 'species') {
      return `${baseUrl}/species/${item.uid}.jpg`;
    } else if (type === 'starships') {
      return `${baseUrl}/starships/${item.uid}.jpg`;
    } else if (type === 'vehicles') {
      return `${baseUrl}/vehicles/${item.uid}.jpg`;
    }
    // Return placeholder if type is unknown
    return 'https://via.placeholder.com/400x500?text=No+Image';
  };

  /**
   * Get the detail fields for this item
   * This is computed once at the top of the render
   */
  const fields = getDetailFields();

  /**
   * Main JSX return - render the modal component
   */
  return (
    // Modal overlay - semi-transparent background that covers the entire screen
    <div className="modal-overlay" onClick={onClose}>
      
      {/* Modal content box - the actual modal dialog */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 
          Close button - × symbol that closes the modal
          stopPropagation() prevents the click from bubbling up to the overlay
          onClick handler calls the onClose prop function
        */}
        <button className="modal-close" onClick={onClose}>×</button>
        
        {/* ============================================================== */}
        {/* MODAL BODY - Contains image and information */}
        {/* ============================================================== */}
        <div className="modal-body">
          
          {/* ========================================================== */}
          {/* IMAGE SECTION */}
          {/* ========================================================== */}
          <div className="modal-image">
            {/* 
              Image element showing the item's visual representation
              Includes error handling for missing or broken images
            */}
            <img
              // Set image source to the correct URL for the item type
              src={getImageUrl()}
              // Alt text for accessibility
              alt={item.name}
              // Error handler - shows placeholder if image fails to load
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x500?text=No+Image';
              }}
            />
          </div>
          
          {/* ========================================================== */}
          {/* INFORMATION SECTION */}
          {/* ========================================================== */}
          <div className="modal-info">
            {/* 
              Item title - the name of the selected item
              Uses large, bold, yellow text for Star Wars aesthetic
            */}
            <h2>{item.name}</h2>
            
            {/* ====================================================== */}
            {/* DETAILS CONTAINER - Shows all item properties */}
            {/* ====================================================== */}
            <div className="modal-details">
              {/* 
                Map through all detail fields and display each one
                fields is an array of {label, value} objects
                Each field gets rendered as a detail-row
              */}
              {fields.map((field, index) => (
                // Container for each detail row
                <div key={index} className="detail-row">
                  {/* 
                    Detail label - the name of the property (e.g., "Height")
                    Styled in yellow/accent color
                  */}
                  <span className="detail-label">{field.label}:</span>
                  {/* 
                    Detail value - the actual value of the property
                    Shows "N/A" if value is null or undefined
                  */}
                  <span className="detail-value">{field.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default DetailModal;
