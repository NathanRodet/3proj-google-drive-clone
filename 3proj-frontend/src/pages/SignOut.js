import React, { useEffect, useState } from 'react'
import clearToken from '../services/auth/clearToken'
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SignOut() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const isCleared = async () => {
      const valueIsCleared = clearToken();
      if (valueIsCleared) {
        navigate("/SignIn");
        window.location.reload();
      } else {
        setAlert(true);
      }
    }
    isCleared();
  }, [navigate]);

  return (
    <div className="SignOut">
      <ThemeProvider theme={theme}>
        {alert ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {"Please contact an administrator"}
          </Alert>
          : null}
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 4, pl: 2, pr: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Redirecting to SignIn page.
          </Typography>
        </Container>
      </ThemeProvider>
    </div >
  )
}
