import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Heading from './Heading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ExoplanetDetail = () => {
  const { id } = useParams(); // Obtiene el id desde la URL
  const [exoplanet, setExoplanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // Estado para visibilidad del formulario
  const [formData, setFormData] = useState({
    constellation: '',
    creator: '',
    myth: '',
    audio: null,
  });


  // Función para cambiar la visibilidad desde el código
  const showForm = () => {
    setIsVisible(true); // Muestra el formulario
  };

  const hideForm = () => {
    setIsVisible(false); 
  };

  useEffect(() => {
    const fetchExoplanetDetails = async () => {
      try {
        const response = await fetch(`https://api.exomythology.earth/api/exoplanets/${id}`); // Suponiendo que tienes un endpoint para obtener el exoplaneta por id
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

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'audio') {
      setFormData({ ...formData, [name]: files[0] }); // Set the file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('constellation', formData.constellation);
    data.append('creator', formData.creator);
    data.append('myth', formData.myth);
    data.append('audio', formData.audio); // Append the audio file

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to upload the form');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Optionally reset form or show success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200vh',
      }}
    >
      <Typography variant="h2" gutterBottom>
        {exoplanet.pl_name}
      </Typography>
      <Typography variant="body1">
        Discovered in {exoplanet.disc_year} by {exoplanet.disc_facility} using {exoplanet.discoverymethod}.
      </Typography>

      {/* Lógica del formulario */}
      {isVisible && (
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mt: 2,
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            hiddenLabel
            id="filled-hidden-label-constellation"
            variant="filled"
            size="small"
            placeholder="Constellation name"
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-creator"
            variant="filled"
            size="small"
            placeholder="Creator"
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-myth"
            variant="filled"
            size="small"
            placeholder="Myth"
            fullWidth
          />
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleChange} // Handle audio file selection
            style={{ display: 'none' }} // Hide default input
            id="audio-upload" // Give it an ID for the label
          />
          <label htmlFor="audio-upload">
            <Button variant="contained" component="span">
              Upload Audio
            </Button>
          </label>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      )}

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
          src="/game/index.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Godot Game"
        />
      </Box>
    </Box>
  );
};

export default ExoplanetDetail;
