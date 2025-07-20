import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ISSTracker from './components/ISSTracker';
import MarsWeather from './components/MarsWeather';
import SatelliteTelemetry from './components/SatelliteTelemetry';
import AsteroidTracker from './components/AsteroidTracker';
import 'leaflet/dist/leaflet.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#64FFDA' },
    secondary: { main: '#1E90FF' },
    background: {
      default: '#0A192F',
      paper: '#112240',
    },
    text: {
      primary: '#CCD6F6',
      secondary: '#8892B0',
    },
  },
  typography: {
    fontFamily: '"Source Code Pro", monospace',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#64FFDA #0A192F',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#64FFDA',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#0A192F',
          },
        },
      },
    },
  },
});

const globalStyles = {
  html: { height: '100%' },
  body: {
    height: '100%',
    margin: 0,
    fontFamily: '"Source Code Pro", monospace',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '#root': { height: '100%' },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('nasa-auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Signup setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          
          {/* Main Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Feature Routes */}
          <Route 
            path="/iss-tracker" 
            element={
              isAuthenticated ? 
                <ISSTracker /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/mars-weather" 
            element={
              isAuthenticated ? 
                <MarsWeather /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/satellite-telemetry" 
            element={
              isAuthenticated ? 
                <SatelliteTelemetry /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/asteroid-tracker" 
            element={
              isAuthenticated ? 
                <AsteroidTracker /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;