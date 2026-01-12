import React, { useEffect, useState } from 'react';
// Import the ItemCard component - displays individual items in a card format
import ItemCard from '../components/ItemCard';
// Import the DetailModal component - shows detailed information in a popup
import DetailModal from '../components/DetailModal';
// Import custom CSS styles for this component
import '../style/home.css';

/**
 * Home Component - Main landing page displaying all Star Wars items in horizontal scroll sections
 * 
 * Features:
 * - Displays all Categories (Characters, Planets, Species, Starships, Vehicles) in a single page
 * - Uses horizontal scrolling (right-to-left) for each section
 * - Modal popup for detailed item information when "Learn More" is clicked
 * - Animated starfield background for Star Wars aesthetic
 * - Responsive design that adapts to mobile, tablet, and desktop screens
 * - Parallel data fetching from SWAPI for optimal performance
 * - Loading state while data is being fetched
 * 
 * State Management:
 * - characters, planets, species, starships, vehicles: Store fetched items from API
 * - loading: Boolean to track if data is being fetched
 * - selectedItem: Currently selected item to display in modal
 * - selectedType: Type of selected item (characters, planets, etc.)
 * - isModalOpen: Boolean to control modal visibility
 */
const Home = () => {
  // ========================================================================
  // State Declarations
  // ========================================================================
  
  // State to store all characters fetched from API
  const [characters, setCharacters] = useState([]);
  // State to store all planets fetched from API
  const [planets, setPlanets] = useState([]);
  // State to store all species fetched from API
  const [species, setSpecies] = useState([]);
  // State to store all starships fetched from API
  const [starships, setStarships] = useState([]);
  // State to store all vehicles fetched from API
  const [vehicles, setVehicles] = useState([]);
  // State to track if data is currently being fetched
  const [loading, setLoading] = useState(true);

  // Modal state - holds the item selected by user to view details
  const [selectedItem, setSelectedItem] = useState(null);
  // Modal state - stores the type of item (characters, planets, etc.)
  const [selectedType, setSelectedType] = useState(null);
  // Modal state - controls whether the modal popup is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ========================================================================
  // Effect Hook: Fetch Data from API
  // ========================================================================
  
  /**
   * useEffect hook that runs once when component mounts
   * Fetches data from SWAPI (Star Wars API) for all item types in parallel
   * Empty dependency array [] means this runs only once on component mount
   */
  useEffect(() => {
    /**
     * Async function to fetch all data from SWAPI
     * Uses Promise.all() to fetch all categories in parallel for better performance
     */
    const fetchAllData = async () => {
      try {
        // Set loading to true while fetching data
        setLoading(true);
        
        // Base URL for all API requests
        const baseURL = 'https://www.swapi.tech/api';

        // Fetch all categories in parallel using Promise.all()
        // This is more efficient than fetching one by one sequentially
        const [charRes, planRes, specRes, shipRes, vehRes] = await Promise.all([
          // Fetch all characters from SWAPI
          fetch(`${baseURL}/people/`),
          // Fetch all planets from SWAPI
          fetch(`${baseURL}/planets/`),
          // Fetch all species from SWAPI
          fetch(`${baseURL}/species/`),
          // Fetch all starships from SWAPI
          fetch(`${baseURL}/starships/`),
          // Fetch all vehicles from SWAPI
          fetch(`${baseURL}/vehicles/`)
        ]);

        // Parse all responses from JSON format to JavaScript objects
        // .json() method reads the response body and parses it as JSON
        const charData = await charRes.json();
        const planData = await planRes.json();
        const specData = await specRes.json();
        const shipData = await shipRes.json();
        const vehData = await vehRes.json();

        // Update state with fetched data
        // data.results contains the array of items from each API response
        // || [] provides fallback empty array if results is undefined
        setCharacters(charData.results || []);
        setPlanets(planData.results || []);
        setSpecies(specData.results || []);
        setStarships(shipData.results || []);
        setVehicles(vehData.results || []);

        // Set loading to false - data fetching is complete
        setLoading(false);
      } catch (error) {
        // Log any errors that occur during the fetch process
        console.error('Error fetching data:', error);
        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    // Call the async function to start fetching data
    fetchAllData();
  }, []); // Empty dependency array - this effect runs only once on mount

  // ========================================================================
  // Event Handler Functions
  // ========================================================================
  
  /**
   * Handle opening the detail modal when user clicks "Learn More" button
   * 
   * @param {Object} item - The item object selected by the user
   * @param {string} type - The type of item (characters, planets, species, starships, vehicles)
   */
  const handleLearnMore = (item, type) => {
    // Store the selected item in state
    setSelectedItem(item);
    // Store the type of the selected item
    setSelectedType(type);
    // Set modal visibility to true - this causes the modal to render
    setIsModalOpen(true);
  };

  /**
   * Handle closing the detail modal
   * Resets all modal-related state to their initial values
   */
  const handleCloseModal = () => {
    // Set modal visibility to false - this hides the modal
    setIsModalOpen(false);
    // Clear the selected item
    setSelectedItem(null);
    // Clear the selected type
    setSelectedType(null);
  };

  // ========================================================================
  // Effect Hook: Initialize Starfield Animation
  // ========================================================================
  
  /**
   * useEffect hook that creates and animates the starfield background
   * Creates a canvas element and draws animated stars on it
   * Empty dependency array means this runs only once on component mount
   */
  useEffect(() => {
    // Get the canvas element from the DOM with id "starfield"
    const canvas = document.getElementById('starfield');
    // If canvas doesn't exist, exit the function early
    if (!canvas) return;

    // Get the 2D rendering context - allows us to draw on the canvas
    const ctx = canvas.getContext('2d');

    /**
     * Function to resize the canvas to match the window dimensions
     * Called on mount and whenever the window is resized
     */
    function resizeCanvas() {
      // Set canvas width to match the window width
      canvas.width = window.innerWidth;
      // Set canvas height to match the window height
      canvas.height = window.innerHeight;
    }

    // Call resizeCanvas to set initial dimensions
    resizeCanvas();

    /**
     * Create an array of 200 star objects with random properties
     * Array.from() creates an array of specified length
     * {} is the mapping function that creates each star object
     */
    const stars = Array.from({ length: 200 }, () => ({
      // Random X position between 0 and canvas width
      x: Math.random() * canvas.width,
      // Random Y position between 0 and canvas height
      y: Math.random() * canvas.height,
      // Random radius between 0 and 1.5 pixels for size variation
      radius: Math.random() * 1.5,
      // Random downward speed between 0.1 and 0.6 pixels per frame
      speed: Math.random() * 0.5 + 0.1
    }));

    /**
     * Animation function that runs every frame using requestAnimationFrame
     * Updates star positions and redraws them
     */
    function animate() {
      // Clear the canvas - removes all previously drawn content
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Set the fill color to white for the stars
      ctx.fillStyle = 'white';

      // Loop through each star and update/draw it
      stars.forEach(star => {
        // Move the star down by adding its speed to the Y position
        star.y += star.speed;
        // Check if star has moved below the visible canvas
        if (star.y > canvas.height) {
          // Reset the star to the top of the canvas
          star.y = 0;
          // Give it a new random X position for variety
          star.x = Math.random() * canvas.width;
        }
        // Draw the star as a filled circle
        ctx.beginPath();
        // beginPath() starts a new path
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        // arc() draws a circle at coordinates with specified radius
        ctx.fill();
        // fill() fills the circle with the fillStyle color
      });

      // Call animate again on the next animation frame
      // This creates a continuous animation loop
      requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();

    // Add a resize event listener to handle window resizing
    window.addEventListener('resize', resizeCanvas);
    
    // Return cleanup function that runs when component unmounts
    return () => {
      // Remove the resize event listener to prevent memory leaks
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Empty dependency array - this effect runs only once on mount

  // ========================================================================
  // Render Loading State
  // ========================================================================
  
  // Check if data is still loading
  if (loading) {
    // Return loading UI while data is being fetched
    return (
      <div className="home">
        {/* Starfield canvas background */}
        <canvas id="starfield" className="starfield-canvas" />
        {/* Loading message container */}
        <div className="loading-container">
          <h2>Loading the galaxy...</h2>
        </div>
      </div>
    );
  }

  // ========================================================================
  // Render Main Content
  // ========================================================================
  
  return (
    <div className="home">
      {/* Canvas element for the animated starfield background */}
      <canvas id="starfield" className="starfield-canvas" />

      {/* Main content wrapper - provides padding and max-width */}
      <div className="content-wrapper">
        {/* Page header section with title and subtitle */}
        <header className="home-header">
          {/* Main Star Wars title */}
          <h1 className="star-wars-title">STAR WARS</h1>
          {/* Subtitle text */}
          <h2 className="subtitle">Explore the Galaxy</h2>
        </header>

        {/* Main content area containing all item sections */}
        <main className="home-main">
          
          {/* ============================================================ */}
          {/* CHARACTERS SECTION - Horizontal scrolling section */}
          {/* ============================================================ */}
          <section className="items-section" style={{ '--section-color': '#E91E63' }}>
            {/* Section title */}
            <h2>CHARACTERS</h2>
            {/* Horizontal scrolling container for character cards */}
            <div className="items-scroll-container">
              {/* Grid that scrolls horizontally */}
              <div className="items-grid">
                {/* Map through first 8 characters and create a card for each */}
                {characters.slice(0, 8).map((character) => (
                  // ItemCard component displays individual character in a card
                  <ItemCard
                    key={character.uid} // Unique identifier for React list rendering
                    item={character} // Pass the character object
                    type="characters" // Specify this is a character type
                    onLearnMore={() => handleLearnMore(character, 'characters')} // Handle learn more click
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* PLANETS SECTION - Horizontal scrolling section */}
          {/* ============================================================ */}
          <section className="items-section" style={{ '--section-color': '#4A90E2' }}>
            {/* Section title */}
            <h2>PLANETS</h2>
            {/* Horizontal scrolling container for planet cards */}
            <div className="items-scroll-container">
              {/* Grid that scrolls horizontally */}
              <div className="items-grid">
                {/* Map through first 8 planets and create a card for each */}
                {planets.slice(0, 8).map((planet) => (
                  // ItemCard component displays individual planet in a card
                  <ItemCard
                    key={planet.uid} // Unique identifier for React list rendering
                    item={planet} // Pass the planet object
                    type="planets" // Specify this is a planet type
                    onLearnMore={() => handleLearnMore(planet, 'planets')} // Handle learn more click
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SPECIES SECTION - Horizontal scrolling section */}
          {/* ============================================================ */}
          <section className="items-section" style={{ '--section-color': '#8BC34A' }}>
            {/* Section title */}
            <h2>SPECIES</h2>
            {/* Horizontal scrolling container for species cards */}
            <div className="items-scroll-container">
              {/* Grid that scrolls horizontally */}
              <div className="items-grid">
                {/* Map through first 8 species and create a card for each */}
                {species.slice(0, 8).map((specie) => (
                  // ItemCard component displays individual specie in a card
                  <ItemCard
                    key={specie.uid} // Unique identifier for React list rendering
                    item={specie} // Pass the specie object
                    type="species" // Specify this is a species type
                    onLearnMore={() => handleLearnMore(specie, 'species')} // Handle learn more click
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* STARSHIPS SECTION - Horizontal scrolling section */}
          {/* ============================================================ */}
          <section className="items-section" style={{ '--section-color': '#FF9800' }}>
            {/* Section title */}
            <h2>STARSHIPS</h2>
            {/* Horizontal scrolling container for starship cards */}
            <div className="items-scroll-container">
              {/* Grid that scrolls horizontally */}
              <div className="items-grid">
                {/* Map through first 8 starships and create a card for each */}
                {starships.slice(0, 8).map((starship) => (
                  // ItemCard component displays individual starship in a card
                  <ItemCard
                    key={starship.uid} // Unique identifier for React list rendering
                    item={starship} // Pass the starship object
                    type="starships" // Specify this is a starship type
                    onLearnMore={() => handleLearnMore(starship, 'starships')} // Handle learn more click
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* VEHICLES SECTION - Horizontal scrolling section */}
          {/* ============================================================ */}
          <section className="items-section" style={{ '--section-color': '#9C27B0' }}>
            {/* Section title */}
            <h2>VEHICLES</h2>
            {/* Horizontal scrolling container for vehicle cards */}
            <div className="items-scroll-container">
              {/* Grid that scrolls horizontally */}
              <div className="items-grid">
                {/* Map through first 8 vehicles and create a card for each */}
                {vehicles.slice(0, 8).map((vehicle) => (
                  // ItemCard component displays individual vehicle in a card
                  <ItemCard
                    key={vehicle.uid} // Unique identifier for React list rendering
                    item={vehicle} // Pass the vehicle object
                    type="vehicles" // Specify this is a vehicle type
                    onLearnMore={() => handleLearnMore(vehicle, 'vehicles')} // Handle learn more click
                  />
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ============================================================== */}
      {/* Detail Modal Component - Shows detailed item information */}
      {/* ============================================================== */}
      
      {/* DetailModal component displays full item information in a popup */}
      <DetailModal
        isOpen={isModalOpen} // Controls whether the modal is visible
        onClose={handleCloseModal} // Function to call when closing the modal
        item={selectedItem} // The item object to display details for
        type={selectedType} // The type of item being displayed
      />
    </div>
  );
};

// Export the Home component for use in other parts of the application
export default Home;