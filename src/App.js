// src/App.js
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './ResponsiveAppBar';
import LandingPage from './Landing' ;
import Exoplanets from './Exoplanets';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasePack from './BasePack';
import Constellations from './Constellations';
import About from './About';
import ExoplanetDetail from './ExoplanetDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* BasePack wraps around all the routes */}
        <Route element={<BasePack />}>
          {/* Route for LandingPage (root path) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Route for the Exoplanets page */}
          <Route path="/exoplanets" element={<Exoplanets />} />

          {/* Dynamic route for individual Exoplanet details */}
          <Route path="/exoplanets/:id" element={<ExoplanetDetail />} /> {/* Ruta dinámica para /exoplanets/{id} */}

          {/* Route for the Constellations page */}
          <Route path="/constellations" element={<Constellations />} />

          {/* Route for the About page */}
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
