import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material';
import Lista from './Lista';
import InsightsIcon from '@mui/icons-material/Insights';
import Heading from './Heading';

export default function Constellations() {
    const constellations = [
        { name: 'Orion', info: 'A prominent constellation located on the celestial equator and visible throughout the world.' , likes:150},
        { name: 'Ursa Major', info: 'Known as the Great Bear, Ursa Major contains the Big Dipper asterism.',  likes:17},
        { name: 'Cassiopeia', info: 'A constellation named after the queen Cassiopeia in Greek mythology, known for its distinctive "W" shape.',  likes:600 },
        { name: 'Scorpius', info: 'A large and bright constellation located in the southern hemisphere.',  likes:0},
        { name: 'Andromeda', info: 'Named after the mythological princess Andromeda, it contains the Andromeda Galaxy.',  likes:3 },
      ];
      
    return (
        <Box sx={{ padding: 8 }}>
        <Heading heading="See what others have created" />
        <Lista items={constellations}  Icon={InsightsIcon} />
        </Box>
    );
}
