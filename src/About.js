import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from '@mui/material';

export default function About() {
  return (
    <Container id="about" sx={{ py: { xs: 4, sm: 7 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 2,
          mt: 15,
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          Exomythology 🌌
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Since ancient times, humans have looked to the sky to admire the beauty of the stars ✨ and to find in them answers to some of life's deepest questions. From generation to generation, the stars remain in the firmament, protecting our earth and shining for us, but most importantly, serving as an excuse for us to gather and tell <strong>stories</strong> 📖.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Stargazing 🌠 serves as a way to sit in the dark night with our loved ones, friends, and family to share tales of great warriors, fierce beasts, romantic encounters, and passionate friendships. The stories told centuries ago remain relevant today, passing between eras ⌛ and across the world 🌎, adding our own twists and beliefs, helping each of us build our worldview 🌌.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          But... how would these stars look from other worlds? 🪐 What kind of stories could we tell if we saw them from different perspectives? 🔭
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          We want to reclaim the warmth and familiarity that can only be obtained by reading stories under the stunning sky above us 🌠, but viewed from another world: an <strong>exoplanet</strong>. Our deepest desire is to create a gathering place by discovering what kind of epic tales can be told by observing celestial bodies from a new perspective. We long for these stories to be passed down to new generations; to take shape in the river of time ⏳ and in the eyes of new stargazers 🔭 in order to expand their horizons, just as the stories of our ancestors did.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          <strong>Exomythology</strong> is an interactive 3D web platform 🌐 that allows users to create, explore, share, and comment on stories while gazing at the stars, creating and admiring constellations from different exoplanets 🪐. Users will experience the ancient tradition of storytelling under the bright sky of a planet light-years away from our earth 🌌, and they will be encouraged and allowed to share these stories with their peers 👥. <strong>Exomythology</strong> aims to restore our species' curiosity and passion for the most arcane knowledge found in the stars 🌠.
        </Typography>

  {/* Additional link for more information */}

        <Typography variant="body1" align="center" paragraph>
    For more information, please visit the{' '}
    <Link 
      href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/pluton/?tab=project" // Replace with your actual link
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security feature
      sx={{ color: 'primary.main', textDecoration: 'underline' }} // Style the link
    >
      website of our challenge
    </Link>{' '}
    where you can see the rest of the challenges.
  </Typography>
      </Box>
    </Container>
  );
}
