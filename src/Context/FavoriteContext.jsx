/**
 * FavoriteContext.jsx - Global State Management for User Favorites
 * 
 * This file implements React Context API to manage user's favorite items
 * across the entire application. Instead of passing props down multiple levels,
 * components can use the useFavorites hook to access favorites state directly.
 * 
 * Key Concepts:
 * - Context API: React's built-in way to share data between components
 * - Provider Pattern: Wraps the entire app to provide context to all children
 * - Custom Hook: useFavorites() simplifies access to the context
 */

// Import React hooks for creating and managing context
import React, { createContext, useState, useContext } from 'react';

/**
 * Create the FavoritesContext
 * This is the container that will hold our favorites state and methods
 * Initially undefined - gets populated by the Provider
 */
const FavoritesContext = createContext();

/**
 * Custom Hook: useFavorites
 * 
 * This hook allows any component to access the favorites context
 * Much cleaner than useContext(FavoritesContext) in every component
 * 
 * Usage in components:
 * const { favorites, addFavorite, removeFavorite } = useFavorites();
 * 
 * @returns {Object} Object containing favorites array and management functions
 */
export const useFavorites = () => {
  // useContext retrieves the current value of the context
  // Returns the value provided by the nearest FavoritesContext.Provider
  return useContext(FavoritesContext);
};

/**
 * FavoritesProvider Component
 * 
 * This component wraps the entire application and provides
 * favorites state and methods to all child components
 * 
 * Should wrap the entire app in main.jsx like:
 * <FavoritesProvider>
 *   <RouterProvider router={router} />
 * </FavoritesProvider>
 * 
 * @param {React.ReactNode} children - All components wrapped by this provider
 */
export const FavoritesProvider = ({ children }) => {
  /**
   * State for storing all user's favorite items
   * Each item is an object with properties like name, id, type, url, etc.
   * Initially empty array [] when component first mounts
   */
  const [favorites, setFavorites] = useState([]);

  /**
   * Function to add a new item to favorites
   * Creates a new array with the existing items plus the new item
   * This approach preserves immutability (React best practice)
   * 
   * @param {Object} item - The item object to add to favorites
   */
  const addFavorite = (item) => {
    // Spread operator [...favorites] creates a copy of the array
    // Then adds the new item to the end
    // setFavorites updates the state with the new array
    setFavorites([...favorites, item]);
  };

  /**
   * Function to remove an item from favorites
   * Uses filter() to create a new array without the matching item
   * Compares by name property to identify which item to remove
   * 
   * @param {Object} item - The item object to remove from favorites
   */
  const removeFavorite = (item) => {
    // filter() returns a new array with only items where the condition is true
    // fav.name !== item.name means "keep all items that don't match this name"
    // This effectively removes the item from the array
    setFavorites(favorites.filter(fav => fav.name !== item.name));
  };

  /**
   * Provider JSX - Makes context available to all children
   * Any component inside FavoritesProvider can use useFavorites()
   */
  return (
    // FavoritesContext.Provider shares the value to all consuming components
    // value prop contains all state and functions that should be accessible
    <FavoritesContext.Provider value={{ 
      // Array of all favorite items
      favorites, 
      // Function to add item to favorites
      addFavorite, 
      // Function to remove item from favorites
      removeFavorite 
    }}>
      {/* 
        children prop renders all components wrapped by this provider
        These children can now access the context value via useFavorites()
      */}
      {children}
    </FavoritesContext.Provider>
  );
};

// Export the context itself for advanced use cases (optional)
export default FavoritesContext;