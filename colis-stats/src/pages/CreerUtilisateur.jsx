import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Alert, Toolbar } from '@mui/material';
import { PersonAdd as PersonAddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import PageTabs from '../components/PageTabs';
import api from '../services/api';

const CreerUtilisateur = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client' 
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [user, setUser] = useState({ name: '', role: '' });

    useEffect(() => {
        api.get('/user')
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSave = async () => {
        try {
            await api.post('/users', formData); 
            setStatus({ type: 'success', msg: 'Utilisateur créé avec succès !' });
            
            setTimeout(() => navigate('/utilisateurs'), 2000); 
        } catch (error) {
            setStatus({ type: 'error', msg: 'Erreur lors de la création.' });
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box component='main' sx={{mt: 2, flexGrow: 1, p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
                    <NavBar user={user} />
                    <Toolbar />
                    <PageTabs/>
                    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                            Retour
                        </Button>

                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom color="#1a237e">
                                Créer un Nouvel Utilisateur
                            </Typography>

                            {status.msg && <Alert severity={status.type} sx={{ mb: 2 }}>{status.msg}</Alert>}

                            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField 
                                    label="Nom Complet" 
                                    fullWidth 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                                <TextField 
                                    label="Adresse Email" 
                                    fullWidth 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                                <TextField 
                                    label="Mot de passe" 
                                    type="password" 
                                    fullWidth 
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                />

                                <FormControl fullWidth>
                                    <InputLabel>Rôle</InputLabel>
                                    <Select
                                        value={formData.role}
                                        label="Rôle"
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <MenuItem value="admin">Administrateur</MenuItem>
                                        <MenuItem value="client">Client</MenuItem>
                                        <MenuItem value="livreur">Livreur</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    startIcon={<PersonAddIcon />}
                                    onClick={handleSave}
                                    sx={{ mt: 2, bgcolor: '#1a237e', height: 50, fontWeight: 'bold' }}
                                >
                                    Enregistrer l'utilisateur
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CreerUtilisateur;