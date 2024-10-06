// src/ExoplanetDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Heading from './Heading';

const ExoplanetDetail = () => {
  const { id } = useParams(); // Obtiene el id desde la URL
  const [exoplanet, setExoplanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExoplanetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/exoplanets/${id}`); // Suponiendo que tienes un endpoint para obtener el exoplaneta por id
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExoplanet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExoplanetDetails();
  }, [id]);


  if (loading) {
    return (
      <Box
        sx={{
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        <Heading heading="Loading data... Please wait" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Muestra el error si ocurre
  }

  return (
    <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '170vh',
        }}
      >
        
      <Typography variant="h2" gutterBottom>
        {exoplanet.pl_name}
      </Typography>
      <Typography variant="body1">
        Discovered in {exoplanet.disc_year} by {exoplanet.disc_facility} using {exoplanet.discoverymethod}.
      </Typography>



      {/* Embed the Godot game using an iframe */}
      <Box 
        sx={{ 
          width: '100%', 
          height: '600px', // Adjust the height as needed
          mt: 10,
          overflow: 'hidden',
        }}
      >
        <iframe
          src="URL_TO_YOUR_GODOT_GAME/index.html" // Replace with your actual URL
          style={{ width: '100%', height: '100%', border: 'none' }} 
          title="Godot Game"
        />
      </Box>


    </Box>
  );
};

export default ExoplanetDetail;
