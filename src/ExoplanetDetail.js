import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Heading from './Heading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ExoplanetDetail = () => {
  const { id } = useParams(); // Obtiene el id desde la URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { item } = location.state || {}; // Safely retrieve the passed item
  const iframeRef = useRef(null); // Create a reference for the iframe element
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

  // useEffect to send parent URL after the iframe is loaded
  useEffect(() => {
    if (iframeRef.current) {
      // Wait for the iframe to load before sending the message
      iframeRef.current.onload = () => {
        // Send the current page URL to the iframe (Godot game)
        iframeRef.current.contentWindow.postMessage(
          window.location.href, // Sending the parent URL
          '*' // Target origin, use '*' for any origin or specify a specific domain
        );
      };
    }
  }, []);


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
        {item.name}
      </Typography>
      <Typography variant="body1">
        Discovered in {item.year} by {item.facility} using {item.method}.
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
          width: '1280px',
          height: '640px',
          mt: 10,
          overflow: 'hidden',
        }}
      >
       <iframe
          ref={iframeRef} // Assign the ref to the iframe
          src={`https://html.itch.zone/html/11659225/game2/index.html?id=${item.id}&planet_ra=${item.ra}&planet_dec=${item.dec}`}
          allowtransparency="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          msallowfullscreen="true"
          frameborder="0"
          allowfullscreen="true"
          id="game_drop"
          allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated; web-share"
          scrolling="no"
          style={{
            width: '100%',
            height: '100%',
          }}
        ></iframe>

      </Box>
    </Box>
  );
};

export default ExoplanetDetail;