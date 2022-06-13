import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import Documentation from './pages/Documentation';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignOut from './pages/SignOut';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import getUserStatus from './services/auth/getUserStatus';
import getAdminStatus from './services/auth/getAdminStatus';
import FileDetails from './pages/FileDetails';

import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Profile from './pages/Profile';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const valueIsLogged = getUserStatus();
      const valueIsAdmin = getAdminStatus();
      setIsLogged(valueIsLogged);
      setIsAdmin(valueIsAdmin);
    }
    checkUser();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <header className="navigation">
          <Navigation />
        </header>
        <Routes>
          {
            (!isLogged) && (
              <>
                <Route path={"/"} element={<Home />} />
                <Route path={"/Home"} element={<Home />} />
                <Route path={"/SignIn"} element={<SignIn />} />
                <Route path={"/SignUp"} element={<SignUp />} />
                <Route path={"/ForgotPassword"} element={<ForgotPassword />} />
                <Route path={"/SignOut"} element={<SignOut />} />
              </>
            )
          }
          {
            (isAdmin || isLogged) && (
              <>
                <Route path={"/Dashboard"} element={<Dashboard />} />
                <Route path="/Dashboard/:fileId" element={<FileDetails />} />
                <Route path={"/Profile"} element={<Profile />} />
              </>
            )
          }
          {
            (isAdmin) && (
              <>
                <Route path={"/AdminDashboard"} element={<AdminDashboard />} />
              </>
            )
          }
          <Route path={"/ContactUs"} element={<ContactUs />} />
          <Route path={"/Documentation"} element={<Documentation />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
        <footer className="footer">
          <Footer />
        </footer>
      </ThemeProvider>
    </div>
  )
}
