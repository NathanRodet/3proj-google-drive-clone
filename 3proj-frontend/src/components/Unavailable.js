import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Unavailable() {
  return (
    <div className="Unavailable">
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 0, pl: 2, pr: 2 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Page not available
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          The page you're looking for is not available. She might be available is the future version of the app.
        </Typography>
      </Container>
    </div>
  )
}
