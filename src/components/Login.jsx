import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionProvider';
import { useTheme } from '@mui/material/styles';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  Link,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';
import darkLogo from '../../src/assets/dark.png';
import lightLogo from '../../src/assets/light.png';
import BackgroundBubbles from './BackgroundBubbles';

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useSession();
  const theme = useTheme();
  const logoSrc = theme.palette.mode === 'light' ? lightLogo : darkLogo;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
      <BackgroundBubbles />
      {/* Main content */}
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          py: 4,
          width: '50%'
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 1,
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img
              src={logoSrc}
              alt="Sitemark logo"
              width="96"
              height="96"
            />
          </Box>

          <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Sign in
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Email</Typography>
            <TextField
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />

            <Typography variant="body2" sx={{ mb: 0.5 }}>Password</Typography>
            <TextField
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2">Remember me</Typography>
              }
              sx={{ mb: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                py: 1,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Sign in
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account? {' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={toggleForm}
                  sx={{ fontWeight: 500 }}
                  underline="hover"
                  color="primary"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;