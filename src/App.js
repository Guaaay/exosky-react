// src/App.js
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './ResponsiveAppBar';
import LandingPage from './Landing' ;
import AlignItemsList from './List';
import Exoplanets from './Exoplanets';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasePack from './BasePack';
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

          {/* Route for the Constellations page */}
          <Route path="/constellations" element={<Exoplanets />} />

          {/* Route for the About page */}
          <Route path="/about" element={<Exoplanets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
