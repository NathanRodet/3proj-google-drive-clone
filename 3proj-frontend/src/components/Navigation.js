import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey } from '@mui/material/colors';
import logo from '../media/logo-white.svg';
import getUserStatus from '../services/auth/getUserStatus';
import getAdminStatus from '../services/auth/getAdminStatus';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const avatarColor = grey[50];
const iconColor = grey[800];

export default function Navigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState(['SignIn', 'SignUp']);
  const [pages, setPages] = useState(['Home', 'Documentation']);

  useEffect(() => {
    const checkUser = async () => {
      const valueIsLogged = getUserStatus()
      const valueIsAdmin = getAdminStatus()

      if ((valueIsLogged === true) && (valueIsAdmin === true)) {
        setPages(['Home', 'Dashboard', 'AdminDashboard', 'Documentation']);
        setSettings(['Profile', 'SignOut']);
      } else if ((valueIsLogged === true)) {
        setPages(['Home', 'Dashboard', 'Documentation']);
        setSettings(['Profile', 'SignOut']);
      } else {
        setPages(['Home', 'Documentation']);
        setSettings(['SignIn', 'SignUp']);
      }
    }
    checkUser();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" >
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container maxWidth="xl">
          <Toolbar disableGutters  >
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img src={logo} className="Navigation-logo" alt="logo" />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="p"

              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link className="Navigation-link" to={"/Home"}>
                DriveSup
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link className="Navigation-link" to={"/" + page}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <img src={logo} className="Navigation-logo" alt="logo" />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link className="Navigation-link" to="/Home">
                DriveSup
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page} className="Navigation-link" to={"/" + page}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="profile" sx={{ bgcolor: avatarColor }}>
                    <AccountCircleIcon sx={{ color: iconColor }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {
                  settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link className="Navigation-link" to={"/" + setting} >
                        <Typography textAlign="center" >{(setting === "SignOut" ? "Logout" : setting)}</Typography>
                      </Link>
                    </MenuItem>
                  ))
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </ThemeProvider>
    </AppBar >
  )
}
