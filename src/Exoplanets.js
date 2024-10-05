import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material';
import Lista from './Lista';
import PublicIcon from '@mui/icons-material/Public';
import Heading from './Heading';

export default function Exoplanets() {
  const [exoplanets, setExoplanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExoplanets = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/exoplanets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

          const formattedData = data.map(exoplanet => ({
            name: exoplanet.pl_name,
            year: exoplanet.disc_year,
            method: exoplanet.discoverymethod,
            facility: exoplanet.disc_facility,
          }));
  
        setExoplanets(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExoplanets();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  return (
    <Box sx={{ padding: 8 }}>
      <Heading heading="Select Your Exoplanet!" />
      <Lista items={exoplanets} Icon={PublicIcon} />
    </Box>
  );
}
