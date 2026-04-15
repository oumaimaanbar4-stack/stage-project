import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import { useFilters } from '../context/FilterContext'; 
import { Paper, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';



const getStatusIcon = (status) => {
  let color = '#ff9800'; // Orange (Default / Transit)
  if (status === 'liv') color = '#2e7d32'; // Green (Livré)
  if (status === 'ret') color = '#d32f2f'; // Red (Retour)
  if (status === 'enc') color = '#1e88e5'; // Blue (En cours)

  return L.divIcon({
    className: 'custom-div-icon', 
    html: `<div style="
              background-color: ${color}; 
              width: 15px; 
              height: 15px; 
              border-radius: 50%; 
              border: 2px solid white; 
              box-shadow: 0 0 5px rgba(0,0,0,0.3);
              display: block;
            "></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });
};


const cityCoords = {
  "CASABLANCA": [33.5731, -7.5898],
  "RABAT": [34.0209, -6.8416],
  "MARRAKECH": [31.6295, -7.9811],
  "TANGER": [35.7595, -5.8340],
  "FES": [34.0181, -5.0078],
  "SALE": [34.0331, -6.7985],
  "TEMARA": [33.9267, -6.9123],
  "MOHAMMADIA": [33.6835, -7.3848],
  "AGADIR": [30.4278, -9.5981],
  "KENITRA": [34.2610, -6.5802],
  "DAKHLA OUED EDDAHAB": [23.6848, -15.9579], 
  "LAAYOUNE": [27.1253, -13.1625],
  "MEKNES": [33.8935, -5.5473]
};

const MapMorocco = () => {
  const { filteredData } = useFilters();
  const [geoData, setGeoData] = useState(null);

 
  useEffect(() => {
    fetch('/data/maroc.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading GeoJSON:", err));
  }, []);

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 0, height: '400px' }}>
      <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <MapContainer center={[28.5, -9.5]} zoom={5} style={{ height: '100%', width: '100%' }}>
          
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" 
            attribution='&copy; OpenStreetMap'
          />
          
          {/* Official GeoJSON Borders */}
          {geoData && (
            <GeoJSON 
              data={geoData} 
              style={{ color: '#d32f2f', weight: 1.5, fillOpacity: 0.05 }} 
            />
          )}

          <MarkerClusterGroup>
            {filteredData.map((item, index) => {
              const city = (item.libville || "").toUpperCase();
              const position = cityCoords[city];
              const amountCrbt = item.amountCrbt || 0;
              if (!position) return null;

              return (
                <Marker 
                  key={item.idBordereau || index} 
                  position={position} 
                  icon={getStatusIcon(item.dernierStatut)}
                >
                  <Popup>
                    <div style={{ fontFamily: 'sans-serif' }}>
                      <strong>{item.codeBordereau}</strong><br />
                      <span>Statut: {item.libelle}</span><br />
                      <span>Ville: {city}</span><br />
                      <span>CRBT: {new Intl.NumberFormat('fr-MA').format(amountCrbt)} MAD</span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default MapMorocco;