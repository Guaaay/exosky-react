import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material';
import Lista from './Lista';
import PublicIcon from '@mui/icons-material/Public';
import Heading from './Heading';

export default function Exoplanets() {
  
  //sustituir esto leyendo el csv
  const exoplanets = [
    { name: 'Proxima Centauri b', info: 'An Earth-sized exoplanet orbiting Proxima Centauri.' },
    { name: 'Kepler-452b', info: 'The first near-Earth-size planet discovered in the habitable zone.' },
    { name: 'TRAPPIST-1e', info: 'One of the seven Earth-sized planets orbiting the ultracool dwarf star TRAPPIST-1.' },
    { name: 'LHS 1140 b', info: 'A super-Earth exoplanet located 40 light-years away in the constellation of Centaurus.' },
    { name: 'HD 209458 b', info: 'An exoplanet in the constellation Pegasus that is the first to have its atmosphere detected.' },
  ];

  return (
    <Box sx={{ padding: 8 }}>
      <Heading heading="Select Your Exoplanet!" />
      <Lista items={exoplanets} Icon={PublicIcon} />
    </Box>
  );
}
