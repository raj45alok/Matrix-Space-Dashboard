import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Grid, 
  Typography, 
  Container,
  Box  // Make sure this is imported
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AuthLayout from './AuthLayout';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <HowToRegIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Create Mission Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Astronaut Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
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
          id="email"
          label="Mission Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
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
          name="confirmPassword"
          label="Confirm Access Code"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
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
          endIcon={<SatelliteAltIcon />}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Register for Mission
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" style={{ color: '#90caf9', textDecoration: 'none' }}>
              Already have clearance? Access control
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Signup;