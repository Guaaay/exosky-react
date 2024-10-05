import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import Lista from './Lista-Const';
import PublicIcon from '@mui/icons-material/Public';
import Heading from './Heading';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


export default function Constellations() {
  const [constellations, setConstellations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstellations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/constellations'); // Adjusted API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const formattedData = data.map(constellation => ({
          id_exoplanet: constellation.id_exoplanet, // Assuming the API provides this field
          name: constellation.name,
          info: constellation.description, // Using "description" as "info"
          user: constellation.user, // If you need to display user, include this as well
          likes: constellation.likes,
        }));

        setConstellations(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConstellations();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 8 }}>
      <Heading heading="Select Your Constellation!" />
      <Lista items={constellations} Icon={AutoGraphIcon} />
    </Box>
  );
}