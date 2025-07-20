import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, CircularProgress, Box, Chip, Stack, Paper, Grid, Divider } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirIcon from '@mui/icons-material/Air';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchMarsWeather = async () => {
      try {
        // Simulate data fetch
        const simulatedData = generateSimulatedMarsWeather();
        setWeatherData(simulatedData);
        setChartData(simulatedData.chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Mars weather:', error);
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchMarsWeather();
  }, []);

  const generateSimulatedMarsWeather = () => {
    const solKeys = [];
    const maxTemps = [];
    const minTemps = [];
    const pressures = [];
    const seasonData = [];
    
    for (let i = 6; i >= 0; i--) {
      solKeys.push(`Sol ${1000 - i}`);
      maxTemps.push(Math.round(-20 + Math.random() * 30));
      minTemps.push(Math.round(-80 + Math.random() * 30));
      pressures.push(Math.round(700 + Math.random() * 100));
      seasonData.push(Math.random() > 0.5 ? 'Dusty' : 'Clear');
    }
    
    return {
      sol_keys: solKeys,
      validity_checks: {},
      [solKeys[0]]: {
        AT: {
          av: (maxTemps[0] + minTemps[0]) / 2,
          mn: minTemps[0],
          mx: maxTemps[0],
        },
        PRE: {
          av: pressures[0],
        },
        Season: seasonData[0],
      },
      chartData: {
        labels: solKeys,
        datasets: [
          {
            label: 'Max Temp (°C)',
            data: maxTemps,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
          {
            label: 'Min Temp (°C)',
            data: minTemps,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
          },
          {
            label: 'Pressure (Pa)',
            data: pressures,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
          },
        ],
      },
      seasonData,
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!weatherData || !weatherData.sol_keys || weatherData.sol_keys.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>No weather data available</Typography>
      </Box>
    );
  }

  const latestSol = weatherData.sol_keys[0];
  const latestData = weatherData[latestSol];

  return (
    <Box sx={{ 
      maxWidth: '900px', 
      margin: '0 auto',
      padding: 2
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Mars Weather Report
      </Typography>
      
      {/* Current Conditions - Only render if latestData exists */}
      {latestData && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ mr: 1 }} /> Current Conditions (Sol {latestSol})
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
            {latestData.AT && (
              <>
                <Chip 
                  icon={<WbSunnyIcon />} 
                  label={`High: ${latestData.AT.mx}°C`} 
                  color="warning" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<AcUnitIcon />} 
                  label={`Low: ${latestData.AT.mn}°C`} 
                  color="info" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<ThermostatIcon />} 
                  label={`Avg: ${latestData.AT.av.toFixed(1)}°C`} 
                  color="secondary" 
                  variant="outlined" 
                />
              </>
            )}
            {latestData.PRE && (
              <Chip 
                icon={<AirIcon />} 
                label={`Pressure: ${latestData.PRE.av} Pa`} 
                color="success" 
                variant="outlined" 
              />
            )}
            {latestData.Season && (
              <Chip 
                icon={<CompressIcon />} 
                label={`Season: ${latestData.Season}`} 
                color={latestData.Season === 'Dusty' ? 'default' : 'primary'} 
                variant="outlined" 
              />
            )}
          </Stack>
        </Paper>
      )}
      
      {/* Chart */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <div style={{ height: '300px' }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Mars Weather - Last 7 Sols',
                },
              },
            }}
          />
        </div>
      </Paper>
      
      {/* Additional Weather Data - Only render if we have data */}
      {weatherData.sol_keys && weatherData.sol_keys.length > 0 && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Weather Metrics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Temperature Trends</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                The average temperature on Mars is about -60°C, but can vary from -125°C near the poles in winter to 20°C at the equator at midday.
              </Typography>
              <Typography variant="body2" paragraph>
                {latestData?.Season ? `Current seasonal variation shows ${latestData.Season === 'Dusty' ? 'increased dust activity' : 'relatively clear conditions'}.` : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Atmospheric Conditions</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Mars' atmosphere is 96% carbon dioxide with an average surface pressure of 610 Pa (compared to Earth's 101,325 Pa).
              </Typography>
              <Typography variant="body2" paragraph>
                {latestData?.PRE ? `Current pressure readings suggest ${latestData.PRE.av > 750 ? 'higher than average' : 'lower than average'} atmospheric density.` : ''}
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            <strong>Recent Weather Patterns</strong>
          </Typography>
          <Grid container spacing={2}>
            {weatherData.sol_keys.slice(0, 3).map((sol) => (
              weatherData[sol] && (
                <Grid item xs={12} sm={4} key={sol}>
                  <Paper sx={{ p: 1.5 }}>
                    <Typography variant="body2"><strong>{sol}</strong></Typography>
                    {weatherData[sol].AT && (
                      <>
                        <Typography variant="body2">High: {weatherData[sol].AT.mx}°C</Typography>
                        <Typography variant="body2">Low: {weatherData[sol].AT.mn}°C</Typography>
                      </>
                    )}
                    {weatherData[sol].PRE && (
                      <Typography variant="body2">Pressure: {weatherData[sol].PRE.av} Pa</Typography>
                    )}
                  </Paper>
                </Grid>
              )
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default MarsWeather;