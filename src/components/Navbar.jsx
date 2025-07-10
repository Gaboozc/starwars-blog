// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../Context/FavoriteContext";
import "../style/Navbar.css";

const starWarsLogoUrl =
  "https://loodibee.com/wp-content/uploads/Star-Wars-Logo-black-background.png";
const decorativeImageUrl =
  "https://preview.redd.it/who-do-you-think-had-the-best-faction-theme-v0-ulv9sfd1wedd1.png?width=480&format=png&auto=webp&s=ac36b39694da89e61a87be6d82e88badb3f7b68f";

const Navbar = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (!favorites) {
    return <div>Loading...</div>; // Or handle the error gracefully
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/">
          <img src={starWarsLogoUrl} alt="Star Wars Logo" className="logo-img" />
        </Link>
        
        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/characters" className="nav-link">Characters</Link>
          <Link to="/planets" className="nav-link">Planets</Link>
          <Link to="/species" className="nav-link">Species</Link>
          <Link to="/starships" className="nav-link">Starships</Link>
          <Link to="/vehicles" className="nav-link">Vehicles</Link> {/* New Vehicles Link */}
        </div>

        <img
          src={decorativeImageUrl}
          alt="Decorative Image"
          className="decorative-image"
        />
        
        {/* Favorites Dropdown */}
        <div className="ml-auto">
          <button className="btn btn-primary" onClick={toggleDropdown}>
            Favorites ({favorites.length})
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((item, index) => (
                  <li key={index}>
                    <Link to={`/${item.type}/${item.id}`}>{item.name}</Link>
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
              <p className="empty-favorites">No favorites yet</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;