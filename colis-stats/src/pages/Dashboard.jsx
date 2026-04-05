import React , { useState, useEffect }from 'react';
import { Box, Paper, Typography, Toolbar } from '@mui/material';
import StatCard from '../components/StatCard';
import MyPieChart from '../components/PieChart';
import StatsFilters from "../components/StatsFilters";
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChart from '../components/BarChart'; 
import MapMorocco from '../components/MapMorocco';
import Footer from '../components/Footer';
import api from '../services/api';
import { useFilters } from "../context/FilterContext";

const Dashboard = () => {
  
  const { filteredData, filters, setFilters, villesUniques, loading } = useFilters();
  const [user, setUser] = useState({ name: '', role: '' });
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);


  const totalColisStable = filteredData.length;
  const totalCrbtStable = filteredData.reduce((acc, curr) => {
    const val = curr.amountCrbt || curr.montant_crbt || 0;
    return acc + (parseFloat(val) || 0);
  }, 0);
  
  const monthlyDataArray = React.useMemo(() => {
    const groups = {};

    filteredData.forEach((item) => {
      const dateValue = item.dateDepot;
      if (!dateValue) return;

      const date = new Date(dateValue);
      const monthYear = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

      if (!groups[monthYear]) {
        groups[monthYear] = { 
          month: monthYear, 
          envois: 0, 
          crbt: 0, 
          timestamp: date.getTime() 
        };
      }

      groups[monthYear].envois += 1;

      const val = parseFloat(item.amountCrbt || 0);
      groups[monthYear].crbt += isNaN(val) ? 0 : val;
    });

    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [filteredData]);

  if (loading) return null; 

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar user={user} />
        <Toolbar />
        <Box component="main" sx={{mt: 2, flexGrow: 1, p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
          
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
                value={new Intl.NumberFormat('fr-MA').format(totalCrbtStable) + "MAD"} 
                borderColor="#1e88e5" 
                icon={<Box component="img" src="/photo/200dh.webp" sx={{ height: 30 }} alt="200dh" />} 
              />
            </Box>

          <Box sx={{ mb: 3, width: '100%', backgroundColor: '#fff', borderRadius: '4px' }}>
            <PageTabs /> 
          </Box> 

          <Paper elevation={1} sx={{ borderRadius: '4px', overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
                Mes statistiques
              </Typography>
              <StatsFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                villes={villesUniques} 
              />
            </Box>
          
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: 1.5, 
              mb: 2 
            }}>
              {['statut', 'paiement', 'envois'].map((type) => (
                <Paper 
                  key={type}
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 0, 
                    backgroundColor: 'white',
                    height: '350px', 
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'black', 
                      fontWeight: 700, 
                      fontSize: '0.75rem', 
                      mb: 2,
                      textAlign: 'center',
                      textTransform: 'uppercase'
                    }}
                  >
                    {type === 'statut' ? 'Détail des statuts' : 
                    type === 'paiement' ? 'Statut des Paiements' : 
                    'Statut des envois'}
                  </Typography>
                  
                  <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <MyPieChart data={filteredData} type={type} />
                  </Box>
                </Paper>
              ))}
            </Box>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
              gap: 3, 
              mt: 8, 
              
            }}>
              
              <Paper elevation={0} sx={{ p: 2, borderRadius: "30px", height: '400px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>
                  Statistiques d'Envois Mensuels
                </Typography>
                <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}>
                  <BarChart data={monthlyDataArray} />
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ p: 2, borderRadius: "30px", height: '400px', display: 'flex', flexDirection: 'column', backgroundColor: 'white',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>
                  Répartition Géographique
                </Typography>
                <Box sx={{ flexGrow: 1, width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                  <MapMorocco />
                </Box>
              </Paper>
            </Box>
          </Paper>
          <Footer />
        </Box>
      </Box>  
    </>
  );
};

export default Dashboard;