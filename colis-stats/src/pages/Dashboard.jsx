import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import StatCard from '../components/StatCard';
import MyPieChart from '../components/PieChart';
import StatsFilters from "../components/StatsFilters";
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapMorocco from '../components/MapMorocco';
import { useFilters } from "../context/FilterContext";

const Dashboard = () => {
  // Use the shared context instead of local state
  const { filteredData , rawData , filters, setFilters, villesUniques, loading } = useFilters();

  const totalColisStable = rawData.length;
  const totalCrbtStable = rawData.reduce((acc, curr) => acc + (Number(curr.amountCrbt) || 0), 0);

  if (loading) return null; // Or a loading spinner

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1.5, mb: 2 }}>
            <StatCard 
              title="Nb. Colis affiché" 
              value={totalColisStable} 
              borderColor="#ff6d00" 
              icon={<SendIcon sx={{ fontSize: 32, color: '#ff6d00', transform: 'rotate(-45deg)' }} />} 
            />
            <StatCard 
              title="Total envois de la période" 
              value={totalColisStable} 
              borderColor="#fbc02d" 
              icon={<LocalShippingIcon sx={{ fontSize: 32, color: '#fbc02d' }} />} 
            />
            <StatCard 
              title="Total CRBT" 
              value={new Intl.NumberFormat('fr-MA').format(totalCrbtStable) + ",00 MAD"} 
              borderColor="#1e88e5" 
              icon={<Box component="img" src="/photo/200dh.webp" sx={{ height: 30 }} alt="200dh" />} 
            />
          </Box>

        <Box sx={{ mb: 3, width: '100%', backgroundColor: '#fff', borderRadius: '4px' }}>
          <PageTabs /> 
        </Box> 

        <StatsFilters 
          filters={filters} 
          onFilterChange={setFilters} 
          villes={villesUniques} />
        
        <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
          {['statut', 'paiement', 'envois'].map((type) => (
            <Grid item xs={12} md={4} key={type}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {type === 'statut' ? 'Détail des statuts' : type === 'paiement' ? 'Statut des Paiements' : 'Statut des envois'}
                </Typography>
                <MyPieChart data={filteredData} type={type} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: 420 }}>
              <Typography variant="subtitle2" fontWeight="bold">Carte du Maroc</Typography>
              <Box sx={{ height: '320px', mt: 2 }}>
                <MapMorocco data={filteredData} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;