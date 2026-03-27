// src/pages/CreerClient.jsx
import React, { useState } from 'react';
import { Box, Paper, Grid, TextField, Button, Typography, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import NavBar from "../components/NavBar";

const CreerClient = () => {
  const [client, setClient] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    societe: '',
    ville: '',
    codePostal: '',
    pays: '',
    dateNaissance: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client créé:', client);
    alert('Client créé avec succès !');
    setClient({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      societe: '',
      ville: '',
      codePostal: '',
      pays: '',
      dateNaissance: ''
    });
  };

  return (
    <>
      <NavBar />
      <Box sx={{ p: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Créer un nouveau client
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Remplissez les informations du client ci-dessous
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            maxWidth: 700,
            mx: 'auto',
            borderRadius: 3,
            backgroundColor: '#fff'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nom"
                  name="nom"
                  value={client.nom}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Prénom"
                  name="prenom"
                  value={client.prenom}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                  fullWidth
                  type="email"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Téléphone"
                  name="telephone"
                  value={client.telephone}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Adresse"
                  name="adresse"
                  value={client.adresse}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Société"
                  name="societe"
                  value={client.societe}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Ville"
                  name="ville"
                  value={client.ville}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Code Postal"
                  name="codePostal"
                  value={client.codePostal}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Pays"
                  name="pays"
                  value={client.pays}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Date de naissance"
                  name="dateNaissance"
                  value={client.dateNaissance}
                  onChange={handleChange}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                >
                  Créer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default CreerClient;