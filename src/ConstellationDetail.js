import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import Heading from './Heading';

const ConstellationDetail = () => {
  const { id } = useParams(); // Obtén el id desde los parámetros de la URL
  const [constellation, setConstellation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exoplanet, setExoplanet] = useState(null); // State for exoplanet data

  useEffect(() => {
    const fetchConstellationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/constellations/${id}`); // Usa `id` en la llamada
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConstellation(data);
        setExoplanet(data.exoplanet); // Assuming exoplanet data is part of the constellation data
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
        backgroundImage: 'url("/path/to/your/background.jpg")', // Cambia a la ruta de tu imagen de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* New Exoplanet Section */}
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '170vh', // Height adjusted
        }}
      >
        <Typography variant="h2" gutterBottom>
          {exoplanet?.pl_name} {/* Use optional chaining to avoid errors if exoplanet is null */}
        </Typography>
        <Typography variant="body1">
          Discovered in {exoplanet?.disc_year} by {exoplanet?.disc_facility} using {exoplanet?.discoverymethod}.
        </Typography>
      </Box>

      {/* Recuadro para la imagen */}
      <Box 
        sx={{ 
          width: '80%', // Ajusta el ancho según sea necesario
          maxWidth: '300px', // Tamaño máximo del cuadrado
          height: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Color de fondo
          borderRadius: 2, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          border: '1px solid white', // Borde blanco
          mb: 4, // Margen inferior para espacio
        }}
      >
        {/* Aquí puedes poner la imagen de la constelación */}
        <img
          src={constellation.imageUrl} // Cambia esto por la propiedad correspondiente de tu constelación
          alt={constellation.name}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }} // Ajustar la imagen al cuadrado
        />
      </Box>

      {/* Título y descripción de la constelación */}
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
        {constellation.name} {/* Usa el nombre de la constelación */}
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
        {constellation.description} {/* Usa la descripción de la constelación */}
      </Typography>

      {/* Espacio para audio */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" mb={2}>
          Audio de la constelación (próximamente) {/* Texto de marcador de posición */}
        </Typography>
        {/* Puedes agregar un reproductor de audio aquí */}
        <audio controls>
          <source src={constellation.audioUrl} type="audio/mpeg" /> {/* Cambia esto por la propiedad correspondiente */}
          Your browser does not support the audio element.
        </audio>
      </Box>
    </Container>
  );
};

export default ConstellationDetail;
