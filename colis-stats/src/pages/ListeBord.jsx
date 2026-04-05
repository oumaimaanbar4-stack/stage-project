import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper, Button, CircularProgress, Chip } from '@mui/material';
import { useFilters } from "../context/FilterContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from "../components/NavBar";
import api from '../services/api';

 
const ListeBord = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  const [bordereaux, setBordereaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filteredData} = useFilters();

  useEffect(() => {
 
    api.get('/user').then(res => setUser(res.data)).catch(err => console.error(err));

    api.get(`/clients/${clientId}/bordereaux`)
      .then(res => {
        setBordereaux(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [clientId]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  
  const columns = [
    { field: 'codeBordereau', headerName: 'Code Expédition', flex: 1.2 },
    { 
      field: 'dateDepot', 
      headerName: 'Date Dépôt', 
      flex: 1,
      renderCell: (params) => formatDate(params.value) 
    },
    { field: 'libville', headerName: 'Destination', flex: 1 },
    { 
      field: 'dernierStatut', 
      headerName: 'Statut', 
      flex: 1,
      renderCell: (params) => {
        const statusCode = params.value?.toLowerCase();
        let label = "N/A";
        let color = "default";
        let sx = { fontWeight: 'bold', minWidth: '95px' };

        if (statusCode === 'enc' || statusCode === 'aff') {
          label = "En cours";
          color = "info";
        } 
        else if (statusCode === 'tra' || statusCode === 'aexp') {
          label = "En transit";
          color = "warning";
          sx = { ...sx, bgcolor: '#ef6c00', color: 'white' };
        } 
        else if (statusCode === 'liv') {
          label = "Livré";
          color = "success";
        } 
        else if (statusCode === 'ret') {
          label = "Retour";
          color = "error";
        }

        return (
          <Chip 
            label={label} 
            color={color} 
            size="small" 
            sx={sx} 
          />
        );
      }
    },
    { field: 'amountCrbt', headerName: 'CRBT', width: 100 },
    { field: 'nomDest', headerName: 'Destinataire', flex: 1.2 },
    { field: 'telDest', headerName: 'Téléphone', flex: 1 },
  ];

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <NavBar user={user} />
      <Box sx={{ p: 4, mt: 10, maxWidth: 1400, mx: 'auto' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/clients')} 
          sx={{ mb: 2, textTransform: 'none', color: '#1a237e', fontWeight: 'bold' }}
        >
          Retour à la liste des clients
        </Button>

        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
              Détails des Bordereaux - Client ID:{clientId}
            </Typography>
            {!loading && (
              <Chip 
                label={`${bordereaux.length} Expéditions trouvées`} 
                sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold', px: 1 }} 
              />
            )}
          </Box>
          
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              key={filteredData.length + (filteredData[0]?.dernierStatut || '')}
              rows={bordereaux}
              columns={columns}
              getRowId={(row) => row.idBordereau} 
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 20]}
              disableSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                  color: '#555',
                  fontSize: '0.9rem',
                  borderBottom: '2px solid #e0e0e0',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '0.875rem',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ListeBord;