/**
 * routes.jsx - Router Configuration
 * 
 * This file defines all the routes for the Star Wars Blog application
 * Currently only the Home route is implemented since all content is displayed there
 * 
 * Future routes could include:
 * - /characters/:id (individual character detail page)
 * - /planets/:id (individual planet detail page)
 * - /favorites (dedicated favorites page)
 * - /about (about page)
 * 
 * React Router Concepts:
 * - createBrowserRouter: Creates a router that uses browser history
 * - createRoutesFromElements: Converts JSX Route elements into router config
 * - Route: Defines a path and the component to render
 * - Outlet: Placeholder for nested route content
 */

// Import routing utilities from React Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

/**
 * Import Layout component
 * This component wraps all pages with consistent layout elements
 * (Navbar at top, ScrollToTop functionality)
 * Acts as the parent/parent-layout route
 */
import { Layout } from "./pages/Layout";

/**
 * Import Home page component
 * This is the main page displaying all Star Wars content
 * Renders all categories (Characters, Planets, Species, Starships, Vehicles)
 * with horizontal scrolling and modal details
 */
import Home from "./pages/Home";

/**
 * Create and export the router configuration
 * 
 * This creates a complete router object that React Router can use
 * to handle navigation and render the appropriate components
 * 
 * createBrowserRouter: Uses the browser's History API for routing
 * (URLs update without full page reloads)
 * 
 * createRoutesFromElements: Converts JSX Route elements to router config
 * This lets us write routes in familiar JSX syntax
 */
export const router = createBrowserRouter(
  // Convert JSX Route elements to router configuration
  createRoutesFromElements(
    /**
     * Root route with Layout component
     * 
     * @path "/" - Matches the root path and all sub-paths
     * @element Layout - Component to render at this route
     * @errorElement - Fallback component if an error occurs during routing
     * 
     * This route acts as a parent/layout route
     * All child routes inherit this layout
     * The Navbar will show on every page because it's in Layout
     */
    <Route
      path="/"
      element={<Layout />}
      // Error element shows if there's an error loading or rendering
      // Currently just a humorous Star Wars reference
      errorElement={<h1>Have you heard the tragedy of Darth Plagueis the wise?</h1>}
    >
      {/**
       * Home page route
       * 
       * @index - This makes Home the default/index route at "/"
       * When user visits "/" or "/", this page renders
       * The element renders inside the <Outlet /> in Layout
       */}
      <Route index element={<Home />} />
      
      {/**
       * Catch-all 404 route
       * 
       * @path "*" - Matches any path that doesn't match above routes
       * This is the fallback for undefined/non-existent routes
       * If user navigates to /nonexistent, this catches it
       */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Route>
  )
);