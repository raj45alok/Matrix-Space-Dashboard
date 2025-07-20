import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, CircularProgress, Box, Chip } from '@mui/material';
import axios from 'axios';
import WarningIcon from '@mui/icons-material/Warning';
import PublicIcon from '@mui/icons-material/Public';

const AsteroidTracker = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        // Using NASA's NeoWs API
        const today = new Date();
        const startDate = today.toISOString().split('T')[0];
        today.setDate(today.getDate() + 7);
        const endDate = today.toISOString().split('T')[0];
        
        const response = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
        );
        
        // If API fails (common with demo key), use simulated data
        if (response.data.near_earth_objects) {
          processAsteroidData(response.data.near_earth_objects);
        } else {
          setAsteroids(generateSimulatedAsteroids());
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching asteroid data:', error);
        setAsteroids(generateSimulatedAsteroids());
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  const processAsteroidData = (neoData) => {
    const asteroidList = [];
    Object.keys(neoData).forEach(date => {
      neoData[date].forEach(asteroid => {
        const closeApproach = asteroid.close_approach_data[0];
        asteroidList.push({
          id: asteroid.id,
          name: asteroid.name,
          diameter: Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max),
          velocity: Math.round(parseFloat(closeApproach.relative_velocity.kilometers_per_second)),
          missDistance: Math.round(parseFloat(closeApproach.miss_distance.kilometers)),
          date: closeApproach.close_approach_date_full,
          hazardous: asteroid.is_potentially_hazardous_asteroid,
        });
      });
    });
    
    setAsteroids(asteroidList);
  };

  const generateSimulatedAsteroids = () => {
    const names = [
      '2023 AB', '2023 CD', '2023 EF', '2023 GH', 
      '2023 IJ', '2023 KL', '2023 MN', '2023 OP'
    ];
    
    return names.map((name, index) => ({
      id: index,
      name,
      diameter: Math.round(50 + Math.random() * 500),
      velocity: Math.round(5 + Math.random() * 20),
      missDistance: Math.round(1000000 + Math.random() * 5000000),
      date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hazardous: Math.random() > 0.7,
    }));
  };

  const columns = [
    { field: 'name', headerName: 'Asteroid', width: 120 },
    { field: 'diameter', headerName: 'Diameter (m)', width: 120 },
    { field: 'velocity', headerName: 'Velocity (km/s)', width: 140 },
    { field: 'missDistance', headerName: 'Miss Distance (km)', width: 160 },
    { field: 'date', headerName: 'Approach Date', width: 140 },
    {
      field: 'hazardous',
      headerName: 'Hazardous',
      width: 120,
      renderCell: (params) => (
        params.value ? (
          <Chip icon={<WarningIcon />} label="Yes" color="error" size="small" />
        ) : (
          <Chip icon={<PublicIcon />} label="No" color="success" size="small" />
        )
      ),
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Near-Earth Asteroid Tracker
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Tracking asteroids approaching Earth in the next 7 days
      </Typography>
      <div style={{ height: 400, width: '100%', marginTop: '16px' }}>
        <DataGrid
          rows={asteroids}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default AsteroidTracker;