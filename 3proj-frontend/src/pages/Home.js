import React from 'react'
import '../style/pages/home.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const theme = createTheme();


export default function Home() {

  return (
    <div className="Home">
      <header className="navigation">
        <Navigation />
      </header>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          ></Box>

        </Container>
      </ThemeProvider>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}
