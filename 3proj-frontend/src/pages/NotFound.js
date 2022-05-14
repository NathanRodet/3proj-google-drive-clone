import React from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function NotFound() {
  return (
    <div className="NotFound">
      <header className="navigation">
        <Navigation />
      </header>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          404: Page Not Found
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          We encountered an error while loading the page your searched for. Please make sure the page is already available on our website.
        </Typography>
      </Container>
      <footer className="footer">
        <Footer />
      </footer>
    </div >
  )
}
