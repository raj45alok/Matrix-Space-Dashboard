import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Grid, 
  Typography, 
  Container,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthLayout from './AuthLayout';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // In a real app, you would call your authentication API here
      // const response = await authApi.login(email, password);
      
      // For demo purposes, accept any non-empty credentials
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard or previous location
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Mission Control Login
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Astronaut Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          sx={{
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Access Code"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          sx={{
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={24} /> : <RocketLaunchIcon />}
          disabled={isLoading}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Authenticating...' : 'Launch Dashboard'}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/signup" style={{ color: '#90caf9', textDecoration: 'none' }}>
              New astronaut? Create mission profile
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Login;