/**
 * Layout.jsx - Application Layout Component
 * 
 * This component serves as the main layout wrapper for all pages
 * It provides the navigation bar and scroll-to-top functionality
 * for the entire application
 * 
 * Component Structure:
 * ScrollToTop (wrapper)
 * ├── Navbar (navigation at top)
 * └── Outlet (page content from router)
 */

// Import Outlet from React Router - renders the current page content
// Outlet is where the child routes (like Home) will be rendered
import { Outlet } from "react-router-dom/dist";

// Import ScrollToTop component - scrolls to top when route changes
import ScrollToTop from "../components/ScrollToTop";

// Import Navbar component - navigation bar at the top of every page
import Navbar from "../components/Navbar";

/**
 * Layout Component
 * 
 * Provides the consistent layout for all pages in the application
 * Acts as a parent template that wraps page-specific content
 * 
 * This component:
 * 1. Wraps everything in ScrollToTop to handle scroll behavior
 * 2. Displays Navbar at the top of every page
 * 3. Uses Outlet to render page-specific content (Home, etc.)
 * 
 * @returns {JSX.Element} The layout structure
 */
export const Layout = () => {
  return (
    // ScrollToTop wrapper - scrolls to top when page changes
    // This ensures users start at the top when navigating between pages
    <ScrollToTop>
      {/* 
        Navbar component - displays at the top of every page
        Shows Star Wars logo, navigation links, and favorites button
      */}
      <Navbar />
      
      {/* 
        Outlet - React Router component that renders the current page
        Based on the URL route, this will render the appropriate page component
        (currently only Home page is available)
      */}
      <Outlet />
    </ScrollToTop>
  );
};