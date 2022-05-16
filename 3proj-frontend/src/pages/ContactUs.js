import React from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function ContactUs() {
  return (
    <div className="ContactUs">
      <header className="navigation">
        <Navigation />
      </header>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
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
      </ThemeProvider>
      <footer className="footer">
        <Footer />
      </footer>
    </div >
  )
}
