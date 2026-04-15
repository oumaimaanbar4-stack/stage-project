import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Toolbar } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
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

  const handleArchive = async (id) => {
    if (!window.confirm('Archiver ce client ?')) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erreur archivage:", error);
      alert("Impossible d'archiver ce client.");
    }
  };

  const columns = [
    { field: 'nom', headerName: 'Nom / Entreprise', flex: 1 },
    { field: 'telephone', headerName: 'Téléphone', flex: 1 },
    { field: 'adresse', headerName: 'Adresse', flex: 1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/creer-shipment/${params.row.id}`);
            }}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Ajouter Bordereau
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleArchive(params.row.id);
            }}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Archiver
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Toolbar />
      <NavBar user={user} />
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Toolbar />
        <PageTabs />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h1" fontWeight="bold" sx={{ color: "black", fontSize: '1.5rem' }}>
            Mes Clients
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => navigate('/clients/archived')}
              sx={{ borderRadius: 2, fontWeight: 'bold' }}
            >
              Clients Archivés
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/creer')}
              sx={{ bgcolor: '#1a237e', borderRadius: 2, fontWeight: 'bold' }}
            >
              Ajouter Client
            </Button>
          </Box>
        </Box>

        <Paper sx={{ height: 500, width: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <DataGrid
            rows={clients}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowClick={handleRowClick}
            rowHeight={52}
            disableRowSelectionOnClick
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
