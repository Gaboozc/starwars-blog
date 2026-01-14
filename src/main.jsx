/**
 * main.jsx - Main Entry Point - Application Bootstrap
 * 
 * This is the entry point for the React application.
 * It sets up:
 * 1. React Router for page navigation
 * 2. Context providers for global state (Favorites)
 * 3. Development mode checks (StrictMode)
 * 4. Scroll functionality
 * 
 * The application hierarchy:
 * React.StrictMode (development checks)
 * └── FavoritesProvider (global favorites state)
 *     └── RouterProvider (routes and navigation)
 *         └── Layout (navbar + outlet)
 *             └── Home (main page)
 */

// Import React and ReactDOM for app initialization
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import RouterProvider from React Router to enable routing
// RouterProvider connects the router configuration to the app
import { RouterProvider } from 'react-router-dom';

// Import the router configuration (see routes.jsx for route definitions)
import { router } from './routes';

/**
 * Import FavoritesProvider from Context
 * Wraps the app to provide favorites management to all child components
 * Any component can access favorites using the useFavorites() hook
 */
import { FavoritesProvider } from "./Context/FavoriteContext";

/**
 * Import scrollHelper.js
 * This initializes the drag-to-scroll functionality for horizontal scrolls
 * It runs automatically when imported, setting up event listeners
 */
import './scrollHelper.js'; 

/**
 * Main Component - Root component that wraps the entire application
 * 
 * This component creates the provider hierarchy:
 * - React.StrictMode: Enables additional development checks
 *   - Warnings about deprecated APIs
 *   - Double-renders in dev mode to detect side effects
 * - FavoritesProvider: Provides favorites state and methods
 *   - useFavorites() hook available to all children
 * - RouterProvider: Enables routing based on URL
 *   - Routes defined in routes.jsx
 * 
 * @returns {JSX.Element} The wrapped application structure
 */
const Main = () => {
  return (
    // StrictMode: Development-only wrapper that checks for common issues
    // (In production builds, StrictMode has no effect)
    <React.StrictMode>
      {/* 
        FavoritesProvider: Makes favorites context available to entire app
        Wraps all children and provides favorites state
      */}
      <FavoritesProvider> 
        {/* 
          RouterProvider: Enables React Router functionality
          Reads the router configuration and renders appropriate pages
          Based on the current URL
        */}
        <RouterProvider router={router} />
      </FavoritesProvider>
    </React.StrictMode>
  );
};

/**
 * Bootstrap the React application
 * 
 * ReactDOM.createRoot(element) creates a React root
 * element is the DOM node where React will render (from public/index.html)
 * getElementById('root') finds the <div id="root"></div> in the HTML
 * 
 * .render(component) mounts the component tree to that DOM element
 * This starts the entire React application
 */
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
