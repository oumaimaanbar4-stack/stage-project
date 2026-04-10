import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper,  Toolbar } from '@mui/material';
import {  PersonAdd as PersonAddIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import PageTabs from '../components/PageTabs';
import api from '../services/api';



const Clients = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients", err));
  }, []);

  const handleRowClick = (params) => {
    navigate(`/bordereaux/${params.id}`);
  };

  const columns = [
    { field: 'nom', headerName: 'Nom / Entreprise', flex: 1 },
    { field: 'telephone', headerName: 'Téléphone', flex: 1 },
    { field: 'adresse', headerName: 'Adresse', flex: 1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={(e) => {
            e.stopPropagation(); // Stops the row click from firing
            // Use 'creer-shipment' as defined in your App.jsx
            navigate(`/creer-shipment/${params.row.id}`);
          }}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Ajouter Bordereau
        </Button>
      ),
    },
    
  ];

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Toolbar/>
      <NavBar user={user}  />
      
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Toolbar/>
        <PageTabs/>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
            Mes Clients
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/creer')}
            sx={{ bgcolor: '#1a237e', borderRadius: 2, fontWeight: 'bold' }}
          >
            Ajouter Client
          </Button>
        </Box>

        <Paper sx={{ height: 500, width: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <DataGrid
            rows={clients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={handleRowClick}
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
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f5f5', 
                cursor: 'pointer',          
                transition: 'background-color 0.2s ease', 
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Clients;