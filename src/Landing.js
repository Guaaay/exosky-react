import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getMPTheme from './theme/getMPTheme';
import Heading from './Heading';
import Box from '@mui/material/Box';

export default function LandingPage() {
  return (
    <Box sx={{ padding: 8 }}>

      <div>

        <Hero />
        {/* <Heading heading="Create your own mithology" /> */}
          {/* <LogoCollection /> */}
          {/* <Features /> */}
          {/* <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider /> */}
          {/* <Pricing /> */}
          {/* <Divider /> */}
          {/* <FAQ /> */}
          {/* <Divider /> */}
          {/* <Footer /> */}
        </div>
      {/* // </ThemeProvider> */}
    </Box>
  );
}