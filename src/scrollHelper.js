/**
 * scrollHelper.js - Horizontal Scroll Drag Functionality
 * 
 * This module enables click-and-drag scrolling on horizontal scroll containers
 * Users can click and drag the mouse left/right to scroll through items
 * This provides a more intuitive, touch-like experience on desktop
 * 
 * How it works:
 * 1. Listen for mousedown event to start dragging
 * 2. Track mouse movement with mousemove events
 * 3. Calculate distance moved and update scroll position
 * 4. Stop dragging on mouseup or mouseleave
 * 
 * This script is imported in main.jsx and runs automatically
 */

/**
 * Wait for the DOM to fully load before running script
 * DOMContentLoaded event fires after all HTML is parsed
 * This ensures the elements we're looking for exist before we access them
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Get all horizontal scroll containers on the page
   * querySelectorAll returns a NodeList of all matching elements
   * '.items-scroll-container' is the CSS class for scroll containers
   * Currently there are 5: Characters, Planets, Species, Starships, Vehicles
   */
  const scrollContainers = document.querySelectorAll('.items-scroll-container');
  
  /**
   * forEach - loop through each scroll container and set up drag functionality
   * @param {HTMLElement} container - Each scroll container element
   */
  scrollContainers.forEach(container => {
    /**
     * State variables for tracking drag state
     * These are declared inside forEach so each container has its own state
     */
    
    // Boolean flag - true while mouse is down and dragging
    let isDown = false;
    
    // X-coordinate of the initial mouse position when drag starts
    let startX;
    
    // The scroll position when drag started
    // Used to calculate the total scroll amount
    let scrollLeft;

    /**
     * Event Listener: mousedown
     * Triggered when user clicks/holds down the mouse button
     * Initializes the drag state variables
     */
    container.addEventListener('mousedown', (e) => {
      /**
       * Set isDown to true - we're now in dragging state
       * This flag is checked by the mousemove handler
       */
      isDown = true;
      
      /**
       * Add 'active' class for potential CSS styling during drag
       * This class can be used in CSS to apply active state styles
       */
      container.classList.add('active');
      
      /**
       * Calculate startX - the mouse X position relative to the container
       * e.pageX - Mouse position relative to the entire document
       * container.offsetLeft - The container's position relative to document
       * Result: Mouse position relative to container's left edge
       */
      startX = e.pageX - container.offsetLeft;
      
      /**
       * Store the current scroll position
       * container.scrollLeft - Current horizontal scroll amount in pixels
       * Used later to calculate how much to scroll
       */
      scrollLeft = container.scrollLeft;
      
      /**
       * Change cursor to 'grabbing' icon
       * Visual feedback that the user is actively dragging
       */
      container.style.cursor = 'grabbing';
    });

    /**
     * Event Listener: mouseleave
     * Triggered when mouse leaves the container while dragging
     * Stops the drag operation and resets state
     */
    container.addEventListener('mouseleave', () => {
      /**
       * Set isDown to false - stop dragging
       * The mousemove handler will check this and return early
       */
      isDown = false;
      
      /**
       * Remove 'active' class - no longer actively dragging
       * CSS transitions back to normal state
       */
      container.classList.remove('active');
      
      /**
       * Reset cursor to 'grab' icon
       * Indicates to user that they can click to drag again
       */
      container.style.cursor = 'grab';
    });

    /**
     * Event Listener: mouseup
     * Triggered when user releases the mouse button
     * Stops the drag operation
     */
    container.addEventListener('mouseup', () => {
      /**
       * Set isDown to false - stop dragging
       * dragging only happens while both mousedown and mousemove occur
       */
      isDown = false;
      
      /**
       * Remove 'active' class - no longer actively dragging
       */
      container.classList.remove('active');
      
      /**
       * Reset cursor to 'grab' icon
       * User can drag again by clicking
       */
      container.style.cursor = 'grab';
    });

    /**
     * Event Listener: mousemove
     * Triggered repeatedly as the mouse moves
     * Calculates scroll position based on mouse movement
     * This is the core function that implements the drag-to-scroll
     */
    container.addEventListener('mousemove', (e) => {
      /**
       * Early return if not currently dragging
       * if (!isDown) means "if isDown is false, exit early"
       * This prevents scrolling when the mouse button isn't pressed
       */
      if (!isDown) return;
      
      /**
       * preventDefault() stops default browser behaviors
       * In this case, prevents text selection during drag
       * Makes for a smoother, more natural dragging experience
       */
      e.preventDefault();
      
      /**
       * Calculate current X position relative to container
       * Same calculation as startX, but for the current position
       * e.pageX - current mouse X position relative to document
       * container.offsetLeft - container's left position
       */
      const x = e.pageX - container.offsetLeft;
      
      /**
       * Calculate how far the mouse has moved since drag started
       * x - startX = distance moved (positive = right, negative = left)
       * * 2 = multiplier that speeds up scrolling relative to mouse movement
       * Without the *2, scrolling would be 1:1 with mouse movement (too slow)
       */
      const walk = (x - startX) * 2;
      
      /**
       * Update the scroll position
       * scrollLeft - walk means we subtract the distance moved
       * This creates the intuitive behavior where dragging right scrolls right
       * 
       * Example:
       * - If user drags right: x > startX, walk is positive
       *   scrollLeft - positive = moves view left (revealing right content)
       * - If user drags left: x < startX, walk is negative
       *   scrollLeft - negative = adds to scrollLeft (revealing left content)
       */
      container.scrollLeft = scrollLeft - walk;
    });
  });
});
