// Step 2: Create a theme.js file or similar

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Example primary color
    },
    secondary: {
      main: '#19857b', // Example secondary color
    },
    // Add other colors or customization as needed
  },
});

export default theme;