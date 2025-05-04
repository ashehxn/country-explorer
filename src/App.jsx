import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSession } from './context/SessionProvider';
import { ColorModeContext } from './context/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CountriesList from './components/CountriesList';
import CountryDetail from './components/CountryDetail';
import Favorites from './components/Favorites';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import darkLogo from '../src/assets/dark.png';
import lightLogo from '../src/assets/light.png';

// Create a wrapper component to use hooks inside BrowserRouter
function AppContent() {
  const { user, logout } = useSession();
  const [showRegister, setShowRegister] = useState(false);
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const logoSrc = theme.palette.mode === 'light' ? lightLogo : darkLogo;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAuthButtonClick = () => {
    if (showRegister) {
      navigate('/login');
    } else {
      navigate('/register');
    }
    setShowRegister(!showRegister);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
          color: theme.palette.text.primary,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        {/* AppBar content */}
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          {/* Logo and title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/dashboard')}
          >
            <img
              src={logoSrc}
              alt="Sitemark logo"
              width="54"
              height="54"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.025em',
                marginLeft: '12px'
              }}
            >
              Country Explorer
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="text"
                    onClick={() => navigate("/countries")}
                    sx={{
                      borderRadius: 1,
                      color: 'text.primary',
                      textTransform: 'none'
                    }}
                  >
                    Explore
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      borderRadius: 1,
                      color: 'text.primary',
                      textTransform: 'none'
                    }}
                    onClick={() => navigate("/favorites")}
                  >
                    Favorites
                  </Button>
                </Box>
                <Box sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  px: 2,
                  py: 0.75
                }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Welcome, {user.username}
                  </Typography>
                </Box>
                <IconButton
                  onClick={toggleColorMode}
                  size="small"
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'primary.light' : 'text.secondary',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1,
                    zIndex: 1200,
                    position: 'relative'
                  }}
                >
                  {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 1,
                    borderColor: 'divider',
                    color: 'text.primary',
                    textTransform: 'none',
                    px: 2,
                    zIndex: 1200,
                    position: 'relative'
                  }}
                >
                  Logout
                </Button>

              </>
            ) : (
              // Non-authenticated user UI remains the same
              <>
                <IconButton
                  onClick={toggleColorMode}
                  size="small"
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'primary.light' : 'text.secondary',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1
                  }}
                >
                  {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleAuthButtonClick}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    px: 2
                  }}
                >
                  {showRegister ? 'Login' : 'Register'}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={!user ? <Login toggleForm={() => { setShowRegister(true); navigate('/register'); }} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register toggleForm={() => { setShowRegister(false); navigate('/login'); }} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/countries" element={user ? <CountriesList /> : <Navigate to="/login" />} />
          <Route path="/country/:code" element={user ? <CountryDetail /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          background: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
          color: theme.palette.text.primary,
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Country Explorer. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Developed by @ashehxn for the AF Assignment 2.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
