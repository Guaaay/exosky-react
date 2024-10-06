import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Heading from './Heading';

export default function Constellation() { // Cambié el nombre a "Constellation" para ser específico
  const [constellation, setConstellation] = useState(null); // Cambié a "null" para un solo objeto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstellation = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/constellations/1'); // Ajustado para obtener solo una constelación por ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Si la respuesta de la API es un solo objeto, lo asignamos directamente
        setConstellation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConstellation();
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
        <Typography variant="h6">Loading constellation...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Asegúrate de que "constellation" no sea nulo antes de renderizar
  if (!constellation) {
    return <Typography color="error">No constellation found.</Typography>;
  }

  return (
    <Box sx={{ padding: 8 }}>
      <Heading heading={`Constellation: ${constellation.name}`} />
      <Box
        sx={{
          padding: 2,
          border: '1px solid',
          borderRadius: 1,
          boxShadow: 1,
          marginTop: 2,
        }}
      >
        <Typography variant="h6">ID: {constellation.id}</Typography>
        <Typography variant="body2">Description: {constellation.description}</Typography>
        <Typography variant="body2">User: {constellation.user}</Typography>
        <Typography variant="body2">Likes: {constellation.likes}</Typography>
      </Box>
    </Box>
  );
}

// import React, { useEffect, useState } from 'react';
// import { Box, Skeleton, Typography, CircularProgress } from '@mui/material';
// import Lista from './Lista-Const';
// import PublicIcon from '@mui/icons-material/Public';
// import Heading from './Heading';
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';


// export default function Constellations() {
//   const [constellations, setConstellations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchConstellations = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/constellations'); // Adjusted API endpoint
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         const formattedData = data.map(constellation => ({
//           id: constellation.id,
//           id_exoplanet: constellation.id_exoplanet, // Assuming the API provides this field
//           name: constellation.name,
//           info: constellation.description, // Using "description" as "info"
//           user: constellation.user, // If you need to display user, include this as well
//           likes: constellation.likes,
//         }));

//         setConstellations(formattedData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConstellations();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           padding: 30,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <CircularProgress />
//       <Heading heading="Loading data... Please wait" />
//     </Box>
//     );
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <Box sx={{ padding: 8 }}>
//       <Heading heading="Select Your Constellation!" />
//       <Lista items={constellations} Icon={AutoGraphIcon} />
//     </Box>
//   );
// }