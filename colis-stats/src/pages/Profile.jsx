import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Avatar, Grid, Divider, 
  Button, Card, CardContent, Chip, Toolbar 
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Badge as BadgeIcon, 
  CalendarToday as CalendarIcon, 
  Edit as EditIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import NavBar from "../components/NavBar";
import api from '../services/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: '', 
    email: '',
    role: '',
    joined: '',
    location: 'Casablanca, Maroc'
  });
  const [stats, setStats] = useState({
    shipments: 0,
    clients: 0,
    users: 0
  });

  useEffect(() => {
    api.get('/user').then(res => {
      const data = res.data;
      setUser(prev => ({ 
        ...prev, 
        ...data,
        joined: data.created_at 
          ? new Date(data.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
          : 'Janvier 2026'
      }));
    });

    api.get('/admin/stats')
      .then(res => {
        setStats({
          shipments: res.data.shipments_count,
          clients: res.data.clients_count,
          users: res.data.users_count
        });
      })
      .catch(err => {
        console.error("Erreur Stats:", err.response?.status);
      });
  }, []);

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <NavBar user={user} />
      <Toolbar /> 
      
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, bgcolor: '#1a237e', color: 'white' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar 
                sx={{ width: 100, height: 100, bgcolor: '#ff9800', fontSize: '2rem', border: '4px solid white' }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight="bold">{user.name}</Typography>
              <Chip 
                label={user.role} 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', mt: 1, fontWeight: 'bold' }} 
              />
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<EditIcon />}
                sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68a00' } }}
              >
                Modifier le profil
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Informations Personnelles</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BadgeIcon sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">ID Utilisateur</Typography>
                    <Typography variant="body1">#USR-2026-001</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Localisation</Typography>
                    <Typography variant="body1">{user.location}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Membre depuis</Typography>
                    <Typography variant="body1">{user.joined}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Résumé d'Activité</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ p: 2, bgcolor: '#f0f4ff', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="#1a237e">
                        {stats.shipments}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Envois créés</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box sx={{ p: 2, bgcolor: '#fff4e5', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="#ff9800">
                        {stats.clients}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Clients gérés</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="#2e7d32">
                        {stats.users}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Utilisateurs</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Pour modifier votre mot de passe ou vos accès de sécurité, 
                    rendez-vous dans la page{' '}
                    <Typography
                      component={Link} to="/settings"
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#1a237e', 
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline', color: '#ff9800' } 
                      }}
                    > Paramètres </Typography>.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;