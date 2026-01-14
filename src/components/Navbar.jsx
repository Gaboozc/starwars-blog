/**
 * Navbar.jsx - Navigation Bar Component
 * 
 * This component displays the navigation bar at the top of every page
 * It includes the Star Wars logo, navigation links, and a favorites dropdown
 * 
 * Features:
 * - Star Wars logo (clickable link to home)
 * - Navigation links for each category (not functional in current version)
 * - Favorites button with dropdown showing saved items
 * - Remove favorites functionality
 * - Responsive design
 */

// Import Link from React Router for navigation without page reload
import { Link } from "react-router-dom";

// Import useState hook for managing dropdown state
import { useState } from "react";

// Import useFavorites hook to access favorites from context
import { useFavorites } from "../Context/FavoriteContext";

// Import Navbar styles
import "../style/Navbar.css";

/**
 * Star Wars logo URL from external source
 * This image displays as the brand logo in the navbar
 */
const starWarsLogoUrl =
  "https://loodibee.com/wp-content/uploads/Star-Wars-Logo-black-background.png";

/**
 * Decorative image URL - faction theme image displayed in navbar
 * This is purely decorative and doesn't have any functionality
 */
const decorativeImageUrl =
  "https://preview.redd.it/who-do-you-think-had-the-best-faction-theme-v0-ulv9sfd1wedd1.png?width=480&format=png&auto=webp&s=ac36b39694da89e61a87be6d82e88badb3f7b68f";

/**
 * Navbar Component
 * 
 * Main navigation component displayed at the top of every page
 * Provides navigation, branding, and favorites management
 * 
 * @returns {JSX.Element} The navbar UI
 */
const Navbar = () => {
  // Get favorites array and removeFavorite function from context
  const { favorites, removeFavorite } = useFavorites();

  // State to track whether the favorites dropdown is open or closed
  // Initially false - dropdown is hidden
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /**
   * Toggle the dropdown menu open/closed
   * Uses the logical NOT operator (!) to flip the boolean value
   * If dropdownOpen is true, it becomes false, and vice versa
   */
  const toggleDropdown = () => {
    // setDropdownOpen updates the state to the opposite of current value
    setDropdownOpen(!dropdownOpen);
  };

  // Guard clause - return loading message if favorites are not loaded yet
  if (!favorites) {
    return <div>Loading...</div>;
  }

  // Main JSX return - render the navbar
  return (
    // Nav element - semantic HTML for navigation
    <nav className="navbar navbar-light">
      {/* 
        Container div - helps center and constrain the navbar content
        Provides consistent spacing and alignment
      */}
      <div className="container">
        
        {/* 
          Logo/Home Link - Star Wars logo that links back to home page
          Link component from React Router prevents full page reload
        */}
        <Link to="/">
          {/* 
            Logo image - Star Wars logo
            Clicking this link navigates to home page
          */}
          <img 
            src={starWarsLogoUrl} 
            alt="Star Wars Logo" 
            className="logo-img" 
          />
        </Link>
        
        {/* ============================================================== */}
        {/* NAVIGATION LINKS SECTION */}
        {/* ============================================================== */}
        <div className="nav-links">
          {/* 
            Navigation links for different categories
            NOTE: These routes are not currently implemented
            They're here as placeholders for future expansion
          */}
          
          {/* Characters category link (not functional) */}
          <Link to="/characters" className="nav-link">
            Characters
          </Link>
          
          {/* Planets category link (not functional) */}
          <Link to="/planets" className="nav-link">
            Planets
          </Link>
          
          {/* Species category link (not functional) */}
          <Link to="/species" className="nav-link">
            Species
          </Link>
          
          {/* Starships category link (not functional) */}
          <Link to="/starships" className="nav-link">
            Starships
          </Link>
          
          {/* Vehicles category link (not functional) */}
          <Link to="/vehicles" className="nav-link">
            Vehicles
          </Link>
        </div>

        {/* 
          Decorative image - faction theme for aesthetic purposes
          This is purely visual and doesn't affect functionality
        */}
        <img
          src={decorativeImageUrl}
          alt="Decorative Image"
          className="decorative-image"
        />
        
        {/* ============================================================== */}
        {/* FAVORITES DROPDOWN SECTION */}
        {/* ============================================================== */}
        <div className="ml-auto">
          {/* 
            Favorites button - shows number of saved items
            Clicking toggles the dropdown menu open/closed
            Classes: btn btn-primary for styling
          */}
          <button 
            className="btn btn-primary" 
            onClick={toggleDropdown}
          >
            Favorites ({favorites.length})
          </button>
          
          {/* 
            Dropdown menu - shows list of favorite items
            className includes 'open' class when dropdownOpen is true
            This class reveals the dropdown with CSS transitions
          */}
          <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {/* 
              Conditional rendering - shows different content based on 
              whether there are favorites or not
            */}
            {favorites.length > 0 ? (
              // Show list of favorites if items exist
              <ul>
                {/* 
                  Map through favorites array and render each one
                  key prop helps React identify which items have changed
                */}
                {favorites.map((item, index) => (
                  // Container for each favorite item
                  <li key={index}>
                    {/* 
                      Link to the item's detail page (not implemented)
                      Shows the item's name as link text
                    */}
                    <Link to={`/${item.type}/${item.id}`}>
                      {item.name}
                    </Link>
                    
                    {/* 
                      Remove button - delete this item from favorites
                      Clicking calls removeFavorite with the item object
                      onClick uses arrow function to pass the item parameter
                    */}
                    <button
                      className="remove-btn"
                      onClick={() => removeFavorite(item)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              // Show empty message if no favorites
              <p className="empty-favorites">No favorites yet</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the component for use in other files
export default Navbar;