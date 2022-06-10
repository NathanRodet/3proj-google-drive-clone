import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import postUser from '../services/auth/signUp'
import Alert from '../components/WarningAlert';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SignIn() {
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let data = new FormData(event.currentTarget);
    data = {
      username: data.get('username'),
      password: data.get('password'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      mail: data.get('email')
    };
    await postUser(data).then(
      response => {
        if (response.request.status === 200) {
          navigate("/SignIn");
          window.location.reload();
          setIsLoading(false);
        } else {
          setAlert(true);
          setStatusCode(response.request.status);
          setAlertMessage(response.response.data[0].message);
          setIsLoading(false);
        }
      }
    )

  };

  return (
    <div className="SignUp">
      <ThemeProvider theme={theme}>
        {alert ?
          < Alert statusCode={statusCode} alertMessage={alertMessage} />
          : null}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    placeholder="Weac"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="Given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    placeholder="Nathan"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                    placeholder="Rodet"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    placeholder="mysupermail@gmail.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="8 characters long"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

              </Grid>
              {
                isLoading ?
                  <Box
                    fullWidth
                    sx={{
                      marginTop: 3,
                      marginBottom: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                  :
                  null
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <RouterLink className="Navigation-link" to="/SignIn">
                  <Grid item>
                    <p variant="body2" className="fakeLink">
                      {"Already have an account?"}
                    </p>
                  </Grid>
                </RouterLink>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider >
    </div >
  );
}
