import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";
import StarshipList from "./pages/StarshipList";
import PlanetList from "./pages/PlanetList";
import SpeciesList from "./pages/SpeciesList";
import VehiclesList from "./pages/VehiclesList";
import CharacterDetail from "./pages/CharacterDetail";
import StarshipDetail from "./pages/StarshipDetail";
import PlanetDetail from "./pages/PlanetDetail";
import SpeciesDetail from "./pages/SpeciesDetail";
import VehicleDetail from "./pages/VehicleDetail"; // Make sure this matches your actual filename

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<h1>Have you heard the tragedy of Darth Plagueis?</h1>}
    >
      <Route index element={<Home />} />
      <Route path="characters" element={<CharacterList />} />
      <Route path="starships" element={<StarshipList />} />
      <Route path="planets" element={<PlanetList />} />
      <Route path="species" element={<SpeciesList />} />
      <Route path="vehicles" element={<VehiclesList />} />
      <Route path="characters/:id" element={<CharacterDetail />} />
      <Route path="starships/:id" element={<StarshipDetail />} />
      <Route path="planets/:id" element={<PlanetDetail />} />
      <Route path="species/:id" element={<SpeciesDetail />} />
      <Route path="vehicles/:id" element={<VehicleDetail />} />
    </Route>
  )
);