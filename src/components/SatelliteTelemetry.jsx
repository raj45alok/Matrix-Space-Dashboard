import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  Box, 
  Stack, 
  Divider,
  CircularProgress  // Added missing import
} from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SatelliteTelemetry = () => {
  const [telemetryData, setTelemetryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetryData = () => {
      try {
        const simulatedData = generateSimulatedTelemetry();
        setTelemetryData(simulatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching telemetry data:', error);
        setLoading(false);
      }
    };

    fetchTelemetryData();
    const interval = setInterval(fetchTelemetryData, 10000);
    return () => clearInterval(interval);
  }, []);

  const generateSimulatedTelemetry = () => {
    const timestamps = [];
    const temperatures = [];
    const powerLevels = [];
    const signalStrengths = [];
    
    // Generate data for the last 10 minutes
    for (let i = 0; i < 10; i++) {
      const minutes = 44 + i;
      timestamps.push(`4:${minutes < 10 ? '0' + minutes : minutes}:30 PM`);
      temperatures.push(Math.round(20 + Math.random() * 10));
      powerLevels.push(Math.round(10 + Math.random() * 2));
      signalStrengths.push(Math.round(80 + Math.random() * 20));
    }
    
    return {
      timestamps,
      current: {
        temperature: temperatures[0],
        power: powerLevels[0],
        signal: signalStrengths[0]
      },
      chartData: {
        labels: timestamps,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1
          },
          {
            label: 'Power (V)',
            data: powerLevels,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.1
          },
          {
            label: 'Signal Strength (%)',
            data: signalStrengths,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
          }
        ]
      }
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: '900px',
      margin: '0 auto',
      padding: 2,
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Satellite Telemetry Monitoring
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Real-time telemetry data from satellite (simulated)
      </Typography>

      {/* Current Status Chips */}
      {telemetryData?.current && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              icon={<ThermostatIcon />}
              label={`Temperature: ${telemetryData.current.temperature}°C`}
              color="warning"
              variant="outlined"
            />
            <Chip 
              icon={<BatteryFullIcon />}
              label={`Power: ${telemetryData.current.power}V`}
              color="success"
              variant="outlined"
            />
            <Chip 
              icon={<SignalCellularAltIcon />}
              label={`Signal: ${telemetryData.current.signal}%`}
              color="info"
              variant="outlined"
            />
            <Chip 
              icon={<ScheduleIcon />}
              label={`Last Update: ${telemetryData.timestamps[0]}`}
              color="default"
              variant="outlined"
            />
          </Stack>
        </Paper>
      )}

      {/* Telemetry Chart */}
      <Paper elevation={3} sx={{ p: 2, mb: 3, height: '300px' }}>
        <Line
          data={telemetryData?.chartData || { labels: [], datasets: [] }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              title: { 
                display: true,
                text: 'Telemetry Data Over Time',
                font: { size: 16 }
              }
            }
          }}
        />
      </Paper>

      {/* Recent Data Table */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleIcon sx={{ mr: 1 }} /> Recent Telemetry Readings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2"><strong>Time</strong></Typography>
            {telemetryData?.timestamps.slice(0, 5).map((time, i) => (
              <Typography key={i} variant="body2">{time}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2"><strong>Temperature (°C)</strong></Typography>
            {telemetryData?.chartData.datasets[0].data.slice(0, 5).map((temp, i) => (
              <Typography key={i} variant="body2">{temp}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2"><strong>Signal Strength (%)</strong></Typography>
            {telemetryData?.chartData.datasets[2].data.slice(0, 5).map((signal, i) => (
              <Typography key={i} variant="body2">{signal}</Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SatelliteTelemetry;