import React, { useState } from 'react';
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
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import darkLogo from '../../src/assets/dark.png';
import lightLogo from '../../src/assets/light.png';
import BackgroundBubbles from './BackgroundBubbles';

const Register = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useSession();

  const theme = useTheme();
  const logoSrc = theme.palette.mode === 'light' ? lightLogo : darkLogo;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(email, password);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
            Sign up
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
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
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />

            <Typography variant="body2" sx={{ mb: 0.5 }}>Confirm Password</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
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
              Sign up
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account? {' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={toggleForm}
                  sx={{ fontWeight: 500 }}
                  underline="hover"
                  color="primary"
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
