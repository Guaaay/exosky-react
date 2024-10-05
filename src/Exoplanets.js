import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material';
import Features from './components/Features';

const fetchExoplanets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Proxima Centauri b', info: 'An Earth-sized exoplanet orbiting Proxima Centauri.' },
        { name: 'Kepler-452b', info: 'The first near-Earth-size planet discovered in the habitable zone.' },
        { name: 'TRAPPIST-1e', info: 'One of the seven Earth-sized planets orbiting the ultracool dwarf star TRAPPIST-1.' },
        { name: 'LHS 1140 b', info: 'A super-Earth exoplanet located 40 light-years away in the constellation of Centaurus.' },
        { name: 'HD 209458 b', info: 'An exoplanet in the constellation Pegasus that is the first to have its atmosphere detected.' },
      ]);
    }, 2000); // Simulate a 2-second loading time
  });
};

export default function Exoplanets() {
  const [exoplanets, setExoplanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExoplanets = async () => {
      const data = await fetchExoplanets();
      setExoplanets(data);
      setLoading(false);
    };
    
    loadExoplanets();
  }, []);

  return (
    
    <Box sx={{ padding: 2 }}>
      <Features />
      <Typography variant="h2" gutterBottom>
        Exoplanets
      </Typography>
      <List>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={<Skeleton animation="pulse" variant="text" width="60%" />}
                secondary={<Skeleton animation="pulse" variant="text" width="40%" />}
              />
            </ListItem>
          ))
        ) : (
          exoplanets.map((exoplanet, index) => (
            <ListItem key={index}>
              <ListItemText primary={exoplanet.name} secondary={exoplanet.info} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
