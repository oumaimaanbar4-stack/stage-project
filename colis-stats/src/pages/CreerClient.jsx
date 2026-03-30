import React, { useState } from 'react';
import { Box, Paper, Grid, TextField, Button, Typography, Divider, Stepper, Step, StepLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';
import api from '../services/api';

const steps = ['Informations Personnelles', 'Détails de l\'Envoi'];

const CreerClient = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false); 

  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', telephone: '', adresse: '',
    societe: '', ville: '', codePostal: '', pays: '', dateNaissance: '',
    destination: '', montant_crbt: '',
    date_depot: new Date().toISOString().split('T')[0],
    statut: 'En cours'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const isFieldMissing = (value) => value.trim() === '';

  const handleNext = () => {
    const requiredFields = ['nom', 'prenom', 'telephone', 'adresse', 'ville', 'pays'];
    const hasEmptyFields = requiredFields.some(field => isFieldMissing(formData[field]));

    if (hasEmptyFields) {
      setShowErrors(true); 
      return;
    }
    setShowErrors(false);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', formData);
      alert('Client et Envoi créés avec succès !');
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur:", error);
      alert('Erreur technique lors de la sauvegarde.');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <Box sx={{ p: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Créer un nouveau client
          </Typography>

          {/* Re-added the global back button */}
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} 
            sx={{ 
              mb: 2, 
              textTransform: 'none', 
              color: '#301c58', 
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
            }}
          >
            Retour à la page précédente
          </Button>

          <Divider sx={{ mb: 4 }} />

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          <Paper elevation={6} sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 3 }}>
            <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
              
              {activeStep === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Nom *" name="nom" value={formData.nom} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.nom)}
                    helperText={showErrors && isFieldMissing(formData.nom) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Prénom *" name="prenom" value={formData.prenom} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.prenom)}
                    helperText={showErrors && isFieldMissing(formData.prenom) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth
                    error={showErrors && isFieldMissing(formData.email)}
                    helperText={showErrors && isFieldMissing(formData.email) ? "Ce champ est obligatoire" : ""} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Téléphone *" name="telephone" value={formData.telephone} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.telephone)}
                    helperText={showErrors && isFieldMissing(formData.telephone) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Société" name="societe" value={formData.societe} onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Adresse *" name="adresse" value={formData.adresse} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.adresse)}
                    helperText={showErrors && isFieldMissing(formData.adresse) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Ville *" name="ville" value={formData.ville} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.ville)}
                    helperText={showErrors && isFieldMissing(formData.ville) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Code Postal" name="codePostal" value={formData.codePostal} onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Pays *" name="pays" value={formData.pays} onChange={handleChange} fullWidth 
                    error={showErrors && isFieldMissing(formData.pays)}
                    helperText={showErrors && isFieldMissing(formData.pays) ? "Ce champ est obligatoire" : ""}/>
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField label="Destination" name="destination" value={formData.destination} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Total CRBT (MAD)" name="montant_crbt" type="number" value={formData.montant_crbt} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Date de dépôt" value={formData.date_depot} disabled fullWidth />
                  </Grid>
                </Grid>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button 
                  variant="text" 
                  disabled={activeStep === 0} 
                  onClick={handleBack} 
                  startIcon={<ArrowBackIcon />}
                >
                  Retour
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button type="submit" variant="contained" color="success" startIcon={<SaveIcon />}>
                    Confirmer et Sauvegarder
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    onClick={handleNext} 
                    endIcon={<ArrowForwardIcon />}
                    
                  >
                    Suivant
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
        <Footer/>
      </Box>
    </>
  );
};

export default CreerClient;