import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, TextField, Button, Typography, InputAdornment, Toolbar } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import NavBar from "../components/NavBar";
import api from '../services/api';



const CreerShipment = () => {
  const { clientId } = useParams(); // Gets client ID from the URL
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("Chargement...");
  const [user, setUser] = useState({ name: '', role: '' });
  
  const [formData, setFormData] = useState({
    client_id: clientId,
    codeBordereau: `EXP-${Math.floor(Math.random() * 1000000)}`,
    nomDest: '',
    telDest: '',
    adresseDest: '',
    libville: '',
    amountCrbt: 0,
    libelle: '',
    dernierStatut: 'enc',
    dateDepot: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get(`/clients/${clientId}`)
      .then(res => {
        
        setClientName(res.data.nom || "Client inconnu");
      })
      .catch(err => {
        console.error("Erreur lors de la récupération du nom du client:", err);
        setClientName("Erreur de chargement");
      });
  }, [clientId]);


  const handleSubmit = async () => {
    try {
      await api.post('/shipments', formData);
      navigate('/envois');
    } catch (error) {
      console.error(error);
      alert('Erreur: Vérifiez votre connexion ou les champs obligatoires.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <NavBar user={user}  />
      <Toolbar/>
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Retour aux clients</Button>
        
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1a237e">Détails du Bordereau</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>nom du client: {clientName} | Code: {formData.codeBordereau}</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Nom Destinataire" fullWidth onChange={(e) => setFormData({...formData, nomDest: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Téléphone Destinataire" fullWidth onChange={(e) => setFormData({...formData, telDest: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Adresse de Livraison" fullWidth multiline rows={2} onChange={(e) => setFormData({...formData, adresseDest: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Ville" fullWidth onChange={(e) => setFormData({...formData, libville: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                label="Montant CRBT" 
                type="number" 
                fullWidth 
                InputProps={{ endAdornment: <InputAdornment position="end">MAD</InputAdornment> }}
                onChange={(e) => setFormData({...formData, amountCrbt: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                fullWidth 
                size="large" 
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                sx={{ mt: 2, bgcolor: '#2e7d32', height: 55, fontWeight: 'bold' }}
              >
                Confirmer et Sauvegarder
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreerShipment;