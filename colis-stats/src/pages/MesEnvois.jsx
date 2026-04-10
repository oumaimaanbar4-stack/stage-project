import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; 
import { Box, Paper, Typography, Chip, Toolbar, FormControl, Select, MenuItem} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import StatsFilters from "../components/StatsFilters";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import { useFilters } from "../context/FilterContext";
import dayjs from "dayjs";
import api from "../services/api";




export default function MesEnvois() {
  
  const { filteredData,rawData, filters, setFilters, villesUniques, loading } = useFilters();
  const [user, setUser] = useState({ name: '', role: '' });
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { field: 'codeBordereau', headerName: 'Code envoi', width: 150 },
    { 
      field: 'dateDepot', 
      headerName: 'Date depot', 
      width: 150,
      
      valueFormatter: (value) => value ? dayjs(value).format('DD/MM/YYYY') : '-'
    },
    { field: 'libville', headerName: 'Destination', width: 150 },
    { 
      field: 'libelle', 
      headerName: 'Statut', 
      width: 130,
      renderCell: (params) => {
        // Get the CODE (enc, tra, etc.) from the row data
        const statusCode = params.row.dernierStatut?.toLowerCase();
        const label = params.value || 'N/A';
        // act like dictionnary
        let color = "default";
        if (statusCode === 'enc' || statusCode === 'aff') color = "info";    
        if (statusCode === 'tra' || statusCode === 'aexp') color = "warning"; 
        if (statusCode === 'liv') color = "success";     
        if (statusCode === 'ret') color = "error";

        return (
          <Chip 
            label={label} 
            color={color} 
            size="small" 
            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
          />
        );
      }
    },
    { 
      field: 'dateLastStatus', 
      headerName: 'Date Statut', 
      width: 150,
   
      valueFormatter: (value) => value ? dayjs(value).format('DD/MM/YYYY') : '-'
    },

    { field: 'amountCrbt', headerName: 'CRBT', width: 100 },
    { 
      field: 'datePaiement', 
      headerName: 'Date Paiement', 
      width: 150,
    
      valueFormatter: (value) => value ? dayjs(value).format('DD/MM/YYYY') : '-'
    },
    { field: 'nomDest', headerName: 'Nom destinataire', width: 150 },
    { field: 'telDest', headerName: 'Téléphone Dest', width: 150 },
    { field: 'adresseDest', headerName: 'Adresse-dest', width: 200 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 180, 
      renderCell: (params) => {
        const currentStatus = params.row.dernierStatut || 'enc';
        
        return (
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select
              key={`select-${params.row.idBordereau}-${currentStatus}`}
              value={currentStatus}
              onChange={(e) => handleStatusUpdate(params.row.idBordereau, e.target.value)}
            >
              <MenuItem value="enc">En cours</MenuItem>
              <MenuItem value="tra">En Transit</MenuItem>
              <MenuItem value="liv">Livré</MenuItem>
              <MenuItem value="ret">Retour</MenuItem>
            </Select>
          </FormControl>
        );
      }
    }
  ];
  
  const totalColisStable= filteredData.length;
  const totalEnvoisPeriode= rawData.length;
  const totalCrbtStable = filteredData.reduce((acc, curr) => {
    const val = curr.amountCrbt || curr.montant_crbt || 0;
    return acc + (parseFloat(val) || 0);
  }, 0);
  
  const handleStatusUpdate = async (id, statusCode) => {
    console.log("Attempting update for ID:", id, "with Status:", statusCode);
      const statusLabels = {
          'enc': 'En cours',
          'tra': 'En Transit',
          'liv': 'Livré',
          'ret': 'Retour'
      };
      if (!id) {
          console.error("Error: idBordereau is undefined!");
          return;
      }

      try {
          // Send to Laravel
          const response = await api.put(`/shipments/${id}/status`, {
              status: statusCode,
              label: statusLabels[statusCode]
          });
          console.log("Server Response:", response.data);
          if (response.status === 200) {
              // Force a page reload to fetch the fresh data from MySQL
            window.location.href = window.location.pathname + "?t=" + new Date().getTime();
          }
      } catch (error) {
          console.error("Update error:", error);
          alert("Erreur: Le serveur n'a pas pu mettre à jour le statut.");
      }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar user={user} />
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
              value={totalEnvoisPeriode} 
              borderColor="#fbc02d" 
              icon={<LocalShippingIcon sx={{ fontSize: 32, color: '#fbc02d' }} />} 
            />
            <StatCard 
              title="Total CRBT" 
              value={new Intl.NumberFormat('fr-MA').format(totalCrbtStable) + " MAD"} 
              borderColor="#1e88e5" 
              icon={<Box component="img" src="/photo/200dh.webp" sx={{ height: 30 }} alt="200dh" />} 
            />
          </Box>

          <Box sx={{ mb: 2, backgroundColor: '#fff', borderRadius: '4px' }}>
            <PageTabs />
          </Box>

          <Paper elevation={1} sx={{ borderRadius: '4px', overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
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
                key={filteredData.length + (filteredData[0]?.dernierStatut || '')}
                rows={filteredData} 
                columns={columns}
                loading={loading}
                getRowId={(row) => row.idBordereau } 
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