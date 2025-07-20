import React from 'react';
import { Box } from '@mui/material';

const AuthBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #000000, #1a237e)',
        zIndex: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(white, rgba(255,255,255,.2) 1px, transparent 1px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px',
          backgroundPosition: '0 0, 30px 30px',
          animation: 'stars 100s linear infinite',
        },
        '@keyframes stars': {
          '0%': { backgroundPosition: '0 0, 30px 30px' },
          '100%': { backgroundPosition: '1000px 1000px, 1030px 1030px' },
        },
      }}
    >
      {/* Animated shooting stars */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            animation: `shootingStar ${5 + i * 2}s linear infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            '@keyframes shootingStar': {
              '0%': { transform: 'translateX(0) translateY(0)', opacity: 1 },
              '70%': { opacity: 1 },
              '100%': { transform: 'translateX(500px) translateY(300px)', opacity: 0 },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default AuthBackground;