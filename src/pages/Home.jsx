import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';

/**
 * Home Component - The main landing page for the Star Wars application
 * Features:
 * - Starfield animation background
 * - Grid of interactive category cards
 * - Responsive design
 * - Hover effects and animations
 */
const Home = () => {
  // Array of section data for the category cards
  const sections = [
    // Planets Section
    {
      title: "PLANETS",
      description: "Travel across the galaxy to the many planets.",
      path: "/planets",
      image: "https://i.pinimg.com/originals/e8/72/41/e87241e1668e8476722a216979dbdacc.gif",
      alt: "Animated Star Wars planets",
      accentColor: "#4A90E2" // Blue accent
    },
    // Starships Section
    {
      title: "STARSHIPS",
      description: "Discover the iconic starships of Star Wars.",
      path: "/starships",
      image: "https://media1.giphy.com/media/Qvqel9RwUS2ethQe2c/giphy.gif",
      alt: "Animated starships flying",
      accentColor: "#FF9800" // Orange accent
    },
    // Characters Section
    {
      title: "CHARACTERS",
      description: "Meet heroes, villains, and everything in between.",
      path: "/characters",
      image: "https://i.pinimg.com/originals/08/29/e8/0829e84cc1e842767bfd62357db9b108.gif",
      alt: "Star Wars characters",
      accentColor: "#E91E63" // Pink accent
    },
    // Species Section
    {
      title: "SPECIES",
      description: "Explore the galaxy's diverse species.",
      path: "/species",
      image: "https://pa1.aminoapps.com/7263/79e7087f1d35b6a1f62298c088d70287b909b8cer1-256-256_00.gif",
      alt: "Star Wars species",
      accentColor: "#8BC34A" // Green accent
    },
    // NEW: Vehicles Section
    {
      title: "VEHICLES",
      description: "Discover the legendary vehicles of the Star Wars universe.",
      path: "/vehicles",
      image: "https://pa1.aminoapps.com/8157/07cbf9a33284c39d3c841831847fb503fef4319fr1-523-200_hq.gif",
      alt: "Star Wars vehicles in action",
      accentColor: "#9C27B0" // Purple accent
    },
    // NEW: Films Section
    {
      title: "FILMS",
      description: "Relive the epic saga of the Star Wars films.",
      path: "/films",
      image: "https://m.media-amazon.com/images/I/91KxW0uLTxL._UF894,1000_QL80_.jpg",
      alt: "Star Wars film scenes",
      accentColor: "#F44336" // Red accent
    }
  ];

  /**
   * useEffect hook to initialize and animate the starfield background
   * Creates a canvas with moving stars for a space effect
   */
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    // Get canvas context and set initial dimensions
    const ctx = canvas.getContext('2d');
    
    // Handle canvas resizing
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Set initial canvas size
    resizeCanvas();

    // Create array of stars with random positions and properties
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1
    }));

    // Animation function for the starfield
    function animate() {
      // Clear the canvas for each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      // Update and draw each star
      stars.forEach(star => {
        star.y += star.speed;
        // Reset star position when it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Continue the animation loop
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="home">
      {/* Starfield Canvas Background */}
      <canvas id="starfield" className="starfield-canvas" />
      
      {/* Main Content Wrapper */}
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="home-header">
          <h1 className="star-wars-title">STAR WARS</h1>
          <h2 className="subtitle">A New Perspective on the Galaxy Far, Far Away</h2>
        </header>

        {/* Grid of Category Cards */}
        <main className="sections-grid">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="section-card"
              style={{ '--accent-color': section.accentColor }} // CSS variable for accent color
            >
              {/* Glow Effect Container */}
              <div className="glow-frame">
                {/* Section Image */}
                <img
                  src={section.image}
                  alt={section.alt}
                  className="section-gif"
                  loading="lazy" // Lazy load for better performance
                  width={400}
                  height={300}
                />
              </div>
              
              {/* Section Information */}
              <div className="section-info">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                {/* Link to Section Page */}
                <Link 
                  to={section.path} 
                  className="explore-btn"
                  style={{ backgroundColor: section.accentColor }}
                >
                  Explore {section.title}
                </Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;