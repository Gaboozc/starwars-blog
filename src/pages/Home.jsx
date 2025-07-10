import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
  const sections = [
    {
      title: "PLANETS",
      description: "Travel across the galaxy to the many planets.",
      path: "/planets",
      image: "https://i.pinimg.com/originals/e8/72/41/e87241e1668e8476722a216979dbdacc.gif",
      alt: "Animated Star Wars planets",
      accentColor: "#4A90E2"
    },
    {
      title: "STARSHIPS",
      description: "Discover the iconic starships of Star Wars.",
      path: "/starships",
      image: "https://media1.giphy.com/media/Qvqel9RwUS2ethQe2c/giphy.gif",
      alt: "Animated starships flying",
      accentColor: "#FF9800"
    },
    {
      title: "CHARACTERS",
      description: "Meet heroes, villains, and everything in between.",
      path: "/characters",
      image: "https://i.pinimg.com/originals/08/29/e8/0829e84cc1e842767bfd62357db9b108.gif",
      alt: "Star Wars characters",
      accentColor: "#E91E63"
    },
    {
      title: "SPECIES",
      description: "Explore the galaxy's diverse species.",
      path: "/species",
      image: "https://pa1.aminoapps.com/7263/79e7087f1d35b6a1f62298c088d70287b909b8cer1-256-256_00.gif",
      alt: "Star Wars species",
      accentColor: "#8BC34A"
    }
  ];

  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="home">
      <canvas id="starfield" className="starfield-canvas" />
      
      <div className="content-wrapper">
        <header className="home-header">
          <h1 className="star-wars-title">STAR WARS</h1>
          <h2 className="subtitle">A New Perspective on the Galaxy Far, Far Away</h2>
        </header>

        <main className="sections-grid">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="section-card"
              style={{ '--accent-color': section.accentColor }}
            >
              <div className="glow-frame">
                <img
                  src={section.image}
                  alt={section.alt}
                  className="section-gif"
                  loading="lazy"
                  width={400}
                  height={300}
                />
              </div>
              <div className="section-info">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
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