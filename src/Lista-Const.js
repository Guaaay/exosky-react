import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

export default function Lista({ items, Icon }) {
  const navigate = useNavigate();

  // Maneja el clic en un elemento de la lista
  const handleItemClick = (id) => {
    console.log(`Selected ID: ${id}`); // Para verificar
    navigate(`/constellations/${id}`); // Redirige usando el id
  };

  return (
    <Container id="features2" sx={{ py: { xs: 4, sm: 7 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 2,
        }}
      >
        {items.map((item) => ( // Aquí se usa item directamente
          <Box
            key={item.id} // Usa el id como key
            component={Button}
            sx={[ 
              (theme) => ({
                p: 2,
                height: '100%',
                width: '100%',
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }),
            ]}
            onClick={() => handleItemClick(item.id)} // Usa el id directamente
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
                textAlign: 'left',
                textTransform: 'none',
                color: 'text.secondary',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row', // Display icon, name, and likes in a row
                  alignItems: 'center', // Vertically center icon, name, and likes
                  gap: 1,
                  textAlign: 'left',
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              >
                {Icon && <Icon />} {/* Display the passed Icon component */}
                <Typography variant="h6">{item.name}</Typography> {/* Name of the item */}

                {/* Display likes next to the name */}
                {typeof item.likes === 'number' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FavoriteBorderIcon fontSize="small" sx={{ color: 'green' }} />
                    <Typography variant="body2">{item.likes}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Typography variant="body2" color="text.primary">
              {item.info} {/* Display the info parameter */}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}