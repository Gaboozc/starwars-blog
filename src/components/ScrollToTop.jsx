/**
 * ScrollToTop.jsx - Scroll Management Component
 * 
 * This component automatically scrolls the page to the top whenever
 * the user navigates to a different route. Without this component,
 * the scroll position would remain at the previous page's location.
 * 
 * How it works:
 * - Monitors the location (current route) using a ref
 * - When location changes, triggers window.scrollTo(0, 0)
 * - Wraps other components without rendering anything visible
 * 
 * This is a higher-order component pattern that enhances other components
 */

// Import useEffect hook for side effects (scrolling)
// Import useRef hook to track the previous location
import { useEffect, useRef } from "react";

// Import PropTypes for runtime type checking (optional but good practice)
import PropTypes from "prop-types";

/**
 * ScrollToTop Component
 * 
 * A wrapper component that doesn't render any visible elements itself,
 * but instead provides scroll behavior to its children.
 * 
 * Usage in Layout.jsx:
 * <ScrollToTop>
 *   <Navbar />
 *   <Outlet />
 * </ScrollToTop>
 * 
 * @param {Object} location - The current location object from React Router
 * @param {React.ReactNode} children - The child components to wrap
 * @returns {React.ReactNode} Returns the children without adding any DOM elements
 */
const ScrollToTop = ({ location, children }) => {
  /**
   * useRef - Creates a reference that persists across renders
   * 
   * Unlike state, refs don't trigger re-renders when changed
   * We use it to store the previous location for comparison
   * prevLocation.current can be read and modified without re-rendering
   * 
   * Initialized with the current location prop
   */
  const prevLocation = useRef(location);

  /**
   * useEffect - Runs side effects after component renders
   * 
   * This effect monitors location changes and scrolls to top when detected
   * Dependency array [location] means this runs whenever location changes
   * 
   * Without this, navigating to a new page would keep the previous scroll position
   * This ensures users always start at the top of the new page
   */
  useEffect(() => {
    // Check if the location has changed from the previous render
    if (location !== prevLocation.current) {
      /**
       * window.scrollTo(x, y) - Scrolls the page to coordinates
       * @param {number} x - Horizontal scroll position (0 = left)
       * @param {number} y - Vertical scroll position (0 = top)
       * 
       * This scrolls to the very top of the page (0, 0)
       */
      window.scrollTo(0, 0);
    }
    // Update the ref to store the current location for next comparison
    prevLocation.current = location;
  }, [location]); // Dependency array - effect runs when location changes

  /**
   * Return only the children without rendering anything else
   * This is an example of a wrapper/provider pattern
   * The component provides functionality but doesn't affect the DOM structure
   */
  return children;
};

// Export the component for use as a wrapper in the app
export default ScrollToTop;

/**
 * PropTypes validation - Specifies expected prop types
 * Helps catch errors during development if wrong props are passed
 * These are optional but improve code robustness
 */
ScrollToTop.propTypes = {
  // location prop is an object (from React Router)
  location: PropTypes.object,
  // children can be any valid React element/node
  children: PropTypes.any
};