import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import postAuth from '../services/auth/auth';
import setTokenWithExpiry from '../services/auth/setToken'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SignIn() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      username: data.get('username'),
      password: data.get('password'),
    };
    await postAuth(data).then(
      response => {
        if (response.request.status === 200) {
          setAlert(false);
          setTokenWithExpiry(response.data.token);
          navigate("/Dashboard");
          window.location.reload();
        } else if (response.request.status === 400) {
          setAlertContent(response.response.data.message);
          setAlert(true);
        } else {
          setAlertContent("This is an error alert — Please contact the administrator!");
          setAlert(true);
        }
      }
    )
  };

  return (
    <div className="SignIn">
      <ThemeProvider theme={theme}>
        {alert ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {alertContent}
          </Alert>
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                placeholder="Weac"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="YourSuperPassword"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink className="Navigation-link" to="/ForgotPassword">
                    <p variant="body2" className="fakeLink">
                      Forgot password?
                    </p>
                  </RouterLink>
                </Grid>
                <RouterLink className="Navigation-link" to="/SignUp">
                  <Grid item>
                    <p variant="body2" className="fakeLink">
                      {"Don't have an account?"}
                    </p>
                  </Grid>
                </RouterLink>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div >
  );
}