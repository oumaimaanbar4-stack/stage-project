import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography,  Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import api from '../services/api';




const CreerClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nom: '', telephone: '', adresse: '' });
  const [user, setUser] = useState({ name: '', role: '' });
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', formData);

      navigate('/clients'); 
    } catch (error) {
      alert("Erreur: Ce numéro de téléphone est peut-être déjà utilisé.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <NavBar user={user}  />
      <Toolbar/>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 500, mb: 2 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clients')}>
            Retour à la liste
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1a237e' }}>
            Nouveau Client (Expéditeur)
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField 
              label="Nom *" 
              fullWidth required sx={{ mb: 2 }} 
              onChange={(e) => setFormData({...formData, nom: e.target.value})} 
            />
            <TextField 
              label="Téléphone *" 
              fullWidth required sx={{ mb: 2 }} 
              onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
            />
            <TextField 
              label="Adresse Complète *" 
              fullWidth required multiline rows={3} sx={{ mb: 3 }} 
              onChange={(e) => setFormData({...formData, adresse: e.target.value})} 
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ bgcolor: '#1a237e', py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              Enregistrer le Client
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreerClient;