import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


export default function NotFound() {
  return (
    <div className="NotFound">
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
            404: Page Not Found
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            We encountered an error while loading the page your searched for. Please make sure the page is already available on our website.
          </Typography>
        </Container>
      </ThemeProvider>
    </div >
  )
}
