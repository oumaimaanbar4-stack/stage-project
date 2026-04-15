import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Toolbar, TextField, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import api from '../services/api';

const ArchivedUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '', role: '' });
  const navigate = useNavigate();

  // 1. Get current logged-in user for the NavBar
  useEffect(() => {
    api.get('/user').then(res => setCurrentUser(res.data)).catch(err => console.error(err));
  }, []);

  // 2. Fetch the archived users from your new AuthController method
  useEffect(() => {
    api.get('/users/archived').then(res => setUsers(res.data)).catch(err => console.error(err));
  }, []);

  // 3. Logic to restore a user
  const handleRestore = async (id) => {
    try {
      await api.put(`/users/${id}/restore`);
      setUsers(prev => prev.filter(u => u.id !== id)); // Remove from list locally
    } catch (error) {
      alert("Erreur lors de la restauration de l'utilisateur.");
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <NavBar user={currentUser} />
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Toolbar />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography fontWeight="bold" sx={{ color: "black", fontSize: '1.5rem' }}>Utilisateurs Archivés</Typography>
          <Button variant="outlined" onClick={() => navigate('/utilisateurs')} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
            ← Retour à la liste
          </Button>
        </Box>

        <TextField size="small" placeholder="Rechercher par nom ou email..." value={search}
          onChange={(e) => setSearch(e.target.value)} sx={{ mb: 3, width: 350, bgcolor: 'white' }} />

        {/* Table Header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 150px', px: 2, py: 1, backgroundColor: '#f8f9fa', borderRadius: '8px 8px 0 0', borderBottom: '2px solid #e0e0e0' }}>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Nom Complet</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Email</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Rôle</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Archivé le</Typography>
          <Typography fontSize="0.85rem" fontWeight={600} color="#555">Actions</Typography>
        </Box>

        {/* User Rows */}
        {filteredUsers.map(user => (
          <Paper key={user.id} sx={{ borderRadius: 0, boxShadow: 'none', border: '1px solid #f0f0f0', borderTop: 'none' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 150px', alignItems: 'center', px: 2, py: 1.5 }}>
              <Typography fontSize="0.9rem" fontWeight={500}>{user.name}</Typography>
              <Typography fontSize="0.9rem" color="text.secondary">{user.email}</Typography>
              <Box>
                <Chip label={user.role} size="small" variant="outlined" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} />
              </Box>
              <Typography fontSize="0.9rem" color="text.secondary">
                {user.deleted_at ? new Date(user.deleted_at).toLocaleDateString() : '-'}
              </Typography>
              <Button variant="contained" color="success" size="small" onClick={() => handleRestore(user.id)} sx={{ textTransform: 'none', borderRadius: 2 }}>
                Restaurer
              </Button>
            </Box>
          </Paper>
        ))}

        {filteredUsers.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>Aucun utilisateur archivé trouvé.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ArchivedUsers;