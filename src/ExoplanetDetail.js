import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Heading from './Heading';

const ExoplanetDetail = () => {
  const { id } = useParams(); // Obtiene el id desde la URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { item } = location.state || {}; // Safely retrieve the passed item
  const iframeRef = useRef(null); // Create a reference for the iframe element

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
        {item.name}
      </Typography>
      <Typography variant="body1">
        Discovered in {item.year} by {item.facility} using {item.method}.
      </Typography>

      {/* Embed the Godot game using an iframe */}
      <Box
        sx={{
          width: '1280px',
          height: '640px', // Adjust the height as needed
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