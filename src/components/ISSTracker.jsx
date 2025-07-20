import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons using direct URLs
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ISSTracker = () => {
  const [issData, setIssData] = useState(null);

  useEffect(() => {
    const fetchIssData = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        setIssData(data);
      } catch (error) {
        console.error('Error fetching ISS data:', error);
      }
    };

    fetchIssData();
    const interval = setInterval(fetchIssData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!issData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: '#2c3e50' // Dark blue-gray for loading text
      }}>
        <h2>Loading ISS data...</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        color: '#1a237e', // Dark blue for main heading
        fontWeight: '600'
      }}>
        International Space Station Tracker
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', // Light gray background
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '25px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderLeft: '4px solid #3f51b5' // Accent blue border
      }}>
        <h3 style={{ 
          marginTop: '0', 
          color: '#3f51b5', // Medium blue for section heading
          marginBottom: '15px'
        }}>
          Current Position
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ minWidth: '200px' }}>
            <p style={{ margin: '8px 0', color: '#424242' }}> {/* Dark gray for labels */}
              <strong style={{ color: '#303f9f' }}>Latitude:</strong> {/* Darker blue for strong text */}
              <span style={{ color: '#212121' }}> {issData.latitude.toFixed(4)}°</span> {/* Black for values */}
            </p>
            <p style={{ margin: '8px 0', color: '#424242' }}>
              <strong style={{ color: '#303f9f' }}>Longitude:</strong>
              <span style={{ color: '#212121' }}> {issData.longitude.toFixed(4)}°</span>
            </p>
          </div>
          <div style={{ minWidth: '200px' }}>
            <p style={{ margin: '8px 0', color: '#424242' }}>
              <strong style={{ color: '#303f9f' }}>Altitude:</strong>
              <span style={{ color: '#212121' }}> {(issData.altitude * 0.621371).toFixed(2)} miles</span>
            </p>
            <p style={{ margin: '8px 0', color: '#424242' }}>
              <strong style={{ color: '#303f9f' }}>Velocity:</strong>
              <span style={{ color: '#212121' }}> {(issData.velocity * 2.23694).toFixed(2)} mph</span>
            </p>
          </div>
        </div>
        
        <p style={{ 
          margin: '15px 0 0 0', 
          color: '#616161', // Medium gray for timestamp
          fontSize: '0.9em',
          fontStyle: 'italic'
        }}>
          Last updated: {new Date(issData.timestamp * 1000).toLocaleTimeString()}
        </p>
      </div>

      <div style={{ 
        height: '60vh', 
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <MapContainer
          center={[issData.latitude, issData.longitude]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={18}
          />
          <Marker position={[issData.latitude, issData.longitude]} icon={icon}>
            <Popup>
              <strong style={{ color: '#1a237e' }}>ISS Current Position</strong><br />
              <span style={{ color: '#424242' }}>Latitude: {issData.latitude.toFixed(4)}°</span><br />
              <span style={{ color: '#424242' }}>Longitude: {issData.longitude.toFixed(4)}°</span><br />
              <span style={{ color: '#424242' }}>Altitude: {(issData.altitude * 0.621371).toFixed(2)} miles</span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      <div style={{ 
        marginTop: '20px',
        textAlign: 'center',
        color: '#757575', // Medium gray for footer
        fontSize: '0.85em'
      }}>
        <p>Data updates every 3 seconds | Source: wheretheiss.at</p>
      </div>
    </div>
  );
};

export default ISSTracker;