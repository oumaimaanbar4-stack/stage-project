import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; 
import { Box, Paper, Typography, Chip, Toolbar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import StatsFilters from "../components/StatsFilters";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import { useFilters } from "../context/FilterContext";

export default function MesEnvois() {
  // Pull shared state from Context
  const { filteredData,rawData, filters, setFilters, villesUniques, loading } = useFilters();

  const columns = [
    { field: 'codeBordereau', headerName: 'Code envoi', width: 150 },
    { 
      field: 'dateDepot', 
      headerName: 'Date depot', 
      width: 130,
      renderCell: (params) => {
        if (!params.value) return "-";
        const date = new Date(params.value);
        return date.toLocaleDateString();
      }
    },
    { field: 'libville', headerName: 'Destination', width: 150 },
    { 
      field: 'libelle', 
      headerName: 'Statut', 
      width: 130,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={
            params.row.dernierStatut === 'liv' ? 'success' : 
            params.value?.toLowerCase().includes('ret') ? 'error' :
            params.value?.toLowerCase().includes('transit') ? 'warning' : 
            'info' 
          } 
          size="small" 
        />
      )
    },
    { 
      field: 'dateLastStatus', 
      headerName: 'Date Statut', 
      width: 110,
      renderCell: (params) => {
        if (!params.value) return "-";
        const date = new Date(params.value);
        return date.toLocaleDateString();
        }
    },
    { field: 'amountCrbt', headerName: 'CRBT', width: 120, type: 'number' },
    { field: 'nomDest', headerName: 'Destinataire', width: 150 },
    { field: 'telDest', headerName: 'Tel destinataire', width: 150 },
    { field: 'adresseDest', headerName: 'Adresse', width: 180 },
    { 
      field: 'datePaiement', 
      headerName: 'Date paiement', 
      width: 130,
      renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : "Non payé"
    },
    { field: 'telLivreur', headerName: 'Tel Livreur', width: 120 }
  ];
  
  const totalColisStable= rawData.length;
  const totalCrbtStable = rawData.reduce((acc, curr) => acc + (Number(curr.amountCrbt) || 0), 0);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <Toolbar/>
        <Box component='main' sx={{mt: 2, flexGrow: 1, p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2 }}>
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

          <Box sx={{ mb: 2, backgroundColor: '#fff', borderRadius: '4px' }}>
            <PageTabs />
          </Box>

          <Paper elevation={1} sx={{ borderRadius: '4px', overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '0.85rem' }}>
                Mes Envois 
              </Typography>
              <StatsFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                villes={villesUniques} 
              />
            </Box>
              
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={filteredData} 
                columns={columns}
                loading={loading}
                getRowId={(row) => row.idBordereau} 
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                sx={{ border: 0, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8f9fa', color: '#1a237e', fontWeight: 'bold' } }}
              />
            </Box>       
          </Paper>
        </Box>
        <Footer/>
      </Box>
    </>
  );
}