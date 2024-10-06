import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

export default function Lista({ items, Icon }) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const navigate = useNavigate();

  // Usa el id en lugar de index para redirigir a la subpágina correspondiente
  const handleItemClick = (id,item) => {
    setSelectedItemIndex(id);
    navigate(`/exoplanets/exo?id=${id}&planet_ra=${item.ra}&planet_dec=${item.dec}`, { state: { item } });
  };

  return (
    <Container id="features" sx={{ py: { xs: 4, sm: 7 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 2,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}  // Usa el id como key
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
            onClick={() => handleItemClick(item.id, item)}  // Usa el id en lugar de index

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
                  flexDirection: 'row', // Display icon and name in a row
                  alignItems: 'center', // Vertically center icon and name
                  gap: 1,
                  textAlign: 'left',
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              >
                {Icon && <Icon />} {/* Display the passed Icon component */}
                <Typography variant="h6">{item.name}</Typography> {/* Name of the item */}
              </Box>
              <Typography variant="body2" color="text.primary">
                Discovered in {item.year} by {item.facility} using {item.method}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
