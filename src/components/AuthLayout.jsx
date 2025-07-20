import React from 'react';
import { Box, Container } from '@mui/material';
import AuthBackground from './AuthBackground';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AuthBackground />
      <Container component="main" maxWidth="xs" sx={{ zIndex: 1 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 30, 0.8)',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 0 20px rgba(100, 100, 255, 0.3)'
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;