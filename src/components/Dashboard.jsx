import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Grid, Typography, Paper, Button, 
  Divider, LinearProgress, Stack, Chip
} from '@mui/material';
import { 
  Public as ISSIcon,
  WbSunny as MarsIcon,
  SatelliteAlt as SatelliteIcon,
  Warning as AsteroidIcon,
  AccessTime as TimeIcon,
  SignalCellularAlt as SignalIcon,
  Equalizer as ChartIcon,
  Group as CrewIcon,
  Storage as DataIcon,
  HealthAndSafety as HealthIcon,
  Radar as TrackingIcon
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

  const controlPanels = [
    { 
      title: "ISS TRACKER", 
      icon: <ISSIcon fontSize="large" />,
      onClick: () => navigate('/iss-tracker'),
      stats: "7 crew members",
      progress: 75
    },
    { 
      title: "MARS WEATHER", 
      icon: <MarsIcon fontSize="large" />,
      onClick: () => navigate('/mars-weather'),
      stats: "-63°C | Low dust",
      progress: 60
    },
    { 
      title: "SATELLITE NET", 
      icon: <SatelliteIcon fontSize="large" />,
      onClick: () => navigate('/satellite-telemetry'),
      stats: "12 active | 3 systems",
      progress: 85
    },
    { 
      title: "ASTEROID TRACKER", 
      icon: <AsteroidIcon fontSize="large" />,
      onClick: () => navigate('/asteroid-tracker'),
      stats: "3 NEOs this week",
      progress: 45
    }
  ];

  const signalStrengths = [105, 91, 83, 75, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1254];

  return (
    <Box sx={{ 
      p: 4, 
      backgroundColor: '#0A192F',
      minHeight: '100vh',
      color: '#CCD6F6'
    }}>
      {/* Header with Time */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #64FFDA 0%, #1E90FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          NASA MISSION CONTROL
        </Typography>
        <Paper sx={{
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#112240'
        }}>
          <TimeIcon sx={{ mr: 1, color: '#64FFDA' }} />
          <Typography variant="h6">
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>

      {/* Status Bar */}
      <Paper sx={{ 
        p: 2,
        mb: 4,
        backgroundColor: '#112240',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#64FFDA' }}>
            Deep Space Network - Real-time Telemetry Dashboard
          </Typography>
          <Typography variant="body2">
            {currentTime.toLocaleDateString()} | Mission Elapsed Time: 214 days
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#4CAF50' }}>
            <strong>DSN Status:</strong> ACTIVE | <strong>Security Level:</strong> NOMINAL
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Dogs Space Network Active | Tracking of Objects
          </Typography>
        </Box>
      </Paper>

      {/* Mission Overview Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#64FFDA' }}>
          Mission Overview
        </Typography>
        <Stack direction="row" spacing={2}>
          <Chip icon={<TrackingIcon />} label="ISS Tracker" sx={{ backgroundColor: '#1E3A8A' }} />
          <Chip icon={<MarsIcon />} label="Mars Weather" sx={{ backgroundColor: '#1E3A8A' }} />
          <Chip icon={<SatelliteIcon />} label="Satellite Net" sx={{ backgroundColor: '#1E3A8A' }} />
          <Chip icon={<AsteroidIcon />} label="NEO Asteroid Tracking" sx={{ backgroundColor: '#1E3A8A' }} />
        </Stack>
      </Box>

      {/* Mission Control Overview Panel */}
      <Paper sx={{ 
        p: 3,
        mb: 4,
        backgroundColor: '#112240',
        borderLeft: '4px solid #64FFDA'
      }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#64FFDA' }}>
          Mission Control Overview
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#64FFDA' }}>12</Typography>
              <Typography variant="subtitle1">Active Missions</Typography>
              <Typography variant="caption">Across 3 systems</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#64FFDA' }}>7</Typography>
              <Typography variant="subtitle1">Crew Members</Typography>
              <Typography variant="caption">Currently in space</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#64FFDA' }}>840.7</Typography>
              <Typography variant="subtitle1">Data Collected</Typography>
              <Typography variant="caption">dB today</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#64FFDA' }}>100.0%</Typography>
              <Typography variant="subtitle1">System Health</Typography>
              <Typography variant="caption">All systems nominal</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Control Panels Grid */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {controlPanels.map((panel, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ 
              p: 3,
              height: '100%',
              backgroundColor: '#112240',
              borderLeft: '4px solid #64FFDA',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(100, 255, 218, 0.2)'
              }
            }}>
              <Box
                onClick={panel.onClick}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: '100%'
                }}
              >
                <Box sx={{ color: '#64FFDA', mb: 2 }}>
                  {panel.icon}
                </Box>
                <Typography variant="h5" sx={{ 
                  mb: 1,
                  textAlign: 'center',
                  color: '#CCD6F6'
                }}>
                  {panel.title}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#8892B0',
                  textAlign: 'center',
                  mb: 2
                }}>
                  {panel.stats}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={panel.progress} 
                  sx={{ 
                    height: 6,
                    width: '80%',
                    borderRadius: 3,
                    backgroundColor: '#0A192F',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#64FFDA'
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

  {/* Communication Signal Strength with Chart */}
<Paper sx={{ 
  p: 3,
  mb: 4,
  backgroundColor: '#112240'
}}>
  <Typography variant="h5" sx={{ mb: 2, color: '#64FFDA' }}>
    Communication Signal Strength
  </Typography>
  <Box sx={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={signalStrengths.map((value, index) => ({ name: `S${index+1}`, value }))}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fill: '#CCD6F6' }} />
        <YAxis tick={{ fill: '#CCD6F6' }} />
        <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#112240', borderColor: '#64FFDA' }}
          itemStyle={{ color: '#CCD6F6' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#64FFDA" 
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </Box>
</Paper>

{/* Mission Status Distribution with Pie Chart */}
<Paper sx={{ 
  p: 3,
  backgroundColor: '#112240'
}}>
  <Typography variant="h5" sx={{ mb: 2, color: '#64FFDA' }}>
    Mission Status Distribution
  </Typography>
  <Box sx={{ height: 300, display: 'flex' }}>
    <Box sx={{ width: '50%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: 'Operational', value: 8, color: '#4CAF50' },
              { name: 'Maintenance', value: 3, color: '#FFC107' },
              { name: 'Planning', value: 1, color: '#2196F3' }
            ]}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {[
              { name: 'Operational', value: 8, color: '#4CAF50' },
              { name: 'Maintenance', value: 3, color: '#FFC107' },
              { name: 'Planning', value: 1, color: '#2196F3' }
            ].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#112240', borderColor: '#64FFDA' }}
            itemStyle={{ color: '#CCD6F6' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
    <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {[
        { label: 'Operational', value: 8, color: '#4CAF50' },
        { label: 'Maintenance', value: 3, color: '#FFC107' },
        { label: 'Planning', value: 1, color: '#2196F3' }
      ].map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            width: 16, 
            height: 16, 
            backgroundColor: item.color, 
            mr: 2, 
            borderRadius: '2px' 
          }} />
          <Typography variant="body1" sx={{ color: '#CCD6F6', mr: 2 }}>
            {item.label}:
          </Typography>
          <Typography variant="body1" sx={{ color: '#64FFDA' }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
</Paper>
 </Box>
  );
};
export default Dashboard;