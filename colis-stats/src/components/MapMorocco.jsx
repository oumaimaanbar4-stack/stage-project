import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';





let DefaultIcon = L.icon({
    iconUrl: icon, shadowUrl: iconShadow,
    iconSize: [25, 41], iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    // On attend un court instant que le parent (Paper) soit bien rendu
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const FixMapSize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 800); 
  }, [map]);

  return null;
};

const MapMorocco = ({ data }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/data/maroc.geojson")
      .then((res) => res.json())
      .then((json) => setGeoData(json));
  }, []);

  if (!data) return null;

  // Filtrage et mapping des positions
  const positions = data.map((d) => {
    let coords = null;
    const ville = d.libville?.toUpperCase();
    if (ville === "CASABLANCA") coords = [33.5731, -7.5898];
    else if (ville === "RABAT") coords = [34.0209, -6.8498];
    else if (ville === "MARRAKECH") coords = [31.6295, -8.0089];
    else if (ville === "FEZ" || ville === "FÈS") coords = [34.0346, -4.9994];
    else if (ville === "TANGER") coords = [35.7595, -5.8148];
    else if (ville === "AGADIR") coords = [30.4278, -9.6000];
    else if (ville === "DAKHLA") coords = [23.6846, -14.9728];
    return { pos: coords, name: d.libville, amount: d.amountCrbt };
  }).filter(v => v.pos);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[31, -8]}
        zoom={5}
        
        style={{ width: "400px", height: "100%" }}
      >
        <FixMapSize />
        <MapResizer />

        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

        {geoData && <GeoJSON data={geoData} />}

        {positions.map((v, i) => (
          <Marker key={i} position={v.pos}>
            <Popup>
              <strong>{v.name}</strong><br />
              {v.amount} MAD
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapMorocco;