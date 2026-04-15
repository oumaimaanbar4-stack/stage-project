import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, Chip, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from '../components/NavBar';
import PageTabs from '../components/PageTabs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

export default function MesDemandeDeModif() {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/modification-requests')
      .then(res => {
        const mapped = res.data.map(item => ({
          id: item.id,
          codeEnvoi: item.code_envoi,
          champ: item.champ,
          ancienneValeur: item.ancienne_valeur,
          nouvelleValeur: item.nouvelle_valeur,
          justification: item.justification,
          status: item.status,
          date: item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
        }));
        setRows(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await api.put(`/modification-requests/${id}`, { status: decision });
      setRows(prev => prev.map(row => 
        row.id === id ? { ...row, status: decision } : row
      ));
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de mettre à jour.");
    }
  };

  const columns = [
    { field: 'codeEnvoi', headerName: 'Code Envoi', flex: 1 },
    { field: 'champ', headerName: 'Champ', flex: 1 },
    { field: 'ancienneValeur', headerName: 'Ancienne Valeur', flex: 1.2 },
    { field: 'nouvelleValeur', headerName: 'Nouvelle Valeur', flex: 1.2 },
    { field: 'justification', headerName: 'Justification', flex: 1.5 },
    {
      field: 'status',
      headerName: 'Statut',
      flex: 1,
      renderCell: (params) => {
        let color = 'warning';
        if (params.value === 'Accepté') color = 'success';
        if (params.value === 'Refusé') color = 'error';
        return (
          <Chip label={params.value} color={color} size="small" sx={{ fontWeight: 'bold' }} />
        );
      }
    },
    { field: 'date', headerName: 'Date Demande', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.2,
      sortable: false,
      renderCell: (params) => {
        if (params.row.status !== 'En attente') return null;
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => handleDecision(params.row.id, 'Accepté')}
              sx={{ fontSize: '0.7rem', px: 1, mt:1.5}}
            >
              Accepter
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => handleDecision(params.row.id, 'Refusé')}
              sx={{ fontSize: '0.7rem', px: 1 , mt:1.5}}
            >
              Refuser
            </Button>
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar user={user} />
        <Toolbar />
        <Box component="main" sx={{ mt: 2, flexGrow: 1, p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
          <PageTabs />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
            Demandes de Modification
          </Typography>

          <Box sx={{ height: 500, width: '100%', backgroundColor: '#fff', borderRadius: 2, p: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              disableRowSelectionOnClick
              sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc' } }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}