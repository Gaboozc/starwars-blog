import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './Context/FavoriteContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CharacterList from './pages/CharacterList';
import PlanetList from './pages/PlanetList';
import SpeciesList from './pages/SpeciesList';
import StarshipList from './pages/StarshipList';
import VehiclesList from './pages/VehicleList'; // NEW

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/planets" element={<PlanetList />} />
          <Route path="/species" element={<SpeciesList />} />
          <Route path="/starships" element={<StarshipList />} />
          <Route path="/vehicles" element={<VehiclesList />} /> {/* NEW */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;