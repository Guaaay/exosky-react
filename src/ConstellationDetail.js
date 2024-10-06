import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import Heading from './Heading';

const ConstellationDetail = () => {
  const { id } = useParams(); // Obtén el id desde los parámetros de la URL
  const [constellation, setConstellation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstellationDetails = async () => {
      try {
        const response = await fetch(`https://api.exomythology.earth/api/constellations/${id}`); // Usa `id` en la llamada
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConstellation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConstellationDetails();
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
    return (
      <Box sx={{ padding: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column', // Cambia a columna
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        // backgroundImage: 'url("/path/to/your/background.jpg")', // Cambia a la ruta de tu imagen de fondo
        // backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      
      {/* Título y descripción de la constelación */}
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
        {constellation.name} {/* Usa el nombre de la constelación */}
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
        {constellation.description} {/* Usa la descripción de la constelación */}
      </Typography>

    </Container>
  );
};

export default ConstellationDetail;
