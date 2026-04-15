import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Toolbar, Collapse, Chip, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import PageTabs from '../components/PageTabs';
import api from '../services/api';
import dayjs from 'dayjs';

const ArchivedClients = () => {
  const [clients, setClients] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({ name: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user').then(res => setUser(res.data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/clients/archived').then(res => setClients(res.data)).catch(err => console.error(err));
  }, []);

  const handleRestore = async (id) => {
    try {
      await api.put(`/clients/${id}/restore`);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      alert("Impossible de restaurer ce client.");
    }
  };

  const filteredClients = clients.filter(c =>
    c.nom?.toLowerCase().includes(search.toLowerCase()) ||
    String(c.id).includes(search)
  );

  const shipmentColumns = [
    { field: 'codeBordereau', headerName: 'Code Envoi', flex: 1 },
    { field: 'libville', headerName: 'Destination', flex: 1 },
    { field: 'dateDepot', headerName: 'Date Dépôt', flex: 1, valueFormatter: (value) => value ? dayjs(value).format('DD/MM/YYYY') : '-' },
    { field: 'amountCrbt', headerName: 'CRBT', flex: 1 },
    {
      field: 'dernierStatut', headerName: 'Statut', flex: 1,
      renderCell: (params) => {
        const code = params.value?.toLowerCase();
        const labels = { 'enc': 'En Cours', 'aff': 'En Cours', 'tra': 'En Transit', 'aexp': 'En Transit', 'liv': 'Livré', 'ret': 'Retour' };
        let color = 'default';
        if (code === 'enc' || code === 'aff') color = 'info';
        if (code === 'tra' || code === 'aexp') color = 'warning';
        if (code === 'liv') color = 'success';
        if (code === 'ret') color = 'error';
        return <Chip label={labels[code] || params.value || 'N/A'} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
      }
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Toolbar />
      <NavBar user={user} />
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Toolbar />
        <PageTabs />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography fontWeight="bold" sx={{ color: "black", fontSize: '1.5rem' }}>Clients Archivés</Typography>
          <Button variant="outlined" onClick={() => navigate('/clients')} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
            ← Retour aux clients
          </Button>
        </Box>

        <TextField size="small" placeholder="Rechercher par nom ou ID..." value={search}
          onChange={(e) => setSearch(e.target.value)} sx={{ mb: 3, width: 300 }} />

        {/* Header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 220px', px: 2, py: 1, backgroundColor: '#f8f9fa', borderRadius: '8px 8px 0 0', borderBottom: '2px solid #e0e0e0' }}>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Nom / Entreprise</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Téléphone</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Adresse</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Archivé le</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Actions</Typography>
        </Box>

        {filteredClients.map(client => (
          <Box key={client.id}>
            <Paper sx={{ borderRadius: 0, boxShadow: 'none', border: '1px solid #f0f0f0', borderTop: 'none', overflow: 'hidden' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 220px', alignItems: 'center', px: 2, py: 1.5, borderBottom: expandedId === client.id ? '1px solid #e0e0e0' : 'none' }}>
                <Typography fontSize="0.9rem" fontWeight={500}>{client.nom}</Typography>
                <Typography fontSize="0.9rem" color="text.secondary">{client.telephone}</Typography>
                <Typography fontSize="0.9rem" color="text.secondary">{client.adresse}</Typography>
                <Typography fontSize="0.9rem" color="text.secondary">{client.deleted_at ? new Date(client.deleted_at).toLocaleDateString() : '-'}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small" onClick={() => setExpandedId(expandedId === client.id ? null : client.id)} sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}>
                    {expandedId === client.id ? 'Masquer' : 'Voir Envois'}
                  </Button>
                  <Button variant="outlined" color="success" size="small" onClick={() => handleRestore(client.id)} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Restaurer
                  </Button>
                </Box>
              </Box>

              <Collapse in={expandedId === client.id}>
                <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
                  <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem', color: '#1e3a8a' }}>Envois de {client.nom}</Typography>
                  <Box sx={{ height: 300 }}>
                    <DataGrid
                      rows={client.shipments || []} columns={shipmentColumns}
                      getRowId={(row) => row.idBordereau} hideFooter disableRowSelectionOnClick
                      sx={{ border: 'none', backgroundColor: '#fff', '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }, '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' } }}
                    />
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Box>
        ))}

        {filteredClients.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>Aucun client archivé trouvé.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ArchivedClients;