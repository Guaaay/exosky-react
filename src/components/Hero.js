import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard.jpg'})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
      // Remove backgroundImage or keep it as a fallback
      // backgroundImage:
      //   'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
      ...theme.applyStyles('dark', {
        backgroundColor: 'transparent', 
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          backgroundColor: 'transparent', 
              border: 'none', // Remove any border
              boxShadow: 'none', // Remove any box shadow
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' }, 
          backgroundColor: 'transparent', 
          border: 'none', // Remove any border
          boxShadow: 'none', // Remove any box shadow 
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              // fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Ajustar aquí
              backgroundColor: 'transparent', 
              border: 'none', // Remove any border
              boxShadow: 'none', // Remove any box shadow
            }}
          >
            Weaving myths among the&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                // color: 'primary.main',
                color: '#C75050',
                ...theme.applyStyles('dark', {
                  color: '#C75050',
                }),
              })}
            >
              STARS
            </Typography>
          </Typography>
        </Stack>
        {/* <StyledBox id="image" /> */}
      </Container>
    </Box>
  );
}
