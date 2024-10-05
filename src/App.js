// src/App.js
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './ResponsiveAppBar';
import LandingPage from './Landing' ;
import AlignItemsList from './List';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
      <LandingPage />
    );
}

export default App;
