import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Lista({ items, Icon }) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

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
        {items.map((item, index) => (
          <Box
            key={index}
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
            onClick={() => setSelectedItemIndex(index)} // Optional: Handle item selection
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
              {/* Optional Likes/Dislikes (if applicable) */}
              {typeof item.likes === 'number' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FavoriteBorderIcon fontSize="small" sx={{ color: 'green' }} />
                  <Typography variant="body2">{item.likes}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}